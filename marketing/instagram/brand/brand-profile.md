# CodeLaksh brand & audience profile

Source of truth: this repository (the website source: `components/*.jsx`, `components/erpData.js`, `app/globals.css`). The live site could not be fetched from the build sandbox, so nothing here was taken from anywhere else. Re-check after site changes.

## Brand
- **Instagram:** https://www.instagram.com/codelaksh/ (@codelaksh). Account type (Professional or personal) and Page link are not yet verified.
- **Name:** CodeLaksh | **Slogan:** Code Your Vision With Innovation | **Site:** https://codelaksh.in
- **Positioning on the site:** "AI Solutions & Software Development"; "Premier AI Solutions & Software Development Company in India". Team of developers, designers and project managers; "Since 2020"; office: Sangram Nagar, Aurangabad.
- **Contact (public on site):** +91-9834684866, codelaksh@gmail.com, Mon-Sat 10 AM-7 PM.

## Verified products and services (the only things we may promote)
| Offer | Verified facts |
|---|---|
| **CodeLaksh ERP** (hero product) | GST-ready billing (CGST/SGST, print/PDF/share), barcode scanning and labels, inventory (batches, expiry, low-stock alerts), accounting (cash/bank books, purchases, supplier ledger, P&L, balance sheet), reports with CSV export, desktop app that works offline (Windows), cloud sync + Android app (Growth+), Razorpay/PhonePe payments, restaurant/hotel module (KOT, tables, QR ordering, reservations). Live on Google Play. |
| **ERP pricing** (excl. 18% GST, Sept 2026 sheet) | Starter Rs. 3,500 one-time + Rs. 1,499/yr renewal; Growth Rs. 599/month or Rs. 5,999/yr; Restaurant/Hotel Pro Rs. 1,999/month/outlet; Enterprise from Rs. 4,999/month. 7-day free trial on Starter and Growth. Add-ons: Rs. 499 branch, Rs. 299 WhatsApp/SMS, Rs. 999 gateway setup, Rs. 2,999 migration (Tally/Vyapar/manual), Rs. 1,999/yr AMC. |
| **Kidodom** (a CodeLaksh brand) | Baby & kids shopping, parenting guidance, vaccine reminders; App Store, Google Play, kidodom.in. |
| **Services** | AI chatbots, machine learning, web development (React, Node.js, Python), app development (iOS/Android), cloud (AWS/Azure/GCP), digital marketing (SEO, social). |

**Not verified, so never claimed:** customer counts, testimonials, awards, named clients, performance results, "best/#1", uptime, delivery timelines. The portfolio section on the site is generic placeholders, not case studies.

## Audience
1. **Primary (leads):** owners/managers of retail shops, distributors, restaurants, cafes, hotels, medical stores in India who use paper, Excel or old desktop software. Pain: GST compliance, stock mismatch, slow counters, unreliable internet, dues tracking.
2. **Secondary:** accountants/CAs who advise them; startups and SMEs needing custom software, apps, AI chatbots.
3. **Growth audience:** founders, developers and tech-curious business people (education/AI content, shareable).
Languages: English now; Hindi/Marathi (Aurangabad, Maharashtra) variants are a strong experiment once the base performs.

## Visual identity (from `app/globals.css`)
Primary blue `#0483d2`, teal `#14b8a6`, accent orange `#ff6b35`, dark background `#0a0d16`, surface `#131a2b`, text `#f3f6fc`. Type: Inter-family in creatives (site uses Montserrat/Poppins). Logo: `public/logo-white.png`. Real product screenshots only (`public/erp-assets/`). Style: dark, premium, one idea per slide, max ~12 words of headline.

## Voice
Plain, practical, helpful. Speak to a shop owner, not an engineer. Lead with the customer's problem. No hype, no guarantees, no fake urgency.

## Content rules (enforced in code by `validate.mjs`)
No blocked claim words, only verified prices, only allow-listed link hosts, max 5 hashtags, caption <= 2,200 chars, alt text on every image, JPEG 4:5, UTM on every link.

## Compliance notes
- Hashtags: Instagram reportedly limits posts to a handful of hashtags, so we use 5 relevant ones. Volumes could not be researched offline; the weekly report ranks hashtag sets by real reach instead of guessing.
- Links in captions are not clickable: every CTA says "link in bio". Set the bio link to a UTM URL (see README).
