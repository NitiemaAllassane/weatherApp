import sunny from "$lib/assets/images/icon-sunny.webp";
import storm from "$lib/assets/images/icon-storm.webp";
import snow from "$lib/assets/images/icon-snow.webp";
import rain from "$lib/assets/images/icon-rain.webp";
import partlyCloudy from "$lib/assets/images/icon-partly-cloudy.webp";
import overCast from "$lib/assets/images/icon-overcast.webp";
import fog from "$lib/assets/images/icon-fog.webp";
import drizzle from "$lib/assets/images/icon-drizzle.webp";


const weatherIcons: Record<number, string> = {
  0: sunny,
  1: sunny,
  2: partlyCloudy,
  3: overCast,
  45: fog,
  48: fog,
  51: drizzle,
  53: drizzle,
  55: drizzle,
  61: rain,
  63: rain,
  65: rain,
  80: rain,
  81: rain,
  82: rain,
  71: snow,
  73: snow,
  75: snow,
  77: snow,
  85: snow,
  86: snow,
  95: storm,
  96: storm,
  99: storm,
};


export function getWeatherIcon(code: number): string {
  return weatherIcons[code] ?? sunny;
}