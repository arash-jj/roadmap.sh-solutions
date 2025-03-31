import { Navigation, Pagination } from "swiper/modules";
import React, { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Trash2 } from 'lucide-react';
import "swiper/swiper-bundle.css";
import { X } from 'lucide-react';

export default function ShowStory({ entries, displayStory, setDisplayStory, currentIndex, loadEntries, handleDelete }) {
    const [progresses, setProgresses] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(currentIndex);
    const intervalRef = useRef(null);
    const swiperRef = useRef(null);
    const prevEntriesLength = useRef(entries.length);
    useEffect(() => {
        if (entries.length !== prevEntriesLength.current) {
            setProgresses(prev => {
                const newProgresses = Array(entries.length).fill(0);
                return newProgresses.map((_, i) => i < prev.length ? prev[i] : 0);
            });
            prevEntriesLength.current = entries.length;
        }
    }, [entries]);
    const startProgressBar = (index) => {
        clearInterval(intervalRef.current);
        setProgresses(prev => prev.map((p, i) => i === index ? 0 : p));
        
        intervalRef.current = setInterval(() => {
            setProgresses(prev => {
                const newProgresses = [...prev];
                if (newProgresses[index] < 100) {
                    newProgresses[index] += 1;
                }
                return newProgresses;
            });
        }, 50);
    };
    const stopProgressBar = () => {
        clearInterval(intervalRef.current);
    };
    useEffect(() => {
        if (displayStory && entries.length > 0) {
            const validIndex = Math.min(currentIndex, entries.length - 1);
            setCurrentSlideIndex(validIndex);
            startProgressBar(validIndex);
            markAsSeen(validIndex);
        } else {
            stopProgressBar();
            setProgresses(Array(entries.length).fill(0));
        }
    }, [displayStory]);
    useEffect(() => {
        if (progresses[currentSlideIndex] === 100) {
            if (currentSlideIndex < entries.length - 1) {
                swiperRef.current.slideNext();
            } else {
                setDisplayStory(false);
            }
        }
    }, [progresses[currentSlideIndex]]);
    const handleSlideChange = (swiper) => {
        const newIndex = swiper.activeIndex;
        if (newIndex >= entries.length) return;
        
        stopProgressBar();
        setCurrentSlideIndex(newIndex);
        markAsSeen(newIndex);
        startProgressBar(newIndex);
    };
    const markAsSeen = (index) => {
        const entry = entries[index];
        if (entry && !entry.seenStory) {
            const updatedEntry = { ...entry, seenStory: true };
            localStorage.setItem(`entry_${entry.id}`, JSON.stringify(updatedEntry));
            loadEntries();
        }
    };
    const handleDeleteStory = () => {
        const currentId = entries[currentSlideIndex].id;
        handleDelete(currentId);
        
        if (entries.length === 1) {
            setDisplayStory(false);
        } else {
            const newIndex = Math.min(currentSlideIndex, entries.length - 2);
            setCurrentSlideIndex(newIndex);
            startProgressBar(newIndex);
        }
    };
    if (!displayStory || entries.length === 0) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full h-full max-w-2xl max-h-[90vh] bg-black">
                <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
                    {entries.map((_, idx) => (
                        <div key={idx} className="h-1 bg-gray-600 flex-1 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-white rounded-full transition-all duration-100"
                                style={{ 
                                    width: `${progresses[idx] || 0}%`,
                                    transition: idx === currentSlideIndex ? 'width 50ms linear' : 'none'
                                }}
                            />
                        </div>
                    ))}
                </div>
                <X
                    className="absolute top-4 right-4 z-20 cursor-pointer text-white mt-1"
                    size={32}
                    onClick={() => setDisplayStory(false)}
                />
                <Trash2
                    className="absolute bottom-4 right-4 z-20 text-red-500 cursor-pointer mt-2"
                    onClick={handleDeleteStory}
                />
                <Swiper
                    key={entries.length}
                    modules={[Navigation, Pagination]}
                    initialSlide={currentSlideIndex}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    className="h-full w-full"
                >
                    {entries.map((entry) => (
                        <SwiperSlide key={entry.id} className="flex items-center justify-center">
                            <img
                                src={entry.image}
                                alt={`Story ${entry.id}`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            {entry.description && (
                                <div className="absolute bottom-4 left-4 right-4 text-white text-center bg-black bg-opacity-50 p-2 rounded-lg">
                                    {entry.description}
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}