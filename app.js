// Tipos ampliados de pontos turísticos
const tiposTurismo = [
  "todos",
  "cultural",
  "natureza",
  "praia",
  "aventura",
  "religioso",
  "gastronômico",
  "histórico",
  "mirante",
  "parque aquático",
  "esporte",
  "compras",
  "ecoturismo",
  "rural",
  "urbano",
  "vida noturna",
  "arte",
  "museu",
  "parque temático"
];

// Atualiza o select de tipos e cidades dinamicamente ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  // Tipos de turismo
  const select = document.getElementById('filterType');
  select.innerHTML = tiposTurismo.map(tipo =>
    `<option value="${tipo}">${tipo === "todos" ? "Todos os tipos" : tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>`
  ).join('');

  // Cidades únicas do array spots
  const filterCity = document.getElementById('filterCity');
  filterCity.innerHTML = `<option value="todas">Todas as cidades</option>` +
    getCidadesComSpots().map(cidade =>
      `<option value="${cidade}">${cidade}</option>`
    ).join('');

  renderSpotList("todos", 4);
  updateMap();
});

// Gere a lista de cidades únicas com pelo menos um ponto turístico
function getCidadesComSpots() {
  const cidades = new Set();
  spots.forEach(s => cidades.add(s.cidade));
  return Array.from(cidades).sort();
}

// Função de emoji ampliada
function getEmoji(spot) {
  if (spot.nome.toLowerCase().includes("maracanã")) return "🏟️";
  if (spot.tipo === "praia") return "🏖️";
  if (spot.tipo === "cultural") return "🏛️";
  if (spot.tipo === "natureza") return "🌳";
  if (spot.tipo === "aventura") return "⛰️";
  if (spot.tipo === "religioso") return "⛪";
  if (spot.tipo === "gastronômico") return "🍽️";
  if (spot.tipo === "histórico") return "🏺";
  if (spot.tipo === "mirante") return "🌄";
  if (spot.tipo === "parque aquático") return "🐠";
  if (spot.tipo === "esporte") return "🏅";
  if (spot.tipo === "compras") return "🛍️";
  if (spot.tipo === "ecoturismo") return "🌱";
  if (spot.tipo === "rural") return "🚜";
  if (spot.tipo === "urbano") return "🏙️";
  if (spot.tipo === "vida noturna") return "🌃";
  if (spot.tipo === "arte") return "🎨";
  if (spot.tipo === "museu") return "🖼️";
  if (spot.tipo === "parque temático") return "🎢";
  return "📍";
}

// Símbolos de preço
function getPrecoSimbolo(preco) {
  if (preco === 0) return "🟢 Grátis";
  if (preco <= 30) return "🟡 Barato";
  if (preco <= 80) return "🟠 Médio";
  return "🔴 Elevado";
}

// Função para rankear por visitas totais
function getRankedSpots(type = "todos") {
  let filtered = spots;
  if (type !== "todos") {
    filtered = spots.filter(s => s.tipo === type);
  }
  return filtered
    .map(s => ({
      ...s,
      totalVisitas: s.visitas.reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.totalVisitas - a.totalVisitas);
}

// Função para criar botão "Exibir mais"
function createShowMoreButton(list, total, type) {
  const btn = document.createElement('button');
  btn.textContent = "Exibir mais";
  btn.className = "btn-show-more";
  btn.addEventListener('click', function () {
    renderSpotList(type, total); // Mostra todos
    btn.remove();
  });
  list.appendChild(btn);
}

// Função assíncrona para buscar os spots
async function fetchSpots() {
  const response = await fetch('http://localhost:5000/api/spots');
  return await response.json();
}

let spots = [];

// Carrega todos os spots do Firestore ao iniciar
async function carregarSpots() {
  const snapshot = await window.db.collection("spots").get();
  spots = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    data.totalVisitas = Array.isArray(data.visitas) ? data.visitas.reduce((a, b) => a + b, 0) : 0;
    spots.push(data);
  });
  preencherTipos();
  preencherCidades();
  renderSpotList("todos", 4);
  updateMap();
}

