import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
import fs from 'fs';
const URL = process.argv[2] || 'http://127.0.0.1:8765/fma-rebrand/';
const OUT = '/home/claude/work/shots4'; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const probe = () => {
  const hit = sel => { const el = document.querySelector(sel), rc = el.getBoundingClientRect(); if (rc.bottom < 0 || rc.top > innerHeight) return 'off';
    const cy = rc.top + rc.height / 2, r = el.classList.contains('btn') ? rc.height / 2 : 4;
    return [[rc.left + r, cy], [rc.left + rc.width / 2, cy], [rc.right - r, cy]].every(([x, y]) => { const e = document.elementFromPoint(x, y); return e && (e === el || el.contains(e)); }); };
  const ov = (a, b) => { const A = document.querySelector(a).getBoundingClientRect(), B = document.querySelector(b).getBoundingClientRect(); return !(A.right <= B.left || B.right <= A.left || A.bottom <= B.top || B.bottom <= A.top); };
  return { ready: !!window.__paintReady, name: document.getElementById('paintName').textContent, call: hit('.hero .btn--bone'), est: hit('.hero .btn--ghost'), h1: hit('.hero h1'), info: hit('.hero-info'), sw: hit('.sw[data-i="3"]'),
    factsVsPaint: false, copyVsPaint: ov('.hero-in', '.paint'),
    edge: [...document.querySelectorAll('body *')].filter(e => { const rc = e.getBoundingClientRect(); return rc.width && (rc.right > innerWidth + .5 || rc.left < -.5) && !e.closest('.drawer,.skip,[hidden],.hero-media,.tiers-grid,.swipe,.chips,svg') && getComputedStyle(e).position !== 'fixed'; }).map(e => e.className).slice(0, 5) };
};
for (const [name, vp, mob] of [['desk', { width: 1440, height: 900 }, false], ['phone', { width: 390, height: 844 }, true], ['tab', { width: 1024, height: 768 }, false], ['wide', { width: 1920, height: 1080 }, false], ['small', { width: 320, height: 640 }, true]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2, isMobile: mob, hasTouch: mob });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  const t0 = Date.now(); await p.goto(URL);
  const steps = [];
  for (const t of [300, 1500, 2200, 4800, 7800]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); steps.push({ t, ...(await p.evaluate(probe)) }); await p.screenshot({ path: `${OUT}/${name}-${t}.png` }); }
  await p.evaluate(() => new Promise(r => { const el = document.getElementById('paintName'), o = new MutationObserver(() => { o.disconnect(); setTimeout(r, 250); }); o.observe(el, { childList: true, characterData: true, subtree: true }); }));   /* click DURING a wipe */
  await p.click('.sw[data-i="3"]'); await p.waitForTimeout(2600);
  const afterClick = await p.evaluate(() => document.getElementById('paintName').textContent + ' pressed=' + document.querySelector('.sw[data-i="3"]').getAttribute('aria-pressed'));
  await p.screenshot({ path: `${OUT}/${name}-click-sage.png` });
  await p.waitForTimeout(4000);
  const heldStill = await p.evaluate(() => document.getElementById('paintName').textContent);
  console.log(name, JSON.stringify({ errs, steps, afterClick, heldStill }));
  await ctx.close();
}
const rm = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await rm.goto(URL); await rm.waitForTimeout(6000);
console.log('reduced', await rm.evaluate(() => document.getElementById('paintName').textContent + ' ready=' + !!window.__paintReady));
await rm.click('.sw[data-i="2"]'); await rm.waitForTimeout(300);
console.log('reduced click', await rm.evaluate(() => document.getElementById('paintName').textContent));
await b.close();
