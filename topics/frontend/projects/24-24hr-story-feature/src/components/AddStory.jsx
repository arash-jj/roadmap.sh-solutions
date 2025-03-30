import React from 'react'
import { Plus } from 'lucide-react';

export default function AddStory({setAddContent}) {

    return (
        <>
        <div 
        className='w-[50px] h-[50px] rounded-full border-2 dark:border-white flex justify-center items-center cursor-pointer ' 
        onClick={()=>{setAddContent(true)}}
        >
            <Plus className='dark:text-white'/>
        </div>
        </>
    )
}
