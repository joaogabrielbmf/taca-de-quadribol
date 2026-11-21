import { useState } from 'react'

function Home({
  taticaEscolhida,
  dificuldadeEscolhida,
  onContinue,
}) {
  const [taticaAtual, setTaticaAtual] = useState(taticaEscolhida)
  const [dificuldadeAtual, setDificuldadeAtual] = useState(dificuldadeEscolhida)


  const tatica = [
    {
      nome: 'Defensiva',
      descricao:
        'Proteja os três aros e deixe seus batedores afastarem os balaços.',
    },
    {
      nome: 'Equilibrada',
      descricao:
        'Alterne passes entre os artilheiros e mantenha os batedores atentos.',
    },
    {
      nome: 'Ofensiva',
      descricao:
        'Avance para marcar gols enquanto o apanhador procura o pomo de ouro.',
    },
  ]

  const dificuldade = [
    {
      nome: 'Trouxa',
      descricao: 'Uma partida tranquila para aprender a voar e marcar gols.',
    },
    {
      nome: 'Bruxo',
      descricao: 'Enfrente equipes com passes rápidos e jogadas de quadribol.',
    },
    {
      nome: 'Auror',
      descricao: 'O desafio máximo: enfrente um time experiente até a captura do pomo.',
    },
  ]

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b1511] px-5 py-14 text-stone-100 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(161,125,57,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(21,83,56,0.2),transparent_45%)]"
      />

      <section className="relative w-full max-w-4xl">
        <header className="text-center">
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-amber-200">
            Clube de quadribol - temporada de outono
          </p>
          <div className="mx-auto mt-5 h-px w-24 bg-amber-500/70" />
          <h1 className="mt-5 font-serif text-5xl font-semibold tracking-wide text-amber-50 sm:text-7xl">
            Taça de <span className="text-amber-300">Quadribol</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-stone-300 sm:text-lg">
            Escolha 1 goleiro, 2 batedores, 3 artilheiros e 1 apanhador para
            montar seu time e disputar a taça.
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-3xl border-4 border-double border-amber-800/70 bg-[#211a14] p-2 shadow-2xl shadow-amber-950/40 sm:p-3">
          <div className="border border-amber-700/40 p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex shrink-0 items-center justify-center border border-double border-amber-400/70 px-3 py-2 font-serif text-sm text-amber-200">
                7 jogadores
              </span>
              <div>
                <h2 className="font-serif text-xl font-semibold text-amber-50 sm:text-2xl">
                  Escolha sua tática
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-400 sm:text-base">
                  Como seu time vai entrar em campo?
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {tatica.map((opcao) => (
                <button
                  key={opcao.nome}
                  type="button"
                  aria-pressed={taticaAtual === opcao.nome}
                  className={`cursor-pointer border p-5 text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#211a14] ${
                    taticaAtual === opcao.nome
                      ? 'border-amber-500 bg-[#d6bd8b] shadow-lg shadow-black/20'
                      : 'border-amber-900/30 bg-[#e8dcc0] hover:border-amber-700 hover:bg-[#f1e7cf]'
                  }`}
                  onClick={() => setTaticaAtual(opcao.nome)}
                >
                  <span className="font-serif text-xs uppercase tracking-widest text-amber-900/70">
                    Tática
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-semibold text-[#342417]">
                    {opcao.nome}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-[#665643]">
                    {opcao.descricao}
                  </p>
                  <span
                    className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      taticaAtual === opcao.nome
                        ? 'bg-[#352417] text-amber-100'
                        : 'bg-[#d8c8a4] text-[#665643]'
                    }`}
                  >
                    {taticaAtual === opcao.nome
                      ? 'Selecionada'
                      : 'Escolher'}
                  </span>
                </button>
              ))}
            </div>

            <p
              aria-live="polite"
              className="mt-6 text-center font-serif text-sm text-stone-400"
            >
              {taticaAtual !== ''
                ? `Tática escolhida: ${taticaAtual}`
                : 'Selecione uma tática para começar.'}
            </p>

            <div className="mt-8 border-t border-amber-700/40 pt-6">
              <h2 className="font-serif text-xl font-semibold text-amber-50 sm:text-2xl">
                Escolha a dificuldade
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-400 sm:text-base">
                Qual será o nível do desafio?
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {dificuldade.map((opcao) => (
                  <button
                    key={opcao.nome}
                    type="button"
                    aria-pressed={dificuldadeAtual === opcao.nome}
                    className={`cursor-pointer border p-5 text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#211a14] ${
                      dificuldadeAtual === opcao.nome
                        ? 'border-amber-500 bg-[#d6bd8b] shadow-lg shadow-black/20'
                        : 'border-amber-900/30 bg-[#e8dcc0] hover:border-amber-700 hover:bg-[#f1e7cf]'
                    }`}
                    onClick={() => setDificuldadeAtual(opcao.nome)}
                  >
                    <span className="font-serif text-xs uppercase tracking-widest text-amber-900/70">
                      Dificuldade
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-semibold text-[#342417]">
                      {opcao.nome}
                    </h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#665643]">
                      {opcao.descricao}
                    </p>
                    <span
                      className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        dificuldadeAtual === opcao.nome
                          ? 'bg-[#352417] text-amber-100'
                          : 'bg-[#d8c8a4] text-[#665643]'
                      }`}
                    >
                      {dificuldadeAtual === opcao.nome
                        ? 'Selecionada'
                        : 'Escolher'}
                    </span>
                  </button>
                ))}
              </div>

              <p
                aria-live="polite"
                className="mt-6 text-center font-serif text-sm text-stone-400"
              >
                {dificuldadeAtual !== ''
                  ? `Dificuldade escolhida: ${dificuldadeAtual}`
                  : 'Selecione uma dificuldade.'}
              </p>

              {taticaAtual !== '' && dificuldadeAtual !== '' ? (
                <button
                  type="button"
                  className="mt-6 w-full cursor-pointer border border-amber-400 bg-amber-400 px-5 py-3 font-serif font-semibold uppercase tracking-widest text-[#211a14] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#211a14]"
                  onClick={() =>
                    onContinue(taticaAtual, dificuldadeAtual)
                  }
                >
                  Montar meu time
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
