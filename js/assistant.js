// ARNGREN — protótipo acadêmico (SCAMPER)
// A — Assistente virtual Volt (regras simples, sem IA real)

// ---------------- A — Assistente virtual (simulado por regras) ----------------
// Entende pedidos em português, inglês e norueguês e responde no idioma escolhido.
const AI = {
  purpose: [
    [/trabalh|cidade|transport|desloc|faculdade|escola|ir e voltar|diári|\bwork|commut|\bcity\b|school|\bjobb|pendl|skole/, "Transporte diário"],
    [/trilha|passei|lazer|neve|areia|aventura|fim de semana|trail|leisure|weekend|terreng|fritid|\btur\b/, "Lazer e trilha"],
    [/criança|filh|infantil|\bnet[oa]s?\b|kids?\b|menin|child|\bson\b|daughter|grand(son|daughter|child)|\bbarn|gutt|jente|sønn|datter/, "Para crianças"],
    [/jardim|\bgrama\b|gramado|fazenda|sítio|quintal|garden|lawn|\bfarm|\byard|\bhage|plen|gård/, "Casa e jardim"],
    [/aprend|program|educa|estud|céu|estrela|\blua\b|planeta|viage|learn|coding|study|\bstars?\b|\bmoon\b|planet|travel|\blær|stjerne|måne|reise/, "Aprender e explorar"],
    [/presente|brinquedo|divers|jogar|brincar|\bgift|present\b|\btoy|\bgave|leke|moro/, "Diversão e presentes"]
  ],
  cat: [
    [/bicicleta|bike|bicycle|elsykkel|sykkel|pedal/, "Bicicletas Elétricas"],
    [/scooter|moped|\bmotos?\b|motoneta|motorcycle/, "Scooters & Mopeds"],
    [/carr(o|inho) elétric|jipe|jeep|kart|electric car|kids car|elbil|barnebil/, "Carros Elétricos Infantis"],
    [/quadriciclo|\batv\b|\bquad|trator|tractor|traktor|cortador|mower|gressklipper/, "ATV & Jardim"],
    [/robô|robo|\brc\b|controle remoto|remote control|fjernstyrt|tanque|\btank|stridsvogn/, "Robôs & RC"],
    [/telesc|binóc|binocular|kikkert|tradutor|translator|oversetter|gadget/, "Óptica & Gadgets"],
    [/bateria|battery|batteri|carregador|charger|lader|lanterna|flashlight|lykt|acessóri|accessor|tilbehør|solar|solcelle/, "Acessórios"]
  ],
  size: [
    [/compact|dobráv|pequen|apartamento|leve|folding|small|\blight|kompakt|sammenlegg|liten|\blett/, "Compacto"],
    [/grande|espaços|\bbig\b|large|\bstor\b/, "Grande"]
  ]
};
let chatStarted = false, lastNeed = null;
const escapeHTML = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const defaultSugg = () => TL(
  ["Bicicleta para o trabalho até 10 mil", "Presente para criança até 5 mil", "Algo para o jardim", "Quero aprender programação", "Scooter potente", "Como funciona a garantia?"],
  ["Bike for commuting up to 10k", "Gift for a child up to 5k", "Something for the garden", "I want to learn coding", "Powerful scooter", "How does the warranty work?"],
  ["Sykkel til jobben opptil 10 tusen", "Gave til barn opptil 5 tusen", "Noe til hagen", "Jeg vil lære programmering", "Kraftig scooter", "Hvordan fungerer garantien?"]);
const followSugg = () => TL(
  ["Mais barato", "Algo compacto", "Mais potente", "Para crianças", "Para o trabalho"],
  ["Cheaper", "Something compact", "More powerful", "For kids", "For commuting"],
  ["Billigere", "Noe kompakt", "Kraftigere", "Til barn", "Til jobben"]);

