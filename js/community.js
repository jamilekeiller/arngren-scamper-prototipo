// ARNGREN — protótipo acadêmico (SCAMPER)
// P — Comunidade: guias de montagem, fórum, projetos e eventos

// ---------------- P — Portal da comunidade ----------------
const FORUM_CATS = [
  { id: "drones", name: "Drones e aeromodelismo", desc: "Pilotagem, calibração, FPV e regras de voo." },
  { id: "hobby", name: "Hobbymodelismo", desc: "Máquinas a vapor, ferromodelismo e modelos RC." },
  { id: "eletro", name: "Eletrônica e robótica", desc: "Robôs, programação, soldagem e projetos." },
  { id: "veic", name: "Veículos elétricos", desc: "Elsykler, scooters, baterias e manutenção." },
  { id: "suporte", name: "Suporte técnico ARNGREN", desc: "Pedidos, garantia e peças — respondido pela equipe." }
];
const GUIDES = [
  { id: 1, title: "Montando o braço robótico educativo", forum: "eletro", level: "Iniciante", time: "2 h", img: IMG("ROBOT-ARM.thumb_3940_image1_robot_arm-162x154.jpg"), products: [19, 31], steps: [
    ["Confira as peças", "Separe as peças por número, seguindo a lista do manual. Faltou alguma? Abra um tópico no fórum de suporte."],
    ["Monte a base", "Encaixe o motor da base e fixe com os 4 parafusos. Não aperte demais: o giro precisa ficar livre."],
    ["Ombro e cotovelo", "Monte os dois motores intermediários e passe os fios pelas guias laterais para não enroscarem."],
    ["Garra", "Monte a garra por último e teste a abertura com a mão antes de ligar."],
    ["Ligue e teste", "Conecte o controle, coloque as pilhas e teste cada eixo separadamente, devagar."],
    ["Desafio", "Tente empilhar 3 tampinhas só com o braço — e poste o vídeo em Projetos dos membros!"]] },
  { id: 2, title: "Primeiro voo: pré-voo e calibração de drones", forum: "drones", level: "Iniciante", time: "40 min", img: IMG("VTOL.LAV.-Trek_Pilot-145x145.jpg"), products: [33, 31], steps: [
    ["Escolha o local", "Área aberta, longe de pessoas, árvores e fios. Confira as regras locais de voo."],
    ["Carregue as baterias", "Carregue por completo as baterias do drone e do controle. Nunca deixe carregando sem supervisão."],
    ["Calibre a bússola", "Siga o procedimento do fabricante, girando o drone nos eixos horizontal e vertical."],
    ["Teste de pairar", "Decole a 2 m, mantenha parado por 30 s e observe se ele deriva para algum lado."],
    ["Pouso seguro", "Desça devagar e desligue os motores só depois de tocar o solo."]] },
  { id: 3, title: "Colocando a máquina a vapor para funcionar", forum: "hobby", level: "Intermediário", time: "1 h", img: IMG("dampmaskin-d10-wilesco-d-10-dampmaskin-78x54.jpg"), products: [40], steps: [
    ["Segurança primeiro", "Trabalhe sobre superfície resistente ao calor e com um adulto por perto. A caldeira fica muito quente."],
    ["Encha a caldeira", "Use água destilada até a marca do visor. Nunca abasteça com a caldeira quente."],
    ["Lubrifique", "Pingue óleo próprio para vapor no cilindro e nos eixos."],
    ["Aqueça", "Acenda as pastilhas de combustível sólido e aguarde a pressão subir (4 a 6 minutos)."],
    ["Dê a partida", "Abra o registro devagar e gire o volante com a mão para iniciar o movimento."],
    ["Depois de usar", "Deixe esfriar totalmente, esvazie a caldeira e seque as peças."]] },
  { id: 4, title: "Trocando a bateria da sua elsykkel", forum: "veic", level: "Intermediário", time: "20 min", img: IMG("elsykkel-SAMMENLEGGBAR-9T_7TK29F-247x186.jpg"), products: [1, 30], steps: [
    ["Desligue tudo", "Desligue o painel e tire a chave da trava da bateria."],
    ["Retire a bateria antiga", "Destrave e puxe a bateria pela trilha. Leve-a a um ponto de descarte correto."],
    ["Confira a compatibilidade", "Confira a tensão (V) e o conector. Na dúvida, pergunte no fórum de suporte."],
    ["Instale a nova", "Encaixe na trilha até ouvir o clique e trave com a chave."],
    ["Primeira carga", "Faça uma carga completa antes do primeiro uso."]] },
  { id: 5, title: "Primeiros passos no ferromodelismo de jardim", forum: "hobby", level: "Avançado", time: "1 dia", img: IMG("tog-stor-10-resize-165x60.jpg"), products: [42, 41], steps: [
    ["Planeje o traçado", "Desenhe o circuito no papel. Curvas muito fechadas fazem o trem descarrilar."],
    ["Prepare o terreno", "Nivele o solo e faça uma base de brita para os trilhos não afundarem com a chuva."],
    ["Monte os trilhos", "Encaixe os trilhos e confira o nível a cada metro."],
    ["Teste devagar", "Rode o trem em baixa velocidade e marque os pontos onde ele trepida."]] }
];
const SEED_TOPICS = [
  { id: 1, cat: "drones", title: "Drone puxando para a esquerda ao pairar", author: "PilotoNoruega", views: 312, solved: true, posts: [
    ["PilotoNoruega", "Depois de uma queda leve, meu drone começou a derivar para a esquerda. Alguma dica?"],
    ["Equipe ARNGREN", "Recalibre a bússola (veja o guia “Primeiro voo”). Se continuar, confira se alguma hélice está empenada.", "staff"],
    ["PilotoNoruega", "Era a hélice! Troquei e resolveu, obrigado!"]] },
  { id: 2, cat: "drones", title: "Onde posso voar perto de Oslo?", author: "Kari_FPV", views: 154, posts: [
    ["Kari_FPV", "Alguém conhece campos de aeromodelismo liberados perto de Oslo?"],
    ["Eriksen77", "O aeroclube da sua cidade costuma ter um campo. Vale entrar em contato com eles."]] },
  { id: 3, cat: "hobby", title: "Máquina a vapor demora para pegar pressão", author: "VaporVintage", views: 98, solved: true, posts: [
    ["VaporVintage", "A minha demora mais de 10 minutos para começar a girar. É normal?"],
    ["Equipe ARNGREN", "O normal é 4 a 6 minutos. Confira se a água não está acima da marca e use pastilhas novas.", "staff"]] },
  { id: 4, cat: "hobby", title: "Mostre sua ferrovia de jardim!", author: "TrilhosDoNorte", views: 540, posts: [
    ["TrilhosDoNorte", "Tópico para compartilhar fotos e dicas das ferrovias de jardim de vocês."],
    ["Ana.Modelista", "Acabei de terminar uma ponte de madeira para o meu circuito, vou postar em Projetos!"]] },
  { id: 5, cat: "eletro", title: "Programando o robô MiP com blocos", author: "Lucas_Bots", views: 203, posts: [
    ["Lucas_Bots", "Alguém tem exemplos de programas para o MiP?"],
    ["RoboLabFan", "Comece pelo modo de seguir linha, é o mais fácil de entender."]] },
  { id: 6, cat: "veic", title: "Autonomia da fatbike no inverno", author: "Snoloper", views: 421, posts: [
    ["Snoloper", "No frio a minha faz uns 35 km em vez de 60. É normal?"],
    ["Equipe ARNGREN", "Sim, baterias de lítio perdem capacidade no frio. Guarde a bateria em local aquecido e encaixe só na hora de sair.", "staff"]] },
  { id: 7, cat: "suporte", title: "Como acionar a garantia?", author: "Marte_N", views: 88, solved: true, posts: [
    ["Marte_N", "Meu carregador parou de funcionar com 3 meses de uso."],
    ["Equipe ARNGREN", "Envie o número do pedido pelo formulário de contato e fazemos a troca.", "staff"]] }
];
const PROJECTS = [
  { id: 1, title: "Locomotiva a vapor no circuito do quintal", author: "Ana.Modelista", img: IMG("dampmaskin-tog-TrackShack-Accucraft-S78-2-Sealion-681-235x158.jpg"), likes: 42 },
  { id: 2, title: "Braço robótico que separa peças por cor", author: "Lucas_Bots", img: IMG("ROBOT-ARM.thumb_3940_image1_robot_arm-162x154.jpg"), likes: 37 },
  { id: 3, title: "Tanque RC com câmera FPV adaptada", author: "Kari_FPV", img: IMG("rctank-torro-14097_14097_20170317113109469-163x164.jpg"), likes: 58 },
  { id: 4, title: "Elsykkel cargo para entregas do bairro", author: "Snoloper", img: IMG("elsykkel-long-john-ZaTI_ykUE-165x93.jpg"), likes: 25 },
  { id: 5, title: "Minha coleção de robôs dos anos 2000", author: "RoboLabFan", img: IMG("robot.384fba1d3651a19b9c614577053802b8-100x116.jpg"), likes: 31 },
  { id: 6, title: "Scooter elétrica restaurada", author: "Snoloper", img: IMG("moped-12-img_3425_wbg_1-160x152.jpg"), likes: 19 },
  { id: 7, title: "Observando a Lua no inverno ártico", author: "Eriksen77", img: IMG("teleskop-r-F1mUtCN7-90x169.jpg"), likes: 27 }
];
let commView = "home", commArg = null;
const nick = () => store.get("arn_nick", "Visitante");
function setNick(v) { store.set("arn_nick", (v || "").trim().slice(0, 20) || "Visitante"); toast("Apelido salvo", nick()); }
const userForum = () => store.get("arn_forum", { topics: [], replies: {}, views: {} });
function allTopics() {
  const u = userForum();
  return [...SEED_TOPICS, ...u.topics].map(t => ({ ...t, posts: [...t.posts, ...(u.replies[t.id] || [])], views: (t.views || 0) + (u.views[t.id] || 0) }));
}
const catById = id => FORUM_CATS.find(c => c.id === id);
const latestTopics = n => allTopics().sort((a, b) => b.id - a.id).slice(0, n);

