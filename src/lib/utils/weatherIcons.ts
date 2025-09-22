import sunny from "$lib/assets/images/icon-sunny.webp";
import storm from "$lib/assets/images/icon-storm.webp";
import snow from "$lib/assets/images/icon-snow.webp";
import rain from "$lib/assets/images/icon-rain.webp";
import partlyCloudy from "$lib/assets/images/icon-partly-cloudy.webp";
import overCast from "$lib/assets/images/icon-overcast.webp";
import fog from "$lib/assets/images/icon-fog.webp";
import drizzle from "$lib/assets/images/icon-drizzle.webp";



export function getWeatherIcon(code: number): string {
    switch (code) {
        case 0: // Clear sky
        case 1: // Mainly clear
            return sunny;
        case 2: // Partly cloudy
            return partlyCloudy;
        case 3: // Overcast
            return overCast;
        case 45: // Fog
        case 48: // Depositing rime fog
            return fog;
        case 51: // Drizzle: Light
        case 53: // Drizzle: Moderate
        case 55: // Drizzle: Dense
            return drizzle;
        case 61: // Rain: Slight
        case 63: // Rain: Moderate
        case 65: // Rain: Heavy
        case 80: // Rain showers: Slight
        case 81: // Rain showers: Moderate
        case 82: // Rain showers: Violent
            return rain;
        case 71: // Snow fall: Slight
        case 73: // Snow fall: Moderate
        case 75: // Snow fall: Heavy
        case 77: // Snow grains
        case 85: // Snow showers slight
        case 86: // Snow showers heavy
            return snow;
        case 95: // Thunderstorm: Slight or moderate
        case 96: // Thunderstorm with slight hail
        case 99: // Thunderstorm with heavy hail
            return storm;
        default:
            return sunny;
    }
}