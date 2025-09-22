import { getWeatherIcon } from "./weatherIcons";

import type { 
    CurrentData, 
    CurrentForecast, 
    WeatherData,
    DailyForecast,
    HourlyForecast
} from "$lib/types/types";


export function mapCurrentForecasts(weatherData: WeatherData): CurrentForecast[] {
    const current: CurrentData = weatherData.current;

    return [
        { title: "Feels like", info: `${current.apparent_temperature.toFixed(0)}°` },
        { title: "Humidity", info: `${current.relative_humidity_2m.toFixed(0)}%` },
        { title: "Wind", info: `${current.wind_speed_10m.toFixed(0)} km/h` },
        { title: "Precipitation", info: `${current.precipitation.toFixed(0)} mm` },
    ];
}



export function mapDailyForecasts(weatherData: WeatherData): DailyForecast[] {
    const { daily } = weatherData;

    return daily.time.map((date, index) => {
        const day = date.toLocaleDateString("en-US", { weekday: "short" });

        const minTempVal = daily.temperature_2m_min?.[index];
        const maxTempVal = daily.temperature_2m_max?.[index];
        const weatherCode = daily.weather_code?.[index] ?? 0;

        console.log(minTempVal, maxTempVal, weatherCode);

        return {
            day,
            weatherIcon: getWeatherIcon(weatherCode),
            minTemp: minTempVal !== undefined ? minTempVal.toFixed(0) + "°" : "0°",
            maxTemp: maxTempVal !== undefined ? maxTempVal.toFixed(0) + "°" : "0°",
        };
    });
}



export function mapHourlyForecasts(weatherData: WeatherData): HourlyForecast[] {
    const { hourly } = weatherData;

    return hourly.time.slice(0, 24).map((date, index) => {
        const hour = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true
        });

        const tempVal = hourly.temperature_2m?.[index];
        const weatherCode = hourly.weather_code?.[index] ?? 0;

        console.log(tempVal, weatherCode);
        

        return {
            hour,
            temperature: tempVal !== undefined ? tempVal.toFixed(0) + "°" : "0°",
            weatherIcon: getWeatherIcon(weatherCode)
        };
    });
}