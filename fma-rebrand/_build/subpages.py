"""Builds the 3 SEO sub-pages in the v7 look (bone / ink / Bodoni + Inter).
Reads header, drawer and footer markup from the built index.html so they never drift.
Photos come from img/k/ (credited, see CREDITS.md). FAQ text is written once and feeds both the page and the FAQPage JSON-LD."""
import re, json, html
ROOT = '/home/claude/demos/fma-rebrand/'
GAL = json.load(open('/home/claude/work/gal.json'))
idx = open(ROOT + 'index.html').read()
HOST = 'https://fmaconstructions.com/'

def grab(a, b):
    i = idx.index(a); return idx[i:idx.index(b, i) + len(b)]
HDR = grab('<header class="hdr"', '</header>')
DRW = grab('<div class="drawer"', '</div>\n\n<main')[:-len('\n\n<main')]
FTR = grab('<footer class="ftr">', '</footer>')
def fix(h):
    h = re.sub(r'href="#(home|kitchens|process|prices|faq|contact)"', r'href="index.html#\1"', h)
    return h
HDR, DRW, FTR = fix(HDR), fix(DRW), fix(FTR)
HDR = HDR.replace('class="hdr" id="hdr"', 'class="hdr" id="hdr"')

def photo(slug, n, alt, sizes='(max-width:900px) 100vw, 46vw', cap='Example kitchen photo, not an FMA project.', eager=False):
    d = GAL[slug][n - 1]
    return (f'<figure class="shot"><img src="img/k/{slug}-{n}-720.jpg" srcset="img/k/{slug}-{n}-720.jpg {d[0]}w, img/k/{slug}-{n}-1200.jpg {d[2]}w" '
            f'sizes="{sizes}" width="{d[0]}" height="{d[1]}" alt="{html.escape(alt)}" {"fetchpriority=high" if eager else "loading=lazy"} decoding="async">'
            f'<figcaption>{cap}</figcaption></figure>')

def lst(items):
    return '<ul class="list">' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'

