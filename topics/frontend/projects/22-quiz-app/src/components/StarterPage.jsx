import React, { useContext, useRef, useEffect } from 'react'
import { isReady } from '../context/context'

export default function StarterPage() {
    const context = useContext(isReady)
    const wrapper = useRef(null)
    function starter() {
    wrapper.current.classList.add("hidden")
    context.user[1](true)
    }
return (
     // Wrapper
    <div ref={wrapper} className="">
        {/* container */}
        <div className="text-white flex flex-col gap-1 items-center p-5 select-none">
            <h1 className="text-4xl md:text-5xl">Welcome !</h1>
            <p className="">Here we are to test your knowledge</p>
            <p className="text-center">when ever you were ready press the START button</p>
            <div className="">
                <button 
                    className='rounded-md bg-blue-500 px-2.5 py-1.5 text-sm text-center align-middle cursor-pointer' type="button"
                    onClick={starter}
                    >
                    start
                </button>
            </div>
        </div>
    </div>
)
}
