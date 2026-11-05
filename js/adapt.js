// ARNGREN — protótipo acadêmico (SCAMPER)
// A — Responsivo, histórico, recomendações, vitrines e comparação automática

// ---------------- A — Adaptar ----------------
function setDevice(d) {
  document.body.classList.remove("dev-tablet", "dev-phone", "nav-open");
  if (d !== "desktop") document.body.classList.add("dev-" + d);
  ["Desktop", "Tablet", "Phone"].forEach(x => document.getElementById("dev" + x).classList.toggle("on", x.toLowerCase() === d));
}
function setView(v) {
  document.body.classList.toggle("view-list", v === "list");
  document.getElementById("viewGrid").classList.toggle("on", v === "grid");
  document.getElementById("viewList").classList.toggle("on", v === "list");
}
function toggleNav() { document.body.classList.toggle("nav-open"); }
function toggleFilters() {
  const f = document.querySelector(".filters");
  f.classList.toggle("open");
  document.getElementById("filterToggleLbl").textContent = f.classList.contains("open") ? "Ocultar ▴" : "Mostrar ▾";
}

// ---------------- A — Histórico e preferências ----------------
const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const getHist = () => store.get("arn_hist", []).filter(id => byId(id));
function pushHist(id) { store.set("arn_hist", [id, ...getHist().filter(x => x !== id)].slice(0, 12)); }
function clearHist() { store.set("arn_hist", []); renderReco(); toast("Histórico apagado", "As recomendações foram reiniciadas."); }

// ---------------- A — Recomendações inteligentes ----------------
function recommend(n) {
  const hist = getHist().map(byId), inCart = cart.map(l => byId(l.id));
  const base = [
    ...inCart.map(h => ({ h, w: 1.5, src: "está no seu carrinho" })),
    ...hist.map((h, i) => ({ h, w: 1 / (1 + i * 0.4), src: "você viu" }))
  ];
  return P.filter(p => !hist.includes(p) && !inCart.includes(p)).map(p => {
    let s = 0, best = 0, why = "";
    base.forEach(({ h, w, src }) => {
      let t = 0;
      if (h.acc.includes(p.id)) t += 4;
      else if (p.cat !== "Acessórios") {
        if (h.sub === p.sub) t += 3; else if (h.cat === p.cat) t += 2;
        t += p.interests.filter(x => h.interests.includes(x)).length * 0.7;
        if (p.purpose.some(x => h.purpose.includes(x))) t += 1;
      }
      t *= w; s += t;
      if (t > best) { best = t; why = h.acc.includes(p.id) ? `Acessório para ${h.name}` : `Porque ${src}: ${h.name}`; }
    });
    if (interest && p.cat !== "Acessórios" && p.interests.includes(interest)) { s += 1.5; if (!why) why = `Combina com seu interesse: ${interest}`; }
    return { p, s, why };
  }).filter(x => x.s > 0.8).sort((a, b) => b.s - a.s).slice(0, n);
}
function rowHTML(title, cards, link) {
  return `<div class="row-wrap"><h3><span>${title}</span>${link || ""}</h3>
    <button class="row-arrow l" onclick="scrollRow(this,-1)" aria-label="Rolar para a esquerda">‹</button>
    <div class="row-scroller">${cards.join("")}</div>
    <button class="row-arrow r" onclick="scrollRow(this,1)" aria-label="Rolar para a direita">›</button></div>`;
}
function scrollRow(b, d) { b.parentElement.querySelector(".row-scroller").scrollBy({ left: d * 350, behavior: "smooth" }); }
function renderReco() {
  const el = document.getElementById("recoBody"); if (!el) return;
  const hist = getHist().map(byId), recs = recommend(10);
  let html = "";
  if (recs.length) html += rowHTML(hist.length || cart.length ? "Selecionados para você" : `Para quem gosta de ${interest}`, recs.map(r => cardHTML(r.p, r.why)));
  if (hist.length) html += rowHTML("Vistos recentemente", hist.map(h => cardHTML(h)));
  if (!html) html = `<p>Ainda não conhecemos você 🙂 Abra alguns produtos ou escolha um <b>interesse</b> acima — as recomendações aparecem aqui, com base no seu <b>histórico de navegação</b> e nas suas <b>preferências</b>.</p>`;
  el.innerHTML = html;
  document.getElementById("clearHist").hidden = !hist.length;
}

