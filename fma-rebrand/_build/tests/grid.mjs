import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
import fs from 'fs';
const [,, tag, w, h, mob] = process.argv;
const OUT = `/home/claude/work/shots/${tag}`; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, isMobile: mob === '1', hasTouch: mob === '1' });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(1200);
// reveal everything: click Show all if present, then scroll through the grid so lazy images load
const more = p.locator('.more-wrap .btn'); if (await more.count() && await more.first().isVisible()) await more.first().click();
await p.waitForTimeout(300);
const box = await p.evaluate(() => { const g = document.querySelector('#kitGrid'); const r = g.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height }; });
for (let y = box.top - 200; y < box.top + box.h; y += 400) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(250); }
await p.waitForTimeout(800);
// screenshot the grid in chunks of ~1.5 viewports
const n = Math.ceil(box.h / (+h * 0.9)); 
for (let i = 0; i < n; i++) { await p.evaluate(y => scrollTo(0, y), box.top - 20 + i * +h * 0.9); await p.waitForTimeout(500); await p.screenshot({ path: `${OUT}/grid-${String(i).padStart(2, '0')}.png` }); }
console.log(tag, w, 'chunks', n, 'errs', JSON.stringify(errs)); await b.close();
