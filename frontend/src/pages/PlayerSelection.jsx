import { useState } from 'react'

// Lista dos jogadores disponíveis para a posição de goleiro.
const goleiros = [
  { id: 'oliver-wood', nome: 'Oliver Wood', iniciais: 'OW', casa: 'Grifinoria', forca: 93, velocidade: 77, habilidade: 84, sorte: 74 },
  { id: 'ron-weasley', nome: 'Ron Weasley', iniciais: 'RW', casa: 'Grifinoria', forca: 82, velocidade: 85, habilidade: 79, sorte: 91 },
  { id: 'cormac-mclaggen', nome: 'Cormac McLaggen', iniciais: 'CM', casa: 'Grifinoria', forca: 89, velocidade: 74, habilidade: 82, sorte: 71 },
  { id: 'miles-bletchley', nome: 'Miles Bletchley', iniciais: 'MB', casa: 'Sonserina', forca: 88, velocidade: 80, habilidade: 83, sorte: 76 },
  { id: 'godofredo-hooper', nome: 'Godofredo Hooper', iniciais: 'GH', casa: 'Grifinoria', forca: 58, velocidade: 62, habilidade: 65, sorte: 42 },
  { id: 'herbert-fleet', nome: 'Herbert Fleet', iniciais: 'HF', casa: 'Lufa-Lufa', forca: 71, velocidade: 63, habilidade: 67, sorte: 54 },
  { id: 'grant-page', nome: 'Grant Page', iniciais: 'GP', casa: 'Corvinal', forca: 66, velocidade: 70, habilidade: 72, sorte: 47 },
  { id: 'kevin-bletchley', nome: 'Kevin Bletchley', iniciais: 'KB', casa: 'Sonserina', forca: 68, velocidade: 64, habilidade: 70, sorte: 55 },
  { id: 'brennan-doyle', nome: 'Brennan Doyle', iniciais: 'BD', casa: 'Corvinal', forca: 70, velocidade: 66, habilidade: 72, sorte: 38 },
  { id: 'andre-egwu', nome: 'Andre Egwu', iniciais: 'AE', casa: 'Corvinal', forca: 60, velocidade: 78, habilidade: 82, sorte: 76 },
]

// Lista dos jogadores disponíveis para as posições de batedor.
const batedores = [
  { id: 'fred-weasley', nome: 'Fred Weasley', iniciais: 'FW', casa: 'Grifinoria', forca: 91, velocidade: 86, habilidade: 85, sorte: 88 },
  { id: 'george-weasley', nome: 'George Weasley', iniciais: 'GW', casa: 'Grifinoria', forca: 89, velocidade: 88, habilidade: 86, sorte: 87 },
  { id: 'andrew-kirke', nome: 'Andrew Kirke', iniciais: 'AK', casa: 'Grifinoria', forca: 63, velocidade: 68, habilidade: 70, sorte: 59 },
  { id: 'jack-sloper', nome: 'Jack Sloper', iniciais: 'JS', casa: 'Grifinoria', forca: 86, velocidade: 78, habilidade: 80, sorte: 75 },
  { id: 'jimmy-peakes', nome: 'Jimmy Peakes', iniciais: 'JP', casa: 'Grifinoria', forca: 82, velocidade: 85, habilidade: 84, sorte: 80 },
  { id: 'ritchie-coote', nome: 'Ritchie Coote', iniciais: 'RC', casa: 'Grifinoria', forca: 84, velocidade: 82, habilidade: 88, sorte: 77 },
  { id: 'sirius-black', nome: 'Sirius Black', iniciais: 'SB', casa: 'Grifinoria', forca: 87, velocidade: 91, habilidade: 89, sorte: 84 },
  { id: 'gwenog-jones', nome: 'Gwenog Jones', iniciais: 'GJ', casa: 'Lufa-Lufa', forca: 92, velocidade: 85, habilidade: 90, sorte: 83 },
  { id: 'maxine-o-flaherty', nome: "Maxine O'Flaherty", iniciais: 'MO', casa: 'Lufa-Lufa', forca: 55, velocidade: 63, habilidade: 72, sorte: 61 },
  { id: 'anthony-rickett', nome: 'Anthony Rickett', iniciais: 'AR', casa: 'Lufa-Lufa', forca: 69, velocidade: 67, habilidade: 58, sorte: 55 },
  { id: 'duncan-inglebee', nome: 'Duncan Inglebee', iniciais: 'DI', casa: 'Corvinal', forca: 73, velocidade: 59, habilidade: 65, sorte: 52 },
  { id: 'jason-samuels', nome: 'Jason Samuels', iniciais: 'JS', casa: 'Corvinal', forca: 58, velocidade: 66, habilidade: 69, sorte: 64 },
  { id: 'vincent-crabbe', nome: 'Vincent Crabbe', iniciais: 'VC', casa: 'Sonserina', forca: 72, velocidade: 67, habilidade: 52, sorte: 47 },
  { id: 'gregory-goyle', nome: 'Gregory Goyle', iniciais: 'GG', casa: 'Sonserina', forca: 66, velocidade: 64, habilidade: 49, sorte: 53 },
  { id: 'lucian-bole', nome: 'Lucian Bole', iniciais: 'LB', casa: 'Sonserina', forca: 74, velocidade: 63, habilidade: 55, sorte: 49 },
  { id: 'peregrine-derrick', nome: 'Peregrine Derrick', iniciais: 'PD', casa: 'Sonserina', forca: 68, velocidade: 70, habilidade: 61, sorte: 53 },
]

