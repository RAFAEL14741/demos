// ===== VYRA demo: EN / PT-BR switch =====
// Swaps text in place (also text that shop.js writes later: bag, toasts, popups) via a MutationObserver.
// Brand words (STRENGTH / MOVEMENT / CONFIDENCE, tagline band) stay English, like VYRA's own bio.
// Default: ?lang=pt|en > saved choice > phone/browser language.
(() => {
const D = {
  // nav + hero
  'Shop':'Loja', 'Sets':'Conjuntos', 'One-pieces':'Peças únicas', 'Size guide':'Guia de tamanhos', 'BAG':'SACOLA', 'SCROLL':'ROLE',
  'VYRA home':'Início VYRA', 'VYRA collections':'Coleções VYRA',
  'Red set':'Conjunto vermelho', 'Sky set':'Conjunto azul-céu', 'Fall Collection':'Coleção Outono', 'Black set':'Conjunto preto',
  'The':'Conjunto', 'Set':'', 'One':'', 'Black, never':'Preto, nunca', 'basic':'básico',
  'Four women, one iconic color. Top + high-waist leggings.':'Quatro mulheres, uma cor icônica. Top + legging de cintura alta.',
  'Bold tones. Strong presence. Bra top + flare leggings.':'Tons marcantes. Presença forte. Top + calça flare.',
  'One tone, infinite versions. Earthy, timeless — new for Fall.':'Um tom, infinitas versões. Terroso, atemporal — novo para o outono.',
  'Off-shoulder long sleeve + shorts. From training to lifestyle.':'Manga longa ombro a ombro + short. Do treino ao dia a dia.',
  'Made for leg day. The high waist holds through deep squats and hip thrusts, and the red makes every rep pop on camera.':'Feito para o dia de perna. A cintura alta segura firme no agachamento profundo e na elevação pélvica, e o vermelho faz cada repetição brilhar na câmera.',
  'Your low-impact day set. The flare moves with you through Pilates and mobility work, then still looks right for coffee after.':'O conjunto do dia leve. A flare acompanha você no Pilates e na mobilidade, e ainda fica perfeita para o café depois.',
  'The long-session set. The deep tone hides sweat on cardio and double days, and the halter frees your back on rows.':'O conjunto dos treinos longos. O tom escuro disfarça o suor no cardio e nos dias de dois treinos, e a frente única deixa as costas livres na remada.',
  'Sleeves keep your shoulders warm for the first sets, the shorts let you watch your form on squats and lunges. Goes with every sneaker you own.':'As mangas mantêm os ombros aquecidos nas primeiras séries, e o short deixa você ver sua postura no agachamento e no afundo. Combina com qualquer tênis.',
  'Glutes':'Glúteos', 'Gym selfies':'Selfie na academia', 'Pilates':'Pilates', 'Mobility':'Mobilidade', 'Rest-day walks':'Caminhada no descanso',
  'Back day':'Dia de costas', 'Cardio':'Cardio', 'Fall layering':'Looks de outono', 'Warm-ups':'Aquecimento',
  'Add to bag +':'Adicionar +', 'View set':'Ver conjunto', 'Why it works':'Por que funciona',
  // product names
  'The Red Set':'Conjunto Vermelho', 'Sky Flare Set':'Conjunto Flare Azul-céu', 'Brown Halter Set':'Conjunto Frente Única Marrom',
  'Black Off-Shoulder Set':'Conjunto Ombro a Ombro Preto', 'Slate Set':'Conjunto Ardósia', 'Wine Long-Sleeve Set':'Conjunto Manga Longa Vinho',
  'Cream Off-Shoulder Set':'Conjunto Ombro a Ombro Creme', 'Pastel Set':'Conjunto Tons Pastel', 'Backless Jumpsuit':'Macacão Costas Abertas',
  'Halter Bodysuit':'Macaquinho Frente Única', 'Tee Bodysuit':'Macaquinho Manga Curta', 'Long-Sleeve Jumpsuit':'Macacão Manga Longa',
  'Black Bra Set':'Conjunto Top Preto', 'White Zip Set':'Conjunto Zíper Branco',
  // colors + groups + tags
  'Red':'Vermelho', 'Sky':'Azul-céu', 'Brown':'Marrom', 'Black':'Preto', 'Slate':'Ardósia', 'Wine':'Vinho', 'Cream':'Creme', 'Pink':'Rosa',
  'Butter':'Manteiga', 'Ice blue':'Azul-gelo', 'Mint':'Menta', 'Navy':'Marinho', 'Ice':'Gelo', 'White':'Branco', 'Blue':'Azul',
  'Pastel':'Pastel', 'Neutral':'Neutro', 'Earth':'Terrosos', 'Soft tones':'Tons suaves', 'All':'Todos', 'All colors':'Todas',
  'Iconic':'Icônico', '4 tones':'4 tons', 'Open back':'Costas abertas',
  // product copy
  'Bra top + high-waist leggings. Four women, one iconic color.':'Top + legging de cintura alta. Quatro mulheres, uma cor icônica.',
  'Bra top + flare leggings. Bold tones, strong presence.':'Top + calça flare. Tons marcantes, presença forte.',
  'Halter top + leggings or flare. One tone, infinite versions.':'Top frente única + legging ou flare. Um tom, infinitas versões.',
  'Off-shoulder long sleeve + shorts. From training to lifestyle.':'Manga longa ombro a ombro + short. Do treino ao dia a dia.',
  'Bra top + leggings or flare.':'Top + legging ou flare.', 'Long sleeve + shorts.':'Manga longa + short.',
  'Off-shoulder long sleeve + leggings.':'Manga longa ombro a ombro + legging.',
  'Long-sleeve or bra top + leggings, in soft tones.':'Manga longa ou top + legging, em tons suaves.',
  'Short-sleeve one-piece with an open back.':'Peça única de manga curta com costas abertas.',
  'Halter neck, short length.':'Gola frente única, comprimento curto.', 'Short sleeve, short length.':'Manga curta, comprimento curto.',
  'Long sleeve, deep V neckline, one piece.':'Manga longa, decote V profundo, peça única.',
  'Sports bra + shorts or leggings.':'Top esportivo + short ou legging.', 'Zip-up top + shorts.':'Top com zíper + short.',
  'The long-session set. The deep tone hides sweat through cardio and double days, and the halter keeps your back free on rows and pull-downs.':'O conjunto dos treinos longos. O tom escuro disfarça o suor no cardio e nos dias de dois treinos, e a frente única deixa as costas livres na remada e no pulldown.',
  'Sleeves keep your shoulders warm for the first sets; the shorts let you watch your knees on squats and lunges.':'As mangas mantêm os ombros aquecidos nas primeiras séries; o short deixa você ver os joelhos no agachamento e no afundo.',
  'A cool grey that hides sweat. Take the leggings for lifting days and the flare for mat days.':'Um cinza frio que disfarça o suor. Legging para os dias de musculação, flare para os dias de solo.',
  'Covered up top, full range below. Good for cold-gym mornings when you still want to see your legs work.':'Coberta em cima, liberdade embaixo. Perfeito para as manhãs de academia fria em que você ainda quer ver as pernas trabalhando.',
  'Soft and light for studio classes and slow mornings. Throw a jacket on and you are dressed for the day.':'Macio e leve para aulas no estúdio e manhãs tranquilas. Coloque uma jaqueta e você está pronta para o dia.',
  'Light colors for light days: mat work, stretching, recovery walks. Pick one tone or match with your training partner.':'Cores leves para dias leves: solo, alongamento, caminhada de recuperação. Escolha um tom ou combine com sua parceira de treino.',
  'One piece, nothing to pull up between sets. The open back keeps you cool when the upper-body circuit gets heavy.':'Uma peça só, nada para ajustar entre as séries. As costas abertas refrescam quando o circuito de superiores fica pesado.',
  'Short and locked in for leg day. Nothing rides up or bunches on box jumps and step-ups.':'Curto e firme para o dia de perna. Nada sobe nem embola no salto na caixa e no step-up.',
  'A tee and shorts in one. Throw it on, train, go. No top to tuck back in after every set.':'Camiseta e short em uma peça. Vista, treine, vá. Sem blusa para ajeitar depois de cada série.',
  'From a slow mat session straight to dinner. Covered, warm, and one less outfit decision.':'Do treino de solo direto para o jantar. Coberta, quentinha e uma decisão de look a menos.',
  'The set you will actually wear four days a week. Shorts for leg day, swap to leggings when the gym is cold.':'O conjunto que você vai usar quatro vezes por semana. Short no dia de perna, legging quando a academia estiver fria.',
  'Zip up for the walk in, unzip for the warm-up. Bright white reads clean on camera on core and ball days.':'Zíper fechado na chegada, aberto no aquecimento. O branco fica limpo na câmera nos dias de core e bola.',
  // workouts
  'Leg day':'Dia de perna', 'Upper body':'Superiores', 'Pilates & stretch':'Pilates e alongamento', 'Core & ball work':'Core e bola', 'Gym to street':'Da academia pra rua',
  'leg day':'dia de perna', 'upper body':'superiores', 'pilates & stretch':'pilates e alongamento', 'core & ball work':'core e bola', 'gym to street':'da academia pra rua',
  'Squats, lunges, hip thrusts':'Agachamento, afundo, elevação pélvica', 'Rows, presses, curls':'Remadas, supinos, roscas',
  'Mat work, mobility, flow':'Solo, mobilidade, fluidez', 'Planks, slams, balance':'Prancha, slam ball, equilíbrio', 'Train, then keep it on':'Treine e continue com ele',
  'Shop by workout':'Compre por treino', 'What are you training today?':'O que você vai treinar hoje?',
  // shop
  'The collection':'A coleção', 'Shop by':'Compre por', 'Shop for':'Compre para', 'set':'conjunto', 'color':'cor', 'one-piece':'peça única',
  'Clear':'Limpar', 'Clear filters':'Limpar filtros', 'Nothing matches all of those yet.':'Nada combina com todos esses filtros ainda.',
  'Dressed for the set,':'Vestida para a série,', 'not just the photo.':'não só para a foto.',
  "Can't pick? Spin a look.":'Não consegue escolher? Gire um look.',
  'One tap and we pick a set for today. Pick a workout above first and the spin only lands on sets made for it.':'Um toque e a gente escolhe um conjunto para hoje. Escolha um treino acima e o giro só para em conjuntos feitos para ele.',
  'Spin a look':'Girar um look', 'Spinning…':'Girando…', 'Spin again':'Girar de novo', 'Shop this look':'Comprar este look',
  'From the shoot':'Do ensaio', 'Every photo from the VYRA shoot. Drag through, tap any look to shop it.':'Todas as fotos do ensaio da VYRA. Arraste e toque em qualquer look para comprar.',
  'The fabric does the work.':'O tecido faz o trabalho.',
  'Every VYRA piece is cut from the same soft, sculpting knit, so a set feels the same on leg day as it does on a Sunday walk.':'Toda peça VYRA é feita do mesmo tecido macio e modelador, então o conjunto é igual no dia de perna e na caminhada de domingo.',
  'Squat-proof':'À prova de agachamento', 'Stays opaque in a deep squat under bright gym light.':'Não fica transparente no agachamento profundo, nem sob a luz forte da academia.',
  'Sculpting high waist':'Cintura alta modeladora', 'A wide waistband that holds without digging in or rolling down.':'Cós largo que segura sem apertar nem enrolar.',
  'Four-way stretch':'Elasticidade em 4 direções', 'Moves with lunges, splits and overhead reaches, then snaps back.':'Acompanha afundos, aberturas e braços acima da cabeça, e volta ao lugar.',
  'Quick-dry':'Secagem rápida', 'Pulls sweat off your skin so you are not training in a wet set.':'Tira o suor da pele para você não treinar com a roupa molhada.',
  'VYRA set in its packaging, close up':'Conjunto VYRA na embalagem, de perto',
  'How ordering works':'Como fazer o pedido',
  'Pick your set and size.':'Escolha o conjunto e o tamanho.', 'Not sure on size? The size finder takes ten seconds.':'Na dúvida do tamanho? O buscador de tamanho leva dez segundos.',
  'Check out or send it by DM.':'Finalize aqui ou mande pela DM.', 'Pay by card here, or copy your bag into an Instagram DM like you always have.':'Pague com cartão aqui, ou copie sua sacola para uma DM no Instagram, como você sempre fez.',
  'We pack it and ship it.':'A gente embala e envia.', 'Out in 1–2 business days, in the same box you see in our posts.':'Sai em 1–2 dias úteis, na mesma caixa que você vê nos nossos posts.',
  'Questions before you buy':'Dúvidas antes de comprar',
  'How does the sizing run?':'Como é a modelagem?', 'Snug, second-skin fit. If you are between sizes, size up in leggings and keep your usual top size. The size finder in the size guide does the math for you.':'Justa, como uma segunda pele. Se ficar entre dois tamanhos, escolha um maior na legging e o seu tamanho de sempre no top. O buscador no guia de tamanhos faz a conta para você.',
  'Will the leggings go see-through when I squat?':'A legging fica transparente no agachamento?', 'No. Every set is squat-tested under bright gym light before it goes on sale.':'Não. Todo conjunto passa pelo teste do agachamento sob luz forte de academia antes de ir para a venda.',
  'How fast does it ship?':'Em quanto tempo é enviado?', 'Orders ship in 1–2 business days with tracking. US shipping is free over $100.':'Os pedidos saem em 1–2 dias úteis, com rastreio. Frete grátis nos EUA acima de $100.',
  'Can I exchange for another size?':'Posso trocar de tamanho?', 'Yes, within 30 days, as long as it is unworn with the tags on. Send us a DM and we will sort it out.':'Sim, em até 30 dias, desde que sem uso e com etiqueta. Manda uma DM que a gente resolve.',
  'Can I still order through Instagram?':'Ainda posso pedir pelo Instagram?', 'Yes. Fill your bag, tap "Order by Instagram DM" and your full order is copied for you. Paste it in our DMs and we confirm from there.':'Sim. Monte sua sacola, toque em "Pedir pela DM do Instagram" e o pedido completo é copiado para você. Cole na nossa DM e a gente confirma por lá.',
  'How do I wash it?':'Como lavar?', 'Cold, inside out, then hang dry. Skip fabric softener: it breaks down the stretch over time.':'Água fria, do avesso, e secar no varal. Sem amaciante: com o tempo ele acaba com a elasticidade.',
  'Train with us on Instagram':'Treine com a gente no Instagram', 'Follow @vyra.movement':'Siga @vyra.movement',
  'Get the next drop first.':'Saiba do próximo lançamento primeiro.', 'New colors sell out fast. We send one email when they land.':'Cores novas esgotam rápido. Mandamos um e-mail só quando chegarem.',
  'Email':'E-mail', 'you@email.com':'voce@email.com', 'Notify me':'Me avise',
  'Demo concept. Prices, sizes and product details are placeholders.':'Conceito demo. Preços, tamanhos e detalhes dos produtos são exemplos.',
  // product popup
  'Product':'Produto', 'Close':'Fechar', 'Click to zoom':'Clique para ampliar', 'Previous photo':'Foto anterior', 'Next photo':'Próxima foto',
  'est. price':'preço est.', 'Color':'Cor', 'Size':'Tamanho', 'Size · pick one':'Tamanho · escolha um', 'Find my size':'Achar meu tamanho',
  'Pick a size':'Escolha o tamanho', 'Add to bag':'Adicionar à sacola', 'Ask on Instagram':'Perguntar no Instagram',
  'Fit':'Modelagem', 'Fabric & care':'Tecido e cuidados', 'Shipping & exchanges':'Envio e trocas', 'Train in these too':'Treine com estes também',
  'Snug, second-skin fit. Between sizes? Size up in the bottoms and keep your usual top size.':'Justa, como uma segunda pele. Entre dois tamanhos? Escolha um maior na parte de baixo e o seu de sempre no top.',
  'Fitted through the body with a little give at the torso. Between sizes? Go by your hips.':'Ajustado ao corpo, com um pouco de folga no tronco. Entre dois tamanhos? Vá pelo quadril.',
  '78% nylon, 22% spandex. Squat-proof, four-way stretch, quick-dry. Wash cold inside out and hang dry; skip fabric softener.':'78% poliamida, 22% elastano. À prova de agachamento, elasticidade em 4 direções, secagem rápida. Lave em água fria do avesso e seque no varal; sem amaciante.',
  'Ships in 1–2 business days, free US shipping over $100. Exchange unworn pieces with tags within 30 days.':'Envio em 1–2 dias úteis, frete grátis nos EUA acima de $100. Troca de peças sem uso e com etiqueta em até 30 dias.',
  // bag
  'Bag':'Sacola', 'Your bag (':'Sua sacola (', 'You are':'Faltam', 'away from free shipping':'para o frete grátis', 'Free shipping':'Frete grátis', 'unlocked':'liberado',
  'Your bag is empty.':'Sua sacola está vazia.', 'Keep shopping':'Continuar comprando', 'Remove':'Remover', 'One less':'Menos um', 'One more':'Mais um',
  'Subtotal':'Subtotal', '(est.)':'(est.)', 'Taxes calculated at checkout.':'Impostos calculados no pagamento.', 'Checkout':'Finalizar compra',
  'Order by Instagram DM':'Pedir pela DM do Instagram', 'This is where secure checkout goes.':'Aqui entra o pagamento seguro.',
  'Demo: on the live store this opens card / Apple Pay checkout. For now, send the order by DM.':'Demo: na loja de verdade, aqui abre o pagamento com cartão / Apple Pay. Por enquanto, mande o pedido pela DM.',
  'Order copied. Paste it in the DM.':'Pedido copiado. Cole na DM.', 'Opening Instagram…':'Abrindo o Instagram…', "You're on the list for the next drop.":'Pronto! Você está na lista do próximo lançamento.',
  // size guide
  'Size finder':'Buscador de tamanho', 'Enter your measurements in inches.':'Digite suas medidas em polegadas.', 'Waist':'Cintura', 'Hips':'Quadril', 'Bust':'Busto',
  'Your size shows up here.':'Seu tamanho aparece aqui.', 'How to measure':'Como medir', 'Body measurements (inches)':'Medidas do corpo (polegadas)',
  ': around the fullest part, tape level.':': na parte mais cheia, com a fita reta.', ': around the narrowest part of your torso.':': na parte mais fina do tronco.',
  ': around the fullest part, feet together.':': na parte mais larga, com os pés juntos.',
  'Between sizes? Size up in leggings and shorts, keep your usual size in tops.':'Entre dois tamanhos? Escolha um maior em legging e short, e o seu de sempre nos tops.',
  "We'd go with":'A gente iria de', '. You are between sizes, so size up in leggings.':'. Você está entre dois tamanhos, então escolha um maior na legging.',
  'You are above our XL chart. Send us a DM and we will help you pick.':'Suas medidas passam da nossa tabela GG. Manda uma DM que a gente ajuda a escolher.',
};
const PT = new Set(Object.values(D));
const re = (r, f) => [r, f];
const tw = s => D[s] ?? s;   // translate a part, or keep it
const P = [
  re(/^(\d+) styles?$/, (_, n) => `${n} ${n === '1' ? 'modelo' : 'modelos'}`),
  re(/^(\d+) colors$/, (_, n) => `${n} cores`),
  re(/^\$(\d+) est\.(?: · made for (.+))?$/, (_, n, w) => `$${n} est.${w ? ' · feito para ' + tw(w) : ''}`),
  re(/^Added (.+), (.+), (XS|S|M|L|XL)(?: · \$(\d+) to free shipping| · (free shipping unlocked))$/,
     (_, n, c, s, left, free) => `Adicionado: ${tw(n)}, ${tw(c)}, ${s}` + (free ? ' · frete grátis liberado' : ` · faltam $${left} para o frete grátis`)),
  re(/^(.+), photo (\d+) of (\d+)$/, (_, n, a, b) => `${tw(n)}, foto ${a} de ${b}`),
  re(/^Photo (\d+)$/, (_, n) => `Foto ${n}`),
  re(/^(.+) in (.+)$/, (_, n, c) => D[n] && D[c] ? `${D[n]} na cor ${D[c]}` : null),
  re(/^(.+), (.+), \$(\d+)$/, (_, n, c, p) => D[n] && D[c] ? `${D[n]}, ${D[c]}, $${p}` : null),
];
const KEEP = /^([\d$.,/×x\s–-]+|XS|S|M|L|XL|est\.)$/;
function tr(s) {
  if (s in D) return D[s];
  for (const [r, f] of P) { const m = s.match(r); if (m) { const o = f(...m); if (o != null) return o; } }
  for (const sep of [' · ', ' + ']) if (s.includes(sep)) {   // "Add to bag · $95", "Red · M", "Leg day + Red"
    const parts = s.split(sep); if (parts.every(p => p in D || KEEP.test(p))) return parts.map(tw).join(sep);
  }
  return null;
}
let lang = 'en';
const orig = new WeakMap();          // node -> {en, pt} for text nodes
const origA = new WeakMap();         // el -> {attr: {en, pt}}
const ATTRS = ['aria-label', 'alt', 'title', 'placeholder', 'data-tip'];
const skip = n => n.parentElement?.closest('script,style,[data-noi18n]');
function doText(n) {
  if (skip(n)) return;
  const v = n.nodeValue, o = orig.get(n);
  if (o && v === o.pt) return;                                   // already ours
  const m = v.match(/^(\s*)([\s\S]*?)(\s*)$/), core = m[2].replace(/\s+/g, ' ');
  if (!core || PT.has(core)) return;
  const t = tr(core); if (t == null) return;
  const pt = m[1] + t + m[3]; orig.set(n, {en: v, pt}); n.nodeValue = pt;
}
function doAttrs(el) {
  if (el.closest('[data-noi18n]')) return;
  let rec = origA.get(el);
  for (const a of ATTRS) { const v = el.getAttribute(a); if (!v) continue;
    if (rec?.[a] && v === rec[a].pt) continue;
    const t = tr(v.trim()); if (t == null) continue;
    rec = rec || {}; rec[a] = {en: v, pt: t}; origA.set(el, rec); el.setAttribute(a, t); }
}
function walk(root) {
  if (root.nodeType === 3) return doText(root);
  if (root.nodeType !== 1) return;
  doAttrs(root);
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT); let n;
  while ((n = w.nextNode())) n.nodeType === 3 ? doText(n) : doAttrs(n);
}
function unwalk() {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT); let n;
  while ((n = w.nextNode())) {
    if (n.nodeType === 3) { const o = orig.get(n); if (o && n.nodeValue === o.pt) n.nodeValue = o.en; continue; }
    const rec = origA.get(n); if (rec) for (const a in rec) if (n.getAttribute(a) === rec[a].pt) n.setAttribute(a, rec[a].en);
  }
}
const mo = new MutationObserver(ms => { if (lang !== 'pt') return;
  for (const m of ms) {
    if (m.type === 'characterData') doText(m.target);
    else if (m.type === 'attributes') doAttrs(m.target);
    else m.addedNodes.forEach(walk);
  }
});
function set(l, save) {
  lang = l === 'pt' ? 'pt' : 'en';
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  if (save) try { localStorage.setItem('vyraLang', lang); } catch (e) {}
  lang === 'pt' ? walk(document.body) : unwalk();
  document.querySelectorAll('.lang [data-l]').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === lang));
  dispatchEvent(new CustomEvent('vyra:lang', {detail: lang}));
}
window.vyraT = s => (lang === 'pt' ? tr(s) ?? s : s);
window.vyraLang = () => lang;
let start = 'en';
try { start = new URLSearchParams(location.search).get('lang') || localStorage.getItem('vyraLang') || ''; } catch (e) {}
if (!start) start = /^pt\b/i.test(navigator.language || '') ? 'pt' : 'en';
mo.observe(document.body, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS});
document.addEventListener('click', e => { const b = e.target.closest('.lang [data-l]'); if (b) set(b.dataset.l, true); });
set(start, false);
})();
