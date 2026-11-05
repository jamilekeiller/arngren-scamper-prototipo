// ARNGREN — protótipo acadêmico (SCAMPER)
// Loja: estado, cards, busca, filtros e comparação

// ---------------- Estado ----------------
let cart = [], compare = [], interest = null, currentSub = null, quick = null, magIdx = 0;

// ---------------- Render ----------------
function cardHTML(p, why) {
  const tags = [
    p.multi ? `<span class="tag multi">2 em 1</span>` : "",
    p.rare ? `<span class="tag rare">★ Raro</span>` : ""
  ].join("");
  return `
  <article class="card">
    ${p.tags.includes("offer") ? `<span class="ribbon offer">-${Math.round((1 - p.price / p.old) * 100)}% oferta</span>` : p.tags.includes("new") ? `<span class="ribbon new">Novo!</span>` : ""}
    <div class="tags">${tags}</div>
    <button class="thumb" onclick="openProduct(${p.id})" aria-label="Ver ${p.name}"><img src="${p.src}" alt="${p.name}" loading="lazy"></button>
    <div class="body">
      <button class="title" onclick="openProduct(${p.id})">${p.name}</button>
      <div class="meta">${p.brand} · ${p.sub}</div>
      ${starsHTML(p)}
      ${why ? `<div class="reco-why">${why}</div>` : ""}
      <div class="price">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</div>
      <div class="stock ${p.stock ? "ok" : "no"}">${p.stock ? "● Em estoque" : "● Esgotado"}</div>
      <ul class="mini-specs">${Object.entries(p.specs).slice(0, 4).map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join("")}</ul>
      <div class="actions">
        <button class="btn btn-buy btn-block" ${p.stock ? "" : "disabled"} onclick="addToCart(${p.id})">${p.stock ? "Comprar" : "Indisponível"}</button>
        <div class="card-foot">
          <label class="compare-check"><input type="checkbox" data-id="${p.id}" ${compare.includes(p.id) ? "checked" : ""} onchange="toggleCompare(${p.id}, this)"> Comparar</label>
          <span class="seal-mini" title="Satisfação garantida ou troca grátis">${ICON.shield} Garantia</span>
        </div>
      </div>
    </div>
  </article>`;
}
function renderGrid(el, list) {
  document.getElementById(el).innerHTML = list.length ? list.map(p => cardHTML(p)).join("") : emptyHTML("Nenhum produto encontrado com esses filtros.", "Tente limpar os filtros ou pergunte ao Volt, nosso assistente.");
}
const interestFilter = list => interest ? list.filter(p => p.interests.includes(interest)) : list;
const mainProducts = () => P.filter(p => p.cat !== "Acessórios");

function renderHome() {
  renderGrid("gBest", interestFilter(P.filter(p => p.tags.includes("best"))).slice(0, 4));
  renderGrid("gNew", interestFilter(P.filter(p => p.tags.includes("new"))).slice(0, 4));
  renderGrid("gOffer", interestFilter(P.filter(p => p.tags.includes("offer"))).slice(0, 4));
  renderGrid("gMulti", interestFilter(mainProducts().filter(p => p.multi)).slice(0, 4));
  renderReco(); renderStreams();
}

function init() {
  const menu = document.getElementById("catMenu"), sel = document.getElementById("searchCat"), fCats = document.getElementById("fCats");
  menu.insertAdjacentHTML("beforeend", `<li><button class="cat" data-tab="home" onclick="goHome()">Início</button></li>`);
  Object.entries(CATEGORIES).forEach(([cat, subs]) => {
    menu.insertAdjacentHTML("beforeend", `
      <li><button class="cat" data-cat="${cat}" onclick="filterCat('${cat}')">${CAT_SHORT[cat] || cat} ▾</button>
        <ul class="submenu">${subs.map(s => `<li><button onclick="filterCat('${cat}','${s}')">${s}</button></li>`).join("")}</ul></li>`);
    sel.insertAdjacentHTML("beforeend", `<option>${cat}</option>`);
    fCats.insertAdjacentHTML("beforeend", `<label class="check"><input type="checkbox" value="${cat}" onchange="applyFilters()"> ${cat}</label>`);
  });
  document.getElementById("footCats").innerHTML = Object.keys(CATEGORIES).map(c => `<a href="#" onclick="filterCat('${c}');return false;">${c}</a>`).join(" · ");
  [...new Set(P.map(p => p.brand))].sort().forEach(b =>
    document.getElementById("fBrands").insertAdjacentHTML("beforeend", `<label class="check"><input type="checkbox" value="${b}" onchange="applyFilters()"> ${b}</label>`));
  const ints = document.getElementById("interests");
  INTERESTS.forEach(i => ints.insertAdjacentHTML("beforeend", `<button class="chip" onclick="setInterest('${i}', this)">${i}</button>`));
  ints.insertAdjacentHTML("beforeend", `<span class="sc">C · Produtos por Interesse</span>
    <span class="view-switch sc-box">Exibir: <button class="on" id="viewGrid" onclick="setView('grid')">▦ Grade</button><button id="viewList" onclick="setView('list')">☰ Lista</button><span class="sc">A · Leitura e comparação</span></span>`);
  PURPOSES.forEach(x => document.getElementById("fPurpose").insertAdjacentHTML("beforeend", `<option>${x}</option>`));
  interest = store.get("arn_interest", null);
  if (interest) document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c.textContent === interest));
  const fp = document.getElementById("fPrice"); fp.value = fp.max;
  updatePriceLabel(); renderHome(); renderMag(); renderCommTeaser(); setActiveTab("home"); initExtras(); initI18n();
}
function updatePriceLabel() { document.getElementById("fPriceLabel").textContent = fmt(+document.getElementById("fPrice").value); }
function setCrumb(t) { document.getElementById("breadcrumb").innerHTML = `Você está em: <a href="#" onclick="goHome();return false;">Início</a>${t ? " » <b>" + t + "</b>" : ""}`; }