// Lista dos jogadores disponíveis para as posições de artilheiro.
const artilheiros = [
  { id: 'james-potter', nome: 'James Potter', iniciais: 'JP', casa: 'Grifinoria', forca: 90, velocidade: 93, habilidade: 91, sorte: 87 },
  { id: 'angelina-johnson', nome: 'Angelina Johnson', iniciais: 'AJ', casa: 'Grifinoria', forca: 84, velocidade: 91, habilidade: 93, sorte: 82 },
  { id: 'alicia-spinnet', nome: 'Alicia Spinnet', iniciais: 'AS', casa: 'Grifinoria', forca: 80, velocidade: 89, habilidade: 91, sorte: 84 },
  { id: 'katie-bell', nome: 'Katie Bell', iniciais: 'KB', casa: 'Grifinoria', forca: 83, velocidade: 90, habilidade: 89, sorte: 86 },
  { id: 'ginny-weasley', nome: 'Ginny Weasley', iniciais: 'GW', casa: 'Grifinoria', forca: 89, velocidade: 94, habilidade: 92, sorte: 88 },
  { id: 'demelza-robins', nome: 'Demelza Robins', iniciais: 'DR', casa: 'Grifinoria', forca: 80, velocidade: 87, habilidade: 85, sorte: 82 },
  { id: 'dean-thomas', nome: 'Dean Thomas', iniciais: 'DT', casa: 'Grifinoria', forca: 57, velocidade: 66, habilidade: 62, sorte: 61 },
  { id: 'rose-weasley', nome: 'Rose Weasley', iniciais: 'RW', casa: 'Grifinoria', forca: 60, velocidade: 71, habilidade: 64, sorte: 69 },
  { id: 'marcus-flint', nome: 'Marcus Flint', iniciais: 'MF', casa: 'Sonserina', forca: 93, velocidade: 77, habilidade: 84, sorte: 74 },
  { id: 'adrian-pucey', nome: 'Adrian Pucey', iniciais: 'AP', casa: 'Sonserina', forca: 86, velocidade: 88, habilidade: 87, sorte: 79 },
  { id: 'cassius-warrington', nome: 'Cassius Warrington', iniciais: 'CW', casa: 'Sonserina', forca: 90, velocidade: 82, habilidade: 86, sorte: 78 },
  { id: 'graham-montague', nome: 'Graham Montague', iniciais: 'GM', casa: 'Sonserina', forca: 74, velocidade: 63, habilidade: 68, sorte: 52 },
  { id: 'urquhart', nome: 'Urquhart', iniciais: 'UR', casa: 'Sonserina', forca: 71, velocidade: 67, habilidade: 69, sorte: 63 },
  { id: 'vaisey', nome: 'Vaisey', iniciais: 'VA', casa: 'Sonserina', forca: 65, velocidade: 74, habilidade: 63, sorte: 54 },
  { id: 'blaise-zabini', nome: 'Blaise Zabini', iniciais: 'BZ', casa: 'Sonserina', forca: 62, velocidade: 64, habilidade: 67, sorte: 68 },
  { id: 'roger-davies', nome: 'Roger Davies', iniciais: 'RD', casa: 'Corvinal', forca: 72, velocidade: 70, habilidade: 77, sorte: 75 },
  { id: 'bradley', nome: 'Bradley', iniciais: 'BR', casa: 'Corvinal', forca: 61, velocidade: 62, habilidade: 65, sorte: 67 },
  { id: 'chambers', nome: 'Chambers', iniciais: 'CH', casa: 'Corvinal', forca: 67, velocidade: 66, habilidade: 60, sorte: 59 },
  { id: 'randolph-burrow', nome: 'Randolph Burrow', iniciais: 'RB', casa: 'Corvinal', forca: 64, velocidade: 61, habilidade: 70, sorte: 66 },
  { id: 'jeremy-stretton', nome: 'Jeremy Stretton', iniciais: 'JS', casa: 'Corvinal', forca: 66, velocidade: 68, habilidade: 62, sorte: 58 },
  { id: 'zacharias-smith', nome: 'Zacharias Smith', iniciais: 'ZS', casa: 'Lufa-Lufa', forca: 63, velocidade: 64, habilidade: 68, sorte: 52 },
  { id: 'cadwallader', nome: 'Cadwallader', iniciais: 'CA', casa: 'Lufa-Lufa', forca: 68, velocidade: 67, habilidade: 66, sorte: 63 },
  { id: 'tamsin-applebee', nome: 'Tamsin Applebee', iniciais: 'TA', casa: 'Lufa-Lufa', forca: 63, velocidade: 69, habilidade: 61, sorte: 72 },
  { id: 'heidi-macavoy', nome: 'Heidi Macavoy', iniciais: 'HM', casa: 'Lufa-Lufa', forca: 65, velocidade: 62, habilidade: 72, sorte: 60 },
  { id: 'malcolm-preece', nome: 'Malcolm Preece', iniciais: 'MP', casa: 'Lufa-Lufa', forca: 69, velocidade: 65, habilidade: 63, sorte: 64 },
]

