// ARNGREN — protótipo acadêmico (SCAMPER)
// Catálogo: produtos, categorias, fotos e moedas

// ---------------- Dados (imagens carregadas do próprio arngren.net) ----------------
// Fotos: vêm do arngren.net; se o site estiver fora do ar, usa as cópias do Internet Archive
const ARN_BASE = "https://arngren.net/sitebuilder/images/";
const ARCHIVE = u => "https://web.archive.org/web/2026id_/" + u;
let ARN_DOWN = false;
const IMG = f => ARN_DOWN ? ARCHIVE(ARN_BASE + f) : ARN_BASE + f;

const CATEGORIES = {
  "Bicicletas Elétricas": ["Dobráveis", "Fatbikes", "Triciclos e cargo", "Urbanas"],
  "Scooters & Mopeds": ["Scooters", "Mopeds"],
  "Carros Elétricos Infantis": ["Jipes", "Utilitários", "Karts"],
  "ATV & Jardim": ["Quadriciclos", "Mini tratores", "Jardinagem"],
  "Robôs & RC": ["Robôs", "Controle remoto"],
  "Óptica & Gadgets": ["Óptica", "Eletrônicos"],
  "Hobby & Colecionáveis": ["Modelismo a vapor", "Ferromodelismo", "Colecionáveis"],
  "Acessórios": ["Energia", "Ferramentas", "Para ciclistas"]
};
const CAT_SHORT = { "Bicicletas Elétricas": "Bicicletas", "Scooters & Mopeds": "Scooters", "Carros Elétricos Infantis": "Carros infantis", "ATV & Jardim": "ATV & Jardim", "Robôs & RC": "Robôs & RC", "Óptica & Gadgets": "Gadgets", "Hobby & Colecionáveis": "Hobby", "Acessórios": "Acessórios" };
const INTERESTS = ["Lazer", "Transporte", "Tecnologia", "Entretenimento"];