// ---------------- Busca & filtros ----------------
function doSearch(e) {
  e.preventDefault();
  const c = document.getElementById("searchCat").value;
  document.querySelectorAll("#fCats input").forEach(i => i.checked = c ? i.value === c : false);
  currentSub = null; quick = null; hideSuggest(); setMode("shop"); setActiveTab(c || ""); applyFilters();
}
function filterCat(cat, sub) {
  setMode("shop");
  document.body.classList.remove("nav-open");
  document.getElementById("searchInput").value = "";
  document.getElementById("searchCat").value = cat;
  document.querySelectorAll("#fCats input").forEach(i => i.checked = i.value === cat);
  currentSub = sub || null; quick = null;
  setActiveTab(cat);
  applyFilters(sub ? `${cat} » ${sub}` : cat);
  document.getElementById("resultsBlock").scrollIntoView({ behavior: "smooth", block: "start" });
}
function quickTag(t) {
  resetFilters(true); quick = t;
  applyFilters({ best: "Mais vendidos", new: "Lançamentos", offer: "Ofertas da semana" }[t]);
}
function applyFilters(titleOverride) {
  updatePriceLabel();
  const fp = document.getElementById("fPrice");
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const max = +fp.value;
  const cats = [...document.querySelectorAll("#fCats input:checked")].map(i => i.value);
  const brands = [...document.querySelectorAll("#fBrands input:checked")].map(i => i.value);
  const onlyStock = document.getElementById("fStock").checked, onlyMulti = document.getElementById("fMulti").checked;
  const sort = document.getElementById("fSort").value;
  const budget = document.getElementById("fBudget").value, purpose = document.getElementById("fPurpose").value;
  const size = document.getElementById("fSize").value, power = document.getElementById("fPower").value;
  const [bMin, bMax] = budget ? budget.split("-").map(Number) : [0, Infinity];
  const [wMin, wMax] = power ? power.split("-").map(Number) : [0, Infinity];
  const active = q || cats.length || brands.length || onlyStock || onlyMulti || sort !== "rel" || max < +fp.max || currentSub || quick || budget || purpose || size || power;

  document.getElementById("homeSections").hidden = !!active;
  document.getElementById("hero").hidden = !!active;
  document.getElementById("resultsBlock").hidden = !active;
  if (!active) { renderHome(); setCrumb(""); return; }

  let list = P.filter(p =>
    p.price <= max &&
    (!q || (p.name + " " + p.sub + " " + p.brand + " " + p.cat + " " + p.img).toLowerCase().includes(q)) &&
    (!cats.length || cats.includes(p.cat)) &&
    (!brands.length || brands.includes(p.brand)) &&
    (!onlyStock || p.stock) && (!onlyMulti || p.multi) &&
    (!currentSub || p.sub === currentSub) &&
    (!quick || p.tags.includes(quick)) &&
    p.price >= bMin && p.price <= bMax &&
    (!purpose || p.purpose.includes(purpose)) &&
    (!size || p.size === size) &&
    (!power || (p.power && p.power >= wMin && p.power <= wMax)));
  list = interestFilter(list);
  if (sort === "asc") list.sort((a, b) => a.price - b.price);
  if (sort === "desc") list.sort((a, b) => b.price - a.price);
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  const t = typeof titleOverride === "string" ? titleOverride
    : q ? `Resultados para “${q}”` + (cats.length === 1 ? ` em ${cats[0]}` : "")
    : cats.length ? cats.join(", ") : "Produtos filtrados";
  document.getElementById("resultsTitle").textContent = t;
  document.getElementById("resultsCount").textContent = `${list.length} produto(s)`;
  setCrumb(t);
  renderGrid("resultsGrid", list);
}
function resetFilters(silent) {
  document.getElementById("searchInput").value = "";
  document.getElementById("searchCat").value = "";
  document.querySelectorAll(".filters input[type=checkbox]").forEach(i => i.checked = false);
  const fp = document.getElementById("fPrice"); fp.value = fp.max;
  document.getElementById("fSort").value = "rel";
  ["fBudget", "fPurpose", "fSize", "fPower"].forEach(i => document.getElementById(i).value = "");
  currentSub = null; quick = null;
  document.querySelectorAll("nav.cats button.cat").forEach(b => b.classList.remove("active"));
  if (silent !== true) applyFilters();
}
function goHome() {
  interest = null; document.querySelectorAll(".chip").forEach(c => c.classList.remove("on"));
  resetFilters(); setMode("shop"); setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" });
}
function setInterest(i, el) {
  interest = interest === i ? null : i;
  store.set("arn_interest", interest);
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === el && !!interest));
  applyFilters();
}

