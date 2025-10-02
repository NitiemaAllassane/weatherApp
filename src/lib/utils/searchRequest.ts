import type { Geocoding } from "$lib/types/types";

// Search Cities for suggesing to users
export async function searchCities(query: string, limit: number = 5): Promise<Geocoding[]> {
    if (!query || query.length < 2) return [];

    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            query
            )}&count=${limit}&language=en&format=json`
        );

        if (!response.ok) {
            throw new Error(`Failed to search cities for "${query}"`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return [];
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.results.map((result: any) => ({
            latitude: result.latitude,
            longitude: result.longitude,
            name: result.name,
            country: result.country,
            timezone: result.timezone,
        }));
    } catch (error) {
        console.error("City search error:", error);
        return [];
    }
}