import { useEffect, useState } from 'react'

const NOME_TIME_JOGADOR = 'Seu time'
const GOALS_PER_GOAL = 10
const PONTOS_POMO = 150
const MEDIA_GOLS_BASE = 12
const FATOR_DIFERENCA_ATAQUE = 0.35
const FATOR_CHANCE_APANHADOR = 0.12
const CHANCE_POMO_MINIMA = 0.05
const CHANCE_POMO_MAXIMA = 0.95
const PENALIDADE_POMO_AUROR = 0.05
const LAMBDA_MINIMA = 2
const BONUS_GOLS_MANDANTE = 1
const BONUS_POMO_MANDANTE = 0.02
const PESO_DEFESA_GOLEIRO = 0.6
const PESO_DEFESA_BATEDORES = 0.4
const DURACAO_MINIMA_PARTIDA = 5
const VARIACAO_DURACAO_PARTIDA = 16
const INTERVALO_PARTIDA_MS = 1000
const MODIFICADORES_TATICA = {
  Defensiva: {
    golsProprios: -1.5,
    golsAdversario: -4.5,
    chancePomo: 0.09,
  },
  Equilibrada: {
    golsProprios: 0,
    golsAdversario: 0,
    chancePomo: 0,
  },
  Ofensiva: {
    golsProprios: 3,
    golsAdversario: 3.5,
    chancePomo: -0.07,
  },
}

// A curva mantém a ordem de força original das quatro casas.
const FORCAS_RIVAIS = {
  Trouxa: {
    'Grifinória': 82,
    Sonserina: 75,
    Corvinal: 68,
    'Lufa-Lufa': 62,
  },
  Bruxo: {
    'Grifinória': 91,
    Sonserina: 83,
    Corvinal: 75,
    'Lufa-Lufa': 68,
  },
  Auror: {
    'Grifinória': 96,
    Sonserina: 89,
    Corvinal: 82,
    'Lufa-Lufa': 75,
  },
}

const adversarios = [
  { nome: 'Grifinória', forca: 82, ataque: 86, defesa: 82, seeker: 95 },
  { nome: 'Sonserina', forca: 80, ataque: 82, defesa: 84, seeker: 84 },
  { nome: 'Corvinal', forca: 78, ataque: 80, defesa: 79, seeker: 88 },
  { nome: 'Lufa-Lufa', forca: 76, ataque: 78, defesa: 80, seeker: 90 },
]

const artilheirosCasas = {
  'Grifinória': ['James Potter', 'Angelina Johnson', 'Alicia Spinnet'],
  'Sonserina': ['Marcus Flint', 'Adrian Pucey', 'Cassius Warrington'],
  'Corvinal': ['Roger Davies', 'Randolph Burrow', 'Jeremy Stretton'],
  'Lufa-Lufa': ['Zacharias Smith', 'Cadwallader', 'Tamsin Applebee'],
}

const apanhadoresCasas = {
  'Grifinória': 'Harry Potter',
  'Sonserina': 'Draco Malfoy',
  'Corvinal': 'Cho Chang',
  'Lufa-Lufa': 'Cedrico Diggory',
}