// ---------------- Produto + acessórios ----------------
function specsTable(p) {
  return `<table class="specs">${Object.entries(p.specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
    <tr><th>Marca</th><td>${p.brand}</td></tr>
    <tr><th>Estoque</th><td class="stock ${p.stock ? "ok" : "no"}">${p.stock ? "● Em estoque — envio em 24h" : "● Esgotado"}</td></tr></table>`;
}
function addKit(id) {
  const p = byId(id);
  [p, ...p.acc.map(byId)].filter(x => x.stock).forEach(x => addToCart(x.id, true));
  toast("Kit adicionado ao carrinho", `${p.name} + acessórios`);
}

// ---------------- Comparação ----------------
function toggleCompare(id, el) {
  if (compare.includes(id)) compare = compare.filter(x => x !== id);
  else if (compare.length >= 3) { toast("Atenção", "Compare no máximo 3 produtos."); if (el) el.checked = false; return; }
  else compare.push(id);
  updateCompareUI();
  if (!el && document.getElementById("modal").classList.contains("show")) openProduct(id);
}
function clearCompare() { compare = []; updateCompareUI(); }
function updateCompareUI() {
  const n = compare.length, c = document.getElementById("cmpCount");
  c.hidden = !n; c.textContent = n;
  const barOn = n > 0 && !document.getElementById("overlay").classList.contains("show");
  document.getElementById("compareBar").classList.toggle("show", barOn);
  document.body.classList.toggle("cmp-open", barOn);
  document.getElementById("compareText").innerHTML = `<b>${n} produto(s) para comparar:</b> ${compare.map(i => tr(byId(i).name)).join(", ")}`;
  document.querySelectorAll(".compare-check input").forEach(i => i.checked = compare.includes(+i.dataset.id));
}
function openCompare() {
  if (compare.length < 2) { toast("Comparar produtos", "Marque “Comparar” em pelo menos 2 produtos."); return; }
  const items = compare.map(byId), keys = [...new Set(items.flatMap(p => Object.keys(p.specs)))];
  const min = Math.min(...items.map(p => p.price));
  document.getElementById("modalTitle").textContent = "Comparação de produtos — ARNGREN.net";
  document.getElementById("modalBody").innerHTML = `
    <div class="section-sub" style="margin-top:0">Comparação lado a lado <span class="sc">C · Comparação</span></div>
    <div style="overflow-x:auto"><table class="specs compare-table">
      <tr><th></th>${items.map(p => `<td style="text-align:center"><span class="imgbox cmp"><img src="${p.src}" alt=""></span><b>${p.name}</b></td>`).join("")}</tr>
      <tr><th>Preço</th>${items.map(p => `<td class="${p.price === min ? "best-price" : ""}">${fmt(p.price)}${p.price === min ? " ✓ menor preço" : ""}</td>`).join("")}</tr>
      <tr><th>Categoria</th>${items.map(p => `<td>${p.sub}</td>`).join("")}</tr>
      <tr><th>Marca</th>${items.map(p => `<td>${p.brand}</td>`).join("")}</tr>
      ${keys.map(k => `<tr><th>${k}</th>${items.map(p => `<td>${p.specs[k] || "—"}</td>`).join("")}</tr>`).join("")}
      <tr><th>Estoque</th>${items.map(p => `<td class="stock ${p.stock ? "ok" : "no"}">${p.stock ? "Sim" : "Não"}</td>`).join("")}</tr>
      <tr><th></th>${items.map(p => `<td><button class="btn btn-buy" ${p.stock ? "" : "disabled"} onclick="addToCart(${p.id})">Comprar</button></td>`).join("")}</tr>
    </table></div>`;
  show("modal");
}
