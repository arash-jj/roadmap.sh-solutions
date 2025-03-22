import { Droplet, Wind, Clock, Calendar } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

export default function WeatherCard({ data, location, hours }) {
    const container = useRef(null);
    const nextDay = hours?.slice(0, 24);
    useEffect(() => {
        if (data && container.current) {
            container.current.classList.remove("hidden");
        } else if (container.current) {
            container.current.classList.add("hidden");
        }
    }, [data]);
    const HourlySection = ({ title, hours }) => (
        <div>
            <div className="flex items-center gap-2 mb-3 text-gray-500 dark:text-gray-400">
                <Clock size={18} />
                <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {hours?.map((hour, index) => {
                    const dateTime = new Date(hour.datetime * 1000 || hour.datetime);
                    return (
                        <div key={index} className="flex-shrink-0 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg w-24 text-center">
                            <div className="text-sm font-medium">
                                {dateTime.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    hour12: true 
                                })}
                            </div>
                            <div className="my-1 text-xl font-semibold">
                                {Math.round(hour.temp)}°
                            </div>
                            <div className="text-sm text-gray-500">
                                {hour.conditions}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
    return (
        <div ref={container} className="hidden border-2 rounded-2xl md:max-w-1/2 m-auto p-4 dark:text-white bg-white dark:bg-gray-800 shadow-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{location}</h1>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>
                            {new Date(data?.datetime || Date.now()).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-semibold">
                        {Math.round(data?.temp)}°C
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                        {data?.conditions}
                    </div>
                </div>
            </div>
            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Wind className="text-blue-500" />
                    <div>
                        <div className="text-sm text-gray-500">Wind Speed</div>
                        <div className="font-semibold">{data?.windspeed} km/h</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Droplet className="text-blue-500" />
                    <div>
                        <div className="text-sm text-gray-500">Humidity</div>
                        <div className="font-semibold">{data?.humidity}%</div>
                    </div>
                </div>
            </div>
            {/* Timeline Section */}
            <div className="space-y-6">
                <HourlySection 
                    title="24-Hour Forecast"
                    hours={nextDay}
                />
            </div>
        </div>
    );
}