function gerarCalendario(equipes) {
  const times = equipes.slice()
  times[times.length] = null

  const ida = []

  for (let rodada = 0; rodada < 5; rodada++) {
    const jogos = []

    for (let i = 0; i < times.length / 2; i++) {
      const timeA = times[i]
      const timeB = times[times.length - 1 - i]

      if (timeA !== null && timeB !== null) {
        let timeCasa = timeA
        let timeVisitante = timeB

        if ((rodada + i) % 2 !== 0) {
          timeCasa = timeB
          timeVisitante = timeA
        }

        jogos[jogos.length] = {
          timeCasa: timeCasa,
          timeVisitante: timeVisitante,
        }
      }
    }

    ida[ida.length] = jogos

    const ultimoTime = times[times.length - 1]

    for (let i = times.length - 1; i > 1; i--) {
      times[i] = times[i - 1]
    }

    times[1] = ultimoTime
  }

  const calendario = []
  let numeroRodada = 0

  for (let rodada = 0; rodada < ida.length; rodada++) {
    const jogos = []

    for (let i = 0; i < ida[rodada].length; i++) {
      jogos[i] = {
        numero: numeroRodada * 2 + i + 1,
        timeCasa: ida[rodada][i].timeCasa,
        timeVisitante: ida[rodada][i].timeVisitante,
      }
    }

    calendario[calendario.length] = { jogos: jogos }
    numeroRodada = numeroRodada + 1
  }

  for (let rodada = ida.length - 1; rodada >= 0; rodada--) {
    const jogos = []

    for (let i = 0; i < ida[rodada].length; i++) {
      jogos[i] = {
        numero: numeroRodada * 2 + i + 1,
        timeCasa: ida[rodada][i].timeVisitante,
        timeVisitante: ida[rodada][i].timeCasa,
      }
    }

    calendario[calendario.length] = { jogos: jogos }
    numeroRodada = numeroRodada + 1
  }

  return calendario
}