// Lista dos jogadores disponíveis para a posição de apanhador.
const apanhadores = [
  { id: 'harry-potter', nome: 'Harry Potter', iniciais: 'HP', casa: 'Grifinoria', forca: 86, velocidade: 98, habilidade: 94, sorte: 97 },
  { id: 'minerva-mcgonagall', nome: 'Minerva McGonagall', iniciais: 'MM', casa: 'Grifinoria', forca: 86, velocidade: 88, habilidade: 94, sorte: 82 },
  { id: 'charlie-weasley', nome: 'Charlie Weasley', iniciais: 'CW', casa: 'Grifinoria', forca: 88, velocidade: 84, habilidade: 88, sorte: 86 },
  { id: 'cedrico-diggory', nome: 'Cedrico Diggory', iniciais: 'CD', casa: 'Lufa-Lufa', forca: 88, velocidade: 89, habilidade: 93, sorte: 88 },
  { id: 'cho-chang', nome: 'Cho Chang', iniciais: 'CC', casa: 'Corvinal', forca: 80, velocidade: 94, habilidade: 92, sorte: 86 },
  { id: 'viktor-krum', nome: 'Viktor Krum', iniciais: 'VK', casa: 'Durmstrang', forca: 94, velocidade: 96, habilidade: 95, sorte: 85 },
  { id: 'draco-malfoy', nome: 'Draco Malfoy', iniciais: 'DM', casa: 'Sonserina', forca: 82, velocidade: 90, habilidade: 88, sorte: 80 },
  { id: 'ginny-weasley-apanhadora', nome: 'Ginny Weasley', iniciais: 'GW', casa: 'Grifinoria', forca: 89, velocidade: 94, habilidade: 92, sorte: 88 },
  { id: 'regulus-black', nome: 'Regulus Black', iniciais: 'RB', casa: 'Sonserina', forca: 84, velocidade: 91, habilidade: 89, sorte: 86 },
  { id: 'terence-higgs', nome: 'Terence Higgs', iniciais: 'TH', casa: 'Sonserina', forca: 60, velocidade: 66, habilidade: 62, sorte: 55 },
  { id: 'summerby', nome: 'Summerby', iniciais: 'SU', casa: 'Lufa-Lufa', forca: 64, velocidade: 67, habilidade: 69, sorte: 58 },
  { id: 'harper', nome: 'Harper', iniciais: 'HA', casa: 'Sonserina', forca: 66, velocidade: 70, habilidade: 60, sorte: 55 },
]

