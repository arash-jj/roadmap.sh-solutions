import Data from '../data/flash-cards-data.json'
import ProgressBar from './ProgressBar'
import React, { useState } from 'react'
import '../main.css'
import { Content } from './Content';


export default function FlashCards() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    // handlers
    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
    };
    const handleNext = () => {
        
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Data.length);
        setIsFlipped(false);  
    };
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Data.length) % Data.length);
        setIsFlipped(false); 
    };
    return (
        <>
            <ProgressBar  currentIndex={currentIndex} totalCard={Data.length} />
            <Content
                    question={Data[currentIndex].question}
                    answer={Data[currentIndex].answer}
                    isFlipped={isFlipped}
            />
            {/* controllers */}
            <div className="my-1 p-2 bg-[#F5F5F5] rounded-[8px] flex justify-between">
                {/* prev */}
                <div className="cursor-pointer select-none" onClick={handlePrevious}>
                    <span>
                        &lt; Previous
                    </span>
                </div>
                {/* showAnser */}
                <div className="cursor-pointer font-bold select-none" onClick={handleFlip}>
                    {isFlipped ? ('Hide Answer') : ('Show Answer')}
                </div>
                {/* next */}
                <div className="cursor-pointer select-none" onClick={handleNext}>
                    <span>
                        Next &gt;
                    </span>
                </div>
            </div>
        </>
    )
}
