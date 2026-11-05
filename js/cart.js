// ARNGREN — protótipo acadêmico (SCAMPER)
// Carrinho e checkout em um passo (cartão, Pix e boleto simulados)

// ---------------- Carrinho & checkout de 1 passo ----------------
function addToCart(id, silent) {
  const l = cart.find(x => x.id === id);
  l ? l.qty++ : cart.push({ id, qty: 1 });
  if (!silent) flyToCart(id);
  updateCartCount();
  renderReco();
  if (!silent) toast("Adicionado ao carrinho", byId(id).name);
  if (document.getElementById("drawer").classList.contains("show")) renderCart();
}
function changeQty(id, d) {
  const l = cart.find(x => x.id === id); l.qty += d;
  if (l.qty <= 0) cart = cart.filter(x => x.id !== id);
  updateCartCount(); renderCart();
}
function updateCartCount() { const n = cart.reduce((s, l) => s + l.qty, 0), c = document.getElementById("cartCount"); c.hidden = !n; c.textContent = n; }
const cartTotal = () => cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
function cartLinesHTML() {
  return cart.map(l => { const p = byId(l.id); return `
    <div class="cart-line"><span class="imgbox"><img src="${p.src}" alt=""></span><div class="info"><b>${p.name}</b><br><span class="price" style="font-size:12px">${fmt(p.price)}</span></div>
      <div class="qty"><button class="btn" onclick="changeQty(${p.id},-1)" aria-label="Diminuir">−</button>${l.qty}<button class="btn" onclick="changeQty(${p.id},1)" aria-label="Aumentar">+</button></div></div>`; }).join("") + `
    <div class="total"><span>Total</span><span>${fmt(cartTotal())}</span></div>`;
}
function renderCart() {
  const body = document.getElementById("drawerBody"), foot = document.getElementById("drawerFoot");
  if (!cart.length) { body.innerHTML = emptyHTML("Seu carrinho está vazio.", "Que tal dar uma olhada nos mais vendidos?"); foot.innerHTML = ""; return; }
  // Se o formulário já está aberto, atualiza só os itens (não apaga o que a pessoa digitou)
  if (document.getElementById("coForm")) {
    document.getElementById("cartLines").innerHTML = cartLinesHTML();
    const sel = document.getElementById("ccInst"); if (sel) sel.outerHTML = installmentsHTML();
    return;
  }
  body.innerHTML = `<div id="cartLines">${cartLinesHTML()}</div>
    <div class="seal-line">🛡 <b>Compra 100% garantida</b> — satisfação garantida ou troca grátis. <span class="sc">S · Selo de garantia discreto</span></div>
    <form class="checkout-form" id="coForm" onsubmit="finish(event)" autocomplete="off">
      <fieldset><legend>Finalizar em um único passo</legend>
        <input type="text" required placeholder="Nome completo" autocomplete="name">
        <input type="email" required placeholder="E-mail" autocomplete="email">
        <div class="row"><input type="text" required placeholder="CEP" autocomplete="postal-code"><input type="text" required placeholder="Número"></div>
      </fieldset>
      <fieldset><legend>Pagamento</legend>
        <div class="pay-opts">
          <label class="check"><input type="radio" name="pay" value="card" checked onchange="showPay(this.value)"> Cartão</label>
          <label class="check"><input type="radio" name="pay" value="pix" onchange="showPay(this.value)"> Pix</label>
          <label class="check"><input type="radio" name="pay" value="boleto" onchange="showPay(this.value)"> Boleto</label>
        </div>
        <div id="payPanel"></div>
        <div class="pay-error" id="payError" role="alert" hidden></div>
      </fieldset>
      <small style="color:#666">Sem cadastro obrigatório · endereço preenchido pelo CEP</small>
    </form>`;
  foot.innerHTML = `<p style="margin-top:8px"><button class="btn btn-buy btn-block" type="submit" form="coForm">Confirmar pedido »</button></p>`;
  showPay("card");
}

