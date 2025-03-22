import SearchWeather from './components/searchWeather'
import { getData } from './services/weatherService'
import WeatherCard from './components/WeatherCard'
import { weather } from './context/context'

import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getData(searchTerm);
        setWeatherData(data);
      } catch (err) {
        setError("Failed to fetch weather data.");
      }
    };
    fetchWeather();
  }, [searchTerm]); 
  return (
    <weather.Provider value={{search: [searchTerm, setSearchTerm]}}>
      <SearchWeather />
      <WeatherCard 
        data={weatherData.currentConditions} location={weatherData.location} hours={weatherData.hours}
      />
    </weather.Provider>
  )
} 

export default App
