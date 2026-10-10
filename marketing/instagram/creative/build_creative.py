"""Render CodeLaksh Instagram carousels (1080x1350, 4:5) from real product screenshots.

Usage: python3 marketing/instagram/creative/build_creative.py
Output: public/social/<post-id>/slide-N.jpg (JPEG: the only image format the Instagram API accepts) (served at https://codelaksh.in/social/...)
Brand tokens come from app/globals.css (primary #0483d2, teal #14b8a6, dark bg #0a0d16).
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
PUB = os.path.join(ROOT, "public")
OUT = os.path.join(PUB, "social")
W, H = 1080, 1350
BG, SURFACE, TEXT, MUTED = (10, 13, 22), (19, 26, 43), (243, 246, 252), (164, 174, 196)
BLUE, TEAL, ORANGE = (4, 131, 210), (20, 184, 166), (255, 107, 53)
FD = "/usr/share/fonts/opentype/inter/"


def font(name, size):
    return ImageFont.truetype(FD + name + ".otf", size)


def gradient(w, h, c1, c2):
    base = Image.new("RGB", (w, h), c1)
    top = Image.new("RGB", (w, h), c2)
    mask = Image.linear_gradient("L").resize((w, h)).rotate(45, expand=False)
    return Image.composite(top, base, mask)


def canvas():
    img = Image.new("RGB", (W, H), BG)
    glow = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(glow)
    d.ellipse((-300, -300, 700, 700), fill=(8, 60, 100))
    d.ellipse((600, 800, 1500, 1700), fill=(10, 70, 70))
    from PIL import ImageFilter
    glow = glow.filter(ImageFilter.GaussianBlur(200))
    return glow


def wrap(d, text, f, max_w):
    lines, cur = [], ""
    for word in text.split():
        t = (cur + " " + word).strip()
        if d.textlength(t, font=f) <= max_w:
            cur = t
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def text_block(d, xy, text, f, fill, max_w, spacing=1.2):
    x, y = xy
    for line in wrap(d, text, f, max_w):
        d.text((x, y), line, font=f, fill=fill)
        y += int(f.size * spacing)
    return y


def chrome(img, i, n):
    d = ImageDraw.Draw(img)
    logo = Image.open(os.path.join(PUB, "logo-white.png")).convert("RGBA")
    logo.thumbnail((64, 64))
    img.paste(logo, (64, 60), logo)
    d.text((140, 70), "CodeLaksh", font=font("Inter-Bold", 34), fill=TEXT)
    d.text((W - 64, 74), f"{i}/{n}", font=font("Inter-Medium", 28), fill=MUTED, anchor="ra")
    d.text((64, H - 70), "Code Your Vision With Innovation", font=font("Inter-Medium", 26), fill=MUTED)
    if i < n:
        d.text((W - 64, H - 70), "Swipe  →", font=font("Inter-SemiBold", 28), fill=TEAL, anchor="ra")


def pill(d, xy, text, fill=BLUE):
    f = font("Inter-SemiBold", 28)
    w = d.textlength(text, font=f)
    x, y = xy
    d.rounded_rectangle((x, y, x + w + 48, y + 56), radius=28, fill=fill)
    d.text((x + 24, y + 12), text, font=f, fill=(255, 255, 255))


def shot(path, width, radius=28):
    im = Image.open(os.path.join(PUB, path)).convert("RGB")
    h = int(im.height * width / im.width)
    im = im.resize((width, h), Image.LANCZOS)
    pad = 6
    framed = Image.new("RGB", (width + pad * 2, h + pad * 2), (60, 72, 100))
    framed.paste(im, (pad, pad))
    mask = Image.new("L", framed.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *framed.size), radius=radius, fill=255)
    out = Image.new("RGBA", framed.size)
    out.paste(framed, (0, 0), mask)
    return out


def shadowed(img, base, xy):
    from PIL import ImageFilter
    sh = Image.new("RGBA", (img.width + 120, img.height + 120), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle((60, 80, 60 + img.width, 80 + img.height), radius=28, fill=(0, 0, 0, 170))
    sh = sh.filter(ImageFilter.GaussianBlur(28))
    base.paste(sh, (xy[0] - 60, xy[1] - 60), sh)
    base.paste(img, xy, img)


def slide_text(img, kicker, headline, sub=None, y0=190, hl_size=82):
    d = ImageDraw.Draw(img)
    pill(d, (64, y0), kicker)
    y = text_block(d, (64, y0 + 96), headline, font("InterDisplay-ExtraBold", hl_size), TEXT, W - 128, 1.1)
    if sub:
        y = text_block(d, (64, y + 30), sub, font("Inter-Regular", 36), MUTED, W - 128, 1.35)
    return y


def save(img, post, n):
    d = os.path.join(OUT, post)
    os.makedirs(d, exist_ok=True)
    img.save(os.path.join(d, f"slide-{n}.jpg"), "JPEG", quality=95, subsampling=0)


# ---------------- Post 1: ERP product carousel (4 slides) ----------------
def post1():
    pid, N = "2026-10-11-1-erp-gst-billing", 4
    # 1 hook
    img = canvas()
    y = slide_text(img, "GST BILLING", "Your billing counter shouldn't stop when the internet does.",
                   "CodeLaksh ERP: GST-ready billing that works fully offline on desktop.", 190, 84)
    s = shot("erp-assets/desktop/dashboard.webp", 900)
    shadowed(s, img, (90, min(y + 60, H - 150 - s.height)))
    chrome(img, 1, N); save(img, pid, 1)
    # 2 invoices
    img = canvas()
    y = slide_text(img, "INVOICES", "GST invoices in seconds.", "CGST / SGST, print, PDF download or share.", 190, 92)
    s = shot("erp-assets/desktop/invoice.webp", 900)
    shadowed(s, img, (90, y + 50))
    chrome(img, 2, N); save(img, pid, 2)
    # 3 mobile + sync
    img = canvas()
    y = slide_text(img, "GROWTH PLAN", "Bill at the counter. Check the numbers from your phone.",
                   "Cloud sync and the mobile app come with the Growth plan.", 190, 70)
    s = shot("erp-assets/mobile/billing.webp", 250)
    s2 = shot("erp-assets/mobile/reports.webp", 250)
    top = y + 60
    shadowed(s, img, (240, top))
    shadowed(s2, img, (590, top + 40))
    chrome(img, 3, N); save(img, pid, 3)
    # 4 CTA
    img = canvas()
    d = ImageDraw.Draw(img)
    pill(d, (64, 190), "TRY IT FREE", TEAL)
    y = text_block(d, (64, 286), "7-day free trial on Starter and Growth.", font("InterDisplay-ExtraBold", 84), TEXT, W - 128, 1.1)
    y = text_block(d, (64, y + 20), "Built in India for shops, distributors, restaurants and hotels.", font("Inter-Regular", 38), MUTED, W - 128, 1.35)
    card_y = y + 60
    d.rounded_rectangle((64, card_y, W - 64, card_y + 330), radius=36, fill=SURFACE, outline=(50, 62, 90), width=2)
    for k, (a, b) in enumerate([("Starter", "Rs. 3,500 one-time"), ("Growth", "Rs. 599 / month"), ("Restaurant / Hotel Pro", "Rs. 1,999 / month / outlet")]):
        yy = card_y + 36 + k * 96
        d.text((100, yy), a, font=font("Inter-SemiBold", 36), fill=TEXT)
        d.text((W - 100, yy), b, font=font("Inter-Medium", 32), fill=MUTED, anchor="ra")
    d.text((100, card_y + 300), "Prices exclude 18% GST", font=font("Inter-Regular", 24), fill=MUTED, anchor="ls")
    d.text((64, card_y + 390), "codelaksh.in/erp", font=font("InterDisplay-Bold", 64), fill=BLUE)
    d.text((64, card_y + 480), "Link in bio  |  Also on Google Play", font=font("Inter-Medium", 34), fill=MUTED)
    chrome(img, 4, N); save(img, pid, 4)


# ---------------- Post 2: education carousel (6 slides) ----------------
def post2():
    pid, N = "2026-10-11-2-billing-software-checklist", 6
    img = canvas()
    slide_text(img, "BUYER'S CHECKLIST", "Buying billing software? Ask these 4 questions first.",
               "Save this before you pay for anything.", 280, 92)
    chrome(img, 1, N); save(img, pid, 1)
    qs = [
        ("Question 1", "Are the invoices actually GST-ready?", "Look for CGST / SGST split, print and PDF, and GST reports you can hand to your CA."),
        ("Question 2", "What happens when the internet drops?", "A counter can't wait for a router. Check what works offline and what needs a connection."),
        ("Question 3", "Can you bring your old data?", "Moving from Tally, Vyapar or manual books? Ask what migration help is included."),
        ("Question 4", "Will it grow with you?", "A second counter or branch shouldn't mean switching software. Ask about branches, users and pricing."),
    ]
    for i, (k, h, s) in enumerate(qs, start=2):
        img = canvas()
        d = ImageDraw.Draw(img)
        d.text((64, 250), str(i - 1), font=font("InterDisplay-Black", 360), fill=(18, 60, 95))
        slide_text(img, k.upper(), h, s, 520, 76)
        chrome(img, i, N); save(img, pid, i)
    img = canvas()
    d = ImageDraw.Draw(img)
    pill(d, (64, 190), "OUR ANSWER", TEAL)
    y = text_block(d, (64, 286), "That's how we built CodeLaksh ERP.", font("InterDisplay-ExtraBold", 84), TEXT, W - 128, 1.1)
    items = ["GST-ready invoices with CGST / SGST", "Desktop app works fully offline", "Data migration from Tally, Vyapar or manual books (add-on)", "Branches and staff users on higher plans"]
    y += 30
    for it in items:
        d.ellipse((64, y + 14, 92, y + 42), fill=TEAL)
        y = text_block(d, (118, y), it, font("Inter-Medium", 38), TEXT, W - 190, 1.3) + 22
    d.text((64, y + 40), "codelaksh.in/erp", font=font("InterDisplay-Bold", 64), fill=BLUE)
    d.text((64, y + 130), "7-day free trial  |  Link in bio", font=font("Inter-Medium", 34), fill=MUTED)
    chrome(img, 6, N); save(img, pid, 6)


if __name__ == "__main__":
    post1(); post2()
    print("done")