// ---------------- A — Vitrines estilo streaming ----------------
function renderStreams() {
  document.getElementById("streamRows").innerHTML = Object.keys(CATEGORIES).map(c => {
    const list = interestFilter(P.filter(p => p.cat === c));
    return list.length ? rowHTML(`${c} <small style="color: #595959;font-weight:normal">(${list.length})</small>`, list.map(p => cardHTML(p)),
      `<a href="#" onclick="filterCat('${c}');return false;">ver todos »</a>`) : "";
  }).join("");
}

// ---------------- A — Comparação automática de preços ----------------
const HIGHER = ["Motor", "Autonomia", "Velocidade", "Carga", "Potência", "Zoom", "Funções", "Lúmens", "Abertura", "Eixos", "Idiomas", "Capacidade", "Sensores", "Assentos"];
const num = v => { const m = String(v).replace(/(\d)\s(?=\d)/g, "$1").match(/\d+(?:[.,]\d+)?/); return m ? parseFloat(m[0].replace(",", ".")) : NaN; };
function similarTable(p) {
  const sim = P.filter(x => x.id !== p.id && x.cat === p.cat)
    .sort((a, b) => (b.sub === p.sub) - (a.sub === p.sub) || Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
    .slice(0, 3);
  if (!sim.length) return "";
  const items = [p, ...sim], keys = Object.keys(p.specs);
  const min = Math.min(...items.map(x => x.price));
  const rows = keys.map(k => {
    const vals = items.map(x => num(x.specs[k])).filter(n => !isNaN(n));
    const best = HIGHER.includes(k) && vals.length > 1 ? Math.max(...vals) : null;
    return `<tr><th>${k}</th>${items.map(x => {
      const win = best !== null && num(x.specs[k]) === best;
      return `<td class="${win ? "best-price" : ""}">${x.specs[k] || "—"}${win ? " ★" : ""}</td>`;
    }).join("")}</tr>`;
  }).join("");
  let verdict = `Mais barato: <b>${items.find(x => x.price === min).name}</b>.`;
  if (keys.includes("Autonomia")) {
    const cb = items.filter(x => !isNaN(num(x.specs.Autonomia)))
      .sort((a, b) => num(b.specs.Autonomia) / b.price - num(a.specs.Autonomia) / a.price)[0];
    if (cb) verdict += ` Melhor custo-benefício (autonomia por preço): <b>${cb.name}</b>.`;
  }
  return `<div class="sc-box">
    <div class="section-sub">Comparação automática com produtos semelhantes <span class="sc">A · Comparação de preços</span></div>
    <div style="overflow-x:auto"><table class="specs compare-table">
      <tr><th></th>${items.map((x, i) => `<td style="text-align:center">${i
        ? `<span class="imgbox cmp"><img src="${x.src}" alt=""></span><button class="link-btn" onclick="openProduct(${x.id})">${x.name}</button>`
        : `<b>Este produto</b><br>${x.name}`}</td>`).join("")}</tr>
      <tr><th>Preço</th>${items.map((x, i) => {
        const d = x.price - p.price;
        return `<td class="${x.price === min ? "best-price" : ""}">${fmt(x.price)}${i ? `<br><small>${d < 0 ? "▼ " + fmt(-d) + " mais barato" : d > 0 ? "▲ " + fmt(d) + " mais caro" : "mesmo preço"}</small>` : ""}</td>`;
      }).join("")}</tr>
      ${rows}
      <tr><th>Estoque</th>${items.map(x => `<td class="stock ${x.stock ? "ok" : "no"}">${x.stock ? "Sim" : "Não"}</td>`).join("")}</tr>
    </table></div>
    <p style="margin-top:4px;font-size:11px">🤖 ${verdict} <button class="link-btn" onclick="compareAll([${items.map(x => x.id).join(",")}])">Abrir na comparação completa »</button></p>
  </div>`;
}
function compareAll(ids) { compare = ids.slice(0, 3); updateCompareUI(); openCompare(); }
