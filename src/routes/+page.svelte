<script lang="ts">
    /**
     * TODO: Gerer les erreurs.
     * TODO: Dynamiser le contenue du dropdown de recherche
     * TODO: Switch entre les jours avec WeekButton
     * TODO: Convertions des données avec Units Button
    */
    import { navigating, page } from "$app/state";
    import { fly } from "svelte/transition";
    import spinner from "$lib/assets/images/spinner.svg";
    import { getWeatherIcon } from "$lib/utils/weatherIcons.js";

    import { 
        mapCurrentForecasts, 
        mapDailyForecasts,
        mapHourlyForecasts
    } from "$lib/utils/mappers.js";

    import SearchForm from "$lib/components/SearchForm.svelte";
    import WeekButton from "$lib/components/WeekButton.svelte";
    import bgTodayLarge from "$lib/assets/images/bg-today-large.svg";
    import bgTodaySmall from "$lib/assets/images/bg-today-small.svg";


    let { data } = $props();

    const currentForecasts = $derived(mapCurrentForecasts(data.weatherData));
    const dailyForecasts = $derived(mapDailyForecasts(data.weatherData));
    const hourlyForecasts = $derived(mapHourlyForecasts(data.weatherData));

    const currentWeatherIcon = $derived(getWeatherIcon(data.weatherData.current.weather_code));
</script>


<main>
    <header class="mb-8 md:mb-16">
        <h1 class=" text-5xl xs:text-6xl font-700 font-bricolage text-center mb-12">
            How's the sky looking today?
        </h1>

        <SearchForm  />
    </header>

   <main class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] mb-16 gap-6">
        <section>
            <header class="mb-8">
                <div class="relative">
                    {#if navigating.to}
                        <div class="flex items-center justify-center bg-neutral-800 w-full h-[285px] rounded-2xl">
                           <div class=" flex flex-col items-center">
                                <img 
                                    src={spinner}
                                    alt="Spinner"
                                    class="w-24 h-24"
                                >
                                <span class="font-500">Loading...</span>
                           </div>
                        </div>
                    {:else}
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
                                <h2 
                                    class="text-3xl md:text-4xl font-600 mb-2" 
                                    in:fly={{ y: 16, duration: 300, delay: 150 }}
                                >
                                    <!-- Berlin, Germany -->
                                    {data.geocoding.name}, {data.geocoding.country}
                                </h2>
                                <p 
                                    class="font-300 text-lg"
                                    in:fly={{ x: 24, duration: 300, delay: 300 }}
                                >
                                    <!-- Tuesday, Aug 5, 2025 -->
                                    {data.weatherData.current.time.toDateString()}
                                </p>
                            </div>

                            <div class="flex items-center">
                                <figure 
                                    class="w-24 h-24 md:w-32 md:h-32"
                                    in:fly={{ y: 20, duration: 300, delay: 300 }}
                                >
                                    <img 
                                        src={currentWeatherIcon} 
                                        alt="Sunny Icon"
                                        class=" w-full h-full"
                                    >
                                </figure>
                                <h3 
                                    class=" font-700 text-6xl md:text-7xl italic"
                                    in:fly={{ x: 24, duration: 300, delay: 500 }}
                                >
                                    <!-- 20° -->
                                    {data.weatherData.current.temperature_2m.toFixed(0)}°
                                </h3>
                            </div>
                        </div>
                    {/if}
                </div>
            </header>

            <!-- Display currents forecast -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-6 mb-8">
                {#each currentForecasts as currentWeather}
                    <article 
                        class=" bg-neutral-800 p-3 xs:p-4 md:p-6 rounded-xl border 
                        border-neutral-600 break-words"
                    >
                        <div>
                            <h4 class=" text-lg text-neutral-200 mb-3">
                                {currentWeather.title}
                            </h4>
                            <p class=" font-300 text-3xl">
                                {#if navigating.to}
                                    __
                                {:else}
                                    {currentWeather.info}
                                {/if}
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
                        <article class=" bg-neutral-800 border border-neutral-600 p-2 xs:p-3 rounded-xl">
                            {#if navigating.to}
                                <div class="h-40"></div>
                            {:else}
                                <div>
                                    <h3 class="text-center font-300 text-lg">
                                        {dailyWeather.day}
                                    </h3>
                                    
                                    <figure class="flex items-center justify-center">
                                        <img 
                                            src={dailyWeather.weatherIcon} 
                                            alt="weather information icon {index}"
                                        >
                                    </figure>

                                    <div class="flex items-center justify-between">
                                        <span class="font-300">{dailyWeather.minTemp}</span>
                                        <span class="font-300">{dailyWeather.maxTemp}</span>
                                    </div>
                                </div>
                            {/if}
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
                        <WeekButton onLoading={navigating.to} />
                    </header>
                    <div class="grid grid-cols-1 gap-3 overflow-auto h-148 custom-scrollbar">
                        {#each hourlyForecasts as hourlyWeather}
                            <article class=" bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-1">
                                {#if navigating.to}
                                    <div class=" py-5"></div>
                                {:else}
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <figure class="w-12 h-12">
                                                <img 
                                                    src={hourlyWeather.weatherIcon} 
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
                                                {hourlyWeather.temperature}
                                            </span>
                                        </div>
                                    </div>
                                {/if}
                            </article>
                        {/each}
                    </div>
                </div>
            </div>
        </section>
   </main>
</main>