const P = [
  // Bicicletas elétricas
  { id:1, name:"Elsykkel Dobrável 250W", cat:"Bicicletas Elétricas", sub:"Dobráveis", brand:"Freego", price:9990, stock:true, img:"elsykkel-SAMMENLEGGBAR-9T_7TK29F-247x186.jpg", tags:["best"], interests:["Transporte"], specs:{"Motor":"250 W","Autonomia":"50 km","Velocidade":"25 km/h","Peso":"19 kg"}, acc:[30,32,33], desc:"Bicicleta elétrica dobrável que cabe no porta-malas — ideal para quem combina bike e transporte público." },
  { id:2, name:"Fatbike Elétrica 1000W", cat:"Bicicletas Elétricas", sub:"Fatbikes", brand:"EBR", price:14990, old:17990, stock:true, img:"elsykke-fatbike-stor-84760_Fat_bike_1000w_48v_2018mod_n__med_Hydraulisk_1-236x144.jpg", tags:["offer"], interests:["Lazer","Transporte"], specs:{"Motor":"1000 W","Autonomia":"60 km","Velocidade":"25 km/h","Peso":"32 kg"}, acc:[30,32,33], desc:"Pneus largos para neve, areia e trilha, com freio hidráulico." },
  { id:3, name:"Triciclo Elétrico Fatbike", cat:"Bicicletas Elétricas", sub:"Triciclos e cargo", brand:"EBR", price:17990, stock:true, img:"elsykkel-3-hjul-fatbike-x4Edvc2m-200x164.jpg", tags:["new"], interests:["Transporte","Lazer"], specs:{"Motor":"750 W","Autonomia":"45 km","Rodas":"3","Peso":"41 kg"}, acc:[30,33], desc:"Três rodas para mais estabilidade e cesto traseiro para compras." },
  { id:4, name:"Elsykkel Cargo Long John", cat:"Bicicletas Elétricas", sub:"Triciclos e cargo", brand:"Freego", price:24990, stock:false, img:"elsykkel-long-john-ZaTI_ykUE-165x93.jpg", tags:[], multi:true, interests:["Transporte"], specs:{"Motor":"500 W","Autonomia":"70 km","Carga":"100 kg","Peso":"38 kg"}, acc:[30,33], desc:"Transporta crianças ou carga — substitui o carro em trajetos curtos." },
  { id:5, name:"Elsykkel Urbana Feminina", cat:"Bicicletas Elétricas", sub:"Urbanas", brand:"Freego", price:7990, stock:true, img:"elsykkel-dame-rod-80668_El_sykkel_Freego_250w_36v_1-230x140.jpg", tags:["best"], interests:["Transporte","Lazer"], specs:{"Motor":"250 W","Autonomia":"40 km","Velocidade":"25 km/h","Peso":"22 kg"}, acc:[30,32,33], desc:"Quadro rebaixado, cesto frontal e bateria removível." },
  // Scooters & Mopeds
  { id:6, name:"Scooter Elétrica 3 Rodas", cat:"Scooters & Mopeds", sub:"Scooters", brand:"VoltRide", price:12990, stock:true, img:"elscooter-3hjul-1-222x185.jpg", tags:["best"], interests:["Transporte"], specs:{"Motor":"800 W","Autonomia":"40 km","Velocidade":"25 km/h","Peso":"58 kg"}, acc:[30,31,33], desc:"Scooter de mobilidade com assento confortável e cesto." },
  { id:7, name:"Moped Elétrica Retrô 3000W", cat:"Scooters & Mopeds", sub:"Mopeds", brand:"Moden", price:19990, stock:true, img:"moped-el-10-03337_MODEN_RETRO_3000w__1-161x154.jpg", tags:["new"], interests:["Transporte","Lazer"], specs:{"Motor":"3000 W","Autonomia":"70 km","Velocidade":"45 km/h","Peso":"85 kg"}, acc:[30,31,35], desc:"Visual clássico com motor elétrico silencioso e homologada para rua." },
  { id:8, name:"Scooter Chopper 1500W", cat:"Scooters & Mopeds", sub:"Scooters", brand:"VoltRide", price:16990, old:18990, stock:true, img:"elscooter-med-skilt-86181_Harley_Scooter_1500w_60v_20AH_6-184x108.jpg", tags:["offer"], interests:["Lazer","Transporte"], specs:{"Motor":"1500 W","Autonomia":"55 km","Velocidade":"45 km/h","Peso":"70 kg"}, acc:[30,31,35], desc:"Scooter estilo chopper com pneus largos e placa homologada." },
  // Carros infantis
  { id:9, name:"Jeep Willys Elétrico Infantil", cat:"Carros Elétricos Infantis", sub:"Jipes", brand:"Peak", price:4990, stock:true, img:"elbil-willy-stor-stor-OBjpzNDYB-171x115.jpg", tags:["best"], interests:["Entretenimento","Lazer"], specs:{"Bateria":"12 V","Velocidade":"6 km/h","Idade":"3–8 anos","Controle":"Remoto parental"}, acc:[31,33], desc:"Réplica de jipe clássico com rodas de borracha e banco de couro." },
  { id:10, name:"Caminhão de Bombeiros Elétrico", cat:"Carros Elétricos Infantis", sub:"Utilitários", brand:"Peak", price:5990, stock:true, img:"elbil-brannbil-img_2701_2-205x205.jpg", tags:["new"], multi:true, interests:["Entretenimento"], specs:{"Bateria":"12 V","Velocidade":"5 km/h","Idade":"3–7 anos","Extra":"Canhão de água"}, acc:[31], desc:"Carro elétrico e brinquedo de água em um: tem canhão de água funcional." },
  { id:11, name:"Defender Elétrico Infantil", cat:"Carros Elétricos Infantis", sub:"Jipes", brand:"Peak", price:6490, stock:true, img:"elbil-defender-lG2PWdts-160x160.jpg", tags:[], interests:["Entretenimento","Lazer"], specs:{"Bateria":"24 V","Velocidade":"8 km/h","Idade":"4–10 anos","Assentos":"2"}, acc:[31,33], desc:"Dois lugares, tração forte e bancos de couro sintético." },
  { id:12, name:"Kart Elétrico Vermelho", cat:"Carros Elétricos Infantis", sub:"Karts", brand:"Kidz", price:3990, old:4590, stock:true, img:"elbil-GOKART-rod-1-Elektrisk_go_kart_red-6-136x136.jpg", tags:["offer"], interests:["Entretenimento"], specs:{"Bateria":"24 V","Velocidade":"12 km/h","Idade":"6–12 anos","Freio":"Disco"}, acc:[31], desc:"Kart elétrico com assento ajustável e limitador de velocidade." },
  // ATV & Jardim
  { id:13, name:"ATV Elétrico 1500W", cat:"ATV & Jardim", sub:"Quadriciclos", brand:"VoltRide", price:21990, stock:true, img:"el-atv_1500W_EEC_2016_3_-131x104.jpg", tags:[], interests:["Lazer"], specs:{"Motor":"1500 W","Autonomia":"40 km","Velocidade":"40 km/h","Peso":"120 kg"}, acc:[30,34,31], desc:"Quadriciclo elétrico homologado, para trilhas e fazendas." },
  { id:14, name:"Utilitário 6x4 Infantil", cat:"ATV & Jardim", sub:"Quadriciclos", brand:"John Deere", price:8990, stock:true, img:"john-deer-6x4-1-159x87.jpg", tags:["best"], multi:true, interests:["Entretenimento","Lazer"], specs:{"Bateria":"12 V","Velocidade":"8 km/h","Idade":"3–8 anos","Caçamba":"Basculante"}, acc:[31], desc:"Veículo infantil com caçamba basculante — brinca e ajuda no jardim." },
  { id:15, name:"Mini Trator com Pá Carregadeira", cat:"ATV & Jardim", sub:"Mini tratores", brand:"John Deere", price:3490, stock:false, img:"eltraktor1-groundloader_product-95x60.jpg", tags:[], multi:true, interests:["Entretenimento"], specs:{"Bateria":"12 V","Velocidade":"4 km/h","Idade":"3–6 anos","Pá":"Funcional"}, acc:[31], desc:"Trator elétrico com pá frontal que realmente carrega areia." },
  { id:16, name:"Cortador de Grama Elétrico", cat:"ATV & Jardim", sub:"Jardinagem", brand:"GreenCut", price:2990, stock:true, img:"gressklipper13-161x126.jpg", tags:["new"], interests:["Lazer"], specs:{"Largura":"38 cm","Motor":"1600 W","Coletor":"40 L","Peso":"14 kg"}, acc:[], desc:"Leve e silencioso, sem gasolina." },
  // Robôs & RC
  { id:17, name:"Tanque RC Tiger 1:16", cat:"Robôs & RC", sub:"Controle remoto", brand:"Torro", price:2490, stock:true, img:"rctank-torro-14097_14097_20170317113109469-163x164.jpg", tags:["best"], interests:["Entretenimento","Tecnologia"], specs:{"Escala":"1:16","Alcance":"80 m","Som":"Motor e disparo","Fumaça":"Sim"}, acc:[31], desc:"Tanque de controle remoto com som, fumaça e torre giratória." },
  { id:18, name:"Robô Humanoide Robosapien X", cat:"Robôs & RC", sub:"Robôs", brand:"WowWee", price:990, stock:true, img:"robosapien-x-14-116x112.jpg", tags:[], interests:["Tecnologia","Entretenimento"], specs:{"Funções":"67","Controle":"Remoto / app","Altura":"36 cm","Idade":"8+"}, acc:[], desc:"Robô que anda, dança e pega objetos." },
  { id:19, name:"Braço Robótico Educativo", cat:"Robôs & RC", sub:"Robôs", brand:"RoboLab", price:790, stock:true, img:"ROBOT-ARM.thumb_3940_image1_robot_arm-162x154.jpg", tags:["new"], multi:true, interests:["Tecnologia"], specs:{"Eixos":"5","Montagem":"Kit","Controle":"Com fio","Idade":"10+"}, acc:[], desc:"Brinquedo e aula de mecânica: você monta e programa os movimentos." },
  { id:20, name:"Robô MiP Equilibrista", cat:"Robôs & RC", sub:"Robôs", brand:"WowWee", price:890, old:1190, stock:true, img:"robot-mip-99-97x97.jpg", tags:["offer"], interests:["Tecnologia","Entretenimento"], specs:{"Controle":"App / gestos","Bateria":"4×AAA","Altura":"18 cm","Idade":"8+"}, acc:[], desc:"Robô que se equilibra em duas rodas e responde a gestos." },
  // Óptica & Gadgets
  { id:21, name:"Binóculo Digital com Câmera", cat:"Óptica & Gadgets", sub:"Óptica", brand:"Bresser", price:1490, stock:true, img:"kikkert-222652_ts-187x163.jpg", tags:["best"], multi:true, interests:["Tecnologia","Lazer"], specs:{"Zoom":"10×","Câmera":"5 MP","Vídeo":"Sim","Memória":"Cartão SD"}, acc:[33], desc:"Observa e fotografa ao mesmo tempo." },
  { id:22, name:"Telescópio Refrator 70 mm", cat:"Óptica & Gadgets", sub:"Óptica", brand:"Bresser", price:2990, stock:true, img:"teleskop-r-F1mUtCN7-90x169.jpg", tags:["new"], interests:["Tecnologia","Lazer"], specs:{"Abertura":"70 mm","Aumento":"até 140×","Tripé":"Alumínio","Peso":"4 kg"}, acc:[33], desc:"Ideal para observar a Lua e planetas." },
  { id:23, name:"Tradutor Eletrônico de Bolso", cat:"Óptica & Gadgets", sub:"Eletrônicos", brand:"Ectaco", price:690, stock:true, img:"oversetter29.1-138x104.jpg", tags:[], interests:["Tecnologia"], specs:{"Idiomas":"12","Voz":"Sim","Tela":"LCD","Bateria":"2×AAA"}, acc:[], desc:"Tradução falada e escrita para viagens." },
  // Acessórios
  { id:30, name:"Kit Solar 200W", cat:"Acessórios", sub:"Energia", brand:"SolarPro", price:3490, stock:true, img:"solcellepakke-1-79933_Solcellepakke__Standard_200W_1-163x125.jpg", tags:[], interests:["Transporte","Tecnologia"], specs:{"Potência":"200 W","Uso":"Recarga de baterias de veículos elétricos"}, acc:[], desc:"Recarregue sua elsykkel ou scooter com energia solar." },
  { id:31, name:"Inversor 12V → 230V", cat:"Acessórios", sub:"Energia", brand:"VoltRide", price:590, stock:true, img:"OMFORMER-omformer-10-54755_1-173x173-109x109.jpg", tags:[], interests:["Tecnologia"], specs:{"Potência":"300 W","Uso":"Carregadores e eletrônicos"}, acc:[], desc:"Converte a energia da bateria para tomada comum." },
  { id:32, name:"Ciclocomputador sem fio", cat:"Acessórios", sub:"Para ciclistas", brand:"Sigma", price:290, stock:true, img:"Sykkel-computer.LAV-a-72x52.jpg", tags:[], interests:["Transporte"], specs:{"Funções":"Velocidade, distância, tempo","Tela":"LCD"}, acc:[], desc:"Mostra velocidade, distância e tempo de pedal." },
  { id:33, name:"Lanterna LED Cree", cat:"Acessórios", sub:"Para ciclistas", brand:"Cree", price:390, stock:true, img:"LYKT-cree.x60-2-480x299-134x82.jpg", tags:[], interests:["Transporte","Lazer"], specs:{"Lúmens":"900","Bateria":"Recarregável USB"}, acc:[], desc:"Iluminação forte para bike, scooter ou camping." },
  { id:34, name:"Macaco Pneumático", cat:"Acessórios", sub:"Ferramentas", brand:"ForteTools", price:1290, stock:false, img:"Luft-Jekk-stort.828852_AB_00_FB.EPS-176x105.jpg", tags:[], interests:["Transporte"], specs:{"Capacidade":"3 t","Acionamento":"Ar comprimido"}, acc:[], desc:"Levanta ATVs e carros em segundos." },
  { id:35, name:"Bafômetro Digital", cat:"Acessórios", sub:"Ferramentas", brand:"Safe-Drive", price:490, stock:true, img:"Alkotester.LAV.Safe-Drive_2-93x75.jpg", tags:[], interests:["Transporte"], specs:{"Sensor":"Semicondutor","Tela":"LCD"}, acc:[], desc:"Segurança para quem pilota mopeds e scooters." },
  // Hobby & Colecionáveis
  { id:40, name:"Máquina a Vapor Wilesco D10", cat:"Hobby & Colecionáveis", sub:"Modelismo a vapor", brand:"Wilesco", price:3490, stock:true, img:"dampmaskin-d10-wilesco-d-10-dampmaskin-78x54.jpg", tags:["new"], interests:["Tecnologia","Entretenimento"], specs:{"Caldeira":"Latão","Combustível":"Pastilhas sólidas","Idade":"14+","Peso":"1,2 kg"}, acc:[], desc:"Máquina a vapor de verdade, em miniatura — um clássico do hobbymodelismo." },
  { id:41, name:"Locomotiva a Vapor Vivo Sealion", cat:"Hobby & Colecionáveis", sub:"Ferromodelismo", brand:"Accucraft", price:29990, stock:true, img:"dampmaskin-tog-TrackShack-Accucraft-S78-2-Sealion-681-235x158.jpg", tags:[], interests:["Entretenimento","Tecnologia"], specs:{"Escala":"1:20,3","Bitola":"45 mm","Tração":"Vapor vivo","Peso":"3,5 kg"}, acc:[], rare:"Edição limitada, numerada", desc:"Locomotiva movida a vapor de verdade para ferrovias de jardim. Peça de colecionador." },
  { id:42, name:"Trem Elétrico de Jardim", cat:"Hobby & Colecionáveis", sub:"Ferromodelismo", brand:"Peak", price:4990, stock:true, img:"tog-stor-10-resize-165x60.jpg", tags:["best"], interests:["Entretenimento","Lazer"], specs:{"Bitola":"45 mm","Trilhos":"12 m inclusos","Uso":"Interno e externo","Idade":"8+"}, acc:[31], desc:"Kit inicial de ferromodelismo resistente à chuva, ideal para o quintal." },
  { id:43, name:"Robô R2-D2 Interativo", cat:"Hobby & Colecionáveis", sub:"Colecionáveis", brand:"Hasbro", price:1990, stock:true, img:"r2d2-101x101.jpg", tags:[], interests:["Entretenimento","Tecnologia"], specs:{"Comandos de voz":"Sim","Altura":"40 cm","Projetor":"Sim","Idade":"8+"}, acc:[], rare:"Colecionável fora de linha", desc:"Réplica interativa que responde a comandos de voz e projeta mensagens." },
  { id:44, name:"Dinossauro Robô Pleo", cat:"Hobby & Colecionáveis", sub:"Colecionáveis", brand:"Ugobe", price:2490, stock:false, img:"pleo.0070887621276_AV1_500X500-110x110.jpg", tags:[], interests:["Tecnologia","Entretenimento"], specs:{"Sensores":"38","Motores":"14","Bateria":"1 h","Idade":"8+"}, acc:[], rare:"Últimas unidades — fora de linha", desc:"Filhote de dinossauro robótico que aprende e desenvolve personalidade." },
  { id:45, name:"Monopoly Edição de Colecionador", cat:"Hobby & Colecionáveis", sub:"Colecionáveis", brand:"Hasbro", price:890, stock:true, img:"Figur-STARWARS-MONOPOL.HG42452lg-108x81.jpg", tags:[], interests:["Entretenimento"], specs:{"Jogadores":"2–6","Peças":"Miniaturas","Idade":"8+"}, acc:[], rare:"Edição de colecionador", desc:"Edição especial com peças em miniatura detalhadas." },
  { id:46, name:"Roboraptor", cat:"Hobby & Colecionáveis", sub:"Colecionáveis", brand:"WowWee", price:990, stock:true, img:"Roboraptor.0.1425.sz.102575.00-87x50.jpg", tags:[], interests:["Tecnologia","Entretenimento"], specs:{"Modos":"3 humores","Controle":"Remoto","Sensores":"Toque e som","Idade":"8+"}, acc:[], rare:"Clássico dos anos 2000", desc:"Dinossauro robô clássico com movimentos realistas." }
];
P.forEach(p => Object.defineProperty(p, "src", { get: () => IMG(p.img), enumerable: true }));

