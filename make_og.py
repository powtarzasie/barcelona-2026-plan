# Generator obrazu Open Graph (1200x630) dla planu Barcelona 2026
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
MARGIN = 80

base = Image.open("og_base.jpg").convert("RGB").resize((W, H))

# Pionowy gradient przyciemniający (czytelność tekstu na dole)
grad = Image.new("L", (1, H), 0)
for y in range(H):
    t = y / H
    a = int(36 + (t ** 1.25) * 205)
    grad.putpixel((0, y), min(a, 238))
alpha = grad.resize((W, H))
dark = Image.new("RGB", (W, H), (8, 11, 16))
img = Image.composite(dark, base, alpha)
draw = ImageDraw.Draw(img)

def F(path, size):
    return ImageFont.truetype(path, size)

GEO  = "C:/Windows/Fonts/georgia.ttf"
GEOI = "C:/Windows/Fonts/georgiai.ttf"
ARI  = "C:/Windows/Fonts/arial.ttf"
ARIB = "C:/Windows/Fonts/arialbd.ttf"

AMBER = (235, 168, 70)
WHITE = (246, 244, 241)
GRAY  = (209, 213, 219)

def tracked(pos, text, font, fill, tracking):
    x, y = pos
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x

# --- Kicker: linia + data ---
ky = 352
draw.line([(MARGIN, ky + 16), (MARGIN + 48, ky + 16)], fill=AMBER, width=3)
tracked((MARGIN + 62, ky), "2–5 LIPCA 2026", F(ARIB, 27), AMBER, 6)

# --- Tytuł ---
tf  = F(GEO, 86)
tfi = F(GEOI, 86)
ty = ky + 42
t1 = "Barcelona "
draw.text((MARGIN, ty), t1, font=tf, fill=WHITE)
w1 = draw.textlength(t1, font=tf)
draw.text((MARGIN + w1, ty), "dla Dwojga", font=tfi, fill=AMBER)

# --- Podtytuł ---
sy = ty + 120
draw.text((MARGIN, sy), "Gaudí · tapas · morze · Camp Nou · Tour de France 2026",
          font=F(ARI, 29), fill=GRAY)

# (bez znaczka w rogu — tytuł wystarczająco brandiuje obraz)

img.save("public/og-image.png")
img.convert("RGB").save("public/og-image.jpg", quality=88)
print("OK: public/og-image.png", img.size)
