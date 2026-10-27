# Credits: fma-rebrand preview (v2)

## Photos
- `img/oak-grain.jpg`: hero background texture (grayscale, lightened, multiplied over the oak colour at 12%).
  "Close-up of light brown wood grain texture" by Zoshua Colah (@zoshuacolah) on Unsplash,
  https://unsplash.com/photos/close-up-of-light-brown-wood-grain-texture-IBy4mT_jDd0
  Free under the Unsplash License (not Unsplash+). Downloaded Oct 26 2026.
- `img/hero-kitchen-*.jpg` + `img/hero-mask-*.png`: hero photo (cropped to the base cabinets) and a cabinet mask made from it.
  "A kitchen with blue cabinets and a rug on the floor" by Lisa Anna (@lisaanna195) on Unsplash, https://unsplash.com/photos/KBec8f4qG5k .
  Free under the Unsplash License. Downloaded Oct 27 2026. The other cabinet colors are generated in the browser from this one photo;
  the page says so under the swatches ("Example photo. Colors changed digitally to show options.").
- `img/preview-before-after*.jpg`: made from the same Lisa Anna hero photo (left half original, right half recolored digitally). Labeled "digital mockup" on the page.
- `img/sm/*`: resized copies (600w/900w) of the cab-*.jpg / pantry.jpg photos below.
- `img/cab-*.jpg`: stock kitchen photos carried over from v1. Every one is captioned "Example photo" on the page. None are FMA jobs.

## Logo
- `brand/*.svg` and the paths inlined in `index.html`: official Maison files from RAFAEL14741/fma-ad `public/brand/maison/`, unmodified.
  (v2.0 only, replaced in v2.1 by the cabinet hero) The hero animation split the official mark into two pieces (thick diagonal + the rest) with shapely, using the band from
  RAFAEL14741/design-brain `review/fma-logo-v4/mono.py` `build()`. The two pieces union back to the official file exactly,
  and the page swaps back to the untouched official path once the diagonal lands.
- `brand/pattern-oak.svg`: the official oak mark repeated in a staggered 170px tile (used at 4% on "How it works" only).
- `og-maison.png`: official `og-1200x630.png` from the brand kit.

## Price figures (shown as public data, not FMA quotes)
- Install only, Philadelphia: HomeAdvisor cost page, typical $1,684–$7,205 (checked Oct 27 2026) https://embedded.homeadvisor.com/tloc/Philadelphia-PA/Cabinets-Install/
- New cabinets installed: HomeBlue Philadelphia, $300–$650 per linear foot (dated Jun 3 2024) https://www.homeblue.com/cabinets/philadelphia-pa-cost-of-kitchen-cabinets.htm
- Refacing: HomeBlue Philadelphia, $150–$210 per door (dated Aug 9 2022) https://www.homeblue.com/cabinet-refacing/philadelphia-pa-cabinet-refacing-cost.htm

## Fonts and code
- Bodoni Moda and Inter: SIL Open Font License, self-hosted from @fontsource-variable.
- No animation libraries: the hero repaint is plain canvas + CSS masks.

No AI images. No Higgsfield.