// A — atributos para filtros inteligentes e assistente: [tamanho, potência (W), finalidades]
const PURPOSES = ["Transporte diário", "Lazer e trilha", "Para crianças", "Casa e jardim", "Aprender e explorar", "Diversão e presentes"];
const [T, L, C, J, A, D] = PURPOSES;
const EXTRA = {
  1:["Compacto",250,[T]], 2:["Grande",1000,[L,T]], 3:["Grande",750,[T,L]], 4:["Grande",500,[T]], 5:["Médio",250,[T]],
  6:["Grande",800,[T]], 7:["Grande",3000,[T,L]], 8:["Grande",1500,[L,T]],
  9:["Médio",null,[C,D]], 10:["Médio",null,[C,D]], 11:["Grande",null,[C,D]], 12:["Médio",null,[C,D]],
  13:["Grande",1500,[L,J]], 14:["Médio",null,[C,J]], 15:["Compacto",null,[C,D]], 16:["Médio",1600,[J]],
  17:["Médio",null,[D]], 18:["Compacto",null,[D,A]], 19:["Compacto",null,[A]], 20:["Compacto",null,[D,A]],
  21:["Compacto",null,[A,L]], 22:["Médio",null,[A]], 23:["Compacto",null,[A]],
  30:["Grande",200,[J,T]], 31:["Compacto",300,[J]], 32:["Compacto",null,[T]], 33:["Compacto",null,[L,T]], 34:["Médio",null,[J]], 35:["Compacto",null,[T]],
  40:["Médio",null,[A,D]], 41:["Grande",null,[D]], 42:["Grande",null,[D,C]], 43:["Compacto",null,[D,A]], 44:["Médio",null,[D,C]], 45:["Médio",null,[D]], 46:["Médio",null,[D,C]]
};
P.forEach(p => { const [size, power, purpose] = EXTRA[p.id]; Object.assign(p, { size, power, purpose }); });
P.find(p => p.id === 18).rare = "Clássico dos anos 2000 — fora de linha";
const byId = id => P.find(p => p.id === id);
const fmt = v => "kr " + v.toLocaleString("nb-NO") + ",-";   // preço-base: coroa norueguesa (NOK)

