import { getCityWeatherData } from "$lib/utils/api";
import { error } from "@sveltejs/kit";

export const load = async ({ url }) => {
    const cityName = url.searchParams.get("city")?.trim() ?? "Abidjan";

    if (!cityName || cityName === "") {
        return error(400, {
            message: "City name is required !"
        });
    } else if (cityName.length < 3) {
        return error(400, {
            message: "City name not valid"
        });
    }

    try {
        const weatherData = await getCityWeatherData(cityName);

        return {
            ...weatherData
        }
    } catch (err) {
        return error(500, {
            message: err instanceof Error ? err.message : "Internal server error"
        });
    }
};