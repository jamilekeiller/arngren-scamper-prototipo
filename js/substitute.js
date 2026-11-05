// ARNGREN — protótipo acadêmico (SCAMPER)
// S — Busca com autocompletar, menu único e página de contato

// ---------------- S — Busca com autocompletar ----------------
let sugIdx = -1;
const hl = (t, q) => { const i = t.toLowerCase().indexOf(q); return i < 0 ? t : t.slice(0, i) + "<mark>" + t.slice(i, i + q.length) + "</mark>" + t.slice(i + q.length); };
function suggest() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase(), box = document.getElementById("suggestBox");
  if (q.length < 2) { box.hidden = true; return; }
  const c = document.getElementById("searchCat").value;
  const prods = P.filter(p => (!c || p.cat === c) && (p.name + " " + p.sub + " " + p.brand + " " + p.cat).toLowerCase().includes(q)).slice(0, 6);
  const cats = Object.entries(CATEGORIES)
    .flatMap(([cat, subs]) => [cat, ...subs].filter(x => x.toLowerCase().includes(q)).map(x => ({ cat, sub: x === cat ? null : x })))
    .slice(0, 3);
  sugIdx = -1;
  if (!prods.length && !cats.length) {
    box.innerHTML = `<li class="sug-empty">Nenhum resultado para “${escapeHTML(q)}”. Tente “bicicleta” ou “robô”, ou <button type="button" class="link-btn" onmousedown="openChat()">pergunte ao assistente</button>.</li>`;
    box.hidden = false; return;
  }
  box.innerHTML =
    cats.map(x => `<li role="option" class="sug-cat" onmousedown="filterCat('${x.cat}'${x.sub ? `,'${x.sub}'` : ""}); hideSuggest()">📂 ${x.sub ? `${x.cat} » <b>${hl(x.sub, q)}</b>` : `<b>${hl(x.cat, q)}</b>`} <small>ver categoria</small></li>`).join("") +
    prods.map(p => `<li role="option" onmousedown="openProduct(${p.id}); hideSuggest()"><span class="imgbox"><img src="${p.src}" alt=""></span><span class="sug-name">${hl(p.name, q)}<small>${p.cat}</small></span><span class="price">${fmt(p.price)}</span></li>`).join("");
  box.hidden = false;
}
function hideSuggest() { const b = document.getElementById("suggestBox"); if (b) b.hidden = true; }
function suggestKey(e) {
  const box = document.getElementById("suggestBox"), items = [...box.querySelectorAll("li[role=option]")];
  if (e.key === "Escape") return hideSuggest();
  if (box.hidden || !items.length) return;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    sugIdx = (sugIdx + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items.forEach((li, i) => li.classList.toggle("on", i === sugIdx));
  } else if (e.key === "Enter" && sugIdx >= 0) {
    e.preventDefault();
    items[sugIdx].dispatchEvent(new Event("mousedown"));
  }
}
document.addEventListener("click", e => { if (!(e.target.closest && e.target.closest(".search"))) hideSuggest(); });

// ---------------- S — Menu único: destaca a categoria atual ----------------
function setActiveTab(key) {
  document.querySelectorAll("nav.cats button.cat").forEach(b => {
    const on = (b.dataset.cat || b.dataset.tab) === key;
    b.classList.toggle("active", on);
    if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
  });
}

// ---------------- S — Página de contato organizada ----------------
function isOpenNow() {
  const d = new Date(), h = d.getHours(), w = d.getDay();
  return (w >= 1 && w <= 5 && h >= 9 && h < 17) || (w === 6 && h >= 10 && h < 14);
}
function renderContact() {
  document.getElementById("contactPage").innerHTML = `<div class="wrap">
    <aside>
      <section class="box"><h2 class="box-title">Horário de atendimento</h2><div class="box-body">
        <table class="specs"><tr><th>Seg – Sex</th><td>9h – 17h</td></tr><tr><th>Sábado</th><td>10h – 14h</td></tr><tr><th>Domingo</th><td>Fechado</td></tr></table>
        <p class="open-now">${isOpenNow() ? "● Aberto agora" : "● Fechado agora — deixe sua mensagem"}</p>
      </div></section>
      <section class="box"><h2 class="box-title">Perguntas frequentes</h2><div class="box-body"><ul class="side-links">
        <li><button onclick="openChat(); ask('Como acionar a garantia?')">Como acionar a garantia?</button></li>
        <li><button onclick="openChat(); ask('Qual o prazo de entrega?')">Qual o prazo de entrega?</button></li>
        <li><button onclick="commView='forum'; setMode('comm')">Dúvidas técnicas no fórum</button></li>
      </ul></div></section>
    </aside>
    <main>
      <h1 class="page-title">Contato e atendimento <span class="sc">S · Contato organizado em página própria</span></h1>
      <div class="channels">
        <section class="channel main"><div class="ch-ico">💬</div><h3>Chat</h3><p>Resposta imediata para dúvidas sobre produtos, pedidos e entregas.</p><button class="btn btn-buy" onclick="openChat()">Iniciar chat</button></section>
        <section class="channel"><div class="ch-ico">✉</div><h3>Formulário</h3><p>Respondemos no seu e-mail em até 1 dia útil.</p><button class="btn" onclick="document.getElementById('cName').focus()">Escrever mensagem</button></section>
        <section class="channel"><div class="ch-ico">🎓</div><h3>Fórum de suporte</h3><p>Dúvidas técnicas respondidas pela equipe e pela comunidade.</p><button class="btn" onclick="commView='forum'; commArg=null; setMode('comm')">Ir ao fórum</button></section>
      </div>
      <section class="box"><h2 class="box-title">Envie sua mensagem</h2><div class="box-body">
        <form class="reply-form" id="contactForm" onsubmit="sendContact(event)">
          <div class="row2"><label>Nome <input id="cName" required autocomplete="name"></label><label>E-mail <input id="cMail" type="email" required autocomplete="email"></label></div>
          <div class="row2"><label>Assunto <select id="cSubj"><option>Dúvida sobre produto</option><option>Meu pedido / entrega</option><option>Troca e garantia</option><option>Peças e assistência técnica</option><option>Outro assunto</option></select></label>
            <label>Nº do pedido (opcional) <input id="cOrder"></label></div>
          <label>Mensagem <textarea id="cMsg" required rows="5"></textarea></label>
          <button class="btn btn-buy">Enviar mensagem</button>
        </form></div></section>
      <section class="box"><h2 class="box-title">Outros canais</h2><div class="box-body other-ch">
        <p>📞 <b>Telefone</b> (canal secundário, no horário de atendimento): (+47) 00 00 00 00 <small>— número de exemplo</small></p>
        <p>✉ <b>E-mail</b>: atendimento@exemplo.no <small>— endereço de exemplo</small></p>
        <p class="muted">Fax, Skype e os vários e-mails espalhados pelo site antigo foram substituídos por chat, formulário e um único e-mail.</p>
      </div></section>
    </main></div>`;
}
function sendContact(e) {
  e.preventDefault();
  document.getElementById("contactForm").outerHTML = `<div class="success"><h3 style="color:#002966">✔ Mensagem enviada!</h3>
    <p>Protocolo nº ${Math.floor(100000 + Math.random() * 899999)}. Responderemos no seu e-mail em até 1 dia útil.<br><i>(Simulação do protótipo — nada foi enviado.)</i></p></div>`;
}
