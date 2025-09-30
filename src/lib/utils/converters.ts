import { unitSystem } from "$lib/states/unit.svelte";

// Convert Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
}

// Convert Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9;
}


// Convert km/h to mph
export function kmhToMph(kmh: number): number {
    return kmh * 0.621371;
}


// Convert mph to km/h
export function mphToKmh(mph: number): number {
    return mph / 0.621371;
}


// Convert millimeters to inches
export function mmToInches(mm: number): number {
    return mm * 0.0393701;
}


// Convert inches to millimeters
export function inchesToMm(inches: number): number {
    return inches / 0.0393701;
}



export function convert(
    value: number | undefined, 
    type: "temperature" | "wind" | "precipitation"
) {
    if (value === undefined) return 0;

    if (unitSystem.unit === "metric") return value;

    switch(type) {
        case "temperature": return celsiusToFahrenheit(value);
        case "wind": return kmhToMph(value);
        case "precipitation": return mmToInches(value);
    }
}



export function format(
    value: number, 
    type: "temperature" | "wind" | "precipitation"
) {
    const v = convert(value, type);
    const unit = unitSystem.unit === "metric"
        ? type === "temperature" ? "°C" : type === "wind" ? "km/h" : "mm"
        : type === "temperature" ? "°F" : type === "wind" ? "mph" : "in";
    return `${v.toFixed(type === "precipitation" ? 1 : 0)} ${unit}`;
}
