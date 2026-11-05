// ARNGREN — protótipo acadêmico (SCAMPER)
// Utilidades e inicialização

// ---------------- Utilidades ----------------
function show(id) {
  ["modal", "drawer"].forEach(i => document.getElementById(i).classList.remove("show"));
  document.getElementById(id).classList.add("show");
  document.getElementById("overlay").classList.add("show");
  document.getElementById("compareBar").classList.remove("show");
  document.body.classList.remove("cmp-open");
}
function closeAll() {
  ["modal", "drawer", "overlay"].forEach(i => document.getElementById(i).classList.remove("show"));
  updateCompareUI();
  renderReco();
}
let tTimer;
function toast(title, msg) {
  const t = document.getElementById("toast");
  t.innerHTML = `<b>ℹ ${title}</b>${msg || ""}`; t.classList.add("show");
  clearTimeout(tTimer); tTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

init();
