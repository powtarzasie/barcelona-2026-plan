# Infografika trasy Barcelona 2026 — mapa z ponumerowanymi punktami (PIL)
import math
from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 2160
img = Image.new("RGB", (W, H), (252, 249, 244))
d = ImageDraw.Draw(img)

GEO  = "C:/Windows/Fonts/georgia.ttf"
GEOI = "C:/Windows/Fonts/georgiai.ttf"
GEOB = "C:/Windows/Fonts/georgiab.ttf"
ARI  = "C:/Windows/Fonts/arial.ttf"
ARIB = "C:/Windows/Fonts/arialbd.ttf"
def F(p, s): return ImageFont.truetype(p, s)

# Kolory dni
DAY = {1: (227, 152, 50), 2: (193, 74, 56), 3: (38, 110, 176), 4: (34, 130, 75)}
SLATE = (51, 62, 80)
INK = (40, 48, 60)
MUTED = (110, 120, 132)
SEA = (205, 228, 238)
LAND = (247, 243, 236)

# Punkty: (nr, lat, lng, dzień, nazwa)
P = [
    (1, 41.2966, 2.0833, 1, "Lotnisko El Prat (T2) — przylot"),
    (2, 41.4049, 2.1558, 1, "Hotel: Residencia Erasmus Gràcia"),
    (3, 41.4012, 2.1612, 1, "Bar Bodega Quimet — tapas"),
    (4, 41.4028, 2.1564, 1, "Plaça del Sol — Gràcia"),
    (5, 41.4036, 2.1743, 1, "Sagrada Família — prezentacja TdF (opcja)"),
    (6, 41.4015, 2.1573, 1, "Extra Bar — kolacja"),
    (7, 41.4138, 2.1527, 2, "Park Güell"),
    (8, 41.3837, 2.1764, 2, "Katedra — Dzielnica Gotycka"),
    (9, 41.3800, 2.1749, 2, "Plaça Reial"),
    (10, 41.3846, 2.1769, 2, "Mercat de Santa Caterina"),
    (11, 41.3844, 2.1821, 2, "Santa Maria del Mar — El Born"),
    (12, 41.3850, 2.1820, 2, "El Xampanyet — cava i tapas"),
    (13, 41.3716, 2.1528, 2, "Fontanna Magiczna — Montjuïc (opcja)"),
    (14, 41.4036, 2.1743, 3, "Sagrada Família — z zewnątrz"),
    (15, 41.3809, 2.1228, 3, "Camp Nou — Barça Immersive"),
    (16, 41.3917, 2.1648, 3, "Passeig de Gràcia — TdF + Casa Batlló"),
    (17, 41.3783, 2.1864, 3, "Can Ros / Can Solé — Barceloneta"),
    (18, 41.3968, 2.2022, 4, "Plaża Bogatell"),
    (19, 41.4028, 2.1573, 4, "Sol Soler — ostatni lunch"),
    (20, 41.2966, 2.0833, 4, "Lotnisko El Prat (T2) — powrót"),
]

# --- Obszar mapy ---
MX0, MY0, MX1, MY1 = 60, 210, 1540, 1300
d.rounded_rectangle([MX0, MY0, MX1, MY1], radius=28, fill=LAND, outline=(225, 216, 203), width=2)

# Projekcja (pomijamy lotnisko w bbox; pokażemy je w rogu)
city = [p for p in P if p[0] not in (1, 20)]
lats = [p[1] for p in city]; lngs = [p[2] for p in city]
latmin, latmax = min(lats), max(lats)
lngmin, lngmax = min(lngs), max(lngs)
kx = math.cos(math.radians((latmin + latmax) / 2))
wU = (lngmax - lngmin) * kx
hU = (latmax - latmin)
pad = 120
availw, availh = (MX1 - MX0) - 2 * pad, (MY1 - MY0) - 2 * pad
scale = min(availw / wU, availh / hU)
dw, dh = wU * scale, hU * scale
ox = MX0 + ((MX1 - MX0) - dw) / 2
oy = MY0 + ((MY1 - MY0) - dh) / 2

# Ręczne korekty pozycji dla zatłoczonych pinezek (skupiska Gràcia i Stare Miasto)
OFF = {
    # Gràcia (okolice hotelu) — rozsuwamy
    2: (-52, -44), 3: (40, 14), 4: (-34, 30), 6: (52, -8), 19: (18, 60),
    # Stare Miasto / El Born
    8: (-46, -22), 9: (-18, 42), 10: (22, -8), 11: (52, 22), 12: (8, 60), 16: (-34, 16),
}

def proj(lat, lng):
    return ox + (lng - lngmin) * kx * scale, oy + (latmax - lat) * scale

AIRPORT = (MX0 + 92, MY1 - 70)
pos = {}
for nr, lat, lng, day, name in P:
    if nr in (1, 20):
        pos[nr] = AIRPORT
    else:
        x, y = proj(lat, lng)
        dx, dy = OFF.get(nr, (0, 0))
        pos[nr] = (x + dx, y + dy)

