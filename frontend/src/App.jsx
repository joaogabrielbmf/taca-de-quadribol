import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PlayerSelection from './pages/PlayerSelection.jsx'
import TeamSummary from './pages/TeamSummary.jsx'
import TournamentSimulation from './pages/TournamentSimulation.jsx'

function App() {
  const navigate = useNavigate()
  const [taticaEscolhida, setTaticaEscolhida] = useState('')
  const [dificuldadeEscolhida, setDificuldadeEscolhida] = useState('')
  const [jogadoresEscolhidos, setJogadoresEscolhidos] = useState([])
  const [mediaTime, setMediaTime] = useState(0)

  function handleContinue(tatica, dificuldade) {
    setTaticaEscolhida(tatica)
    setDificuldadeEscolhida(dificuldade)
    navigate('/selecao')
  }

  function handleTeamComplete(jogadores, media) {
    setJogadoresEscolhidos(jogadores)
    setMediaTime(media)
    navigate('/resumo')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            taticaEscolhida={taticaEscolhida}
            dificuldadeEscolhida={dificuldadeEscolhida}
            onContinue={handleContinue}
          />
        }
      />

      <Route
        path="/selecao"
        element={
          <PlayerSelection
            tatica={taticaEscolhida}
            dificuldade={dificuldadeEscolhida}
            onComplete={handleTeamComplete}
            onBack={() => navigate('/')}
          />
        }
      />

      <Route
        path="/resumo"
        element={
          <TeamSummary
            jogadores={jogadoresEscolhidos}
            mediaTime={mediaTime}
            tatica={taticaEscolhida}
            dificuldade={dificuldadeEscolhida}
            onStartTournament={() => navigate('/torneio')}
            onBack={() => navigate('/')}
          />
        }
      />
      
      <Route
        path="/torneio"
        element={
          <TournamentSimulation
            mediaTime={mediaTime}
            tatica={taticaEscolhida}
            dificuldade={dificuldadeEscolhida}
            jogadores={jogadoresEscolhidos}
            onBack={() => navigate('/resumo')}
            onHome={() => navigate('/')}
          />
        }
      />
    </Routes>
  )
}

export default App
