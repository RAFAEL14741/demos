import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
import fs from 'fs';
const [,, name, w, h, mob] = process.argv;
const OUT = `/home/claude/work/walk/${name}`; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, isMobile: mob === '1', hasTouch: mob === '1' });
await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(1500);
const H = await p.evaluate(() => document.documentElement.scrollHeight); let i = 0;
for (let y = 0; y < H; y += Math.round(+h * 0.85)) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(450); await p.screenshot({ path: `${OUT}/${String(i++).padStart(2, '0')}.png` }); }
console.log(name, H, i); await b.close();
