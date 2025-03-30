import GetStoryContent from './GetStoryContent'
import AddStory from './AddStory'
import React, { useEffect, useState, useCallback } from 'react'

export default function Stories() {
    const [addContent, setAddContent] = useState(false)
    const [entries, setEntries] = useState([])
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
    }, [loadEntries])
    return (
        <div>
            <div className='md:w-3/4 h-[60px] m-auto border-2 dark:border-white rounded-2xl p-1 flex flex-row gap-2 items-center'>
                <AddStory setAddContent={setAddContent} />
                
                {entries.length === 0 ? (
                    <div className="text-gray-500 text-sm pl-2">
                        No stories yet.
                    </div>
                ) : (
                    entries.map((entry) => (
                        <div 
                            key={entry.id}
                            className="flex-shrink-0 w-[50px] h-[50px] rounded-full p-[2px] cursor-pointer
                            bg-[linear-gradient(129deg,rgba(249,206,52,1)_12%,rgba(238,42,123,1)_45%,rgba(98,40,215,1)_85%)]"
                        >
                            <img 
                                src={entry.image} 
                                alt="Story content"
                                className='w-full h-full object-cover rounded-full border-2 border-white dark:border-gray-900'
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
        </div>
    )
}