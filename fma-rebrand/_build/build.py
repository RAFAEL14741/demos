"""Builds fma-rebrand/index.html from page.html + the OFFICIAL Maison mark files (never redrawn)."""
import re, sys
sys.path.insert(0, "/home/claude/design-brain/review/fma-logo-v4")
import mono
B = "/home/claude/fma-ad/public/brand/maison/"
OUT = "/home/claude/demos/fma-rebrand/"

def d_and_vb(f):
    s = open(B + f).read()
    return re.search(r' d="([^"]+)"', s).group(1), re.search(r'viewBox="([^"]+)"', s).group(1)

FULL, VB = d_and_vb("fma-mark-black.svg")
SMALL, SVB = d_and_vb("fma-mark-smallcut-black.svg")

# split = (mark ∩ thick band) + (mark − band); band rebuilt with build()'s own numbers
g, _ = mono.build(); P = mono.P
assert mono.to_path(g) == FULL, "official file != build()"
W, HM, T, h, Td = P["W"], P["HM"], P["T"], P["h"], P["Tdiag"]
Vx = (T - 10 + Td / 2 + W - h * 1.7) / 2 + 20
x1 = T + Td / 2 - 10
d1 = mono.band((x1, 0), (2 * Vx - x1, 2 * HM), Td)
DIAG, REST = mono.to_path(g.intersection(d1)), mono.to_path(g.difference(d1))
DX, DY = (2 * Vx - x1) - x1, 2 * HM          # the band's own direction
OFF = 0.30
print("start offset", -OFF * DX, -OFF * DY)

# staggered lining pattern: 170px cells, mark 118px tall, every other row shifted half a cell
vx, vy, vw, vh = map(float, VB.split())
mh = 118; mw = mh * vw / vh
oak_d = FULL
def mk(cx, cy): return f'<svg x="{cx-mw/2:.1f}" y="{cy-mh/2:.1f}" width="{mw:.1f}" height="{mh}" viewBox="{VB}"><use href="#m"/></svg>'
pat = (f'<svg xmlns="http://www.w3.org/2000/svg" width="170" height="340" viewBox="0 0 170 340">'
       f'<defs><path id="m" d="{oak_d}" fill="#D2B48A" fill-rule="evenodd"/></defs>'
       + mk(85, 85) + mk(0, 255) + mk(170, 255) + '</svg>')
open(OUT + "brand/pattern-oak.svg", "w").write(pat)

page = open("/home/claude/work/page.html").read()
for k, v in {"{{FULL}}": FULL, "{{VB}}": VB, "{{REST}}": REST, "{{DIAG}}": DIAG, "{{SMALL}}": SMALL, "{{SVB}}": SVB,
             "{{DX}}": f"{-OFF*DX:.2f}", "{{DY}}": f"{-OFF*DY:.2f}"}.items():
    page = page.replace(k, v)
assert "{{" not in page, re.findall(r"\{\{\w+\}\}", page)
open(OUT + "index.html", "w").write(page)
print("wrote", len(page), "bytes")
