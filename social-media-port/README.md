# social-media

Queue-based auto-poster for the CodeLaksh social accounts. Add posts to `queue.json`; a GitHub Action publishes due posts (daily by default, or on demand).

Platforms: **Instagram** `@codelaksh` (Business, Instagram API with Instagram login). **Facebook Page** "CodeLaksh" is supported but **off** until `FB_PAGE_ID` and `FB_PAGE_TOKEN` secrets exist.

## How it works
1. `queue.json` holds 60 posts (2 per day, 2026-10-11 to 2026-11-09). `pending` posts go out when `scheduled_at` has passed; `draft` posts are ignored.
2. The workflow runs daily at 04:30 UTC (10:00 IST), checks the Instagram token, then posts the **oldest due pending item** (`posts_per_run` in `config.json`, default 1). Result and status are committed back to `queue.json`.
3. Before posting, the script checks that every media URL is reachable. If not, the post stays `pending` and the run fails (GitHub emails you), then it retries next run. Nothing is marked `posted` unless Instagram returns a media id.

## Media hosting (required)
Instagram fetches images from public URLs. Posts point to `https://codelaksh.in/social/<post-id>/...`. The files live in `media/` here and are published by copying `media/*` into the website repo's `public/social/` (codelakshweb) and deploying. Until that is deployed, every post will wait (not fail permanently).

## Two posts a day
The workflow has one daily cron, so with `posts_per_run: 1` only one post goes out per day and the rest queue up. To post twice a day, add a second cron in `.github/workflows/post.yml` (edit in the GitHub web editor, which has workflow scope), e.g. `- cron: "30 13 * * *"` (19:00 IST). Evening items are scheduled at 13:30Z, morning items at 01:00Z.

## Queue format
```json
{ "id": "2026-10-12-1", "platforms": ["instagram"], "caption": "...",
  "image_url": "https://...jpg", "alt_text": "...", "scheduled_at": "2026-10-12T01:00:00Z", "status": "pending" }
```
- Carousel: `image_urls` (2-10) + `alt_texts`. Reel: `video_url` + `"reel": true`. JPEG only for images, public HTTPS URLs, no text-only posts.
- `status`: `draft` (ignored) / `pending` / `posted` / `failed` (bot-set, with `results` per platform). A `failed` post is never retried automatically; fix it and set it back to `pending`.
- 6 posts are `draft` with a `notes` field (festival dates and GST wording that must be confirmed). Change to `pending` after checking.
- Instagram allows about 50 API posts per 24h; we post 1-2.

## Operate
- Run now / test: Actions -> "Publish queued social posts" -> Run workflow (`post_id`, `dry_run`).
- Edit content: change `tools/content.py`, run `python3 tools/build.py` (needs Pillow). It regenerates `media/` and `queue.json` and never re-queues posts already `posted`/`failed`.
- Check the queue: `node tools/lint-queue.mjs` (max 5 hashtags, verified prices only, no hype wording). Tests: `node --test tests/post.test.mjs`.
- Local dry run: `IG_ACCESS_TOKEN=... IG_USER_ID=... node scripts/post.mjs --dry-run` (never paste tokens into chat or commit them).

## Secrets (Settings -> Secrets and variables -> Actions)
| Secret | Required | Value |
| --- | --- | --- |
| `IG_ACCESS_TOKEN` | yes | Instagram-login token |
| `IG_USER_ID` | yes | `17841458054375719` |
| `FB_PAGE_ID` | Facebook only | `107012272332526` |
| `FB_PAGE_TOKEN` | Facebook only | Long-lived Page access token |

## Token renewal (every ~60 days)
- Each run verifies the token. If it is invalid the run fails before posting; from day 45 (`config.json: token_warn_after_days`) the run adds a warning annotation.
- Renew: Meta app -> Instagram API -> API setup with Instagram login -> Generate token. Update the `IG_ACCESS_TOKEN` secret, then set `token_issued` in `config.json` to today. Next due: **mid-December 2026** (issued 2026-10-10).
- Alternative: a still-valid token that is at least 24h old can be extended with the `ig_refresh_token` endpoint (`graph.instagram.com/refresh_access_token`); run it locally and update the secret.

## Facts used in captions
Taken from the CodeLaksh website source, nothing else: ERP features, plans (Starter Rs. 3,500 one-time + Rs. 1,499/yr; Growth Rs. 599/month; Restaurant / Hotel Pro Rs. 1,999/month/outlet; Enterprise from Rs. 4,999/month; all excl. 18% GST), 7-day trial on Starter and Growth, add-on prices, Kidodom, services, "since 2020", Aurangabad. No testimonials, customer counts, awards or results are claimed.

## Adding more platforms
Add a handler to `handlers` in `scripts/post.mjs` and list its name in a post's `platforms`.
