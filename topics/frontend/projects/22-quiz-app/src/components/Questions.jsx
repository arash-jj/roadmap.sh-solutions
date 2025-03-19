import {React, useContext, useRef, useState, useEffect} from 'react';
import { isReady } from '../context/context';
import Data from '../data/db.json'

export default function Questions() {
    const [SubjectIndex, setSubjectIndex] = useState(0);
    const [QuestionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isRunning, setIsRunning] = useState(true); 
    const context = useContext(isReady);
    const wrapper = useRef(null);
    const intervalRef = useRef(null);
    // Timer logic
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);
    // Handle time expiration
    const handleTimeUp = () => {
        setIsRunning(false);
        handleAnswer('time-up');
    };
    // Initialize component visibility
    useEffect(() => {
        if (context.user[0]) {
            wrapper.current.classList.remove("hidden");
            setIsRunning(true);
            setTimeLeft(60);
        } else {
            wrapper.current.classList.add("hidden");
        }
    }, [context.user]);
    // Answer handling
    const handleAnswer = (userAnswer) => {
        if (selectedAnswer) return; 
        setSelectedAnswer(userAnswer);
        const correctAnswer = Data.quizzes[SubjectIndex].questions[QuestionIndex].correctAnswer;
        if (userAnswer === correctAnswer) {
            context.userScore[1](prev => prev + 1);
        }
    };
    // Navigation handling
    const nextQuestionHandler = () => {
        if (QuestionIndex + 1 === Data.quizzes[SubjectIndex].questions.length) {
            if (SubjectIndex + 1 === Data.quizzes.length) {
                context.quiz[1](true);
                return;
            }
            setSubjectIndex(prev => prev + 1);
            setQuestionIndex(0);
        } else {
            setQuestionIndex(prev => prev + 1);
        }
        resetQuestionState();
    };
    const resetQuestionState = () => {
        setSelectedAnswer(null);
        setIsRunning(true);
        setTimeLeft(60);
    };
    // Progress calculations
    const progressWidth = (timeLeft / 60) * 100;
    return (
        <div className="pt-5">
            <div ref={wrapper} className="hidden lg:w-3/4 min-h-[330px] m-auto text-white shadow-2xl rounded-2xl">
                {/* Header */}
                {Data.quizzes?.[SubjectIndex] && (
                    <div className="min-h-[60px] mt-2 p-2.5">
                        <h1 className="text-3xl md:text-4xl ">
                            {Data.quizzes[SubjectIndex].category}
                        </h1>
                        <p className="text-sm text-[#9e9e9e] ">
                            {Data.quizzes[SubjectIndex].description}
                        </p>
                        <div className="w-full h-[8px] overflow-hidden rounded-lg bg-[#0288D1] mt-1.5">
                            <div 
                            className="transition-all h-full bg-[#B3E5FC]"
                            style={{ width: `${progressWidth}%` }}
                            >
                                
                            </div>
                        </div>
                    </div>
                )}
                {/* Questions & Answers */}
                <div className="">
                    {Data.quizzes?.[SubjectIndex]?.questions?.[QuestionIndex] && (
                        <div className="mb-1.5">
                            <p className="text-2xl md:text-3xl text-center">
                                {Data.quizzes[SubjectIndex].questions[QuestionIndex].questionText}
                            </p>
                        </div>
                    )}
                    <div className="sm:max-w-4/5 md:max-w-3/4 m-auto flex flex-col gap-1.5">
                        {/* mapping options to create the answer elements in DOM */}
                        {Data.quizzes?.[SubjectIndex]?.questions?.[QuestionIndex]?.options?.map((answer, index) => {
                            const isCorrect = answer === Data.quizzes[SubjectIndex].questions[QuestionIndex].correctAnswer
                            const isSelected = answer === selectedAnswer
                            return (
                                <button 
                                key={`${QuestionIndex}-${index}`}
                                onClick={() => handleAnswer(answer)}
                                className={`
                                p-1 border-[1.5px] rounded-md bg-[#6d7ac41a] hover:border-[#0288D1] transition-all cursor-pointer
                                ${isSelected ? 
                                    (isCorrect ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500') 
                                    : 'bg-[#6d7ac41a] hover:border-[#0288D1]'}
                                ${selectedAnswer && !isSelected ? 'opacity-50' : ''}
                                `}
                            >
                                {answer}
                            </button>
                            )
                        })}
                    </div>
                </div>
                {/* Footer */}
                {Data.quizzes?.[SubjectIndex] && (
                    <div className="flex justify-between items-center border-t-[1.5px] border-[#8080802d] mt-5 p-1">
                        <div>
                            <span>
                                {QuestionIndex + 1} of {Data.quizzes[SubjectIndex].questions.length}
                            </span>
                        </div>
                        <div>
                            <button 
                                type="button"
                                onClick={nextQuestionHandler}
                                disabled={!selectedAnswer && selectedAnswer !== 'time-up'}
                                className="px-4 py-2 bg-[#0288D1] rounded-lg hover:bg-[#0277BD] transition-colors disabled:opacity-50" 
                            >
                                {QuestionIndex + 1 === Data.quizzes[SubjectIndex].questions.length ? "Move to Next Subject" : "Next Question"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