function welcomeText() {
  return TL(
    `Olá! Eu sou o <b>Volt</b>, o assistente virtual da ARNGREN. 👋<br>Conte o que você procura, <b>para que vai usar</b> e <b>quanto quer gastar</b>. Se quiser, diga também o tamanho ou a potência. Eu separo as melhores opções para você.<br>Também tiro dúvidas sobre <b>entrega, garantia, trocas e pagamento</b>.<br><small style="color:#595959">Protótipo: as respostas seguem regras simples, sem uma IA real por trás.</small>`,
    `Hi! I'm <b>Volt</b>, ARNGREN's virtual assistant. 👋<br>Tell me what you're looking for, <b>what you'll use it for</b> and <b>how much you want to spend</b>. You can also mention size or power. I'll pick the best options for you.<br>I can also help with <b>delivery, warranty, returns and payment</b>.<br><small style="color:#595959">Prototype: answers follow simple rules, there's no real AI behind them.</small>`,
    `Hei! Jeg er <b>Volt</b>, ARNGRENs virtuelle assistent. 👋<br>Fortell hva du leter etter, <b>hva du skal bruke det til</b> og <b>hvor mye du vil bruke</b>. Du kan også nevne størrelse eller effekt. Jeg finner de beste alternativene for deg.<br>Jeg svarer også på spørsmål om <b>levering, garanti, bytte og betaling</b>.<br><small style="color:#595959">Prototype: svarene følger enkle regler, det er ingen ekte KI bak.</small>`);
}
function openChat() {
  document.getElementById("chat").classList.add("show");
  document.getElementById("aiFab").hidden = true;
  if (!chatStarted) {
    chatStarted = true;
    botSay(welcomeText(), 300);
    setSugg(defaultSugg());
  }
  setTimeout(() => document.getElementById("chatInput").focus(), 50);
}
function resetChat() {
  chatStarted = false; lastNeed = null;
  const log = document.getElementById("chatLog"); if (log) log.innerHTML = "";
  if (document.getElementById("chat").classList.contains("show")) openChat();
  else document.getElementById("chatSugg").innerHTML = "";
}
function closeChat() { document.getElementById("chat").classList.remove("show"); document.getElementById("aiFab").hidden = false; }
function addMsg(who, html) {
  const log = document.getElementById("chatLog");
  const name = who === "bot" ? "Volt" : TL("Você", "You", "Du");
  log.insertAdjacentHTML("beforeend", `<div class="msg ${who}">${who === "bot" ? '<span class="msg-av">' + MASCOT + "</span>" : ""}<span class="who">${name}</span>${html}</div>`);
  log.scrollTop = log.scrollHeight;
}
function botSay(html, delay) {
  const log = document.getElementById("chatLog");
  log.insertAdjacentHTML("beforeend", `<div class="msg bot typing" id="typing"><i>${TL("Volt está digitando...", "Volt is typing...", "Volt skriver...")}</i></div>`);
  log.scrollTop = log.scrollHeight;
  setTimeout(() => { const t = document.getElementById("typing"); if (t) t.remove(); addMsg("bot", html); }, delay === undefined ? 700 : delay);
}
function setSugg(list) { document.getElementById("chatSugg").innerHTML = list.map(s => `<button class="chip" type="button" onclick="ask(this.textContent)">${s}</button>`).join(""); }
function sendChat(e) { e.preventDefault(); const i = document.getElementById("chatInput"), t = i.value.trim(); if (!t) return; i.value = ""; ask(t); }
function ask(t) { addMsg("user", escapeHTML(t)); botSay(answer(t)); }

