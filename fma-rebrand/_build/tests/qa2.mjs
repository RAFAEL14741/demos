import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const URL = process.argv[2] || 'http://127.0.0.1:8765/fma-rebrand/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const edge = () => [...document.querySelectorAll('body *')].filter(e => { const rc = e.getBoundingClientRect(); return rc.width && (rc.right > innerWidth + 0.5 || rc.left < -0.5) && !e.closest('.drawer,.skip,[hidden]') && getComputedStyle(e).position !== 'fixed'; }).map(e => e.tagName + '.' + e.className);
for (const w of [320, 360, 375, 430, 768, 1024, 1280]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 }, isMobile: w < 768, hasTouch: w < 768 });
  await p.goto(URL, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
  console.log(w, 'pinned', await p.evaluate(() => !!window.__heroTL), 'pastEdge', JSON.stringify(await p.evaluate(edge)));
  await p.close();
}
// wizard: real clicks
const wp = await b.newPage({ viewport: { width: 1280, height: 780 } });
await wp.goto(URL + '#contact', { waitUntil: 'networkidle' }); await wp.waitForTimeout(500);
await wp.click('.tap:has-text("Kitchen cabinets")'); await wp.click('#wizNext');
await wp.click('.tap:has-text("New layout")'); await wp.click('.pill:has-text("In 1–3 months")'); await wp.click('#wizNext');
await wp.fill('#f-name', 'Test Person'); await wp.fill('#f-phone', '2155550123'); await wp.click('#wizNext');
await wp.waitForTimeout(400);
console.log('wizard done:', await wp.textContent('.done .wiz-q'));
// keyboard focus visible on hero call button
const kp = await b.newPage({ viewport: { width: 1440, height: 900 } });
await kp.goto(URL, { waitUntil: 'networkidle' });
for (let i = 0; i < 9; i++) await kp.keyboard.press('Tab');
console.log('focused:', await kp.evaluate(() => document.activeElement.className + ' | outline ' + getComputedStyle(document.activeElement).outlineStyle + ' ' + getComputedStyle(document.activeElement).outlineWidth));
await kp.screenshot({ path: '/home/claude/work/shots/focus.png', clip: { x: 0, y: 500, width: 720, height: 300 } });
await b.close();
