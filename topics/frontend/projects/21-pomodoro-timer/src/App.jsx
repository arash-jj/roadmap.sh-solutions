import React, { useState, useEffect, useRef } from 'react';
import Alarm from './assets/audio/Desktop-alarm-clock-1.mp3'
import './index.css';

function App() {
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeButton, setActiveButton] = useState(1);
  // Switching mode btns
  const buttons = [
    { id: 1, label: 'Focus', duration: 25 * 60 },
    { id: 2, label: 'Short Break', duration: 5 * 60 },
    { id: 3, label: 'Long Break', duration: 15 * 60 },
  ];
  const handleModeChange = (button) => {
    setActiveButton(button.id);
    setMode(button.label.toLowerCase().replace(' ', '-'));
    setTimeLeft(button.duration);
    setIsRunning(false);
  };
  // Timer format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  // Timer countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  // Playing alarm after timer complete  
  useEffect(() => {
    audioRef.current = new Audio(Alarm);
    audioRef.current.volume = 0.3;
  }, []);
  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      playSound();
    }
  }, [timeLeft, isRunning]);
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };
  // Control btns handler 
  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };
  const handleReset = () => {
    const currentMode = buttons.find(b => b.id === activeButton);
    setTimeLeft(currentMode.duration);
    setIsRunning(false);
  };
  // Progress bar
  const progressWidth = ((timeLeft / buttons.find(b => b.id === activeButton).duration) * 100).toFixed(2);
  return (
    // Wrapper
    <div className="m-auto mt-[50px] max-w-3/4 min-h-[500px] p-2 font-sans">
      {/* Container */}
      <div className="">
        {/* Switching mode btns */}
        <div className="flex justify-center gap-1.5 ">
          {buttons.map((button) => (
            <button 
              type="button"
              key={button.id}
              onClick={() => handleModeChange(button)}
              className={`cursor-pointer p-2 rounded-lg transition-colors
                ${
                  activeButton === button.id 
                    ? 'text-zinc-400 bg-zinc-800' 
                    : 'text-zinc-700 hover:bg-zinc-700 hover:text-zinc-200'
                }`}
              aria-pressed={activeButton === button.id}
            >
              {button.label}
            </button>
          ))}
        </div>
        {/* Timer */}
        <div className="mt-3.5 select-none">
          <div className="text-9xl flex justify-center">
            {formatTime(timeLeft)}
          </div>
          <div className="mx-auto mb-3 mt-5 h-1 w-[350px] overflow-hidden rounded-lg bg-zinc-800">
            <div 
              className="h-full rounded-lg bg-zinc-500 transition-all" 
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </div>
        {/* Control btns */}
        <div className="flex justify-center mt-2 gap-2">
          <button 
            type="button"
            onClick={handleStartPause}
            className='cursor-pointer bg-zinc-800 py-1.5 px-2 rounded-lg text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200'
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            type="button"
            onClick={handleReset}
            className='cursor-pointer bg-zinc-800 py-1.5 px-2 rounded-lg text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200'
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;