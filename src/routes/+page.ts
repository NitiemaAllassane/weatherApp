import { getCityWeatherData, getCityGeocoding } from "$lib/utils/api";
import { error } from "@sveltejs/kit";


export const load = async ({ url }) => {
    const cityName = url.searchParams.get("city")?.trim() ?? "Abidjan";

    if (!cityName || cityName === "") {
        return error(400, {
            message: "City name is required !"
        });
    } else if (cityName.length < 3) {
        return error(400, {
            message: "Please enter a valid city name"
        });
    }

    try {
        const geocoding = await getCityGeocoding(cityName);
        const weatherData = await getCityWeatherData(
            geocoding.latitude, 
            geocoding.longitude, 
            geocoding.timezone
        );

        return {
            geocoding,
            ...weatherData,
        }
    } catch (err) {
           
        if (err instanceof Error && err.message.includes("No search result found")) {
            return error(404, { 
                message: `No search result found !` 
            });
        }
        
        return error(500, { 
            message: "Weather service temporarily unavailable"
        });
    }
};