PAGES = [
 dict(file='custom-kitchen-islands-philadelphia.html', crumb='Custom kitchen islands',
  title='Custom Kitchen Islands in Philadelphia | FMA Constructions',
  desc='Kitchen islands planned around your layout, seating and storage, with matching cabinetry. Northeast Philadelphia, Bucks and Montgomery counties. Free on-site estimate.',
  h1='Kitchen islands built around how you cook.',
  lede='A stock island is a box with a countertop. We plan islands around your layout, your seating and how your kitchen actually gets used.',
  svc='Custom Kitchen Island Installation', hero=photo('medium-greige-shaker-island', 1, 'Gray shaker kitchen with a marble-top island and two black pendant lights', eager=True),
  blocks=[
   ('What makes an island custom', [
     '<p class="big">A custom island is sized for the way your kitchen gets used: extra seating for homework, a second sink for prep, hidden trash and recycling pull-outs, or open shelving for cookbooks and serving pieces.</p>',
     '<p>We start with your layout: walkway clearance, where the range or sink sits, and how the island connects to the rest of the cabinets. Then the island is matched to your cabinet style instead of dropped in as a mismatched box.</p>']),
   ('Upgrades worth planning for', [
     '<p>These are the upgrades homeowners add to an island most often. Decide on them early, because some need electrical or plumbing work before the cabinets go in.</p>',
     lst(['Overhang for stool or bar seating', 'A second prep sink or beverage fridge', 'Outlets built into the island base (most kitchen islands need at least one under electrical code)', 'Waterfall countertop edges on one or both sides', 'Trash, recycling and utensil pull-outs', 'Open shelving or a bookcase end panel']),
     photo('medium-maple-island', 1, 'Kitchen island with an overhang and two stools')]),
   ('Sizing it right', [
     '<p>As a rule of thumb, aim for at least 42&Prime; of clearance on every side of an island, and closer to 48&Prime; on the side people cook from. If the kitchen cannot fit that comfortably, a peninsula (an island joined to a wall of cabinets at one end) is often a better fit than squeezing in a full island.</p>',
     '<p>We bring a tape measure to the free walkthrough and tell you straight whether an island makes sense for your space.</p>']),
  ],
  faq=[('How much does a custom kitchen island cost?', "It depends mainly on size, countertop material, and whether you're adding electrical, plumbing or seating. We give exact pricing after seeing your kitchen on the free walkthrough rather than a generic number that won't match your space."),
       ('Do I need an electrician for an outlet in my island?', "Most kitchen islands need at least one outlet under electrical code. Plan for it early, so the wiring is in before the cabinets and countertop go on, not added after. Tell us on the walkthrough and we'll plan the project around it."),
       ('Can you match a new island to my existing cabinets?', "We'll match the door style, finish and hardware as closely as possible. If it's close but not exact, we can talk through options on the walkthrough."),
       ("What's the difference between an island and a peninsula?", 'An island stands free on all sides; a peninsula connects to a run of cabinets at one end. Peninsulas work well in smaller kitchens that cannot fit the clearance a full island needs.')]),

 dict(file='kitchen-cabinet-refacing-northeast-philadelphia.html', crumb='Cabinet refacing',
  title='Cabinet Refacing or Replacement in Northeast Philadelphia | FMA Constructions',
  desc='Not sure if your kitchen needs new doors or all-new cabinets? How FMA decides between cabinet refacing and replacement, and what each includes. Free on-site estimate.',
  h1='Refacing or replacing your cabinets?',
  lede="Not sure if your kitchen needs new doors or a full teardown? Here's how FMA works out which one makes sense for your cabinets, and what each option includes.",
  svc='Kitchen Cabinet Refacing and Replacement', hero=photo('small-white-galley', 1, 'White shaker cabinets in a narrow galley kitchen with a stainless sink', eager=True),
  blocks=[
   ('Refacing or full replacement', [
     '<p class="big">Many Northeast Philadelphia kitchens do not need a full gut renovation to look new. If the cabinet boxes are square, solid and in the right layout, refacing (new doors, drawer fronts and hardware over the existing boxes) can change the whole look for a fraction of a teardown.</p>',
     '<p>Full replacement makes sense when boxes are water-damaged, particle board is swelling, the layout needs to change, or you want an island where there is not one today. We tell you honestly which one your kitchen needs, and we do not push a bigger job than you need.</p>']),
   ('How we help you decide', [
     '<p>On the free walkthrough, we check four things before recommending refacing or replacement:</p>',
     lst(['<b>Box condition.</b> Square, dry and solid, or swollen and damaged', '<b>Layout.</b> Does the kitchen work as it is, or do you want to move plumbing, add an island or open it up', '<b>Budget.</b> Refacing typically costs less than full replacement for the same footprint', '<b>Timeline.</b> Refacing is usually faster, with less disruption to your kitchen'])]),
   ("What's included either way", [
     lst(['New doors, drawer fronts and matching end panels (refacing) or full new cabinet boxes (replacement)', 'New hardware: pulls, hinges and soft-close drawer slides', 'Crown molding and trim to match your style', 'A clean jobsite every day and one point of contact from estimate to final walkthrough', 'Licensed and insured work in Pennsylvania']),
     photo('large-family-white-shaker', 1, 'White shaker cabinets with brass pulls and a herringbone tile backsplash')]),
  ],
  faq=[('Is cabinet refacing cheaper than full replacement?', "Usually, yes. Refacing reuses your existing cabinet boxes and only replaces doors, drawer fronts and hardware, so materials and labor are less than tearing everything out. The exact difference depends on your kitchen's size and the door style you choose. We'll give you real numbers on the free walkthrough."),
       ('How do I know if my cabinets can be refaced?', "If the boxes are square, dry, and free of water damage or swelling, they're usually a good candidate. We check this in person during the free estimate before recommending refacing over replacement."),
       ('How long does refacing take compared to replacement?', "Refacing is typically faster since we're not tearing out and rebuilding the boxes. Full replacement takes longer, especially if the layout is changing. We'll give you a specific timeline once we've seen your kitchen."),
       ('Do you serve my part of Northeast Philadelphia?', 'We work throughout Northeast Philadelphia, including Fox Chase, Rhawnhurst, Bustleton, Somerton, Holmesburg, Tacony, Mayfair and Oxford Circle, plus Montgomery County, Bucks County and the Main Line.')]),

 dict(file='cabinet-installation-service-areas.html', crumb='Service areas',
  title='Kitchen Cabinet Installation Service Areas | FMA Constructions',
  desc='FMA installs and refaces kitchen cabinets across Northeast Philadelphia, Bucks County, Montgomery County and the Main Line. Free on-site estimate: (267) 367-3388.',
  h1='Kitchen cabinets across the Philadelphia area.',
  lede='One crew, one standard, across Northeast Philadelphia, Bucks County, Montgomery County and the Main Line.',
  svc='Kitchen Cabinet Installation', hero=photo('medium-green-rowhouse', 1, 'Green cabinets and a wood island in a rowhouse kitchen', eager=True),
  blocks=[
   ('Cabinet installation near you', [
     '<p class="big">FMA Constructions installs and refaces kitchen cabinets for homeowners across Northeast Philadelphia and the surrounding suburbs. Same crew, same standard on every job: a clean jobsite, one point of contact, and a free on-site estimate before you commit to anything.</p>',
     '<p>Whether it is new cabinets for a remodel, a custom island, or existing cabinets that just need a new look, we come out, take real measurements, and give you a straight answer on cost and timeline.</p>']),
   ('Where we work', [
     lst(['<b>Northeast Philadelphia:</b> Fox Chase, Rhawnhurst, Bustleton, Somerton, Holmesburg, Tacony, Mayfair, Oxford Circle', '<b>Bucks County:</b> Newtown, Feasterville, Langhorne, Warminster and surrounding townships', '<b>Montgomery County:</b> Abington, Willow Grove, Huntingdon Valley, Jenkintown, Horsham', '<b>Main Line, PA</b>', '<b>New Jersey:</b> call or text to confirm your town']),
     '<p>Do not see your town listed? Call or text us. We cover most of the Philadelphia suburbs and can confirm quickly.</p>']),
   ('How the process works', [
     '<ol class="list">' + ''.join(f'<li>{t}</li>' for t in ['Call, text or fill out the form. We respond within one business day.', 'Free on-site walkthrough: we measure, look at your cabinets, and talk through what you want.', 'A clear, itemized estimate before any work starts.', 'Installation with a clean jobsite every day, start to finish.', "A final walkthrough to make sure everything's right before we call it done."]) + '</ol>',
     photo('small-twotone-galley', 1, 'Two-tone gray cabinets with butcher-block counters')]),
  ],
  faq=[('What areas does FMA Constructions serve?', "We install and reface kitchen cabinets throughout Northeast Philadelphia, Bucks County, Montgomery County and the Main Line, PA, and we take New Jersey jobs too. If you're not sure whether we cover your town, call or text us."),
       ('Is the estimate free everywhere in your service area?', 'Yes, the on-site walkthrough and estimate are free anywhere in our service area.'),
       ('How far in advance should I book a project?', 'It depends on the season and scope, but reach out as soon as you are planning a kitchen project so we can get your free walkthrough on the calendar and give you a realistic start date.'),
       ('Are you licensed and insured everywhere you work?', 'Yes, FMA Constructions is licensed and insured to work throughout Pennsylvania.')]),
]
LINKS = {p['file']: p for p in PAGES}
JS = r'''<script>
(() => {
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const burger = $('.burger'), drawer = $('#drawer'), d = document.documentElement;
  const setDrawer = open => { drawer.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', String(open)); d.classList.toggle('drawer-open', open); $$('main, footer').forEach(el => { el.inert = open; }); if (open) setTimeout(() => $('a', drawer).focus({ preventScroll: true }), 60); };
  burger.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-open')));
  $$('a', drawer).forEach(a => a.addEventListener('click', () => setDrawer(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) { setDrawer(false); burger.focus(); } });
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
</script>'''

