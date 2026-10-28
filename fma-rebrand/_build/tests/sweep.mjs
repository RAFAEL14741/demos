import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const pages = ['', 'custom-kitchen-islands-philadelphia.html', 'kitchen-cabinet-refacing-northeast-philadelphia.html', 'cabinet-installation-service-areas.html'];
for (const [w, h, mob] of [[390, 844, true], [1440, 900, false]]) for (const pg of pages) {
  const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob });
  const errs = [], bad = [], con = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') con.push(m.text().slice(0, 120)); });
  p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url().replace('http://127.0.0.1:8765', '')); });
  await p.goto('http://127.0.0.1:8765/fma-rebrand/' + pg); await p.waitForTimeout(1500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(90); }
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => ({
    brokenImgs: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc.split('/').slice(-2).join('/')),
    noAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
    sw: document.documentElement.scrollWidth - innerWidth, title: document.title.slice(0, 60),
    h1: document.querySelectorAll('h1').length, links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => h && !h.startsWith('#') && !/^(tel|mailto|sms|http)/.test(h)).filter((v, i, a) => a.indexOf(v) === i)
  }));
  console.log(w, pg || 'index', JSON.stringify({ ...r, errs, bad, con }));
  await p.close();
}
await b.close();
