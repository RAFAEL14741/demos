// ===== VYRA demo store v2 =====
// Photos = VYRA's real Instagram shoot. Product names describe the photo (VYRA has no product names online).
// DEMO content (replace with VYRA's real data before launch): prices ("est."), sizes, size chart, fabric %,
// shipping/exchange terms, gym notes. Prices: sets = avg Gymshark + Brazilian boutique sets; one-pieces scaled
// from Alo onesie $118 vs Alo set $139.
(() => {
const IMG = c => `assets/shop/${c}.webp`;
const v = (n, c, f, a, b) => ({n, c, f, a, b});   // name, swatch, color family, main photo, hover photo
const P = [
  {id:'red', cat:'set', name:'The Red Set', price:95, tag:'Iconic', w:['legs','core'],
    d:'Bra top + high-waist leggings. Four women, one iconic color.',
    why:'Made for leg day. The high waist holds through deep squats and hip thrusts, and the red makes every rep pop on camera.',
    vs:[v('Red','#a3161f','red','De7BrpdFoHL','De7Cz59Fm5H')]},
  {id:'sky', cat:'set', name:'Sky Flare Set', price:95, w:['pilates','street'],
    d:'Bra top + flare leggings. Bold tones, strong presence.',
    why:'Your low-impact day set. The flare moves with you through Pilates and mobility work, then still looks right for coffee after.',
    vs:[v('Sky','#2bb6e8','blue','De6-4-gFv_X','De6-l69lpWQ')]},
  {id:'brown', cat:'set', name:'Brown Halter Set', price:95, tag:'Fall Collection', w:['upper','legs'],
    d:'Halter top + leggings or flare. One tone, infinite versions.',
    why:'The long-session set. The deep tone hides sweat through cardio and double days, and the halter keeps your back free on rows and pull-downs.',
    vs:[v('Brown','#4a2a20','brown','Dc98TRWFurq','DcwgT_3FkyV')]},
  {id:'black', cat:'set', name:'Black Off-Shoulder Set', price:85, w:['legs','street'],
    d:'Off-shoulder long sleeve + shorts. From training to lifestyle.',
    why:'Sleeves keep your shoulders warm for the first sets; the shorts let you watch your knees on squats and lunges.',
    vs:[v('Black','#111214','black','De3A-CnljLd','De0V5_xFs0R')]},
  {id:'slate', cat:'set', name:'Slate Set', price:95, w:['pilates','core'],
    d:'Bra top + leggings or flare.',
    why:'A cool grey that hides sweat. Take the leggings for lifting days and the flare for mat days.',
    vs:[v('Slate','#6f7590','slate','Dc98ALYFgEX','Dcwe-yjFsFF')]},
  {id:'wine', cat:'set', name:'Wine Long-Sleeve Set', price:95, w:['legs','upper'],
    d:'Long sleeve + shorts.',
    why:'Covered up top, full range below. Good for cold-gym mornings when you still want to see your legs work.',
    vs:[v('Wine','#7a1430','red','De3DtMKlkyi','De3C6pVFqyU')]},
  {id:'cream', cat:'set', name:'Cream Off-Shoulder Set', price:95, w:['pilates','street'],
    d:'Off-shoulder long sleeve + leggings.',
    why:'Soft and light for studio classes and slow mornings. Throw a jacket on and you are dressed for the day.',
    vs:[v('Cream','#ece6da','neutral','De3CPN4lvBp')]},
  {id:'pastel', cat:'set', name:'Pastel Set', price:95, tag:'4 tones', w:['pilates','core'],
    d:'Long-sleeve or bra top + leggings, in soft tones.',
    why:'Light colors for light days: mat work, stretching, recovery walks. Pick one tone or match with your training partner.',
    vs:[v('Pink','#efc6d2','pastel','DcvtUmYlqdK','DcvuX7GFnit'), v('Butter','#ece3a6','pastel','Dcvt33zlkld','DcvuX7GFnit'),
        v('Ice blue','#c9e2ef','pastel','Dcvr2lAlieC','DcvuX7GFnit'), v('Mint','#bfe3d6','pastel','Dc97yvtFrJv')]},
  {id:'backless', cat:'one', name:'Backless Jumpsuit', price:80, tag:'Open back', w:['upper','core'],
    d:'Short-sleeve one-piece with an open back.',
    why:'One piece, nothing to pull up between sets. The open back keeps you cool when the upper-body circuit gets heavy.',
    vs:[v('Red','#d0202a','red','DcurTW4Fp1G','Dcuruollmv-'), v('Black','#111214','black','Dcuq3LMFvdI','Dcuruollmv-'), v('Slate','#5d6170','slate','DcurEBGlhd7','Dcuruollmv-')]},
  {id:'halter', cat:'one', name:'Halter Bodysuit', price:70, w:['legs','core'],
    d:'Halter neck, short length.',
    why:'Short and locked in for leg day. Nothing rides up or bunches on box jumps and step-ups.',
    vs:[v('Navy','#2b3150','blue','DcxAFnLFtBg'), v('Pink','#e9c3c8','pastel','Dcw_vLmFkR0'), v('Ice','#dfe8ee','neutral','Dcw_ODLlrYN')]},
  {id:'tee', cat:'one', name:'Tee Bodysuit', price:70, w:['legs','street'],
    d:'Short sleeve, short length.',
    why:'A tee and shorts in one. Throw it on, train, go. No top to tuck back in after every set.',
    vs:[v('Black','#111214','black','Dc1sn17lhiZ'), v('Slate','#6a6c80','slate','Dc1szD1lgA4'), v('White','#f2f2f0','neutral','Dc1tI1zlhyP')]},
  {id:'lsjump', cat:'one', name:'Long-Sleeve Jumpsuit', price:80, w:['pilates','street'],
    d:'Long sleeve, deep V neckline, one piece.',
    why:'From a slow mat session straight to dinner. Covered, warm, and one less outfit decision.',
    vs:[v('Black','#111214','black','DcyWxtnFkft'), v('Cream','#ece6da','neutral','DcyWHj4lrxy')]},
  {id:'blackbra', cat:'set', name:'Black Bra Set', price:85, w:['legs','core'],
    d:'Sports bra + shorts or leggings.',
    why:'The set you will actually wear four days a week. Shorts for leg day, swap to leggings when the gym is cold.',
    vs:[v('Black','#111214','black','Dcuk-X9Fom-','DcweCb5Fu9w')]},
  {id:'white', cat:'set', name:'White Zip Set', price:95, w:['core','street'],
    d:'Zip-up top + shorts.',
    why:'Zip up for the walk in, unzip for the warm-up. Bright white reads clean on camera on core and ball days.',
    vs:[v('White','#f2f2f0','neutral','De2-PRblhb1','De0XHZXlpk1')]},
];
// extra shoot photos per product (cards scrub through them, drawer shows them all, lookbook uses the rest)
const G = {red:['De7CKDNFp4q','De7BQGZFkrK','De7Eb8Vlsz3'], sky:['De6_Ok-FpVo','De6_ujwFgZx','De2-dRnFgde','De7AaypFugJ','De7Avdhlus0'],
  brown:['De0QLlnljzS','DcukTfJlupH','De0PZVqFtlN','De0PuJUFnl3','DcwgyJblkxm','De0QnWRFu6P','DckCbPMlvBp'],
  black:['De0T2zKFlK6','De2_7tdlvRY','De0VHl2lmrp','De0WnNcFkXz'], slate:['DculUi2ls6i','De3DOVuFkvd','De5j_YlFoV7','DcultzSlqqu'],
  wine:['De3EOTDlgyf','De3BeKalsap'], cream:['De2-yaGlner'], blackbra:['Dc98gyoloBh'], white:['De0YTdpFpXd'],
  pastel:['Dc1vWpBlhmI','Dc1vMSblnVm','De2_PYTFkV7','DcyVkIZFr1_','Dc1vt06Frbi','De3ANgtxdHD','Dchc9MBx7qx'],
  backless:['De0O4dJFrq8'], halter:['Dce9Hqexf-N'], tee:['DcccBrMRCds'], lsjump:[]};
const LOOKGRP = {red:'Red', sky:'Sky', brown:'Earth', wine:'Earth', black:'Black', blackbra:'Black', slate:'Slate', pastel:'Soft tones', cream:'Soft tones', white:'Soft tones'};
P.forEach(p => { p.g = G[p.id] || []; p.look = LOOKGRP[p.id] || 'One-pieces'; });
// every photo of a product, the chosen color first (cards scrub these, the drawer strip shows them)
const pics = (p, vi = 0) => [...new Set([p.vs[vi].a, p.vs[vi].b, ...p.vs.filter((_, i) => i !== vi).map(x => x.a), ...p.g].filter(Boolean))];
const WK = [   // shop by workout — real gym shots from VYRA's feed
  {k:'legs', t:'Leg day', s:'Squats, lunges, hip thrusts', img:'DculUi2ls6i'},
  {k:'upper', t:'Upper body', s:'Rows, presses, curls', img:'De0O4dJFrq8'},
  {k:'pilates', t:'Pilates & stretch', s:'Mat work, mobility, flow', img:'De2-yaGlner'},
  {k:'core', t:'Core & ball work', s:'Planks, slams, balance', img:'De0VHl2lmrp'},
  {k:'street', t:'Gym to street', s:'Train, then keep it on', img:'DcyVkIZFr1_'},
];
const FAM = [['red','#a3161f','Red'],['blue','#2bb6e8','Blue'],['brown','#4a2a20','Brown'],['black','#111214','Black'],['slate','#6f7590','Slate'],['pastel','#efc6d2','Pastel'],['neutral','#ece6da','Neutral']];
const SIZES = ['XS','S','M','L','XL'];
const CHART = [['XS','31–32','24–25','34–35',25,35],['S','33–34','26–27','36–37',27,37],['M','35–36','28–29','38–39',29,39],['L','37–39','30–32','40–42',32,42],['XL','40–42','33–35','43–45',35,45]];
const FREE_SHIP = 100;
const HERO = {red:'red', blue:'sky', brown:'brown', black:'black'};   // hero state name -> product id
const byId = Object.fromEntries(P.map(p => [p.id, p]));
const wkById = Object.fromEntries(WK.map(w => [w.k, w]));
const $ = (s, r = document) => r.querySelector(s);
const money = n => '$' + n.toFixed(0);
const lenis = () => window.__lenis;

// ---------- section markup ----------
const shop = $('#shop');
const FAQ = [
  ['How does the sizing run?', 'Snug, second-skin fit. If you are between sizes, size up in leggings and keep your usual top size. The size finder in the size guide does the math for you.'],
  ['Will the leggings go see-through when I squat?', 'No. Every set is squat-tested under bright gym light before it goes on sale.'],
  ['How fast does it ship?', 'Orders ship in 1–2 business days with tracking. US shipping is free over $100.'],
  ['Can I exchange for another size?', 'Yes, within 30 days, as long as it is unworn with the tags on. Send us a DM and we will sort it out.'],
  ['Can I still order through Instagram?', 'Yes. Fill your bag, tap "Order by Instagram DM" and your full order is copied for you. Paste it in our DMs and we confirm from there.'],
  ['How do I wash it?', 'Cold, inside out, then hang dry. Skip fabric softener: it breaks down the stretch over time.'],
];
shop.innerHTML = `
  <div class="s-head">
    <div><div class="s-kick">The collection</div><h3 class="s-title" id="sTitle">Shop by <i>set</i></h3></div>
    <div class="s-ctrl">
      <div class="s-tabs" role="tablist">${[['all','All'],['set','Sets'],['one','One-pieces']].map(([k,t],i)=>`<button role="tab" aria-selected="${!i}" data-cat="${k}" class="${i?'':'on'}">${t}</button>`).join('')}</div>
      <div class="s-cols"><button class="all on" data-fam="">All colors</button>${FAM.map(([k,c,t])=>`<button data-fam="${k}" data-tip="${t}" style="--c:${c}" aria-label="${t}"></button>`).join('')}</div>
    </div>
  </div>
  <div class="s-wk" aria-label="Shop by workout">
    <p class="s-wkh">What are you training today?</p>
    <div class="s-wkrow">${WK.map(w=>`<button class="s-wt" data-wk="${w.k}"><img src="${IMG(w.img)}" alt="" loading="lazy" width="720" height="960"><span><b>${w.t}</b><small>${w.s}</small><em>${P.filter(p=>p.w.includes(w.k)).length} styles</em></span></button>`).join('')}</div>
  </div>
  <div class="s-meta"><span id="sCount"></span><span id="sActive"></span><button data-open="sg">Size guide</button></div>
  <div class="s-grid" id="sGrid"></div>

  <section class="s-spin" aria-labelledby="spH">
    <div class="s-reel" id="spReel" aria-hidden="true"><img id="spImg" src="${IMG(P[0].vs[0].a)}" alt=""><i></i></div>
    <div class="s-spinc"><h3 id="spH">Can't pick? Spin a look.</h3>
      <p class="s-lead" id="spLead">One tap and we pick a set for today. Pick a workout above first and the spin only lands on sets made for it.</p>
      <div id="spRes" aria-live="polite"></div>
      <button class="s-btn s-spinbtn" id="spBtn">Spin a look</button></div>
  </section>

  <section class="s-look" aria-labelledby="lkH">
    <div class="s-lktop"><div><h3 id="lkH">From the shoot</h3><p class="s-lead">Every photo from the VYRA shoot. Drag through, tap any look to shop it.</p></div>
      <div class="s-lkchips" id="lkChips"></div></div>
    <div class="s-lkrail" id="lkRail" data-lenis-prevent-wheel></div>
  </section>

  <section class="s-fab" aria-labelledby="fabH">
    <div class="s-fabimg"><img src="${IMG('fabric')}" alt="VYRA set in its packaging, close up" loading="lazy" width="900" height="900"></div>
    <div><h3 id="fabH">The fabric does the work.</h3>
      <p class="s-lead">Every VYRA piece is cut from the same soft, sculpting knit, so a set feels the same on leg day as it does on a Sunday walk.</p>
      <dl class="s-feats">
        <div><dt>Squat-proof</dt><dd>Stays opaque in a deep squat under bright gym light.</dd></div>
        <div><dt>Sculpting high waist</dt><dd>A wide waistband that holds without digging in or rolling down.</dd></div>
        <div><dt>Four-way stretch</dt><dd>Moves with lunges, splits and overhead reaches, then snaps back.</dd></div>
        <div><dt>Quick-dry</dt><dd>Pulls sweat off your skin so you are not training in a wet set.</dd></div>
      </dl></div>
  </section>

  <section class="s-how" aria-labelledby="howH">
    <h3 id="howH">How ordering works</h3>
    <ol>
      <li><b>Pick your set and size.</b> Not sure on size? The size finder takes ten seconds.</li>
      <li><b>Check out or send it by DM.</b> Pay by card here, or copy your bag into an Instagram DM like you always have.</li>
      <li><b>We pack it and ship it.</b> Out in 1–2 business days, in the same box you see in our posts.</li>
    </ol>
  </section>

  <section class="s-faq" aria-labelledby="faqH">
    <h3 id="faqH">Questions before you buy</h3>
    <div>${FAQ.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
  </section>

  <section class="s-ig" aria-labelledby="igH">
    <div class="s-igtop"><h3 id="igH">Train with us on Instagram</h3><a class="s-btn ghost s-igbtn" href="https://www.instagram.com/vyra.movement/" target="_blank" rel="noopener">Follow @vyra.movement</a></div>
    <form class="s-drop" id="sDrop"><div><b>Get the next drop first.</b><span>New colors sell out fast. We send one email when they land.</span></div>
      <label class="s-vh" for="sMail">Email</label><input id="sMail" type="email" required placeholder="you@email.com" autocomplete="email"><button class="s-btn" type="submit">Notify me</button></form>
  </section>

  <div class="s-band" aria-hidden="true"><div>${Array(2).fill('<span>Built for <i>strength</i></span><span>/</span><span>Designed for <i>movement</i></span><span>/</span><span>Made for <i>confidence</i></span><span>/</span>').join('')}</div></div>
  <footer class="s-foot"><img src="assets/logo.png" alt="VYRA"><span>Demo concept. Prices, sizes and product details are placeholders.</span><a href="https://www.instagram.com/vyra.movement/" target="_blank" rel="noopener">@vyra.movement</a></footer>`;

// ---------- grid + filters (type x color x workout) ----------
let cat = 'all', fam = '', wk = '';
const grid = $('#sGrid');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {rootMargin:'0px 0px -8% 0px'});
function card(p, vi) {
  const x = p.vs[vi];
  return `<article class="s-card" data-id="${p.id}" data-v="${vi}" tabindex="0" aria-label="${p.name}, ${x.n}, ${money(p.price)}">
    <div class="s-ph">${p.tag ? `<span class="s-tag">${p.tag}</span>` : ''}
      <img class="a" src="${IMG(x.a)}" alt="${p.name} in ${x.n}" loading="lazy" width="720" height="960">
      ${(() => { const ps = pics(p, vi).slice(0, 6); return ps.length > 1 ? `<span class="s-ticks" data-pics="${ps.join(',')}">${ps.map((_, i) => `<b class="${i ? '' : 'on'}"></b>`).join('')}</span>` : ''; })()}
      <button class="s-quick" tabindex="-1" aria-hidden="true">+</button></div>
    <div class="s-info"><div><h4>${p.name}</h4><div class="s-sub">${p.vs.map(y=>`<span class="s-dot" style="--c:${y.c}" title="${y.n}"></span>`).join('')}<span>${p.vs.length > 1 ? p.vs.length + ' colors' : x.n}</span></div></div>
      <div class="s-pr">${money(p.price)}<small>est.</small></div></div></article>`;
}
function render() {
  const items = [];
  P.forEach(p => {
    if (cat !== 'all' && p.cat !== cat) return;
    if (wk && !p.w.includes(wk)) return;
    const vi = fam ? p.vs.findIndex(x => x.f === fam) : 0;   // color filter shows that color's real photo
    if (vi < 0) return;
    items.push(card(p, vi));
  });
  if (!fam && !wk && cat !== 'one' && items.length > 4)    // real gym shot as a brand tile, 2nd row
    items.splice(4, 0, `<button class="s-feat s-card" data-jump="wk"><img src="${IMG('De0QnWRFu6P')}" alt="" loading="lazy"><span><p>Dressed for the set,<br>not just the photo.</p><small>Shop by workout</small></span></button>`);
  grid.innerHTML = items.length ? items.join('')
    : `<div class="s-empty">Nothing matches all of those yet.<br><button class="s-btn ghost" data-clear style="width:auto;padding:12px 22px;margin-top:16px">Clear filters</button></div>`;
  const n = grid.querySelectorAll('.s-card[data-id]').length;
  $('#sCount').textContent = `${n} ${n === 1 ? 'style' : 'styles'}`;
  const act = [wk && wkById[wk].t, fam && FAM.find(f => f[0] === fam)[2]].filter(Boolean);
  $('#sActive').innerHTML = act.length ? `${act.join(' + ')} <button data-clear aria-label="Clear filters">Clear</button>` : '';
  [...grid.children].forEach((el, i) => { el.style.setProperty('--k', i % 4); reduce ? el.classList.add('in') : io.observe(el); });
  shop.querySelectorAll('[data-cat]').forEach(b => { const on = b.dataset.cat === cat; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
  shop.querySelectorAll('[data-fam]').forEach(b => b.classList.toggle('on', b.dataset.fam === fam));
  shop.querySelectorAll('[data-wk]').forEach(b => b.classList.toggle('on', b.dataset.wk === wk));
  setTitle(wk ? ['Shop for', wkById[wk].t.toLowerCase()] : fam ? ['Shop by', 'color'] : ['Shop by', cat === 'one' ? 'one-piece' : 'set']);
}
function setTitle([a, b]) {
  const el = $('#sTitle'), html = `${a} <i>${b}</i>`; if (el.innerHTML === html) return;
  el.classList.add('swap'); setTimeout(() => { el.innerHTML = html; el.classList.remove('swap'); }, reduce ? 0 : 220);
}
function setFilter(o) { if ('cat' in o) cat = o.cat; if ('fam' in o) fam = o.fam; if ('wk' in o) wk = o.wk; render(); }
shop.addEventListener('click', e => {
  const t = e.target.closest('[data-cat]'), f = e.target.closest('[data-fam]'), w = e.target.closest('[data-wk]');
  if (t) return setFilter({cat: t.dataset.cat});
  if (f) return setFilter({fam: f.dataset.fam});
  if (w) { setFilter({wk: wk === w.dataset.wk ? '' : w.dataset.wk}); scrollTo('#sGrid', -150); return; }
  if (e.target.closest('[data-clear]')) return setFilter({cat: 'all', fam: '', wk: ''});
  if (e.target.closest('[data-jump]')) return scrollTo('.s-wk', -110);
  const c = e.target.closest('.s-card[data-id]'); if (c) openProduct(c.dataset.id, +c.dataset.v);
});
grid.addEventListener('keydown', e => { const c = e.target.closest('.s-card[data-id]'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openProduct(c.dataset.id, +c.dataset.v); } });
function scrollTo(sel, offset = 0) { const l = lenis(); l ? l.scrollTo(sel, {offset, duration: 1.2}) : $(sel).scrollIntoView({behavior: reduce ? 'auto' : 'smooth'}); }
render();

// ---------- drawers ----------
document.body.insertAdjacentHTML('beforeend', `
  <div class="s-ov" id="sOv"></div>
  <aside class="s-dr s-pd" id="pd" role="dialog" aria-modal="true" aria-label="Product" hidden>
    <div class="s-qg" id="pdGal">
      <div class="s-thumbs" id="pdThumbs" data-lenis-prevent></div>
      <div class="s-stage" id="pdStage" title="Click to zoom"><img id="pdImg" alt=""><button class="s-nav s-prev" data-g="-1" aria-label="Previous photo">‹</button><button class="s-nav s-next" data-g="1" aria-label="Next photo">›</button><span class="s-gcount" id="pdCount"></span><span class="s-zhint">Click to zoom</span></div>
    </div>
    <div class="s-qcol"><header><span>Product</span><button class="s-x" data-close aria-label="Close">×</button></header>
      <div class="s-body" data-lenis-prevent id="pdBody"></div>
      <footer><button class="s-btn" id="pdAdd">Pick a size</button><a class="s-btn ghost" href="https://ig.me/m/vyra.movement" target="_blank" rel="noopener">Ask VYRA on Instagram</a></footer></div></aside>
  <aside class="s-dr" id="cart" role="dialog" aria-modal="true" aria-label="Bag" hidden><header><span>Your bag (<b id="cN">0</b>)</span><button class="s-x" data-close aria-label="Close">×</button></header>
    <div class="s-body" data-lenis-prevent><div class="s-ship" id="cShip"></div><div id="cLines"></div>
      <div class="s-co" id="cCo"><p>This is where secure checkout goes.</p><div class="s-note">Demo: on the live store this opens card / Apple Pay checkout. For now, send the order by DM.</div></div></div>
    <footer id="cFoot"><div class="s-tot"><span>Subtotal <small style="color:var(--mute)">(est.)</small></span><b id="cTot">$0</b></div><div class="s-free">Taxes calculated at checkout.</div>
      <button class="s-btn" id="cCheck">Checkout</button><button class="s-btn ghost" id="cDm">Order by Instagram DM</button></footer></aside>
  <aside class="s-dr s-sg" id="sg" role="dialog" aria-modal="true" aria-label="Size guide" hidden><header><span>Size guide</span><button class="s-x" data-close aria-label="Close">×</button></header>
    <div class="s-body" data-lenis-prevent>
      <div class="s-find"><b>Size finder</b><span>Enter your measurements in inches.</span>
        <div class="s-fin"><label>Waist<input id="fW" type="number" inputmode="decimal" min="20" max="50" step="0.5" placeholder="28"></label>
          <label>Hips<input id="fH" type="number" inputmode="decimal" min="28" max="60" step="0.5" placeholder="38"></label></div>
        <div class="s-res" id="fR" aria-live="polite">Your size shows up here.</div></div>
      <div class="s-lab">How to measure</div>
      <ol><li><b>Bust</b>: around the fullest part, tape level.</li><li><b>Waist</b>: around the narrowest part of your torso.</li><li><b>Hips</b>: around the fullest part, feet together.</li></ol>
      <div class="s-lab">Body measurements (inches)</div>
      <table><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hips</th></tr>${CHART.map(r=>`<tr data-row="${r[0]}">${r.slice(0,4).map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table>
      <div class="s-warn">Between sizes? Size up in leggings and shorts, keep your usual size in tops.</div>
    </div></aside>`);
const ov = $('#sOv'); let openEl = null, lastFocus = null, back = null;
function open(id) {
  back = openEl && openEl.id === 'pd' && id === 'sg' ? 'pd' : null;   // size guide from a product -> return to it on close
  if (openEl) { openEl.classList.remove('on'); openEl.hidden = true; }
  openEl = $('#' + id); lastFocus = lastFocus || document.activeElement;
  openEl.hidden = false; void openEl.offsetWidth; openEl.classList.add('on');   // reflow first, or the slide-in is skipped
  ov.classList.add('on'); lenis()?.stop();
  setTimeout(() => openEl?.querySelector('.s-x')?.focus({preventScroll:true}), 60);
}
function close() {
  if (!openEl) return;
  if (back) { const b = back; back = null; const f = lastFocus; open(b); lastFocus = f; return; }
  const el = openEl; el.classList.remove('on'); setTimeout(() => { if (el !== openEl) el.hidden = true; }, 500);
  ov.classList.remove('on'); openEl = null; lenis()?.start();
  lastFocus?.focus?.({preventScroll:true}); lastFocus = null;
}
ov.addEventListener('click', close);
document.addEventListener('keydown', e => {
  if (!openEl) return;
  if (e.key === 'Escape') return close();
  if (e.key === 'Tab') {   // keep keyboard focus inside the open drawer
    const f = [...openEl.querySelectorAll('button,a[href],input,summary,[tabindex="0"]')].filter(x => !x.disabled && x.offsetParent);
    if (!f.length) return; const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
document.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) close();
  const o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); open(o.dataset.open); }
});

// ---------- size finder ----------
function findSize() {
  const w = parseFloat($('#fW').value), h = parseFloat($('#fH').value), r = $('#fR');
  document.querySelectorAll('#sg tr[data-row]').forEach(t => t.classList.remove('hit'));
  if (!(w > 0) && !(h > 0)) { r.textContent = 'Your size shows up here.'; return; }
  const by = (val, i) => val > 0 ? CHART.findIndex(c => val <= c[i]) : 0;
  const iw = by(w, 4), ih = by(h, 5);
  if (iw < 0 || ih < 0) { r.innerHTML = 'You are above our XL chart. Send us a DM and we will help you pick.'; return; }
  const s = CHART[Math.max(iw, ih)][0];
  r.innerHTML = `We'd go with <b>${s}</b>.${iw !== ih && w > 0 && h > 0 ? ' You are between sizes, so size up in leggings.' : ''}`;
  document.querySelector(`#sg tr[data-row="${s}"]`).classList.add('hit');
}
['fW','fH'].forEach(id => $('#' + id).addEventListener('input', findSize));

// ---------- quick-view gallery ----------
const HI = c => `assets/shop/hi/${c}.webp`;
let gal = [], gi = 0;
function drawGal() {
  gal = pics(cur.p, cur.vi); gi = 0;
  $('#pdThumbs').innerHTML = gal.map((c, i) => `<button data-gi="${i}" aria-label="Photo ${i + 1}"><img src="${IMG(c)}" alt="" loading="lazy"></button>`).join('');
  setGal(0);
}
function setGal(i) {
  gi = (i + gal.length) % gal.length; const st = $('#pdStage'), img = $('#pdImg');
  st.classList.remove('zoom'); img.style.transformOrigin = '';
  img.src = IMG(gal[gi]); const hi = new Image(); hi.onload = () => { if (gal[gi] && img.src.includes(gal[gi])) img.src = hi.src; }; hi.src = HI(gal[gi]);
  img.alt = `${cur.p.name}, photo ${gi + 1} of ${gal.length}`;
  $('#pdCount').textContent = `${gi + 1} / ${gal.length}`;
  $('#pdThumbs').querySelectorAll('button').forEach((b, j) => b.classList.toggle('on', j === gi));
  $('#pdThumbs').children[gi]?.scrollIntoView({block: 'nearest', inline: 'nearest'});
  st.classList.toggle('one', gal.length < 2);
}
$('#pdThumbs').addEventListener('click', e => { const b = e.target.closest('[data-gi]'); if (b) setGal(+b.dataset.gi); });
{
  const st = $('#pdStage'), img = $('#pdImg'); let sx = 0, sy = 0, swiped = false;
  const origin = e => { const r = st.getBoundingClientRect();
    img.style.transformOrigin = `${((e.clientX - r.left) / r.width * 100).toFixed(1)}% ${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`; };
  st.addEventListener('click', e => {
    const n = e.target.closest('[data-g]'); if (n) { setGal(gi + +n.dataset.g); return; }
    if (swiped) { swiped = false; return; }
    st.classList.toggle('zoom'); if (st.classList.contains('zoom')) origin(e);
  });
  st.addEventListener('pointermove', e => { if (st.classList.contains('zoom')) origin(e); });
  st.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') st.classList.remove('zoom'); });
  st.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiped = false; }, {passive: true});
  st.addEventListener('touchend', e => {   // swipe = next/prev photo (only when not zoomed)
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (!st.classList.contains('zoom') && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { swiped = true; setGal(gi + (dx < 0 ? 1 : -1)); }
  }, {passive: true});
  document.addEventListener('keydown', e => { if (openEl?.id !== 'pd' || e.target.closest('input')) return;
    if (e.key === 'ArrowRight') setGal(gi + 1); if (e.key === 'ArrowLeft') setGal(gi - 1); });
}

// ---------- product drawer ----------
let cur = null;   // {p, vi, size}
function openProduct(id, vi = 0) { cur = {p: byId[id], vi, size: null}; drawProduct(); drawGal(); open('pd'); $('#pdBody').scrollTop = 0; }
function drawProduct() {
  const {p, vi, size} = cur, x = p.vs[vi];
  const fit = p.cat === 'set' ? 'Snug, second-skin fit. Between sizes? Size up in the bottoms and keep your usual top size.'
                              : 'Fitted through the body with a little give at the torso. Between sizes? Go by your hips.';
  const also = P.filter(q => q.id !== p.id && q.w.some(k => p.w.includes(k))).slice(0, 3);
  $('#pdBody').innerHTML = `
    <h3>${p.name}</h3><div class="s-p">${money(p.price)}<small>est. price</small></div><p class="s-d">${p.d}</p>
    <div class="s-lab">Color <b>${x.n}</b></div>
    <div class="s-vs">${p.vs.map((y,i)=>`<button data-vi="${i}" class="${i===vi?'on':''}" style="--c:${y.c}" aria-label="${y.n}" aria-pressed="${i===vi}"></button>`).join('')}</div>
    <div class="s-lab">Size <button data-open="sg">Find my size</button></div>
    <div class="s-sz">${SIZES.map(s=>`<button data-size="${s}" class="${s===size?'on':''}" aria-pressed="${s===size}">${s}</button>`).join('')}</div>
    <div class="s-why"><b>Why it works</b><p>${p.why}</p><div class="s-best">${p.w.map(k=>`<span>${wkById[k].t}</span>`).join('')}</div></div>
    <div class="s-acc">
      <details open><summary>Fit</summary><p>${fit}</p></details>
      <details><summary>Fabric &amp; care</summary><p>78% nylon, 22% spandex. Squat-proof, four-way stretch, quick-dry. Wash cold inside out and hang dry; skip fabric softener.</p></details>
      <details><summary>Shipping &amp; exchanges</summary><p>Ships in 1–2 business days, free US shipping over ${money(FREE_SHIP)}. Exchange unworn pieces with tags within 30 days.</p></details>
    </div>
    ${also.length ? `<div class="s-lab">Train in these too</div><div class="s-also">${also.map(q=>`<button data-alt="${q.id}"><img src="${IMG(q.vs[0].a)}" alt="" loading="lazy"><span>${q.name}</span><small>${money(q.price)}</small></button>`).join('')}</div>` : ''}`;
  $('#pdAdd').textContent = size ? `Add to bag · ${money(p.price)}` : 'Pick a size';
}
$('#pdBody').addEventListener('click', e => {
  const c = e.target.closest('[data-vi]'), s = e.target.closest('[data-size]'), a = e.target.closest('[data-alt]');
  if (c) { cur.vi = +c.dataset.vi; drawProduct(); drawGal(); }
  if (s) { cur.size = s.dataset.size; drawProduct(); }
  if (a) { cur = {p: byId[a.dataset.alt], vi: 0, size: null}; drawProduct(); drawGal(); $('#pdBody').scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'}); }
});
$('#pdAdd').addEventListener('click', () => {
  if (!cur.size) { const sz = $('#pdBody .s-sz'), lab = sz.previousElementSibling;
    sz.scrollIntoView({block: 'center', behavior: reduce ? 'auto' : 'smooth'});
    sz.classList.remove('need'); void sz.offsetWidth; sz.classList.add('need'); lab.classList.add('need'); lab.firstChild.textContent = 'Size · pick one ';
    setTimeout(() => { lab.classList.remove('need'); if (lab.isConnected) lab.firstChild.textContent = 'Size '; }, 1800); return; }
  add(cur.p.id, cur.vi, cur.size); close();
});

// ---------- card photo scrub: move across a card to flip through its photos ----------
grid.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const ph = e.target.closest('.s-ph'), tk = ph?.querySelector('.s-ticks'); if (!tk) return;
  const ps = tk.dataset.pics.split(','), r = ph.getBoundingClientRect();
  const i = Math.min(ps.length - 1, Math.max(0, Math.floor((e.clientX - r.left) / r.width * ps.length)));
  if (ph._i === i) return; ph._i = i;
  if (!ph._pre) { ph._pre = 1; ps.forEach(c => { new Image().src = IMG(c); }); }
  ph.querySelector('img.a').src = IMG(ps[i]); tk.querySelectorAll('b').forEach((b, j) => b.classList.toggle('on', j === i));
});
grid.addEventListener('pointerout', e => {
  const ph = e.target.closest('.s-ph'); if (!ph || ph.contains(e.relatedTarget) || ph._i == null) return;
  const tk = ph.querySelector('.s-ticks'); ph._i = null;
  ph.querySelector('img.a').src = IMG(tk.dataset.pics.split(',')[0]); tk.querySelectorAll('b').forEach((b, j) => b.classList.toggle('on', !j));
});

// ---------- lookbook rail: the whole shoot, filter by collection, tap to shop ----------
const LOOK = P.flatMap(p => pics(p).slice(1).map(c => ({c, id: p.id, vi: Math.max(0, p.vs.findIndex(x => x.a === c)), grp: p.look})));
const GRPS = ['All', ...new Set(P.map(p => p.look))];
let lkGrp = 'All';
$('#lkChips').innerHTML = GRPS.map(g => `<button data-lk="${g}" class="${g === 'All' ? 'on' : ''}">${g}</button>`).join('');
function drawLook() {
  const items = LOOK.filter(l => lkGrp === 'All' || l.grp === lkGrp);
  $('#lkRail').innerHTML = items.map((l, i) => `<button class="s-lk" data-lid="${l.id}" data-lv="${l.vi}" style="--k:${i % 8}"><img src="${IMG(l.c)}" alt="" loading="lazy" width="720" height="960" draggable="false"><span>${byId[l.id].name}</span></button>`).join('');
  $('#lkRail').scrollLeft = 0;
}
$('#lkChips').addEventListener('click', e => { const b = e.target.closest('[data-lk]'); if (!b) return; lkGrp = b.dataset.lk;
  $('#lkChips').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); drawLook(); });
{ // drag to scroll with the mouse (touch scrolls natively); a drag never counts as a tap
  const rail = $('#lkRail'); let down = false, x0 = 0, s0 = 0, moved = false;
  rail.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = rail.scrollLeft; });
  addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 8) { moved = true; rail.classList.add('drag'); } rail.scrollLeft = s0 - dx; });
  addEventListener('pointerup', () => { down = false; rail.classList.remove('drag'); });
  rail.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; return; }
    const b = e.target.closest('[data-lid]'); if (b) openProduct(b.dataset.lid, +b.dataset.lv); });
  rail.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation(); }, {passive: true});
}
drawLook();