// Cada posição usa nomes de atributos diferentes, associados aos valores gerais do jogador.
const atributosPorPosicao = {
  Goleiro: [
    { nome: 'Reflexos', campo: 'habilidade' },
    { nome: 'Posicionamento', campo: 'forca' },
    { nome: 'Alcance', campo: 'velocidade' },
    { nome: 'Liderança', campo: 'sorte' },
  ],
  Batedor: [
    { nome: 'Força de Rebatida', campo: 'forca' },
    { nome: 'Mira', campo: 'habilidade' },
    { nome: 'Proteção', campo: 'sorte' },
    { nome: 'Resistência', campo: 'velocidade' },
  ],
  Artilheiro: [
    { nome: 'Precisão de Arremesso', campo: 'habilidade' },
    { nome: 'Controle de Goles', campo: 'forca' },
    { nome: 'Passe e Trabalho em Equipe', campo: 'sorte' },
    { nome: 'Velocidade', campo: 'velocidade' },
  ],
  Apanhador: [
    { nome: 'Visão', campo: 'habilidade' },
    { nome: 'Agilidade', campo: 'forca' },
    { nome: 'Velocidade', campo: 'velocidade' },
    { nome: 'Sangue-frio', campo: 'sorte' },
  ],
}

// Define a ordem das sete escolhas e quais atributos aparecem em cada etapa.
const etapas = [
  {
    titulo: 'Quem será seu goleiro?',
    nome: 'Goleiro',
    sigla: 'GOL',
    atributos: atributosPorPosicao.Goleiro,
  },
  {
    titulo: 'Quem será seu batedor?',
    nome: 'Batedor',
    sigla: 'BAT',
    atributos: atributosPorPosicao.Batedor,
  },
  {
    titulo: 'Quem será seu batedor?',
    nome: 'Batedor',
    sigla: 'BAT',
    atributos: atributosPorPosicao.Batedor,
  },
  {
    titulo: 'Quem será seu artilheiro?',
    nome: 'Artilheiro',
    sigla: 'ART',
    atributos: atributosPorPosicao.Artilheiro,
  },
  {
    titulo: 'Quem será seu artilheiro?',
    nome: 'Artilheiro',
    sigla: 'ART',
    atributos: atributosPorPosicao.Artilheiro,
  },
  {
    titulo: 'Quem será seu artilheiro?',
    nome: 'Artilheiro',
    sigla: 'ART',
    atributos: atributosPorPosicao.Artilheiro,
  },
  {
    titulo: 'Quem será seu apanhador?',
    nome: 'Apanhador',
    sigla: 'APA',
    atributos: atributosPorPosicao.Apanhador,
  },
]

// Define as cores do cartão e da faixa superior de acordo com a casa do jogador.
const coresPorCasa = {
  Grifinoria: {
    cartao: 'border-red-900/70 bg-[#241515]',
    faixa: 'bg-gradient-to-br from-red-900 to-[#251515]',
  },
  Sonserina: {
    cartao: 'border-emerald-900/70 bg-[#101d18]',
    faixa: 'bg-gradient-to-br from-emerald-950 to-[#101d18]',
  },
  Corvinal: {
    cartao: 'border-blue-900/70 bg-[#151b27]',
    faixa: 'bg-gradient-to-br from-blue-950 to-[#151b27]',
  },
  'Lufa-Lufa': {
    cartao: 'border-yellow-900/70 bg-[#241d12]',
    faixa: 'bg-gradient-to-br from-yellow-900 to-[#241d12]',
  },
  Durmstrang: {
    cartao: 'border-slate-600/70 bg-[#1b1b20]',
    faixa: 'bg-gradient-to-br from-slate-600 to-[#1b1b20]',
  },
}

