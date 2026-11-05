// ARNGREN — protótipo acadêmico (SCAMPER)
// A — Idiomas (PT, EN, NO) e preços na moeda local

// =====================================================================
// A — Outros idiomas: Português · English · Norsk
// Traduz a interface no navegador (o texto original fica guardado)
// =====================================================================
let LANG = store.get("arn_lang", "pt");
const TL = (pt, en, no) => LANG === "en" ? en : LANG === "no" ? no : pt;

const I18N = {
  // ---------- topo, navegação e modos ----------
  "Meu carrinho": ["My cart", "Handlekurv"], "Contato e atendimento": ["Contact & support", "Kontakt og kundeservice"],
  "Texto:": ["Text:", "Tekst:"], "Alto contraste": ["High contrast", "Høy kontrast"], "Modo escuro": ["Dark mode", "Mørk modus"], "Modo claro": ["Light mode", "Lys modus"],
  "Protótipo acadêmico": ["Academic prototype", "Akademisk prototype"], "de redesign (técnica SCAMPER)": ["of a redesign (SCAMPER technique)", "for et redesign (SCAMPER-teknikken)"],
  "não é o site oficial da Arngren": ["not the official Arngren website", "ikke Arngrens offisielle nettsted"],
  "Nenhuma compra, mensagem ou cadastro é real.": ["No purchase, message or sign-up is real.", "Ingen kjøp, meldinger eller registreringer er ekte."],
  "Pular para o conteúdo": ["Skip to content", "Hopp til innholdet"], "página inicial": ["home page", "forside"],
  "Todas as categorias": ["All categories", "Alle kategorier"], "Buscar": ["Search", "Søk"], "Carrinho": ["Cart", "Handlekurv"], "Comparar": ["Compare", "Sammenlign"], "Menu": ["Menu", "Meny"],
  "O que você procura? Ex.: bicicleta elétrica, robô, scooter...": ["What are you looking for? E.g. electric bike, robot, scooter...", "Hva leter du etter? F.eks. elsykkel, robot, scooter..."],
  "Buscar produtos": ["Search products", "Søk etter produkter"], "Pesquisar na categoria": ["Search in category", "Søk i kategori"], "Sugestões": ["Suggestions", "Forslag"], "ver categoria": ["see category", "se kategori"],
  "Início": ["Home", "Hjem"], "Comunidade": ["Community", "Fellesskap"], "COMUNIDADE": ["COMMUNITY", "FELLESSKAP"],
  "Frete grátis acima de kr 5 000": ["Free shipping over kr 5 000", "Fri frakt over kr 5 000"], "Satisfação garantida": ["Satisfaction guaranteed", "Fornøydgaranti"],
  "Troca em 30 dias": ["30-day returns", "30 dagers bytterett"], "Suporte na comunidade": ["Community support", "Hjelp i fellesskapet"],
  "Você está em:": ["You are here:", "Du er her:"], "Visualizar como:": ["View as:", "Vis som:"], "Loja": ["Shop", "Butikk"], "Catálogo Digital": ["Digital Catalogue", "Digital katalog"],
  "Ver em:": ["View on:", "Vis på:"], "Computador": ["Desktop", "Datamaskin"], "Celular": ["Mobile", "Mobil"], "Tour SCAMPER": ["SCAMPER tour", "SCAMPER-omvisning"],
  "Antes × Depois": ["Before × After", "Før × etter"], "Mostrar anotações SCAMPER": ["Show SCAMPER notes", "Vis SCAMPER-notater"],
  "Abrir menu de categorias": ["Open category menu", "Åpne kategorimenyen"], "Categorias": ["Categories", "Kategorier"], "Carregando...": ["Loading...", "Laster..."],
  "Aumentar texto": ["Larger text", "Større tekst"], "Diminuir texto": ["Smaller text", "Mindre tekst"], "Tamanho normal": ["Normal size", "Normal størrelse"], "Fechar": ["Close", "Lukk"],
  // ---------- categorias ----------
  "Bicicletas Elétricas": ["Electric Bikes", "Elsykler"], "Scooters & Mopeds": ["Scooters & Mopeds", "Scootere og mopeder"], "Carros Elétricos Infantis": ["Kids' Electric Cars", "Elbiler for barn"],
  "ATV & Jardim": ["ATV & Garden", "ATV og hage"], "Robôs & RC": ["Robots & RC", "Roboter og RC"], "Óptica & Gadgets": ["Optics & Gadgets", "Optikk og dingser"],
  "Hobby & Colecionáveis": ["Hobby & Collectibles", "Hobby og samleobjekter"], "Acessórios": ["Accessories", "Tilbehør"],
  "Bicicletas": ["Bikes", "Sykler"], "Scooters": ["Scooters", "Scootere"], "Carros infantis": ["Kids' cars", "Barnebiler"], "Gadgets": ["Gadgets", "Dingser"],
  "Dobráveis": ["Folding", "Sammenleggbare"], "Triciclos e cargo": ["Trikes & cargo", "Trehjulinger og lastesykler"], "Urbanas": ["City bikes", "Bysykler"], "Mopeds": ["Mopeds", "Mopeder"],
  "Jipes": ["Jeeps", "Jeeper"], "Utilitários": ["Utility vehicles", "Nyttekjøretøy"], "Karts": ["Go-karts", "Gokarter"], "Quadriciclos": ["Quad bikes", "ATV-er"], "Mini tratores": ["Mini tractors", "Minitraktorer"],
  "Jardinagem": ["Gardening", "Hagearbeid"], "Robôs": ["Robots", "Roboter"], "Controle remoto": ["Remote control", "Fjernstyrt"], "Óptica": ["Optics", "Optikk"], "Eletrônicos": ["Electronics", "Elektronikk"],
  "Modelismo a vapor": ["Steam models", "Dampmodeller"], "Ferromodelismo": ["Model railways", "Modelljernbane"], "Colecionáveis": ["Collectibles", "Samleobjekter"], "Energia": ["Power", "Strøm"],
  "Ferramentas": ["Tools", "Verktøy"], "Para ciclistas": ["For cyclists", "For syklister"],
  // ---------- filtros ----------
  "Filtrar produtos": ["Filter products", "Filtrer produkter"], "Mostrar": ["Show", "Vis"], "Ocultar": ["Hide", "Skjul"], "Preço até:": ["Price up to:", "Pris opptil:"],
  "Orçamento": ["Budget", "Budsjett"], "Qualquer valor": ["Any price", "Alle priser"], "Até kr 1 000": ["Up to kr 1 000", "Opptil kr 1 000"], "Acima de kr 15 000": ["Over kr 15 000", "Over kr 15 000"],
  "Finalidade": ["Purpose", "Formål"], "Qualquer finalidade": ["Any purpose", "Alle formål"], "Tamanho": ["Size", "Størrelse"], "Qualquer tamanho": ["Any size", "Alle størrelser"],
  "Compacto": ["Compact", "Kompakt"], "Médio": ["Medium", "Middels"], "Grande": ["Large", "Stor"], "Potência": ["Power", "Effekt"], "Qualquer potência": ["Any power", "All effekt"],
  "Até 500 W": ["Up to 500 W", "Opptil 500 W"], "Acima de 1000 W (potente)": ["Over 1000 W (powerful)", "Over 1000 W (kraftig)"], "Categoria": ["Category", "Kategori"], "Marca": ["Brand", "Merke"],
  "Somente em estoque": ["In stock only", "Kun på lager"], "Somente multifuncionais": ["Multi-purpose only", "Kun flerbruksprodukter"], "Ordenar por": ["Sort by", "Sorter etter"],
  "Relevância": ["Relevance", "Relevans"], "Menor preço": ["Lowest price", "Lavest pris"], "Maior preço": ["Highest price", "Høyest pris"], "Nome A–Z": ["Name A–Z", "Navn A–Å"], "Limpar filtros": ["Clear filters", "Nullstill filtre"],
  "Atalhos": ["Shortcuts", "Snarveier"], "Mais vendidos": ["Best sellers", "Mest solgt"], "Lançamentos": ["New arrivals", "Nyheter"], "Ofertas da semana": ["This week's deals", "Ukens tilbud"], "Guias & fórum": ["Guides & forum", "Guider og forum"],
  "Transporte diário": ["Daily commuting", "Daglig transport"], "Lazer e trilha": ["Leisure & trails", "Fritid og terreng"], "Para crianças": ["For kids", "For barn"], "Casa e jardim": ["Home & garden", "Hus og hage"],
  "Aprender e explorar": ["Learn & explore", "Lære og utforske"], "Diversão e presentes": ["Fun & gifts", "Moro og gaver"],
  "Meu interesse é:": ["I'm interested in:", "Jeg er interessert i:"], "Lazer": ["Leisure", "Fritid"], "Transporte": ["Transport", "Transport"], "Tecnologia": ["Technology", "Teknologi"], "Entretenimento": ["Entertainment", "Underholdning"],
  "Exibir:": ["Display:", "Visning:"], "Grade": ["Grid", "Rutenett"], "Lista": ["List", "Liste"],
  "Produtos filtrados": ["Filtered products", "Filtrerte produkter"], "Sugestões do assistente virtual": ["Suggestions from the virtual assistant", "Forslag fra den virtuelle assistenten"],
  // ---------- banner e seções ----------
  "NOVIDADES 2026!": ["NEW FOR 2026!", "NYHETER 2026!"], "Elsykler, scooters e": ["E-bikes, scooters and", "Elsykler, scootere og"], "carros elétricos": ["electric cars", "elbiler"], "para toda a família": ["for the whole family", "for hele familien"],
  "Busca por categoria, comparação de modelos e acessórios compatíveis em cada produto.": ["Search by category, compare models and find compatible accessories for every product.", "Søk etter kategori, sammenlign modeller og finn passende tilbehør til hvert produkt."],
  "Ver bicicletas elétricas": ["See electric bikes", "Se elsykler"], "PARA COLECIONADORES": ["FOR COLLECTORS", "FOR SAMLERE"], "Itens raros na": ["Rare items in the", "Sjeldne varer i"], "Vitrine 3D": ["3D Showcase", "3D-monter"],
  "Locomotivas a vapor, robôs clássicos e edições limitadas em uma vitrine giratória.": ["Steam locomotives, classic robots and limited editions in a rotating showcase.", "Damplokomotiver, klassiske roboter og begrensede opplag i en roterende monter."],
  "Abrir a Vitrine 3D": ["Open the 3D Showcase", "Åpne 3D-monteren"], "Aprenda a": ["Learn to", "Lær å"], "montar": ["build", "bygge"], "com quem entende": ["from people who know how", "med folk som kan det"],
  "Guias passo a passo, fórum de suporte e projetos de outros entusiastas.": ["Step-by-step guides, a support forum and projects from other enthusiasts.", "Steg-for-steg-guider, supportforum og prosjekter fra andre entusiaster."],
  "Entrar na comunidade": ["Join the community", "Bli med i fellesskapet"], "OFERTAS DA SEMANA": ["THIS WEEK'S DEALS", "UKENS TILBUD"], "Até": ["Up to", "Opptil"], "25% off": ["25% off", "25 % rabatt"],
  "em robôs, fatbikes e scooters": ["on robots, fatbikes and scooters", "på roboter, fatbikes og scootere"],
  "Ofertas válidas até domingo — veja a contagem regressiva.": ["Deals valid until Sunday — see the countdown.", "Tilbudene gjelder til søndag — se nedtellingen."], "Ver ofertas": ["See deals", "Se tilbud"],
  "Destaque anterior": ["Previous highlight", "Forrige høydepunkt"], "Próximo destaque": ["Next highlight", "Neste høydepunkt"], "Rolar para a direita": ["Scroll right", "Rull til høyre"], "Rolar para a esquerda": ["Scroll left", "Rull til venstre"],
  "Recomendado para você": ["Recommended for you", "Anbefalt for deg"], "limpar histórico": ["clear history", "tøm historikk"], "Selecionados para você": ["Picked for you", "Utvalgt for deg"], "Vistos recentemente": ["Recently viewed", "Nylig sett"],
  "Ainda não conhecemos você 🙂 Abra alguns produtos ou escolha um": ["We don't know you yet 🙂 Open a few products or choose an", "Vi kjenner deg ikke ennå 🙂 Åpne noen produkter eller velg en"],
  "interesse": ["interest", "interesse"], "acima": ["above", "over"], "as recomendações aparecem aqui, com base no seu": ["recommendations will appear here, based on your", "anbefalingene vises her, basert på"],
  "histórico de navegação": ["browsing history", "nettleserhistorikken din"], "e nas suas": ["and your", "og"], "preferências": ["preferences", "preferansene dine"],
  "Mais Vendidos": ["Best Sellers", "Mest solgt"], "Ofertas da Semana": ["This Week's Deals", "Ukens tilbud"], "Dois em um: produtos multifuncionais": ["Two in one: multi-purpose products", "To i ett: flerbruksprodukter"],
  "Vitrines por categoria": ["Shelves by category", "Hyller etter kategori"], "ver todos": ["see all", "se alle"],
  "Comunidade ARNGREN": ["ARNGREN Community", "ARNGREN-fellesskapet"], "guias de montagem e fórum": ["assembly guides and forum", "monteringsguider og forum"], "Últimas do fórum": ["Latest from the forum", "Siste fra forumet"],
  // ---------- cards e produto ----------
  "Novo!": ["New!", "Nyhet!"], "NOVO!": ["NEW!", "NYHET!"], "2 em 1": ["2 in 1", "2 i 1"], "Raro": ["Rare", "Sjelden"], "Em estoque": ["In stock", "På lager"], "Esgotado": ["Sold out", "Utsolgt"],
  "envio em 24h": ["ships within 24h", "sendes innen 24 t"], "Comprar": ["Buy", "Kjøp"], "Indisponível": ["Unavailable", "Ikke tilgjengelig"], "Garantia": ["Guarantee", "Garanti"],
  "Satisfação garantida ou troca grátis": ["Satisfaction guaranteed or free exchange", "Fornøydgaranti eller gratis bytte"],
  "Passe o mouse na foto para ampliar": ["Hover over the photo to zoom", "Hold musepekeren over bildet for å forstørre"], "ver avaliações": ["see reviews", "se anmeldelser"],
  "Adicionar à comparação": ["Add to comparison", "Legg til i sammenligning"], "Remover da comparação": ["Remove from comparison", "Fjern fra sammenligning"],
  "Compra garantida": ["Guaranteed purchase", "Trygt kjøp"], "satisfação garantida ou troca grátis.": ["satisfaction guaranteed or free exchange.", "fornøydgaranti eller gratis bytte."],
  "Descrição e acessórios": ["Description & accessories", "Beskrivelse og tilbehør"], "Ficha técnica e comparação": ["Specs & comparison", "Spesifikasjoner og sammenligning"],
  "Acessórios compatíveis": ["Compatible accessories", "Passende tilbehør"], "adicionar": ["add", "legg til"], "Comprar kit completo (produto + acessórios)": ["Buy the complete kit (product + accessories)", "Kjøp hele settet (produkt + tilbehør)"],
  "ver produto": ["see product", "se produkt"], "Ver detalhes": ["See details", "Se detaljer"], "Guias da comunidade para este produto": ["Community guides for this product", "Fellesskapsguider for dette produktet"],
  "Ainda não há guias para este produto.": ["There are no guides for this product yet.", "Det finnes ingen guider for dette produktet ennå."], "Monte o seu e compartilhe na comunidade!": ["Build yours and share it with the community!", "Bygg din egen og del den med fellesskapet!"],
  "Fazer uma pergunta sobre este produto": ["Ask a question about this product", "Still et spørsmål om dette produktet"],
  "Calculadora de autonomia": ["Range calculator", "Rekkeviddekalkulator"], "Seu trajeto por dia (ida e volta):": ["Your daily trip (round trip):", "Din daglige tur (tur-retur):"],
  "Com uma carga você faz": ["One charge lasts", "Én lading holder til"], "de trajeto": ["of trips", "med turer"], "recargas por semana (5 dias):": ["charges per week (5 days):", "ladinger per uke (5 dager):"],
  "no inverno, cerca de": ["in winter, about", "om vinteren ca."], "por carga.": ["per charge.", "per lading."],
  "Este produto": ["This product", "Dette produktet"], "Comparação automática com produtos semelhantes": ["Automatic comparison with similar products", "Automatisk sammenligning med lignende produkter"],
  "Mais barato:": ["Cheapest:", "Billigst:"], "Melhor custo-benefício (autonomia por preço):": ["Best value (range for the price):", "Best verdi (rekkevidde per krone):"], "Abrir na comparação completa": ["Open full comparison", "Åpne full sammenligning"],
  "Edição de colecionador": ["Collector's edition", "Samleutgave"], "Catálogo ARNGREN": ["ARNGREN Catalogue", "ARNGREN-katalog"], "Vitrine ARNGREN": ["ARNGREN Showcase", "ARNGREN-monter"],
  "Item raro de colecionador": ["Rare collector's item", "Sjeldent samleobjekt"], "Edição limitada, numerada": ["Limited, numbered edition", "Begrenset, nummerert opplag"], "Colecionável fora de linha": ["Discontinued collectible", "Utgått samleobjekt"],
  "Últimas unidades": ["Last units", "Siste eksemplarer"], "fora de linha": ["discontinued", "utgått"], "Clássico dos anos 2000": ["2000s classic", "2000-tallsklassiker"],
  // avaliações
  "Escreva sua avaliação": ["Write your review", "Skriv din anmeldelse"], "Nota": ["Rating", "Vurdering"], "Excelente": ["Excellent", "Utmerket"], "Muito bom": ["Very good", "Veldig bra"], "Bom": ["Good", "Bra"],
  "Regular": ["Fair", "Middels"], "Ruim": ["Poor", "Dårlig"], "Publicar avaliação": ["Post review", "Publiser anmeldelse"], "Compra verificada": ["Verified purchase", "Bekreftet kjøp"], "Agora mesmo": ["Just now", "Akkurat nå"],
  "Conte o que achou do produto...": ["Tell us what you thought of the product...", "Fortell hva du syntes om produktet..."],
  // especificações
  "Motor": ["Motor", "Motor"], "Autonomia": ["Range", "Rekkevidde"], "Velocidade": ["Speed", "Hastighet"], "Peso": ["Weight", "Vekt"], "Carga": ["Load", "Last"], "Rodas": ["Wheels", "Hjul"],
  "Bateria": ["Battery", "Batteri"], "Idade": ["Age", "Alder"], "Controle": ["Control", "Styring"], "Extra": ["Extra", "Ekstra"], "Assentos": ["Seats", "Seter"], "Freio": ["Brake", "Brems"],
  "Largura": ["Width", "Bredde"], "Coletor": ["Grass box", "Oppsamler"], "Caçamba": ["Dump bed", "Lasteplan"], "Pá": ["Shovel", "Skuff"], "Escala": ["Scale", "Skala"], "Alcance": ["Range", "Rekkevidde"],
  "Som": ["Sound", "Lyd"], "Fumaça": ["Smoke", "Røyk"], "Funções": ["Functions", "Funksjoner"], "Altura": ["Height", "Høyde"], "Eixos": ["Axes", "Akser"], "Montagem": ["Assembly", "Montering"],
  "Sensores": ["Sensors", "Sensorer"], "Câmera": ["Camera", "Kamera"], "Vídeo": ["Video", "Video"], "Memória": ["Memory", "Minne"], "Abertura": ["Aperture", "Åpning"], "Aumento": ["Magnification", "Forstørrelse"],
  "Tripé": ["Tripod", "Stativ"], "Idiomas": ["Languages", "Språk"], "Voz": ["Voice", "Tale"], "Tela": ["Screen", "Skjerm"], "Uso": ["Use", "Bruk"], "Lúmens": ["Lumens", "Lumen"], "Capacidade": ["Capacity", "Kapasitet"],
  "Acionamento": ["Operation", "Drift"], "Caldeira": ["Boiler", "Kjele"], "Combustível": ["Fuel", "Brensel"], "Bitola": ["Gauge", "Sporvidde"], "Tração": ["Traction", "Trekkraft"], "Trilhos": ["Track", "Skinner"],
  "Comandos de voz": ["Voice commands", "Talekommandoer"], "Projetor": ["Projector", "Projektor"], "Motores": ["Motors", "Motorer"], "Jogadores": ["Players", "Spillere"], "Peças": ["Pieces", "Brikker"], "Modos": ["Modes", "Moduser"],
  "Estoque": ["Stock", "Lager"], "Preço": ["Price", "Pris"], "Sim": ["Yes", "Ja"], "Não": ["No", "Nei"],
  "Remoto parental": ["Parental remote", "Foreldrefjernkontroll"], "Canhão de água": ["Water cannon", "Vannkanon"], "Disco": ["Disc", "Skive"], "Basculante": ["Tipping", "Tippbar"], "Funcional": ["Working", "Fungerende"],
  "Motor e disparo": ["Engine & firing", "Motor og skudd"], "Remoto / app": ["Remote / app", "Fjernkontroll / app"], "Kit": ["Kit", "Byggesett"], "Com fio": ["Wired", "Med ledning"], "App / gestos": ["App / gestures", "App / bevegelser"],
  "Alumínio": ["Aluminium", "Aluminium"], "Cartão SD": ["SD card", "SD-kort"], "Recarregável USB": ["USB rechargeable", "USB-oppladbar"], "Ar comprimido": ["Compressed air", "Trykkluft"], "Semicondutor": ["Semiconductor", "Halvleder"],
  "Latão": ["Brass", "Messing"], "Pastilhas sólidas": ["Solid fuel tablets", "Fastbrenseltabletter"], "Vapor vivo": ["Live steam", "Levende damp"], "12 m inclusos": ["12 m included", "12 m inkludert"],
  "Interno e externo": ["Indoor & outdoor", "Inne og ute"], "Miniaturas": ["Miniatures", "Miniatyrer"], "3 humores": ["3 moods", "3 humør"], "Remoto": ["Remote", "Fjernkontroll"], "Toque e som": ["Touch & sound", "Berøring og lyd"],
  "Velocidade, distância, tempo": ["Speed, distance, time", "Fart, distanse, tid"], "Carregadores e eletrônicos": ["Chargers & electronics", "Ladere og elektronikk"],
  "Recarga de baterias de veículos elétricos": ["Charging EV batteries", "Lading av batterier til elkjøretøy"], "até 140×": ["up to 140×", "opptil 140×"],
  // nomes dos produtos
  "Elsykkel Dobrável 250W": ["Folding E-bike 250W", "Sammenleggbar elsykkel 250W"], "Fatbike Elétrica 1000W": ["Electric Fatbike 1000W", "Elektrisk fatbike 1000W"],
  "Triciclo Elétrico Fatbike": ["Electric Fatbike Trike", "Elektrisk fatbike-trehjuling"], "Elsykkel Cargo Long John": ["Long John Cargo E-bike", "Long John lastesykkel"],
  "Elsykkel Urbana Feminina": ["Women's City E-bike", "Elsykkel for damer"], "Scooter Elétrica 3 Rodas": ["3-Wheel Electric Scooter", "Elektrisk scooter med tre hjul"],
  "Moped Elétrica Retrô 3000W": ["Retro Electric Moped 3000W", "Retro elmoped 3000W"], "Scooter Chopper 1500W": ["Chopper Scooter 1500W", "Chopper-scooter 1500W"],
  "Jeep Willys Elétrico Infantil": ["Kids' Electric Willys Jeep", "Elektrisk Willys-jeep for barn"], "Caminhão de Bombeiros Elétrico": ["Electric Fire Truck", "Elektrisk brannbil"],
  "Defender Elétrico Infantil": ["Kids' Electric Defender", "Elektrisk Defender for barn"], "Kart Elétrico Vermelho": ["Red Electric Go-kart", "Rød elektrisk gokart"],
  "ATV Elétrico 1500W": ["Electric ATV 1500W", "Elektrisk ATV 1500W"], "Utilitário 6x4 Infantil": ["Kids' 6x4 Utility Vehicle", "6x4 nyttekjøretøy for barn"],
  "Mini Trator com Pá Carregadeira": ["Mini Tractor with Front Loader", "Minitraktor med frontlaster"], "Cortador de Grama Elétrico": ["Electric Lawn Mower", "Elektrisk gressklipper"],
  "Tanque RC Tiger 1:16": ["RC Tiger Tank 1:16", "RC Tiger-stridsvogn 1:16"], "Robô Humanoide Robosapien X": ["Robosapien X Humanoid Robot", "Robosapien X menneskerobot"],
  "Braço Robótico Educativo": ["Educational Robot Arm", "Pedagogisk robotarm"], "Robô MiP Equilibrista": ["MiP Balancing Robot", "MiP balanserende robot"],
  "Binóculo Digital com Câmera": ["Digital Binoculars with Camera", "Digital kikkert med kamera"], "Telescópio Refrator 70 mm": ["70 mm Refractor Telescope", "Linseteleskop 70 mm"],
  "Tradutor Eletrônico de Bolso": ["Pocket Electronic Translator", "Elektronisk lommeoversetter"], "Kit Solar 200W": ["200W Solar Kit", "Solcellepakke 200W"],
  "Inversor 12V → 230V": ["12V → 230V Inverter", "Omformer 12V → 230V"], "Ciclocomputador sem fio": ["Wireless Bike Computer", "Trådløs sykkelcomputer"],
  "Lanterna LED Cree": ["Cree LED Flashlight", "Cree LED-lykt"], "Macaco Pneumático": ["Air Jack", "Luftjekk"], "Bafômetro Digital": ["Digital Breathalyser", "Digital alkotester"],
  "Máquina a Vapor Wilesco D10": ["Wilesco D10 Steam Engine", "Wilesco D10 dampmaskin"], "Locomotiva a Vapor Vivo Sealion": ["Sealion Live Steam Locomotive", "Sealion damplokomotiv"],
  "Trem Elétrico de Jardim": ["Electric Garden Train", "Elektrisk hagetog"], "Robô R2-D2 Interativo": ["Interactive R2-D2 Robot", "Interaktiv R2-D2-robot"],
  "Dinossauro Robô Pleo": ["Pleo Robot Dinosaur", "Pleo robotdinosaur"], "Monopoly Edição de Colecionador": ["Monopoly Collector's Edition", "Monopol samleutgave"],
  // descrições dos produtos
  "Bicicleta elétrica dobrável que cabe no porta-malas — ideal para quem combina bike e transporte público.": ["Folding e-bike that fits in the car boot — ideal if you combine cycling and public transport.", "Sammenleggbar elsykkel som får plass i bagasjerommet — perfekt hvis du kombinerer sykkel og kollektivtransport."],
  "Pneus largos para neve, areia e trilha, com freio hidráulico.": ["Wide tyres for snow, sand and trails, with hydraulic brakes.", "Brede dekk for snø, sand og terreng, med hydrauliske bremser."],
  "Três rodas para mais estabilidade e cesto traseiro para compras.": ["Three wheels for extra stability and a rear basket for shopping.", "Tre hjul for ekstra stabilitet og bakkurv til handleturen."],
  "Transporta crianças ou carga — substitui o carro em trajetos curtos.": ["Carries kids or cargo — replaces the car on short trips.", "Frakter barn eller last — erstatter bilen på korte turer."],
  "Quadro rebaixado, cesto frontal e bateria removível.": ["Low step-through frame, front basket and removable battery.", "Lav innstigning, kurv foran og avtakbart batteri."],
  "Scooter de mobilidade com assento confortável e cesto.": ["Mobility scooter with a comfortable seat and basket.", "Mobilitetsscooter med komfortabelt sete og kurv."],
  "Visual clássico com motor elétrico silencioso e homologada para rua.": ["Classic look with a quiet electric motor, road-legal.", "Klassisk utseende med stillegående elmotor, godkjent for vei."],
  "Scooter estilo chopper com pneus largos e placa homologada.": ["Chopper-style scooter with wide tyres and road registration.", "Scooter i chopper-stil med brede dekk og skiltgodkjenning."],
  "Réplica de jipe clássico com rodas de borracha e banco de couro.": ["Classic jeep replica with rubber wheels and a leather seat.", "Kopi av klassisk jeep med gummihjul og skinnsete."],
  "Carro elétrico e brinquedo de água em um: tem canhão de água funcional.": ["Electric car and water toy in one: it has a working water cannon.", "Elbil og vannleke i ett: den har en fungerende vannkanon."],
  "Dois lugares, tração forte e bancos de couro sintético.": ["Two seats, strong traction and faux-leather seats.", "To seter, kraftig drift og seter i kunstskinn."],
  "Kart elétrico com assento ajustável e limitador de velocidade.": ["Electric go-kart with adjustable seat and speed limiter.", "Elektrisk gokart med justerbart sete og hastighetssperre."],
  "Quadriciclo elétrico homologado, para trilhas e fazendas.": ["Road-approved electric ATV for trails and farms.", "Veigodkjent elektrisk ATV for terreng og gårdsbruk."],
  "Veículo infantil com caçamba basculante — brinca e ajuda no jardim.": ["Kids' vehicle with a tipping bed — play and help out in the garden.", "Barnekjøretøy med tippelasteplan — lek og hjelp til i hagen."],
  "Trator elétrico com pá frontal que realmente carrega areia.": ["Electric tractor with a front shovel that really carries sand.", "Elektrisk traktor med frontskuff som virkelig løfter sand."],
  "Leve e silencioso, sem gasolina.": ["Light and quiet, no petrol.", "Lett og stillegående, uten bensin."],
  "Tanque de controle remoto com som, fumaça e torre giratória.": ["Remote-control tank with sound, smoke and a rotating turret.", "Fjernstyrt stridsvogn med lyd, røyk og roterende tårn."],
  "Robô que anda, dança e pega objetos.": ["Robot that walks, dances and picks things up.", "Robot som går, danser og plukker opp ting."],
  "Brinquedo e aula de mecânica: você monta e programa os movimentos.": ["Toy and mechanics lesson: you build it and program the movements.", "Leke og mekanikktime: du bygger den og programmerer bevegelsene."],
  "Robô que se equilibra em duas rodas e responde a gestos.": ["Robot that balances on two wheels and responds to gestures.", "Robot som balanserer på to hjul og reagerer på bevegelser."],
  "Observa e fotografa ao mesmo tempo.": ["Watch and take photos at the same time.", "Se og ta bilder samtidig."],
  "Ideal para observar a Lua e planetas.": ["Ideal for viewing the Moon and the planets.", "Perfekt for å se på månen og planetene."],
  "Tradução falada e escrita para viagens.": ["Spoken and written translation for travel.", "Muntlig og skriftlig oversettelse på reise."],
  "Recarregue sua elsykkel ou scooter com energia solar.": ["Charge your e-bike or scooter with solar power.", "Lad elsykkelen eller scooteren med solenergi."],
  "Converte a energia da bateria para tomada comum.": ["Converts battery power to a regular wall socket.", "Gjør om batteristrøm til vanlig stikkontakt."],
  "Mostra velocidade, distância e tempo de pedal.": ["Shows speed, distance and riding time.", "Viser fart, distanse og sykkeltid."],
  "Iluminação forte para bike, scooter ou camping.": ["Bright light for bikes, scooters or camping.", "Kraftig lys for sykkel, scooter eller camping."],
  "Levanta ATVs e carros em segundos.": ["Lifts ATVs and cars in seconds.", "Løfter ATV-er og biler på sekunder."],
  "Segurança para quem pilota mopeds e scooters.": ["Safety for moped and scooter riders.", "Trygghet for deg som kjører moped og scooter."],
  "Máquina a vapor de verdade, em miniatura — um clássico do hobbymodelismo.": ["A real steam engine in miniature — a hobby-modelling classic.", "Ekte dampmaskin i miniatyr — en klassiker innen modellbygging."],
  "Locomotiva movida a vapor de verdade para ferrovias de jardim. Peça de colecionador.": ["A real steam-powered locomotive for garden railways. A collector's piece.", "Ekte dampdrevet lokomotiv for hagejernbaner. Et samlerobjekt."],
  "Kit inicial de ferromodelismo resistente à chuva, ideal para o quintal.": ["Weatherproof model-railway starter kit, perfect for the garden.", "Værbestandig startsett for modelljernbane, perfekt for hagen."],
  "Réplica interativa que responde a comandos de voz e projeta mensagens.": ["Interactive replica that responds to voice commands and projects messages.", "Interaktiv kopi som reagerer på talekommandoer og projiserer meldinger."],
  "Filhote de dinossauro robótico que aprende e desenvolve personalidade.": ["Baby robot dinosaur that learns and develops its own personality.", "Robotdinosaurunge som lærer og utvikler sin egen personlighet."],
  "Edição especial com peças em miniatura detalhadas.": ["Special edition with detailed miniature pieces.", "Spesialutgave med detaljerte miniatyrbrikker."],
  "Dinossauro robô clássico com movimentos realistas.": ["Classic robot dinosaur with lifelike movements.", "Klassisk robotdinosaur med naturtro bevegelser."],
  // ---------- comparação, carrinho e avisos ----------
  "Comparação de produtos": ["Product comparison", "Produktsammenligning"], "Comparação lado a lado": ["Side-by-side comparison", "Sammenligning side om side"], "menor preço": ["lowest price", "lavest pris"],
  "Comparar agora": ["Compare now", "Sammenlign nå"], "Limpar": ["Clear", "Tøm"],
  "Total": ["Total", "Totalt"], "Total:": ["Total:", "Totalt:"], "Compra 100% garantida": ["100% guaranteed purchase", "100 % trygt kjøp"], "Finalizar em um único passo": ["Check out in one step", "Fullfør i ett steg"],
  "Pagamento": ["Payment", "Betaling"], "Cartão": ["Card", "Kort"], "Sem cadastro obrigatório": ["No sign-up required", "Ingen registrering nødvendig"], "endereço preenchido pelo CEP": ["address filled in from your postcode", "adressen fylles ut fra postnummeret"],
  "Confirmar pedido": ["Place order", "Bekreft bestillingen"], "Nome completo": ["Full name", "Fullt navn"], "CEP": ["Postcode", "Postnummer"], "Número": ["Number", "Nummer"],
  "Seu carrinho está vazio.": ["Your cart is empty.", "Handlekurven er tom."], "Que tal dar uma olhada nos mais vendidos?": ["Why not have a look at our best sellers?", "Hva med å ta en titt på bestselgerne?"],
  "Pedido confirmado!": ["Order confirmed!", "Bestillingen er bekreftet!"], "A confirmação chegará por e-mail.": ["You'll receive a confirmation by email.", "Du får en bekreftelse på e-post."],
  "(Simulação do protótipo — nada foi enviado.)": ["(Prototype simulation — nothing was sent.)", "(Simulering i prototypen — ingenting ble sendt.)"], "Continuar comprando": ["Continue shopping", "Fortsett å handle"],
  "Compra protegida pela garantia ARNGREN": ["Purchase protected by the ARNGREN guarantee", "Kjøpet er beskyttet av ARNGREN-garantien"],
  "Adicionado ao carrinho": ["Added to cart", "Lagt i handlekurven"], "Kit adicionado ao carrinho": ["Kit added to cart", "Settet er lagt i handlekurven"], "Atenção": ["Note", "Obs"],
  "Compare no máximo 3 produtos.": ["Compare up to 3 products.", "Sammenlign maks 3 produkter."], "Comparar produtos": ["Compare products", "Sammenlign produkter"],
  "Marque “Comparar” em pelo menos 2 produtos.": ["Tick “Compare” on at least 2 products.", "Huk av «Sammenlign» på minst 2 produkter."],
  "Histórico apagado": ["History cleared", "Historikken er slettet"], "As recomendações foram reiniciadas.": ["Recommendations have been reset.", "Anbefalingene er nullstilt."],
  "Nenhum produto encontrado com esses filtros.": ["No products match these filters.", "Ingen produkter passer disse filtrene."],
  "Tente limpar os filtros ou pergunte ao Volt, nosso assistente.": ["Try clearing the filters or ask Volt, our assistant.", "Prøv å nullstille filtrene eller spør Volt, assistenten vår."],
  // ---------- catálogo digital ----------
  "Formato:": ["Format:", "Format:"], "Revista digital": ["Digital magazine", "Digitalt magasin"], "Somente itens raros de colecionador": ["Rare collector's items only", "Kun sjeldne samleobjekter"],
  "Página anterior": ["Previous page", "Forrige side"], "Próxima página": ["Next page", "Neste side"], "Girar": ["Rotate", "Roter"], "Girar automaticamente": ["Rotate automatically", "Roter automatisk"], "Pausar giro": ["Pause rotation", "Pause rotasjon"],
  // ---------- comunidade ----------
  "Início da comunidade": ["Community home", "Fellesskapets forside"], "Guias de montagem": ["Assembly guides", "Monteringsguider"], "Fórum de suporte": ["Support forum", "Supportforum"],
  "Projetos dos membros": ["Member projects", "Medlemsprosjekter"], "Eventos e encontros": ["Events & meetups", "Arrangementer og treff"], "Criar novo tópico": ["Start a new topic", "Opprett nytt emne"],
  "Seu apelido": ["Your nickname", "Ditt kallenavn"], "Nível:": ["Level:", "Nivå:"], "Nível": ["Level", "Nivå"], "Iniciante": ["Beginner", "Nybegynner"], "Montador": ["Builder", "Bygger"],
  "Mestre": ["Master", "Mester"], "Intermediário": ["Intermediate", "Middels"], "Avançado": ["Advanced", "Avansert"], 
  "Quem está online": ["Who's online", "Hvem er pålogget"], "membros online:": ["members online:", "medlemmer pålogget:"], "e": ["and", "og"], "Visitante": ["Guest", "Gjest"], "Voltar para a loja": ["Back to the shop", "Tilbake til butikken"],
  "Aprenda, monte e compartilhe. Guias de montagem passo a passo, fórum de suporte com a nossa equipe técnica e projetos de outros entusiastas de": ["Learn, build and share. Step-by-step assembly guides, a support forum with our technical team and projects from other enthusiasts of", "Lær, bygg og del. Steg-for-steg monteringsguider, supportforum med vårt tekniske team og prosjekter fra andre entusiaster innen"],
  "drones": ["drones", "droner"], "hobbymodelismo": ["hobby modelling", "modellbygging"], "eletrônica": ["electronics", "elektronikk"], "guias": ["guides", "guider"], "tópicos": ["topics", "emner"], "membros": ["members", "medlemmer"],
  "Guias de montagem em destaque": ["Featured assembly guides", "Utvalgte monteringsguider"], "Abrir guia": ["Open guide", "Åpne guiden"],
  "Tópico": ["Topic", "Emne"], "Fórum": ["Forum", "Forum"], "Respostas": ["Replies", "Svar"], "Visitas": ["Views", "Visninger"], "Última mensagem": ["Last post", "Siste innlegg"], "Mensagens": ["Posts", "Innlegg"],
  "Último tópico": ["Latest topic", "Siste emne"], "Tópicos": ["Topics", "Emner"], "Ver todos os fóruns": ["See all forums", "Se alle forumer"], "Novo tópico neste fórum": ["New topic in this forum", "Nytt emne i dette forumet"],
  "Resolvido": ["Solved", "Løst"], "EQUIPE ARNGREN": ["ARNGREN TEAM", "ARNGREN-TEAMET"], "Equipe ARNGREN": ["ARNGREN Team", "ARNGREN-teamet"], "Equipe": ["Team", "Team"],
  "Escreva sua resposta...": ["Write your reply...", "Skriv svaret ditt..."], "Enviar resposta": ["Post reply", "Send svar"], "Título": ["Title", "Tittel"], "Mensagem": ["Message", "Melding"],
  "Descreva sua dúvida ou ideia...": ["Describe your question or idea...", "Beskriv spørsmålet eller ideen din..."], "Postando como": ["Posting as", "Publiserer som"],
  "Dúvidas de suporte são respondidas pela equipe ARNGREN.": ["Support questions are answered by the ARNGREN team.", "Supportspørsmål besvares av ARNGREN-teamet."], "Publicar tópico": ["Post topic", "Publiser emne"],
  "Enviar meu projeto": ["Submit my project", "Send inn prosjektet mitt"], "Guia concluído! 🎉": ["Guide finished! 🎉", "Guiden er fullført! 🎉"], "Mostre o resultado em Projetos dos membros.": ["Show off the result in Member projects.", "Vis frem resultatet i Medlemsprosjekter."], "Quero ir": ["I want to go", "Jeg vil delta"], "Vou participar": ["I'm going", "Jeg deltar"],
  "Eventos fictícios, criados para o protótipo. Mapa: © OpenStreetMap.": ["Fictional events created for the prototype. Map: © OpenStreetMap.", "Fiktive arrangementer laget for prototypen. Kart: © OpenStreetMap."], "Mapa dos eventos": ["Event map", "Kart over arrangementer"],
  "Drones e aeromodelismo": ["Drones & model aircraft", "Droner og modellfly"], "Hobbymodelismo": ["Hobby modelling", "Modellbygging"], "Eletrônica e robótica": ["Electronics & robotics", "Elektronikk og robotikk"],
  "Veículos elétricos": ["Electric vehicles", "Elkjøretøy"], "Suporte técnico ARNGREN": ["ARNGREN tech support", "ARNGREN teknisk støtte"],
  "Pilotagem, calibração, FPV e regras de voo.": ["Piloting, calibration, FPV and flight rules.", "Flyging, kalibrering, FPV og flyregler."],
  "Máquinas a vapor, ferromodelismo e modelos RC.": ["Steam engines, model railways and RC models.", "Dampmaskiner, modelljernbane og RC-modeller."],
  "Robôs, programação, soldagem e projetos.": ["Robots, programming, soldering and projects.", "Roboter, programmering, lodding og prosjekter."],
  "Elsykler, scooters, baterias e manutenção.": ["E-bikes, scooters, batteries and maintenance.", "Elsykler, scootere, batterier og vedlikehold."],
  "Pedidos, garantia e peças — respondido pela equipe.": ["Orders, warranty and parts — answered by the team.", "Bestillinger, garanti og deler — besvart av teamet."],
  // eventos
  "Encontro de drones e FPV": ["Drone & FPV meetup", "Drone- og FPV-treff"], "Dia do vapor vivo": ["Live steam day", "Dampdagen"], "Feira de robótica para crianças": ["Robotics fair for kids", "Robotmesse for barn"],
  "Passeio de inverno de elsykkel": ["Winter e-bike ride", "Vintertur på elsykkel"], "Mostra de colecionáveis dos anos 2000": ["2000s collectibles show", "Utstilling av 2000-tallssamleobjekter"],
  "Voos livres, corrida FPV para iniciantes e oficina de calibração.": ["Free flying, an FPV race for beginners and a calibration workshop.", "Fri flyging, FPV-løp for nybegynnere og kalibreringsverksted."],
  "Locomotivas e máquinas a vapor funcionando, com troca de peças entre colecionadores.": ["Working steam locomotives and engines, plus a parts swap between collectors.", "Damplokomotiver og dampmaskiner i drift, med bytte av deler mellom samlere."],
  "Oficinas de montagem do braço robótico e programação com blocos.": ["Robot-arm building workshops and block programming.", "Verksteder i bygging av robotarm og blokkprogrammering."],
  "Pedal de 20 km com dicas de bateria no frio.": ["A 20 km ride with tips for batteries in the cold.", "En 20 km sykkeltur med tips om batterier i kulda."],
  "Robôs clássicos, edições limitadas e itens raros.": ["Classic robots, limited editions and rare items.", "Klassiske roboter, begrensede opplag og sjeldne objekter."],
  // guias
  "Guia de montagem": ["Assembly guide", "Monteringsguide"], "Montando o braço robótico educativo": ["Building the educational robot arm", "Slik bygger du den pedagogiske robotarmen"],
  "Primeiro voo: pré-voo e calibração de drones": ["First flight: drone pre-flight and calibration", "Første flytur: klargjøring og kalibrering av droner"],
  "Colocando a máquina a vapor para funcionar": ["Getting the steam engine running", "Slik får du dampmaskinen i gang"], "Trocando a bateria da sua elsykkel": ["Replacing your e-bike battery", "Slik bytter du batteri på elsykkelen"],
  "Primeiros passos no ferromodelismo de jardim": ["Getting started with garden railways", "Kom i gang med hagejernbane"],
  "Anterior": ["Previous", "Forrige"], "Próximo passo": ["Next step", "Neste trinn"], "Concluir guia": ["Finish guide", "Fullfør guiden"], "Tirar dúvida no fórum": ["Ask in the forum", "Spør i forumet"], "Produtos usados neste guia": ["Products used in this guide", "Produkter brukt i denne guiden"],
  "Confira as peças": ["Check the parts", "Sjekk delene"], "Separe as peças por número, seguindo a lista do manual. Faltou alguma? Abra um tópico no fórum de suporte.": ["Sort the parts by number using the list in the manual. Something missing? Start a topic in the support forum.", "Sorter delene etter nummer etter listen i bruksanvisningen. Mangler noe? Opprett et emne i supportforumet."],
  "Monte a base": ["Build the base", "Bygg sokkelen"], "Encaixe o motor da base e fixe com os 4 parafusos. Não aperte demais: o giro precisa ficar livre.": ["Fit the base motor and secure it with the 4 screws. Don't overtighten: it must rotate freely.", "Monter sokkelmotoren og fest den med de 4 skruene. Ikke stram for hardt: den må kunne rotere fritt."],
  "Ombro e cotovelo": ["Shoulder and elbow", "Skulder og albue"], "Monte os dois motores intermediários e passe os fios pelas guias laterais para não enroscarem.": ["Fit the two middle motors and route the wires through the side guides so they don't tangle.", "Monter de to midtre motorene og før ledningene gjennom sideføringene så de ikke floker seg."],
  "Garra": ["Gripper", "Gripeklo"], "Monte a garra por último e teste a abertura com a mão antes de ligar.": ["Fit the gripper last and test the opening by hand before switching on.", "Monter gripekloen til slutt og test åpningen for hånd før du slår på."],
  "Ligue e teste": ["Switch on and test", "Slå på og test"], "Conecte o controle, coloque as pilhas e teste cada eixo separadamente, devagar.": ["Connect the controller, insert the batteries and test each axis separately, slowly.", "Koble til kontrollen, sett i batteriene og test hver akse for seg, sakte."],
  "Desafio": ["Challenge", "Utfordring"], "Tente empilhar 3 tampinhas só com o braço — e poste o vídeo em Projetos dos membros!": ["Try stacking 3 bottle caps using only the arm — and post the video in Member projects!", "Prøv å stable 3 korker bare med armen — og legg ut videoen i Medlemsprosjekter!"],
  "Escolha o local": ["Choose the spot", "Velg sted"], "Área aberta, longe de pessoas, árvores e fios. Confira as regras locais de voo.": ["An open area away from people, trees and power lines. Check the local flight rules.", "Et åpent område unna folk, trær og ledninger. Sjekk de lokale flyreglene."],
  "Carregue as baterias": ["Charge the batteries", "Lad batteriene"], "Carregue por completo as baterias do drone e do controle. Nunca deixe carregando sem supervisão.": ["Fully charge the drone and controller batteries. Never leave them charging unattended.", "Lad drone- og kontrollbatteriene helt opp. La dem aldri lade uten tilsyn."],
  "Calibre a bússola": ["Calibrate the compass", "Kalibrer kompasset"], "Siga o procedimento do fabricante, girando o drone nos eixos horizontal e vertical.": ["Follow the manufacturer's procedure, rotating the drone on its horizontal and vertical axes.", "Følg produsentens fremgangsmåte og roter dronen rundt den horisontale og vertikale aksen."],
  "Teste de pairar": ["Hover test", "Svevetest"], "Decole a 2 m, mantenha parado por 30 s e observe se ele deriva para algum lado.": ["Take off to 2 m, hold for 30 s and watch whether it drifts to one side.", "Ta av til 2 m, hold dronen i ro i 30 s og se om den driver til en side."],
  "Pouso seguro": ["Safe landing", "Trygg landing"], "Desça devagar e desligue os motores só depois de tocar o solo.": ["Descend slowly and only stop the motors after touching down.", "Senk deg sakte og slå av motorene først når den har landet."],
  "Segurança primeiro": ["Safety first", "Sikkerhet først"], "Trabalhe sobre superfície resistente ao calor e com um adulto por perto. A caldeira fica muito quente.": ["Work on a heat-resistant surface with an adult nearby. The boiler gets very hot.", "Jobb på et varmebestandig underlag med en voksen i nærheten. Kjelen blir svært varm."],
  "Encha a caldeira": ["Fill the boiler", "Fyll kjelen"], "Use água destilada até a marca do visor. Nunca abasteça com a caldeira quente.": ["Use distilled water up to the mark on the sight glass. Never fill a hot boiler.", "Bruk destillert vann opp til merket på vannstandsglasset. Fyll aldri en varm kjele."],
  "Lubrifique": ["Lubricate", "Smør"], "Pingue óleo próprio para vapor no cilindro e nos eixos.": ["Add a few drops of steam oil to the cylinder and shafts.", "Drypp dampolje på sylinderen og akslene."],
  "Aqueça": ["Heat up", "Varm opp"], "Acenda as pastilhas de combustível sólido e aguarde a pressão subir (4 a 6 minutos).": ["Light the solid fuel tablets and wait for the pressure to build (4 to 6 minutes).", "Tenn fastbrenseltablettene og vent til trykket bygger seg opp (4 til 6 minutter)."],
  "Dê a partida": ["Start it up", "Start maskinen"], "Abra o registro devagar e gire o volante com a mão para iniciar o movimento.": ["Open the valve slowly and turn the flywheel by hand to get it moving.", "Åpne ventilen sakte og drei svinghjulet for hånd for å få det i gang."],
  "Depois de usar": ["After use", "Etter bruk"], "Deixe esfriar totalmente, esvazie a caldeira e seque as peças.": ["Let it cool down completely, empty the boiler and dry the parts.", "La den kjøles helt ned, tøm kjelen og tørk delene."],
  "Desligue tudo": ["Switch everything off", "Slå av alt"], "Desligue o painel e tire a chave da trava da bateria.": ["Turn off the display and remove the key from the battery lock.", "Slå av displayet og ta nøkkelen ut av batterilåsen."],
  "Retire a bateria antiga": ["Remove the old battery", "Ta ut det gamle batteriet"], "Destrave e puxe a bateria pela trilha. Leve-a a um ponto de descarte correto.": ["Unlock it and slide the battery out along its rail. Take it to a proper recycling point.", "Lås opp og skyv batteriet ut langs skinnen. Lever det på et godkjent mottak."],
  "Confira a compatibilidade": ["Check compatibility", "Sjekk at det passer"], "Confira a tensão (V) e o conector. Na dúvida, pergunte no fórum de suporte.": ["Check the voltage (V) and the connector. If in doubt, ask in the support forum.", "Sjekk spenningen (V) og kontakten. Er du i tvil, spør i supportforumet."],
  "Instale a nova": ["Fit the new one", "Sett i det nye"], "Encaixe na trilha até ouvir o clique e trave com a chave.": ["Slide it onto the rail until it clicks and lock it with the key.", "Skyv det inn på skinnen til det klikker, og lås med nøkkelen."],
  "Primeira carga": ["First charge", "Første lading"], "Faça uma carga completa antes do primeiro uso.": ["Fully charge it before first use.", "Lad det helt opp før første gangs bruk."],
  "Planeje o traçado": ["Plan the layout", "Planlegg sporplanen"], "Desenhe o circuito no papel. Curvas muito fechadas fazem o trem descarrilar.": ["Draw the layout on paper. Very tight curves make the train derail.", "Tegn banen på papir. For krappe svinger får toget til å spore av."],
  "Prepare o terreno": ["Prepare the ground", "Forbered underlaget"], "Nivele o solo e faça uma base de brita para os trilhos não afundarem com a chuva.": ["Level the ground and lay a gravel bed so the track doesn't sink in the rain.", "Plasser bakken og legg et pukklag så skinnene ikke synker når det regner."],
  "Monte os trilhos": ["Lay the track", "Legg skinnene"], "Encaixe os trilhos e confira o nível a cada metro.": ["Connect the rails and check the level every metre.", "Koble sammen skinnene og sjekk vateret for hver meter."],
  "Teste devagar": ["Test slowly", "Test sakte"], "Rode o trem em baixa velocidade e marque os pontos onde ele trepida.": ["Run the train slowly and mark the spots where it bumps.", "Kjør toget sakte og merk stedene der det rister."],
  // ---------- contato ----------
  "Horário de atendimento": ["Opening hours", "Åpningstider"], "Seg – Sex": ["Mon – Fri", "Man – fre"], "Sábado": ["Saturday", "Lørdag"], "Domingo": ["Sunday", "Søndag"], "Fechado": ["Closed", "Stengt"],
  "Aberto agora": ["Open now", "Åpent nå"], "Fechado agora": ["Closed now", "Stengt nå"], "deixe sua mensagem": ["leave a message", "legg igjen en melding"], "Perguntas frequentes": ["FAQ", "Ofte stilte spørsmål"],
  "Como acionar a garantia?": ["How do I make a warranty claim?", "Hvordan bruker jeg garantien?"], "Qual o prazo de entrega?": ["How long does delivery take?", "Hva er leveringstiden?"], "Dúvidas técnicas no fórum": ["Technical questions in the forum", "Tekniske spørsmål i forumet"],
  "Chat": ["Chat", "Chat"], "Resposta imediata para dúvidas sobre produtos, pedidos e entregas.": ["Instant answers about products, orders and deliveries.", "Raske svar om produkter, bestillinger og levering."], "Iniciar chat": ["Start chat", "Start chat"],
  "Formulário": ["Contact form", "Kontaktskjema"], "Respondemos no seu e-mail em até 1 dia útil.": ["We reply by email within 1 working day.", "Vi svarer på e-post innen 1 virkedag."], "Escrever mensagem": ["Write a message", "Skriv en melding"],
  "Dúvidas técnicas respondidas pela equipe e pela comunidade.": ["Technical questions answered by the team and the community.", "Tekniske spørsmål besvart av teamet og fellesskapet."], "Ir ao fórum": ["Go to the forum", "Gå til forumet"],
  "Envie sua mensagem": ["Send us a message", "Send oss en melding"], "Nome": ["Name", "Navn"], "Assunto": ["Subject", "Emne"], "Dúvida sobre produto": ["Product question", "Spørsmål om produkt"], "Meu pedido / entrega": ["My order / delivery", "Min bestilling / levering"],
  "Troca e garantia": ["Returns & warranty", "Bytte og garanti"], "Peças e assistência técnica": ["Parts & repairs", "Deler og service"], "Outro assunto": ["Other", "Annet"], "Nº do pedido (opcional)": ["Order no. (optional)", "Ordrenr. (valgfritt)"],
  "Enviar mensagem": ["Send message", "Send melding"], "Outros canais": ["Other channels", "Andre kanaler"], "Telefone": ["Phone", "Telefon"], "número de exemplo": ["sample number", "eksempelnummer"], "endereço de exemplo": ["sample address", "eksempeladresse"],
  "Fax, Skype e os vários e-mails espalhados pelo site antigo foram substituídos por chat, formulário e um único e-mail.": ["The fax, Skype and the many email addresses scattered around the old site were replaced by chat, a form and a single email address.", "Faks, Skype og alle e-postadressene som lå spredt rundt på det gamle nettstedet er erstattet av chat, skjema og én e-postadresse."],
  "Mensagem enviada!": ["Message sent!", "Meldingen er sendt!"], "Responderemos no seu e-mail em até 1 dia útil.": ["We'll reply by email within 1 working day.", "Vi svarer deg på e-post innen 1 virkedag."],
  // ---------- rodapé ----------
  "Protótipo de redesign criado com a técnica SCAMPER.": ["Redesign prototype created with the SCAMPER technique.", "Redesign-prototype laget med SCAMPER-teknikken."], "Atendimento": ["Customer service", "Kundeservice"],
  "Seg–sex 9h–17h": ["Mon–Fri 9am–5pm", "Man–fre 9–17"], "Sáb 10h–14h": ["Sat 10am–2pm", "Lør 10–14"], "Central de atendimento": ["Help centre", "Kundesenter"], "Entregas": ["Deliveries", "Levering"], "Trocas": ["Returns", "Bytte"],
  "Guias": ["Guides", "Guider"], "Projetos": ["Projects", "Prosjekter"], "Você é o visitante nº": ["You are visitor no.", "Du er besøkende nr."], "Melhor visualizado em qualquer tela": ["Best viewed on any screen", "Ser best ut på alle skjermer"],
  "HTML5 semântico": ["Semantic HTML5", "Semantisk HTML5"],
  // ---------- assistente (fora da conversa) e apresentação ----------
  "Precisa de ajuda?": ["Need help?", "Trenger du hjelp?"], "Assistente virtual": ["Virtual assistant", "Virtuell assistent"], "Volt, assistente ARNGREN": ["Volt, ARNGREN assistant", "Volt, ARNGREN-assistent"],
  "online": ["online", "pålogget"], "Enviar": ["Send", "Send"], "Mensagem para o assistente": ["Message to the assistant", "Melding til assistenten"],
  "arraste a divisória": ["drag the divider", "dra skillelinjen"], "Rolar as páginas": ["Scroll the pages", "Rull sidene"], "Voltar a arrastar a divisória": ["Back to dragging the divider", "Tilbake til å dra skillelinjen"],
  "ANTES": ["BEFORE", "FØR"], "DEPOIS": ["AFTER", "ETTER"], "site original": ["original site", "originalt nettsted"], "protótipo SCAMPER": ["SCAMPER prototype", "SCAMPER-prototype"],
  "Antes e depois": ["Before and after", "Før og etter"], "Antes": ["Before", "Før"], "Depois": ["After", "Etter"],
  "O lado \"Antes\" carrega o site original ao vivo (arngren.net). Se ele aparecer em branco, o servidor do site está fora do ar no momento.": ["The \"Before\" side loads the original site live (arngren.net). If it's blank, that server is down right now.", "«Før»-siden laster det originale nettstedet direkte (arngren.net). Er den tom, er serveren nede akkurat nå."]
};

