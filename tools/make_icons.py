# Génère les icônes PNG (iOS n'accepte pas le SVG pour l'écran d'accueil). Même dessin que icon.svg.
import sys
from PIL import Image, ImageDraw
out = sys.argv[1]
S = 2048  # dessin en grand puis réduction = bords lisses
img = Image.new('RGB', (S, S))
top, bot = (127, 211, 165), (47, 158, 111)
px = img.load()
for y in range(S):
    for x in range(S):
        t = (x + y) / (2 * S)
        px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(top, bot))
d = ImageDraw.Draw(img, 'RGBA')
c, r, w = S / 2, S * 150 / 512, round(S * 34 / 512)
box = [c - r, c - r, c + r, c + r]
d.ellipse(box, outline=(255, 255, 255, 90), width=w)
d.arc(box, start=-90, end=0, fill=(255, 255, 255, 255), width=w)
for ang in (-90, 0):  # bouts arrondis de l'arc
    import math
    a = math.radians(ang); cx, cy = c + (r - w / 2) * math.cos(a), c + (r - w / 2) * math.sin(a)
    d.ellipse([cx - w / 2, cy - w / 2, cx + w / 2, cy + w / 2], fill='white')
k = S / 512  # feuille : forme en amande le long d'un axe incliné à 45°, avec une nervure
import math
L, W = 150 * k, 78 * k
ax, ay = c - L / 2 * math.cos(math.radians(-45)), c - L / 2 * math.sin(math.radians(-45))
ux, uy = math.cos(math.radians(-45)), math.sin(math.radians(-45))
pts_l, pts_r = [], []
for i in range(61):
    t = i / 60
    hw = math.sin(math.pi * t) ** 0.9 * W / 2
    bx, by = ax + ux * L * t, ay + uy * L * t
    pts_l.append((bx - uy * hw, by + ux * hw)); pts_r.append((bx + uy * hw, by - ux * hw))
d.polygon(pts_l + pts_r[::-1], fill='white')
d.line([(ax + ux * L * 0.12, ay + uy * L * 0.12), (ax + ux * L * 0.8, ay + uy * L * 0.8)], fill=(47, 158, 111, 255), width=round(7 * k))
d.line([(ax - ux * 22 * k, ay - uy * 22 * k), (ax + ux * 6 * k, ay + uy * 6 * k)], fill='white', width=round(9 * k))
for size, name in [(180, 'apple-touch-icon.png'), (192, 'icon-192.png'), (512, 'icon-512.png')]:
    img.resize((size, size), Image.LANCZOS).save(f'{out}/{name}', optimize=True)
print('ok')
