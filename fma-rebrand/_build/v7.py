"""v6 'Gallery': the whole page rebuilt in one VYRA-grade language (direction A, picked Oct 27).
Light bone canvas, thin Bodoni display + light Inter, few lines, photos do the talking.
Kept from v5: head/meta/schema, hero repaint (photo + mask + canvas), wizard logic, map geometry, call bar logic."""
import re, shutil
SRC = '/home/claude/work/page.html'
old = open('/home/claude/work/page.v5b.html').read()


def between(s, a, b, incl=True):
    i = s.index(a); j = s.index(b, i) + (len(b) if incl else 0); return s[i:j]


head = old[:old.index('<style>')]
head = head.replace('<meta name="theme-color" content="#D2B48A">', '<meta name="theme-color" content="#F3ECE0">')
scripts = old[old.index('<script>\n(() => {'):]
mapsvg = between(old, '<svg class="area-map"', '</svg>')
costs = between(old, '<dl class="costs">', '</dl>')
faqlist = between(old, '<div class="faq-list">', '</details></div>')
ci = between(old, '<dl class="ci">', '</dl>')
wizform = between(old, '<form class="wiz"', '</form>') + '\n    ' + between(old, '<form name="project-builder"', '</form>')
footer = between(old, '<footer class="ftr">', '</footer>')
logo_small = between(old, '<a href="#home" class="logo"', '</a>')

# ---- light map ----
def mrep(s, a, b, n=1):
    assert s.count(a) == n, (s.count(a), a); return s.replace(a, b)
m = mapsvg
m = mrep(m, '<rect width="800" height="726" fill="#1F1E1C"/>', '<rect width="800" height="726" fill="#E9E2D6"/>')
m = mrep(m, '<g fill="#1F1E1C" stroke="#34322E"', '<g fill="#E9E2D6" stroke="#D8CDBB"')
m = mrep(m, '<g fill="#7A5C36" stroke="#151515"', '<g fill="#CDB591" stroke="#F3ECE0"')
m = mrep(m, '<g stroke="#151515" stroke-width="2.5"', '<g stroke="#F3ECE0" stroke-width="2.5"')
m = mrep(m, 'fill="#F3ECE0"/>', 'fill="#151515"/>')            # Philadelphia shape -> black
m = mrep(m, 'r="5" fill="#151515"', 'r="5" fill="#D2B48A"')
m = mrep(m, 'stroke="#F3ECE0" stroke-width="1.2"', 'stroke="#151515" stroke-width="1.2"')
m = mrep(m, 'fill="#F3ECE0">Philadelphia</text>', 'fill="#151515">Philadelphia</text>')
m = mrep(m, 'fill="#F3ECE0">New Jersey</text>', 'fill="#151515">New Jersey</text>')
m = m.replace('font-size="27" font-weight="500"', 'font-size="27" font-weight="400"')

def img(n, sizes, alt='', w=480, h=600):
    return (f'<img src="img/looks/{n}-480.jpg" srcset="img/looks/{n}-480.jpg 480w, img/looks/{n}-800.jpg 800w" sizes="{sizes}" '
            f'width="{w}" height="{h}" alt="{alt}" loading="lazy" decoding="async">')

PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path class="v" d="M12 5v14"/><path d="M5 12h14"/></svg>'
ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z"/></svg>'
KNOB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>'
SMS = 'sms:+12673673388?&amp;body=Hi%20FMA%2C%20here%27s%20a%20photo%20of%20my%20kitchen%20for%20a%20free%20color%20preview.'

# name, color family, style, swatch, detail
LOOKS = [('white-1', 'white', 'shaker', '#F2EEE6', 'White shaker', 'Brass pulls'),
         ('green-2', 'green', 'shaker', '#3F5A44', 'Deep green shaker', 'Black pulls'),
         ('black-2', 'black', 'flat', '#2A2927', 'Charcoal flat panel', 'Handleless'),
         ('wood-1', 'wood', 'flat', '#B07D4F', 'Oak island', 'Slab doors'),
         ('blue-1', 'blue', 'glass', '#33476A', 'Navy and glass', 'Leaded glass uppers'),
         ('white-3', 'white', 'glass', '#EDE6D8', 'Cream and glass', 'Crown molding'),
         ('green-3', 'green', 'shaker', '#7E8C72', 'Sage shaker', 'Full-height wall'),
         ('black-3', 'black', 'flat', '#1E1E1E', 'Black pantry', 'Oak shelves'),
         ('wood-4', 'wood', 'flat', '#6B4630', 'Walnut wall', 'Waterfall island'),
         ('blue-2', 'blue', 'shaker', '#2F5E85', 'Blue island', 'Beadboard panels'),
         ('white-2', 'white', 'glass', '#F4F1EA', 'White hutch', 'Glass doors'),
         ('black-4', 'black', 'flat', '#232323', 'Matte black', 'Handleless')]
