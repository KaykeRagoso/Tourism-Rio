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
});

// Adicione a propriedade 'cidade' em cada spot do array spots, exemplo:
const spots = [
  // cultural
  {
    nome: "Cristo Redentor",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [120000, 110000, 115000, 130000, 125000, 120000, 118000, 119000, 121000, 123000, 122000, 120000],
    preco: 80,
    foto: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg",
    lat: -22.9519,
    lng: -43.2105
  },
  {
    nome: "Theatro Municipal",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [30000, 28000, 29000, 32000, 31000, 30000, 29800, 29900, 30100, 30300, 30200, 30000],
    preco: 40,
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Theatro_Municipal_RJ.jpg",
    lat: -22.9087,
    lng: -43.1767
  },
  {
    nome: "Museu do Amanhã",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [60000, 55000, 57000, 65000, 62000, 61000, 60000, 59000, 61000, 63000, 64000, 60000],
    preco: 30,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Museu_do_Amanha_-_Rio_de_Janeiro.jpg",
    lat: -22.8968,
    lng: -43.1806
  },
  {
    nome: "Real Gabinete Português de Leitura",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [12000, 11000, 11500, 13000, 12500, 12000, 11800, 11900, 12100, 12300, 12200, 12000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Real_Gabinete_Portugu%C3%AAs_de_Leitura_-_Rio_de_Janeiro.jpg",
    lat: -22.9064,
    lng: -43.1822
  },
  {
    nome: "Biblioteca Nacional",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [15000, 14000, 14500, 16000, 15500, 15000, 14800, 14900, 15100, 15300, 15200, 15000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Biblioteca_Nacional_-_Rio_de_Janeiro.jpg",
    lat: -22.9083,
    lng: -43.1761
  },
  {
    nome: "Museu de Arte Moderna (MAM)",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [20000, 18000, 19000, 21000, 20500, 20000, 19800, 19900, 20100, 20300, 20200, 20000],
    preco: 20,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Museu_de_Arte_Moderna_do_Rio_de_Janeiro.jpg",
    lat: -22.9132,
    lng: -43.1701
  },
  {
    nome: "Museu Histórico Nacional",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [18000, 17000, 17500, 19000, 18500, 18000, 17800, 17900, 18100, 18300, 18200, 18000],
    preco: 10,
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Museu_Hist%C3%B3rico_Nacional_-_Rio_de_Janeiro.jpg",
    lat: -22.9035,
    lng: -43.1707
  },
  {
    nome: "Museu Nacional de Belas Artes",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [16000, 15000, 15500, 17000, 16500, 16000, 15800, 15900, 16100, 16300, 16200, 16000],
    preco: 15,
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Museu_Nacional_de_Belas_Artes_-_Rio_de_Janeiro.jpg",
    lat: -22.9082,
    lng: -43.1762
  },
  {
    nome: "Museu da República",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [14000, 13000, 13500, 15000, 14500, 14000, 13800, 13900, 14100, 14300, 14200, 14000],
    preco: 10,
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Museu_da_Rep%C3%BAblica_-_Rio_de_Janeiro.jpg",
    lat: -22.9307,
    lng: -43.1787
  },
  {
    nome: "Museu Casa de Rui Barbosa",
    tipo: "cultural",
    cidade: "Rio de Janeiro",
    visitas: [10000, 9000, 9500, 11000, 10500, 10000, 9800, 9900, 10100, 10300, 10200, 10000],
    preco: 10,
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Museu_Casa_de_Rui_Barbosa_-_Rio_de_Janeiro.jpg",
    lat: -22.9647,
    lng: -43.1972
  },
  // praia (sem repetições)
  {
    nome: "Praia de Copacabana",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [200000, 180000, 190000, 210000, 205000, 200000, 198000, 199000, 201000, 203000, 202000, 200000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Copacabana_Beach_-_Rio_de_Janeiro%2C_Brasil.jpg",
    lat: -22.9711,
    lng: -43.1822
  },
  {
    nome: "Praia de Ipanema",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [180000, 170000, 175000, 190000, 185000, 180000, 178000, 179000, 181000, 183000, 182000, 180000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Ipanema_Beach_-_Rio_de_Janeiro.jpg",
    lat: -22.9847,
    lng: -43.2048
  },
  {
    nome: "Praia do Leblon",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [120000, 110000, 115000, 130000, 125000, 120000, 118000, 119000, 121000, 123000, 122000, 120000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Leblon_Beach_-_Rio_de_Janeiro.jpg",
    lat: -22.9872,
    lng: -43.2231
  },
  {
    nome: "Praia do Recreio",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [90000, 85000, 87000, 95000, 92000, 91000, 90000, 89000, 91000, 93000, 94000, 90000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Recreio_Beach_-_Rio_de_Janeiro.jpg",
    lat: -23.0215,
    lng: -43.4732
  },
  {
    nome: "Praia do Leme",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [80000, 75000, 77000, 85000, 82000, 81000, 80000, 79000, 81000, 83000, 84000, 80000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Leme_Beach_-_Rio_de_Janeiro.jpg",
    lat: -22.9647,
    lng: -43.1729
  },
  {
    nome: "Praia do Arpoador",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [70000, 65000, 67000, 75000, 72000, 71000, 70000, 69000, 71000, 73000, 74000, 70000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Arpoador_Beach_-_Rio_de_Janeiro.jpg",
    lat: -22.9882,
    lng: -43.2047
  },
  {
    nome: "Praia da Barra da Tijuca",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [60000, 55000, 57000, 65000, 62000, 61000, 60000, 59000, 61000, 63000, 64000, 60000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Barra_da_Tijuca_Beach_-_Rio_de_Janeiro.jpg",
    lat: -23.0037,
    lng: -43.3659
  },
  {
    nome: "Praia do Pepê",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [50000, 48000, 49000, 52000, 51000, 50000, 49800, 49900, 50100, 50300, 50200, 50000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Pepe_Beach_-_Rio_de_Janeiro.jpg",
    lat: -23.0047,
    lng: -43.3159
  },
  {
    nome: "Praia do Grumari",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [40000, 38000, 39000, 42000, 41000, 40000, 39800, 39900, 40100, 40300, 40200, 40000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Grumari_Beach_-_Rio_de_Janeiro.jpg",
    lat: -23.0457,
    lng: -43.5079
  },
  {
    nome: "Praia de São Conrado",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [30000, 28000, 29000, 32000, 31000, 30000, 29800, 29900, 30100, 30300, 30200, 30000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Sao_Conrado_Beach_-_Rio_de_Janeiro.jpg",
    lat: -23.0067,
    lng: -43.2779
  },
  {
    nome: "Praia do Forte (Cabo Frio)",
    tipo: "praia",
    cidade: "Cabo Frio",
    visitas: [90000, 85000, 87000, 95000, 92000, 91000, 90000, 89000, 91000, 93000, 94000, 90000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Praia_do_Forte_-_Cabo_Frio.jpg",
    lat: -22.8811,
    lng: -42.0189
  },
  {
    nome: "Praia da Reserva",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [60000, 59000, 61000, 63000, 64000, 60000, 62000, 61000, 60000, 60500, 61500, 62000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Praia_da_Reserva_RJ.jpg",
    lat: -23.0222,
    lng: -43.4144
  },
  {
    nome: "Praia da Joatinga",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [35000, 34000, 36000, 37000, 36500, 36000, 35500, 35800, 36200, 36400, 36300, 36000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Praia_da_Joatinga.jpg",
    lat: -23.0136,
    lng: -43.2922
  },
  {
    nome: "Praia Vermelha",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [32000, 31000, 31500, 33000, 32500, 32000, 31800, 31900, 32100, 32300, 32200, 32000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Praia_Vermelha_-_Rio_de_Janeiro.jpg",
    lat: -22.9511,
    lng: -43.1651
  },
  {
    nome: "Praia da Macumba",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [28000, 27000, 27500, 29000, 28500, 28000, 27800, 27900, 28100, 28300, 28200, 28000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Praia_da_Macumba.jpg",
    lat: -23.0333,
    lng: -43.4847
  },
  {
    nome: "Praia do Abricó",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [15000, 14000, 14500, 16000, 15500, 15000, 14800, 14900, 15100, 15300, 15200, 15000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Praia_do_Abric%C3%B3.jpg",
    lat: -23.0450,
    lng: -43.5200
  },
    {
    nome: "Praia do Perigoso",
    tipo: "praia",
    cidade: "Rio de Janeiro",
    visitas: [12000, 11000, 11500, 13000, 12500, 12000, 11800, 11900, 12100, 12300, 12200, 12000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Praia_do_Perigoso.jpg",
    lat: -23.0200,
    lng: -43.4700
    },
    {
    nome: "JArdim Botânico",
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [120000, 110000, 115000, 130000, 125000, 120000, 118000, 119000, 121000, 123000, 122000, 120000],
    preco: 73,
    foto: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg",
    lat: -22.9690,
    lng: -43.2263
  },
    {
    nome: "Parque Nacional da Tijuca",
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [100000, 95000, 97000, 105000, 102000, 100000, 98000, 99000, 101000, 103000, 102000, 100000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Parque_Nacional_da_Tijuca.jpg",
    lat: -22.9519,
    lng: -43.2105
 },
    {
    nome: "Parque Lage",
    tipo: "natureza",  
    cidade: "Rio de Janeiro",
    visitas: [80000, 75000, 77000, 85000, 82000, 81000, 80000, 79000, 81000, 83000, 84000, 80000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Parque_Lage.jpg",
    lat: -22.9619,
    lng: -43.2245
 },
    {
    nome: "Floresta da Tijuca", 
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [60000, 55000, 57000, 65000, 62000, 61000, 60000, 59000, 61000, 63000, 64000, 60000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Floresta_da_Tijuca.jpg",
    lat: -22.9250,
    lng: -43.2230
  },
    {
    nome: "Lagoa Rodrigo de Freitas",   
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [50000, 48000, 49000, 52000, 51000, 50000, 49800, 49900, 50100, 50300, 50200, 50000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Lagoa_Rodrigo_de_Freitas.jpg",
    lat: -22.9730,
    lng: -43.2230
  },
    {
    nome: "Bosque da Barra",    
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [40000, 38000, 39000, 42000, 41000, 40000, 39800, 39900, 40100, 40300, 40200, 40000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Bosque_da_Barra.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    nome: "Parque Natural Municipal de Prainha",
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [30000, 28000, 29000, 32000, 31000, 30000, 29800, 29900, 30100, 30300, 30200, 30000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Parque_Natural_Municipal_de_Prainha.jpg",
    lat: -23.0200,
    lng: -43.4700
  },
    {
    nome: "Parque Estadual da Pedra Branca",
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [20000, 18000, 19000, 21000, 20500, 20000, 19800, 19900, 20100, 20300, 20200, 20000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Parque_Estadual_da_Pedra_Branca.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    nome: "Ilha de Paquetá",
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [15000, 14000, 14500, 16000, 15500, 15000, 14800, 14900, 15100, 15300, 15200, 15000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ilha_de_Paqueta.jpg",
    lat: -22.8830,
    lng: -43.2000
    },
    {
    nome: "Ilhas Cagarras",
    tipo: "natureza",
    cidade: "Rio de Janeiro",
    visitas: [12000, 11000, 11500, 13000, 12500, 12000, 11800, 11900, 12100, 12300, 12200, 12000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ilhas_Cagarras.jpg",
    lat: -23.0000,
    lng: -43.2000
    },
    {
    nome: "Trilha da Pedra da Gávea",  
    tipo: "aventura",
    cidade: "Rio de Janeiro",
    visitas: [10000, 9500, 9700, 10500, 10200, 10000, 9800, 9900, 10100, 10300, 10200, 10000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Trilha_da_Pedra_da_Gavea.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    nome: "Trilha do Morro Dois Irmãos",
    tipo: "aventura",
    cidade: "Rio de Janeiro",
    visitas: [8000, 7500, 7700, 8500, 8200, 8100, 8000, 7900, 8100, 8300, 8400, 8000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Trilha_do_Morro_Dois_Irmaos.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    nome: "Trilha da Pedra Bonita",
    tipo: "aventura",
    cidade: "Rio de Janeiro",
    visitas: [6000, 5500, 5700, 6500, 6200, 6100, 6000, 5900, 6100, 6300, 6400, 6000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Trilha_da_Pedra_Bonita.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    nome: "Trilha da Pedra do Telégrafo",
    tipo: "aventura",
    cidade: "Rio de Janeiro",
    visitas: [5000, 4800, 4900, 5200, 5100, 5000, 4980, 4990, 5010, 5030, 5020, 5000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Trilha_da_Pedra_do_Telegrapho.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    nome: "Trilha do Pico da Tijuca",
    tipo: "aventura",
    cidade: "Rio de Janeiro",
    visitas: [4000, 3800, 3900, 4200, 4100, 4000, 3980, 3990, 4010, 4030, 4020, 4000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Trilha_do_Pico_da_Tijuca.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    nome: "Trilha do Morro da Urca",
    tipo: "aventura",
    cidade: "Rio de Janeiro",
    visitas: [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Trilha_do_Morro_da_Urca.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    nome: "Trilha do Parque da Catacumba",
    tipo: "aventura",
    cidade: "Rio de Janeiro",
    visitas: [2000, 1800, 1900, 2100, 2050, 2000, 1980, 1990, 2010, 2030, 2020, 2000],
    preco: 0,
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Trilha_do_Parque_da_Catacumba.jpg",
    lat: -22.9990,
    lng: -43.3650
    },
    {
    "nome": "Trilha do Morro do Leme",
        "tipo": "natureza",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9634,
        "lng": -43.1652
      },
      {
        "nome": "Trilha do Morro do Pasmado",
        "tipo": "natureza",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9580,
        "lng": -43.1806
      },
      {
        "nome": "Trilha do Morro da Babilônia",
        "tipo": "natureza",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9583,
        "lng": -43.1656
      },
      {
        "nome": "Catedral Metropolitana de São Sebastião",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9083,
        "lng": -43.1801
      },
      {
        "nome": "Igreja da Candelária",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.8974,
        "lng": -43.1808
      },
      {
        "nome": "Mosteiro de São Bento",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.8949,
        "lng": -43.1801
      },
      {
        "nome": "Igreja de Nossa Senhora do Carmo da Antiga Sé",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9026,
        "lng": -43.1772
      },
      {
        "nome": "Igreja de São Francisco da Penitência",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9082,
        "lng": -43.1802
      },
      {
        "nome": "Igreja de Nossa Senhora da Glória do Outeiro",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9208,
        "lng": -43.1765
      },
      {
        "nome": "Igreja de Nossa Senhora da Penha",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.8374,
        "lng": -43.3221
      },
      {
        "nome": "Igreja de Nossa Senhora do Rosário e São Benedito dos Homens Pretos",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9042,
        "lng": -43.1806
      },
      {
        "nome": "Igreja de Santa Rita",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.9008,
        "lng": -43.1774
      },
      {
        "nome": "Igreja de São Francisco Xavier",
        "tipo": "religioso",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 0,
        "foto": "",
        "lat": -22.8814,
        "lng": -43.2226
      },
      {
        "nome": "Confeitaria Colombo",
        "tipo": "gastronômico",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 50,
        "foto": "",
        "lat": -22.9026,
        "lng": -43.1769
      },
      {
        "nome": "Bar Urca",
        "tipo": "gastronômico",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 70,
        "foto": "",
        "lat": -22.9492,
        "lng": -43.1649
      },
      {
        "nome": "Aprazível",
        "tipo": "gastronômico",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 100,
        "foto": "",
        "lat": -22.9222,
        "lng": -43.1868
      },
      {
        "nome": "Garota de Ipanema",
        "tipo": "gastronômico",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 80,
        "foto": "",
        "lat": -22.9846,
        "lng": -43.2046
      },
      {
        "nome": "Cervantes",
        "tipo": "gastronômico",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 60,
        "foto": "",
        "lat": -22.9631,
        "lng": -43.1807
      },
      {
        "nome": "Braseiro da Gávea",
        "tipo": "gastronômico",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 90,
        "foto": "",
        "lat": -22.9714,
        "lng": -43.2333
      },
      {
        "nome": "Casa da Feijoada",
        "tipo": "gastronômico",
        "cidade": "Rio de Janeiro",
        "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
        "preco": 70,
        "foto": "",
        "lat": -22.9820,
    "lng": -43.2054
      },
      {
    "nome": "Churrascaria Palace",
    "tipo": "gastronômico",
    "cidade": "Rio de Janeiro",
    "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
    "preco": 120,
    "foto": "",
    "lat": -22.9642,
    "lng": -43.1820
    },
    {
    "nome": "Oro Restaurante",
    "tipo": "gastronômico",
    "cidade": "Rio de Janeiro",
    "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
    "preco": 400,
    "foto": "",
    "lat": -22.9613,
    "lng": -43.1974
    },
    {
    "nome": "Sushi Leblon",
    "tipo": "gastronômico",
    "cidade": "Rio de Janeiro",
    "visitas": [3000, 2800, 2900, 3200, 3100, 3000, 2980, 2990, 3010, 3030, 3020, 3000],
    "preco": 250,
    "foto": "",
    "lat": -22.9837,
    "lng": -43.2237
      }
        {
          "nome": "Museu Histórico Nacional",
          "tipo": "museu",
          "cidade": "Rio de Janeiro",
          "visitas": [18000, 17000, 16000, 15000, 14000, 13000, 16000, 18000, 20000, 22000, 23000, 25000],
          "preco": 10,
          "foto": "",
          "lat": -22.9027,
          "lng": -43.1667
        },
        {
          "nome": "Forte de Copacabana",
          "tipo": "histórico",
          "cidade": "Rio de Janeiro",
          "visitas": [22000, 21000, 20000, 19000, 18000, 16000, 17000, 20000, 22000, 25000, 26000, 28000],
          "preco": 10,
          "foto": "",
          "lat": -22.9880,
          "lng": -43.1852
        },
        {
          "nome": "Forte de São João",
          "tipo": "histórico",
          "cidade": "Rio de Janeiro",
          "visitas": [8000, 7500, 7000, 6500, 6000, 5500, 6000, 7000, 8500, 9000, 9500, 10000],
          "preco": 0,
          "foto": "",
          "lat": -22.9447,
          "lng": -43.1519
        },
        {
          "nome": "Forte de Santa Cruz",
          "tipo": "histórico",
          "cidade": "Niterói",
          "visitas": [9000, 8500, 8000, 7500, 7000, 6500, 7000, 8000, 9000, 9500, 10000, 11000],
          "preco": 6,
          "foto": "",
          "lat": -22.9315,
          "lng": -43.1219
        },
        {
          "nome": "Ilha Fiscal",
          "tipo": "histórico",
          "cidade": "Rio de Janeiro",
          "visitas": [15000, 14000, 13500, 12000, 11000, 10000, 12000, 14000, 16000, 18000, 19000, 20000],
          "preco": 30,
          "foto": "",
          "lat": -22.8946,
          "lng": -43.1613
        },
        {
          "nome": "Palácio Tiradentes",
          "tipo": "histórico",
          "cidade": "Rio de Janeiro",
          "visitas": [12000, 11500, 11000, 10000, 9000, 8500, 9500, 11000, 12000, 13000, 14000, 15000],
          "preco": 0,
          "foto": "",
          "lat": -22.9011,
          "lng": -43.1767
        },
        {
          "nome": "Palácio do Catete",
          "tipo": "histórico",
          "cidade": "Rio de Janeiro",
          "visitas": [17000, 16500, 16000, 15500, 14000, 13500, 14500, 16000, 18000, 20000, 21000, 22000],
          "preco": 10,
          "foto": "",
          "lat": -22.9180,
          "lng": -43.1797
        },
        {
          "nome": "Palácio Guanabara",
          "tipo": "histórico",
          "cidade": "Rio de Janeiro",
          "visitas": [5000, 4800, 4700, 4600, 4500, 4400, 4600, 4700, 4800, 4900, 5000, 5200],
          "preco": 0,
          "foto": "",
          "lat": -22.9392,
          "lng": -43.1970
        },
        {
          "nome": "Palácio Laranjeiras",
          "tipo": "histórico",
          "cidade": "Rio de Janeiro",
          "visitas": [6000, 5900, 5800, 5700, 5600, 5500, 5700, 5800, 5900, 6000, 6100, 6300],
          "preco": 0,
          "foto": "",
          "lat": -22.9362,
          "lng": -43.1919
        },
        {
          "nome": "Palácio São Joaquim",
          "tipo": "histórico",
          "cidade": "Rio de Janeiro",
          "visitas": [4000, 3900, 3800, 3700, 3600, 3500, 3700, 3800, 3900, 4000, 4100, 4200],
          "preco": 0,
          "foto": "",
          "lat": -22.8975,
          "lng": -43.1700
        }
 ]

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

// Renderiza a lista de pontos turísticos
function renderSpotList(type = "todos", limit = 4) {
  const list = document.getElementById('spotList');
  list.innerHTML = '';
  const filterCity = document.getElementById('filterCity');
  const searchBar = document.getElementById('searchBar');
  const cidade = filterCity ? filterCity.value : "todas";
  const search = searchBar ? searchBar.value.trim().toLowerCase() : "";

  let ranked = getRankedSpots(type);

  if (cidade && cidade !== "todas") {
    ranked = ranked.filter(s => s.cidade === cidade);
  }
  if (search) {
    ranked = ranked.filter(s => s.nome.toLowerCase().includes(search));
  }

  const spotsToShow = ranked.slice(0, limit);
  spotsToShow.forEach((spot, idx) => {
    const li = document.createElement('li');
    li.className = 'spot-card';
    li.innerHTML = `
      <div class="spot-img-wrap">
        <img src="${spot.foto}" alt="${spot.nome}" class="spot-img"/>
      </div>
      <div class="spot-info">
        <span class="spot-title">${getEmoji(spot)} ${idx + 1}. ${spot.nome}</span>
        <span class="spot-meta">
          <span class="spot-type">${spot.tipo === "todos" ? "Todos os tipos" : spot.tipo.charAt(0).toUpperCase() + spot.tipo.slice(1)}</span>
          <span class="spot-city">${spot.cidade}</span>
          Visitantes/mês: <b>${Math.round(spot.totalVisitas/12).toLocaleString('pt-BR')}</b> &nbsp;|&nbsp;
          Preço médio: <b>${getPrecoSimbolo(spot.preco)} (R$ ${spot.preco})</b>
        </span>
      </div>
    `;
    li.addEventListener('click', function(e) {
      centralizaNoMapa(spot.lat, spot.lng, 15);
    });
    list.appendChild(li);
  });

  // Se houver mais de "limit" lugares, mostra o botão
  if (ranked.length > limit) {
    createShowMoreButton(list, ranked.length, type);
  }
}

// Função para mostrar todos os rankings
function renderAllRankings(limit = 10) {
  const list = document.getElementById('spotList');
  list.innerHTML = '';
  tiposTurismo.filter(tipo => tipo !== "todos").forEach(tipo => {
    const ranked = getRankedSpots(tipo).slice(0, limit);
    if (ranked.length === 0) return;
    // Título do tipo
    const tipoTitle = document.createElement('h3');
    tipoTitle.textContent = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    tipoTitle.className = "tipo-title";
    list.appendChild(tipoTitle);
    // Lista dos pontos turísticos do tipo
    ranked.forEach((spot, idx) => {
      const li = document.createElement('li');
      li.className = 'spot-card';
      li.innerHTML = `
        <div class="spot-img-wrap">
          <img src="${spot.foto}" alt="${spot.nome}" class="spot-img"/>
        </div>
        <div class="spot-info">
          <span class="spot-title">${getEmoji(spot)} ${idx + 1}. ${spot.nome}</span>
          <span class="spot-meta">
            <span class="spot-type">${spot.tipo.charAt(0).toUpperCase() + spot.tipo.slice(1)}</span>
            Visitantes/mês: <b>${Math.round(spot.totalVisitas/12).toLocaleString('pt-BR')}</b> &nbsp;|&nbsp;
            Preço médio: <b>${getPrecoSimbolo(spot.preco)} (R$ ${spot.preco})</b>
          </span>
        </div>
      `;
      li.addEventListener('click', function(e) {
        centralizaNoMapa(spot.lat, spot.lng, 15);
      });
      list.appendChild(li);
    });
  });
}

// Filtro por tipo de turismo
const filterType = document.getElementById('filterType');
filterType.addEventListener('change', function() {
  renderSpotList(this.value, 4);
  updateMap(this.value);
});

// Eventos dos filtros e pesquisa
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

// Centraliza o mapa em um ponto específico
function centralizaNoMapa(lat, lng, zoom = 15) {
  const mapFrame = document.getElementById('mapFrame');
  mapFrame.src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

// Atualiza o mapa (centraliza no primeiro do filtro)
function updateMap(type = "todos") {
  let center = { lat: -22.9068, lng: -43.1729 }; // Centro do RJ
  let zoom = 8;
  if (type !== "todos") {
    const filtered = spots.filter(s => s.tipo === type);
    if (filtered.length > 0) {
      center = { lat: filtered[0].lat, lng: filtered[0].lng };
      zoom = 11;
    }
  }
  centralizaNoMapa(center.lat, center.lng, zoom);
}

// Inicialização
renderSpotList("todos", 4);
updateMap();

// Para mostrar todos os tipos juntos, chame:
// renderAllRankings(15);

// Se quiser manter o filtro, use renderSpotList(tipo, 15);

// Salvar um spot
{/*
db.collection("spots").add({
  nome: "Jardim Botânico",
  tipo: "natureza",
  cidade: "Rio de Janeiro",
  visitas: [120000, 110000, 115000, 130000, 125000, 120000, 118000, 119000, 121000, 123000, 122000, 120000],
  preco: 73,
  foto: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg",
  lat: -22.9690,
  lng: -43.2263
});
*/}
// Salve todos os spots no Firestore (execute só uma vez!)
spots.forEach(spot => window.db.collection("spots").add(spot));

// Ao iniciar o site, busque os dados do Firestore
window.db.collection("spots").get().then(snapshot => {
  const spots = [];
  snapshot.forEach(doc => spots.push(doc.data()));
  // Agora use spots normalmente:
  renderSpotListFromDB(spots, "todos", 4);
  updateMapFromDB(spots);
});

// Exemplo de função para renderizar usando os dados do banco
function renderSpotListFromDB(spots, type = "todos", limit = 4) {
  // ...mesmo código do seu renderSpotList, mas usando o array spots recebido do banco...
}