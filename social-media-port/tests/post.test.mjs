import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

function mock({ failFirstContainer = false, badToken = false } = {}) {
  const calls = []; let n = 0; let containerFails = failFirstContainer;
  const srv = http.createServer((req, res) => {
    let b = ""; req.on("data", (d) => (b += d)); req.on("end", () => {
      const u = new URL(req.url, "http://x"); calls.push(`${req.method} ${u.pathname}`);
      const send = (code, o) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(o)); };
      if (req.method === "HEAD") return send(200, {});
      if (u.pathname.endsWith("/me")) return badToken ? send(400, { error: { message: "Invalid OAuth access token", code: 190 } }) : send(200, { username: "codelaksh" });
      if (u.pathname.endsWith("/media") && req.method === "POST") {
        if (containerFails) { containerFails = false; return send(500, { error: { message: "temporary", is_transient: true } }); }
        return send(200, { id: `c${++n}` });
      }
      if (u.pathname.endsWith("/media_publish")) return send(200, { id: "m1" });
      return send(200, { status_code: "FINISHED" });
    });
  });
  return new Promise((r) => srv.listen(0, () => r({ srv, calls, base: `http://localhost:${srv.address().port}` })));
}
const run = (env) => new Promise((resolve) => {
  const p = spawn("node", ["scripts/post.mjs"], { env: { ...process.env, ...env } }); let out = "";
  p.stdout.on("data", (d) => (out += d)); p.stderr.on("data", (d) => (out += d)); p.on("close", (code) => resolve({ code, out }));
});
const setup = (base, items) => {
  const f = path.join(mkdtempSync(path.join(tmpdir(), "q-")), "queue.json");
  writeFileSync(f, JSON.stringify(items.map((i) => ({ platforms: ["instagram"], status: "pending", scheduled_at: "2020-01-01T00:00:00Z", caption: "hi", ...i }))));
  return { f, env: { QUEUE_FILE: f, IG_GRAPH_BASE: base, IG_ACCESS_TOKEN: "SECRETTOKEN", IG_USER_ID: "1" } };
};

test("publishes one carousel, marks posted, no duplicate on re-run, token never leaked", async () => {
  const m = await mock(); const { f, env } = setup(m.base, [{ id: "a", image_urls: [`${m.base}/1.jpg`, `${m.base}/2.jpg`], alt_texts: ["x", "y"] }, { id: "b", image_url: `${m.base}/3.jpg` }]);
  const r = await run(env); assert.equal(r.code, 0); assert.ok(!r.out.includes("SECRETTOKEN"));
  const q = JSON.parse(readFileSync(f, "utf8"));
  assert.deepEqual(q.map((p) => p.status), ["posted", "pending"]); // one post per run
  assert.equal(m.calls.filter((c) => c.endsWith("/media_publish")).length, 1);
  const before = m.calls.length; await run(env);
  assert.equal(JSON.parse(readFileSync(f, "utf8"))[0].status, "posted");
  assert.equal(m.calls.filter((c) => c.endsWith("/media_publish")).length, 2); // second run posted "b" only
  assert.ok(m.calls.length > before); m.srv.close();
});

test("transient container error is retried and still posts once", async () => {
  const m = await mock({ failFirstContainer: true }); const { f, env } = setup(m.base, [{ id: "a", image_url: `${m.base}/1.jpg` }]);
  const r = await run(env); assert.equal(r.code, 0);
  assert.equal(JSON.parse(readFileSync(f, "utf8"))[0].status, "posted");
  assert.equal(m.calls.filter((c) => c.endsWith("/media_publish")).length, 1); m.srv.close();
});

test("bad token fails the run before posting anything", async () => {
  const m = await mock({ badToken: true }); const { f, env } = setup(m.base, [{ id: "a", image_url: `${m.base}/1.jpg` }]);
  const r = await run(env); assert.notEqual(r.code, 0); assert.match(r.out, /token check failed/i);
  assert.equal(JSON.parse(readFileSync(f, "utf8"))[0].status, "pending");
  assert.equal(m.calls.filter((c) => c.endsWith("/media_publish")).length, 0); m.srv.close();
});

test("future-dated and draft items are not posted", async () => {
  const m = await mock(); const { f, env } = setup(m.base, [
    { id: "d", status: "draft", image_url: `${m.base}/1.jpg` }, { id: "f", scheduled_at: "2999-01-01T00:00:00Z", image_url: `${m.base}/1.jpg` }]);
  const r = await run(env); assert.equal(r.code, 0); assert.match(r.out, /Nothing due/);
  assert.equal(m.calls.filter((c) => c.endsWith("/media_publish")).length, 0); m.srv.close();
});