DOTS = [('white', 'White', '#F2EEE6'), ('black', 'Black', '#232323'), ('green', 'Green', '#5F7458'),
        ('blue', 'Blue', '#33476A'), ('wood', 'Wood', '#A8764A')]
SVC = [('white-4', 'Kitchen cabinets', 'Base, wall and tall cabinets', '#contact'),
       ('green-1', 'Islands', 'Built to your layout', 'custom-kitchen-islands-philadelphia.html'),
       ('detail-5', 'Pantries', 'Pull-outs and built-ins', '#contact'),
       ('detail-6', 'Crown and trim', 'The finished look', '#contact'),
       ('blue-4', 'Refacing', 'New doors, same boxes', 'kitchen-cabinet-refacing-northeast-philadelphia.html')]
STEPS = [('Call or ask online', 'We call back within 1 business day.'), ('Free estimate', 'We measure and send a written quote.'),
         ('We install', 'Level, square, and a clean site every day.'), ('Walkthrough', 'We check every door and drawer with you.')]
TIERS = [('Stock', 'Fastest and most affordable', 1), ('Semi-custom', 'More sizes, colors and styles', 2), ('Custom', 'Made for your exact space', 3)]

looks = ''.join(
    f'<li class="look" data-c="{c}" data-s="{s}" style="--k:{i % 4}"><div class="look-ph">{img(n, "(max-width:767px) 46vw, 23vw", t)}'
    f'<button type="button" class="save" aria-pressed="false" aria-label="Save {t}" data-n="{t}" data-src="img/looks/{n}-480.jpg">{PLUS}</button></div>'
    f'<p class="look-n">{t}</p><p class="look-d"><i style="--c:{sw}"></i>{d}</p></li>'
    for i, (n, c, s, sw, t, d) in enumerate(LOOKS))
dots = ''.join(f'<button type="button" class="dot" data-c="{k}" aria-pressed="false" aria-label="{t}" style="--c:{c}"></button>' for k, t, c in DOTS)
tabs = ''.join(f'<button type="button" data-s="{k}" aria-pressed="{"true" if k == "all" else "false"}">{t}</button>' for k, t in (('all', 'All'), ('shaker', 'Shaker'), ('flat', 'Flat'), ('glass', 'Glass')))
svc = ''.join(f'<li><a href="{h}">{img(n, "96px", "", 480, 600)}<span><b>{t}</b><small>{s}</small></span>{ARROW}</a></li>' for n, t, s, h in SVC)
steps = ''.join(f'<li><b aria-hidden="true">{i + 1}</b><div><h3><span class="sr">Step {i + 1}: </span>{t}</h3><p>{s}</p></div></li>' for i, (t, s) in enumerate(STEPS))
tiers = ''.join(f'<li><b>{t}</b><span>{s}</span><i aria-label="{k} of 3 on price">{"$" * k}<em>{"$" * (3 - k)}</em></i></li>' for t, s, k in TIERS)


CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>'
NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
import json as _json
# slug, name, size, color, style, photos, layout, doors, details, photographer, handle
GAL = _json.load(open('/home/claude/work/gal.json'))
import os as _os
CARD_RATIO = float(_os.environ.get('CARD_RATIO', 4 / 3)); CARD_H = round(480 / CARD_RATIO)
KITS = [tuple(k[x] for x in ('s','t','z','c','st','n','lay','dr','det','ph','hd')) for k in _json.load(open('/home/claude/work/kits.json'))]
SW_ALL = {'white': '#F2EEE6', 'cream': '#EDE3CC', 'gray': '#B9B6AE', 'greige': '#B3A796', 'green': '#6E8566', 'blue': '#33476A', 'lightblue': '#A9BCCB', 'wood': '#C49A6C', 'black': '#232323', 'twotone': 'linear-gradient(90deg,#F2EEE6 50%,#33476A 50%)', 'other': '#B5654A'}
CNAME = {'lightblue': 'Light blue', 'twotone': 'Two-tone', 'other': 'Other colors'}
_present = {k[3] for k in KITS}
SW = {k: v for k, v in SW_ALL.items() if k in _present}
STN = {'shaker': 'Shaker', 'flat': 'Flat slab', 'raised': 'Raised panel', 'beadboard': 'Farmhouse', 'glass': 'Glass doors', 'open': 'Open shelves', 'inset': 'Inset', 'mixed': 'Mixed'}
_spresent = [k for k in STN if k in {x[4] for x in KITS}]
kstyles = ''.join(f'<button type="button" class="chip" data-st="{k}" aria-pressed="false">{STN[k]}</button>' for k in _spresent)
SIZE = {'small': 'Small', 'medium': 'Medium', 'large': 'Large'}
PRICE = {'small': ('about 15 ft of cabinets', '$750 – $3,000', '$4,400 – $9,800'),
         'medium': ('about 25 ft of cabinets', '$1,250 – $5,000', '$7,400 – $16,300'),
         'large': ('about 40 ft of cabinets', '$2,000 – $8,000', '$11,800 – $26,000')}
kits = ''.join(
    f'<li class="kit" data-size="{z}" data-c="{c}" data-st="{s_}" style="--k:{i % 4}"><div class="kit-ph">'
    f'<button type="button" class="kit-open" data-k="{i}" aria-label="Open {t}, {n} photos"><img src="img/k/{sl}-c-480.jpg" srcset="img/k/{sl}-c-480.jpg 480w, img/k/{sl}-c-800.jpg 800w" sizes="(max-width:767px) 46vw, 23vw" width="480" height="{CARD_H}" alt="" loading="lazy" decoding="async"></button>'
    f'<span class="kit-size">{SIZE[z]}</span><span class="kit-n">{n} photos</span>'
    f'<button type="button" class="save" aria-pressed="false" aria-label="Save {t}" data-n="{t}" data-src="img/k/{sl}-c-480.jpg">{PLUS}</button></div>'
    f'<p class="kit-name">{t}</p><p class="kit-d"><i style="--c:{SW[c]}"></i>{dr}</p></li>'
    for i, (sl, t, z, c, s_, n, lay, dr, det, ph, hd) in enumerate(KITS))
KJSON = _json.dumps([{'s': sl, 't': t, 'z': z, 'n': n, 'lay': lay, 'dr': dr, 'det': det, 'ph': ph, 'hd': hd, 'd': GAL[sl]} for (sl, t, z, c, s_, n, lay, dr, det, ph, hd) in KITS]).replace('</', '<\\/')
PJSON = _json.dumps(PRICE)
kdots = ''.join(f'<button type="button" class="dot" data-c="{k}" aria-pressed="false" aria-label="{CNAME.get(k, k.title())}" style="--c:{v}"></button>' for k, v in SW.items())
ktabs = ''.join(f'<button type="button" data-z="{k}" aria-pressed="{"true" if k == "all" else "false"}">{t}</button>' for k, t in (('all', 'All'), ('small', 'Small'), ('medium', 'Medium'), ('large', 'Large')))
AREAS = (('philly', 'Philadelphia'), ('bucks', 'Bucks'), ('montco', 'Montgomery'), ('nj', 'New Jersey'))
atabs = ''.join(f'<button type="button" data-a="{k}" aria-pressed="{"true" if k == "philly" else "false"}">{t}</button>' for k, t in AREAS)
prow = ''.join(f'<tr><th scope="row">{SIZE[z]}<small>{a}</small></th><td data-l="Install only">{b}</td><td data-l="New, installed">{c}</td></tr>' for z, (a, b, c) in PRICE.items())

costs = costs.replace('<dl class="costs">', '<dl class="prices">').replace('–$', ' – $')