// Seleciona cinco jogadores disponíveis para a posição atual da seleção.
function sortearOpcoes(etapaAtual, jogadoresEscolhidos) {
  let listaJogadores = goleiros

  // Nas etapas 1 e 2, a posição atual é batedor.
  if (etapaAtual >= 1 && etapaAtual <= 2) {
    listaJogadores = batedores
  }

  // Nas etapas 3, 4 e 5, a posição atual é artilheiro.
  if (etapaAtual >= 3 && etapaAtual <= 5) {
    listaJogadores = artilheiros
  }

  // Na etapa 6, a posição atual é apanhador.
  if (etapaAtual === 6) {
    listaJogadores = apanhadores
  }

  // Exclui da lista os jogadores que já foram escolhidos em etapas anteriores.
  const jogadoresDisponiveis = []

  for (let i = 0; i < listaJogadores.length; i++) {
    let jogadorJaEscolhido = false

    for (let j = 0; j < jogadoresEscolhidos.length; j++) {
      if (listaJogadores[i].id === jogadoresEscolhidos[j].id) {
        jogadorJaEscolhido = true
      }
    }

    if (jogadorJaEscolhido === false) {
      jogadoresDisponiveis[jogadoresDisponiveis.length] = listaJogadores[i]
    }
  }

  // Mistura aleatoriamente os jogadores disponíveis.
  for (let i = jogadoresDisponiveis.length - 1; i > 0; i--) {
    const indiceAleatorio = Math.floor(Math.random() * (i + 1))
    const jogadorTemporario = jogadoresDisponiveis[i]
    jogadoresDisponiveis[i] = jogadoresDisponiveis[indiceAleatorio]
    jogadoresDisponiveis[indiceAleatorio] = jogadorTemporario
  }

  // Mantém somente cinco jogadores na lista exibida na tela.
  const opcoes = []

  for (let i = 0; i < 5; i++) {
    opcoes[i] = jogadoresDisponiveis[i]
  }

  return opcoes
}

// Calcula a força média de um jogador usando seus quatro atributos gerais.
function calcularForca(jogador) {
  return (
    (jogador.forca +
      jogador.velocidade +
      jogador.habilidade +
      jogador.sorte) /
    4
  )
}

