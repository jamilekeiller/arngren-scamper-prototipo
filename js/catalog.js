// ARNGREN — protótipo acadêmico (SCAMPER)
// P — Catálogo digital: revista e vitrine 3D

// ---------------- P — Catálogo digital: revista + vitrine 3D ----------------
let magFormat = "mag", onlyRare = false, autoSpin = null, vTurn = 0, vDragged = false;
let magList = [];
function refreshMagList() {
  magList = mainProducts().filter(p => !onlyRare || p.rare).sort((a, b) => !!b.rare - !!a.rare);
  magIdx = Math.max(0, Math.min(magIdx, magList.length - 1));
}
function rareSeal(p) { return p.rare ? `<div class="rare-seal">★ Item raro de colecionador<br><small>${p.rare}</small></div>` : ""; }
function renderMag(dir) {
  refreshMagList();
  if (magFormat === "3d") return renderVitrine();
  const p = magList[magIdx], page = document.getElementById("magPage");
  page.innerHTML = `
    <div class="mag-visual"><img src="${p.src}" alt="${p.name}"></div>
    <div class="mag-text">
      <span class="kicker">${p.cat} · ${p.rare ? "Edição de colecionador" : "Catálogo ARNGREN"}</span>
      <h2>${p.name}</h2>
      ${rareSeal(p)}
      <p>${p.desc}</p>
      ${specsTable(p)}
      <div class="price" style="font-size:22px">${fmt(p.price)}</div>
      <div><button class="btn btn-blue" onclick="openProduct(${p.id})">Ver detalhes</button> <button class="btn btn-buy" ${p.stock ? "" : "disabled"} onclick="addToCart(${p.id})">Comprar</button></div>
    </div>`;
  page.classList.remove("flip", "flip-back"); void page.offsetWidth;
  if (dir) page.classList.add(dir > 0 ? "flip" : "flip-back");
  document.getElementById("magIndex").textContent = `Página ${magIdx + 1} de ${magList.length}  ·  use as setas ← → do teclado`;
}
function magGo(d) {
  if (!magList.length) return;
  magIdx = (magIdx + d + magList.length) % magList.length;
  if (magFormat === "3d") { vTurn += d; updateVitrine(); } else renderMag(d);
}
function setMagFormat(f) {
  magFormat = f;
  document.getElementById("fmtMag").classList.toggle("on", f === "mag");
  document.getElementById("fmt3d").classList.toggle("on", f === "3d");
  document.getElementById("magFrame").hidden = f !== "mag";
  document.getElementById("vitrine").hidden = f !== "3d";
  if (f !== "3d") stopSpin();
  renderMag();
}
function setOnlyRare(v) { onlyRare = v; magIdx = 0; renderMag(); }

function renderVitrine() {
  const ring = document.getElementById("vRing"), n = magList.length, step = 360 / n;
  const r = Math.max(240, Math.round(110 / Math.tan(Math.PI / n)));
  ring.dataset.r = r; ring.dataset.step = step;
  ring.innerHTML = magList.map((p, i) => `
    <div class="v-item" style="transform: rotateY(${i * step}deg) translateZ(${r}px)" onclick="vClick(${i})">
      ${p.rare ? '<span class="tag rare">★ Raro</span>' : ""}
      <div class="v-img"><img src="${p.src}" alt="${p.name}"></div>
      <span class="n">${p.name}</span>
    </div>`).join("");
  vTurn = magIdx;
  updateVitrine();
}
function updateVitrine() {
  const ring = document.getElementById("vRing"), r = +ring.dataset.r, step = +ring.dataset.step;
  ring.style.transform = `translateZ(${-r}px) rotateY(${-vTurn * step}deg)`;
  ring.querySelectorAll(".v-item").forEach((el, i) => el.classList.toggle("front", i === magIdx));
  const p = magList[magIdx];
  document.getElementById("vInfo").innerHTML = `
    <div>
      <span class="kicker">${p.cat} · ${p.rare ? "Edição de colecionador" : "Vitrine ARNGREN"}</span>
      <h2>${p.name}</h2>
      <p>${p.desc}</p>
      ${rareSeal(p)}
    </div>
    <div class="v-buy">
      <div class="price" style="font-size:22px">${fmt(p.price)}</div>
      <div class="stock ${p.stock ? "ok" : "no"}">${p.stock ? "● Em estoque" : "● Esgotado"}</div>
      <button class="btn btn-blue btn-block" onclick="openProduct(${p.id})">Ver detalhes</button>
      <button class="btn btn-buy btn-block" ${p.stock ? "" : "disabled"} onclick="addToCart(${p.id})">Comprar</button>
    </div>`;
  document.getElementById("vIndex").textContent = `Item ${magIdx + 1} de ${magList.length} · arraste, clique ou use ← →`;
}
function vClick(i) {
  if (vDragged) return;
  if (i === magIdx) return openProduct(magList[i].id);
  const n = magList.length;
  let d = i - magIdx;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  magGo(d);
}
function toggleSpin() {
  if (autoSpin) return stopSpin();
  autoSpin = setInterval(() => magGo(1), 2500);
  document.getElementById("spinBtn").textContent = "❚❚ Pausar giro";
}
function stopSpin() {
  clearInterval(autoSpin); autoSpin = null;
  const b = document.getElementById("spinBtn");
  if (b) b.textContent = "▶ Girar automaticamente";
}
(function () {
  let x0 = null;
  document.addEventListener("pointerdown", e => { if (e.target.closest && e.target.closest("#vStage")) { x0 = e.clientX; vDragged = false; } });
  document.addEventListener("pointerup", e => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { vDragged = true; magGo(dx < 0 ? 1 : -1); setTimeout(() => vDragged = false, 50); }
  });
})();

function setMode(m) {
  if (m !== curMode) showLoading();
  curMode = m;
  document.body.classList.toggle("mag", m === "mag");
  document.body.classList.toggle("comm", m === "comm");
  document.body.classList.toggle("contact", m === "contact");
  ["Shop", "Mag", "Comm"].forEach(x => document.getElementById("mode" + x).classList.toggle("on", x.toLowerCase() === m));
  if (m !== "mag") stopSpin();
  if (m === "shop") setCrumb("");
  if (m === "mag") { setCrumb("Catálogo Digital"); setActiveTab(""); renderMag(); }
  if (m === "comm") { setCrumb("Comunidade"); setActiveTab("comm"); renderComm(commView, commArg); window.scrollTo({ top: 0 }); }
  if (m === "contact") { setCrumb("Contato e atendimento"); setActiveTab(""); renderContact(); window.scrollTo({ top: 0 }); }
}
