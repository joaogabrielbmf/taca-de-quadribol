const posicoes = [
  'Goleiro',
  'Batedor',
  'Batedor',
  'Artilheiro',
  'Artilheiro',
  'Artilheiro',
  'Apanhador',
]

const coresPorCasa = {
  'Grifinória': 'border-red-900/70 bg-[#241515]',
  Sonserina: 'border-emerald-900/70 bg-[#101d18]',
  Corvinal: 'border-blue-900/70 bg-[#151b27]',
  'Lufa-Lufa': 'border-yellow-900/70 bg-[#241d12]',
  Durmstrang: 'border-slate-600/70 bg-[#1b1b20]',
}

function TeamSummary({
  jogadores,
  mediaTime,
  tatica,
  dificuldade,
  onStartTournament,
  onBack,
}) {
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
              Montagem do time concluída
            </p>
            <h1 className="mt-2 font-serif text-4xl font-medium uppercase leading-tight text-stone-100 sm:text-5xl">
              Seu time está <span className="text-amber-300">pronto</span>
            </h1>
            <p className="mt-3 text-sm text-stone-400">
              Sete jogadores prontos para disputar a taça.
            </p>
          </div>

          <div className="flex items-center justify-between gap-5 sm:justify-end">
            <div className="flex flex-col gap-1 text-xs uppercase tracking-widest text-stone-400">
              <span>{tatica}</span>
              <span>{dificuldade}</span>
            </div>
            <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border border-amber-500/60 text-center">
              <span className="text-[9px] uppercase tracking-widest text-stone-400">
                Média
              </span>
              <span className="font-serif text-2xl text-amber-200">
                {mediaTime}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-stone-400">
                do time
              </span>
            </div>
          </div>
        </header>

        <section
          aria-label="Time completo"
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          {jogadores.map((jogador, index) => (
            <article
              key={jogador.id}
              className={`flex items-center justify-between gap-4 border p-4 ${
                coresPorCasa[jogador.casa]
              }`}
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-300/70">
                  {posicoes[index]} · {jogador.casa}
                </p>
                <p className="mt-1 font-serif text-lg text-stone-100">
                  {jogador.nome}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-xl text-amber-200">
                  {Math.round(
                    (jogador.forca +
                      jogador.velocidade +
                      jogador.habilidade +
                      jogador.sorte) /
                      4,
                  )}
                </p>
                <p className="text-[9px] uppercase tracking-widest text-stone-400">
                  Média
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="w-full cursor-pointer border border-amber-400 bg-amber-400 px-5 py-3 font-serif font-semibold uppercase tracking-widest text-[#211a14] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
            onClick={onStartTournament}
          >
            Iniciar torneio
          </button>
          <button
            type="button"
            className="w-full cursor-pointer border border-amber-700/50 px-5 py-3 font-serif font-semibold uppercase tracking-widest text-amber-200 transition hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-300"
            onClick={onBack}
          >
            Voltar para a Home
          </button>
        </div>
      </div>
    </main>
  )
}

export default TeamSummary
