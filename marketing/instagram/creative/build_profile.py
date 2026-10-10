"""Profile kit: avatar + 6 highlight covers -> public/social/profile/. Run after build_creative imports."""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from build_creative import *  # noqa
out = os.path.join(OUT, "profile"); os.makedirs(out, exist_ok=True)

# Avatar 1080x1080 (Instagram crops to a circle: keep the logo inside the central ~70%)
a = gradient(1080, 1080, (4, 131, 210), (20, 184, 166))
logo = Image.open(os.path.join(PUB, "logo-white.png")).convert("RGBA")
logo = logo.resize((620, int(620 * logo.height / logo.width)), Image.LANCZOS)
a.paste(logo, ((1080 - logo.width) // 2, (1080 - logo.height) // 2), logo)
a.save(os.path.join(out, "avatar.jpg"), "JPEG", quality=95)

# Highlight covers 1080x1920 (icon area is the centre circle)
covers = [("ERP", "ERP"), ("PLANS", "Pricing"), ("TIPS", "Tips"), ("KIDODOM", "Kidodom"), ("BUILD", "Services"), ("TALK", "Contact")]
for big, name in covers:
    c = Image.new("RGB", (1080, 1920), BG)
    d = ImageDraw.Draw(c)
    d.ellipse((140, 660, 940, 1460), fill=(14, 40, 70), outline=BLUE, width=10)
    f = font("InterDisplay-ExtraBold", 190 if len(big) <= 4 else 130)
    d.text((540, 1060), big, font=f, fill=TEXT, anchor="mm")
    c.save(os.path.join(out, f"highlight-{name.lower()}.jpg"), "JPEG", quality=95)
print("profile kit done")
