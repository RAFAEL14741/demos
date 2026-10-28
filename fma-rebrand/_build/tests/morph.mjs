import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
import { writeFileSync } from 'fs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const out = '/tmp/claude-0/-home-claude/3a81cd21-570b-5ee0-a826-ac3b72eb8b5d/scratchpad/';
for (const [n, vp] of [['d', { width: 1440, height: 900 }], ['m', { width: 390, height: 844 }]]) {
  const pg = await (await b.newContext({ viewport: vp })).newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await pg.goto('http://127.0.0.1:8765/fma-rebrand/', { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.querySelector('#kitchens .meta').scrollIntoView({ block: 'start' }));
  await pg.waitForTimeout(600);
  const card = pg.locator('.kit-open').nth(1);
  const sel = await card.boundingBox();
  await card.click();
  for (const t of [120, 260]) { await pg.waitForTimeout(t === 120 ? 120 : 140); await pg.screenshot({ path: out + `mo-${n}-${t}.png` }); }
  await pg.waitForTimeout(700);
  const mid = await pg.evaluate(() => ({ fly: document.querySelectorAll('.fly').length, op: getComputedStyle(document.querySelector('#galTrack img')).opacity, cardVis: getComputedStyle(document.querySelectorAll('.kit-open img')[1]).visibility }));
  await pg.screenshot({ path: out + `mo-${n}-open.png` });
  await pg.keyboard.press('Escape');
  await pg.waitForTimeout(130); await pg.screenshot({ path: out + `mo-${n}-c130.png` });
  await pg.waitForTimeout(150); await pg.screenshot({ path: out + `mo-${n}-c280.png` });
  await pg.waitForTimeout(700);
  const end = await pg.evaluate(() => ({ fly: document.querySelectorAll('.fly').length, cardVis: getComputedStyle(document.querySelectorAll('.kit-open img')[1]).visibility, hidden: document.querySelector('#sheet').hidden, inert: document.querySelector('main').inert }));
  console.log(n, 'afterOpen', JSON.stringify(mid), 'afterClose', JSON.stringify(end), 'errs', errs);
  // rapid close/reopen
  await card.click(); await pg.waitForTimeout(100); await pg.keyboard.press('Escape'); await pg.waitForTimeout(60); await card.click(); await pg.waitForTimeout(900);
  console.log(n, 'rapid', JSON.stringify(await pg.evaluate(() => ({ fly: document.querySelectorAll('.fly').length, op: getComputedStyle(document.querySelector('#galTrack img')).opacity, hidden: document.querySelector('#sheet').hidden, cardVis: getComputedStyle(document.querySelectorAll('.kit-open img')[1]).visibility }))), errs);
}
await b.close();
