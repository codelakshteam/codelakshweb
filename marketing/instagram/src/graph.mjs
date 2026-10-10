// Minimal Instagram Graph API client: bearer-header auth (token never appears in URLs/logs), retry of
// transient failures with exponential backoff, and structured errors with recovery guidance.
const TRANSIENT_CODES = new Set([1, 2, 4, 17, 32, 341, 613]);

export class GraphError extends Error {
  constructor(message, { status, code, subcode, transient, guidance } = {}) {
    super(message);
    this.name = 'GraphError';
    this.status = status;
    this.code = code;
    this.subcode = subcode;
    this.transient = !!transient;
    this.guidance = guidance;
  }
}

export function guidanceFor(code, subcode) {
  if (code === 190) return 'Access token expired or revoked. Re-authorize: generate a new long-lived token and update the IG_ACCESS_TOKEN secret (see marketing/instagram/README.md, "Token renewal").';
  if (code === 10 || code === 200 || code === 803) return 'Missing permission. Required: instagram_basic, instagram_content_publish, instagram_manage_insights, pages_show_list, pages_read_engagement. Re-authorize with these scopes.';
  if (code === 9007 || subcode === 2207027) return 'Media container not ready yet; the publisher polls and retries this automatically.';
  if (subcode === 2207026 || subcode === 2207009) return 'Unsupported or badly proportioned media. Use JPEG, aspect ratio between 4:5 and 1.91:1, public HTTPS URL.';
  if (subcode === 2207051) return 'Instagram flagged the action as spam/automated. Do not retry; review the account in the Instagram app.';
  if (code === 4 || code === 17 || code === 32) return 'Rate limit hit. The run will back off; if it persists wait an hour. Publishing limit is 100 API posts per 24h.';
  return undefined;
}

export function createClient({ host = 'graph.facebook.com', version = 'v23.0', token, fetchImpl = globalThis.fetch, sleep = (ms) => new Promise((r) => setTimeout(r, ms)), maxAttempts = 4 } = {}) {
  if (!token) throw new Error('IG_ACCESS_TOKEN is not set');
  const base = `https://${host}/${version}`;

  async function request(method, path, params = {}, { retry = true } = {}) {
    const attempts = retry ? maxAttempts : 1;
    let lastErr;
    for (let i = 1; i <= attempts; i++) {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        let url = `${base}/${path.replace(/^\//, '')}`;
        const init = { method, headers };
        const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== null).map(([k, v]) => [k, String(v)]));
        if (method === 'GET') url += `?${qs}`;
        else { headers['Content-Type'] = 'application/x-www-form-urlencoded'; init.body = qs.toString(); }
        const res = await fetchImpl(url, init);
        const body = await res.json().catch(() => ({}));
        if (res.ok && !body.error) return body;
        const e = body.error || {};
        const transient = res.status >= 500 || res.status === 429 || e.is_transient === true || TRANSIENT_CODES.has(e.code);
        throw new GraphError(e.message || `HTTP ${res.status}`, { status: res.status, code: e.code, subcode: e.error_subcode, transient, guidance: guidanceFor(e.code, e.error_subcode) });
      } catch (err) {
        lastErr = err instanceof GraphError ? err : new GraphError(`Network error: ${err.message}`, { transient: true });
        if (!lastErr.transient || i === attempts) throw lastErr;
        await sleep(2000 * 2 ** (i - 1));
      }
    }
    throw lastErr;
  }

  return { get: (p, q, o) => request('GET', p, q, o), post: (p, q, o) => request('POST', p, q, o) };
}