def build(p):
    url = HOST + p['file']
    biz = {'@type': 'GeneralContractor', 'name': 'FMA Constructions', 'url': HOST, 'telephone': '+12673673388'}
    ld = [
     {'@context': 'https://schema.org', '@type': 'Service', 'serviceType': p['svc'], 'name': p['svc'], 'description': p['desc'], 'provider': biz,
      'areaServed': ['Northeast Philadelphia', 'Montgomery County PA', 'Bucks County PA', 'Main Line PA'], 'url': url},
     {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': HOST}, {'@type': 'ListItem', 'position': 2, 'name': p['crumb'], 'item': url}]},
     {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
        {'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in p['faq']]},
    ]
    ldh = '\n'.join('<script type="application/ld+json">' + json.dumps(x, ensure_ascii=False) + '</script>' for x in ld)
    e = html.escape
    blocks = ''
    for h, parts in p['blocks']:
        blocks += f'<section class="blk"><div class="wrap blk-grid"><h2>{h}</h2><div class="body">{"".join(parts)}</div></div></section>\n'
    faq = ''.join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in p['faq'])
    others = ''.join(f'<a href="{o["file"]}">{o["crumb"]}</a>' for o in PAGES if o['file'] != p['file'])
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<!-- Preview: noindex. At launch delete this tag (and on the other 2 pages + index.html). -->
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Preview] {e(p['title'])}</title>
<meta name="description" content="{e(p['desc'])}">
<meta property="og:title" content="{e(p['title'])}">
<meta property="og:description" content="{e(p['desc'])}">
<meta property="og:image" content="{HOST}og-maison.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="{url}">
<meta property="og:site_name" content="FMA Constructions">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#F3ECE0">
<link rel="icon" type="image/svg+xml" href="favicon-maison.svg">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="fonts/bodoni-moda.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="sub.css">
{ldh}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
{HDR}
{DRW}
<main id="main">
<section class="top"><div class="wrap">
  <p class="crumbs"><a href="index.html">Home</a> / {e(p['crumb'])}</p>
  <div class="top-grid">
    <div>
      <h1>{e(p['h1'])}</h1>
      <p class="lede">{e(p['lede'])}</p>
      <div class="acts"><a class="btn btn--ink" href="index.html#contact">Free estimate</a><a class="btn btn--line" href="tel:+12673673388">Call (267) 367-3388</a></div>
    </div>
    {p['hero']}
  </div>
</div></section>
<section class="facts"><div class="wrap"><ul>
  <li><b>Free</b> on-site estimate</li>
  <li><a href="tel:+12673673388"><b>(267) 367-3388</b></a>, call or text</li>
  <li>Mon&ndash;Fri 7am&ndash;6pm, Sat 7am&ndash;1pm</li>
</ul></div></section>
{blocks}<section class="blk"><div class="wrap blk-grid"><h2>Questions</h2><div class="body faq">{faq}</div></div></section>
<section class="end"><div class="wrap">
  <h2>Ready to talk about your kitchen?</h2>
  <p>Tell us about your project and we'll call within one business day to set up a free walkthrough.</p>
  <div class="acts"><a class="btn btn--bone" href="index.html#contact">Free estimate</a><a class="btn btn--ghost" href="tel:+12673673388">Call (267) 367-3388</a></div>
</div></section>
<section class="more"><div class="wrap more-in"><h3>Also on this site</h3>{others}<a href="index.html#kitchens">Browse kitchens</a></div></section>
</main>
{FTR}
{JS}
</body>
</html>
'''
for p in PAGES:
    open(ROOT + p['file'], 'w').write(build(p))
    print('wrote', p['file'])
import shutil; shutil.copy('/home/claude/work/sub.css', ROOT + 'sub.css')
