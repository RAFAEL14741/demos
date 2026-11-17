/* ---------- images: AVIF/WebP backgrounds + lazy data-bg (speed pass, Nov 16 g) ---------- */
const lpIS=b=>`image-set(url(${b}.avif) type("image/avif"),url(${b}.webp) type("image/webp"),url(${b}.jpg) type("image/jpeg"))`;
function lpBg(el,p){const b=p.replace(/\.(jpg|webp|avif)$/,'');el.style.backgroundImage=`url(${b}.jpg)`;el.style.backgroundImage=lpIS(b)}
const lpSmall=matchMedia('(max-width:700px)').matches,lpV=s=>lpSmall?s.replace(/\.mp4$/,'-480.mp4'):s,
  lpP=s=>lpSmall?s.replace(/\.mp4$/,'-pv.mp4'):s;/* phone: 6 s silent preview loop (~320 KB); the full ad loads on Sound on / Expand */
function lpFull(v,keep){if(v.src&&!/-pv\.mp4$/.test(v.src))return;const t=keep?v.currentTime||0:0;v.src=lpV(v.dataset.src);if(t)v.addEventListener('loadedmetadata',()=>{try{v.currentTime=t}catch(e){}},{once:true})}
(()=>{const els=[...document.querySelectorAll('[data-bg]')];if(!('IntersectionObserver' in window)){els.forEach(e=>lpBg(e,e.dataset.bg));return}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){lpBg(e.target,e.target.dataset.bg);io.unobserve(e.target)}}),{rootMargin:'100% 0px'});
 els.forEach(e=>io.observe(e))})();
/* Launch Point frame I — hero, rock that travels the page, brand configurator, tweak bar */
const root=document.documentElement,sc=document.getElementById('scroll'),st=document.getElementById('stage');
const qs=new URLSearchParams(location.search),Q=qs.get('p');
const cl=v=>Math.max(0,Math.min(1,v)),ease=v=>1-Math.pow(1-v,3);
const EMBER=[.7789,.1722];           // rock centre in the launch photo (fraction of plate)
let heroP=0;
function heroEnd(){return sc.offsetTop+sc.offsetHeight-innerHeight}
function set(p){p=cl(p);heroP=p;const t=cl(p/.7);
  root.style.setProperty('--p',p.toFixed(4));root.style.setProperty('--t',t.toFixed(4));
  {const u=cl((t-.28)/.52);root.style.setProperty('--u',(u*u*(3-2*u)).toFixed(4))}
  st.classList.toggle('on',t>.5)}
function onScroll(){set(scrollY/Math.max(1,heroEnd()))}
if(Q!==null){set(parseFloat(Q))}else{addEventListener('scroll',onScroll,{passive:true});onScroll()}

