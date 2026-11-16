/* Launch Point frame I — hero, rock that travels the page, brand configurator, tweak bar */
const root=document.documentElement,sc=document.getElementById('scroll'),st=document.getElementById('stage');
const qs=new URLSearchParams(location.search),Q=qs.get('p');
const cl=v=>Math.max(0,Math.min(1,v)),ease=v=>1-Math.pow(1-v,3);
const EMBER=[.7789,.1722];           // rock centre in the launch photo (fraction of plate)
let heroP=0;
function heroEnd(){return sc.offsetTop+sc.offsetHeight-innerHeight}
function set(p){p=cl(p);heroP=p;const t=cl(p/.7);
  root.style.setProperty('--p',p.toFixed(4));root.style.setProperty('--t',t.toFixed(4));
  st.classList.toggle('on',t>.5)}
function onScroll(){set(scrollY/Math.max(1,heroEnd()))}
if(Q!==null){set(parseFloat(Q))}else{addEventListener('scroll',onScroll,{passive:true});onScroll()}

/* ---------- the rock + trail ---------- */
const R=(()=>{const story=document.getElementById('story'),wrap=document.getElementById('tw-wrap'),svg=document.getElementById('trail'),
  tp=document.getElementById('tp'),tp0=document.getElementById('tp0'),rock=document.getElementById('rock'),fx=document.getElementById('fx');
  let L=0,start=[0,0],photoW=80,sparks=true,last=null,alive=0;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rs=()=>(parseFloat(getComputedStyle(root).getPropertyValue('--rs'))||60)*(story.clientWidth<640?.62:1);
  function emberPt(){const pl=document.querySelector('.plate').getBoundingClientRect(),sr=st.getBoundingClientRect();
    const W=story.clientWidth;let x=pl.left+pl.width*EMBER[0];const y=pl.top-sr.top+pl.height*EMBER[1];
    photoW=pl.width*.0542*(W<640?.9:1);x=Math.min(Math.max(x,28),W-22);
    return [x,heroEnd()+y-story.offsetTop]}
  function build(){const W=story.clientWidth,H=story.scrollHeight,phone=W<640;
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.height=H+'px';
    const sr=story.getBoundingClientRect(),Y=el=>el.getBoundingClientRect().top-sr.top,B=el=>el.getBoundingClientRect().bottom-sr.top;
    start=emberPt();const pts=[start];
    const secs=[...story.querySelectorAll('.chap')];
    const wrapEl=story.querySelector('.in-wrap'),wr=wrapEl.getBoundingClientRect();
    const gutL=phone?W-22:Math.max(26,(wr.left-sr.left)/2),gutR=phone?W-22:W-Math.max(26,(wr.left-sr.left)/2);
    secs.forEach((s,i)=>{const side=i%2?gutL:gutR;const top=Y(s),bot=B(s);
      pts.push([side,top+(phone?40:90)],[side,bot-(phone?30:60)])});
    const g=document.getElementById('land').getBoundingClientRect();pts.push([g.left-sr.left+5,g.top-sr.top+5]);
    let d=`M${pts[0][0]},${pts[0][1]}`;
    for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i],dy=(y1-y0)*.5;d+=` C${x0},${y0+dy} ${x1},${y1-dy} ${x1},${y1}`}
    tp.setAttribute('d',d);tp0.setAttribute('d',d);L=tp.getTotalLength();tp.style.strokeDasharray=L;last=null;update()}
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
    const l=k<=0?0:Math.max(0,Math.min(L,at(target)));
    tp.style.strokeDashoffset=L-l;
    const pt=tp.getPointAtLength(l),p2=tp.getPointAtLength(Math.min(L,l+2)),ang=Math.atan2(p2.y-pt.y,p2.x-pt.x);
    const size=photoW+(rs()-photoW)*cl(k*1.6);
    rock.style.width=size+'px';
    rock.style.transform=`translate(${pt.x-size/2}px,${pt.y-size*186/208/2}px) rotate(${(l*.12)%360}deg)`;
    const gone=k>0.002;st.classList.toggle('gone',gone);tp0.style.opacity=gone?1:0;rock.style.opacity=gone&&l<L-4?1:0;
    if(gone&&last){const dx=pt.x-last[0],dy=pt.y-last[1];if(dx*dx+dy*dy>36){spark(pt.x,pt.y,ang);if(dx*dx+dy*dy>400)spark(pt.x,pt.y,ang)}}
    last=[pt.x,pt.y];
    document.getElementById('end').classList.toggle('lit',l>=L-4)}
  addEventListener('scroll',update,{passive:true});addEventListener('resize',()=>{clearTimeout(R._t);R._t=setTimeout(build,120)});
  document.fonts.ready.then(build);addEventListener('load',build);
  return {build,update,setSparks:v=>sparks=v}})();