// Componente responsável pela seleção das sete posições do time.
function PlayerSelection({ tatica, dificuldade, onComplete, onBack }) {
  // Guarda a etapa atual, as cinco opções sorteadas e os jogadores já escolhidos.
  const [etapaAtual, setEtapaAtual] = useState(0)
  const [opcoes, setOpcoes] = useState(() => sortearOpcoes(0, []))
  const [jogadoresEscolhidos, setJogadoresEscolhidos] = useState([])

  // Soma as médias individuais para calcular a média atual do time.
  let somaForcaJogadores = 0

  for (let i = 0; i < jogadoresEscolhidos.length; i++) {
    somaForcaJogadores =
      somaForcaJogadores + calcularForca(jogadoresEscolhidos[i])
  }

  let forcaGeral = 0

  if (jogadoresEscolhidos.length > 0) {
    forcaGeral = Math.round(somaForcaJogadores / jogadoresEscolhidos.length)
  }

  // Adiciona o jogador escolhido e avança para a próxima posição.
  function handleEscolherJogador(jogador) {
    const novosJogadores = []

    for (let i = 0; i < jogadoresEscolhidos.length; i++) {
      novosJogadores[i] = jogadoresEscolhidos[i]
    }

    novosJogadores[jogadoresEscolhidos.length] = jogador
    setJogadoresEscolhidos(novosJogadores)

    // Enquanto houver uma posição antes da última, avança e sorteia novas opções.
    if (etapaAtual < 6) {
      const proximaEtapa = etapaAtual + 1
      setEtapaAtual(proximaEtapa)
      setOpcoes(sortearOpcoes(proximaEtapa, novosJogadores))
    } else {
      // Na última posição, calcula a média final e entrega o time ao componente pai.
      let somaMediaJogadores = 0

      for (let i = 0; i < novosJogadores.length; i++) {
        somaMediaJogadores =
          somaMediaJogadores + calcularForca(novosJogadores[i])
      }

      const mediaTime = Math.round(
        somaMediaJogadores / novosJogadores.length,
      )

      onComplete(novosJogadores, mediaTime)
    }
  }

  const etapa = etapas[etapaAtual]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1511] px-5 py-8 text-stone-100 sm:px-8 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(161,125,57,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(21,83,56,0.2),transparent_45%)]"
      />

      <div className="relative mx-auto max-w-[1500px]">
        <header className="flex flex-col justify-between gap-6 border-b border-amber-700/40 pb-6 lg:flex-row lg:items-center">
          <div>
            <p className="font-serif text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              Montagem do time
            </p>
            <h1 className="mt-2 font-serif text-3xl font-medium uppercase leading-tight text-stone-100 sm:text-4xl lg:text-6xl">
              {etapa.titulo}
            </h1>
            <p className="mt-3 text-sm text-stone-400">
              Analise os atributos com cuidado. A escolha é definitiva.
            </p>
          </div>

          <div className="flex items-center justify-between gap-5 lg:justify-end">
            <div className="flex flex-col gap-1 text-xs uppercase tracking-widest text-stone-400">
              <span>{tatica}</span>
              <span>{dificuldade}</span>
            </div>
            <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border border-amber-500/60 text-center">
              <span className="text-[9px] uppercase tracking-widest text-stone-400">
                Média
              </span>
              <span className="font-serif text-2xl text-amber-200">
                {forcaGeral > 0 ? forcaGeral : '—'}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-stone-400">
                do time
              </span>
            </div>
          </div>
        </header>

        {/* Barra de progresso com as sete posições do time. */}
        <div className="relative my-8">
          <div className="absolute left-5 right-5 top-4 h-px bg-emerald-900 sm:left-8 sm:right-8" />
          <div className="relative grid grid-cols-7">
            {etapas.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
                    index === etapaAtual
                      ? 'border-amber-300 bg-[#13241d] text-amber-200 ring-2 ring-amber-300/30'
                      : index < etapaAtual
                        ? 'border-amber-700 bg-amber-900/40 text-amber-100'
                        : 'border-emerald-900 bg-[#0b1511] text-stone-500'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-[8px] uppercase tracking-widest text-stone-500 sm:text-[10px]">
                  {item.sigla}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista das cinco opções sorteadas para a posição atual. */}
        <section aria-label="Opções de jogadores">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-stone-400">
                Escolha 1 entre 5 jogadores
              </p>
              <p className="text-xs uppercase tracking-widest text-amber-200/70">
                Escolha {etapaAtual + 1} de 7
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {opcoes.map((opcao, index) => (
                // Card do jogador; as classes mudam conforme a casa.
                <article
                  key={opcao.id}
                  className={`flex min-h-[440px] flex-col border shadow-xl shadow-black/20 ${coresPorCasa[opcao.casa].cartao}`}
                >
                  <div
                    className={`relative flex h-40 shrink-0 items-center justify-center overflow-hidden ${coresPorCasa[opcao.casa].faixa}`}
                  >
                    <span className="absolute left-4 top-3 font-serif text-sm text-stone-200/60">
                      0{index + 1}
                    </span>
                    <div className="absolute h-28 w-28 rotate-45 border border-amber-100/10" />
                    <span className="relative font-serif text-5xl text-amber-50/90">
                      {opcao.iniciais}
                    </span>
                    <span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-widest text-stone-200/60">
                      {opcao.casa}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="mt-2 min-h-12 font-serif text-xl text-stone-100">
                      {opcao.nome}
                    </h2>

                    <div className="mt-4 space-y-2">
                      {/* Atributos específicos da posição atual. */}
                      {etapa.atributos.map((atributo) => (
                        <div
                          key={atributo.nome}
                          className="flex justify-between gap-2 border-b border-emerald-900/60 pb-1 text-[10px]"
                        >
                          <span className="text-stone-500">
                            {atributo.nome}
                          </span>
                          <span className="font-semibold text-stone-300">
                            {opcao[atributo.campo]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-3 text-right text-[10px] text-stone-500">
                      Média dos atributos:{' '}
                      <span className="font-semibold text-amber-200">
                        {Math.round(calcularForca(opcao))}
                      </span>
                    </p>

                    {/* Ao clicar, o jogador é adicionado ao time e a seleção avança. */}
                    <button
                      type="button"
                      className="mt-4 flex w-full cursor-pointer items-center justify-between border border-amber-700/50 px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-widest text-amber-200 transition hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      onClick={() => handleEscolherJogador(opcao)}
                    >
                      Escolher <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

        {/* Botão para voltar à Home sem concluir a seleção. */}
        <footer className="mt-8 border-t border-emerald-900/70 pt-5">
          <button
            type="button"
            className="cursor-pointer text-xs uppercase tracking-widest text-stone-400 transition hover:text-amber-200"
            onClick={onBack}
          >
            Voltar para a escolha de tática
          </button>
        </footer>
      </div>
    </main>
  )
}

export default PlayerSelection