BODY = f'''<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr" id="hdr">
  <div class="bar">
    {logo_small}
    <nav class="nav" aria-label="Primary"><a href="#kitchens">Kitchens</a><a href="#process">How it works</a><a href="#prices">Prices</a><a href="#faq">FAQ</a></nav>
    <a href="tel:+12673673388" class="hdr-call" aria-label="Call (267) 367-3388">{PHONE}<span class="t">(267) 367-3388</span></a>
    <a href="#contact" class="hdr-est">Free estimate</a>
    <button type="button" class="burger" aria-label="Menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span></button>
  </div>
</header>
<div class="drawer" id="drawer">
  <nav aria-label="Menu"><a href="#kitchens">Kitchens</a><a href="#process">How it works</a><a href="#prices">Prices</a><a href="#faq">FAQ</a><a href="#contact">Free estimate</a></nav>
  <p>Call or text <a href="tel:+12673673388">(267) 367-3388</a><br>Mon–Fri 7am–6pm, Sat 7am–1pm</p>
</div>

<main id="main">
<section class="hero" id="home" aria-labelledby="h1">
  <div class="hero-media">
    <img id="heroImg" src="img/hero-kitchen-2400.jpg" srcset="img/hero-kitchen-1200.jpg 1200w, img/hero-kitchen-2400.jpg 2400w" sizes="100vw" alt="Kitchen with raised-panel base cabinets and a drawer stack next to a built-in oven" width="2400" height="1030" fetchpriority="high">
  </div>
  <div class="hero-in">
    <p class="kick">Philadelphia cabinet installers</p>
    <h1 id="h1">Kitchen cabinets, installed right.</h1>
    <p class="hero-sub">Cabinets, islands, pantries and trim. Free on-site estimates across Philadelphia, Bucks, Montgomery and New Jersey.</p>
    <div class="hero-actions">
      <a class="btn btn--bone" href="tel:+12673673388">Call (267) 367-3388</a>
      <a class="btn btn--ghost" href="#contact">Free estimate</a>
    </div>
    <p class="hero-info">Mon–Fri 7am–6pm, Sat 7am–1pm. Licensed and insured in PA.</p>
  </div>
  <div class="paint" role="group" aria-label="Try a cabinet color">
    <p class="paint-top"><span>Try a color</span><b id="paintName" aria-live="polite">Navy</b></p>
    <div class="swatches">
      <button type="button" class="sw" data-i="0" aria-pressed="true" style="--c:#2F3D57"><i></i><span class="sr">Navy</span></button>
      <button type="button" class="sw" data-i="1" aria-pressed="false" style="--c:#F2EEE6"><i></i><span class="sr">Warm white</span></button>
      <button type="button" class="sw" data-i="2" aria-pressed="false" style="--c:#2A2927"><i></i><span class="sr">Black</span></button>
      <button type="button" class="sw" data-i="3" aria-pressed="false" style="--c:#93A285"><i></i><span class="sr">Sage</span></button>
      <button type="button" class="sw" data-i="4" aria-pressed="false" style="--c:#B9B6AE"><i></i><span class="sr">Stone gray</span></button>
    </div>
    <small>Example photo, colors changed digitally.</small>
  </div>
</section>

<section class="ways" aria-label="Two ways to work with us">
  <a class="way" href="#contact" data-cab="Yes, I bought them"><small>Already bought your cabinets?</small><b>We install them.</b>{ARROW}</a>
  <a class="way" href="#contact" data-cab="No, help me choose"><small>Need cabinets?</small><b>We help you pick, order and install.</b>{ARROW}</a>
</section>

<section class="sec" id="kitchens" aria-labelledby="kitchens-h">
  <div class="looks-head">
    <div><p class="kick">Kitchens</p><h2 id="kitchens-h">Find a kitchen like yours.</h2>
    <p class="lede">Rowhome galley, rental or big family kitchen, nothing fancy needed. Tap one to see every photo.</p></div>
    <div class="ctrl">
      <div class="tabs" role="group" aria-label="Filter by kitchen size">{ktabs}</div>
      <div class="dots" role="group" aria-label="Filter by color">{kdots}</div>
      <div class="chips" role="group" aria-label="Filter by door style">{kstyles}</div>
    </div>
  </div>
  <div class="meta"><span id="kitCount">{len(KITS)} kitchens</span><span>Tap + to save the ones you like</span></div>
  <ul class="looks-grid" id="kitGrid">{kits}</ul>
  <div class="more-wrap"><button type="button" class="btn btn--line" id="kitMore" hidden>Show all {len(KITS)} kitchens</button></div>
  <p class="empty" id="kitEmpty" hidden>No kitchens in that combination yet. <button type="button" id="kitReset">Show all</button></p>
  <p class="fine">Example photos from Unsplash, not FMA jobs. Saved kitchens go with your estimate request.</p>
</section>

<section class="crew" aria-labelledby="crew-h">
  <div class="crew-ph">{img("green-3", "100vw", "Sage green shaker cabinets, floor to ceiling")}</div>
  <div class="crew-txt"><div class="crew-cap"><h2 id="crew-h">Our own crew. No subcontractors.</h2></div>
  <p class="crew-p">The person who measures your kitchen is the one who installs it, and the one who answers your call.</p></div>
</section>

<section class="sec sec--card" id="preview" aria-labelledby="preview-h">
  <div class="card">
    <div class="card-copy">
      <p class="kick">Free color preview</p>
      <h2 id="preview-h">Can't picture it?</h2>
      <p>Text us a photo of your kitchen. We send it back with new cabinet colors.</p>
      <a class="btn btn--bone" href="{SMS}">Text us a photo</a>
      <small>Drag the line. Digital mockup on an example photo.</small>
    </div>
    <div class="ba" id="ba">
      <img src="img/ba-before-600.jpg" srcset="img/ba-before-600.jpg 600w, img/ba-before-1000.jpg 1000w" sizes="(max-width:900px) 92vw, 44vw" width="600" height="600" alt="Kitchen with navy cabinets" loading="lazy" decoding="async">
      <img class="ba-after" src="img/ba-after-600.jpg" srcset="img/ba-after-600.jpg 600w, img/ba-after-1000.jpg 1000w" sizes="(max-width:900px) 92vw, 44vw" width="600" height="600" alt="The same kitchen with white cabinets" loading="lazy" decoding="async">
      <span class="ba-tag ba-tag--l">Before</span><span class="ba-tag ba-tag--r">After</span>
      <i class="ba-line" aria-hidden="true"><i class="ba-knob">{KNOB}</i></i>
      <input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after">
    </div>
  </div>
</section>

<section class="sec" id="process" aria-labelledby="process-h">
  <div class="process-head"><h2 id="process-h">Four steps.<br>One crew.</h2>
  <p class="lede">We install kitchen cabinets, <a href="custom-kitchen-islands-philadelphia.html">islands</a>, pantries, crown and trim, and <a href="kitchen-cabinet-refacing-northeast-philadelphia.html">cabinet refacing</a>.</p></div>
  <ol class="steps">{steps}</ol>
</section>

<section class="sec" id="prices" aria-labelledby="prices-h">
  <div class="split split--prices">
    <div>
      <h2 id="prices-h">What it costs.</h2>
      <p class="lede">Small kitchen? Most Philly homes have one, and less cabinet means a smaller bill.</p>
      {m}
      <p class="fine where-line">We come to Philadelphia, Bucks and Montgomery counties, and New Jersey. Licensed and insured in PA. Founded by Flavio Mendanha Araujo.</p>
    </div>
    <div>
      <div class="tabs tabs--area" role="group" aria-label="Your area">{atabs}</div>
      <table class="ptable">
        <thead><tr><th scope="col">Kitchen</th><th scope="col">Install only<small>you have the cabinets</small></th><th scope="col">New cabinets<small>supplied and installed</small></th></tr></thead>
        <tbody>{prow}</tbody>
      </table>
      <p class="area-note" id="areaNote" aria-live="polite">Philadelphia prices.</p>
      <p class="fine">Typical public prices, not an FMA quote. Install only uses a national labor rate (<a href="https://www.fixr.com/costs/cabinets-installation" rel="nofollow noopener" target="_blank">Fixr</a>, $50–$200 per linear foot, 2026). New cabinets use Philadelphia data (<a href="https://www.homeblue.com/cabinets/philadelphia-pa-cost-of-kitchen-cabinets.htm" rel="nofollow noopener" target="_blank">HomeBlue</a>, 2024). Your exact price comes in a free written quote.</p>
    </div>
  </div>
</section>

<section class="sec sec--card" aria-label="First-customer offer">
  <div class="card card--offer">
    <div class="offer-ph">{img("wood-2", "(max-width:767px) 92vw, 30vw", "")}</div>
    <div class="card-copy">
      <h2>Be one of our first kitchens.</h2>
      <p>A lower price in exchange for photos and an honest Google review.</p>
      <a class="btn btn--bone" href="#contact">Ask about it</a>
    </div>
  </div>
</section>

<section class="sec" id="faq" aria-labelledby="faq-h">
  <div class="split">
    <h2 id="faq-h">Questions before you call.</h2>
    {faqlist}
  </div>
</section>

<section class="sec" id="contact" aria-labelledby="contact-h">
  <div class="split split--contact">
    <div>
      <p class="kick">Free estimate</p>
      <h2 id="contact-h">Tell us about your kitchen.</h2>
      <p class="lede">3 quick taps. We call you back in 1 business day.</p>
      {ci}
    </div>
    {wizform}
  </div>
</section>
</main>
<div class="sheet" id="sheet" hidden>
  <div class="sheet-bg" data-close></div>
  <div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheetName" tabindex="-1">
    <button type="button" class="sheet-x" data-close aria-label="Close">{CLOSE}</button>
    <div class="gal">
      <div class="gal-track" id="galTrack"></div>
      <button type="button" class="gal-btn gal-prev" aria-label="Previous photo">{PREV}</button>
      <button type="button" class="gal-btn gal-next" aria-label="Next photo">{NEXT}</button>
      <p class="gal-count" id="galCount" aria-live="polite"></p>
    </div>
    <div class="sheet-info">
      <p class="kick" id="sheetSize"></p>
      <h3 id="sheetName"></h3>
      <dl class="spec" id="sheetSpec"></dl>
      <div class="sp">
        <div class="sp-head"><p id="spHead"></p><label class="sr" for="spArea">Your area</label><select id="spArea"><option value="philly">Philadelphia</option><option value="bucks">Bucks</option><option value="montco">Montgomery</option><option value="nj">New Jersey</option></select></div>
        <dl class="sp-rows"><div><dt>Install only</dt><dd id="spA"></dd></div><div><dt>New cabinets, installed</dt><dd id="spB"></dd></div></dl>
        <p class="fine" id="spNote"></p>
      </div>
      <div class="sheet-act"><button type="button" class="btn btn--ink" id="sheetSave" aria-pressed="false">I want this look</button><a class="btn btn--line" href="#contact" data-close>Free estimate</a></div>
      <p class="fine" id="sheetCredit"></p>
    </div>
  </div>
</div>
<script type="application/json" id="kitData">{KJSON}</script>
<script type="application/json" id="priceData">{PJSON}</script>
<div class="callbar" id="callbar" aria-hidden="true">
  <a class="btn btn--ink" href="tel:+12673673388" tabindex="-1">Call now</a>
  <a class="btn btn--line" href="#contact" tabindex="-1">Free estimate</a>
</div>

{footer}
'''