// ---------- spin a look: a slot reel that slows down and lands on a set ----------
let spinning = false;
$('#spBtn').addEventListener('click', () => {
  if (spinning) return; spinning = true;
  const pool = P.filter(p => !wk || p.w.includes(wk)), pick = pool[Math.floor(Math.random() * pool.length)];
  const img = $('#spImg'), reel = $('#spReel'), res = $('#spRes'), btn = $('#spBtn');
  res.innerHTML = ''; btn.disabled = true; btn.textContent = 'Spinning…'; reel.classList.add('go');
  const steps = reduce ? 1 : 16; let n = 0;
  (function tick() {
    const p = n < steps - 1 ? P[(Math.random() * P.length) | 0] : pick;
    img.src = IMG(p.vs[0].a); reel.classList.remove('flip'); void reel.offsetWidth; reel.classList.add('flip');
    if (++n < steps) return setTimeout(tick, 45 + n * n * 1.6);   // quadratic slow-down
    reel.classList.remove('go'); reel.classList.add('land'); setTimeout(() => reel.classList.remove('land'), 600);
    res.innerHTML = `<div class="s-spres"><b>${pick.name}</b><span>${money(pick.price)} est.${wk ? ' · made for ' + wkById[wk].t.toLowerCase() : ''}</span><p>${pick.why}</p>
      <button class="s-btn ghost" data-spshop="${pick.id}">Shop this look</button></div>`;
    btn.disabled = false; btn.textContent = 'Spin again'; spinning = false;
  })();
});
$('#spRes').addEventListener('click', e => { const b = e.target.closest('[data-spshop]'); if (b) openProduct(b.dataset.spshop, 0); });