function guideCard(g) {
  return `<article class="card">
    <button class="thumb" onclick="openGuide(${g.id})" aria-label="Abrir guia ${g.title}"><img src="${g.img}" alt=""></button>
    <div class="body">
      <button class="title" onclick="openGuide(${g.id})">${g.title}</button>
      <div class="meta">${catById(g.forum).name}</div>
      <div class="meta">Nível <b>${g.level}</b> · ⏱ ${g.time} · ${g.steps.length} passos</div>
      <div class="actions"><button class="btn btn-buy btn-block" onclick="openGuide(${g.id})">Abrir guia</button></div>
    </div></article>`;
}
function topicRows(list) {
  if (!list.length) return emptyHTML("Nenhum tópico ainda.", "Que tal criar o primeiro?");
  return `<table class="forum-table"><tr><th>Tópico</th><th>Fórum</th><th>Respostas</th><th>Visitas</th><th>Última mensagem</th></tr>
    ${list.map(t => `<tr>
      <td>${t.solved ? '<span class="solved">✔ Resolvido</span> ' : ""}<button class="link-btn" onclick="renderComm('topic', ${t.id})"><b>${escapeHTML(t.title)}</b></button><br><small>por ${escapeHTML(t.author)}</small></td>
      <td><small>${catById(t.cat).name}</small></td><td class="num">${t.posts.length - 1}</td><td class="num">${t.views}</td>
      <td><small>${escapeHTML(t.posts[t.posts.length - 1][0])}</small></td></tr>`).join("")}</table>`;
}
function projectCard(pr) {
  const liked = store.get("arn_likes", []).includes(pr.id);
  return `<article class="card"><div class="thumb"><img src="${pr.img}" alt="${pr.title}"></div><div class="body">
    <b>${pr.title}</b><div class="meta">por ${pr.author}</div>
    <div class="actions"><button class="btn ${liked ? "btn-buy" : ""} btn-block" onclick="likeProject(${pr.id})">♥ ${pr.likes + (liked ? 1 : 0)} curtidas</button></div></div></article>`;
}
function likeProject(id) {
  const l = store.get("arn_likes", []);
  store.set("arn_likes", l.includes(id) ? l.filter(x => x !== id) : [...l, id]);
  renderComm(commView, commArg);
}
function postHTML([author, text, role], i) {
  return `<div class="post"><div class="user"><b>${escapeHTML(author)}</b><br>
    ${role === "staff" ? '<span class="staff">EQUIPE ARNGREN</span>' : ""}
    <div class="avatar">${role === "staff" ? "🛠" : "👤"}</div></div>
    <div class="text"><small class="post-meta">mensagem #${i + 1}</small><p>${escapeHTML(text)}</p></div></div>`;
}