/* ---------- the rock + trail ---------- */
const R=(()=>{const story=document.getElementById('story'),wrap=document.getElementById('tw-wrap'),svg=document.getElementById('trail'),
  tp=document.getElementById('tp'),tp0=document.getElementById('tp0'),tls=[...document.querySelectorAll('#trail .tl')],tcool=document.getElementById('tcool'),hots=[...document.querySelectorAll('#thot .tl')],rock=document.getElementById('rock'),fx=document.getElementById('fx');
  let L=0,PRE=0,start=[0,0],photoW=80,sparks=true,last=null,alive=0;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rs=()=>(parseFloat(getComputedStyle(root).getPropertyValue('--rs'))||60)*(story.clientWidth<640?.62:1);
  function emberPt(){const u0=root.style.getPropertyValue('--u');root.style.setProperty('--u','1');/* phone: read the END framing of the pan */
    const pl=document.querySelector('.plate').getBoundingClientRect(),sr=st.getBoundingClientRect();root.style.setProperty('--u',u0);
    const W=story.clientWidth;let x=pl.left+pl.width*EMBER[0];const y=pl.top-sr.top+pl.height*EMBER[1];
    photoW=pl.width*.0542*(W<640?.9:1);x=Math.min(Math.max(x,28),W-22);
    return [x,heroEnd()+y-story.offsetTop]}
  function build(){const W=story.clientWidth,H=story.scrollHeight,phone=W<640;
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.height=H+'px';
    const sr=story.getBoundingClientRect(),Y=el=>el.getBoundingClientRect().top-sr.top,B=el=>el.getBoundingClientRect().bottom-sr.top;
    start=emberPt();const pts=[start];
    const secs=[...story.querySelectorAll('.chap')];
    const wrapEl=story.querySelector('.in-wrap'),wr=wrapEl.getBoundingClientRect();
    const gutL=phone?W-12:Math.max(26,(wr.left-sr.left)/2),gutR=phone?W-12:W-Math.max(26,(wr.left-sr.left)/2);
    secs.forEach((s,i)=>{const side=i%2?gutL:gutR;const top=Y(s),bot=B(s);
      pts.push([side,top+(phone?40:90)],[side,bot-(phone?30:60)])});
    // phone ending: down the right edge, under the button, up into its dot (never through the headline)
    // phone ending: down the right edge, across the gap ABOVE the button, then down into its dot. y only ever grows (the rock follows y), never through the headline
    const g=document.getElementById('land').getBoundingClientRect();
    {const gb=document.getElementById('go').getBoundingClientRect(),yt=gb.top-sr.top,lx=pts[pts.length-1][0],dx=g.left-sr.left,side=lx>dx?1:-1;
     pts.push([lx,yt-(phone?40:70)],[dx+side*(phone?30:60),yt-16])}
    pts.push([g.left-sr.left+5,g.top-sr.top+5]);
    // start back on the photo's arc (it fades where the rock was painted out) and leave along its direction, so the streak continues instead of turning a corner
    const arc=true,AD=[.96,-.27],pre=photoW*.9,P0=[start[0]-AD[0]*pre,start[1]-AD[1]*pre-photoW*.27];PRE=arc?Math.hypot(start[0]-P0[0],start[1]-P0[1]):0;
    let d=arc?`M${P0[0]},${P0[1]} L${start[0]},${start[1]}`:`M${start[0]},${start[1]}`;
    for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i],dy=(y1-y0)*.5;
      d+=i===1&&arc?` C${Math.min(W-14,x0+Math.min(phone?90:200,Math.abs(x1-x0)+60))},${y0} ${x1},${y1-dy} ${x1},${y1}`:` C${x0},${y0+dy} ${x1},${y1-dy} ${x1},${y1}`}
    tp.setAttribute('d',d);tp0.setAttribute('d',d);tls.forEach(p=>p.setAttribute('d',d));L=tp.getTotalLength();tcool.style.strokeDasharray=L;last=null;update()}
  function at(y){let a=0,b=L;for(let i=0;i<24;i++){const m=(a+b)/2;if(tp.getPointAtLength(m).y<y)a=m;else b=m}return a}
  function spark(x,y,ang){if(!sparks||reduce||alive>28)return;alive++;const s=document.createElement('i');s.className='spark';fx.appendChild(s);
    const back=ang+Math.PI+(Math.random()-.5)*1.1,dist=18+Math.random()*46;
    const a=s.animate([{transform:`translate(${x}px,${y}px) scale(1)`,opacity:1},{transform:`translate(${x+Math.cos(back)*dist}px,${y+Math.sin(back)*dist+14}px) scale(.3)`,opacity:0}],
      {duration:600+Math.random()*500,easing:'cubic-bezier(.22,1,.36,1)'});a.onfinish=()=>{s.remove();alive--}}
  function update(){if(!L)return;const hE=heroEnd(),off=Math.max(0,hE-scrollY);
    wrap.style.transform=`translateY(${-off}px)`;
    const k=Q!==null&&heroP<1?ease(cl((heroP-.74)/.26)):ease(cl((scrollY/Math.max(1,hE)-.74)/.26));
    const anchor=Math.max(scrollY,hE)+innerHeight*.58-story.offsetTop;
    const target=start[1]+(anchor-start[1])*k;
    let l=k<=0?0:Math.max(PRE,Math.min(L,at(target)));
    if(k>=1&&scrollY>=document.documentElement.scrollHeight-innerHeight-4)l=L; // bottom of the page = landed
    tcool.style.strokeDashoffset=L-l;const HOT=Math.min(560,innerHeight*.62);
    hots.forEach(p=>{const h=Math.min(l,HOT*+p.dataset.f);p.style.strokeDasharray=`${h} ${L+h}`;p.style.strokeDashoffset=h-l});
    const pt=tp.getPointAtLength(l),p2=tp.getPointAtLength(Math.min(L,l+2)),ang=Math.atan2(p2.y-pt.y,p2.x-pt.x);
    const size=photoW+(rs()-photoW)*cl(k*1.6);
    rock.style.width=size+'px';
    rock.style.transform=`translate(${pt.x-size/2}px,${pt.y-size*186/208/2}px) rotate(${(l*.12)%360}deg)`;
    const gone=k>0.002;st.classList.toggle('gone',gone);tp0.style.opacity=gone?1:0;rock.style.opacity=gone&&l<L-4?1:0;
    if(gone&&last){const dx=pt.x-last[0],dy=pt.y-last[1];if(dx*dx+dy*dy>36){spark(pt.x,pt.y,ang);if(dx*dx+dy*dy>400)spark(pt.x,pt.y,ang)}}
    last=[pt.x,pt.y];
    document.getElementById('end').classList.toggle('lit',l>=L-4)}
  let tick=0;addEventListener('scroll',()=>{if(!tick)tick=requestAnimationFrame(()=>{tick=0;update()})},{passive:true});addEventListener('resize',()=>{clearTimeout(R._t);R._t=setTimeout(build,120)});
  document.fonts.ready.then(build);addEventListener('load',build);
  return {build,update,setSparks:v=>sparks=v}})();