// ---------- Pagamento: campos de cada forma (simulação, nada é guardado ou enviado) ----------
const SIM_NOTE = () => `<p class="sim-note">🔒 ${TL("Simulação do protótipo: use dados de teste, nunca dados reais.", "Prototype simulation: use test data only, never real details.", "Simulering i prototypen: bruk testdata, aldri ekte opplysninger.")}</p>`;
function installmentsHTML() {
  const t = cartTotal();
  return `<select id="ccInst" aria-label="${TL("Parcelas", "Instalments", "Avdrag")}">${[1, 2, 3, 4, 5, 6, 10].map(n =>
    `<option value="${n}">${n === 1 ? TL("À vista", "Pay in full", "Betal alt nå") + " — " + money(t) : TL(`${n}x de ${money(Math.round(t / n))} sem juros`, `${n} × ${money(Math.round(t / n))} interest-free`, `${n} × ${money(Math.round(t / n))} rentefritt`)}</option>`).join("")}</select>`;
}
function showPay(method) {
  const panel = document.getElementById("payPanel");
  document.getElementById("payError").hidden = true;
  if (method === "card") {
    panel.innerHTML = `<div class="pay-panel">${SIM_NOTE()}
      <div class="cc-row"><input type="text" id="ccNum" inputmode="numeric" maxlength="19" required placeholder="${TL("Número do cartão", "Card number", "Kortnummer")}" oninput="maskCard(this)"><span class="card-brand" id="ccBrand"></span></div>
      <input type="text" id="ccName" required placeholder="${TL("Nome impresso no cartão", "Name on card", "Navn på kortet")}">
      <div class="row"><input type="text" id="ccExp" inputmode="numeric" maxlength="5" required placeholder="${TL("Validade (MM/AA)", "Expiry (MM/YY)", "Utløp (MM/ÅÅ)")}" oninput="maskExp(this)">
        <input type="text" id="ccCvv" inputmode="numeric" maxlength="4" required placeholder="${TL("CVV (3 ou 4 dígitos)", "CVV (3 or 4 digits)", "CVC (3 eller 4 sifre)")}" oninput="this.value=this.value.replace(/\\D/g,'')"></div>
      <label class="inst">${TL("Parcelamento", "Payment plan", "Nedbetaling")} ${installmentsHTML()}</label>
    </div>`;
  } else if (method === "pix") {
    const code = "00020126-ARNGREN-PIX-" + Math.random().toString(36).slice(2, 10).toUpperCase() + "-EXEMPLO";
    panel.innerHTML = `<div class="pay-panel pix">${SIM_NOTE()}
      <div class="pix-grid"><div class="qr" aria-label="${TL("QR Code do Pix (exemplo)", "Pix QR code (sample)", "Pix QR-kode (eksempel)")}" role="img">${fakeQR(code)}</div>
      <div><b>${TL("Pague com Pix", "Pay with Pix", "Betal med Pix")}</b><br>
        ${TL("Abra o app do seu banco, escolha <b>Pix → Ler QR Code</b> e aponte para a imagem. Ou copie o código abaixo e use <b>Pix Copia e Cola</b>.",
             "Open your banking app, choose <b>Pix → Scan QR code</b> and point it at the image. Or copy the code below and use <b>Pix copy &amp; paste</b>.",
             "Åpne bankappen, velg <b>Pix → Skann QR-kode</b> og pek på bildet. Eller kopier koden under og bruk <b>Pix kopier og lim inn</b>.")}
        <div class="pix-code"><input type="text" id="pixCode" readonly value="${code}" aria-label="${TL("Código Pix", "Pix code", "Pix-kode")}"><button type="button" class="btn" onclick="copyPix()">${TL("Copiar", "Copy", "Kopier")}</button></div>
        <small>${TL("Valor:", "Amount:", "Beløp:")} <b>${money(cartTotal())}</b> · ${TL("o código vale por 30 minutos e a confirmação é automática.", "the code is valid for 30 minutes and confirmation is automatic.", "koden gjelder i 30 minutter, og bekreftelsen skjer automatisk.")}</small>
      </div></div></div>`;
  } else {
    panel.innerHTML = `<div class="pay-panel">${SIM_NOTE()}
      <input type="text" id="bCpf" inputmode="numeric" maxlength="14" required placeholder="${TL("CPF do pagador", "Payer's tax ID (CPF)", "Betalers skatte-ID (CPF)")}" oninput="maskCpf(this)">
      <small>${TL("O boleto é gerado quando você confirma o pedido e vence em <b>3 dias úteis</b>. Pague no app do banco, internet banking ou lotérica. O envio acontece após a compensação (até 2 dias úteis).",
        "The boleto is issued when you place the order and is due in <b>3 working days</b>. Pay it in your banking app, online banking or at a lottery outlet. We ship once the payment clears (up to 2 working days).",
        "Boletoen lages når du bekrefter bestillingen og forfaller om <b>3 virkedager</b>. Betal i bankappen, nettbanken eller hos en kommisjonær. Vi sender varene når betalingen er registrert (opptil 2 virkedager).")}</small>
    </div>`;
  }
}
function maskCard(el) {
  const d = el.value.replace(/\D/g, "").slice(0, 16);
  el.value = d.replace(/(\d{4})(?=\d)/g, "$1 ");
  document.getElementById("ccBrand").textContent = /^4/.test(d) ? "VISA" : /^(5[1-5]|2[2-7])/.test(d) ? "MASTERCARD" : /^3[47]/.test(d) ? "AMEX" : /^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(d) ? "ELO" : "";
}
function maskExp(el) { const d = el.value.replace(/\D/g, "").slice(0, 4); el.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; }
function maskCpf(el) {
  const d = el.value.replace(/\D/g, "").slice(0, 11);
  el.value = d.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}
