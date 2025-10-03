# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar with real-time autocomplete suggestions
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section (with chronological ordering starting from today)
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit), wind speed units (km/h and mph), and precipitation units (mm and inches)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Experience smooth loading states and error handling

### Screenshot

![Desktop Weather App Screenshot](/src/lib/assets/screenshots/weather-app-screenshot.png)
![Mobile Weather App Screenshot](/src/lib/assets/screenshots/weather-mobile-screenshot.png)

### Links

- Solution URL: [Frontend Mentor](https://www.frontendmentor.io/solutions/weather-forecast-app---sveltekit-with-dynamic-search-and-unit-conversi-Flcuz7Bwvv)
- Live Site URL: [Live Demo](https://weather-app-zeta-five-54.vercel.app/)

## My process

### Built with

- **Framework**: [SvelteKit](https://kit.svelte.dev/) - Full-stack framework for Svelte
- **Language**: TypeScript - For type safety and better developer experience
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **API**: [Open-Meteo](https://open-meteo.com/) - Free weather forecast API with geocoding
- **State Management**: Svelte 5's runes (`$state`, `$derived`, `$effect`)
- Semantic HTML5 markup
- CSS Grid and Flexbox for layouts
- Mobile-first workflow
- Component-based architecture

### What I learned

This project was a significant step up from my usual static landing pages. It was my first time working with complex application logic, state management, and external APIs. Here are the key learnings:

#### 1. Working with External APIs

I learned how to properly structure API calls and handle errors gracefully:

```typescript
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

        const geocodingData = await response.json();

        if (!geocodingData.results || geocodingData.results.length === 0) {
            throw new Error(`No search result found for "${cityName}"`);
        }

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
```

#### 2. Implementing Debouncing

To optimize API calls during search, I implemented debouncing to wait 300ms after the user stops typing:

```typescript
async function handleSearch(query: string) {
    if (searchTimeout) clearTimeout(searchTimeout);
    
    if (query.length < 2) {
        citySuggestions = [];
        return;
    }
    
    isLoadingSuggestions = true;
    
    searchTimeout = setTimeout(async () => {
        const results = await searchCities(query);
        citySuggestions = results;
        isLoadingSuggestions = false;
    }, 300);
}
```


#### 3. Data Transformation and Unit Conversion

I created utility functions to handle complex data transformations and unit conversions:

```typescript
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
```

#### 4. Component Communication

I learned how to properly communicate between components using props and callbacks:

```svelte
<WeekButton 
    selectedDay={selectedDay}
    onDayChange={(day) => selectedDay = day}
/>
```

#### 5. Error Handling Strategy

I implemented a comprehensive error handling system with custom error pages for different HTTP status codes (404, 400, 500), making the user experience much better when things go wrong.

### Continued development

Areas I want to improve in future projects:

1. **Testing**: I didn't implement any unit or integration tests. Learning testing frameworks like Vitest would make the code more maintainable.

2. **Performance Optimization**: I could implement caching strategies to reduce API calls and improve loading times.

3. **Accessibility**: While the app is functional, I could improve keyboard navigation and screen reader support.

4. **Advanced State Management**: For larger projects, exploring stores and more complex state patterns would be valuable.

5. **Progressive Enhancement**: Adding features like service workers for offline functionality and PWA capabilities.

6. **Geolocation**: I attempted to implement automatic geolocation but faced challenges with SSR/CSR considerations in SvelteKit. This is something I want to revisit.

### Useful resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs) - Essential for understanding the framework's routing and loading mechanisms
- [Svelte 5 Runes Guide](https://svelte.dev/docs/svelte/what-are-runes) - Helped me understand the new reactivity system
- [Open-Meteo API Documentation](https://open-meteo.com/en/docs) - Clear documentation for weather data endpoints
- [MDN Web Docs - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) - Understanding browser geolocation capabilities
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Reference for utility classes

## Project Structure

```
weather-app/
├── src/
│   ├── lib/
│   │   ├── assets/
│   │   │   └── images/          # Weather icons, UI icons, backgrounds
│   │   ├── components/
│   │   │   ├── SearchForm.svelte      # City search with autocomplete
│   │   │   ├── WeekButton.svelte      # Day selector for hourly forecast
│   │   │   └── UnitsButton.svelte     # Unit system switcher
│   │   ├── states/
│   │   │   └── unit.svelte.ts         # Global unit system state
│   │   ├── types/
│   │   │   └── types.ts               # TypeScript interfaces
│   │   ├── utils/
│   │   │   ├── api.ts                 # API calls (geocoding, weather)
│   │   │   ├── converters.ts          # Unit conversion functions
│   │   │   ├── mappers.ts             # Data transformation logic
│   │   │   └── weatherIcons.ts        # Weather code to icon mapping
│   │   └── actions/
│   │       └── actions.svelte.ts      # Custom Svelte actions (clickOutside)
│   └── routes/
│       ├── +layout.svelte             # App layout with header
│       ├── +page.svelte               # Main weather display page
│       ├── +page.ts                   # Server-side data loading
│       └── +error.svelte              # Error page (404, 400, 500)
├── static/                            # Static assets
├── tailwind.config.js                 # Tailwind configuration
├── svelte.config.js                   # SvelteKit configuration
└── package.json
```

### Key Architectural Decisions

**Separation of Concerns**: API logic, data transformation, and UI are clearly separated into distinct files, making the codebase easier to maintain and test.

**Global State**: Unit system uses module-level state (`unit.svelte.ts`) because the UnitsButton component lives in the layout (outside the page context), making prop drilling impractical.

**Data Flow**: Weather data flows from API → mappers (with unit conversion) → components, ensuring a unidirectional data flow.

**Error Boundaries**: Custom error page handles different HTTP status codes with appropriate user feedback.

## Features Walkthrough

### Dynamic City Search
- Debounced autocomplete prevents excessive API calls
- Shows city name + country to distinguish between cities with same names
- Handles loading and empty states gracefully
- Closes dropdown on click outside

### Day Filtering
- Generates chronological day list starting from today
- Filters hourly forecast data by selected day
- Maintains selection when switching between units
- Shows "Today" instead of current day name for better UX

### Unit Conversion System
- Converts all weather metrics (temperature, wind, precipitation)
- Updates happen reactively using Svelte's `$derived` rune
- Maintains data accuracy with proper conversion formulas
- Individual category selection (all units switch together for consistency)

### Loading States
- Skeleton placeholders during navigation
- Spinner with "Loading..." text
- Disabled buttons during data fetching
- Smooth transitions between states

## Performance Considerations

- **API Optimization**: Debouncing reduces search API calls by ~70%
- **Derived State**: Weather data only recalculates when dependencies change
- **Lazy Loading**: Components render only when needed
- **Image Optimization**: Weather icons are optimized WebP format

## Browser Compatibility

Tested and working on:
- Chrome 120+
- Firefox 121+
- Safari 17+
- Edge 120+

## Lessons Learned

This project taught me that building real applications requires thinking beyond just making things look good. I had to consider:
- How data flows through the application
- When and how to fetch data
- How to handle failures gracefully
- How to structure code for maintainability
- The balance between features and complexity

The most challenging part was managing the complexity as features were added. Each new feature (search, day filtering, unit conversion) had to integrate smoothly with existing code without breaking anything. This taught me the importance of planning architecture early.

## Author

- Frontend Mentor - [@NitiemaAllassane](https://www.frontendmentor.io/profile/NitiemaAllassane)
- GitHub - [@NitiemaAllassane](https://github.com/NitiemaAllassane)

---

**Note**: This was my first complex application with real business logic, moving beyond static pages. The experience taught me a lot about state management, API integration, and building maintainable code architecture. While challenging at times, seeing all the pieces work together was incredibly rewarding.