# subtelny morski akcent w prawym-dolnym narożniku (strona Barcelonety/Bogatell)
d.polygon([(MX1, MY1 - 250), (MX1, MY1), (MX1 - 360, MY1)], fill=SEA)
d.text((MX1 - 250, MY1 - 70), "Morze", font=F(GEOI, 30), fill=(70, 120, 140))

# kompas
d.text((MX0 + 36, MY0 + 28), "N", font=F(GEOB, 38), fill=MUTED)
d.line([(MX0 + 50, MY0 + 30), (MX0 + 50, MY0 + 78)], fill=MUTED, width=3)
d.polygon([(MX0 + 50, MY0 + 22), (MX0 + 42, MY0 + 40), (MX0 + 58, MY0 + 40)], fill=MUTED)

# --- Trasa: linie między kolejnymi punktami ---
def dash_line(p1, p2, color, width=4, dash=16, gap=12):
    x1, y1 = p1; x2, y2 = p2
    dist = math.hypot(x2 - x1, y2 - y1)
    if dist == 0: return
    steps = int(dist // (dash + gap))
    for i in range(steps + 1):
        s = i * (dash + gap) / dist
        e = min((i * (dash + gap) + dash) / dist, 1)
        d.line([(x1 + (x2 - x1) * s, y1 + (y2 - y1) * s),
                (x1 + (x2 - x1) * e, y1 + (y2 - y1) * e)], fill=color, width=width)

for i in range(len(P) - 1):
    a = P[i]; b = P[i + 1]
    p1, p2 = pos[a[0]], pos[b[0]]
    if a[0] in (1, 20) or b[0] in (1, 20):
        dash_line(p1, p2, (150, 158, 168), width=4)
    else:
        d.line([p1, p2], fill=DAY[a[3]] + (0,) if False else DAY[a[3]], width=6)

# --- Pinezki ---
def pin(xy, label, color, r=26):
    x, y = xy
    d.ellipse([x - r, y - r, x + r, y + r], fill=color, outline=(255, 255, 255), width=4)
    f = F(ARIB, 26 if len(label) <= 2 else 20)
    tw = d.textlength(label, font=f)
    d.text((x - tw / 2, y - (15 if len(label) <= 2 else 12)), label, font=f, fill=(255, 255, 255))

drawn = set()
# scalone: Sagrada (5,14) i lotnisko (1,20)
SKIP = {14, 20}
for nr, lat, lng, day, name in P:
    if nr in SKIP:
        continue
    if nr == 5:
        pin(pos[5], "5·14", SLATE, r=28)
    elif nr == 1:
        pin(pos[1], "1·20", SLATE, r=28)
        d.text((pos[1][0] - 14, pos[1][1] + 34), "✈", font=F(ARI, 30), fill=SLATE)
    else:
        pin(pos[nr], str(nr), DAY[day])

# --- Tytuł ---
d.text((60, 54), "Barcelona dla Dwojga", font=F(GEOB, 72), fill=INK)
d.text((64, 140), "Trasa wyjazdu · 2–5 lipca 2026 · 20 punktów", font=F(ARI, 32), fill=MUTED)

# --- Legenda ---
LY = 1350
d.text((60, LY), "Legenda — punkty trasy", font=F(GEOB, 40), fill=INK)
LY += 70
col = [80, 840]
line_h = 36
DAYNAME = {1: "Dzień 1 · czw 2 lipca", 2: "Dzień 2 · pt 3 lipca",
           3: "Dzień 3 · sob 4 lipca", 4: "Dzień 4 · niedz 5 lipca"}

def legend_block(x, y, day):
    d.rounded_rectangle([x - 14, y - 6, x + 660, y + 34], radius=8, fill=DAY[day])
    d.text((x, y), DAYNAME[day], font=F(ARIB, 26), fill=(255, 255, 255))
    y += line_h + 8
    for nr, lat, lng, dd, name in P:
        if dd != day:
            continue
        d.ellipse([x, y + 5, x + 18, y + 23], fill=DAY[day])
        d.text((x + 34, y), f"{nr}.  {name}", font=F(ARI, 23), fill=INK)
        y += line_h
    return y

y1 = legend_block(col[0], LY, 1)
y1 = legend_block(col[0], y1 + 16, 2)
y2 = legend_block(col[1], LY, 3)
y2 = legend_block(col[1], y2 + 16, 4)

# nota
d.text((60, H - 54), "Numery 5·14 = Sagrada Família (dwa dni) · 1·20 = lotnisko (przylot i powrót). "
                     "Linie przerywane = transfer lotniskowy.", font=F(ARI, 22), fill=MUTED)

img.save("public/trasa-barcelona.png")
img.convert("RGB").save("public/trasa-barcelona.jpg", quality=90)
print("OK", img.size)
