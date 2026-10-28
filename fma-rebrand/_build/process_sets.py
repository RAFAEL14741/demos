"""Processes kitchen example photos for the "Find a kitchen like yours" section.

SETS/<slug>/N.jpg  = full-size originals (downloaded with ?w=1600&q=80&fm=jpg from kits-sources.json, in order).
Outputs (to demos/fma-rebrand/img/k/):
  <slug>-c-480.jpg / -800.jpg   card cover, landscape CARD_RATIO, cropped around a hand-set focal point
  <slug>-<i>-720.jpg / -1200.jpg gallery photo, NEVER cropped: fitted inside a 4:3 box at its own ratio
and gal.json = {slug: [[w720,h720,w1200,h1200], ...]} so the page can write true width/height + srcset.

Why: cards used to be a 4:5 portrait centre crop of 3:2 originals (cut things off) and the gallery
cover-cropped everything to 4:3 (chopped portrait shots). Now cards are landscape with a focal point
per kitchen, and the gallery shows the whole photo on a calm neutral frame (object-fit: contain).
"""
import numpy as np, os, glob, json, shutil, sys
from PIL import Image

SRC = '/home/claude/work/SETS/'
OUT = '/home/claude/demos/fma-rebrand/img/k/'
CARD_RATIO = float(os.environ.get('CARD_RATIO', 4 / 3))   # width / height
# slug: (photo number used for the cover, focal x 0-1, focal y 0-1). Default (1, .5, .5).
COVER = {}
exec(open('/home/claude/work/cover.py').read()) if os.path.exists('/home/claude/work/cover.py') else None


def grade(im):
    a = np.asarray(im).astype(np.float32) / 255
    lo = np.percentile(a, 0.5, axis=(0, 1)).mean(); hi = np.percentile(a, 99.5, axis=(0, 1)).mean()
    a = np.clip((a - lo) / max(hi - lo, .5), 0, 1) * np.array([1.018, 1.0, .965])
    a = np.clip(a, 0, 1) ** np.array([.98, 1, 1.02])
    return Image.fromarray((np.clip(a, 0, 1) * 255 + .5).astype(np.uint8))


def crop_ratio(im, ratio, fx=.5, fy=.5):
    W, H = im.size
    if W / H > ratio:                      # too wide: trim the sides around fx
        w = round(H * ratio); x = min(max(round(fx * W - w / 2), 0), W - w); return im.crop((x, 0, x + w, H))
    h = round(W / ratio); y = min(max(round(fy * H - h / 2), 0), H - h); return im.crop((0, y, W, y + h))


def fit(im, bw, bh):
    W, H = im.size; s = min(bw / W, bh / H, 1.0)
    return im.resize((max(1, round(W * s)), max(1, round(H * s))), Image.LANCZOS)


if os.path.isdir(OUT):
    shutil.rmtree(OUT)
os.makedirs(OUT)
manifest = {}
for d in sorted(os.listdir(SRC)):
    fs = sorted(glob.glob(SRC + d + '/*.jpg'), key=lambda p: int(os.path.basename(p)[:-4]))
    manifest[d] = []
    cv, fx, fy = COVER.get(d, (1, .5, .5))
    for i, f in enumerate(fs, 1):
        im = grade(Image.open(f).convert('RGB'))
        dims = []
        for s, bh in ((720, 540), (1200, 900)):
            g = fit(im, s, bh); g.save(f'{OUT}{d}-{i}-{s}.jpg', quality=78, optimize=True, progressive=True); dims += list(g.size)
        manifest[d].append(dims)
        if i == cv:
            c = crop_ratio(im, CARD_RATIO, fx, fy)
            for s in (480, 800):
                c.resize((s, round(s / CARD_RATIO)), Image.LANCZOS).save(f'{OUT}{d}-c-{s}.jpg', quality=80, optimize=True, progressive=True)
json.dump(manifest, open('/home/claude/work/gal.json', 'w'))
print(len(manifest), 'kitchens', sum(len(v) for v in manifest.values()), 'photos; card ratio', round(CARD_RATIO, 3))
