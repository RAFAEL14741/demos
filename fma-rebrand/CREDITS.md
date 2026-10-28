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
- `img/k/*` (the "Find a kitchen like yours" sets, 16 kitchens / 62 photos, v7.3): free Unsplash License photos; each set is one kitchen from one photographer's upload batch. Card covers are landscape 4:3 crops around a hand-set focal point (`cover.py`); gallery photos are never cropped (each is shown whole at its own ratio on a neutral frame; on phones the frame is square for kitchens whose photos are mostly tall). All get the same light warm grade. Labeled as example photos, not FMA jobs, on the cards and in each kitchen sheet (which names the photographer).
  Point3D Commercial Imaging (@3dottawa): small-white-galley, small-gray-onewall, small-twotone-galley, medium-gray-shaker-island, medium-maple-island, small-white-onewall-dining; Callum Hill (@inkyhills): medium-white-shaker-everyday; Zac Gudakov (@zacgudakov): large-family-white-shaker; Raphael (Ajani Kamali Akio) (@akasm): small-condo-island-apartment; Decima Athens (@decimaandathens): medium-green-rowhouse; Lisa Anna (@lisaanna195): medium-greige-shaker-island, medium-navy-raised-panel; Caroline Badran (@___atmos): small-dusty-blue-apartment; Franco Debartolo (@francotheshooter): large-cream-shaker-brass; Huy Phan (@huyphan2602): small-sage-checker-tile; Alex Tyson (@alextyson195): medium-navy-butcherblock. Checked Oct 27 2026, none are Unsplash+.
  v7.2 (Oct 27 2026): added Callum Hill (@inkyhills) white-shaker set, Zac Gudakov (@zacgudakov) large family kitchen set, Raphael (Ajani Kamali Akio) (@akasm) condo set; removed the luxury sets (large-dark-gray-marble, large-walnut-black, large-black-oak-slab, large-twotone-slab-island, large-glass-front-uppers, medium-walnut-slab-apartment) and three sets whose photos look AI-generated (small-forest-green-cottage, medium-walnut-island, small-rustic-cabin-panel); dropped near-duplicate shots from several sets.
  v7.3 (Oct 28 2026): removed the last 3 Clay Banks (@claybanks) kitchen sets (small-butter-yellow-two-tone, medium-farmhouse-beadboard, medium-open-shelving-inset) because the photos may be AI-generated. Clay Banks still appears once in `img/looks/` (black-2).
- `img/looks/*` (cabinet photos for "What we install", "Pick a look", "How it works", budget cards, offer): free Unsplash License photos, cropped to 4:5 and given one shared light warm grade. Every one is labeled "Example photo(s)" on the page; none are FMA jobs.
  white-1, white-2, white-5: Zac Gudakov (@zacgudakov) · white-3: Courtney Smith (@courtneysmith) · white-4, detail-1: Bailey Alexander (@baileyal3xander)
  black-1, black-4: Sven Brandsma (@seffen99) · black-2: Clay Banks (@claybanks) · black-3: Salvo Media LLC (@salvomedia)
  green-1: Decima Athens (@decimaandathens) · green-2: Janay Peters (@jpetersbydesign) · green-3, blue-4, wood-3, detail-5: Caroline Badran (@___atmos) · green-4: Alex Tyson (@alextyson195)
  blue-1: Lisa Anna (@lisaanna195) · blue-2: Tazz Anderson (@tazzanderson) · wood-1: Brad Chapman (@brad_chapman) · wood-2: Kailun Zhang (@kailun2019)
  wood-4: Sergei Sushchik (@sergeisushchik) · wood-5: Tile Merchant Ireland (@tilemerchant) · detail-2: Ruan Richard Rodrigues (@ricdeoliveira)
  detail-3, detail-6: Matt Adams (@mandcpainting) · detail-4: Orgalux (@orgalux). Photo IDs in the commit message of this change; checked Oct 27 2026, none are Unsplash+.
- `img/ba-before-*.jpg` / `img/ba-after-*.jpg`: square crop of the Lisa Anna hero photo; "after" is the same photo with the cabinets recolored digitally (labeled on the page).
- `img/sm/*`: resized copies (600w/900w) of the cab-*.jpg / pantry.jpg photos below.
- `img/cab-*.jpg`, `img/sm/*`: older stock photos from v1, no longer shown on the home page.

## Logo
- `brand/*.svg` and the paths inlined in `index.html`: official Maison files from RAFAEL14741/fma-ad `public/brand/maison/`, unmodified.
  (v2.0 only, replaced in v2.1 by the cabinet hero) The hero animation split the official mark into two pieces (thick diagonal + the rest) with shapely, using the band from
  RAFAEL14741/design-brain `review/fma-logo-v4/mono.py` `build()`. The two pieces union back to the official file exactly,
  and the page swaps back to the untouched official path once the diagonal lands.
- `brand/pattern-oak.svg`: the official oak mark repeated in a staggered 170px tile (used at 4% on "How it works" only).
- `og-maison.png`: official `og-1200x630.png` from the brand kit.

## Price figures (shown as public data, not FMA quotes)
- Price table by kitchen size (v7): install only = Fixr national labor $50–$200 per linear foot (updated Jan 22 2026) × about 15 / 25 / 40 ft (Fixr's kitchen-size guide); new cabinets installed = HomeBlue Philadelphia per-kitchen totals for 15 / 25 / 40 linear ft (Jun 3 2024). No public cabinet prices were found for Bucks, Montgomery or South Jersey, so the page says so and shows the Philadelphia numbers.
  https://www.fixr.com/costs/cabinets-installation · https://www.homeblue.com/cabinets/philadelphia-pa-cost-of-kitchen-cabinets.htm
- Older figures (v6 and before):
- Cabinet installation, Philadelphia: HomeAdvisor cost page, typical $1,684–$7,205 (checked Oct 27 2026) https://embedded.homeadvisor.com/tloc/Philadelphia-PA/Cabinets-Install/
- New cabinets installed: HomeBlue Philadelphia, $300–$650 per linear foot (dated Jun 3 2024) https://www.homeblue.com/cabinets/philadelphia-pa-cost-of-kitchen-cabinets.htm
- Refacing: HomeBlue Philadelphia, $150–$210 per door (dated Aug 9 2022) https://www.homeblue.com/cabinet-refacing/philadelphia-pa-cabinet-refacing-cost.htm

## Fonts and code
- Bodoni Moda and Inter: SIL Open Font License, self-hosted from @fontsource-variable.
- No animation libraries: the hero repaint is plain canvas + CSS masks.

No AI images. No Higgsfield.