// A — Preços na moeda local: o catálogo continua em NOK e a exibição converte conforme o idioma.
// Taxas fixas de referência para o protótipo (atualize aqui se quiser outros valores).
const CURRENCY = {
  pt: { code: "BRL", rate: 0.50, show: v => "R$ " + v.toLocaleString("pt-BR") },
  en: { code: "USD", rate: 0.092, show: v => "US$ " + v.toLocaleString("en-US") },
  no: { code: "NOK", rate: 1, show: v => "kr " + v.toLocaleString("nb-NO") + ",-" }
};
const curr = () => CURRENCY[typeof LANG === "string" ? LANG : "pt"];
const money = nok => curr().show(Math.round(nok * curr().rate));
const toNOK = local => Math.round(local / curr().rate);
const KR_NUM = "(\\d[\\d\\s\\u00a0\\u202f]*\\d|\\d)";
function convertPrices(str) {
  if (!str || curr().code === "NOK" || !/kr/.test(str)) return str;
  const n = a => +a.replace(/\D/g, "");
  str = str.replace(new RegExp("kr[\\s\\u00a0]?" + KR_NUM + "[\\s\\u00a0]?–[\\s\\u00a0]?" + KR_NUM, "g"), (m, a, b) => money(n(a)) + " – " + money(n(b)));
  return str.replace(new RegExp("kr[\\s\\u00a0\\u202f]?" + KR_NUM + "(,-)?", "g"), (m, a) => money(n(a)));
}
