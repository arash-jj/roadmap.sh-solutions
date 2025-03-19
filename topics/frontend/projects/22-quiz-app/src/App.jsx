import StarterPage from './components/StarterPage'
import Questions from './components/Questions';
import FinalPage from './components/FinalPage';
import { isReady } from './context/context';
import { useState } from 'react'
import './index.css'
function App() {
  const [userState, isUserReady] = useState(false)
  const [QuizFinished, isQuizFinished] = useState(false)
  const [Score, setScore] = useState(0)
  return (
    <div className="min-h-[100vh] w-full bg-[#2b2b2b]">
      <isReady.Provider value={{
        user: [userState, isUserReady],
        quiz : [QuizFinished, isQuizFinished],
        userScore: [Score, setScore]
      }}>
        <StarterPage />
        <Questions />
        <FinalPage />
      </isReady.Provider>
    </div>
  )
}

export default App
