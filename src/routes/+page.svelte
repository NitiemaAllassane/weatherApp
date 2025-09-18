<script lang="ts">
    import SearchFrom from "$lib/components/SearchFrom.svelte";
    import WeekButton from "$lib/components/WeekButton.svelte";
    import sunny from "$lib/assets/images/icon-sunny.webp";
    import bgTodayLarge from "$lib/assets/images/bg-today-large.svg";
    import bgTodaySmall from "$lib/assets/images/bg-today-small.svg";

    const currentForecasts = [
        {title: "Feels like", info: "18°"},
        {title: "Humidity", info: "46%"},
        {title: "Wind", info: "14 km/h"},
        {title: "Precipitation", info: "00 mm"},
    ];

    const dailyForecasts = [
        {day: "Tue", forecastIllustration: sunny, minTemp: "00°", maxTemp: "00°"},
        {day: "Wed", forecastIllustration: sunny, minTemp: "00°", maxTemp: "00°"},
        {day: "Thu", forecastIllustration: sunny, minTemp: "00°", maxTemp: "00°"},
        {day: "Fri", forecastIllustration: sunny, minTemp: "00°", maxTemp: "00°"},
        {day: "Sat", forecastIllustration: sunny, minTemp: "00°", maxTemp: "00°"},
        {day: "Sun", forecastIllustration: sunny, minTemp: "00°", maxTemp: "00°"},
        {day: "Mon", forecastIllustration: sunny, minTemp: "00°", maxTemp: "00°"},
    ];

    const hourlyForecasts = [
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},

        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},
        {hour: "3 PM", info: "00°", iconImage: sunny},

    ];
</script>


<main>
    <header class="mb-8 md:mb-16">
        <h1 class=" text-5xl md:text-6xl font-700 font-title-font text-center mb-12">
            How's the sky looking today?
        </h1>

        <SearchFrom  />
    </header>

   <main class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] mb-16 gap-6">
        <section>
            <header class="mb-8">
                <div class="relative">
                    <picture class="w-full h-full">
                        <source 
                            media="(min-width: 40rem)" 
                            srcset={bgTodayLarge}
                            class=" w-full h-full object-cover"
                        >
                        <img 
                            src={bgTodaySmall} 
                            alt="Sky blue" 
                            aria-hidden="true"
                            class="w-full h-full object-cover"
                        >
                    </picture>
                    <div 
                        class="flex flex-col md:flex-row items-center justify-between absolute 
                        top-1/2 left-1/2 -translate-1/2 w-full md:p-16"
                    >
                        <div class="text-center md:text-start mb-4">
                            <h2 class="text-3xl md:text-4xl font-600 mb-2">
                                Berlin, Germany
                            </h2>
                            <p class="font-300 text-lg">
                                Tuesday, Aug 5, 2025
                            </p>
                        </div>

                        <div class="flex items-center">
                            <figure class="w-24 h-24 md:w-32 md:h-32">
                                <img 
                                    src={sunny} 
                                    alt="Sunny Icon"
                                    class=" w-full h-full"
                                >
                            </figure>
                            <h3 class=" font-700 text-6xl md:text-7xl italic">
                                20°
                            </h3>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Display currents forecast -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-6 mb-8">
                {#each currentForecasts as currentWeather}
                    <article 
                        class=" bg-neutral-800 p-4 md:p-6 rounded-xl border 
                        border-neutral-600 break-words"
                    >
                        <div>
                            <h4 class=" text-lg text-neutral-200 mb-3">
                                {currentWeather.title}
                            </h4>
                            <p class=" font-300 text-3xl">
                                {currentWeather.info}
                            </p>
                        </div>
                    </article>
                {/each}
            </div>

            <!-- Daily forecast -->
            <div>
                <h2 class="text-xl font-500 mb-4">
                    Daily forecast
                </h2>
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4">
                    {#each dailyForecasts as dailyWeather, index}
                        <article class=" bg-neutral-800 border border-neutral-600 p-3 rounded-xl">
                            <div>
                                <h3 class="text-center font-300 text-lg">
                                    {dailyWeather.day}
                                </h3>
                                
                                <figure class="flex items-center justify-center">
                                    <img 
                                        src={sunny} 
                                        alt="weather information icon {index}"
                                    >
                                </figure>

                                <div class="flex items-center justify-between">
                                    <span class="font-300">{dailyWeather.minTemp}</span>
                                    <span class="font-300">{dailyWeather.maxTemp}</span>
                                </div>
                            </div>
                        </article>
                    {/each}
                </div>
            </div>
        </section>

        <!-- Hourly forecast section -->
        <section>
            <div class=" bg-neutral-800 p-3 md:p-6 rounded-xl">
                <div>
                    <header class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-500">Hourly forecast</h2>
                        <WeekButton  />
                    </header>
                    <div class="grid grid-cols-1 gap-3 lg:overflow-auto lg:h-148 custom-scrollbar">
                        {#each hourlyForecasts as hourlyWeather}
                            <article class=" bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-1">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <figure class="w-12 h-12">
                                            <img 
                                                src={hourlyWeather.iconImage} 
                                                alt="Sun illusatrion"
                                                class="object-cover"
                                            >
                                        </figure>
                                        <time 
                                            datetime={hourlyWeather.hour}
                                            class=" text-lg font-300"
                                        >
                                            {hourlyWeather.hour}
                                        </time>
                                    </div>
                                    <div>
                                        <span class=" font-500">
                                            {hourlyWeather.info}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        {/each}
                    </div>
                </div>
            </div>
        </section>
   </main>
</main>