function TournamentSimulation({
  mediaTime,
  tatica,
  dificuldade,
  jogadores,
  onBack,
  onHome,
}) {
  const equipes = []
  equipes[0] = { nome: NOME_TIME_JOGADOR, forca: mediaTime }
  equipes[1] = adversarios[0]
  equipes[2] = adversarios[1]
  equipes[3] = adversarios[2]
  equipes[4] = adversarios[3]

  const [partidaAtual, setPartidaAtual] = useState(0)
  const [duracaoPartida, setDuracaoPartida] = useState(0)
  const [golsCasa, setGolsCasa] = useState(0)
  const [golsVisitante, setGolsVisitante] = useState(0)
  const [pontosCasaPartida, setPontosCasaPartida] = useState(0)
  const [pontosVisitantePartida, setPontosVisitantePartida] = useState(0)
  const [golsMaquinaCasa, setGolsMaquinaCasa] = useState(0)
  const [golsMaquinaVisitante, setGolsMaquinaVisitante] = useState(0)
  const [maquinaTerminada, setMaquinaTerminada] = useState(false)
  const [pomoMaquina, setPomoMaquina] = useState('')
  const [pontosMaquinaCasa, setPontosMaquinaCasa] = useState(0)
  const [pontosMaquinaVisitante, setPontosMaquinaVisitante] = useState(0)
  const [eventos, setEventos] = useState([])
  const [partidaTerminada, setPartidaTerminada] = useState(false)
  const [cronometro, setCronometro] = useState(null)
  const [pontosTimes, setPontosTimes] = useState(() => {
    const pontosIniciais = []

    for (let i = 0; i < equipes.length; i++) {
      pontosIniciais[i] = {
        nome: equipes[i].nome,
        pontos: 0,
      }
    }

    return pontosIniciais
  })
  let campeao = ''

  const confrontos = gerarCalendario(equipes)

  useEffect(() => {
    if (cronometro === null) {
      return
    }

    return () => clearInterval(cronometro)
  }, [cronometro])

  if (
    partidaTerminada &&
    partidaAtual === confrontos.length - 1
  ) {
    let maiorPontuacao = -1

    for (let i = 0; i < pontosTimes.length; i++) {
      if (pontosTimes[i].pontos > maiorPontuacao) {
        maiorPontuacao = pontosTimes[i].pontos
        campeao = pontosTimes[i].nome
      }
    }
  }

  function obterTimeNaCurva(time) {
    if (time.nome === NOME_TIME_JOGADOR) {
      return time
    }

    const forcaRival = FORCAS_RIVAIS[dificuldade][time.nome]
    const ajusteForca = forcaRival - time.forca

    return {
      nome: time.nome,
      forca: forcaRival,
      ataque: time.ataque + ajusteForca,
      defesa: time.defesa + ajusteForca,
      seeker: time.seeker + ajusteForca,
    }
  }

  function obterArtilheiros(time) {
    if (time.nome === NOME_TIME_JOGADOR) {
      const artilheirosDoTime = []

      if (jogadores) {
        for (let i = 3; i <= 5; i++) {
          if (jogadores[i]) {
            artilheirosDoTime[artilheirosDoTime.length] =
              jogadores[i].nome
          }
        }
      }

      if (artilheirosDoTime.length > 0) {
        return artilheirosDoTime
      }
    }

    return artilheirosCasas[time.nome]
  }

  function obterApanhador(time) {
    if (
      time.nome === NOME_TIME_JOGADOR &&
      jogadores &&
      jogadores[6]
    ) {
      return jogadores[6].nome
    }

    return apanhadoresCasas[time.nome]
  }

  function calcularMediaJogador(jogador) {
    return (
      jogador.forca +
      jogador.velocidade +
      jogador.habilidade +
      jogador.sorte
    ) / 4
  }

  function obterAtaque(time) {
    if (time.nome === NOME_TIME_JOGADOR && jogadores) {
      let somaAtaque = 0
      let quantidade = 0

      for (let i = 3; i <= 5; i++) {
        if (jogadores[i]) {
          somaAtaque =
            somaAtaque + calcularMediaJogador(jogadores[i])
          quantidade = quantidade + 1
        }
      }

      if (quantidade > 0) {
        return somaAtaque / quantidade
      }
    }

    return time.ataque
  }

  function obterDefesa(time) {
    if (time.nome === NOME_TIME_JOGADOR && jogadores) {
      let defesaGoleiro = 0
      let somaBatedores = 0
      let quantidadeBatedores = 0

      if (jogadores[0]) {
        defesaGoleiro =
          calcularMediaJogador(jogadores[0])
      }

      for (let i = 1; i <= 2; i++) {
        if (jogadores[i]) {
          somaBatedores =
            somaBatedores + calcularMediaJogador(jogadores[i])
          quantidadeBatedores = quantidadeBatedores + 1
        }
      }

      let defesaBatedores = somaBatedores

      if (quantidadeBatedores > 0) {
        defesaBatedores =
          somaBatedores / quantidadeBatedores
      }

      return defesaGoleiro * PESO_DEFESA_GOLEIRO +
        defesaBatedores * PESO_DEFESA_BATEDORES
    }

    return time.defesa
  }

  function obterForcaBusca(time) {
    if (
      time.nome === NOME_TIME_JOGADOR &&
      jogadores &&
      jogadores[6]
    ) {
      return calcularMediaJogador(jogadores[6])
    }

    return time.seeker
  }

  function calcularCapturaPomo(timeCasa, timeVisitante) {
    const buscaCasa = obterForcaBusca(timeCasa)
    const buscaVisitante =
      obterForcaBusca(timeVisitante)
    const diferenca =
      buscaCasa - buscaVisitante
    let probabilidadeCasa =
      1 / (1 + Math.exp(-diferenca * FATOR_CHANCE_APANHADOR))

    if (timeCasa.nome === NOME_TIME_JOGADOR) {
      probabilidadeCasa =
        probabilidadeCasa +
        MODIFICADORES_TATICA[tatica].chancePomo
      probabilidadeCasa =
        probabilidadeCasa + BONUS_POMO_MANDANTE

      if (dificuldade === 'Auror') {
        probabilidadeCasa = probabilidadeCasa - PENALIDADE_POMO_AUROR
      }
    }

    if (timeVisitante.nome === NOME_TIME_JOGADOR) {
      probabilidadeCasa =
        probabilidadeCasa -
        MODIFICADORES_TATICA[tatica].chancePomo
      probabilidadeCasa =
        probabilidadeCasa - BONUS_POMO_MANDANTE

      if (dificuldade === 'Auror') {
        probabilidadeCasa = probabilidadeCasa + PENALIDADE_POMO_AUROR
      }
    }

    if (probabilidadeCasa < CHANCE_POMO_MINIMA) {
      probabilidadeCasa = CHANCE_POMO_MINIMA
    }

    if (probabilidadeCasa > CHANCE_POMO_MAXIMA) {
      probabilidadeCasa = CHANCE_POMO_MAXIMA
    }

    const sorteSorteio = Math.random()

    if (sorteSorteio < probabilidadeCasa) {
      return timeCasa.nome
    }

    return timeVisitante.nome
  }

  function calcularLambda(timeAtaque, timeDefesa, timeCasa) {
    let lambda =
      MEDIA_GOLS_BASE +
      (obterAtaque(timeAtaque) -
        obterDefesa(timeDefesa)) *
        FATOR_DIFERENCA_ATAQUE

    if (timeAtaque.nome === NOME_TIME_JOGADOR) {
      lambda =
        lambda + MODIFICADORES_TATICA[tatica].golsProprios

      if (timeCasa.nome === NOME_TIME_JOGADOR) {
        lambda = lambda + BONUS_GOLS_MANDANTE
      }
    }

    if (timeDefesa.nome === NOME_TIME_JOGADOR) {
      lambda =
        lambda + MODIFICADORES_TATICA[tatica].golsAdversario
    }

    if (lambda < LAMBDA_MINIMA) {
      lambda = LAMBDA_MINIMA
    }

    return lambda
  }

  function sortearPoisson(lambda) {
    const limite = Math.exp(-lambda)
    let valor = 1
    let quantidade = 0

    do {
      quantidade = quantidade + 1
      valor =
        valor * Math.random()
    } while (valor > limite)

    return quantidade - 1
  }

  function formatarMarcadores(marcadores) {
    const nomesUnicos = []
    const quantidades = []

    for (let i = 0; i < marcadores.length; i++) {
      let indiceJogador = -1

      for (let j = 0; j < nomesUnicos.length; j++) {
        if (nomesUnicos[j] === marcadores[i]) {
          indiceJogador = j
        }
      }

      if (indiceJogador === -1) {
        nomesUnicos[nomesUnicos.length] = marcadores[i]
        quantidades[quantidades.length] = 1
      } else {
        quantidades[indiceJogador] =
          quantidades[indiceJogador] + 1
      }
    }

    const texto = []

    for (let i = 0; i < nomesUnicos.length; i++) {
      let nomeComQuantidade = nomesUnicos[i]

      if (quantidades[i] > 1) {
        nomeComQuantidade =
          nomeComQuantidade + ' (' + quantidades[i] + ')'
      }

      texto[texto.length] = nomeComQuantidade
    }

    return texto.join(', ')
  }

  function iniciarPartida() {
    const novaDuracao =
      Math.floor(Math.random() * VARIACAO_DURACAO_PARTIDA) +
      DURACAO_MINIMA_PARTIDA
    let segundos = 0
    let golsDoTimeCasa = 0
    let golsDoTimeVisitante = 0
    const novosEventos = []
    const marcadoresCasa = []
    const marcadoresVisitante = []
    let indiceEventoCasa = -1
    let indiceEventoVisitante = -1

    const rodada = confrontos[partidaAtual]
    const confronto = rodada.jogos[0]
    const artilheirosCasa = obterArtilheiros(confronto.timeCasa)
    const artilheirosVisitante = obterArtilheiros(confronto.timeVisitante)
    const confrontoMaquina = rodada.jogos[1]
    const timeCasaCalculado =
      obterTimeNaCurva(confronto.timeCasa)
    const timeVisitanteCalculado =
      obterTimeNaCurva(confronto.timeVisitante)
    const timeMaquinaCasaCalculado =
      obterTimeNaCurva(confrontoMaquina.timeCasa)
    const timeMaquinaVisitanteCalculado =
      obterTimeNaCurva(confrontoMaquina.timeVisitante)

    const lambdaCasa =
      calcularLambda(
        timeCasaCalculado,
        timeVisitanteCalculado,
        timeCasaCalculado,
      )
    const lambdaVisitante =
      calcularLambda(
        timeVisitanteCalculado,
        timeCasaCalculado,
        timeCasaCalculado,
      )
    const lambdaMaquinaCasa =
      calcularLambda(
        timeMaquinaCasaCalculado,
        timeMaquinaVisitanteCalculado,
        timeMaquinaCasaCalculado,
      )
    const lambdaMaquinaVisitante =
      calcularLambda(
        timeMaquinaVisitanteCalculado,
        timeMaquinaCasaCalculado,
        timeMaquinaCasaCalculado,
      )

    golsDoTimeCasa =
      sortearPoisson(lambdaCasa)
    golsDoTimeVisitante =
      sortearPoisson(lambdaVisitante)
    let golsMaquinaCasa =
      sortearPoisson(lambdaMaquinaCasa)
    let golsMaquinaVisitante =
      sortearPoisson(lambdaMaquinaVisitante)

    const segundosCasa = []
    const segundosVisitante = []
    const segundosMaquinaCasa = []
    const segundosMaquinaVisitante = []

    for (let i = 0; i < golsDoTimeCasa; i++) {
      segundosCasa[segundosCasa.length] =
        Math.floor(Math.random() * novaDuracao) + 1
    }

    for (let i = 0; i < golsDoTimeVisitante; i++) {
      segundosVisitante[segundosVisitante.length] =
        Math.floor(Math.random() * novaDuracao) + 1
    }

    for (let i = 0; i < golsMaquinaCasa; i++) {
      segundosMaquinaCasa[segundosMaquinaCasa.length] =
        Math.floor(Math.random() * novaDuracao) + 1
    }

    for (let i = 0; i < golsMaquinaVisitante; i++) {
      segundosMaquinaVisitante[
        segundosMaquinaVisitante.length
      ] = Math.floor(Math.random() * novaDuracao) + 1
    }

    setDuracaoPartida(novaDuracao)
    setGolsCasa(0)
    setGolsVisitante(0)
    setPontosCasaPartida(0)
    setPontosVisitantePartida(0)
    setGolsMaquinaCasa(0)
    setGolsMaquinaVisitante(0)
    setPontosMaquinaCasa(0)
    setPontosMaquinaVisitante(0)
    setMaquinaTerminada(false)
    setPomoMaquina('')
    setEventos([])
    setPartidaTerminada(false)
    let golsCasaExibidos = 0
    let golsVisitanteExibidos = 0
    let golsMaquinaCasaExibidos = 0
    let golsMaquinaVisitanteExibidos = 0

    const idCronometro = setInterval(() => {
      segundos = segundos + 1

      for (let i = 0; i < segundosCasa.length; i++) {
        if (segundosCasa[i] === segundos) {
          golsCasaExibidos = golsCasaExibidos + 1
          setGolsCasa(golsCasaExibidos)

          const indiceArtilheiro =
            Math.floor(Math.random() * artilheirosCasa.length)
          marcadoresCasa[marcadoresCasa.length] =
            artilheirosCasa[indiceArtilheiro]

          if (indiceEventoCasa === -1) {
            indiceEventoCasa = novosEventos.length
          }

          novosEventos[indiceEventoCasa] =
            `${confronto.timeCasa.nome}: ` +
            formatarMarcadores(marcadoresCasa)
          setEventos([].concat(novosEventos))
          setPontosCasaPartida(golsCasaExibidos * GOALS_PER_GOAL)
        }
      }

      for (let i = 0; i < segundosVisitante.length; i++) {
        if (segundosVisitante[i] === segundos) {
          golsVisitanteExibidos =
            golsVisitanteExibidos + 1
          setGolsVisitante(golsVisitanteExibidos)

          const indiceArtilheiro =
            Math.floor(Math.random() * artilheirosVisitante.length)
          marcadoresVisitante[marcadoresVisitante.length] =
            artilheirosVisitante[indiceArtilheiro]

          if (indiceEventoVisitante === -1) {
            indiceEventoVisitante = novosEventos.length
          }

          novosEventos[indiceEventoVisitante] =
            `${confronto.timeVisitante.nome}: ` +
            formatarMarcadores(marcadoresVisitante)
          setEventos([].concat(novosEventos))
          setPontosVisitantePartida(
            golsVisitanteExibidos * GOALS_PER_GOAL,
          )
        }
      }

      for (let i = 0; i < segundosMaquinaCasa.length; i++) {
        if (segundosMaquinaCasa[i] === segundos) {
          golsMaquinaCasaExibidos =
            golsMaquinaCasaExibidos + 1
          setGolsMaquinaCasa(golsMaquinaCasaExibidos)
          setPontosMaquinaCasa(
            golsMaquinaCasaExibidos * GOALS_PER_GOAL,
          )
        }
      }

      for (let i = 0; i < segundosMaquinaVisitante.length; i++) {
        if (segundosMaquinaVisitante[i] === segundos) {
          golsMaquinaVisitanteExibidos =
            golsMaquinaVisitanteExibidos + 1
          setGolsMaquinaVisitante(
            golsMaquinaVisitanteExibidos,
          )
          setPontosMaquinaVisitante(
            golsMaquinaVisitanteExibidos * GOALS_PER_GOAL,
          )
        }
      }

      if (segundos >= novaDuracao) {
        clearInterval(idCronometro)
        setCronometro(null)
        setGolsCasa(golsDoTimeCasa)
        setGolsVisitante(golsDoTimeVisitante)
        setGolsMaquinaCasa(golsMaquinaCasa)
        setGolsMaquinaVisitante(golsMaquinaVisitante)

        const capturou = calcularCapturaPomo(
          timeCasaCalculado,
          timeVisitanteCalculado,
        )

        let nomeApanhador = obterApanhador(confronto.timeCasa)

        if (capturou === confronto.timeVisitante.nome) {
          nomeApanhador = obterApanhador(confronto.timeVisitante)
        }

        novosEventos[novosEventos.length] =
          `Pomo capturado por ${nomeApanhador}`
        setEventos([].concat(novosEventos))
        setPartidaTerminada(true)

        let pontosCasa = golsDoTimeCasa * GOALS_PER_GOAL
        let pontosVisitante = golsDoTimeVisitante * GOALS_PER_GOAL

        if (capturou === confronto.timeCasa.nome) {
          pontosCasa = pontosCasa + PONTOS_POMO
        } else {
          pontosVisitante = pontosVisitante + PONTOS_POMO
        }

        setPontosCasaPartida(pontosCasa)
        setPontosVisitantePartida(pontosVisitante)

        const capturouMaquina = calcularCapturaPomo(
          timeMaquinaCasaCalculado,
          timeMaquinaVisitanteCalculado,
        )

        let pontosMaquinaCasa = golsMaquinaCasa * GOALS_PER_GOAL
        let pontosMaquinaVisitante =
          golsMaquinaVisitante * GOALS_PER_GOAL

        if (
          capturouMaquina === confrontoMaquina.timeCasa.nome
        ) {
          pontosMaquinaCasa = pontosMaquinaCasa + PONTOS_POMO
        } else {
          pontosMaquinaVisitante =
            pontosMaquinaVisitante + PONTOS_POMO
        }

        setPontosMaquinaCasa(pontosMaquinaCasa)
        setPontosMaquinaVisitante(pontosMaquinaVisitante)
        setPomoMaquina(capturouMaquina)
        setMaquinaTerminada(true)

        setPontosTimes((pontosAtuais) => {
          const novosPontos = []

          for (let i = 0; i < pontosAtuais.length; i++) {
            novosPontos[i] = {
              nome: pontosAtuais[i].nome,
              pontos: pontosAtuais[i].pontos,
            }

            if (pontosAtuais[i].nome === confronto.timeCasa.nome) {
              novosPontos[i].pontos =
                novosPontos[i].pontos + pontosCasa
            }

            if (
              pontosAtuais[i].nome === confronto.timeVisitante.nome
            ) {
              novosPontos[i].pontos =
                novosPontos[i].pontos + pontosVisitante
            }

            if (
              pontosAtuais[i].nome ===
              confrontoMaquina.timeCasa.nome
            ) {
              novosPontos[i].pontos =
                novosPontos[i].pontos + pontosMaquinaCasa
            }

            if (
              pontosAtuais[i].nome ===
              confrontoMaquina.timeVisitante.nome
            ) {
              novosPontos[i].pontos =
                novosPontos[i].pontos + pontosMaquinaVisitante
            }
          }

          return novosPontos
        })
      }
    }, INTERVALO_PARTIDA_MS)
    setCronometro(idCronometro)
  }

  function iniciarProximaPartida() {
    setPartidaAtual(partidaAtual + 1)
    setDuracaoPartida(0)
    setGolsCasa(0)
    setGolsVisitante(0)
    setPontosCasaPartida(0)
    setPontosVisitantePartida(0)
    setGolsMaquinaCasa(0)
    setGolsMaquinaVisitante(0)
    setMaquinaTerminada(false)
    setPontosMaquinaCasa(0)
    setPontosMaquinaVisitante(0)
    setPomoMaquina('')
    setEventos([])
    setPartidaTerminada(false)
  }

  const rodadaAtual = confrontos[partidaAtual]
  const confrontoAtual = rodadaAtual.jogos[0]
  const confrontoMaquinaAtual = rodadaAtual.jogos[1]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1511] px-5 py-8 text-stone-100 sm:px-8 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(161,125,57,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(21,83,56,0.2),transparent_45%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <header className="flex flex-col justify-between gap-6 border-b border-amber-700/40 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              Taça de quadribol
            </p>
            <h1 className="mt-2 font-serif text-4xl font-medium uppercase leading-tight text-stone-100 sm:text-5xl">
              Torneio
            </h1>
            <p className="mt-3 text-sm text-stone-400">
              Rodada {partidaAtual + 1} de {confrontos.length}
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs uppercase tracking-widest text-stone-400">
            <span>Tática: {tatica}</span>
            <span>Dificuldade: {dificuldade}</span>
            <span>Média do time: {mediaTime}</span>
          </div>
        </header>

        {campeao !== '' ? (
          <section
            aria-label="Campeão do torneio"
            className="mt-8 border border-amber-500/60 bg-amber-500/10 p-5 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-amber-300/70">
              Campeão
            </p>
            <h2 className="mt-2 font-serif text-3xl text-amber-100">
              {campeao}
            </h2>
          </section>
        ) : (
          <section className="mt-8 border border-amber-700/50 bg-[#101c16]/90 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-300/70">
                  Jogo {confrontoAtual.numero} da rodada
                </p>
                <h2 className="mt-2 font-serif text-2xl text-stone-100">
                  {confrontoAtual.timeCasa.nome}
                  <span className="text-amber-300"> vs. </span>
                  {confrontoAtual.timeVisitante.nome}
                </h2>
              </div>

            </div>

            {duracaoPartida > 0 ? (
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {partidaTerminada ? (
                      <span className="h-2 w-2 rounded-full bg-amber-300" />
                    ) : (
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    )}
                    <span className="text-xs uppercase tracking-widest text-stone-400">
                      {partidaTerminada
                        ? 'Partida encerrada'
                        : 'Jogo em andamento'}
                    </span>
                  </div>
                </div>
                <div className="relative h-2 overflow-hidden border border-amber-900/50 bg-[#0b1511]">
                  {partidaTerminada ? (
                    <div className="h-full w-full bg-amber-400" />
                  ) : (
                    <div className="h-full w-full animate-pulse bg-amber-400/80" />
                  )}
                </div>
              </div>
            ) : null}

            {duracaoPartida > 0 ? (
              <div className="mt-4 border border-emerald-900/70 bg-[#0b1511] p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500">
                      Outra partida da rodada
                    </p>
                    <p className="mt-1 font-serif text-lg text-stone-100">
                      {confrontoMaquinaAtual.timeCasa.nome}
                      <span className="text-amber-300"> vs. </span>
                      {confrontoMaquinaAtual.timeVisitante.nome}
                    </p>
                  </div>
                  <p className="font-serif text-2xl text-amber-100">
                    {pontosMaquinaCasa > 0
                      ? pontosMaquinaCasa
                      : golsMaquinaCasa * GOALS_PER_GOAL}
                    {' '}
                    x{' '}
                    {pontosMaquinaVisitante > 0
                      ? pontosMaquinaVisitante
                      : golsMaquinaVisitante * GOALS_PER_GOAL}
                  </p>
                </div>

                {maquinaTerminada ? (
                  <p className="mt-3 text-xs text-amber-200">
                    Pomo capturado por {pomoMaquina}
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-stone-400">
                    Partida em andamento
                  </p>
                )}
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="border border-emerald-900/70 bg-[#0b1511] p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  {confrontoAtual.timeCasa.nome}
                </p>
                <p className="mt-2 font-serif text-5xl text-amber-100">
                  {pontosCasaPartida > 0
                    ? pontosCasaPartida
                    : golsCasa * GOALS_PER_GOAL}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {golsCasa} {golsCasa === 1 ? 'gol' : 'gols'}
                </p>
              </div>

              <div className="border border-emerald-900/70 bg-[#0b1511] p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  {confrontoAtual.timeVisitante.nome}
                </p>
                <p className="mt-2 font-serif text-5xl text-amber-100">
                  {pontosVisitantePartida > 0
                    ? pontosVisitantePartida
                    : golsVisitante * GOALS_PER_GOAL}
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  {golsVisitante} {golsVisitante === 1 ? 'gol' : 'gols'}
                </p>
              </div>
            </div>

            {duracaoPartida === 0 ? (
              <button
                type="button"
                className="mt-6 w-full cursor-pointer border border-amber-400 bg-amber-400 px-5 py-3 font-serif font-semibold uppercase tracking-widest text-[#211a14] transition hover:bg-amber-300"
                onClick={iniciarPartida}
              >
                Iniciar rodada
              </button>
            ) : null}

            {partidaTerminada && partidaAtual < confrontos.length - 1 ? (
              <button
                type="button"
                className="mt-6 w-full cursor-pointer border border-amber-400 bg-amber-400 px-5 py-3 font-serif font-semibold uppercase tracking-widest text-[#211a14] transition hover:bg-amber-300"
                onClick={iniciarProximaPartida}
              >
                Próxima rodada
              </button>
            ) : null}

            {partidaTerminada && partidaAtual === confrontos.length - 1 ? (
              <p className="mt-6 text-center font-serif text-xl text-amber-200">
                Torneio concluído
              </p>
            ) : null}

            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-stone-500">
                Eventos da partida
              </p>
              <div className="mt-3 space-y-2">
                {eventos.map((evento, index) => (
                  <p
                    key={index}
                    className="border-b border-emerald-900/50 pb-2 text-sm text-stone-300"
                  >
                    {evento}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {pontosTimes.length > 0 ? (
          <section aria-label="Classificação" className="mt-6 space-y-2">
            {pontosTimes.map((time) => (
              <div
                key={time.nome}
                className="flex items-center justify-between border border-emerald-900/70 bg-[#101c16] p-4"
              >
                <span className="font-serif text-lg text-stone-100">
                  {time.nome}
                </span>
                <span className="text-sm font-semibold text-amber-200">
                  {time.pontos} pontos
                </span>
              </div>
            ))}
          </section>
        ) : null}

        <footer className="mt-8 flex flex-col gap-3 border-t border-emerald-900/70 pt-5 sm:flex-row sm:justify-between">
          <button
            type="button"
            className="cursor-pointer text-left text-xs uppercase tracking-widest text-stone-400 transition hover:text-amber-200"
            onClick={onBack}
          >
            Voltar para o time
          </button>
          <button
            type="button"
            className="cursor-pointer text-left text-xs uppercase tracking-widest text-stone-400 transition hover:text-amber-200"
            onClick={onHome}
          >
            Voltar para a Home
          </button>
        </footer>
      </div>
    </main>
  )
}

export default TournamentSimulation