// Textos com números ou nomes no meio
const PATTERNS = [
  [/^Avaliações \((\d+)\)$/, m => TL(0, `Reviews (${m[1]})`, `Anmeldelser (${m[1]})`)],
  [/^(\d+) avaliações$/, m => TL(0, `${m[1]} reviews`, `${m[1]} anmeldelser`)],
  [/^Guias de montagem \((\d+)\)$/, m => TL(0, `Assembly guides (${m[1]})`, `Monteringsguider (${m[1]})`)],
  [/^Dúvidas \((\d+)\)$/, m => TL(0, `Questions (${m[1]})`, `Spørsmål (${m[1]})`)],
  [/^Página (\d+) de (\d+) · use as setas ← → do teclado$/, m => TL(0, `Page ${m[1]} of ${m[2]} · use the ← → keys`, `Side ${m[1]} av ${m[2]} · bruk piltastene ← →`)],
  [/^Item (\d+) de (\d+) · arraste, clique ou use ← →$/, m => TL(0, `Item ${m[1]} of ${m[2]} · drag, click or use ← →`, `Produkt ${m[1]} av ${m[2]} · dra, klikk eller bruk ← →`)],
  [/^Passo (\d+) de (\d+)$/, m => TL(0, `Step ${m[1]} of ${m[2]}`, `Trinn ${m[1]} av ${m[2]}`)],
  [/^(\d+) passos$/, m => TL(0, `${m[1]} steps`, `${m[1]} trinn`)],
  [/^(\d+) dias?$/, m => TL(0, m[1] === "1" ? "1 day" : `${m[1]} days`, m[1] === "1" ? "1 dag" : `${m[1]} dager`)],
  [/^(\d+) dia\(s\)$/, m => TL(0, `${m[1]} day(s)`, `${m[1]} dag(er)`)],
  [/^\((Avançado|Intermediário|Iniciante), (.+)\)$/, m => `(${tr1(m[1])}, ${tr1(m[2]) || m[2]})`],
  [/^▲ (kr .+) mais caro$/, m => TL(0, `▲ ${m[1]} more`, `▲ ${m[1]} dyrere`)],
  [/^▼ (kr .+) mais barato$/, m => TL(0, `▼ ${m[1]} less`, `▼ ${m[1]} billigere`)],
  [/^(kr .+) ✓ menor preço$/, m => TL(0, `${m[1]} ✓ lowest price`, `${m[1]} ✓ lavest pris`)],
  [/^-(\d+)% oferta$/, m => TL(0, `-${m[1]}% off`, `-${m[1]} % tilbud`)],
  [/^(\d+) confirmados$/, m => TL(0, `${m[1]} going`, `${m[1]} påmeldt`)],
  [/^♥ (\d+) curtidas$/, m => TL(0, `♥ ${m[1]} likes`, `♥ ${m[1]} liker`)],
  [/^(\d+) produto\(s\)$/, m => TL(0, `${m[1]} product(s)`, `${m[1]} produkt(er)`)],
  [/^(\d+) produto\(s\) para comparar:$/, m => TL(0, `${m[1]} product(s) to compare:`, `${m[1]} produkt(er) å sammenligne:`)],
  [/^(\d+)–(\d+) anos$/, m => TL(0, `${m[1]}–${m[2]} years`, `${m[1]}–${m[2]} år`)],
  [/^(\d+) anos$/, m => TL(0, `${m[1]} years`, `${m[1]} år`)],
  [/^mensagem #(\d+)$/, m => TL(0, `post #${m[1]}`, `innlegg #${m[1]}`)],
  [/^termina em (.+)$/, m => TL(0, `ends in ${m[1]}`, `slutter om ${m[1]}`)],
  [/^([\d.]+) de 5 estrelas$/, m => TL(0, `${m[1]} out of 5 stars`, `${m[1]} av 5 stjerner`)],
  [/^Faltam (\d+) ponto\(s\) para o próximo nível \(guia concluído = 2, post = 1\)\.$/, m => TL(0, `${m[1]} point(s) to the next level (finished guide = 2, post = 1).`, `${m[1]} poeng igjen til neste nivå (fullført guide = 2, innlegg = 1).`)],
  [/^Guias concluídos: (\d+)\/(\d+) · Posts: (\d+)$/, m => TL(0, `Guides finished: ${m[1]}/${m[2]} · Posts: ${m[3]}`, `Fullførte guider: ${m[1]}/${m[2]} · Innlegg: ${m[3]}`)],
  [/^Responder como (.+)$/, m => TL(0, `Reply as ${tr1(m[1]) || m[1]}`, `Svar som ${tr1(m[1]) || m[1]}`)],
  [/^Quem gosta de (.+?)(?: e (.+))? também viu$/, m => { const a = tr1(m[1]) || m[1], b = m[2] ? (tr1(m[2]) || m[2]) : ""; return TL(0, `People who like ${a}${b ? " and " + b : ""} also viewed`, `De som liker ${a}${b ? " og " + b : ""}, så også`); }],
  [/^Resultados para “(.+?)”(?: em (.+))?$/, m => TL(0, `Results for “${m[1]}”${m[2] ? " in " + (tr1(m[2]) || m[2]) : ""}`, `Resultater for «${m[1]}»${m[2] ? " i " + (tr1(m[2]) || m[2]) : ""}`)],
  [/^Porque você viu: (.+)$/, m => TL(0, `Because you viewed: ${tr1(m[1]) || m[1]}`, `Fordi du så på: ${tr1(m[1]) || m[1]}`)],
  [/^Porque está no seu carrinho: (.+)$/, m => TL(0, `Because it's in your cart: ${tr1(m[1]) || m[1]}`, `Fordi den ligger i handlekurven: ${tr1(m[1]) || m[1]}`)],
  [/^Acessório para (.+)$/, m => TL(0, `Accessory for ${tr1(m[1]) || m[1]}`, `Tilbehør til ${tr1(m[1]) || m[1]}`)],
  [/^Combina com seu interesse: (.+)$/, m => TL(0, `Matches your interest: ${tr1(m[1]) || m[1]}`, `Passer interessen din: ${tr1(m[1]) || m[1]}`)],
  [/^Abrir guia (.+)$/, m => TL(0, `Open guide ${tr1(m[1]) || m[1]}`, `Åpne guiden ${tr1(m[1]) || m[1]}`)],
  [/^Ver (.+)$/, m => { const t = tr1(m[1]); return t ? TL(0, `View ${t}`, `Se ${t}`) : null; }],
  [/^por (.+)$/, m => TL(0, `by ${m[1]}`, `av ${m[1]}`)],
  [/^Foto (\d+)$/, m => TL(0, `Photo ${m[1]}`, `Bilde ${m[1]}`)],
  [/^Destaque (\d+)$/, m => TL(0, `Highlight ${m[1]}`, `Høydepunkt ${m[1]}`)],
  [/^Protocolo nº (\d+)\.$/, m => TL(0, `Reference no. ${m[1]}.`, `Referansenr. ${m[1]}.`)],
  [/^\(canal secundário, no horário de atendimento\): (.+)$/, m => TL(0, `(secondary channel, during opening hours): ${m[1]}`, `(sekundær kanal, i åpningstiden): ${m[1]}`)],
  [/^Seu trajeto \((\d+) km\) é maior que a autonomia \((\d+) km\): seria preciso recarregar no caminho\.$/, m => TL(0, `Your trip (${m[1]} km) is longer than the range (${m[2]} km): you'd need to recharge on the way.`, `Turen din (${m[1]} km) er lengre enn rekkevidden (${m[2]} km): du må lade underveis.`)]
];

const LIDX = () => (LANG === "en" ? 0 : 1);
function tr1(k) {
  if (!k) return null;
  const d = I18N[k];
  if (d) return d[LIDX()];
  for (const [re, f] of PATTERNS) { const m = k.match(re); if (m) { const r = f(m); if (r) return r; } }
  // símbolos no começo/fim (★, ●, », ▾, 📍, ✔ ...)
  let m = k.match(/^([^\p{L}\p{N}"“(]+\s)(.+)$/u);
  if (m) { const r = tr1(m[2]); if (r) return m[1] + r; }
  m = k.match(/^(.+?)(\s[^\p{L}\p{N}")”]+)$/u);
  if (m) { const r = tr1(m[1]); if (r) return r + m[2]; }
  // partes separadas por — · » :
  for (const sep of [" — ", " · ", " » ", ": "]) {
    if (k.includes(sep)) {
      const parts = k.split(sep), out = parts.map(p => tr1(p.trim()) || p);
      if (out.some((x, i) => x !== parts[i])) return out.join(sep);
    }
  }
  return null;
}
function tr(s) {
  if (LANG === "pt" || !s) return s;
  const k = s.trim();
  if (!k) return s;
  const r = tr1(k.replace(/\s+/g, " "));
  return r ? s.replace(k, r) : s;
}

// Aplica nos textos e atributos da página, guardando o original
const I18N_SKIP = "script,style,.sc,#chatLog,#chatSugg,[data-noi18n],.tour-tip";
const TXT = new WeakMap(), ATTR = new WeakMap();
function i18nText(n) {
  const p = n.parentElement;
  if (!p || p.closest(I18N_SKIP)) return;
  let rec = TXT.get(n);
  if (!rec || n.nodeValue !== rec.out) rec = { orig: n.nodeValue };
  rec.out = convertPrices(LANG === "pt" ? rec.orig : tr(rec.orig));
  if (n.nodeValue !== rec.out) n.nodeValue = rec.out;
  TXT.set(n, rec);
}
function i18nAttrs(el) {
  if (el.closest(I18N_SKIP)) return;
  for (const a of ["placeholder", "aria-label", "title"]) {
    if (!el.hasAttribute(a)) continue;
    const all = ATTR.get(el) || {}, cur = el.getAttribute(a);
    let rec = all[a];
    if (!rec || cur !== rec.out) rec = { orig: cur };
    rec.out = convertPrices(LANG === "pt" ? rec.orig : tr(rec.orig));
    if (cur !== rec.out) el.setAttribute(a, rec.out);
    all[a] = rec; ATTR.set(el, all);
  }
}
function i18nNode(root) {
  if (!root) return;
  if (root.nodeType === 3) return i18nText(root);
  if (root.nodeType !== 1) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) i18nText(n);
  i18nAttrs(root);
  root.querySelectorAll("[placeholder],[aria-label],[title]").forEach(i18nAttrs);
}
const i18nObserver = new MutationObserver(list => {
  for (const m of list) m.addedNodes.forEach(i18nNode);
});

function setLang(l) {
  LANG = l;
  store.set("arn_lang", l);
  document.documentElement.lang = { pt: "pt-BR", en: "en", no: "nb" }[l];
  document.title = TL("ARNGREN.net :: Elektronikk, Hobby & Elbiler — Protótipo SCAMPER", "ARNGREN.net :: Electronics, Hobby & E-vehicles — SCAMPER prototype", "ARNGREN.net :: Elektronikk, hobby og elbiler — SCAMPER-prototype");
  document.querySelectorAll(".lang-switch button").forEach(b => b.classList.toggle("on", b.dataset.lang === l));
  i18nNode(document.body);
  resetChat();
}
function initI18n() {
  i18nObserver.observe(document.body, { childList: true, subtree: true });
  setLang(LANG);
}
