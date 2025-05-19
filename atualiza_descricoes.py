import json

# Dicionário de descrições personalizadas
DESCRICOES = {
    "Aldeia das Águas Park Resort": "Um dos maiores parques aquáticos do Brasil, o Aldeia das Águas Park Resort oferece diversas atrações para todas as idades, incluindo toboáguas radicais, piscinas de ondas e áreas de lazer. Ideal para famílias e grupos de amigos que buscam diversão e relaxamento em meio à natureza.",
    "Baixo Gávea": "Tradicional ponto de encontro da boemia carioca, o Baixo Gávea reúne bares, restaurantes e uma atmosfera descontraída. Muito frequentado por jovens, artistas e intelectuais, é o local perfeito para curtir a noite e aproveitar a gastronomia diversificada do Rio de Janeiro.",
    "Bar Bukowski": "Considerado o bar de rock mais antigo do Rio, o Bar Bukowski é referência na vida noturna carioca. Com decoração inspirada no escritor Charles Bukowski, oferece shows ao vivo, pista de dança e um ambiente alternativo para quem gosta de boa música e diversão.",
    "Barra da Tijuca - DownTown": "Complexo de lazer e compras a céu aberto, o DownTown é um dos principais centros comerciais da Barra da Tijuca. Conta com lojas, restaurantes, cinemas e eventos culturais, sendo um ponto de encontro para moradores e visitantes da região.",
    "BarraShopping": "Um dos maiores shoppings do Brasil, o BarraShopping oferece uma ampla variedade de lojas, restaurantes, cinemas e opções de lazer. Localizado na Barra da Tijuca, é referência em compras e entretenimento na cidade do Rio de Janeiro.",
    "Basílica Santuário de Nossa Senhora da Penha": "Importante centro de peregrinação religiosa, a Basílica Santuário de Nossa Senhora da Penha impressiona pela arquitetura e pela vista panorâmica da cidade. O local recebe milhares de fiéis durante as festas religiosas e é um símbolo de fé e devoção em Campos dos Goytacazes.",
    "Bosque da Barra": "Área de preservação ambiental na Barra da Tijuca, o Bosque da Barra é ideal para caminhadas, piqueniques e observação de fauna e flora. O parque oferece trilhas, lagos e espaços para lazer em família, sendo um refúgio verde em meio à cidade.",
    "Botafogo Praia Shopping": "Com vista privilegiada para o Pão de Açúcar, o Botafogo Praia Shopping reúne lojas, restaurantes e opções de lazer em um dos bairros mais tradicionais do Rio. O terraço panorâmico é um dos destaques do shopping, proporcionando uma experiência única aos visitantes.",
    "Casa Cavé": "Fundada em 1860, a Casa Cavé é a confeitaria mais antiga do Rio de Janeiro. Famosa por seus doces portugueses, salgados e cafés, o local preserva a tradição e o charme do centro histórico da cidade.",
    "Casa da Matriz": "Espaço alternativo de festas e shows em Niterói, a Casa da Matriz é conhecida pela programação eclética, que vai do rock ao pop. O ambiente descontraído atrai um público jovem em busca de diversão e boa música."
}

def atualizar_descricoes(arquivo_json):
    with open(arquivo_json, 'r', encoding='utf-8') as f:
        dados = json.load(f)

    alterados = 0
    for spot in dados:
        nome = spot.get('nome')
        if nome in DESCRICOES:
            spot['descricao'] = DESCRICOES[nome]
            alterados += 1
        elif not spot.get('descricao') or spot['descricao'] == 'Descrição não disponível.':
            spot['descricao'] = 'Descrição não disponível.'

    with open(arquivo_json, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)

    print(f"Descrições atualizadas para {alterados} pontos turísticos.")

if __name__ == "__main__":
    atualizar_descricoes('planilha.json')
