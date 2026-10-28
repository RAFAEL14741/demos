import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => m.type() === 'error' && console.log('CON', m.text()));
await p.goto('http://127.0.0.1:8765/fma-rebrand/'); await p.waitForTimeout(1500);
console.log('taps', await p.locator('.tap').count()); await b.close();