/* ---------- 01 brand configurator ---------- */
/* ---------- photo mockups (I9): plate per kind+colour from mock.js, live ink warped on with matrix3d ---------- */
const lpMock=(()=>{const D=window.LP_MOCK=window.LP_MOCK||{},SC={'t-card':'card','t-sign':'sign','t-merch':'merch','t-ig':'phone','t-web':'laptop'};
 const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
 function near(b){const c=hx(b);let bi=0,bd=1e9;(window.LP_COLS||[]).forEach(([,h],i)=>{const d=hx(h).reduce((a,v,k)=>a+(v-c[k])**2,0);if(d<bd){bd=d;bi=i}});return bi}
 function m3d(w,h,q){const[[x0,y0],[x1,y1],[x2,y2],[x3,y3]]=q,dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1,
   g=(dx3*dy2-dx2*dy3)/den,k=(dx1*dy3-dx3*dy1)/den,a=x1-x0+g*x1,b=x3-x0+k*x3,d=y1-y0+g*y1,e=y3-y0+k*y3;
   return `matrix3d(${a/w},${d/w},0,${g/w},${b/h},${e/h},0,${k/h},0,0,1,0,${x0},${y0},0,1)`}
 const L=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1]),ratio=q=>(L(q[0],q[3])+L(q[1],q[2]))/(L(q[0],q[1])+L(q[3],q[2]));
 const src=k=>'img/mock/'+k;let armed=false,last=null;const warm=new Set(),got=new Set();
 /* plates are split per kind (mock-<kind>.js, ~1.5 KB gz each): load a kind's file when the configurator is near or the kind changes, then re-sync */
 function need(kind,then){if(got.has(kind)){then&&then();return}got.add(kind);const s=document.createElement('script');s.src='mock-'+kind+'.js';s.onload=()=>{then&&then();if(armed&&last)sync(...last)};document.head.appendChild(s)}
 function warmKey(kind,ci){if(!got.has(kind)){need(kind,()=>warmKey(kind,ci));return}Object.values(SC).forEach(sc=>{const k=`${kind}-${ci}-${sc}`;if(D[k]&&!warm.has(k)){warm.add(k);const i=new Image();i.src=src(k)+'.webp'}})}
 function layout(t){const st=t.querySelector('.pst');if(!st||!st._d||!t.classList.contains('ph'))return;const d=st._d,W=t.clientWidth,H=t.clientHeight,s=Math.max(W/d.w,H/d.h);
   const ox=Math.min(0,Math.max(W-d.w*s,W/2-d.f[0]*d.w*s)),oy=Math.min(0,Math.max(H-d.h*s,H/2-d.f[1]*d.h*s));
   st.style.width=d.w+'px';st.style.height=d.h+'px';st.style.transform=`translate(${ox}px,${oy}px) scale(${s})`}
 function sync(S,p){last=[S,p];if(!armed)return;need(S.kind);const lb=hx(p.b).map(v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4}),lum=.2126*lb[0]+.7152*lb[1]+.0722*lb[2];
   document.getElementById('out').style.setProperty('--sk',lum>.42?'#1C1A17':p.b);const ci=S.col==='custom'?near(p.b):S.col;
   document.querySelectorAll('#out .tile').forEach(t=>{const c=Object.keys(SC).find(c=>t.classList.contains(c));if(!c)return;const key=`${S.kind}-${ci}-${SC[c]}`,d=D[key];
     t.classList.toggle('ph',!!d);const cap=t.querySelector('.cap[data-phc]');if(cap){cap.dataset.org=cap.dataset.org||cap.textContent;cap.textContent=d?cap.dataset.phc:cap.dataset.org}if(!d)return;const st=t.querySelector('.pst');
     if(st.dataset.k!==key){st.dataset.k=key;st._d=d;st.querySelector('source').srcset=src(key)+'.webp';st.querySelector('img').src=src(key)+'.webp';
       st.querySelectorAll('.ink').forEach(ink=>{let q=d.q[ink.dataset.q];ink.hidden=!q;if(!q)return;const w=+ink.dataset.w,h=Math.round(w*ratio(q));if(ink.classList.contains('ink-scr')){const cx=q.reduce((a,p)=>a+p[0],0)/4,cy=q.reduce((a,p)=>a+p[1],0)/4;q=q.map(([x,y])=>[cx+(x-cx)*1.012,cy+(y-cy)*1.012])}
         ink.style.width=w+'px';ink.style.height=h+'px';ink.style.transform=m3d(w,h,q)})}
     layout(t)})}
 const out=document.getElementById('out');
 if(out){new ResizeObserver(es=>es.forEach(e=>layout(e.target))).observe(out);out.querySelectorAll('.tile').forEach(t=>new ResizeObserver(()=>layout(t)).observe(t));
  new IntersectionObserver((es,io)=>{if(es.some(e=>e.isIntersecting)){armed=true;io.disconnect();if(last){typeof CFG!=='undefined'?CFG.render(false):sync(...last)}}},{rootMargin:'100% 0px'}).observe(out)}
 return {sync,warmKey,near}})();
