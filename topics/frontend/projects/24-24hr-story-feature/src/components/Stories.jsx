import React, { useEffect, useState, useCallback } from 'react'
import GetStoryContent from './GetStoryContent'
import ShowStory from './ShowStory'
import AddStory from './AddStory'

export default function Stories() {
    const [addContent, setAddContent] = useState(false)
    const [entries, setEntries] = useState([])
    const [displayStory, setDisplayStory] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const loadEntries = useCallback(() => {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('entry_'))
        const loadedEntries = keys.map(key => {
            try {
                const entry = JSON.parse(localStorage.getItem(key))
                return { id: key.replace('entry_', ''), ...entry }
            } catch (error) {
                console.error('Error parsing entry:', error)
                return null
            }
        }).filter(Boolean)
        
        setEntries(loadedEntries.sort((a, b) => b.timestamp.localeCompare(a.timestamp)))
    }, [])
    useEffect(() => {
        loadEntries()
    }, [loadEntries, addContent])
    const handleDelete = useCallback((entryId) => {
        localStorage.removeItem(`entry_${entryId}`)
        loadEntries()
        setDisplayStory(false)
    }, [loadEntries])
    const handleStoryClick = useCallback((entryId) => {
        const entryKey = `entry_${entryId}`
        const entry = JSON.parse(localStorage.getItem(entryKey))
        if (entry && !entry.seenStory) {
            const updatedEntry = { ...entry, seenStory: true }
            localStorage.setItem(entryKey, JSON.stringify(updatedEntry))
            loadEntries()
        }
        const index = entries.findIndex(e => e.id === entryId)
        setCurrentIndex(index)
        setDisplayStory(true)
    }, [entries, loadEntries])
    return (
        <div>
            <div className='md:w-3/4 h-[60px] m-auto border-2 dark:border-white rounded-2xl p-1 flex flex-row gap-2 items-center' id='problem'>
                <AddStory setAddContent={setAddContent} />
                
                {entries.length === 0 ? (
                    <div className="text-gray-500 text-sm pl-2">
                        No stories yet.
                    </div>
                ) : (
                    entries.map((entry) => (
                        <div 
                            key={entry.id}
                            onClick={() => handleStoryClick(entry.id)}
                            className={`flex-shrink-0 w-[50px] h-[50px] rounded-full p-[2px] cursor-pointer ${
                                entry.seenStory 
                                    ? 'bg-gray-400' 
                                    : 'bg-[linear-gradient(129deg,rgba(249,206,52,1)_12%,rgba(238,42,123,1)_45%,rgba(98,40,215,1)_85%)]'
                            }`}
                        >
                            <img 
                                src={entry.image} 
                                alt="Story content"
                                className='w-full h-full object-cover rounded-full border-2 border-white dark:border-gray-900'
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
            <GetStoryContent 
                addContentState={addContent} 
                setAddContent={setAddContent} 
                onNewEntry={loadEntries}
            />
            <ShowStory 
                entries={entries} 
                displayStory={displayStory} 
                setDisplayStory={setDisplayStory} 
                currentIndex={currentIndex}
                handleDelete={handleDelete}
                onMarkAsSeen={loadEntries}
            />
        </div>
    )
}