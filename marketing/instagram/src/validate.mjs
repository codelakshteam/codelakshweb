// Pre-publish validation. Anything returned in `errors` blocks publishing.
import fs from 'node:fs';
import path from 'node:path';
import { imageSize } from './images.mjs';

export function buildCaption(post, cfg) {
  const link = post.link ? withUtm(post.link, post) : null;
  const parts = [post.caption.trim()];
  if (link && post.show_link_in_caption) parts.push(link);
  if (post.hashtags?.length) parts.push(post.hashtags.join(' '));
  return parts.join('\n\n');
}

export function withUtm(link, post) {
  const u = new URL(link);
  const t = post.tracking || {};
  if (t.campaign) u.searchParams.set('utm_source', 'instagram'), u.searchParams.set('utm_medium', 'social'), u.searchParams.set('utm_campaign', t.campaign);
  if (t.content) u.searchParams.set('utm_content', t.content);
  return u.toString();
}

export function mediaUrl(item, cfg) {
  return /^https:\/\//.test(item) ? item : `${cfg.mediaBaseUrl.replace(/\/$/, '')}/${item.replace(/^\//, '')}`;
}

export function validatePost(post, cfg, { publicDir } = {}) {
  const errors = [], warnings = [];
  const need = (k) => { if (post[k] === undefined || post[k] === '') errors.push(`missing field: ${k}`); };
  ['id', 'status', 'scheduled_at', 'format', 'caption', 'media', 'alt_text', 'objective', 'audience', 'tracking'].forEach(need);
  if (errors.length) return { errors, warnings };

  if (!['draft', 'approved'].includes(post.status)) errors.push(`status must be draft|approved, got ${post.status}`);
  if (Number.isNaN(Date.parse(post.scheduled_at))) errors.push('scheduled_at is not a valid ISO timestamp');
  if (!['image', 'carousel', 'reel'].includes(post.format)) errors.push(`unsupported format: ${post.format}`);
  if (post.format === 'carousel' && !(post.media.length >= 2 && post.media.length <= 10)) errors.push('carousel needs 2-10 media items');
  if (post.format === 'image' && post.media.length !== 1) errors.push('image post needs exactly 1 media item');
  if (post.format === 'reel' && post.media.length !== 1) errors.push('reel needs exactly 1 video URL');
  if (post.format !== 'reel' && post.alt_text.length !== post.media.length) errors.push('alt_text must have one entry per image');

  const caption = buildCaption(post, cfg);
  if (caption.length > cfg.captionMaxChars) errors.push(`caption is ${caption.length} chars (max ${cfg.captionMaxChars})`);
  if ((post.hashtags || []).length > cfg.maxHashtags) errors.push(`${post.hashtags.length} hashtags (max ${cfg.maxHashtags})`);
  for (const h of post.hashtags || []) if (!/^#[\p{L}\p{N}_]+$/u.test(h)) errors.push(`bad hashtag: ${h}`);
  const lower = caption.toLowerCase();
  for (const phrase of cfg.blockedPhrases) if (lower.includes(phrase.toLowerCase())) errors.push(`blocked/unverifiable claim wording: "${phrase}"`);
  for (const m of caption.matchAll(/Rs\.\s?[\d,]+/g)) if (!cfg.verifiedPrices.includes(m[0].replace(/Rs\.\s?/, 'Rs. '))) errors.push(`price not in verified price list: ${m[0]}`);

  if (post.link) {
    try {
      const u = new URL(post.link);
      if (u.protocol !== 'https:' || !cfg.allowedLinkHosts.includes(u.hostname)) errors.push(`link host not allowed: ${u.hostname}`);
    } catch { errors.push('link is not a valid URL'); }
  }
  if (!post.link) warnings.push('no link; CTA should point to link in bio');

  if (publicDir && post.format !== 'reel') {
    for (const item of post.media) {
      if (/^https:\/\//.test(item)) continue;
      const file = path.join(publicDir, 'social', item);
      if (!fs.existsSync(file)) { errors.push(`media file missing: ${file}`); continue; }
      const size = imageSize(fs.readFileSync(file));
      if (!size) errors.push(`unreadable image: ${item}`);
      else {
        if (size.type !== 'jpeg') errors.push(`${item}: Instagram API accepts JPEG only`);
        const r = size.width / size.height;
        if (r < 0.8 || r > 1.91) errors.push(`${item}: aspect ratio ${r.toFixed(2)} outside 0.8-1.91`);
        if (size.width < 320) errors.push(`${item}: width ${size.width}px < 320`);
        if (fs.statSync(file).size > 8 * 1024 * 1024) errors.push(`${item}: larger than 8MB`);
      }
    }
  }
  return { errors, warnings };
}

export async function checkUrls(urls, fetchImpl = globalThis.fetch) {
  const bad = [];
  for (const u of urls) {
    try {
      const res = await fetchImpl(u, { method: 'HEAD', redirect: 'follow' });
      if (!res.ok) bad.push(`${u} -> HTTP ${res.status}`);
    } catch (e) { bad.push(`${u} -> ${e.message}`); }
  }
  return bad;
}