// ---------- cart (kept in this browser only) ----------
let bag = [];
try { bag = JSON.parse(localStorage.getItem('vyraBag') || '[]').filter(l => byId[l.id] && byId[l.id].vs[l.vi]); } catch (e) { bag = []; }
const save = () => { try { localStorage.setItem('vyraBag', JSON.stringify(bag)); } catch (e) {} };
const count = () => bag.reduce((n, l) => n + l.q, 0);
const total = () => bag.reduce((n, l) => n + l.q * byId[l.id].price, 0);
const toast = $('.toast') || document.body.appendChild(Object.assign(document.createElement('div'), {className:'toast', role:'status'}));
function say(t) { toast.textContent = t; toast.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove('on'), 2400); }
function add(id, vi, size) {
  const l = bag.find(l => l.id === id && l.vi === vi && l.size === size);
  l ? l.q++ : bag.push({id, vi, size, q: 1});
  save(); drawCart();
  const b = $('.bag'); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
  const left = FREE_SHIP - total();
  say(`Added ${byId[id].name}, ${byId[id].vs[vi].n}, ${size}` + (left > 0 ? ` · ${money(left)} to free shipping` : ' · free shipping unlocked'));
}
function drawCart() {
  $('.bag span').textContent = count(); $('#cN').textContent = count();
  $('#cCo').classList.remove('on');
  const t = total(), left = FREE_SHIP - t;
  $('#cShip').innerHTML = bag.length ? `<span>${left > 0 ? `You are <b>${money(left)}</b> away from free shipping` : '<b>Free shipping</b> unlocked'}</span><i style="--p:${Math.min(1, t / FREE_SHIP)}"></i>` : '';
  $('#cLines').innerHTML = bag.length ? bag.map((l, i) => { const p = byId[l.id], x = p.vs[l.vi];
    return `<div class="s-line"><img src="${IMG(x.a)}" alt=""><div><h5>${p.name}</h5><div class="s-sub">${x.n} · ${l.size}</div>
      <div class="s-q"><button data-q="${i}" data-d="-1" aria-label="One less">−</button><span>${l.q}</span><button data-q="${i}" data-d="1" aria-label="One more">+</button></div></div>
      <div style="text-align:right">${money(p.price * l.q)}<br><button class="s-rm" data-rm="${i}">Remove</button></div></div>`; }).join('')
    : '<div class="s-empty" style="padding:40px 0">Your bag is empty.<br><br><button class="s-btn ghost" data-close>Keep shopping</button></div>';
  $('#cTot').textContent = money(t);
  $('#cFoot').style.display = bag.length ? '' : 'none';
}
$('#cLines').addEventListener('click', e => {
  const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]');
  if (q) { const l = bag[+q.dataset.q]; l.q += +q.dataset.d; if (l.q < 1) bag.splice(+q.dataset.q, 1); }
  if (r) bag.splice(+r.dataset.rm, 1);
  if (q || r) { save(); drawCart(); }
});
$('#cCheck').addEventListener('click', () => { $('#cCo').classList.add('on'); $('#cCo').scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'nearest'}); });
// Instagram DMs can't be pre-filled -> copy the order, then open the DM
$('#cDm').addEventListener('click', async () => {
  const msg = 'Hi VYRA! I would like to order:\n' + bag.map(l => { const p = byId[l.id];
    return `• ${l.q}x ${p.name} — ${p.vs[l.vi].n} — ${l.size}`; }).join('\n') + `\nTotal (est.): ${money(total())}`;
  try { await navigator.clipboard.writeText(msg); say('Order copied. Paste it in the DM.'); } catch (e) { say('Opening Instagram…'); }
  window.open('https://ig.me/m/vyra.movement', '_blank', 'noopener');
});
drawCart();