function renderComm(view, arg) {
  commView = view || "home"; commArg = arg === undefined ? null : arg;
  const topics = allTopics();
  let main = "";
  if (commView === "home") {
    main = `
      <div class="comm-hero">
        <div><span class="starburst">NOVO!</span><h1>Comunidade ARNGREN</h1>
          <p>Aprenda, monte e compartilhe. Guias de montagem passo a passo, fórum de suporte com a nossa equipe técnica e projetos de outros entusiastas de <b>drones</b>, <b>hobbymodelismo</b> e <b>eletrônica</b>.</p></div>
        <div class="comm-stats"><div><b>${GUIDES.length}</b>guias</div><div><b>${topics.length}</b>tópicos</div><div><b>1 284</b>membros</div></div>
      </div>
      <div class="box sc-box"><h2 class="box-title">Guias de montagem em destaque <span class="sc">P · Guias de montagem</span></h2>
        <div class="box-body"><div class="grid">${GUIDES.slice(0, 4).map(guideCard).join("")}</div></div></div>
      <div class="box sc-box"><h2 class="box-title">Últimas do fórum <span class="sc">P · Fórum de suporte</span></h2>
        <div class="box-body">${topicRows(latestTopics(5))}
          <p style="margin-top:6px"><button class="btn btn-buy" onclick="renderComm('new')">+ Criar novo tópico</button> <button class="btn" onclick="renderComm('forum')">Ver todos os fóruns »</button></p></div></div>
      <div class="box"><h2 class="box-title">Projetos dos membros</h2>
        <div class="box-body"><div class="grid">${PROJECTS.slice(0, 4).map(projectCard).join("")}</div></div></div>`;
  } else if (commView === "guides") {
    main = `<div class="box sc-box"><h2 class="box-title">Guias de montagem <span class="sc">P · Guias de montagem</span></h2>
      <div class="box-body"><div class="grid">${GUIDES.map(guideCard).join("")}</div></div></div>`;
  } else if (commView === "forum") {
    main = `<div class="box sc-box"><h2 class="box-title">Fórum de suporte <span class="sc">P · Fórum de suporte</span></h2><div class="box-body">
      <table class="forum-table"><tr><th>Fórum</th><th>Tópicos</th><th>Mensagens</th><th>Último tópico</th></tr>
      ${FORUM_CATS.map(c => {
        const ts = topics.filter(t => t.cat === c.id).sort((a, b) => b.id - a.id);
        return `<tr><td><span class="forum-ico">${c.id === "suporte" ? "🛠" : "💬"}</span><button class="link-btn" onclick="renderComm('cat','${c.id}')"><b>${c.name}</b></button><br><small>${c.desc}</small></td>
          <td class="num">${ts.length}</td><td class="num">${ts.reduce((s, t) => s + t.posts.length, 0)}</td><td><small>${ts[0] ? escapeHTML(ts[0].title) : "—"}</small></td></tr>`;
      }).join("")}</table>
      <p style="margin-top:6px"><button class="btn btn-buy" onclick="renderComm('new')">+ Criar novo tópico</button></p></div></div>`;
  } else if (commView === "cat") {
    const c = catById(arg);
    main = `<div class="comm-crumb"><button class="link-btn" onclick="renderComm('forum')">Fórum</button> » <b>${c.name}</b></div>
      <div class="box"><h2 class="box-title">${c.name}</h2><div class="box-body"><p style="margin-bottom:6px">${c.desc}</p>
      ${topicRows(topics.filter(t => t.cat === c.id).sort((a, b) => b.id - a.id))}
      <p style="margin-top:6px"><button class="btn btn-buy" onclick="renderComm('new', {cat:'${c.id}'})">+ Novo tópico neste fórum</button></p></div></div>`;
  } else if (commView === "topic") {
    const u = userForum(); u.views[arg] = (u.views[arg] || 0) + 1; store.set("arn_forum", u);
    const t = topics.find(x => x.id === arg);
    main = `<div class="comm-crumb"><button class="link-btn" onclick="renderComm('forum')">Fórum</button> » <button class="link-btn" onclick="renderComm('cat','${t.cat}')">${catById(t.cat).name}</button> » <b>${escapeHTML(t.title)}</b></div>
      <div class="box"><h2 class="box-title">${t.solved ? "✔ " : ""}${escapeHTML(t.title)}</h2><div class="box-body">
        ${t.posts.map(postHTML).join("")}
        <form class="reply-form" onsubmit="replyTopic(event, ${t.id})">
          <b>Responder como ${escapeHTML(nick())}</b>
          <textarea id="replyText" required rows="3" placeholder="Escreva sua resposta..."></textarea>
          <button class="btn btn-buy">Enviar resposta</button>
        </form></div></div>`;
  } else if (commView === "new") {
    const a = arg || {};
    main = `<div class="box"><h2 class="box-title">Criar novo tópico</h2><div class="box-body">
      <form class="reply-form" onsubmit="createTopic(event)">
        <label>Fórum <select id="ntCat">${FORUM_CATS.map(c => `<option value="${c.id}" ${c.id === a.cat ? "selected" : ""}>${c.name}</option>`).join("")}</select></label>
        <label>Título <input id="ntTitle" required maxlength="80" value="${escapeHTML(a.title || "")}"></label>
        <label>Mensagem <textarea id="ntText" required rows="5" placeholder="Descreva sua dúvida ou ideia..."></textarea></label>
        <small>Postando como <b>${escapeHTML(nick())}</b>. Dúvidas de suporte são respondidas pela equipe ARNGREN.</small>
        <button class="btn btn-buy">Publicar tópico</button>
      </form></div></div>`;
  } else if (commView === "events") {
    main = eventsHTML();
  } else if (commView === "projects") {
    main = `<div class="box"><h2 class="box-title">Projetos dos membros</h2><div class="box-body">
      <span class="sc">P · Galeria em mosaico</span><div class="mosaic">${PROJECTS.map(pr => projectCard(pr)).join("")}</div>
      <p style="margin-top:8px"><button class="btn btn-buy" onclick="toast('Enviar projeto', 'No site real, aqui abriria o envio de fotos e vídeo.')">+ Enviar meu projeto</button></p></div></div>`;
  }
  const links = [["home", "Início da comunidade"], ["guides", "Guias de montagem"], ["forum", "Fórum de suporte"], ["projects", "Projetos dos membros"], ["events", "Eventos e encontros"], ["new", "Criar novo tópico"]];
  document.getElementById("commPortal").innerHTML = `<div class="wrap">
    <aside>
      <div class="box sc-box"><h2 class="box-title">Comunidade <span class="sc">P · Portal interativo</span></h2><div class="box-body"><ul class="side-links">
        ${links.map(([v, l]) => `<li><button onclick="renderComm('${v}')" ${commView === v ? 'style="font-weight:bold"' : ""}>${l}</button></li>`).join("")}
      </ul></div></div>
      <div class="box"><h2 class="box-title">Quem está online</h2><div class="box-body"><small><b>128</b> membros online:<br>PilotoNoruega, Kari_FPV, VaporVintage, Lucas_Bots, Ana.Modelista e <b style="color:#002966">Equipe ARNGREN</b></small></div></div>
      <div class="box"><h2 class="box-title">Loja</h2><div class="box-body"><button class="btn btn-block" onclick="setMode('shop')">« Voltar para a loja</button></div></div>
    </aside>
    <main>${main}</main></div>`;
}
function replyTopic(e, id) {
  e.preventDefault();
  const u = userForum();
  (u.replies[id] = u.replies[id] || []).push([nick(), document.getElementById("replyText").value.trim()]);
  store.set("arn_forum", u);
  renderComm("topic", id);
  toast("Resposta publicada", "Obrigado por ajudar a comunidade!");
}
function createTopic(e) {
  e.preventDefault();
  const u = userForum(), id = Date.now();
  u.topics.push({ id, cat: document.getElementById("ntCat").value, title: document.getElementById("ntTitle").value.trim(), author: nick(), views: 0,
    posts: [[nick(), document.getElementById("ntText").value.trim()]] });
  store.set("arn_forum", u);
  renderComm("topic", id); renderCommTeaser();
  toast("Tópico publicado", "A equipe ARNGREN responde dúvidas de suporte.");
}
function openGuide(id, step) {
  step = step || 0;
  const g = GUIDES.find(x => x.id === id), n = g.steps.length, [st, tx] = g.steps[step];
  document.getElementById("modalTitle").textContent = "Guia de montagem — " + g.title;
  document.getElementById("modalBody").innerHTML = `
    <div class="guide-head"><span class="imgbox big"><img src="${g.img}" alt=""></span>
      <div><h2>${g.title}</h2><div class="meta">${catById(g.forum).name} · Nível <b>${g.level}</b> · ⏱ ${g.time}</div></div></div>
    <div class="steps-bar">${g.steps.map((_, i) => `<span class="${i <= step ? "on" : ""}"></span>`).join("")}</div>
    <div class="step-box"><div class="step-n">Passo ${step + 1} de ${n}</div><h3>${st}</h3><p>${tx}</p></div>
    <p>
      <button class="btn" ${step === 0 ? "disabled" : ""} onclick="openGuide(${id}, ${step - 1})">« Anterior</button>
      ${step < n - 1
        ? `<button class="btn btn-buy" onclick="openGuide(${id}, ${step + 1})">Próximo passo »</button>`
        : `<button class="btn btn-buy" onclick="completeGuide(${id})">✔ Concluir guia</button>`}
      <button class="btn" onclick="askAboutGuide(${id})">❓ Tirar dúvida no fórum</button>
    </p>
    <div class="section-sub">Produtos usados neste guia</div>
    <div class="acc-list">${g.products.map(byId).map(a => `<div class="acc-item"><span class="imgbox"><img src="${a.src}" alt=""></span><div><b>${a.name}</b><br><span class="price" style="font-size:12px">${fmt(a.price)}</span><br>
      ${a.stock ? `<button class="link-btn" onclick="addToCart(${a.id})">+ adicionar</button>` : '<span class="stock no">Esgotado</span>'}</div></div>`).join("")}</div>`;
  show("modal");
}
function askAboutGuide(id) {
  const g = GUIDES.find(x => x.id === id);
  closeAll(); commView = "new"; commArg = { cat: g.forum, title: "Dúvida no guia: " + g.title }; setMode("comm");
}
function guidesFor(p) {
  const gs = GUIDES.filter(g => g.products.includes(p.id));
  return gs.length ? `<div class="section-sub">Guias da comunidade para este produto</div>
    <p>${gs.map(g => `📘 <button class="link-btn" onclick="openGuide(${g.id})">${g.title}</button> <small>(${g.level}, ${g.time})</small>`).join("<br>")}</p>` : "";
}
function renderCommTeaser() {
  const el = document.getElementById("commTeaser"); if (!el) return;
  el.innerHTML = `<div class="grid">${GUIDES.slice(0, 4).map(guideCard).join("")}</div>
    <div class="section-sub">Últimas do fórum</div>
    ${topicRows(latestTopics(3))}
    <p style="margin-top:6px"><button class="btn btn-buy" onclick="setMode('comm')">Entrar na comunidade »</button></p>`;
}


document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeAll();
  if (document.body.classList.contains("mag") && !document.getElementById("overlay").classList.contains("show") && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) {
    if (e.key === "ArrowRight") magGo(1);
    if (e.key === "ArrowLeft") magGo(-1);
  }
});
