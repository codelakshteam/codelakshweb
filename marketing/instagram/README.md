# CodeLaksh Instagram automation

Research -> Plan -> Create -> Validate -> Publish -> Measure -> Improve, using only Meta's official Instagram Graph API (Content Publishing + Insights). No scraping, bots, pods or purchased engagement.

## What is here
| Path | Purpose |
|---|---|
| `brand/brand-profile.md` | Verified brand, products, prices, audience, visual identity, content rules |
| `calendar/calendar.md` / `.json` | 30-day plan, 2 posts/day (60 posts). `build_calendar.py` regenerates it |
| `posts/*.json` | Finished posts (caption, hashtags, alt text, CTA, UTM tags). 2 ready, `status: draft` |
| `creative/build_creative.py` | Renders on-brand 1080x1350 JPEG carousels into `public/social/` from real screenshots |
| `src/validate.mjs` | Gate: claims, prices, links, hashtags, caption length, JPEG size/ratio, alt text |
| `src/publisher.mjs`, `graph.mjs`, `ledger.mjs` | Publish flow, retries, duplicate prevention, ledger (`state/ledger.json`) |
| `src/analytics.mjs`, `report.mjs` | Insights snapshots, daily summary, weekly report (`reports/`) |
| `src/check-token.mjs` | Token expiry / permission / quota check |
| `.github/workflows/instagram.yml` | Scheduled publish (12:35 + 19:35 IST), daily token check, Monday report |

Commands (run from repo root): `npm run ig:test`, `npm run ig:dry-run`, `npm run ig:approve -- --all`, `npm run ig:token`, `npm run ig:analytics`.

## One-time setup (only you can do these)
1. **Instagram account type:** in the Instagram app set the CodeLaksh account to *Professional* (Business or Creator).
2. **Link to the Facebook Page** "CodeLaksh" (Page ID 107012272332526, visible in your Meta connector): Instagram > Settings > Accounts Center / Page link, or Page settings > Linked accounts. Today the Meta ad account has **no Instagram account linked**.
3. **Meta app:** developers.facebook.com > Create app (Business type) > add *Instagram Graph API* (Facebook Login for Business). Permissions: `instagram_basic`, `instagram_content_publish`, `instagram_manage_insights`, `pages_show_list`, `pages_read_engagement`. While you are an app admin/tester these work without App Review for your own account; Advanced Access (review) is only needed for other people's accounts.
4. **Token:** Graph API Explorer > select the app > generate a user token with the scopes above > exchange for a long-lived token (`/oauth/access_token?grant_type=fb_exchange_token`) > call `/me/accounts` to get the **Page token** (a Page token derived from a long-lived user token does not expire). Find the Instagram user id with `/{page-id}?fields=instagram_business_account`.
5. **GitHub secrets** (Settings > Secrets and variables > Actions): `IG_USER_ID`, `IG_ACCESS_TOKEN`, optionally `META_APP_ID`, `META_APP_SECRET` (enables expiry/permission checks). Never put these in files, prompts or chat. Locally: `node --env-file=marketing/instagram/.env.local ...` (git-ignored).
6. **Deploy the site** so `https://codelaksh.in/social/...` serves the images (Instagram fetches media from public HTTPS URLs; the publisher refuses to post if any URL is unreachable).
7. **Go live:** `npm run ig:approve -- --all` (or edit `status` to `approved`), then set repository **variable** `IG_PUBLISH_ENABLED=true`. Until then everything is a dry run.
8. Set the Instagram bio link to `https://codelaksh.in/erp?utm_source=instagram&utm_medium=social&utm_campaign=bio`. The account is https://www.instagram.com/codelaksh/ (`@codelaksh`); the icon in `components/Contact.jsx` links to it. The LinkedIn, Twitter and GitHub icons still link to `#`.

## Safety model
- Dry run by default. Live needs `--live` **and** `IG_PUBLISH_ENABLED=true` **and** `status: approved` **and** passing validation **and** reachable media URLs.
- A post is "published" only when Instagram returns a media id. The ledger records state per post.
- **Duplicate prevention:** published posts are skipped; containers are reused after a failure; `media_publish` is not blind-retried: after an unknown outcome the feed is checked for the same caption first (`reconciled`). Workflow concurrency prevents parallel runs.
- Transient errors (5xx, rate limits, network) back off 2/4/8s, max 4 tries. Permanent errors stop with guidance and appear in `reports/daily/`.
- Tokens travel only in the `Authorization` header; never in URLs, logs or the repo.

## Recovery
- **Token expired (code 190):** repeat setup step 4, update `IG_ACCESS_TOKEN`, run the workflow manually (`task: token`).
- **Post stuck in `publishing`:** next run reconciles automatically; if the post exists on Instagram it is recorded, otherwise it retries the same container.
- **Container expired/error:** ledger resets it and the next run rebuilds it.
- **Wrong post published:** delete in Instagram, set its ledger state to `published` manually so it is not re-posted, fix and re-add as a new id.

## Limits and honesty
- API limit: 100 API-published posts per 24h (we use 2). Reels need a public MP4 URL: **no reel videos exist yet** (22 reels are planned); create them, host under `public/social/`, use `format: "reel"`.
- Stories, Collab invites and trial reels are not handled. Comment replies and DMs are intentionally manual (no automated engagement).
- Only 2 of 60 posts are fully produced. The rest are planned concepts; each needs caption, creative, alt text, then `approve`.
- Publish times are assumptions until Insights has data. Follower growth to 1M is not promised or modeled; the weekly report shows measured data only, and marks anything unavailable as `n/a`.
- Qualified leads are not exposed by Instagram: track UTM `utm_source=instagram` in website analytics and the contact form.
- The live website could not be fetched from the build sandbox (DNS blocked); facts come from the repo source. Hashtag volumes could not be researched offline.
- Not run against real Meta: tests use a mocked API. First live run: approve one post and use `workflow_dispatch`.
