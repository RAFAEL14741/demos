import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const [,, y, out, w='390', h='844'] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const p = await b.newPage({ viewport: { width: +w, height: +h }, isMobile: +w<768, hasTouch: +w<768 });
await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(1200);
await p.evaluate(y => scrollTo(0, y), +y); await p.waitForTimeout(500);
console.log(await p.evaluate(() => scrollY));
await p.screenshot({ path: out }); await b.close();
