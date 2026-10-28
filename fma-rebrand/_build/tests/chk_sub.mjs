import { chromium } from '/home/claude/work/npm/node_modules/playwright/index.mjs';
import fs from 'fs';
const R='/home/claude/demos/fma-rebrand/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
const pages = ['custom-kitchen-islands-philadelphia','kitchen-cabinet-refacing-northeast-philadelphia','cabinet-installation-service-areas'];
const idx = fs.readFileSync(R+'index.html','utf8');
let bad=0;
for (const [vn,vp] of [['phone',{width:390,height:844}],['desk',{width:1440,height:900}],['tab',{width:820,height:1100}]]) {
  const ctx = await b.newContext({viewport:vp}); 
  for (const p of pages) {
    const pg = await ctx.newPage(); const errs=[];
    pg.on('pageerror',e=>errs.push(e.message)); pg.on('requestfailed',r=>errs.push('FAIL '+r.url()));
    pg.on('response',r=>{ if(r.status()>=400) errs.push(r.status()+' '+r.url()); });
    await pg.goto('http://127.0.0.1:8765/fma-rebrand/'+p+'.html',{waitUntil:'networkidle'});
    await pg.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));} });
    await pg.waitForTimeout(400);
    const r = await pg.evaluate(()=>({
      ov: document.documentElement.scrollWidth-innerWidth,
      imgs:[...document.images].map(i=>[i.complete&&i.naturalWidth>0]).flat().every(Boolean),
      nimg: document.images.length,
      h1: document.querySelectorAll('h1').length,
      robots:[...document.querySelectorAll('meta[name=robots]')].map(m=>m.content),
      ids:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((v,i,a)=>a.indexOf(v)!==i),
      links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),
      smallTap:[...document.querySelectorAll('a,button,summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.height<24)&&getComputedStyle(e).display!=='inline'}).length,
    }));
    // links check
    for (const h of new Set(r.links)) {
      if (/^(tel:|mailto:)/.test(h)) continue;
      const [f,a]=h.split('#'); const file = f||p+'.html';
      if(!fs.existsSync(R+file)){errs.push('missing file '+h);continue}
      if(a){ const src=fs.readFileSync(R+file,'utf8'); if(!src.includes(`id="${a}"`)) errs.push('missing anchor '+h); }
    }
    // faq toggle
    const sm = pg.locator('summary').first(); await sm.click(); const open = await pg.evaluate(()=>document.querySelector('details').open);
    if(!open) errs.push('faq did not open');
    if (vn==='phone') { await pg.evaluate(()=>scrollTo(0,0)); await pg.click('.burger'); const o=await pg.evaluate(()=>document.querySelector('#drawer').classList.contains('is-open')); await pg.keyboard.press('Escape'); const c=await pg.evaluate(()=>!document.querySelector('#drawer').classList.contains('is-open')); if(!o||!c) errs.push('drawer open/close '+o+c); }
    const ok = r.ov===0&&r.imgs&&r.h1===1&&r.robots.length===1&&r.ids.length===0&&!errs.length;
    if(!ok) bad++;
    console.log(vn,p.slice(0,8),ok?'OK':'ISSUE',JSON.stringify({ov:r.ov,imgs:r.imgs,n:r.nimg,h1:r.h1,robots:r.robots,dupIds:r.ids,errs}));
    await pg.close();
  }
  await ctx.close();
}
console.log('issues:',bad); await b.close();