const CFG=(()=>{
  /* marks = MARKS from marks.js (local-AI concepts, traced to vectors). Names: fictional sample brands. */
  const KINDS={
    cafe:{names:[['Corvo','Coffee Bar'],['Marlo','Coffee House'],['Saltwood','Café & Bakery']],nav:['Menu','Visit'],cta:'Order ahead',tag:{bold:'Strong coffee. No small talk.',warm:'Your corner table is waiting.',calm:'Slow mornings, done right.',play:'Stay for the croissant.'}},
    barber:{names:[['Hale & Co.','Barbers'],['Ironside','Barber Shop'],['Sterling','Barber Club']],nav:['Services','Team'],cta:'Book a cut',tag:{bold:'Sharp cuts. Every time.',warm:'Pull up a chair, we got you.',calm:'A clean cut, no rush.',play:'Fresh cut, fresh start.'}},
    studio:{names:[['Still','Pilates Studio'],['Nova','Pilates'],['Arc','Reformer Studio']],nav:['Classes','Studio'],cta:'Book a class',tag:{bold:'Stronger in fifty minutes.',warm:'Move well, feel at home.',calm:'Breathe in. Move slow.',play:'Wobbly first class? Welcome.'}},
    grill:{names:[['Brasa','Wood-fire Grill'],['Ember & Oak','Kitchen'],['Salt & Coal','Grill House']],nav:['Menu','Visit'],cta:'Reserve',tag:{bold:'Fire, meat, nothing else.',warm:'Sunday lunch, every day.',calm:'Good food, take your time.',play:'Come hungry. Leave happy.'}},
    salon:{names:[['Lumi','Hair Studio'],['Muse','Salon'],['Velvet','Hair & Colour']],nav:['Services','Gallery'],cta:'Book now',tag:{bold:'Colour that turns heads.',warm:'Your hour, just for you.',calm:'Quiet chair, good hands.',play:'Every day is a hair day.'}},
    gym:{names:[['Iron Yard','Strength Club'],['Forge','Training Co.'],['Atlas','Gym']],nav:['Classes','Coaches'],cta:'Join',tag:{bold:'Show up. Lift heavy.',warm:'Stronger, together.',calm:'Train well. Rest well.',play:'Leg day is every day.'}}};
  for(const k in KINDS)KINDS[k].marks=Object.keys(MARKS).filter(id=>MARKS[id].kind===k);
  const COLS=[['Cobalt','#2A47C4'],['Forest','#1F5A43'],['Oxblood','#7A1F2A'],['Saffron','#E2A426'],['Rose','#E07A93'],['Plum','#5B2A6E'],['Teal','#0F7C7A'],['Coral','#F0623F'],['Sky','#7FB2EC'],['Ink','#18181C']];
  const TYPES={classic:{f:'Serif',w:400,ls:'-.01em',tt:'none',sz:1.08},elegant:{f:'Corm',w:500,ls:'.01em',tt:'none',sz:1.12},soft:{f:'Fraunces',w:600,ls:'-.02em',tt:'none',sz:.95},
    loud:{f:'Archivo',w:400,ls:'-.02em',tt:'none',sz:.86},modern:{f:'Syne',w:700,ls:'-.01em',tt:'none',sz:.92},tech:{f:'Mono',w:500,ls:'.03em',tt:'uppercase',sz:.82}};
  window.LP_COLS=COLS;
  const S={name:'Corvo',desc:'Coffee Bar',ni:0,kind:'cafe',mark:'sym',col:0,custom:'#2A47C4',gr:'light',type:'classic',voice:'warm',named:false,icon:KINDS.cafe.marks[0],shape:'circle',cs:'as',acc:'same',customAcc:'#D9A441',sp:'normal',cor:'soft',tagOwn:''};
  const ACC=[['Same as main','same'],['Gold','#D9A441'],['Lime','#C6F23D'],['Coral','#F0623F'],['Sky','#7FB2EC'],['Rose','#E07A93'],['Cream','#F3E9D6'],['Ink','#18181C']];
  const box=document.getElementById('cfg'),out=document.getElementById('out'),brand=document.getElementById('brand'),nameI=document.getElementById('c-name');
  const swW=box.querySelector('[data-k=col]');
  COLS.forEach(([n,c],i)=>{const b=document.createElement('button');b.type='button';b.style.background=c;b.dataset.v=i;b.title=n;b.setAttribute('aria-label',n);swW.appendChild(b)});
  swW.addEventListener('pointerover',e=>{const b=e.target.closest('button');if(b&&b.dataset.v!=null)lpMock.warmKey(S.kind,+b.dataset.v)});
  box.querySelector('[data-k=kind]').addEventListener('pointerover',e=>{const b=e.target.closest('button');if(b)lpMock.warmKey(b.dataset.v,S.col==='custom'?lpMock.near(S.custom):S.col)});
  const acW=box.querySelector('[data-k=acc]');
  ACC.forEach(([n,c])=>{const b=document.createElement('button');b.type='button';b.dataset.v=c;b.title=n;b.setAttribute('aria-label',n);b.style.background=c==='same'?'conic-gradient(var(--bone2) 0 50%,transparent 0) , #2A2622':c;if(c==='same')b.innerHTML='<svg viewBox="0 0 30 30" style="width:100%;height:100%"><path d="M8 22L22 8" stroke="#EDE6DA" stroke-width="1.5"/></svg>',b.style.background='#2A2622';acW.appendChild(b)});
  const cusA=document.createElement('label');cusA.className='cus';cusA.title='Any accent';cusA.dataset.v='customA';cusA.innerHTML='<input type="color" value="#D9A441" aria-label="Pick any accent colour">';acW.appendChild(cusA);const cusAI=cusA.querySelector('input');
  cusAI.addEventListener('input',()=>{S.acc='customA';S.customAcc=cusAI.value;render(false)});cusA.addEventListener('click',()=>{if(S.acc!=='customA'){S.acc='customA';S.customAcc=cusAI.value;render(false)}});
  const icW=box.querySelector('[data-k=icon]');
  function icons(){icW.innerHTML=KINDS[S.kind].marks.map(id=>`<button type="button" data-v="${id}" title="${MARKS[id].n}" aria-label="${MARKS[id].n}">${msvg(id)}</button>`).join('')}
  box.querySelector('.ctabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;box.querySelectorAll('.ctabs button').forEach(x=>x.setAttribute('aria-selected',String(x===b)));box.querySelectorAll('.pane').forEach(p=>p.hidden=p.dataset.p!==b.dataset.p)});
  const tagI=document.getElementById('c-tag');tagI.addEventListener('input',()=>{S.tagOwn=tagI.value;render(false)});
  const cus=document.createElement('label');cus.className='cus';cus.title='Any colour';cus.dataset.v='custom';
  cus.innerHTML='<input type="color" value="#2A47C4" aria-label="Pick any colour">';swW.appendChild(cus);const cusI=cus.querySelector('input');
  /* colour maths */
  const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),toH=a=>'#'+a.map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('');
  const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return toH(A.map((v,i)=>v+(B[i]-v)*t))};
  const lum=h=>{const [r,g,b]=hx(h).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
  function palette(){const b=S.col==='custom'?S.custom:COLS[S.col][1],L=lum(b),bi=L>.36?'#16130F':'#FBF8F3';let g,ik,m;
    if(S.gr==='light'){g=mix(b,'#FFFFFF',.9);ik=mix(b,'#0B0A09',.82);m=L>.45?mix(b,'#000000',.38):b}
    else if(S.gr==='dark'){g=mix(b,'#0D0C0B',.88);ik='#F3EEE6';m=L<.06?mix(b,'#FFFFFF',.82):L<.16?mix(b,'#FFFFFF',.42):b}
    else{g=b;ik=bi;m=bi}
    const f=S.gr==='brand'?bi:b,fi=S.gr==='brand'?b:bi;
    let a=f,ai=fi,an='Same as main';if(S.acc!=='same'){a=S.acc==='customA'?S.customAcc:S.acc;ai=lum(a)>.36?'#16130F':'#FBF8F3';an=S.acc==='customA'?'Your accent':ACC.find(x=>x[1]===S.acc)[0]}
    return {b,bi,g,ik,m,f,fi,a,ai,an,n:S.col==='custom'?'Your colour':COLS[S.col][0]}}
  const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const nm=()=>S.name.trim()||'Your name';
  const words=()=>nm().split(/\s+/).filter(w=>/^[\p{L}\p{N}]/u.test(w));
  const initials=()=>{const w=words();return ((w[0]||'Y')[0]+(w[1]?w[1][0]:'')).toUpperCase()};
  const dsc=()=>S.desc.trim();
  let uid=0;
  const msvg=(id,cls)=>MARKS[id]?`<svg class="${cls||'sym'}" viewBox="0 0 100 100" aria-hidden="true"><path fill-rule="evenodd" fill="currentColor" d="${MARKS[id].d}"/></svg>`:'';
  /* I13 premium controls: kind tiles show that kind's first mark; sliding tab thumb; voice fonts only once the configurator is near (keeps first load lean) */
  box.querySelectorAll('[data-k=kind] button').forEach(b=>{const id=(KINDS[b.dataset.v]||{marks:[]}).marks[0];if(id&&!b.querySelector('svg'))b.insertAdjacentHTML('afterbegin',msvg(id,'kt'))});
  {const ct=box.querySelector('.ctabs'),th=document.createElement('i');th.className='ct-thumb';th.setAttribute('aria-hidden','true');ct.prepend(th);ct.classList.add('has-th');
   const mv=()=>{const s=ct.querySelector('[aria-selected=true]');if(!s||!s.offsetWidth)return;th.style.width=s.offsetWidth+'px';th.style.transform=`translateX(${s.offsetLeft}px)`};
   mv();requestAnimationFrame(()=>th.classList.add('go'));ct.addEventListener('click',()=>requestAnimationFrame(mv));new ResizeObserver(mv).observe(ct)}
  new IntersectionObserver((es,io)=>{if(es.some(e=>e.isIntersecting)){box.classList.add('vf');io.disconnect()}},{rootMargin:'100% 0px'}).observe(box);
  const tyStyle=()=>{const ty=TYPES[S.type];return `font-family:${ty.f};font-weight:${ty.w}`};
  /* interlocked monogram: 2nd letter cuts through the 1st with a knock-out stroke in the ground colour (--kn) */
  function mono(cls){const ini=initials(),st=tyStyle();
    if(ini.length<2)return `<svg class="${cls||'mg'}" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width=".8"/><text x="50" y="50" dy=".35em" text-anchor="middle" font-size="50" fill="currentColor" style="${st}">${esc(ini)}</text></svg>`;
    return `<svg class="${cls||'mg'}" viewBox="0 0 100 100" aria-hidden="true"><text x="37" y="50" dy=".35em" text-anchor="middle" font-size="64" fill="currentColor" style="${st}">${esc(ini[0])}</text><text x="63" y="50" dy=".35em" text-anchor="middle" font-size="64" fill="currentColor" stroke="var(--kn)" stroke-width="5" paint-order="stroke" style="${st}">${esc(ini[1])}</text></svg>`}
  function crest(){const st=tyStyle(),id='cr'+(++uid);const top=esc(nm().toUpperCase()),bot=esc(dsc().toUpperCase());
    const fs=Math.min(12.5,150/Math.max(6,top.length)),fb=Math.min(8,120/Math.max(6,bot.length));
    return `<svg class="crest" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="${id}a" d="M19,60 a41,41 0 1,1 82,0"/><path id="${id}b" d="M13,60 a47,47 0 0,0 94,0"/></defs>
      <circle cx="60" cy="60" r="57.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" stroke-width=".9"/>
      <circle cx="10" cy="60" r="1.8" fill="currentColor"/><circle cx="110" cy="60" r="1.8" fill="currentColor"/>
      <text fill="currentColor" style="${st}" font-size="${fs}" letter-spacing="1.6"><textPath href="#${id}a" startOffset="50%" text-anchor="middle">${top}</textPath></text>
      <text fill="currentColor" style="font-family:Hanken;font-weight:600" font-size="${fb}" letter-spacing="2.4"><textPath href="#${id}b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">${bot}</textPath></text>
      <svg x="42" y="42" width="36" height="36" viewBox="0 0 100 100"><path fill-rule="evenodd" fill="currentColor" d="${(MARKS[S.icon]||{}).d||''}"/></svg></svg>`}
  function full(small){const n=esc(nm()),d=dsc()?`<span class="ds">${esc(dsc())}</span>`:'';
    if(small&&S.mark==='crest')return `<div class="mark lk-row">${msvg(S.icon)}<span class="nm"><span class="wm">${n}</span>${d}</span></div>`;
    if(S.mark==='sym')return `<div class="mark lk-row">${msvg(S.icon)}<span class="nm"><span class="wm">${n}</span>${d}</span></div>`;
    if(S.mark==='stack')return `<div class="mark lk-stack">${msvg(S.icon)}<span class="wm">${n}</span>${d}</div>`;
    if(S.mark==='mono')return `<div class="mark lk-row">${mono()}<span class="nm"><span class="wm">${n}</span>${d}</span></div>`;
    if(S.mark==='crest')return `<div class="mark lk-crest">${crest()}</div>`;
    return `<div class="mark lk-word"><span class="wm">${n}</span>${d}</div>`}
  function icon(){if(S.mark==='mono'||S.mark==='word')return mono('mg');return msvg(S.icon)}
  function fit(){out.querySelectorAll('.mark').forEach(m=>{m.style.fontSize='';const box=m.closest('.ink,.board,.bcard,.wb-nav,.tile');
    const max=(box.offsetWidth||300)*(box.classList.contains('ink')?.84:box.classList.contains('tile')?.84:box.classList.contains('wb-nav')?.42:.92),maxH=box.classList.contains('wb-nav')?28:box.classList.contains('ink')?box.offsetHeight*(+box.dataset.mh||.84):1e9;let i=0;
    while((m.scrollWidth>max||m.offsetHeight>maxH)&&i<30){m.style.fontSize=(parseFloat(getComputedStyle(m).fontSize)*.93)+'px';i++}})}
  addEventListener('resize',()=>fit());
  function render(anim){const p=palette(),ty=TYPES[S.type],k=KINDS[S.kind];
    if(icW.dataset.kind!==S.kind){icons();icW.dataset.kind=S.kind}if(!MARKS[S.icon]||MARKS[S.icon].kind!==S.kind)S.icon=k.marks[0];
    for(const v of['b','bi','g','ik','m','f','fi','a','ai'])out.style.setProperty('--'+v,p[v]);brand.style.setProperty('--bc',p.b);
    document.getElementById('c-cn').textContent=p.n;document.getElementById('c-an').textContent=p.an;
    out.style.setProperty('--shp',{circle:'50%',round:'28%',square:'8%'}[S.shape]);
    const C={sharp:['2px','2px','4px'],soft:['8px','10px','12px'],round:['99px','20px','16px']}[S.cor];out.style.setProperty('--rb',C[0]);out.style.setProperty('--rc',C[1]);out.style.setProperty('--rc2',C[2]);
    const draw=()=>{lpMock.sync(S,p);
      out.querySelectorAll('[data-slot]').forEach(el=>{const s=el.dataset.slot;
        if(s==='full')el.innerHTML=full(!!el.closest('.wb-nav,.board,.ik-sign'));else if(s.startsWith('icon'))el.innerHTML=icon();
        else if(s==='tag')el.textContent=S.tagOwn.trim()||k.tag[S.voice];else if(s==='name')el.textContent=nm();
        else if(s==='handle')el.textContent='@'+((words().length>1?nm():nm()+(dsc().split(/\s+/)[0]||'')).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'')||'yourname');
        else if(s==='cta')el.textContent=k.cta;else if(s==='nav1')el.textContent=k.nav[0];else if(s==='nav2')el.textContent=k.nav[1]});
      const LS={tight:'-.05em',normal:ty.ls,wide:'.14em'}[S.sp],TT=S.cs==='up'?'uppercase':S.cs==='low'?'lowercase':ty.tt;
      out.querySelectorAll('.wm,.ig-nm').forEach(el=>{el.style.fontFamily=ty.f;el.style.fontWeight=ty.w;el.style.letterSpacing=LS;el.style.textTransform=TT});
      out.querySelectorAll('.wb-h').forEach(el=>{el.style.fontFamily=ty.f;el.style.fontWeight=ty.w;el.style.letterSpacing=ty.ls;el.style.textTransform=ty.tt});
      out.querySelectorAll('.wm').forEach(el=>el.style.fontSize=ty.sz+'em');
      out.querySelectorAll('.tl,.ig-bio,.q2').forEach(el=>{const disp=S.type==='classic'||S.type==='elegant'||S.type==='soft';el.style.fontFamily=disp?ty.f:'Hanken';el.style.fontWeight=disp?ty.w:400;el.style.fontSize=disp?'1.1em':''});
      fit();out.classList.remove('fading')};
    if(anim){out.classList.add('fading');clearTimeout(render._t);render._t=setTimeout(draw,200)}else draw();
    box.querySelectorAll('[data-k]').forEach(g=>g.querySelectorAll('button,.cus').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v==String(S[g.dataset.k])||(g.dataset.k==='col'&&b.dataset.v==='custom'&&S.col==='custom')||(g.dataset.k==='acc'&&b.dataset.v==='customA'&&S.acc==='customA')))))}
  box.addEventListener('click',e=>{const b=e.target.closest('[data-k] button');if(!b)return;const k=b.closest('[data-k]').dataset.k;
    const v=k==='col'?+b.dataset.v:b.dataset.v;if(S[k]===v)return;S[k]=v;
    if(k==='kind'){S.icon=KINDS[v].marks[0];icons();if(!S.named){[S.name,S.desc]=KINDS[v].names[0];S.ni=0;nameI.value=S.name;descI.value=S.desc}}
    render(!['col','gr','acc','shape','cor'].includes(k))});
  cusI.addEventListener('input',()=>{S.col='custom';S.custom=cusI.value;render(false)});
  cus.addEventListener('click',()=>{if(S.col!=='custom'){S.col='custom';S.custom=cusI.value;render(false)}});
  nameI.addEventListener('input',()=>{S.name=nameI.value;S.named=true;render(false)});
  const descI=document.getElementById('c-desc');descI.addEventListener('input',()=>{S.desc=descI.value;S.named=true;render(false)});
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  document.getElementById('c-shuf').addEventListener('click',e=>{e.preventDefault();
    const kind=pick(Object.keys(KINDS).filter(x=>x!==S.kind)),K=KINDS[kind],ni=Math.floor(Math.random()*K.names.length);
    Object.assign(S,{kind,name:K.names[ni][0],desc:K.names[ni][1],ni,named:false,mark:pick(['sym','sym','stack','mono','word','crest']),
      col:Math.floor(Math.random()*COLS.length),gr:pick(['light','light','dark','brand']),type:pick(Object.keys(TYPES)),voice:pick(['bold','warm','calm','play']),
      icon:pick(K.marks),shape:pick(['circle','round','square']),cs:pick(['as','as','up']),acc:pick(['same','same',...ACC.slice(1,6).map(x=>x[1])]),sp:pick(['normal','normal','tight','wide']),cor:pick(['sharp','soft','round']),tagOwn:''});tagI.value='';
    nameI.value=S.name;descI.value=S.desc;icons();render(true)});
  icons();
  document.fonts.ready.then(()=>fit());
  render(false);return {S,render,msvg}})();