const luhn = num => { let s = 0, dbl = false; for (let i = num.length - 1; i >= 0; i--) { let d = +num[i]; if (dbl) { d *= 2; if (d > 9) d -= 9; } s += d; dbl = !dbl; } return s % 10 === 0; };
function copyPix() {
  const i = document.getElementById("pixCode"); i.select();
  (navigator.clipboard ? navigator.clipboard.writeText(i.value) : Promise.resolve()).catch(() => {});
  toast(TL("Código copiado", "Code copied", "Koden er kopiert"), TL("Cole no app do seu banco, em Pix Copia e Cola.", "Paste it in your banking app under Pix copy & paste.", "Lim den inn i bankappen under Pix kopier og lim inn."));
}
// QR Code ilustrativo (padrão gerado a partir do código; não é um Pix real)
function fakeQR(seed) {
  const N = 25; let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = () => (h = (h * 1103515245 + 12345) >>> 0) % 100;
  const finder = (x, y) => [[0, 0], [N - 7, 0], [0, N - 7]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  let r = "";
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (finder(x, y)) continue;
    if (rnd() < 48) r += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  const f = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
  return `<svg viewBox="-2 -2 ${N + 4} ${N + 4}" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${N + 4}" height="${N + 4}" fill="#fff"/><g fill="#111">${r}${f(0, 0)}${f(N - 7, 0)}${f(0, N - 7)}</g></svg>`;
}
function businessDays(n) { const d = new Date(); while (n > 0) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) n--; } return d.toLocaleDateString({ pt: "pt-BR", en: "en-GB", no: "nb-NO" }[LANG]); }

function finish(e) {
  e.preventDefault();
  const method = (document.querySelector('input[name="pay"]:checked') || {}).value || "card";
  const err = document.getElementById("payError");
  if (method === "card") {
    const num = document.getElementById("ccNum").value.replace(/\D/g, ""), exp = document.getElementById("ccExp").value, cvv = document.getElementById("ccCvv").value;
    const [mm, yy] = exp.split("/").map(Number), now = new Date(), expired = !mm || mm > 12 || !yy || (2000 + yy) * 12 + mm < now.getFullYear() * 12 + now.getMonth() + 1;
    let msg = "";
    if (num.length < 13 || !luhn(num)) msg = TL("Número do cartão inválido. Para testar, use 4111 1111 1111 1111.", "Invalid card number. To test, use 4111 1111 1111 1111.", "Ugyldig kortnummer. For å teste, bruk 4111 1111 1111 1111.");
    else if (expired) msg = TL("Validade inválida ou vencida (use MM/AA).", "Invalid or expired date (use MM/YY).", "Ugyldig eller utløpt dato (bruk MM/ÅÅ).");
    else if (!/^\d{3,4}$/.test(cvv)) msg = TL("O CVV deve ter 3 ou 4 dígitos.", "The CVV must have 3 or 4 digits.", "CVC-koden må ha 3 eller 4 sifre.");
    if (msg) { err.textContent = "⚠ " + msg; err.hidden = false; return; }
  }
  if (method === "boleto" && document.getElementById("bCpf").value.replace(/\D/g, "").length !== 11) {
    err.textContent = "⚠ " + TL("Informe um CPF com 11 dígitos.", "Enter an 11-digit CPF.", "Oppgi en CPF med 11 sifre."); err.hidden = false; return;
  }
  const total = cartTotal();
  let payInfo = "";
  if (method === "card") {
    const last4 = document.getElementById("ccNum").value.replace(/\D/g, "").slice(-4), inst = +document.getElementById("ccInst").value, brand = document.getElementById("ccBrand").textContent || TL("cartão", "card", "kort");
    payInfo = TL(`Pagamento aprovado no ${brand} final <b>${last4}</b>${inst > 1 ? ` em <b>${inst}x</b>` : " à vista"}.`,
                 `Payment approved on ${brand} ending <b>${last4}</b>${inst > 1 ? ` in <b>${inst} instalments</b>` : ""}.`,
                 `Betalingen er godkjent på ${brand} som slutter på <b>${last4}</b>${inst > 1 ? ` i <b>${inst} avdrag</b>` : ""}.`);
  } else if (method === "pix") {
    payInfo = TL("Pagamento via <b>Pix</b> confirmado.", "<b>Pix</b> payment confirmed.", "<b>Pix</b>-betalingen er bekreftet.");
  } else {
    const line = "34191.79001 01043.510047 91020.150008 8 " + String(Math.round(total * curr().rate * 100)).padStart(14, "0");
    payInfo = TL(`Boleto gerado — vence em <b>${businessDays(3)}</b>:`, `Boleto issued — due on <b>${businessDays(3)}</b>:`, `Boleto er laget — forfaller <b>${businessDays(3)}</b>:`) +
      `<div class="barcode" aria-hidden="true"></div><div class="boleto-line">${line}</div>`;
  }
  cart = []; updateCartCount();
  document.getElementById("drawerBody").innerHTML = `<div class="success"><div class="seal-line" style="display:inline-block">🛡 Compra protegida pela garantia ARNGREN</div><h3 style="color:var(--green)">Pedido confirmado!</h3><p>${payInfo}</p><p>Total: <b>${fmt(total)}</b>. A confirmação chegará por e-mail.<br><i>(Simulação do protótipo — nada foi enviado.)</i></p></div>`;
  document.getElementById("drawerFoot").innerHTML = `<button class="btn btn-block" onclick="closeAll()">Continuar comprando</button>`;
}
function openCart() { renderCart(); show("drawer"); }
