import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
for (const w of [320, 375, 390, 768, 1024, 1440, 1920]) { const p = await b.newPage({ viewport: { width: w, height: 800 }, isMobile: w < 768, hasTouch: w < 768 });
  await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(500);
  const r = await p.evaluate((W) => ({ sw: document.documentElement.scrollWidth - W, iw: innerWidth - W,
    edge: [...document.querySelectorAll('body *')].filter(e => { const rc = e.getBoundingClientRect(); return rc.width && (rc.right > innerWidth + .5 || rc.left < -.5) && !e.closest('.drawer,.skip,[hidden],.hero-media,.rail,.swipe,.chips,.svc-list,.callbar,.tiers-grid,svg') && getComputedStyle(e).position !== 'fixed'; }).map(e => e.tagName + '.' + e.className) }), w);
  console.log(w, JSON.stringify(r)); await p.close(); }
await b.close();