/* ---------- tweak bar (design preview only) ---------- */
(()=>{const D={look:'a',pool:100,tex:55,rs:60,spark:'1',ember:'#CF5A1E',hs:100,top:13,len:240};
 let S={...D};try{Object.assign(S,JSON.parse(localStorage.getItem('lp-tw-i')||'{}'))}catch(e){}
 const lk=qs.get('look');if(lk)S.look=lk;
 const $=id=>document.getElementById(id);
 function apply(){const r=root.style;document.body.className='look-'+S.look;
  r.setProperty('--pool',S.pool/100);r.setProperty('--tex',S.tex/100);r.setProperty('--rs',S.rs+'px');r.setProperty('--ember',S.ember);
  r.setProperty('--hs',S.hs/100);r.setProperty('--top',S.top+'vh');sc.style.height=S.len+'vh';R.setSparks(S.spark==='1');
  for(const k of['pool','tex','rs','hs','top','len']){$('t-'+k).value=S[k];$('v-'+k).textContent=S[k]+(k==='len'||k==='top'?'vh':k==='rs'?'px':'%')}
  for(const g of['look','spark','ember'])$('t-'+g).querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===S[g]));
  try{localStorage.setItem('lp-tw-i',JSON.stringify(S))}catch(e){} if(Q===null)onScroll(); R.build()}
 for(const k of['pool','tex','rs','hs','top','len'])$('t-'+k).addEventListener('input',e=>{S[k]=+e.target.value;apply()});
 for(const g of['look','spark','ember'])$('t-'+g).addEventListener('click',e=>{const b=e.target.closest('button');if(b){S[g]=b.dataset.v;apply()}});
 const pan=$('tw');$('tw-btn').onclick=()=>pan.classList.toggle('open');$('tw-x').onclick=()=>pan.classList.remove('open');
 $('tw-reset').onclick=()=>{S={...D};apply()};
 $('tw-copy').onclick=async()=>{const t=JSON.stringify(S);try{await navigator.clipboard.writeText(t);$('tw-msg').textContent='Copied. Paste it in the chat.'}catch(e){$('tw-msg').textContent=t}};
 apply()})();