/* ---------- 01 brand configurator ---------- */
const CFG=(()=>{
  const SYM={cup:'<path d="M8 16h20v8a10 10 0 0 1-20 0z"/><path d="M28 18h3a4 4 0 0 1 0 8h-3"/><path d="M14 6c-2 3 2 4 0 7M20 6c-2 3 2 4 0 7"/>',
    pole:'<rect x="13" y="4" width="14" height="32" rx="7"/><path d="M13 14l14-6M13 22l14-6M13 30l14-6"/>',
    orbit:'<circle cx="20" cy="20" r="14"/><path d="M6 20c8-7 20-7 28 0"/><circle cx="20" cy="11" r="2.2" fill="currentColor" stroke="none"/>',
    flame:'<path d="M20 5c4 7 10 10 10 18a10 10 0 0 1-20 0c0-5 3-8 5-11 1 4 3 5 5 6 0-5-1-9 0-13z"/>',
    leaf:'<path d="M8 32C8 16 18 8 32 8c0 14-8 24-24 24z"/><path d="M8 32l14-14"/>',
    bell:'<path d="M5 15v10M10 11v18M30 11v18M35 15v10M10 20h20"/>'};
  const KINDS={
    cafe:{name:'Corvo Coffee',word:'Coffee',sym:'cup',nav:['Menu','Visit'],cta:'Order ahead',tag:{bold:'Strong coffee. No small talk.',warm:'Your corner table is waiting.',calm:'Slow mornings, done right.',play:'Stay for the croissant.'}},
    barber:{name:'Hale Barbers',word:'Barbers',sym:'pole',nav:['Services','Team'],cta:'Book a cut',tag:{bold:'Sharp cuts. Every time.',warm:'Pull up a chair, we got you.',calm:'A clean cut, no rush.',play:'Fresh cut, fresh start.'}},
    studio:{name:'Nova Pilates',word:'Pilates',sym:'orbit',nav:['Classes','Studio'],cta:'Book a class',tag:{bold:'Stronger in fifty minutes.',warm:'Move well, feel at home.',calm:'Breathe in. Move slow.',play:'Wobbly first class? Welcome.'}},
    grill:{name:'Brasa Grill',word:'Grill',sym:'flame',nav:['Menu','Visit'],cta:'Reserve',tag:{bold:'Fire, meat, nothing else.',warm:'Sunday lunch, every day.',calm:'Good food, take your time.',play:'Come hungry. Leave happy.'}},
    salon:{name:'Lumi Salon',word:'Salon',sym:'leaf',nav:['Services','Gallery'],cta:'Book now',tag:{bold:'Colour that turns heads.',warm:'Your hour, just for you.',calm:'Quiet chair, good hands.',play:'Every day is a hair day.'}},
    gym:{name:'Iron Yard',word:'Gym',sym:'bell',nav:['Classes','Coaches'],cta:'Join',tag:{bold:'Show up. Lift heavy.',warm:'Stronger, together.',calm:'Train well. Rest well.',play:'Leg day is every day.'}}};
  const COLS=[['Cobalt','#2A47C4'],['Forest','#1F5A43'],['Oxblood','#7A1F2A'],['Saffron','#E2A426'],['Rose','#E07A93'],['Plum','#5B2A6E'],['Teal','#0F7C7A'],['Coral','#F0623F'],['Sky','#7FB2EC'],['Ink','#18181C']];
  const TYPES={classic:{f:'Serif',w:400,ls:'-.01em',tt:'none',sz:1.08},elegant:{f:'Corm',w:500,ls:'.01em',tt:'none',sz:1.12},soft:{f:'Fraunces',w:600,ls:'-.02em',tt:'none',sz:.95},
    loud:{f:'Archivo',w:400,ls:'-.02em',tt:'none',sz:.86},modern:{f:'Syne',w:700,ls:'-.01em',tt:'none',sz:.92},tech:{f:'Mono',w:500,ls:'.03em',tt:'uppercase',sz:.82}};
  const S={name:'Corvo Coffee',kind:'cafe',mark:'mono',col:0,custom:'#2A47C4',gr:'light',type:'classic',voice:'warm',named:false};
  const box=document.getElementById('cfg'),out=document.getElementById('out'),brand=document.getElementById('brand'),nameI=document.getElementById('c-name');
  const swW=box.querySelector('[data-k=col]');
  COLS.forEach(([n,c],i)=>{const b=document.createElement('button');b.type='button';b.style.background=c;b.dataset.v=i;b.title=n;b.setAttribute('aria-label',n);swW.appendChild(b)});
  const cus=document.createElement('label');cus.className='cus';cus.title='Any colour';cus.dataset.v='custom';
  cus.innerHTML='<input type="color" value="#2A47C4" aria-label="Pick any colour">';swW.appendChild(cus);const cusI=cus.querySelector('input');
  /* colour maths */
  const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),toH=a=>'#'+a.map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('');
  const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return toH(A.map((v,i)=>v+(B[i]-v)*t))};
  const lum=h=>{const [r,g,b]=hx(h).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
  function palette(){const b=S.col==='custom'?S.custom:COLS[S.col][1],L=lum(b),bi=L>.36?'#16130F':'#FBF8F3';let g,ik,m;
    if(S.gr==='light'){g=mix(b,'#FFFFFF',.9);ik=mix(b,'#0B0A09',.82);m=L>.45?mix(b,'#000000',.38):b}
    else if(S.gr==='dark'){g=mix(b,'#0D0C0B',.88);ik='#F3EEE6';m=L<.06?mix(b,'#FFFFFF',.82):b}
    else{g=b;ik=bi;m=bi}
    const f=S.gr==='brand'?bi:b,fi=S.gr==='brand'?b:bi;
    return {b,bi,g,ik,m,f,fi,n:S.col==='custom'?'Your colour':COLS[S.col][0]}}
  const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const nm=()=>S.name.trim()||'Your name';
  const initials=()=>{const w=nm().split(/\s+/).filter(Boolean);return ((w[0]||'Y')[0]+(w[1]?w[1][0]:'')).toUpperCase()};
  const sym=()=>`<svg class="sym" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${SYM[KINDS[S.kind].sym]}</svg>`;
  let uid=0;
  function badge(){const ty=TYPES[S.type],id='bp'+(++uid),k=KINDS[S.kind];const top=esc(nm().toUpperCase()),bot=esc(k.word.toUpperCase());
    const fs=Math.min(13,150/Math.max(6,top.length));
    return `<svg class="badge" viewBox="0 0 120 120"><defs><path id="${id}a" d="M17,60 a43,43 0 1,1 86,0"/><path id="${id}b" d="M11,60 a49,49 0 0,0 98,0"/></defs>
      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".6"/>
      <text fill="currentColor" style="font-family:${ty.f};font-weight:${ty.w}" font-size="${fs}" letter-spacing="2"><textPath href="#${id}a" startOffset="50%" text-anchor="middle">${top}</textPath></text>
      <text fill="currentColor" style="font-family:${ty.f};font-weight:${ty.w}" font-size="9" letter-spacing="3"><textPath href="#${id}b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">${bot}</textPath></text>
      <svg x="43" y="43" width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${SYM[k.sym]}</svg></svg>`}
  function full(){const n=esc(nm());
    if(S.mark==='mono')return `<div class="mark"><span class="mono">${esc(initials())}</span><span class="wm">${n}</span></div>`;
    if(S.mark==='sym')return `<div class="mark">${sym()}<span class="wm">${n}</span></div>`;
    if(S.mark==='badge')return `<div class="mark">${badge()}</div>`;
    return `<div class="mark"><span class="wm">${n}</span></div>`}
  function icon(){if(S.mark==='sym')return sym();if(S.mark==='badge')return badge();
    return `<span class="ini">${esc(S.mark==='word'?nm()[0].toUpperCase():initials())}</span>`}
  function fit(){out.querySelectorAll('.mark').forEach(m=>{m.style.fontSize='';const box=m.closest('.board,.bcard,.wb-nav,.tile');
    const max=(box.clientWidth||300)*(box.classList.contains('tile')?.84:box.classList.contains('wb-nav')?.42:.92);let i=0;
    while(m.scrollWidth>max&&i<30){m.style.fontSize=(parseFloat(getComputedStyle(m).fontSize)*.93)+'px';i++}})}
  addEventListener('resize',()=>fit());
  function render(anim){const p=palette(),ty=TYPES[S.type],k=KINDS[S.kind];
    for(const v of['b','bi','g','ik','m','f','fi'])out.style.setProperty('--'+v,p[v]);brand.style.setProperty('--bc',p.b);
    document.getElementById('c-cn').textContent=p.n;
    const draw=()=>{
      out.querySelectorAll('[data-slot]').forEach(el=>{const s=el.dataset.slot;
        if(s==='full')el.innerHTML=full();else if(s.startsWith('icon'))el.innerHTML=icon();
        else if(s==='tag')el.textContent=k.tag[S.voice];else if(s==='name')el.textContent=nm();
        else if(s==='handle')el.textContent='@'+(nm().toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'')||'yourname');
        else if(s==='cta')el.textContent=k.cta;else if(s==='nav1')el.textContent=k.nav[0];else if(s==='nav2')el.textContent=k.nav[1]});
      out.querySelectorAll('.wm,.mono,.ini,.ig-nm,.wb-h').forEach(el=>{el.style.fontFamily=ty.f;el.style.fontWeight=ty.w;el.style.letterSpacing=ty.ls;el.style.textTransform=ty.tt});
      out.querySelectorAll('.wm,.mono,.ini').forEach(el=>el.style.fontSize=ty.sz+'em');
      out.querySelectorAll('.tl,.ig-bio,.q2').forEach(el=>{const disp=S.type==='classic'||S.type==='elegant'||S.type==='soft';el.style.fontFamily=disp?ty.f:'Hanken';el.style.fontWeight=disp?ty.w:400;el.style.fontSize=disp?'1.1em':''});
      fit();out.classList.remove('fading')};
    if(anim){out.classList.add('fading');clearTimeout(render._t);render._t=setTimeout(draw,200)}else draw();
    box.querySelectorAll('[data-k]').forEach(g=>g.querySelectorAll('button,.cus').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v==String(S[g.dataset.k]))))) }
  box.addEventListener('click',e=>{const b=e.target.closest('[data-k] button');if(!b)return;const k=b.closest('[data-k]').dataset.k;
    const v=k==='col'?+b.dataset.v:b.dataset.v;if(S[k]===v)return;S[k]=v;
    if(k==='kind'&&!S.named){S.name=KINDS[v].name;nameI.value=S.name}
    render(k!=='col'&&k!=='gr')});
  cusI.addEventListener('input',()=>{S.col='custom';S.custom=cusI.value;render(false)});
  cus.addEventListener('click',()=>{if(S.col!=='custom'){S.col='custom';S.custom=cusI.value;render(false)}});
  nameI.addEventListener('input',()=>{S.name=nameI.value;S.named=true;render(false)});
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  document.getElementById('c-shuf').addEventListener('click',e=>{e.preventDefault();
    const kind=pick(Object.keys(KINDS).filter(x=>x!==S.kind));Object.assign(S,{kind,name:KINDS[kind].name,named:false,mark:pick(['mono','word','sym','badge']),
      col:Math.floor(Math.random()*COLS.length),gr:pick(['light','light','dark','brand']),type:pick(Object.keys(TYPES)),voice:pick(['bold','warm','calm','play'])});
    nameI.value=S.name;render(true)});
  document.fonts.ready.then(()=>fit());
  render(false);return {S,render}})();

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
  grid.classList.toggle('filt',!!t);grid.querySelectorAll('.post').forEach(p=>p.classList.toggle('hit',p.dataset.t===t))});
 types.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));
 const SLIDES=[null,'<span class="t">No water<br>needed<span class="d">.</span></span><span class="cnt">2/4</span>','<span class="t">Fits in<br>a sock<span class="d">.</span></span><span class="cnt">3/4</span>','split'];
 const box=document.getElementById('lbpost'),nav=lb.querySelector('.lbnav'),dots=document.getElementById('lbdots');let src=null,i=0;
 function show(){box.innerHTML='';let el;
  if(src.dataset.t==='carousel'&&i>0){if(SLIDES[i]==='split'){el=grid.querySelector('.p-split').cloneNode(true);el.insertAdjacentHTML('beforeend','<span class="cnt">4/4</span>')}
   else{el=src.cloneNode(false);el.className='post p-car p-slide s'+(i+1);el.style.backgroundImage=`url(img/social/${i===1?'packb':'pack'}.jpg)`;el.innerHTML=SLIDES[i]}}
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
 new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;if(!reduce)v.play().catch(()=>{})}else v.pause()}),{threshold:.35}).observe(v);
 const ADS=[{src:'img/ads/halftime-ad.mp4',poster:'img/ads/halftime-poster.jpg',t:'HalfTime Chews launch ad',s:'18-second product ad',tag:'Concept, class project'},
  {src:'img/ads/paydue-ad.mp4',poster:'img/ads/paydue-poster.jpg',t:'Paydue app launch ad',s:'27-second SaaS-style ad, sound design included',tag:'Concept, made-up app'},
  {src:'img/ads/fma-ad.mp4',poster:'img/ads/fma-poster.jpg',t:'FMA Constructions custom cabinet ad',s:'20-second vertical ad for Reels',tag:'FMA Constructions',vert:true}];
 window.LP_ADS=ADS;let cur=ADS[0];
 const player=document.getElementById('player'),cine=document.getElementById('cine'),cbox=document.getElementById('cbox');
 function fitCine(){const r=(v.videoWidth&&v.videoHeight)?v.videoWidth/v.videoHeight:(cur.vert?9/16:16/9);
  let w=Math.min(innerWidth*.92,1600),h=w/r;const mh=innerHeight*.86;if(h>mh){h=mh;w=h*r}cbox.style.width=w+'px';cbox.style.height=h+'px'}
 document.getElementById('xp').addEventListener('click',()=>{if(!v.src)v.src=v.dataset.src;cbox.appendChild(v);cbox.appendChild(snd);fitCine();
  try{cine.showModal()}catch(e){cine.setAttribute('open','')}v.play().catch(()=>{})});
 addEventListener('resize',()=>{if(cine.open)fitCine()});v.addEventListener('loadedmetadata',()=>{if(cine.open)fitCine()});
 const back=()=>{player.insertBefore(snd,player.querySelector('.xp'));player.insertBefore(v,snd)};
 cine.addEventListener('close',back);document.getElementById('cx').onclick=()=>cine.close();cine.addEventListener('click',e=>{if(e.target===cine)cine.close()});
 const reel=document.getElementById('reel');
 reel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=ADS[+b.dataset.i];
  reel.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',String(x===b)));
  v.pause();v.poster=a.poster;v.dataset.src=a.src;v.src=a.src;v.closest('.player')&&(v.closest('.player').style.backgroundImage=`url(${a.poster})`,v.closest('.player').classList.toggle('vert',!!a.vert));player.style.backgroundImage=`url(${a.poster})`;player.classList.toggle('vert',!!a.vert);cur=a;
  document.getElementById('adt').textContent=a.t;document.getElementById('adsub').innerHTML=a.s+' <em>'+a.tag+'</em>';
  if(!reduce)v.play().catch(()=>{})});
 snd.addEventListener('click',()=>{if(!v.src)v.src=v.dataset.src;v.muted=!v.muted;if(!v.muted){v.currentTime=0;v.play().catch(()=>{})}
  snd.setAttribute('aria-pressed',String(!v.muted));snd.querySelector('span').textContent=v.muted?'Sound on':'Sound off'});
 const WHERE={cafe:['coffee near me','Coffee, pastries and a seat by the window.'],barber:['barber near me','Walk-ins welcome. Book online in seconds.'],studio:['pilates classes near me','Small classes, real coaching, all levels.'],
  grill:['restaurant near me','Wood-fire grill. Book a table tonight.'],salon:['hair salon near me','Cuts, colour and care. Book online.'],gym:['gym near me','Coaching, classes and open gym.']};
 function g(){const S=CFG.S,o=document.getElementById('out'),cs=getComputedStyle(o);const nm=(S.name.trim()||'Your name'),k=S.kind;
  const slug=nm.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'')||'yourname';const tag=o.querySelector('[data-slot=tag]').textContent;
  document.getElementById('gq').textContent=WHERE[k][0];document.getElementById('gname').textContent=nm;document.getElementById('gurl').textContent='www.'+slug+'.com';
  const f=document.getElementById('gfav');f.style.background=cs.getPropertyValue('--b');f.style.color=cs.getPropertyValue('--bi');f.textContent=nm[0].toUpperCase();
  document.getElementById('gh').textContent=nm+' | '+tag.replace(/\.$/,'');document.getElementById('gd').textContent=WHERE[k][1]}
 const orig=CFG.render;CFG.render=function(a){orig(a);setTimeout(g,a?260:0)};
 document.getElementById('cfg').addEventListener('click',()=>setTimeout(g,280));document.getElementById('c-name').addEventListener('input',()=>setTimeout(g,10));
 document.getElementById('cfg').addEventListener('input',()=>setTimeout(g,10));g()})();
