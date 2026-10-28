import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(1200);
for (const y of [5000, 8000, 9400]) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(400);
console.log(y, await p.evaluate(() => ({ sy: scrollY, H: document.documentElement.scrollHeight, vv: visualViewport.height, ih: innerHeight, cw: document.documentElement.clientWidth, sw: document.documentElement.scrollWidth, scale: visualViewport.scale }))); }
await b.close();