/* ---------- 02 websites: scroll-through previews ---------- */
(()=>{const coarse=matchMedia('(hover: none)').matches;
 document.querySelectorAll('.site[data-strip]').forEach(card=>{const shot=card.querySelector('.shot'),st=card.querySelector('.strip');let on=false;
  const run=()=>{if(!on)return;const d=st.offsetHeight-shot.clientHeight;if(d<=0)return;st.style.transition=`transform ${Math.max(5,d/220).toFixed(1)}s linear`;st.style.transform=`translateY(${-d}px)`};
  const go=()=>{on=true;if(!st.src){st.onload=()=>{st.classList.add('ok');requestAnimationFrame(run)};st.src=card.dataset.strip}else run()};
  const back=()=>{on=false;st.style.transition='transform .9s cubic-bezier(.22,1,.36,1)';st.style.transform='translateY(0)'};
  card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')go()});card.addEventListener('pointerleave',back);
  card.addEventListener('focus',go);card.addEventListener('blur',back);
  if(coarse){new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.intersectionRatio>.6?go():back()),{threshold:[0,.6]}).observe(card)}})})();

/* ---------- 03 social: type filter + post lightbox ---------- */
(()=>{const grid=document.getElementById('iggrid'),types=document.getElementById('types'),lb=document.getElementById('lb');if(!grid)return;
 const WHY={};types.querySelectorAll('button').forEach(b=>WHY[b.dataset.t]=b.querySelector('b').textContent+': '+b.querySelector('span').textContent);
 let cur=null;
 types.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const t=cur===b.dataset.t?null:b.dataset.t;cur=t;
  types.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.t===t)));
  {const w=document.getElementById('lp-why');if(w){if(!w.dataset.d)w.dataset.d=w.textContent;w.textContent=t?b.querySelector('span').textContent:w.dataset.d}}
  grid.classList.toggle('filt',!!t);grid.querySelectorAll('.post').forEach(p=>p.classList.toggle('hit',p.dataset.t===t))});
 types.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));
 const SLIDES=[null,'<span class="t">No water<br>needed<span class="d">.</span></span><span class="cnt">2/4</span>','<span class="t">Fits in<br>a sock<span class="d">.</span></span><span class="cnt">3/4</span>','split'];
 const box=document.getElementById('lbpost'),nav=lb.querySelector('.lbnav'),dots=document.getElementById('lbdots');let src=null,i=0;
 function show(){box.innerHTML='';let el;
  if(src.dataset.t==='carousel'&&i>0){if(SLIDES[i]==='split'){el=grid.querySelector('.p-split').cloneNode(true);el.insertAdjacentHTML('beforeend','<span class="cnt">4/4</span>')}
   else{el=src.cloneNode(false);el.className='post p-car p-slide s'+(i+1);lpBg(el,`img/social/${i===1?'packb':'pack'}`);el.innerHTML=SLIDES[i]}}
  else el=src.cloneNode(true);
  el.removeAttribute('aria-label');el.tabIndex=-1;box.appendChild(el);
  dots.innerHTML=src.dataset.t==='carousel'?SLIDES.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join(''):'';nav.classList.toggle('on',src.dataset.t==='carousel')}
 grid.addEventListener('click',e=>{const p=e.target.closest('.post');if(!p)return;src=p;i=0;
  document.getElementById('lbcap').textContent=p.dataset.cap;document.getElementById('lbwhy').textContent=WHY[p.dataset.t]||'';show();
  try{lb.showModal()}catch(err){lb.setAttribute('open','')}});
 const step=d=>{i=(i+d+SLIDES.length)%SLIDES.length;show()};
 document.getElementById('lbn').onclick=()=>step(1);document.getElementById('lbp').onclick=()=>step(-1);
 lb.querySelector('.lbx').onclick=()=>lb.close();lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
 lb.addEventListener('keydown',e=>{if(src&&src.dataset.t==='carousel'){if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)}});
 let x0=null;box.addEventListener('pointerdown',e=>x0=e.clientX);box.addEventListener('pointerup',e=>{if(x0!==null&&src&&src.dataset.t==='carousel'&&Math.abs(e.clientX-x0)>40)step(e.clientX<x0?1:-1);x0=null});})();