CSS = open('/home/claude/work/v7.css').read()

# ---- scripts: keep, adapt ----
s = scripts
def srep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:100]); s = s.replace(a, b)
# header: transparent over the hero, bone once scrolled
srep("const hdr = $('#hdr'), work = $('#work'), hero = $('.hero'); let tick = false;", "const hdr = $('#hdr'), ftr = $('.ftr'), hero = $('.hero'); let tick = false;")
srep("hdr.classList.toggle('is-dark', work.getBoundingClientRect().top <= hdr.offsetHeight); ", "hdr.classList.toggle('on-dark', ftr.getBoundingClientRect().top <= hdr.offsetHeight); ")
srep("let pastHero = false, atContact = false;", "let pastHero = false, atContact = false, atFooter = false;")
srep("const on = pastHero && !atContact;", "const on = pastHero && !atContact && !atFooter;")
srep("{ rootMargin: '0px 0px -30% 0px' }).observe(contact);", "{ rootMargin: '0px 0px -30% 0px' }).observe(contact);\n    new IntersectionObserver(([e]) => { atFooter = e.isIntersecting; set(); }).observe($('.ftr'));")
# looks: tabs (style) + dots (color), VYRA-style
i = s.index('  /* looks: color chips'); j = s.index('  /* before / after')
LOOKSJS = '''  /* kitchens: size tabs + color dots; tap a kitchen for a photo sheet; "+" or "I want this look" saves it for the estimate */
  const grid = $('#kitGrid'), all = $$('.kit', grid), count = $('#kitCount'), empty = $('#kitEmpty');
  const KIT = JSON.parse($('#kitData').textContent), PRICE = JSON.parse($('#priceData').textContent);
  const AREA = { philly: 'Philadelphia', bucks: 'Bucks County', montco: 'Montgomery County', nj: 'New Jersey' };
  let fc = 'all', fz = 'all', fst = 'all', area = 'philly', expanded = false;
  const more = $('#kitMore'), phoneMQ = matchMedia('(max-width:767px)');
  const showKits = () => {
    let n = 0; const cap = expanded || fc !== 'all' || fz !== 'all' || fst !== 'all' ? Infinity : (phoneMQ.matches ? 8 : 12);
    all.forEach(li => { const match = (fc === 'all' || li.dataset.c === fc) && (fz === 'all' || li.dataset.size === fz) && (fst === 'all' || li.dataset.st === fst); const on = match && n < cap; li.hidden = !on; if (match) { if (on) li.style.setProperty('--k', n % 4); n++; } });
    more.hidden = n <= cap;
    count.textContent = n + (n === 1 ? ' kitchen' : ' kitchens'); empty.hidden = n > 0;
    grid.classList.remove('in'); void grid.offsetWidth; grid.classList.add('in');
  };
  $$('#kitchens .tabs button').forEach(b => b.addEventListener('click', () => { $$('#kitchens .tabs button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); fz = b.dataset.z; showKits(); }));
  $$('#kitchens .dot').forEach(b => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; $$('#kitchens .dot').forEach(x => x.setAttribute('aria-pressed', String(on && x === b))); fc = on ? b.dataset.c : 'all'; showKits(); }));
  $$('#kitchens .chip').forEach(b => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; $$('#kitchens .chip').forEach(x => x.setAttribute('aria-pressed', String(on && x === b))); fst = on ? b.dataset.st : 'all'; showKits(); }));
  more.addEventListener('click', () => { const first = all.filter(li => li.hidden)[0]; expanded = true; showKits(); first && $('.kit-open', first).focus({ preventScroll: true }); });
  phoneMQ.addEventListener('change', showKits); showKits();
  $('#kitReset').addEventListener('click', () => { $$('#kitchens .chip').forEach(x => x.setAttribute('aria-pressed', 'false')); fst = 'all'; $('#kitchens .tabs button[data-z="all"]').click(); $$('#kitchens .dot').forEach(x => x.setAttribute('aria-pressed', 'false')); fc = 'all'; showKits(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(([e], o) => { if (e.isIntersecting) { grid.classList.add('in'); o.disconnect(); } }, { rootMargin: '0px 0px -15% 0px' }).observe(grid);
  else grid.classList.add('in');

  /* saved kitchens */
  window.__saved = [];
  const estBtn = $('.callbar .btn--line'), hdrEst = $('.hdr-est');
  const isSaved = name => window.__saved.some(l => l.n === name);
  const setSaved = (name, src, on) => {
    window.__saved = on ? (isSaved(name) ? window.__saved : [...window.__saved, { n: name, src }]) : window.__saved.filter(l => l.n !== name);
    $$('.kit .save').forEach(b => { if (b.dataset.n === name) { b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', (on ? 'Saved: ' : 'Save ') + name); } });
    const n = window.__saved.length, t = n ? `Send my ${n} look${n > 1 ? 's' : ''}` : 'Free estimate';
    estBtn.textContent = t; hdrEst.textContent = t;
    window.__wizLooks && window.__wizLooks();
    syncSheetSave();
  };
  grid.addEventListener('click', e => {
    const b = e.target.closest('.save'); if (b) { setSaved(b.dataset.n, b.dataset.src, b.getAttribute('aria-pressed') !== 'true'); return; }
    const o = e.target.closest('.kit-open'); if (o) openSheet(+o.dataset.k, o);
  });

  /* area: prices section tabs + the sheet's select share one value */
  const areaNote = () => area === 'philly' ? 'Philadelphia prices.' : `No public cabinet prices for ${AREA[area]} yet, so these are the Philadelphia numbers. Your exact price comes in the free quote.`;
  const setArea = a => {
    area = a;
    $$('.tabs--area button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.a === a)));
    $('#areaNote').textContent = areaNote(); $('#spArea').value = a; if (cur) fillPrice();
  };
  $$('.tabs--area button').forEach(b => b.addEventListener('click', () => setArea(b.dataset.a)));
  $('#spArea').addEventListener('change', e => setArea(e.target.value));

  /* the sheet */
  const sheet = $('#sheet'), panel = $('.sheet-panel', sheet), track = $('#galTrack'), gc = $('#galCount'), sSave = $('#sheetSave');
  let cur = null, opener = null;
  const fillPrice = () => { const p = PRICE[cur.z]; $('#spHead').textContent = `${cur.z[0].toUpperCase() + cur.z.slice(1)} kitchen, ${p[0]}`; $('#spA').textContent = p[1]; $('#spB').textContent = p[2]; $('#spNote').textContent = areaNote() + ' Typical public data, not an FMA quote.'; };
  function syncSheetSave() { if (!cur) return; const on = isSaved(cur.t); sSave.setAttribute('aria-pressed', String(on)); sSave.textContent = on ? 'Saved for my estimate' : 'I want this look'; }
  const openSheet = (k, from) => {
    cur = KIT[k]; opener = from;
    $('.sheet-info', sheet).scrollTop = 0;
    track.innerHTML = Array.from({ length: cur.n }, (_, i) => `<img src="img/k/${cur.s}-${i + 1}-720.jpg" srcset="img/k/${cur.s}-${i + 1}-720.jpg ${cur.d[i][0]}w, img/k/${cur.s}-${i + 1}-1200.jpg ${cur.d[i][2]}w" sizes="(max-width:900px) 100vw, 58vw" width="${cur.d[i][0]}" height="${cur.d[i][1]}" alt="${cur.t}, photo ${i + 1} of ${cur.n}"${i ? ' loading="lazy"' : ''} decoding="async">`).join('');
    track.scrollLeft = 0; gc.textContent = `1 / ${cur.n}`;
    $('#sheetSize').textContent = cur.z[0].toUpperCase() + cur.z.slice(1) + ' kitchen';
    $('#sheetName').textContent = cur.t;
    $('#sheetSpec').innerHTML = [['Layout', cur.lay], ['Doors', cur.dr], ['Details', cur.det]].map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
    $('#sheetCredit').innerHTML = `Example photos by ${cur.ph} on Unsplash. Not an FMA job.`;
    fillPrice(); syncSheetSave();
    sheet.hidden = false; d.classList.add('sheet-open'); $$('main, header, footer, .callbar').forEach(el => { el.inert = true; });
    requestAnimationFrame(() => { sheet.classList.add('is-open'); panel.focus({ preventScroll: true }); });
  };
  const closeSheet = () => {
    if (sheet.hidden) return;
    sheet.classList.remove('is-open'); d.classList.remove('sheet-open'); $$('main, header, footer, .callbar').forEach(el => { el.inert = false; });
    setTimeout(() => { sheet.hidden = true; }, 320); opener && opener.focus({ preventScroll: true });
  };
  sheet.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeSheet(); });
  addEventListener('keydown', e => {
    if (sheet.hidden) return;
    if (e.key === 'Escape') closeSheet();
    if (e.key === 'ArrowRight') galStep(1); if (e.key === 'ArrowLeft') galStep(-1);
    if (e.key === 'Tab') { const f = $$('button, a, select', panel).filter(x => x.offsetParent); const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });
  const galStep = dir => track.scrollBy({ left: dir * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  $('.gal-prev').addEventListener('click', () => galStep(-1)); $('.gal-next').addEventListener('click', () => galStep(1));
  track.addEventListener('scroll', () => { if (cur) gc.textContent = `${Math.min(cur.n, Math.round(track.scrollLeft / track.clientWidth) + 1)} / ${cur.n}`; }, { passive: true });
  sSave.addEventListener('click', () => setSaved(cur.t, `img/k/${cur.s}-c-480.jpg`, !isSaved(cur.t)));

'''
s = s[:i] + LOOKSJS + s[j:]
srep("$('#year').textContent = new Date().getFullYear();", "const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();")
srep("heroCall = $('.hero .btn--oak')", "heroCall = $('.hero .btn--bone')")
s = s.replace('stroke="#151515" stroke-width="2.6"', 'stroke="#F3ECE0" stroke-width="2.6"')

out = head + '<style>\n' + CSS + '\n</style>\n</head>\n' + BODY + s
open(SRC, 'w').write(out)
print('ok', len(out))