// ---------- drop alerts (demo: nothing is stored or sent) ----------
$('#sDrop').addEventListener('submit', e => { e.preventDefault(); say("You're on the list for the next drop."); e.target.reset(); });

// ---------- hooks: nav + hero ----------
document.addEventListener('click', e => {
  if (e.target.closest('.bag')) { e.preventDefault(); open('cart'); return; }
  const go = e.target.closest('[data-go-shop]');
  if (go) { e.preventDefault(); const k = go.dataset.goShop;
    if (k === 'sg') { open('sg'); return; }
    setFilter({cat: k, fam: '', wk: ''}); scrollTo('#shop', -10); return; }
  const h = e.target.closest('#hero .add, #hero .link');   // hero "Add to bag" / "View set" -> pick a size first
  if (h) { e.preventDefault(); const name = h.dataset.name || h.closest('.info').querySelector('.add').dataset.name; openProduct(HERO[name] || 'red', 0); }
});
// nav glass when the store covers the top 76px strip (IO = no per-frame layout reads next to the WebGL hero)
const nav = $('.nav'); let navIO;
function watchNav() { navIO?.disconnect(); navIO = new IntersectionObserver(es => nav.classList.toggle('solid', es[0].isIntersecting), {rootMargin: `0px 0px ${76 - innerHeight}px 0px`}); navIO.observe(shop); }
watchNav(); let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(watchNav, 200); });
window.__shop = {open, openProduct, add, setFilter, bag: () => bag};
})();
