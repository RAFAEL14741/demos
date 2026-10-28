# Builder prompt: FMA site, kitchens round (fix cropped photos + add normal, everyday kitchens)

**Recommended model: Opus** (photo curation and design judgement, plus a lot of careful multi-step QA).

---

## Your role
You are the builder for the FMA Constructions website preview. Rafael (the owner's son, runs the marketing) gives the direction. You build, check your own work with screenshots, fix, and push. Talk to him short, casual and plain, with short progress updates as you go. Be honest about scores and problems.

At the start, load these skills (and reload them on every follow-up): `rafael-router`, then `frontend-design` + `design-director` (for judging rounds: `design-director` + `design:design-critique`).

## The business (facts you can use, nothing else)
- FMA Constructions installs **kitchen cabinets** in Philadelphia, Bucks and Montgomery counties (PA) and New Jersey. The owner is Flavio Mendanha Araujo.
- They install cabinets customers already bought, or help them pick and order, then install. Own crew, no subcontractors. The person who measures is the one who installs and answers the call.
- Free on-site estimates. Callback within 1 business day. Licensed and insured in PA.
- Phone (267) 367-3388 · fmaconstructions@gmail.com · Instagram @fmaconstructions · Mon–Fri 7am–6pm, Sat 7am–1pm.
- No finished jobs yet, so there are no reviews and no real photos. **All kitchen photos are stock and must say so** ("Example photos… not FMA jobs").
- No warranty: never claim one. No years, no project counts, no fake reviews, no ratings.
- Audience: regular Philadelphia homeowners, many in rowhomes with small kitchens and modest budgets. **They must feel included.**

## Where everything lives
- **Live preview (GitHub Pages):** https://rafael14741.github.io/demos/fma-rebrand/
- **Repo:** `RAFAEL14741/demos`, folder `fma-rebrand/`. Pushing to `main` deploys. Clone it to `/home/claude/demos`.
- **NEVER touch `RAFAEL14741/FMA-Construction`.** That's the live business site.
- **Build sources:** `fma-rebrand/_build/`. Copy them to `/home/claude/work/`; the scripts use absolute paths.
  - `page.v5b.html`: the old page. It is only used as an input for the head/meta/schema, wizard, map and hero scripts.
  - `v7.py`: the page generator. It holds all the section HTML and all the JS for kitchens, the sheet, area and saved looks. It writes `/home/claude/work/page.html`.
  - `v7.css`: all CSS.
  - `kits.json`: **the kitchen list.** Fields:
    - `s` slug, `t` name, `z` small/medium/large
    - `c` color: white, cream, gray, greige, green, blue, lightblue, wood, black, twotone, other
    - `st` style: shaker, flat, raised, beadboard, glass, open, inset, mixed
    - `n` photo count, `lay` layout, `dr` doors, `det` details
    - `ph`/`hd` photographer name and @handle
    - The order in this file is the order on the page.
  - `kits-sources.json`: the Unsplash image URL for every photo of every kitchen, in order (photo 1 = file `-1`).
  - `process_sets.py`: turns downloaded originals into `img/k/<slug>-<n>-720/1200.jpg` (gallery) and `<slug>-c-480/800.jpg` (card cover). It also applies one shared warm grade. Set its SRC folder before running.
  - `build.py`: injects the official logo paths and writes `fma-rebrand/index.html`. It needs:
    - `RAFAEL14741/fma-ad` cloned to `/home/claude/fma-ad`, for `public/brand/maison/*.svg`
    - `RAFAEL14741/design-brain` cloned to `/home/claude/design-brain`, for `review/fma-logo-v4/mono.py`
  - `serve.py`: local server. Run `python3 serve.py` in `/home/claude/work` to serve `/home/claude/demos` at `http://127.0.0.1:8765/fma-rebrand/`.
  - `tests/*.mjs`: Playwright checks. Install with `npm i --prefix /home/claude/work/npm playwright@1.64.1 lighthouse@13`. They import `/home/claude/work/npm/node_modules/playwright/index.mjs` and use `executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome'`. Fix those two paths if your environment differs.
- **Rebuild:** `cd /home/claude/work && python3 v7.py && python3 build.py`.
- **Credits:** `fma-rebrand/CREDITS.md` lists every photo source and price source. Update it whenever photos change.
- **Site lessons:** memory `/topics/lessons-sites.md`. Read it before you start; it's full of traps we already hit.

## WHAT THIS CHAT DID (so you understand the current site)
1. **Built the rebrand preview from the brief** (`RAFAEL14741/fma-ad` → `prompts/fma-site-preview-v2.md` + `BRAND.md`).
   - Maison monogram logo (official files, never redrawn). Colors: oak #D2B48A, black #151515, bone #F3ECE0, oak-deep #7A5C36. Fonts: Bodoni Moda + Inter, self-hosted. Radius: 4px on images, 999px on buttons.
2. **Hero, after 3 rejected versions: the "repaint"** (Rafael loved it; keep it).
   - One real kitchen photo plus a cabinet mask. The canvas recolors the cabinets: navy → warm white → black → sage → stone gray, with a soft wipe every 3s. Clickable swatches.
   - The hero copy carries real info: hours, phone, licensed, areas.
3. **Tried and rejected:**
   - A text-heavy site with icons, steps and price tables (judged boring).
   - A "photo-led" version with a single-photo "Pick a look" grid and lots of oak/black stripes (Rafael: "generic, not premium").
4. **Showed 3 style frames: A Gallery (VYRA-like), B Lookbook, C Showroom.** Rafael picked **A for the whole site**. VYRA (his activewear demo, repo `RAFAEL14741/vyra-demo`) is the quality bar: light canvas, thin elegant serif, photo-led, minimal, things you can tap.
5. **v6 "Gallery" (approved: "soooo much better"):**
   - One bone canvas, big thin Bodoni headlines, light Inter.
   - A full-photo "Our own crew. No subcontractors." moment.
   - Dark cards for the free color preview (drag before/after slider) and the first-customer offer.
   - Light map, light wizard.
   - Polished after a blind judge: tighter spacing, `text-wrap:balance`, prices set in the sans, dark header and no call bar over the footer.
6. **v7 (Rafael: "I love it"):**
   - **"Find a kitchen like yours."** Kitchen cards with size, color and style filters. Tapping one opens a sheet with a swipeable gallery (3–6 photos of the same kitchen), layout/doors/details, the typical price for that size, an area select, and "I want this look". Saved kitchens show as thumbnails in the estimate form and are sent with it. The call bar and header button turn into "Send my N looks".
   - Phone shows 8 kitchens, then "Show all".
   - **Prices by kitchen size** (all public data, labeled "not an FMA quote"):
     - Install only = Fixr national $50–$200 per linear foot × about 15/25/40 ft: $750–$3,000, $1,250–$5,000, $2,000–$8,000.
     - New cabinets installed = HomeBlue Philadelphia (Jun 2024): $4,400–$9,800, $7,400–$16,300, $11,800–$26,000.
     - **No public prices exist for Bucks, Montgomery or South Jersey.** Picking those areas says so and shows the Philadelphia numbers. Never invent per-area numbers.
   - **Organized:**
     - Section order: hero → two ways (have cabinets / need cabinets) → kitchens → crew photo → how it works (services folded in) → free color preview → prices + map → offer → FAQ → estimate form.
     - Menu: Kitchens · How it works · Prices · FAQ · Free estimate.
   - Bolder type: headlines at Bodoni 500, body at Inter 400.
   - **v7.1:** 25 kitchens / 102 photos (9 small, 10 medium, 6 large), 10 color dots, style chips.
7. **Last scores:** Lighthouse performance 96, accessibility 100, best practices 100. All tests pass (page errors, overflow, kitchens/sheet, call bar, two-ways → form, wizard, hero across 5 sizes).

## YOUR TASK (Rafael's words: "some of the pictures don't look really good, they look cut up… every kitchen is very high end, it's okay to have a normal kitchen")

### 1. Fix the cut-up photos
Why they look cut up:
- **Cards** center-crop every photo to a portrait 4:5, but almost all the originals are landscape (3:2). Kitchens get chopped down the middle.
- **Gallery slides** are cover-cropped to 4:3, which cuts portrait shots badly.

Fix it properly:
- Cards: switch to a landscape-friendly ratio (try 4:3 or 3:2 and compare screenshots at 390px and 1440px), or pick a hand-set focal point per kitchen. **Look at every card yourself** and make sure the cabinets read clearly.
- Gallery: show each photo **uncropped** (keep its own ratio). Use a fixed frame with a calm bone/neutral letterbox behind portrait shots. Don't stretch, don't cut.
- Re-download originals from `kits-sources.json` with plain curl (`curl -s -o f.jpg "<url>?w=1600&q=80&fm=jpg"`), reprocess, and update `process_sets.py` to match.
- Remove any shot that's weak on its own: a blurry close-up, one that's mostly ceiling, or a near-duplicate.

### 2. Make it feel normal, not luxury
- Most current large kitchens are luxury. Candidates to **remove or replace**:
  - large-dark-gray-marble
  - large-walnut-black
  - large-black-oak-slab
  - large-twotone-slab-island
  - large-glass-front-uppers
  - medium-walnut-slab-apartment
- Decide by looking at them, and keep a couple of nice ones so there's still something to aspire to.
- Add **8–12 normal, everyday kitchens**, the kind real Philly homeowners have:
  - builder-grade white or gray shaker
  - oak or cherry cabinets
  - rowhome galleys
  - rentals and apartment kitchens
  - older houses with a fresh cabinet job
  - laminate or plain counters
  - normal appliances
- Keep the small / medium / large mix. "Large" can be a normal suburban family kitchen, not a mansion.
- Spares a previous search already found (verify before using):
  - Callum Hill: medium white shaker with an apron sink (image ids starting `photo-1653427603`, about 10 shots)
  - Taylor Friehl: espresso kitchen (`photo-1723902499…`)
  - Point3D Commercial Imaging (@3dottawa) posts many normal real-estate kitchen sets
- **Every set = 3–6 photos of the SAME kitchen** from one photographer's upload batch: the same `photo-<timestamp>` prefix, and visually the same room.
- Optional: a short line on the cards or in the sheet that makes regular kitchens feel welcome. Keep it honest and plain, no new claims.

### 3. Rebuild, test, push, report
- Update `kits.json` (order: mix sizes and lead with normal/small ones), `CREDITS.md` (photographer + handle for every new set, checked date), and copy the updated build files back into `fma-rebrand/_build/`.
- Run all the tests plus Lighthouse. Walk the phone (390×844) and desktop (1440×900) screen by screen with `tests/walk.mjs` + `sheet.py` and **look at the screenshots**. Open at least 3 kitchens on phone and swipe the gallery.
- Commit and push to `demos` main. End the commit message with the attribution lines your system reminder gives you.
- Report to Rafael in a few short lines: what changed, before/after screenshots, an honest score, and anything still weak.

## Hard rules (copied forward, do not break)
- **Never touch `RAFAEL14741/FMA-Construction`.**
- **Photos:**
  - Unsplash standard license only (`premium:false`, id starts with `photo-`, not `premium_photo-`).
  - **No Google Images.**
  - No people (check reflections), no visible famous faces or posters, no big logos, no AI or 3D renders.
  - Always labeled as example photos, never shown as FMA's work.
- **Finding Unsplash sets that works:** WebFetch on Unsplash's JSON endpoints:
  - search: `https://unsplash.com/napi/search/photos?query=...&per_page=15`
  - a photographer's photos: `https://unsplash.com/napi/users/<handle>/photos?per_page=15`
  - related photos: `https://unsplash.com/napi/photos/<id>/related`
  - Keep `per_page` at 15 or lower.
  - Never spoof user agents or work around bot checks. Plain curl is only for `images.unsplash.com` downloads.
- **Never invent facts, prices, reviews, ratings or warranties.** Every price has a source and is labeled "typical public data, not an FMA quote".
- Say "Philadelphia", never "Northeast Philly". Don't use "family-run" wording.
- **Ask Rafael before any Higgsfield or other paid generation** (say what, which model, and the cost).
- **Keep the approved look:** bone canvas, Bodoni + Inter, 4px images, 999px buttons, the repaint hero, the VYRA-like calm. No icon-circle grids, no oak/black stripe bands.
- Whenever you fix a bug, write why it happened plus a one-line rule into memory `/topics/lessons-sites.md`.
- Known traps:
  - Any side-scrolling row inside a grid/flex item needs `min-width:0` on that item.
  - Items inside a horizontal scroller need `position:relative`, or absolutely positioned children widen the whole page.
  - Prefix new top-level JS names (`galStep`, not `step`); the wizard already uses `step`.
  - Galleries: use width + aspect-ratio, not `height:100%` in an auto-height parent.
  - Test fixed bars at real scroll positions, not in full-page screenshots.
  - Lazy images look blank in element screenshots until you scroll through the page.
  - The phone overflow test must compare `scrollWidth` to the viewport width you set, not `innerWidth`.

## Still needed from Rafael (don't block on these, just remind him at the end)
- His dad's PA contractor registration number (required on ads and on the site), and his NJ registration number if they advertise NJ work.
- The first-customer discount: how much off, and for how many customers.
- Real photos of his dad and crew, and real job photos once there are some.
