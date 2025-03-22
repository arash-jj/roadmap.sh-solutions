import React, { useContext, useState } from 'react'
import { weather } from '../context/context';
import { Search } from 'lucide-react';

export default function searchWeather() {
    const [userLocation, setUserLocation] = useState("")
    const context = useContext(weather) 
    const handleSubmit = (e)=>{
        e.preventDefault();
        context.search[1](userLocation)
    }
    return (
        <div className="p-2">
            <form onSubmit={handleSubmit}>
                <div className="m-auto relative max-w-3/4 md:max-w-3/7">
                    <input 
                    type="text" 
                    value={userLocation}
                    autoComplete='off'
                    name="city"
                    onChange={(e)=>{setUserLocation(e.target.value)}}
                    placeholder='Enter a city name ...'
                    className='w-full outline-0 border-2 border-[var(--DividerColor)] rounded-lg 
                    p-1 focus:border-[var(--PrimaryColor)] focus:shadow-lg focus:shadow-[#2195f370]
                    dark:focus:border-[var(--DarkPrimaryColor)]  dark:focus:shadow-[#2195f34d]
                    dark:placeholder-[var(--Text)] dark:text-[var(--Text)]'
                    />
                    <Search className='absolute right-1 top-[6px] stroke-[var(--DividerColor)]'/>
                </div>
            </form>
        </div>
    )
}
