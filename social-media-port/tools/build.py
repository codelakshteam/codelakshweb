#!/usr/bin/env python3
"""Render media + regenerate queue.json from tools/content.py.
Usage: python3 tools/build.py [--keep-status]   (needs Pillow; Inter fonts optional, falls back to DejaVu)
Output: media/<post-id>/card.jpg (1080x1350 JPEG). Public URL = MEDIA_BASE/<post-id>/<file>.
Posts keep status already in queue.json (posted/failed) so rebuilding never re-queues something already published."""
import json, os, sys, glob, shutil
from PIL import Image, ImageDraw, ImageFont, ImageFilter
sys.path.insert(0, os.path.dirname(__file__))
import content as C

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
A = os.path.join(ROOT, "tools", "assets")
MEDIA = os.path.join(ROOT, "media")
MEDIA_BASE = "https://codelaksh.in/social"  # media/ is published to codelaksh.in/social/ (see README)
W, H = 1080, 1350
BG, SURFACE, TEXT, MUTED, BLUE, TEAL = (10, 13, 22), (19, 26, 43), (243, 246, 252), (164, 174, 196), (4, 131, 210), (20, 184, 166)
FD = "/usr/share/fonts/opentype/inter/"

def font(n, s):
    try: return ImageFont.truetype(FD + n + ".otf", s)
    except OSError: return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", s)

def canvas():
    g = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(g)
    d.ellipse((-300, -300, 700, 700), fill=(8, 60, 100)); d.ellipse((600, 800, 1500, 1700), fill=(10, 70, 70))
    return g.filter(ImageFilter.GaussianBlur(200))

def wrap(d, t, f, w):
    out, cur = [], ""
    for word in t.split():
        x = (cur + " " + word).strip()
        if d.textlength(x, font=f) <= w: cur = x
        else: out.append(cur); cur = word
    return out + ([cur] if cur else [])

def shot(path, width):
    im = Image.open(os.path.join(A, path)).convert("RGB")
    im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
    f = Image.new("RGB", (width + 12, im.height + 12), (60, 72, 100)); f.paste(im, (6, 6))
    m = Image.new("L", f.size, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, *f.size), radius=28, fill=255)
    o = Image.new("RGBA", f.size); o.paste(f, (0, 0), m); return o

SHOTS = {"dash": ("erp/d-dashboard.webp", 920), "inv": ("erp/d-invoice.webp", 920), "rep": ("erp/d-reports.webp", 920),
         "bar": ("erp/d-barcode-labels.webp", 920), "plan": ("erp/d-plan-billing.webp", 920),
         "mbill": ("erp/m-billing.webp", 330), "mtab": ("erp/m-tables.webp", 330), "minv": ("erp/m-invoices.webp", 330),
         "mpay": ("erp/m-payments.webp", 330), "mrep": ("erp/m-reports.webp", 330),
         "k2": ("kidodom/2-discover.webp", 330), "k3": ("kidodom/3-shop.webp", 330), "k5": ("kidodom/5-guidance.webp", 330)}

def card(pillar, hook, sub, shot_key, out):
    img = canvas(); d = ImageDraw.Draw(img)
    logo = Image.open(os.path.join(A, "logo-white.png")).convert("RGBA"); logo.thumbnail((64, 64)); img.paste(logo, (64, 60), logo)
    d.text((140, 70), "CodeLaksh", font=font("Inter-Bold", 34), fill=TEXT)
    label = C.LABEL[pillar]; f = font("Inter-SemiBold", 28); w = d.textlength(label, font=f)
    d.rounded_rectangle((64, 190, 64 + w + 48, 246), radius=28, fill=TEAL if pillar in ("festival", "lead-cta") else BLUE); d.text((88, 202), label, font=f, fill=(255, 255, 255))
    hf = font("InterDisplay-ExtraBold", 84 if len(hook) < 60 else 72); y = 286
    for line in wrap(d, hook, hf, W - 128): d.text((64, y), line, font=hf, fill=TEXT); y += int(hf.size * 1.1)
    y += 16; sf = font("Inter-Regular", 38)
    for line in wrap(d, sub, sf, W - 128): d.text((64, y), line, font=sf, fill=MUTED); y += 52
    if shot_key:
        p, wd = SHOTS[shot_key]; s = shot(p, wd)
        if wd == 920: img.paste(s, (80, min(max(y + 50, 760), H - 140 - s.height)), s); d.text((64, H - 70), "Code Your Vision With Innovation", font=font("Inter-Medium", 26), fill=MUTED)
        else: img.paste(s, ((W - s.width) // 2, max(y + 40, 700)), s)
    else:
        big = Image.open(os.path.join(A, "logo-white.png")).convert("RGBA").resize((420, 342), Image.LANCZOS)
        a = big.split()[3].point(lambda v: v // 7); big.putalpha(a); img.paste(big, (W - 500, H - 480), big)
        d.text((64, H - 70), "Code Your Vision With Innovation", font=font("Inter-Medium", 26), fill=MUTED)
    os.makedirs(os.path.dirname(out), exist_ok=True); img.save(out, "JPEG", quality=95, subsampling=0)

def caption(pillar, hook, body, link, cta):
    tags = C.TAGS["kidodom" if pillar == "kidodom" else pillar]
    return f"{hook}\n\n{body}\n\n{cta}: link in bio or {link}\n\n{tags}"

def main():
    old = {p["id"]: p for p in json.load(open(os.path.join(ROOT, "queue.json")))} if os.path.exists(os.path.join(ROOT, "queue.json")) else {}
    queue = [p for p in old.values() if p["id"].startswith("2026-10-11")]  # hand-made carousels are kept as-is
    for pid, (pillar, hook, sub, body, key, link, cta, draft) in C.P.items():
        card(pillar, hook, sub, key, os.path.join(MEDIA, pid, "card.jpg"))
        date, slot = pid.rsplit("-", 1)
        at = f"{date}T01:00:00Z" if slot == "1" else f"{date}T13:30:00Z"  # 06:30 / 19:00 IST: due at the 10:00 IST run or the next run after it
        item = {"id": pid, "platforms": ["instagram"], "caption": caption(pillar, hook, body, link, cta),
                "image_url": f"{MEDIA_BASE}/{pid}/card.jpg", "alt_text": f"{hook} {sub}.", "scheduled_at": at,
                "status": "draft" if draft else "pending"}
        if draft: item["notes"] = draft
        prev = old.get(pid)
        if prev and prev["status"] in ("posted", "failed"): item = prev
        queue.append(item)
    queue.sort(key=lambda p: p["scheduled_at"])
    json.dump(queue, open(os.path.join(ROOT, "queue.json"), "w"), indent=2, ensure_ascii=False); open(os.path.join(ROOT, "queue.json"), "a").write("\n")
    print(len(queue), "queue items;", sum(p["status"] == "pending" for p in queue), "pending")

if __name__ == "__main__": main()
