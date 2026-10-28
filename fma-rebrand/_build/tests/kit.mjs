import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768 });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(800);
  const vis = () => p.evaluate(() => [...document.querySelectorAll('.kit')].filter(l => !l.hidden).length);
  const r = { start: await vis() };
  await p.click('#kitchens .tabs button[data-z="small"]'); r.small = await vis();
  await p.click('#kitchens .dot[data-c="green"]'); r.smallGreen = await vis();
  await p.click('#kitchens .dot[data-c="green"]'); await p.click('#kitchens .tabs button[data-z="all"]'); r.all = await vis();
  await p.evaluate(() => document.querySelector('#kitGrid').scrollIntoView()); await p.waitForTimeout(900);
  await p.click('.kit:not([hidden]) .kit-open >> nth=1'); await p.waitForTimeout(500);
  r.open = await p.evaluate(() => ({ hidden: document.querySelector('#sheet').hidden, name: document.querySelector('#sheetName').textContent, imgs: document.querySelectorAll('#galTrack img').length, count: document.querySelector('#galCount').textContent, a: document.querySelector('#spA').textContent, focus: document.activeElement.className }));
  await p.screenshot({ path: `/home/claude/work/walk/sheet-${w}.png` });
  if (w > 767) { await p.click('.gal-next'); await p.waitForTimeout(700); } else { await p.evaluate(() => { const t = document.querySelector('#galTrack'); t.scrollLeft = t.clientWidth * 2; }); await p.waitForTimeout(400); }
  r.count2 = await p.textContent('#galCount');
  await p.selectOption('#spArea', 'nj'); r.note = (await p.textContent('#spNote')).slice(0, 60); r.areaNote = (await p.textContent('#areaNote')).slice(0, 40);
  await p.click('#sheetSave'); r.saveTxt = await p.textContent('#sheetSave'); r.hdr = await p.evaluate(() => document.querySelector('.hdr-est').textContent);
  await p.screenshot({ path: `/home/claude/work/walk/sheet2-${w}.png` });
  await p.keyboard.press('Escape'); await p.waitForTimeout(450);
  r.closed = await p.evaluate(() => ({ hidden: document.querySelector('#sheet').hidden, focus: document.activeElement.className, inert: document.querySelector('main').inert, cardSaved: document.querySelectorAll('.kit .save[aria-pressed="true"]').length }));
  await p.evaluate(() => document.querySelector('#contact').scrollIntoView()); await p.waitForTimeout(300);
  r.mini = await p.locator('.mini img').count();
  r.sw = await p.evaluate(W => document.documentElement.scrollWidth - W, w);
  r.errs = errs; console.log(w, JSON.stringify(r)); await p.close();
}
await b.close();
