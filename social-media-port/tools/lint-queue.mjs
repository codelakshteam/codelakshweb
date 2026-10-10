// Offline sanity checks for queue.json (run in CI-free fashion: node tools/lint-queue.mjs)
import { readFileSync } from "node:fs";
const q = JSON.parse(readFileSync(new URL("../queue.json", import.meta.url), "utf8"));
const blocked = ["guarantee", "100%", "best in india", "trusted by", "award", "#1 "];
const prices = ["Rs. 3,500","Rs. 1,499","Rs. 599","Rs. 5,999","Rs. 1,999","Rs. 4,999","Rs. 499","Rs. 299","Rs. 999","Rs. 2,999"];
let bad = 0; const err = (id, m) => { console.log(`ERROR ${id}: ${m}`); bad++; };
const ids = new Set();
for (const p of q) {
  if (ids.has(p.id)) err(p.id, "duplicate id"); ids.add(p.id);
  if (!["draft","pending","posted","failed"].includes(p.status)) err(p.id, `bad status ${p.status}`);
  if (!p.platforms?.length) err(p.id, "no platforms");
  if (p.status === "pending" && !p.scheduled_at) err(p.id, "pending without scheduled_at");
  const tags = p.caption.match(/(^|\s)#[\p{L}\p{N}_]+/gu) ?? [];
  if (tags.length > 5) err(p.id, `${tags.length} hashtags (max 5)`);
  if (p.caption.length > 2200) err(p.id, "caption > 2200");
  const lc = p.caption.toLowerCase(); for (const b of blocked) if (lc.includes(b)) err(p.id, `blocked wording "${b}"`);
  for (const m of p.caption.matchAll(/Rs\.\s?[\d,]+/g)) if (!prices.includes(m[0])) err(p.id, `unverified price ${m[0]}`);
  const urls = p.image_urls ?? (p.image_url ? [p.image_url] : []);
  if (!urls.length && !p.video_url) err(p.id, "no media");
  if (p.image_urls && (p.image_urls.length < 2 || p.image_urls.length > 10)) err(p.id, "carousel needs 2-10 images");
  if (p.image_urls && p.alt_texts?.length !== p.image_urls.length) err(p.id, "alt_texts must match image_urls");
}
console.log(`${q.length} items checked, ${bad} problems`); process.exit(bad ? 1 : 0);
