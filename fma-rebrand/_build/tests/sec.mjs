import {chromium} from '/home/claude/work/npm/node_modules/playwright/index.mjs';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1243/chrome-linux64/chrome'});
for (const [n,w,h] of [['d',1440,900],['m',390,844]]){
const p=await b.newPage({viewport:{width:w,height:h}});
await p.goto('http://127.0.0.1:8765/fma-rebrand/index.html');await p.waitForTimeout(1500);
const r=await p.evaluate(()=>[...document.querySelectorAll('body>section, body>main>section, main>section, body>footer, main>div')].map(s=>[s.id||s.className.slice(0,20),Math.round(s.getBoundingClientRect().height),(s.querySelector('h2')||{}).textContent]));
console.log(n,await p.evaluate(()=>document.documentElement.scrollHeight));console.log(JSON.stringify(r));}
await b.close();
