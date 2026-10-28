import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
import fs from 'fs';
const [,, tag, w, h, mob, ...idx] = process.argv;
const OUT = `/home/claude/work/shots/${tag}`; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, isMobile: mob === '1', hasTouch: mob === '1' });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(1000);
const more = p.locator('.more-wrap .btn'); if (await more.count() && await more.first().isVisible()) await more.first().click();
for (const k of idx) {
  await p.evaluate(k => document.querySelector(`.kit-open[data-k="${k}"]`).scrollIntoView({ block: 'center' }), k); await p.waitForTimeout(600);
  await p.click(`.kit-open[data-k="${k}"]`); await p.waitForTimeout(700);
  const n = +(await p.evaluate(() => document.querySelectorAll('#galTrack img').length));
  for (let i = 0; i < n; i++) {
    await p.evaluate(i => { const t = document.querySelector('#galTrack'); t.scrollTo({ left: t.clientWidth * i, behavior: 'instant' }); }, i); await p.waitForTimeout(450);
    await p.screenshot({ path: `${OUT}/k${k}-${i + 1}.png` });
  }
  const info = await p.evaluate(() => ({ name: document.querySelector('#sheetName').textContent, cred: document.querySelector('#sheetCredit').textContent, imgs: [...document.querySelectorAll('#galTrack img')].map(i => `${i.naturalWidth}x${i.naturalHeight}`) }));
  console.log(k, JSON.stringify(info)); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
}
console.log('errs', JSON.stringify(errs)); await b.close();
