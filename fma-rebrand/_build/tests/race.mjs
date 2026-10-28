import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(800);
await p.evaluate(() => document.querySelector('#kitGrid').scrollIntoView()); await p.waitForTimeout(500);
await p.click('.kit-open[data-k="0"]'); await p.waitForTimeout(500);
await p.keyboard.press('Escape'); await p.waitForTimeout(100);          // reopen inside the 320ms hide window
await p.evaluate(() => document.querySelector('.kit-open[data-k="2"]').click()); await p.waitForTimeout(700);
console.log('reopen', await p.evaluate(() => ({ hidden: document.querySelector('#sheet').hidden, name: document.querySelector('#sheetName').textContent, inert: document.querySelector('main').inert })));
// arrow keys in the area select must not move the gallery
await p.focus('#spArea'); const before = await p.textContent('#galCount'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(600);
console.log('count before/after', before, await p.textContent('#galCount'), 'errs', JSON.stringify(errs)); await b.close();
