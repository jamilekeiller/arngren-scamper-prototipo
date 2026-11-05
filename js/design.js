// ARNGREN — protótipo acadêmico (SCAMPER)
// Design: fotos, ícones, avaliações, página de produto, banner, acessibilidade, tour e antes/depois

// =====================================================================
// Foto substituta quando a imagem do arngren.net não carrega
// =====================================================================
function photoFallback(label) {
  const t = (label || "Foto indisponível").replace(/[<>&"]/g, "").slice(0, 34);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"><rect width="160" height="120" fill="#ecefec"/>
    <g fill="none" stroke="#6f809a" stroke-width="3"><rect x="56" y="30" width="48" height="36" rx="5"/><circle cx="80" cy="48" r="10"/><path d="M68 30l5-7h14l5 7"/></g>
    <text x="80" y="88" font-family="Verdana" font-size="9" fill="#3d495a" text-anchor="middle">${t}</text>
    <text x="80" y="102" font-family="Verdana" font-size="7" fill="#595959" text-anchor="middle">foto indisponível no momento</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
document.addEventListener("error", e => {
  const img = e.target;
  if (!img || img.tagName !== "IMG" || img.dataset.fb) return;
  if (img.src.startsWith("https://arngren.net/")) { img.src = ARCHIVE(img.src); return; }   // 1ª alternativa: Internet Archive
  img.dataset.fb = "1"; img.src = photoFallback(img.alt);                                   // 2ª alternativa: foto substituta
}, true);

// =====================================================================
// Ícones (S — ícones próprios no lugar de emojis)
// =====================================================================
const ICON = {
  cart: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h3l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L22 7H7.2L6.6 4.2A1.5 1.5 0 0 0 5.1 3H3zm7 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>',
  compare: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 2h2v3h6l3 8a4 4 0 0 1-8 0l2.6-7H13v14h4v2H7v-2h4V6H8.4L11 13a4 4 0 0 1-8 0l3-8h5V2zM5 13h4l-2-5.3L5 13zm12 0h4l-2-5.3L17 13z"/></svg>',
  shield: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zm-1.2 13.6l5.9-5.9-1.4-1.4-4.5 4.5-2.1-2.1-1.4 1.4 3.5 3.5z"/></svg>',
  truck: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5h12v3h4l4 5v4h-2a3 3 0 0 1-6 0h-4a3 3 0 0 1-6 0H2V5zm14 5v3h4.3L18 10h-2zM7 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
  refresh: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 0 1 7.4 5H22l-3.5 4.5L15 9h2.2A6 6 0 1 0 18 14h2.1A8 8 0 1 1 12 4z"/></svg>',
  chat: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 6v2h2V9H7zm4 0v2h2V9h-2zm4 0v2h2V9h-2z"/></svg>'
};

// Mascote original do assistente: o robô "Volt"
const MASCOT = `<svg viewBox="0 0 40 40" class="mascot" aria-hidden="true"><line x1="20" y1="4" x2="20" y2="9" stroke="#001f4d" stroke-width="2"/><circle cx="20" cy="4" r="2.6" fill="#9bbae8" stroke="#001f4d"/><rect x="5" y="9" width="30" height="23" rx="7" fill="#1c4e9a" stroke="#001f4d" stroke-width="1.5"/><rect x="9" y="13" width="22" height="14" rx="4" fill="#eaf2ff"/><circle cx="15" cy="19.5" r="2.4" fill="#001f4d"/><circle cx="25" cy="19.5" r="2.4" fill="#001f4d"/><path d="M15 23.5q5 3 10 0" stroke="#001f4d" stroke-width="1.6" fill="none" stroke-linecap="round"/><rect x="2" y="16" width="3" height="9" rx="1.5" fill="#0d397a"/><rect x="35" y="16" width="3" height="9" rx="1.5" fill="#0d397a"/><rect x="13" y="32" width="14" height="5" rx="2" fill="#0d397a"/></svg>`;

function emptyHTML(t, sub) {
  return `<div class="empty"><div class="empty-mascot">${MASCOT}</div><b>${t}</b>${sub ? `<br><small>${sub}</small>` : ""}</div>`;
}

// =====================================================================
// C — Avaliações com estrelas
// =====================================================================
const REVIEW_POOL = [
  ["Ingrid S.", 5, "Chegou rápido e bem embalado. Exatamente como na descrição."],
  ["Lars M.", 4, "Muito bom pelo preço. O manual podia ser mais claro, mas o guia da comunidade ajudou."],
  ["Ana P.", 5, "Meus filhos adoraram! Recomendo."],
  ["Ole K.", 3, "Bom produto, mas no frio a bateria dura um pouco menos."],
  ["Sofie H.", 4, "Acabamento bom. O atendimento respondeu minha dúvida no mesmo dia."],
  ["Erik B.", 5, "Melhor compra do ano. Já indiquei para dois amigos."]
];
function reviewsOf(p) {
  const base = [0, 1, 2].map(i => REVIEW_POOL[(p.id * 2 + i) % REVIEW_POOL.length]);
  return [...(store.get("arn_reviews", {})[p.id] || []), ...base];
}
function ratingOf(p) {
  const extra = 4 + (p.id * 7) % 40, dist = { 5: Math.round(extra * (0.45 + (p.id % 3) * 0.08)) };
  dist[4] = Math.round((extra - dist[5]) * 0.7);
  dist[3] = Math.round((extra - dist[5] - dist[4]) * 0.7);
  dist[2] = extra - dist[5] - dist[4] - dist[3];
  dist[1] = 0;
  reviewsOf(p).forEach(r => dist[r[1]]++);
  const count = [1, 2, 3, 4, 5].reduce((s, k) => s + dist[k], 0);
  const avg = [1, 2, 3, 4, 5].reduce((s, k) => s + k * dist[k], 0) / count;
  return { avg: Math.round(avg * 10) / 10, count, dist };
}
const starsBare = r => `<span class="st" style="--r:${r}" role="img" aria-label="${r} de 5 estrelas"></span>`;
function starsHTML(p) { const r = ratingOf(p); return `<div class="stars">${starsBare(r.avg)} <small>${r.avg.toFixed(1)} (${r.count})</small></div>`; }
function reviewsHTML(p) {
  const rt = ratingOf(p);
  return `<div class="rev-summary sc-box">
      <div class="rev-avg"><b>${rt.avg.toFixed(1)}</b>${starsBare(rt.avg)}<small>${rt.count} avaliações</small></div>
      <div class="rev-bars">${[5, 4, 3, 2, 1].map(k => `<div><span>${k} ★</span><i><em style="width:${Math.round(rt.dist[k] / rt.count * 100)}%"></em></i><small>${rt.dist[k]}</small></div>`).join("")}</div>
      <span class="sc">C · Produto + avaliações dos clientes</span>
    </div>
    ${reviewsOf(p).map(r => `<div class="review"><b>${escapeHTML(r[0])}</b> ${starsBare(r[1])} <small>${r[3] || "✔ Compra verificada"}</small><p>${escapeHTML(r[2])}</p></div>`).join("")}
    <form class="reply-form" onsubmit="addReview(event, ${p.id})">
      <b>Escreva sua avaliação</b>
      <label>Nota <select id="rvStars"><option value="5">★★★★★ Excelente</option><option value="4">★★★★ Muito bom</option><option value="3">★★★ Bom</option><option value="2">★★ Regular</option><option value="1">★ Ruim</option></select></label>
      <textarea id="rvText" required rows="3" placeholder="Conte o que achou do produto..."></textarea>
      <button class="btn btn-buy">Publicar avaliação</button>
    </form>`;
}
function addReview(e, id) {
  e.preventDefault();
  const all = store.get("arn_reviews", {});
  (all[id] = all[id] || []).unshift([nick(), +document.getElementById("rvStars").value, document.getElementById("rvText").value.trim(), "Agora mesmo"]);
  store.set("arn_reviews", all);
  openProduct(id); pdTab("rev");
  toast("Avaliação publicada", "Obrigado por ajudar outros clientes!");
}

// =====================================================================
// Página de produto: galeria com zoom, abas, barra fixa, calculadora
// =====================================================================
const GALLERY = {
  2: ["elfatbike-rosa-84515_Fat_bike_1000w_48v_2018mod_n__med_Hydraulisk_1-165x92.jpg"],
  3: ["elsykkel-3hjul-foran-9-134x114.jpg", "elsykkel-3hjul-1-123x67.jpg"],
  9: ["willy-lite-6-171x113.jpg", "elbil-WILLY-435_1769773702-169x97.jpg"],
  11: ["elbil-GRONN-LANDROVER-lG2PWdts-86x77.jpg"],
  21: ["Digital-Kikkert.stor.B1000414482-73x61.jpg"]
};
const FORUM_OF = { "Bicicletas Elétricas": "veic", "Scooters & Mopeds": "veic", "Carros Elétricos Infantis": "veic", "ATV & Jardim": "veic",
  "Robôs & RC": "eletro", "Óptica & Gadgets": "eletro", "Hobby & Colecionáveis": "hobby", "Acessórios": "suporte" };

function calcText(km, d) {
  if (d > km) return `Seu trajeto (${d} km) é maior que a autonomia (${km} km): seria preciso recarregar no caminho.`;
  return `Com uma carga você faz <b>${Math.floor(km / d)} dia(s)</b> de trajeto · recargas por semana (5 dias): <b>${Math.ceil(5 * d / km)}</b> · no inverno, cerca de <b>${Math.max(1, Math.floor(km * 0.7 / d))} dia(s)</b> por carga.`;
}
function rangeCalc(p) {
  const a = p.specs.Autonomia;
  if (!a || !/km/.test(a)) return "";
  const km = num(a);
  return `<div class="calc sc-box"><b>Calculadora de autonomia</b> <span class="sc">P · Calculadora de autonomia</span><br>
    <label>Seu trajeto por dia (ida e volta): <input type="number" min="1" max="300" value="12" oninput="document.getElementById('calcOut').innerHTML = calcText(${km}, Math.max(1, +this.value || 1))"> km</label>
    <div class="calc-out" id="calcOut">${calcText(km, 12)}</div></div>`;
}
function openProduct(id) {
  pushHist(id);
  const p = byId(id), accs = p.acc.map(byId), rt = ratingOf(p);
  const related = mainProducts().filter(x => x.id !== p.id && x.interests.some(i => p.interests.includes(i))).slice(0, 4);
  const gal = [p.src, ...(GALLERY[p.id] || []).map(IMG)];
  const qs = allTopics().filter(t => t.cat === FORUM_OF[p.cat]).sort((a, b) => b.id - a.id).slice(0, 4);
  const nGuides = GUIDES.filter(g => g.products.includes(p.id)).length;
  document.getElementById("modalTitle").textContent = p.name + " — ARNGREN.net";
  document.getElementById("modalBody").innerHTML = `
    <div class="pd">
      <div>
        <div class="big zoomable" onmousemove="zoomMove(event)" onmouseleave="zoomOut(event)"><img id="pdImg" src="${p.src}" alt="${p.name}"></div>
        <div class="thumbs">${gal.map((g, i) => `<button class="${i ? "" : "on"}" onclick="pdPick(this, '${g}')" aria-label="Foto ${i + 1}"><img src="${g}" alt="${p.name}"></button>`).join("")}</div>
        <small class="muted">Passe o mouse na foto para ampliar <span class="sc">A · Galeria com zoom</span></small>
      </div>
      <div>
        <div class="meta">${p.cat} » ${p.sub}</div>
        <h2>${p.name}</h2>
        ${starsHTML(p)} <button class="link-btn" onclick="pdTab('rev')">ver avaliações</button>
        <div class="price" style="font-size:20px;margin:4px 0">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</div>
        ${rareSeal(p)}
        <p>${p.desc}</p>
        <div class="stock ${p.stock ? "ok" : "no"}">${p.stock ? "● Em estoque — envio em 24h" : "● Esgotado"}</div>
        <p class="buy-row" id="pdBuy">
          <button class="btn btn-buy" ${p.stock ? "" : "disabled"} onclick="addToCart(${p.id})">Comprar</button>
          <button class="btn" onclick="toggleCompare(${p.id})">${ICON.compare} ${compare.includes(p.id) ? "Remover da" : "Adicionar à"} comparação</button>
        </p>
        <div class="seal-line">${ICON.shield} <b>Compra garantida</b> — satisfação garantida ou troca grátis.</div>
        ${rangeCalc(p)}
      </div>
    </div>
    <div class="tabs sc-box" role="tablist">
      <button class="on" data-t="desc" onclick="pdTab('desc')">Descrição e acessórios</button>
      <button data-t="specs" onclick="pdTab('specs')">Ficha técnica e comparação</button>
      <button data-t="rev" onclick="pdTab('rev')">Avaliações (${rt.count})</button>
      <button data-t="guides" onclick="pdTab('guides')">Guias de montagem (${nGuides})</button>
      <button data-t="qa" onclick="pdTab('qa')">Dúvidas (${qs.length})</button>
      <span class="sc">R · Abas na página de produto</span>
    </div>
    <div class="tab-panel" data-p="desc">
      <p>${p.desc}</p>
      ${accs.length ? `<div class="sc-box">
        <div class="section-sub">Acessórios compatíveis <span class="sc">C · Veículos + Acessórios</span></div>
        <div class="acc-list">${accs.map(a => `<div class="acc-item"><span class="imgbox"><img src="${a.src}" alt="${a.name}"></span><div><b>${a.name}</b><br><span class="price" style="font-size:12px">${fmt(a.price)}</span><br>
          ${a.stock ? `<button class="link-btn" onclick="addToCart(${a.id})">+ adicionar</button>` : `<span class="stock no">Esgotado</span>`}</div></div>`).join("")}</div>
        <p style="margin-top:6px"><button class="btn btn-blue" onclick="addKit(${p.id})">Comprar kit completo (produto + acessórios)</button></p></div>` : ""}
      ${related.length ? `<div class="section-sub">Quem gosta de ${p.interests.join(" e ")} também viu</div>
        <div class="acc-list">${related.map(r => `<div class="acc-item"><span class="imgbox"><img src="${r.src}" alt="${r.name}"></span><div><b>${r.name}</b><br><button class="link-btn" onclick="openProduct(${r.id})">ver produto »</button></div></div>`).join("")}</div>` : ""}
    </div>
    <div class="tab-panel" data-p="specs" hidden>${specsTable(p)}${similarTable(p)}</div>
    <div class="tab-panel" data-p="rev" hidden>${reviewsHTML(p)}</div>
    <div class="tab-panel" data-p="guides" hidden>${guidesFor(p) || emptyHTML("Ainda não há guias para este produto.", "Monte o seu e compartilhe na comunidade!")}</div>
    <div class="tab-panel" data-p="qa" hidden>${topicRows(qs)}
      <p style="margin-top:6px"><button class="btn btn-buy" onclick="askProduct(${p.id})">Fazer uma pergunta sobre este produto</button></p></div>
    <div class="sticky-buy" id="stickyBuy" hidden>
      <span class="imgbox"><img src="${p.src}" alt="${p.name}"></span><b>${p.name}</b><span class="price">${fmt(p.price)}</span>
      <button class="btn btn-buy" ${p.stock ? "" : "disabled"} onclick="addToCart(${p.id})">Comprar</button>
      <span class="sc">A · Barra de compra fixa</span>
    </div>`;
  show("modal");
  const body = document.querySelector("#modal .win-body");
  body.scrollTop = 0;
  if (window.IntersectionObserver) {
    if (openProduct.io) openProduct.io.disconnect();
    openProduct.io = new IntersectionObserver(([en]) => { const sb = document.getElementById("stickyBuy"); if (sb) sb.hidden = en.isIntersecting; }, { root: body });
    openProduct.io.observe(document.getElementById("pdBuy"));
  }
}
function pdTab(t) {
  document.querySelectorAll("#modal .tabs button").forEach(b => b.classList.toggle("on", b.dataset.t === t));
  document.querySelectorAll("#modal .tab-panel").forEach(pn => pn.hidden = pn.dataset.p !== t);
  const tabs = document.querySelector("#modal .tabs");
  if (tabs) tabs.scrollIntoView({ block: "start", behavior: "smooth" });
}
function pdPick(btn, src) {
  document.getElementById("pdImg").src = src;
  btn.parentElement.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === btn));
}
function zoomMove(e) {
  const box = e.currentTarget, img = box.querySelector("img"), r = box.getBoundingClientRect();
  img.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
  img.style.transform = "scale(2.2)";
}
function zoomOut(e) { e.currentTarget.querySelector("img").style.transform = ""; }
function askProduct(id) {
  const p = byId(id);
  closeAll(); commView = "new"; commArg = { cat: FORUM_OF[p.cat], title: "Dúvida sobre " + p.name }; setMode("comm");
}

// =====================================================================
// R — Banner rotativo + atalhos de categoria com foto
// =====================================================================
const SLIDES = [
  { k: "NOVIDADES 2026!", t: 'Elsykler, scooters e <em>carros elétricos</em> para toda a família', d: "Busca por categoria, comparação de modelos e acessórios compatíveis em cada produto.", b: "Ver bicicletas elétricas »", a: "filterCat('Bicicletas Elétricas')", img: "elsykkel-scooter-85876_Whizzy_El_Sykkel_Es2_Norges_R_este_3-391x263.jpg" },
  { k: "PARA COLECIONADORES", t: 'Itens raros na <em>Vitrine 3D</em>', d: "Locomotivas a vapor, robôs clássicos e edições limitadas em uma vitrine giratória.", b: "Abrir a Vitrine 3D »", a: "setMode('mag'); setMagFormat('3d')", img: "dampmaskin-tog-TrackShack-Accucraft-S78-2-Sealion-681-235x158.jpg" },
  { k: "COMUNIDADE", t: 'Aprenda a <em>montar</em> com quem entende', d: "Guias passo a passo, fórum de suporte e projetos de outros entusiastas.", b: "Entrar na comunidade »", a: "setMode('comm')", img: "ROBOT-ARM.thumb_3940_image1_robot_arm-162x154.jpg" },
  { k: "OFERTAS DA SEMANA", t: 'Até <em>25% off</em> em robôs, fatbikes e scooters', d: "Ofertas válidas até domingo — veja a contagem regressiva.", b: "Ver ofertas »", a: "quickTag('offer')", img: "elsykke-fatbike-stor-84760_Fat_bike_1000w_48v_2018mod_n__med_Hydraulisk_1-236x144.jpg" }
];
let slideIdx = 0, slideTimer = null;
function renderSlides() {
  document.getElementById("slides").innerHTML = SLIDES.map((s, i) => `
    <div class="slide${i === 0 ? " on" : ""}" aria-hidden="${i !== 0}">
      <div class="txt"><span class="starburst">${s.k}</span>${i === 0 ? `<h1>${s.t}</h1>` : `<h2 class="h">${s.t}</h2>`}<p>${s.d}</p>
        <button class="btn btn-buy" onclick="${s.a}">${s.b}</button></div>
      <div class="img"><img src="${IMG(s.img)}" alt=""></div>
    </div>`).join("");
  document.getElementById("dots").innerHTML = SLIDES.map((_, i) => `<button class="${i === 0 ? "on" : ""}" onclick="slideTo(${i})" aria-label="Destaque ${i + 1}"></button>`).join("");
  const hero = document.getElementById("hero");
  hero.onmouseenter = () => clearInterval(slideTimer);
  hero.onmouseleave = startSlides;
  startSlides();
}
function slideTo(i) {
  slideIdx = (i + SLIDES.length) % SLIDES.length;
  document.querySelectorAll("#slides .slide").forEach((s, k) => { s.classList.toggle("on", k === slideIdx); s.setAttribute("aria-hidden", k !== slideIdx); });
  document.querySelectorAll("#dots button").forEach((d, k) => d.classList.toggle("on", k === slideIdx));
}
function slideGo(d) { slideTo(slideIdx + d); startSlides(); }
function startSlides() { clearInterval(slideTimer); slideTimer = setInterval(() => slideTo(slideIdx + 1), 6000); }

// =====================================================================
// M — Contagem regressiva das ofertas (até domingo 23:59)
// =====================================================================
function tickCountdown() {
  const el = document.getElementById("countdown"); if (!el) return;
  const now = new Date(), end = new Date(now);
  end.setDate(now.getDate() + ((7 - now.getDay()) % 7)); end.setHours(23, 59, 59, 0);
  let s = Math.max(0, Math.floor((end - now) / 1000));
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600); s %= 3600;
  const m = Math.floor(s / 60); s %= 60;
  el.textContent = `⏱ termina em ${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

// =====================================================================
// S/A — Acessibilidade: tamanho do texto, alto contraste, modo escuro
// =====================================================================
function setZoom(d) {
  const z = d === 0 ? 1 : Math.min(1.3, Math.max(0.9, Math.round((store.get("arn_zoom", 1) + d * 0.1) * 10) / 10));
  store.set("arn_zoom", z); applyPrefs();
}
function toggleHC() { store.set("arn_hc", !store.get("arn_hc", false)); applyPrefs(); }
function toggleDark() { store.set("arn_dark", !store.get("arn_dark", false)); applyPrefs(); }
function applyPrefs() {
  document.querySelector(".page").style.zoom = store.get("arn_zoom", 1);
  document.body.classList.toggle("hc", store.get("arn_hc", false));
  document.body.classList.toggle("dark", store.get("arn_dark", false));
  document.getElementById("darkBtn").textContent = store.get("arn_dark", false) ? "☀ Modo claro" : "🌙 Modo escuro";
  document.getElementById("hcBtn").setAttribute("aria-pressed", store.get("arn_hc", false));
}

// =====================================================================
// M — Animações: produto "voa" até o carrinho; tela de carregando
// =====================================================================
function flyToCart(id) {
  const ev = window.event, t = ev && ev.target && ev.target.closest ? ev.target : null;
  const cartBtn = document.querySelector(".hdr-btn.cart-btn");
  if (!t || !cartBtn) return;
  const scope = t.closest(".card, .pd, .acc-item, .ai-prod, .mag-text, .sticky-buy, .compare-table td, .v-buy, .cart-line");
  let img = scope && scope.classList.contains("v-buy") ? document.querySelector(".v-item.front img")
          : scope && scope.classList.contains("mag-text") ? document.querySelector(".mag-visual img")
          : scope && scope.querySelector("img");
  if (!img) return;
  const a = img.getBoundingClientRect(), b = cartBtn.getBoundingClientRect();
  if (!a.width) return;
  const f = img.cloneNode();
  f.className = "fly"; f.removeAttribute("id");
  Object.assign(f.style, { left: a.left + "px", top: a.top + "px", width: a.width + "px", height: a.height + "px", transform: "none" });
  document.body.appendChild(f);
  requestAnimationFrame(() => requestAnimationFrame(() => Object.assign(f.style, { left: b.left + b.width / 2 - 12 + "px", top: b.top + 2 + "px", width: "24px", height: "24px", opacity: ".4" })));
  setTimeout(() => { f.remove(); cartBtn.classList.add("bump"); setTimeout(() => cartBtn.classList.remove("bump"), 450); }, 720);
}
let curMode = "shop";
function showLoading() {
  const l = document.getElementById("xpLoading");
  l.hidden = false;
  clearTimeout(showLoading.t);
  showLoading.t = setTimeout(() => l.hidden = true, 600);
}

// =====================================================================
// P — Perfis com níveis, eventos com mapa
// =====================================================================
function completeGuide(id) {
  closeAll();
  toast("Guia concluído! 🎉", "Mostre o resultado em Projetos dos membros.");
}
const EVENTS = [
  { id: 1, t: "Encontro de drones e FPV", city: "Oslo", date: "15/11/2026", lat: 59.9139, lon: 10.7522, d: "Voos livres, corrida FPV para iniciantes e oficina de calibração." },
  { id: 2, t: "Dia do vapor vivo", city: "Bergen", date: "22/11/2026", lat: 60.3913, lon: 5.3221, d: "Locomotivas e máquinas a vapor funcionando, com troca de peças entre colecionadores." },
  { id: 3, t: "Feira de robótica para crianças", city: "Trondheim", date: "29/11/2026", lat: 63.4305, lon: 10.3951, d: "Oficinas de montagem do braço robótico e programação com blocos." },
  { id: 4, t: "Passeio de inverno de elsykkel", city: "Stavanger", date: "06/12/2026", lat: 58.9700, lon: 5.7331, d: "Pedal de 20 km com dicas de bateria no frio." },
  { id: 5, t: "Mostra de colecionáveis dos anos 2000", city: "Tromsø", date: "13/12/2026", lat: 69.6492, lon: 18.9553, d: "Robôs clássicos, edições limitadas e itens raros." }
];
let evSel = null;
const mapURL = ev => ev
  ? `https://www.openstreetmap.org/export/embed.html?bbox=${ev.lon - 0.6},${ev.lat - 0.3},${ev.lon + 0.6},${ev.lat + 0.3}&layer=mapnik&marker=${ev.lat},${ev.lon}`
  : "https://www.openstreetmap.org/export/embed.html?bbox=3.5,57.6,31.5,71.4&layer=mapnik";
function eventsHTML() {
  const going = store.get("arn_going", []);
  return `<div class="box sc-box"><h2 class="box-title">Eventos e encontros <span class="sc">P · Mapa de eventos</span></h2><div class="box-body">
    <div class="events">
      <iframe id="evMap" title="Mapa dos eventos" src="${mapURL(EVENTS.find(e => e.id === evSel))}" loading="lazy"></iframe>
      <div>${EVENTS.map(e => `<div class="ev ${e.id === evSel ? "on" : ""}" onclick="showEvent(${e.id})">
        <b>📍 ${e.t}</b><br><small>${e.city} · ${e.date}</small><p>${e.d}</p>
        <button class="btn ${going.includes(e.id) ? "btn-buy" : ""}" onclick="event.stopPropagation(); toggleGoing(${e.id})">${going.includes(e.id) ? "✔ Vou participar" : "Quero ir"}</button>
        <small>${12 + e.id * 9 + (going.includes(e.id) ? 1 : 0)} confirmados</small></div>`).join("")}</div>
    </div>
    <small class="muted">Eventos fictícios, criados para o protótipo. Mapa: © OpenStreetMap.</small>
  </div></div>`;
}
function showEvent(id) { evSel = id; renderComm("events"); }
function toggleGoing(id) {
  const g = store.get("arn_going", []);
  store.set("arn_going", g.includes(id) ? g.filter(x => x !== id) : [...g, id]);
  renderComm("events");
}

// =====================================================================
// Apresentação — Antes × Depois
// =====================================================================
function openBeforeAfter() {
  const ba = document.getElementById("ba");
  if (!document.getElementById("baAfter").src) {
    document.getElementById("baAfter").src = location.pathname + "?embed=1";
    document.getElementById("baBeforeFrame").src = "https://arngren.net/";
  }
  ba.hidden = false; setBA(50);
}
function closeBA() { document.getElementById("ba").hidden = true; }
function setBA(p) { document.getElementById("baStage").style.setProperty("--p", Math.max(0, Math.min(100, p)) + "%"); }
function baInteract(btn) {
  const sh = document.getElementById("baShield"), on = sh.style.pointerEvents !== "none";
  sh.style.pointerEvents = on ? "none" : "";
  btn.textContent = on ? "↔ Voltar a arrastar a divisória" : "🖱 Rolar as páginas";
}
(function () {
  let drag = false;
  const pos = e => { const r = document.getElementById("baStage").getBoundingClientRect(); setBA((e.clientX - r.left) / r.width * 100); };
  document.addEventListener("pointerdown", e => { if (e.target.id === "baShield") { drag = true; pos(e); } });
  document.addEventListener("pointermove", e => { if (drag) pos(e); });
  document.addEventListener("pointerup", () => drag = false);
})();

// =====================================================================
// Apresentação — Tour guiado pelas letras do SCAMPER
// =====================================================================
const TOUR = [
  { sel: ".search", L: "S · C · A", t: "Busca fixa no topo", d: "Barra grande com lupa e autocompletar, que busca dentro de uma categoria." },
  { sel: "nav.cats", L: "R · S", t: "Menu único de categorias", d: "Categorias e subcategorias organizadas, com a categoria atual destacada." },
  { sel: ".perks", L: "C", t: "Faixa de vantagens", d: "Frete, garantia, trocas e suporte reunidos em um só lugar." },
  { sel: "#hero", L: "R", t: "Banner rotativo", d: "Destaques organizados, no lugar de banners soltos e piscantes." },
  { sel: ".filters", L: "M · A", t: "Busca inteligente", d: "Filtros por preço, orçamento, finalidade, tamanho, potência, marca e estoque." },
  { sel: "#interests", L: "C · A", t: "Interesses e modo de exibição", d: "Produtos por interesse e alternância entre grade e lista." },
  { sel: "#recoBox", L: "A", t: "Recomendações inteligentes", d: "Sugestões com base no histórico de navegação e nas preferências." },
  { sel: "#gBest .card", L: "R · S · M · C", t: "Card padronizado", d: "Imagem → título → avaliação → preço → Comprar, com moldura 4:3, fundo neutro e selo de garantia discreto." },
  { sel: "#streamRows", L: "A", t: "Vitrines estilo streaming", d: "Fileiras horizontais por categoria." },
  { sel: "#aiFab", L: "A", t: "Volt, o assistente virtual", d: "Encontra produtos pela finalidade, orçamento, tamanho e potência." },
  { sel: "#modeMag", L: "P", t: "Catálogo digital e Vitrine 3D", d: "Revista digital e vitrine 3D para colecionadores de itens raros." },
  { sel: "#modeComm", L: "P", t: "Comunidade", d: "Guias de montagem, fórum de suporte, projetos dos membros e eventos." },
  { sel: ".device-switch", L: "A", t: "Celular, tablet e computador", d: "O mesmo site se adapta a qualquer tela." },
  { sel: ".a11y-tools", L: "S · A", t: "Acessibilidade", d: "Tamanho do texto, alto contraste e modo escuro, com contraste WCAG AA." },
  { sel: ".cart-btn", L: "E", t: "Checkout em um passo", d: "Sem cadastro obrigatório: nome, e-mail, CEP e pagamento em uma tela." },
  { sel: "footer.site", L: "S", t: "Contato organizado", d: "Horário, chat e formulário em uma página própria, no lugar de contatos espalhados." }
];
let tourIdx = -1;
function startTour() { closeAll(); closeBA(); goHome(); tourIdx = 0; setTimeout(showTourStep, 450); }
function endTour() {
  tourIdx = -1;
  document.getElementById("tourSpot").hidden = true;
  document.getElementById("tourShade").hidden = true;
  document.getElementById("tourTip").hidden = true;
}
function tourGo(d) { tourIdx += d; if (tourIdx < 0 || tourIdx >= TOUR.length) return endTour(); showTourStep(); }
function showTourStep() {
  const st = TOUR[tourIdx], el = document.querySelector(st.sel);
  if (!el) return tourGo(1);
  el.scrollIntoView({ block: "center", behavior: "smooth" });
  const tip = document.getElementById("tourTip");
  tip.innerHTML = `<div class="tour-letter">${st.L}</div><b>${st.t}</b><p>${st.d}</p>
    <div class="tour-nav"><small>${tourIdx + 1} de ${TOUR.length}</small>
      <span><button class="btn" onclick="tourGo(-1)" ${tourIdx ? "" : "disabled"}>« Voltar</button>
      <button class="btn btn-buy" onclick="tourGo(1)">${tourIdx === TOUR.length - 1 ? "Concluir ✔" : "Próximo »"}</button>
      <button class="btn" onclick="endTour()" aria-label="Fechar tour">✕</button></span></div>`;
  setTimeout(placeTour, 450);
}
function placeTour() {
  if (tourIdx < 0) return;
  const el = document.querySelector(TOUR[tourIdx].sel); if (!el) return;
  const r = el.getBoundingClientRect(), spot = document.getElementById("tourSpot"), tip = document.getElementById("tourTip");
  Object.assign(spot.style, { left: r.left - 6 + "px", top: r.top - 6 + "px", width: r.width + 12 + "px", height: r.height + 12 + "px" });
  spot.hidden = false; tip.hidden = false;
  const sh = document.getElementById("tourShade"), x = r.left - 6, y = r.top - 6, w = r.width + 12, h = r.height + 12;
  sh.style.clipPath = `path(evenodd, "M0 0H${innerWidth}V${innerHeight}H0Z M${x} ${y}h${w}v${h}h${-w}Z")`;
  sh.hidden = false;
  const th = tip.offsetHeight, tw = tip.offsetWidth;
  let top = r.bottom + 14;
  if (top + th > innerHeight - 8) top = Math.max(8, r.top - th - 14);
  tip.style.top = top + "px";
  tip.style.left = Math.min(Math.max(8, r.left), innerWidth - tw - 8) + "px";
}
window.addEventListener("scroll", placeTour, { passive: true });
window.addEventListener("resize", placeTour);

// =====================================================================
// Inicialização dos extras
// =====================================================================
// se o servidor demorar demais, mostra a foto substituta após 6 s
function watchSlowImages() {
  const now = Date.now();
  document.querySelectorAll("img").forEach(img => {
    if (img.dataset.fb || (img.complete && img.naturalWidth)) return;
    if (!img.src || img.src.startsWith("data:")) return;
    const r = img.getBoundingClientRect();
    if (!r.width || r.bottom < -600 || r.top > innerHeight + 600) { delete img.dataset.t0; return; }   // fora da tela: ainda não carregou
    if (!img.dataset.t0 || img.dataset.src0 !== img.src) { img.dataset.t0 = now; img.dataset.src0 = img.src; return; }
    const wait = now - img.dataset.t0;
    if (img.src.startsWith("https://arngren.net/") && wait > 4000) img.src = ARCHIVE(img.src);
    else if (wait > 15000) { img.dataset.fb = "1"; img.src = photoFallback(img.alt); }
  });
}
function probeArngren() {
  let done = false;
  const fail = () => {
    if (done) return; done = true; ARN_DOWN = true;
    document.querySelectorAll("img").forEach(i => {
      if (i.src.startsWith("https://arngren.net/") && !(i.complete && i.naturalWidth)) i.src = ARCHIVE(i.src);
    });
  };
  const t = new Image();
  t.onload = () => { done = true; };
  t.onerror = fail;
  setTimeout(fail, 3500);
  t.src = ARN_BASE + "elsykkel-SAMMENLEGGBAR-9T_7TK29F-247x186.jpg?probe=" + Date.now();
}
function initExtras() {
  probeArngren();
  setInterval(watchSlowImages, 2000);
  if (/embed/.test(location.search)) document.body.classList.add("embed");
  document.querySelectorAll(".ico-slot").forEach(e => e.innerHTML = ICON[e.dataset.ico]);
  document.querySelectorAll(".mascot-slot").forEach(e => e.innerHTML = MASCOT);
  renderSlides();
  tickCountdown(); setInterval(tickCountdown, 1000);
  applyPrefs();
}