/* ---------- 04 ads: lazy autoplay video + Google ad from the configurator brand ---------- */
(()=>{const v=document.getElementById('adv'),snd=document.getElementById('snd');if(!v)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(v.dataset.poster&&!v.poster)v.poster=v.dataset.poster;if(!v.src)v.src=lpP(v.dataset.src);if(!reduce)v.play().catch(()=>{})}else v.pause()}),{threshold:.35}).observe(v);
 const ADS=[{src:'img/ads/halftime-ad.mp4',poster:'img/ads/halftime-poster.jpg',t:'HalfTime Chews launch ad',s:'18-second product ad',tag:'Concept, class project'},
  {src:'img/ads/paydue-ad.mp4',poster:'img/ads/paydue-poster.jpg',t:'Paydue app launch ad',s:'27-second SaaS-style ad, sound design included',tag:'Concept, made-up app'},
  {src:'img/ads/fma-ad.mp4',poster:'img/ads/fma-poster.jpg',t:'FMA Constructions custom cabinet ad',s:'20-second vertical ad for Reels',tag:'FMA Constructions',vert:true,vt:'FMA Constructions',vd:'Custom built-ins, made to match. The ad walks through a real request: a photo, a finish, a free estimate booked in a few taps.'}];
 window.LP_ADS=ADS;let cur=ADS[0];
 const player=document.getElementById('player'),cine=document.getElementById('cine'),cbox=document.getElementById('cbox');
 function fitCine(){const r=(v.videoWidth&&v.videoHeight)?v.videoWidth/v.videoHeight:(cur.vert?9/16:16/9);
  let w=Math.min(innerWidth*.92,1600),h=w/r;const mh=innerHeight*.86;if(h>mh){h=mh;w=h*r}cbox.style.width=w+'px';cbox.style.height=h+'px'}
 document.getElementById('xp').addEventListener('click',()=>{lpFull(v,1);cbox.appendChild(v);cbox.appendChild(snd);fitCine();
  try{cine.showModal()}catch(e){cine.setAttribute('open','')}v.play().catch(()=>{})});
 addEventListener('resize',()=>{if(cine.open)fitCine()});v.addEventListener('loadedmetadata',()=>{if(cine.open)fitCine()});
 const back=()=>{player.insertBefore(snd,player.querySelector('.xp'));player.insertBefore(v,snd)};
 cine.addEventListener('close',back);document.getElementById('cx').onclick=()=>cine.close();cine.addEventListener('click',e=>{if(e.target===cine)cine.close()});
 const reel=document.getElementById('reel');
 reel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=ADS[+b.dataset.i];
  reel.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',String(x===b)));
  v.pause();v.poster=a.poster.replace('.jpg','.avif');v.dataset.src=a.src;v.src=lpP(a.src);v.closest('.player')&&(lpBg(v.closest('.player'),a.poster),v.closest('.player').classList.toggle('vert',!!a.vert));lpBg(player,a.poster);player.classList.toggle('vert',!!a.vert);cur=a;if(a.vert){document.getElementById('vt').textContent=a.vt;document.getElementById('vd').textContent=a.vd}
  document.getElementById('adt').textContent=a.t;document.getElementById('adsub').innerHTML=a.s+' <em>'+a.tag+'</em>';
  if(!reduce)v.play().catch(()=>{})});
 snd.addEventListener('click',()=>{lpFull(v);v.muted=!v.muted;if(!v.muted){v.currentTime=0;v.play().catch(()=>{})}
  snd.setAttribute('aria-pressed',String(!v.muted));snd.querySelector('span').textContent=v.muted?'Sound on':'Sound off'});
 const WHERE={cafe:['coffee near me','Coffee, pastries and a seat by the window.'],barber:['barber near me','Walk-ins welcome. Book online in seconds.'],studio:['pilates classes near me','Small classes, real coaching, all levels.'],
  grill:['restaurant near me','Wood-fire grill. Book a table tonight.'],salon:['hair salon near me','Cuts, colour and care. Book online.'],gym:['gym near me','Coaching, classes and open gym.']};
 function g(){const S=CFG.S,o=document.getElementById('out'),cs=getComputedStyle(o);const nm=((S.name.trim()||'Your name')+(S.desc.trim()&&S.name.trim().split(/\s+/).length<2?' '+S.desc.trim():'')),k=S.kind;
  const slug=nm.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'')||'yourname';const tag=o.querySelector('[data-slot=tag]').textContent;
  document.getElementById('gq').textContent=WHERE[k][0];document.getElementById('gname').textContent=nm;document.getElementById('gurl').textContent='www.'+slug+'.com';
  const f=document.getElementById('gfav');f.style.background=cs.getPropertyValue('--b');f.style.color=cs.getPropertyValue('--bi');f.innerHTML=CFG.msvg(S.icon,'gsym');
  document.getElementById('gh').textContent=nm+' | '+tag.replace(/\.$/,'');document.getElementById('gd').textContent=WHERE[k][1]}
 const orig=CFG.render;CFG.render=function(a){orig(a);setTimeout(g,a?260:0)};
 document.getElementById('cfg').addEventListener('click',()=>setTimeout(g,280));document.getElementById('c-name').addEventListener('input',()=>setTimeout(g,10));
 document.getElementById('cfg').addEventListener('input',()=>setTimeout(g,10));g()})();

