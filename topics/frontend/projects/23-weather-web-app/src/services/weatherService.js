const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function getData(location) {
    try {
        const res = await fetch(`${BASE_URL}/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        const dayDate = data.days[0].datetimeEpoch * 1000; 
        return {
            currentConditions: {
                temp: data.currentConditions.temp,
                windspeed: data.currentConditions.windspeed,
                precipprob: data.currentConditions.precipprob,
                conditions: data.currentConditions.conditions,
                datetime: data.currentConditions.datetimeEpoch * 1000,
                humidity: data.currentConditions.humidity,
                icon: data.currentConditions.icon,
            },
            hours: data.days[0].hours.map((hour) => ({
                datetime: (hour.datetimeEpoch * 1000),
                temp: hour.temp,
                conditions: hour.conditions,
                icon: hour.icon,
            })),
            location: data.resolvedAddress,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}