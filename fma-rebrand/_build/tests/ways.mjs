import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
for (const [w, m] of [[1440, false], [390, true]]) { const p = await b.newPage({ viewport: { width: w, height: 860 }, isMobile: m, hasTouch: m });
  await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(500);
  await p.click('.way[data-cab="Yes, I bought them"]'); await p.waitForTimeout(900);
  const r = await p.evaluate(() => ({ hash: location.hash, pressed: [...document.querySelectorAll('#wizBody .pill[aria-pressed="true"]')].map(x => x.textContent), wizTop: Math.round(document.getElementById('contact').getBoundingClientRect().top) }));
  await p.click('.tap:has-text("Kitchen cabinets")'); await p.click('#wizNext'); await p.click('.tap:has-text("All new cabinets")'); await p.click('.pill:has-text("As soon as possible")'); await p.click('#wizNext');
  await p.fill('#f-name', 'Test Person'); await p.fill('#f-phone', '2155550123'); await p.click('#wizNext'); await p.waitForTimeout(300);
  const sum = await p.evaluate(() => [...document.querySelectorAll('.summary div')].map(d => d.innerText.replace('\n', ': ')).slice(0, 2));
  console.log(w, JSON.stringify(r), JSON.stringify(sum)); await p.close(); }
await b.close();