/* ---------- phone (I11): sticky bottom CTA + swipe-row dots ---------- */
(()=>{const bar=document.getElementById('lp-bar'),end=document.getElementById('end');if(!bar||!end)return;let on=false,tk=0;
 function chk(){tk=0;const a=document.activeElement,typing=a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName);
  const zone=[...document.querySelectorAll('#types,#lp-why,.reel')].some(e=>{const r=e.getBoundingClientRect();return r.height&&r.bottom>innerHeight-90&&r.top<innerHeight});/* step aside when tappable bits sit under it */
  const v=scrollY>heroEnd()+innerHeight*.3&&end.getBoundingClientRect().top>innerHeight*.85&&!typing&&!zone;
  if(v!==on){on=v;bar.classList.toggle('on',v);bar.setAttribute('aria-hidden',String(!v));bar.tabIndex=v?0:-1}}
 const q=()=>{if(!tk)tk=requestAnimationFrame(chk)};addEventListener('scroll',q,{passive:true});addEventListener('resize',q);document.addEventListener('focusin',q);document.addEventListener('focusout',()=>setTimeout(q,50));chk()})();
(()=>{[document.getElementById('out'),document.querySelector('.work')].forEach(row=>{if(!row)return;const n=row.children.length;if(n<2)return;
 const d=document.createElement('div');d.className='lp-dots';d.setAttribute('aria-hidden','true');d.innerHTML='<i></i>'.repeat(n);row.after(d);const ds=[...d.children];let tk=0;
 const up=()=>{tk=0;const m=row.scrollWidth-row.clientWidth,i=m>0?Math.round(row.scrollLeft/m*(n-1)):0;ds.forEach((e,k)=>e.classList.toggle('on',k===i))};
 row.addEventListener('scroll',()=>{if(!tk)tk=requestAnimationFrame(up)},{passive:true});up()})})();
