import React, { useContext, useEffect, useRef } from 'react'
import { isReady } from '../context/context'
import Data from '../data/db.json'
export default function FinalPage() {
    const totalScore = Data.quizzes.length * 3
    const context = useContext(isReady)
    const missedQuestions = totalScore - context.userScore[0]
    const container = useRef(null)
    // initial render
    useEffect(()=>{
        if (context.quiz[0]) {
            container.current.classList.remove("hidden")
            context.user[1](false)
        }
    })
    return (
        <div ref={container} className="hidden min-h-[300px] lg:max-w-4/5 md:max-w-3/5 md:m-auto text-white md:p-3 p-1">
            <div className="text-1xl md:text-3xl lg:text-4xl text-center">you got {context.userScore[0]} points of {totalScore} points and you missed {missedQuestions} of questions </div>
        </div>
    )
}