function parseNeed(text) {
  const t = text.toLowerCase(), need = {};
  const re = /(\d+(?:[.,]\d+)?)\s*(mil\b|k\b|tusen|thousand|watts?|w\b|km|anos?|years?|år)?/g;
  let m;
  while ((m = re.exec(t))) {
    const v = parseFloat(m[1].replace(/\.(?=\d{3})/g, "").replace(",", "."));
    const u = m[2] || "";
    if (/^(mil|k|tusen|thousand)$/.test(u)) need.max = v * 1000;
    else if (/^w/.test(u)) need.minPower = v;
    else if (!u && v >= 100) need.max = v;
  }
  if (need.max) need.max = toNOK(need.max);   // orçamento dito na moeda local → coroas
  if (/potente|forte|rápid|veloz|powerful|strong|\bfast|kraftig|sterk|rask/.test(t) && !need.minPower) need.minPower = 1000;
  for (const [k, rules] of Object.entries(AI)) for (const [rx, val] of rules) if (rx.test(t)) { need[k] = val; break; }
  return need;
}
function findFor(need) {
  return P.filter(p =>
    (need.cat ? p.cat === need.cat : p.cat !== "Acessórios") &&
    (!need.max || p.price <= need.max) &&
    (!need.purpose || p.purpose.includes(need.purpose)) &&
    (!need.size || p.size === need.size) &&
    (!need.minPower || (p.power || 0) >= need.minPower))
  .sort((a, b) => b.stock - a.stock || b.tags.includes("best") - a.tags.includes("best") || (need.max ? b.price - a.price : a.price - b.price));
}

const CAT_PHRASE = {
  "Bicicletas Elétricas": ["bicicletas elétricas", "electric bikes", "elsykler"], "Scooters & Mopeds": ["scooters e mopeds", "scooters and mopeds", "scootere og mopeder"],
  "Carros Elétricos Infantis": ["carros elétricos infantis", "kids' electric cars", "elbiler for barn"], "ATV & Jardim": ["quadriciclos e itens para jardim", "ATVs and garden items", "ATV-er og hageutstyr"],
  "Robôs & RC": ["robôs e controle remoto", "robots and remote-control toys", "roboter og fjernstyrte leker"], "Óptica & Gadgets": ["óptica e gadgets", "optics and gadgets", "optikk og dingser"],
  "Hobby & Colecionáveis": ["hobby e colecionáveis", "hobby items and collectibles", "hobby og samleobjekter"], "Acessórios": ["acessórios", "accessories", "tilbehør"] };
const PURPOSE_PHRASE = {
  "Transporte diário": ["para o dia a dia", "for everyday commuting", "til daglig bruk"], "Lazer e trilha": ["para lazer e trilhas", "for leisure and trails", "til fritid og terreng"],
  "Para crianças": ["para crianças", "for kids", "for barn"], "Casa e jardim": ["para casa e jardim", "for home and garden", "til hus og hage"],
  "Aprender e explorar": ["para aprender e explorar", "for learning and exploring", "for å lære og utforske"], "Diversão e presentes": ["para diversão ou presente", "for fun or as a gift", "til moro eller som gave"] };
const pick = arr => TL(arr[0], arr[1], arr[2]);
function summary(need) {
  let txt = `<b>${need.cat ? pick(CAT_PHRASE[need.cat]) : TL("produtos", "products", "produkter")}</b>`;
  if (need.purpose) txt += ` <b>${pick(PURPOSE_PHRASE[need.purpose])}</b>`;
  const extra = [];
  if (need.size) extra.push(TL("tamanho", "size", "størrelse") + ` <b>${(tr(need.size) || need.size).toLowerCase()}</b>`);
  if (need.minPower) extra.push(TL("com pelo menos", "at least", "minst") + ` <b>${need.minPower} W</b>`);
  if (need.max) extra.push(TL("até", "up to", "opptil") + ` <b>${money(need.max)}</b>`);
  return txt + (extra.length ? ", " + extra.join(", ") : "");
}
function aiProd(p) {
  return `<div class="ai-prod"><span class="imgbox"><img src="${p.src}" alt=""></span><div><b>${tr(p.name)}</b><br>
    <span class="price" style="font-size:12px">${money(p.price)}</span> ${p.stock ? "" : `<span class="stock no">${TL("esgotado", "sold out", "utsolgt")}</span>`}<br>
    <button class="link-btn" onclick="openProduct(${p.id})">${TL("ver detalhes", "see details", "se detaljer")}</button>${p.stock ? ` · <button class="link-btn" onclick="addToCart(${p.id})">${TL("comprar", "buy", "kjøp")}</button>` : ""}</div></div>`;
}

