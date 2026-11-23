import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
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
  const configuracaoEscolhida =
    taticaEscolhida !== '' && dificuldadeEscolhida !== ''
  const timeCompleto = jogadoresEscolhidos.length === 7

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
          configuracaoEscolhida ? (
            <PlayerSelection
              tatica={taticaEscolhida}
              dificuldade={dificuldadeEscolhida}
              onComplete={handleTeamComplete}
              onBack={() => navigate('/')}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/resumo"
        element={
          timeCompleto ? (
            <TeamSummary
              jogadores={jogadoresEscolhidos}
              mediaTime={mediaTime}
              tatica={taticaEscolhida}
              dificuldade={dificuldadeEscolhida}
              onStartTournament={() => navigate('/torneio')}
              onBack={() => navigate('/')}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      <Route
        path="/torneio"
        element={
          timeCompleto && configuracaoEscolhida ? (
            <TournamentSimulation
              mediaTime={mediaTime}
              tatica={taticaEscolhida}
              dificuldade={dificuldadeEscolhida}
              jogadores={jogadoresEscolhidos}
              onBack={() => navigate('/resumo')}
              onHome={() => navigate('/')}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
