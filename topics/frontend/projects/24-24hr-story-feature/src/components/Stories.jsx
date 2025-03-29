import GetStoryContent from './GetStoryContent'
import AddStory from './AddStory'
import React, { useEffect, useState } from 'react'

export default function Stories() {
    const [addContent, setAddContent] = useState(true)
    
    return (
    <div>
        <div 
        className='w-3/4 h-[60px] m-auto border-2 dark:border-white rounded-2xl p-1 flex flex-row items-center relative'>
        <AddStory setAddContent={setAddContent} />
    </div>
        <GetStoryContent 
        addContentState={addContent}  
        setAddContent={setAddContent}
        />
    </div>
    )
}