// Perguntas frequentes (atendimento)
const FAQ = [
  [/garantia|defeito|estragou|quebrou|parou de funcionar|warrant|guarantee|defect|broken|garanti|ødelagt/, () => TL(
    "Todos os produtos têm <b>garantia de satisfação</b>. Se algo apresentar defeito, envie o número do pedido pela <b>página de Contato</b> e nossa equipe organiza a troca ou o reparo. Dúvidas técnicas também podem ir para o <b>Fórum de suporte</b>.",
    "Every product comes with a <b>satisfaction guarantee</b>. If something is faulty, send your order number through the <b>Contact page</b> and our team will arrange an exchange or repair. Technical questions can also go to the <b>Support forum</b>.",
    "Alle produkter har <b>fornøydgaranti</b>. Hvis noe er defekt, sender du ordrenummeret via <b>kontaktsiden</b>, så ordner teamet vårt bytte eller reparasjon. Tekniske spørsmål kan også stilles i <b>supportforumet</b>.")],
  [/entrega|frete|prazo|chega|envio|enviar|deliver|shipping|\bship|levering|frakt/, () => TL(
    "O frete é <b>grátis acima de kr 5 000</b>. Produtos em estoque são enviados em até <b>24 horas</b>, e o prazo final depende do seu endereço. Você vê o valor e o prazo ao informar o CEP no carrinho.",
    "Shipping is <b>free over kr 5 000</b>. Items in stock ship within <b>24 hours</b>, and the final delivery time depends on your address. You'll see the cost and time when you enter your postcode in the cart.",
    "Frakten er <b>gratis over kr 5 000</b>. Varer på lager sendes innen <b>24 timer</b>, og leveringstiden avhenger av adressen din. Du ser pris og leveringstid når du skriver inn postnummeret i handlekurven.")],
  [/troca|trocar|devolu|devolver|arrependi|return|exchange|refund|retur|bytte|angre/, () => TL(
    "Você tem <b>30 dias</b> para trocar ou devolver. Basta abrir um pedido de troca pela <b>página de Contato</b>, informando o número do pedido.",
    "You have <b>30 days</b> to exchange or return an item. Just open a request on the <b>Contact page</b> with your order number.",
    "Du har <b>30 dagers</b> bytte- og returrett. Send en forespørsel via <b>kontaktsiden</b> med ordrenummeret ditt.")],
  [/pagamento|pagar|pix|cart[aã]o|boleto|parcel|payment|\bpay\b|\bcard|betal|\bkort|vipps/, () => TL(
    "Aceitamos <b>cartão, Pix e boleto</b>. Tudo é feito em uma única tela no carrinho, sem cadastro obrigatório.",
    "We accept <b>card, Pix and boleto</b>. Everything happens on a single screen in the cart, with no sign-up required.",
    "Vi tar imot <b>kort, Pix og boleto</b>. Alt skjer på én side i handlekurven, uten at du må registrere deg.")],
  [/hor[aá]rio|atendimento|telefone|falar com|contato|humano|atendente|opening|hours|support|contact|human|åpningstid|kundeservice|kontakt/, () => TL(
    "Nosso atendimento funciona de <b>segunda a sexta, das 9h às 17h</b>, e aos <b>sábados, das 10h às 14h</b>. Fora desse horário, deixe sua mensagem pelo formulário na página de Contato.",
    "Our team is available <b>Monday to Friday, 9am–5pm</b>, and on <b>Saturdays, 10am–2pm</b>. Outside those hours, leave a message using the form on the Contact page.",
    "Kundeservice er åpen <b>mandag til fredag kl. 9–17</b> og <b>lørdag kl. 10–14</b>. Utenom åpningstiden kan du legge igjen en melding i skjemaet på kontaktsiden.")]
];
const PLURAL = (n, um, varios) => n === 1 ? um : varios;

