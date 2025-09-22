import { fetchWeatherApi } from 'openmeteo';
import type { Geocoding, WeatherData } from "$lib/types/types";


// Get city Geocoding
export async function getCityGeocoding(cityName: string): Promise<Geocoding> {
    try {

        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            cityName
            )}&count=1&language=en&format=json`
        );

        if (!response.ok) {
            throw new Error(`Unable to fetch geocoding for "${cityName}"`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error(`No geocoding results found for "${cityName}"`);
        }

        const result = data.results[0];

        return {
            latitude: result.latitude,
            longitude: result.longitude,
            name: result.name,
            country: result.country,
            timezone: result.timezone,
        };

    } catch (error) {
        console.error("Geocoding fetch error:", error);
        throw new Error(
            error instanceof Error
            ? error.message
            : "Unexpected error while fetching geocoding"
        );
    }
}


// Get city weather datas
export async function getCityWeatherData(cityName: string){
    try {

        const cityGeocoding: Geocoding = await getCityGeocoding(cityName);

        const params = {
            "latitude": cityGeocoding.latitude,
            "longitude": cityGeocoding.longitude,
            "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min"],
            "hourly": ["temperature_2m", "weather_code", "is_day"],
            "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "weather_code", "wind_speed_10m"],
            "timezone": cityGeocoding.timezone,
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const utcOffsetSeconds = response.utcOffsetSeconds();

        console.log(
            `\nCoordinates: ${latitude}°N ${longitude}°E`,
            `\nElevation: ${elevation}m asl`,
            `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
            `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
        );

        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        const hourlyTemp = assertExists(hourly.variables(0)?.valuesArray(), "Missing hourly.temperature_2m");
        const hourlyWeatherCode = assertExists(hourly.variables(1)?.valuesArray(), "Missing hourly.weather_code");
        const hourlyIsDay = assertExists(hourly.variables(2)?.valuesArray(), "Missing hourly.is_day");

        const dailyWeatherCode = assertExists(daily.variables(0)?.valuesArray(), "Missing daily.weather_code");
        const dailyTempMax = assertExists(daily.variables(1)?.valuesArray(), "Missing daily.temperature_2m_max");
        const dailyTempMin = assertExists(daily.variables(2)?.valuesArray(), "Missing daily.temperature_2m_min");

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData: WeatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature_2m: current.variables(0)!.value(),
                relative_humidity_2m: current.variables(1)!.value(),
                apparent_temperature: current.variables(2)!.value(),
                is_day: current.variables(3)!.value(),
                precipitation: current.variables(4)!.value(),
                weather_code: current.variables(5)!.value(),
                wind_speed_10m: current.variables(6)!.value(),
            },
            hourly: {
                time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                    (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                ),
                temperature_2m: hourlyTemp,
                weather_code: hourlyWeatherCode,
                is_day: hourlyIsDay,
            },
            daily: {
                time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                    (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                ),
                weather_code: dailyWeatherCode,
                temperature_2m_max: dailyTempMax,
                temperature_2m_min: dailyTempMin,
            },
        };


        return {
            cityGeocoding,
            weatherData
        };

    } catch (error) {
        console.error("Failed to fetch city weather data:", error);
        throw new Error("No search results found");
    }
}



function assertExists<T>(v: T | null | undefined, message: string): T {
  if (v === null || v === undefined) throw new Error(message);
  return v;
}