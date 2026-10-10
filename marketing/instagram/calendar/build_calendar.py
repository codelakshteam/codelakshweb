"""Generates calendar.json + calendar.md (30 days x 2 posts, 2026-10-11 .. 2026-11-09).
Only claims from the website source are used. URLs: /erp, /#services, /#contact, /#kidodom exist in the repo.
Festival/GST dates are marked VERIFY: confirm against the official calendar before approving that post."""
import json, datetime as dt
E, S, C, K = "https://codelaksh.in/erp", "https://codelaksh.in/#services", "https://codelaksh.in/#contact", "https://kidodom.in"
# (pillar, format, concept, hook, cta, url)
D = [
 [("product-demo","carousel","ERP offline GST billing [DONE: drafted]","Your billing counter shouldn't stop when the internet does.","Start 7-day free trial",E),
  ("education","carousel","4 questions before buying billing software [DONE: drafted]","Buying billing software? Ask these 4 questions first.","Save + explore ERP",E)],
 [("workflow-compare","reel","Paper bill book vs ERP invoice: 30-second screen recording","Same customer, same items. One takes 3 minutes.","See the features",E),
  ("festival","image","Navratri greeting + 'is your billing ready for the festive rush?' VERIFY Navratri dates","Festive rush starts this week. Is your counter ready?","Explore features",E)],
 [("industry-problem","reel","Restaurant: order taken on paper, KOT shouted to kitchen vs KOT + table management","KOT chaos at 9 pm, or one screen for every table?","Restaurant / Hotel Pro",E),
  ("education","carousel","GST invoice must-haves: what a valid tax invoice shows (CGST/SGST split)","Is your invoice GST-ready? Check these fields.","Save this",E)],
 [("showcase","carousel","Kidodom: a CodeLaksh brand, app screens (real screenshots)","We also build our own products. Meet Kidodom.","Visit kidodom.in",K),
  ("faq","image","FAQ: Is there a free trial? (7 days on Starter and Growth)","Can I try it before paying? Yes.","Start free trial",E)],
 [("product-demo","reel","Barcode label sheet: build and print product labels (desktop screenshot flow)","From product list to printed barcode labels in one screen.","Explore features",E),
  ("ai-trends","carousel","What an AI chatbot can and can't do for a small business support desk","Your customers ask the same 10 questions. A bot can answer them.","Talk to us",S)],
 [("education","reel","3 reports every shop owner should read weekly: sales, stock, dues","Three reports that tell you if your shop is healthy.","Explore reports",E),
  ("brand-story","image","About CodeLaksh: developers, designers and project managers, building since 2020, Aurangabad","Who builds CodeLaksh? A team in Aurangabad since 2020.","Meet the team",C)],
 [("workflow-compare","carousel","Manual stock register vs inventory with low-stock alerts and expiry tracking","Stock-outs are invisible until a customer asks.","See inventory features",E),
  ("faq","carousel","FAQ: Can I move data from Tally, Vyapar or manual books? (migration add-on Rs. 2,999)","Stuck on old software? Your data can come with you.","Ask about migration",E)],
 [("industry-problem","reel","Retail counter: queue at billing, barcode scan speeds checkout","Why does your billing queue move slowly?","Explore features",E),
  ("product-demo","carousel","Mobile app tour: dashboard, invoices, payments, reports (real screens)","Your shop's numbers, in your pocket.","Get the app on Google Play","https://play.google.com/store/apps/details?id=com.codelaksh.erp")],
 [("education","carousel","Cash book vs bank book vs ledger: simple explainer for shop owners","Cash book, bank book, ledger: what's the difference?","Save this",E),
  ("ai-trends","reel","3 tasks a small business can automate this month (invoice sharing, reminders, reports)","Stop doing these 3 tasks by hand.","Talk to us",S)],
 [("festival","reel","Dussehra: 'Which old habit will you burn this year?' (manual billing) VERIFY Dussehra date (~Oct 20)","This Dussehra, burn the paper bill book.","Try the free trial",E),
  ("faq","image","FAQ: How much does CodeLaksh ERP cost? Plans summary (Starter/Growth/Pro, excl. GST)","What does billing software really cost?","See pricing",E)],
 [("workflow-compare","reel","Collecting payment: chasing dues by phone vs sharing invoice + payment link (Razorpay/PhonePe, Growth)","Chasing payments by phone, or one link?","Explore payments",E),
  ("showcase","carousel","Web development service: what a business website project covers (services list only)","Your website is your 24/7 salesperson. Is it working?","Start a project",S)],
 [("industry-problem","carousel","Hotel front desk: reservations and billing in separate places vs one system","Reservations in a diary, bills in Excel?","Restaurant / Hotel Pro",E),
  ("education","carousel","GST filing prep checklist for small businesses VERIFY current due dates before posting","Filing week is easier if your books are ready.","Save this",E)],
 [("product-demo","reel","Dashboard walkthrough: revenue, dues, cash and bank balances at a glance","Open the app. Know where your business stands.","See the dashboard",E),
  ("brand-story","image","Why we say 'Code Your Vision With Innovation'","We build what your business actually needs.","Tell us your idea",C)],
 [("faq","reel","FAQ: Does it work without internet? Desktop offline vs cloud sync on Growth","Internet down. Can you still bill?","Learn how it works",E),
  ("ai-trends","carousel","Machine learning for business in plain language: prediction, classification, automation","ML isn't only for big companies.","Talk to us",S)],
 [("workflow-compare","carousel","Month-end: manual totals vs auto P&L and balance sheet","Month-end shouldn't take three days.","Explore accounting",E),
  ("industry-problem","reel","Distributor: purchases, supplier ledger and stock mismatch","Where did that stock go?","Explore features",E)],
 [("education","reel","Barcode basics: why barcode billing cuts entry mistakes (no unverified % claims)","One scan, one correct item.","Explore features",E),
  ("festival","image","Karwa Chauth / festive-season shopping rush tips for retailers VERIFY date (~Oct 29)","Festive season = peak billing season.","Try free for 7 days",E)],
 [("showcase","carousel","App development service: native and cross-platform for iOS and Android","Have an app idea? Here's how we build.","Start a project",S),
  ("faq","carousel","FAQ: Can I use it for a restaurant or hotel? KOT, tables, QR ordering, reservations","Is ERP built for restaurants too?","Restaurant / Hotel Pro",E)],
 [("product-demo","reel","Invoice to PDF to share: the 20-second flow","Create, download, share. Done.","See invoicing",E),
  ("education","carousel","5 signs you've outgrown Excel for billing","Five signs Excel is slowing your business.","Save this",E)],
 [("ai-trends","reel","AI chatbot demo concept: answering FAQs 24/7 (use own demo bot, not a customer's)","What if your website answered customers at 2 am?","Talk to us",S),
  ("workflow-compare","carousel","Customer ledger: notebook vs searchable customer and supplier records","Notebook entry or one search?","Explore features",E)],
 [("industry-problem","carousel","Medical store / pharmacy: batch and expiry tracking problem (feature: batches + expiry)","Expired stock is money lost.","See inventory features",E),
  ("brand-story","carousel","Behind the scenes: how a feature goes from idea to release (process only, no invented milestones)","How we build features.","Follow for more",C)],
 [("faq","image","FAQ: Is there a mobile app? Android app live on Google Play","Yes, there's an app for that.","Get it on Google Play","https://play.google.com/store/apps/details?id=com.codelaksh.erp"),
  ("education","reel","UI/UX 101: 3 mistakes that make business apps hard to use","Why do staff avoid your software?","Talk to us",S)],
 [("festival","carousel","Dhanteras / Diwali prep checklist for shops: stock, billing, staff VERIFY dates (~Nov 6/8)","Diwali week checklist for shopkeepers.","Save this",E),
  ("product-demo","reel","Table management screen: real-time table status (mobile)","Every table, one glance.","Restaurant / Hotel Pro",E)],
 [("workflow-compare","reel","Diwali rush: slow billing vs quick scan-and-bill","Diwali rush. Two ways to bill.","Try free for 7 days",E),
  ("faq","carousel","FAQ: What's the difference between Starter, Growth, Pro, Enterprise?","Which plan fits your business?","See pricing",E)],
 [("showcase","reel","Kidodom app tour: shop, guidance hub, vaccination tracker, deals (real screens)","One app for everything your little one needs.","Visit kidodom.in",K),
  ("education","carousel","Cloud vs desktop software: pros and cons, honest comparison","Cloud or desktop? Honest answer: it depends.","Save this",E)],
 [("industry-problem","reel","QR ordering for cafes: waiting for the waiter vs scanning the table QR","Customer waiting to order for 10 minutes?","Restaurant / Hotel Pro",E),
  ("ai-trends","carousel","AI tools shop owners already use without noticing","You already use AI. Here's where.","Follow for more",S)],
 [("festival","image","Diwali greeting from CodeLaksh (brand-only, no offer) VERIFY date (~Nov 8)","Wishing you a bright, prosperous Diwali.","Visit codelaksh.in","https://codelaksh.in"),
  ("lead-cta","carousel","Free-trial walkthrough: 3 steps to your first invoice","Your first invoice in 3 steps.","Start 7-day free trial",E)],
 [("brand-story","reel","Founder/team message: thank you for following us (use real team footage; approval needed)","Thank you for being here.","Follow us",C),
  ("education","carousel","Add-ons explained: WhatsApp/SMS alerts, gateway setup, migration, AMC (prices from site)","What are add-ons, and do you need them?","See add-ons",E)],
 [("workflow-compare","carousel","Multi-branch: calling each branch for numbers vs one multi-outlet view (Enterprise)","Three branches. Three different reports.","Talk to us",E),
  ("lead-cta","image","Month recap + invitation to request a walkthrough (no results claims)","One month in. Here's what we shared.","Contact CodeLaksh",C)],
 [("product-demo","reel","Reports to CSV: export sales, purchase, stock and tax reports for your CA","Your CA asks for reports. Export in a click.","Explore reports",E),
  ("faq","carousel","FAQ: Do you provide support? Email + chat on Growth, priority on Pro, dedicated on Enterprise","Who do I call when something breaks?","Contact CodeLaksh",C)],
 [("showcase","carousel","Services recap: AI chatbots, ML, web, apps, cloud, digital marketing","Everything we build, in one swipe.","Start a project",S),
  ("lead-cta","reel","Invitation: tell us your business problem and we'll suggest a solution (no promises of outcomes)","What's the one thing slowing your business?","Contact CodeLaksh",C)]
]
start = dt.date(2026, 10, 11)
rows = []
for i, day in enumerate(D):
    d = start + dt.timedelta(days=i)
    for slot, (pillar, fmt, concept, hook, cta, url) in enumerate(day, start=1):
        rows.append(dict(id=f"{d}-{slot}", date=str(d), time_ist="12:30" if slot == 1 else "19:30", pillar=pillar, format=fmt, concept=concept, hook=hook, cta=cta, url=url,
                         campaign=f"{pillar.replace('-','_')}_oct_nov26", status="drafted" if "[DONE" in concept else "planned"))
assert len(rows) == 60
json.dump(rows, open("calendar.json", "w"), indent=2, ensure_ascii=False)
md = ["# CodeLaksh Instagram 30-day calendar (2026-10-11 to 2026-11-09)", "",
      "60 posts, 2 per day. Times are starting assumptions (12:30 / 19:30 IST); replace with Insights data. `VERIFY` = confirm date/claim before approval. Planned posts need caption, creative and alt text before approval; the system rejects posts missing any of them.", "",
      "| Date | Slot | Pillar | Format | Concept | Hook | CTA | Link |", "|---|---|---|---|---|---|---|---|"]
for r in rows:
    md.append(f"| {r['date']} | {r['time_ist']} | {r['pillar']} | {r['format']} | {r['concept']} | {r['hook']} | {r['cta']} | {r['url'].replace('https://','')} |")
from collections import Counter
c = Counter(r["format"] for r in rows); p = Counter(r["pillar"] for r in rows)
md += ["", f"Format mix: {dict(c)}", f"Pillar mix: {dict(p)}"]
open("calendar.md", "w").write("\n".join(md) + "\n")
print(c, p)