function answer(text) {
  const t = text.toLowerCase();
  if (/obrigad|valeu|brigad|thank|\btakk/.test(t)) return TL("Por nada! Se precisar de mais alguma coisa, é só chamar. 😉", "You're welcome! Just call me if you need anything else. 😉", "Bare hyggelig! Si fra hvis du trenger noe mer. 😉");
  for (const [rx, resp] of FAQ) if (rx.test(t)) return convertPrices(resp());

  let need;
  if (/mais barat|menor pre[cç]o|economi|cheap|less expensive|billig/.test(t)) {
    if (!lastNeed) return TL("Claro! Primeiro me diga o que você procura, por exemplo: <i>“scooter até 15 mil”</i>. Aí eu busco as opções mais em conta.",
      "Sure! First tell me what you're looking for, for example: <i>“scooter up to 15k”</i>. Then I'll find the cheapest options.",
      "Selvfølgelig! Fortell først hva du leter etter, for eksempel: <i>«scooter opptil 15 tusen»</i>. Så finner jeg de billigste alternativene.");
    const l = findFor(lastNeed);
    need = { ...lastNeed, max: l.length ? l[0].price - 1 : lastNeed.max };
  } else {
    need = parseNeed(text);
    if (lastNeed && Object.keys(need).length && !need.purpose && !need.cat) need = { ...lastNeed, ...need };
  }

  if (!Object.keys(need).length) {
    if (/^(oi|olá|ola|bom dia|boa tarde|boa noite|e aí|e ai|hello|hey|\bhi\b|hei|god dag|god morgen)/.test(t))
      return TL("Olá! 👋 O que você está procurando hoje? Por exemplo: <i>“bicicleta dobrável até 10 mil”</i>.",
        "Hi! 👋 What are you looking for today? For example: <i>“folding bike up to 10k”</i>.",
        "Hei! 👋 Hva leter du etter i dag? For eksempel: <i>«sammenleggbar sykkel opptil 10 tusen»</i>.");
    const words = t.split(/[^a-zà-úøæå0-9]+/).filter(w => w.length > 3);
    const hits = P.filter(p => words.some(w => (p.name + " " + p.desc + " " + tr(p.name) + " " + tr(p.desc)).toLowerCase().includes(w)));
    if (hits.length) {
      const k = Math.min(hits.length, 3);
      return TL(`Encontrei ${PLURAL(k, "este produto relacionado", "estes produtos relacionados")} a “${escapeHTML(text)}”:`,
        `I found ${PLURAL(k, "this product", "these products")} related to “${escapeHTML(text)}”:`,
        `Jeg fant ${PLURAL(k, "dette produktet", "disse produktene")} knyttet til «${escapeHTML(text)}»:`) + hits.slice(0, 3).map(aiProd).join("");
    }
    setSugg(defaultSugg());
    return TL("Não consegui entender o pedido. 🤔 Pode me dizer <b>para que vai usar</b> (trabalho, lazer, crianças, jardim, aprender...) e <b>quanto quer gastar</b>?",
      "I didn't quite get that. 🤔 Could you tell me <b>what you'll use it for</b> (commuting, leisure, kids, garden, learning...) and <b>how much you want to spend</b>?",
      "Det skjønte jeg ikke helt. 🤔 Kan du fortelle <b>hva du skal bruke det til</b> (jobb, fritid, barn, hage, læring ...) og <b>hvor mye du vil bruke</b>?");
  }

  lastNeed = need;
  let list = findFor(need), relaxed = "", used = need;
  if (!list.length) {
    for (const k of ["size", "minPower", "purpose", "cat"]) {
      if (need[k] === undefined) continue;
      const n2 = { ...need }; delete n2[k];
      const l2 = findFor(n2);
      if (l2.length) { list = l2; relaxed = k; used = n2; break; }
    }
  }
  // prioriza produtos cujo nome/descrição têm as palavras do pedido (ex.: "programação" → robôs)
  const qw = t.split(/[^a-zà-úøæå0-9]+/).filter(w => w.length > 4).map(w => w.slice(0, 6));
  if (qw.length) {
    const score = p => qw.filter(w => (p.name + " " + p.desc + " " + p.sub + " " + tr(p.name) + " " + tr(p.desc)).toLowerCase().includes(w)).length;
    list = [...list].sort((a, b) => score(b) - score(a));
  }
  setSugg(followSugg());
  const sum = summary(need);

  if (!list.length) {
    const semPreco = findFor({ ...need, max: undefined });
    if (need.max && semPreco.length) {
      const menor = semPreco.reduce((a, b) => (a.price < b.price ? a : b));
      return TL(`Procurei ${sum}, mas nada cabe nesse orçamento. 😕 A opção mais em conta custa <b>${money(menor.price)}</b>:`,
        `I looked for ${sum}, but nothing fits that budget. 😕 The cheapest option costs <b>${money(menor.price)}</b>:`,
        `Jeg lette etter ${sum}, men ingenting passer budsjettet. 😕 Det rimeligste alternativet koster <b>${money(menor.price)}</b>:`) + aiProd(menor);
    }
    return TL(`Procurei ${sum}, mas não encontrei nada parecido. 😕 Tente descrever de outro jeito ou escolha uma das sugestões abaixo.`,
      `I looked for ${sum}, but couldn't find anything similar. 😕 Try describing it differently or pick one of the suggestions below.`,
      `Jeg lette etter ${sum}, men fant ikke noe lignende. 😕 Prøv å beskrive det på en annen måte, eller velg et av forslagene under.`);
  }

  const names = { size: ["o tamanho", "size", "størrelse"], minPower: ["a potência", "power", "effekt"], purpose: ["a finalidade", "purpose", "formål"], cat: ["a categoria", "category", "kategori"] };
  const n = list.length, shown = Math.min(n, 3);
  const intro = relaxed
    ? TL(`Não encontrei ${sum} com todos esses critérios. Mas, sem considerar <b>${names[relaxed][0]}</b>, ${PLURAL(shown, "esta opção chega perto", "estas opções chegam perto")}:`,
        `I couldn't find ${sum} matching all of that. But if I ignore <b>${names[relaxed][1]}</b>, ${PLURAL(shown, "this option comes close", "these options come close")}:`,
        `Jeg fant ikke ${sum} som oppfyller alt. Men hvis jeg ser bort fra <b>${names[relaxed][2]}</b>, ${PLURAL(shown, "kommer dette alternativet nær", "kommer disse alternativene nær")}:`)
    : TL(`Procurando ${sum}, encontrei <b>${n}</b> ${PLURAL(n, "opção", "opções")}. ${PLURAL(shown, "Minha sugestão", "Minhas sugestões")}:`,
        `Looking for ${sum}, I found <b>${n}</b> ${PLURAL(n, "option", "options")}. ${PLURAL(shown, "My suggestion", "My suggestions")}:`,
        `Jeg lette etter ${sum} og fant <b>${n}</b> ${PLURAL(n, "alternativ", "alternativer")}. ${PLURAL(shown, "Mitt forslag", "Mine forslag")}:`);
  const more = n > 1 ? TL(`Ver os ${n} produtos na loja »`, `See all ${n} products in the shop »`, `Se alle ${n} produktene i butikken »`) : TL("Ver na loja »", "See it in the shop »", "Se i butikken »");
  return intro + list.slice(0, 3).map(aiProd).join("") +
    `<p style="margin-top:6px"><button class="btn btn-blue" onclick='applyNeed(${JSON.stringify(used)})'>${more}</button></p>`;
}

function applyNeed(need) {
  setMode("shop"); resetFilters(true);
  document.querySelectorAll("#fCats input").forEach(i => i.checked = need.cat ? i.value === need.cat : i.value !== "Acessórios");
  if (need.purpose) document.getElementById("fPurpose").value = need.purpose;
  if (need.size) document.getElementById("fSize").value = need.size;
  if (need.minPower) document.getElementById("fPower").value = need.minPower >= 1000 ? "1000-99999" : need.minPower >= 500 ? "500-1000" : "";
  if (need.max) { const fp = document.getElementById("fPrice"); fp.value = Math.min(need.max, +fp.max); }
  applyFilters("Sugestões do assistente virtual");
  document.getElementById("resultsBlock").scrollIntoView({ behavior: "smooth" });
}