// Preenche o select de tipos dinamicamente
function preencherTipos() {
  const tipos = Array.from(new Set(spots.map(s => s.tipo)));
  const select = document.getElementById('filterType');
  select.innerHTML = '<option value="todos">Todos os tipos</option>';
  tipos.forEach(tipo => {
    const opt = document.createElement('option');
    opt.value = tipo;
    opt.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    select.appendChild(opt);
  });
}

// Preenche o select de cidades dinamicamente
function preencherCidades() {
  const cidades = Array.from(new Set(spots.map(s => s.cidade)));
  const select = document.getElementById('filterCity');
  select.innerHTML = '<option value="todas">Todas as cidades</option>';
  cidades.forEach(cidade => {
    const opt = document.createElement('option');
    opt.value = cidade;
    opt.textContent = cidade;
    select.appendChild(opt);
  });
}

// Renderiza a lista filtrando pelo tipo, cidade e busca
function renderSpotList(type = "todos", limit = 4) {
  const cidade = document.getElementById('filterCity').value;
  const search = document.getElementById('searchBar').value.trim().toLowerCase();

  let filtrados = spots;
  if (type !== "todos") filtrados = filtrados.filter(s => s.tipo === type);
  if (cidade !== "todas") filtrados = filtrados.filter(s => s.cidade === cidade);
  if (search) filtrados = filtrados.filter(s => s.nome.toLowerCase().includes(search));

  filtrados = filtrados.sort((a, b) => b.totalVisitas - a.totalVisitas);

  const spotsToShow = filtrados.slice(0, limit);
  const list = document.getElementById('spotList');
  list.innerHTML = '';
  spotsToShow.forEach((spot, idx) => {
    const li = document.createElement('li');
    li.className = 'spot-card';
    li.innerHTML = `
      <div class="spot-info">
        <span class="spot-title">${getEmoji(spot)} ${idx + 1}. ${spot.nome}</span>
        <span class="spot-meta">
          <span class="spot-type">${spot.tipo.charAt(0).toUpperCase() + spot.tipo.slice(1)}</span>
          <span class="spot-city">${spot.cidade}</span>
          Visitantes/mês: <b>${Math.round(spot.totalVisitas/12).toLocaleString('pt-BR')}</b> &nbsp;|&nbsp;
          Preço médio: <b>${getPrecoSimbolo(spot.preco)} (R$ ${spot.preco})</b>
        </span>
      </div>
    `;
    li.addEventListener('click', function() {
      centralizaNoMapa(spot.lat, spot.lng, 15);
    });
    list.appendChild(li);
  });

  if (filtrados.length > limit) {
    createShowMoreButton(list, filtrados.length, type);
  }
}

// Atualiza o mapa (centraliza no primeiro do filtro)
function updateMap(type = "todos") {
  let center = { lat: -22.9068, lng: -43.1729 }; // Centro do RJ
  let zoom = 8;
  let filtrados = spots;
  if (type !== "todos") {
    filtrados = spots.filter(s => s.tipo === type);
    if (filtrados.length > 0) {
      center = { lat: filtrados[0].lat, lng: filtrados[0].lng };
      zoom = 11;
    }
  }
  centralizaNoMapa(center.lat, center.lng, zoom);
}

// Centraliza o mapa em um ponto específico
function centralizaNoMapa(lat, lng, zoom = 15) {
  const mapFrame = document.getElementById('mapFrame');
  mapFrame.src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

// Inicialização
window.addEventListener('DOMContentLoaded', carregarSpots);

// Eventos dos filtros
document.getElementById('filterType').addEventListener('change', function() {
  renderSpotList(this.value, 4);
  updateMap(this.value);
});
document.getElementById('filterCity').addEventListener('change', function() {
  renderSpotList(document.getElementById('filterType').value, 4);
});
document.getElementById('searchBar').addEventListener('input', function() {
  renderSpotList(document.getElementById('filterType').value, 4);
});