<script lang="ts">
    import type { Geocoding } from "$lib/types/types";
    import { searchCities } from "$lib/utils/api";
    import { fly } from "svelte/transition";

    import searchIcon from "$lib/assets/images/icon-search.svg";
    import loadingIcon from "$lib/assets/images/icon-loading.svg";
    import errorIcon from "$lib/assets/images/icon-error.svg";

    // cities searching states
    let citySuggestions = $state<Geocoding[]>([]); 
    let isLoadingSuggestions = $state(false);
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;

    // debounce function
    async function handleSearch(query: string) {
        if (searchTimeout) clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            citySuggestions = [];
            isSearchDropdownOpen = false;
            return;
        }
        
        isLoadingSuggestions = true;
        
        searchTimeout = setTimeout(async () => {
            const results = await searchCities(query);
            citySuggestions = results;
            isLoadingSuggestions = false;
            isSearchDropdownOpen = true;
        }, 300);
    }

    // input & dropdown states
    let isSearchDropdownOpen = $state(false);
    let cityName = $state("");

    $effect(() => {
        handleSearch(cityName);
    });
</script>


<search>
    <form  method="get">
        <div 
            class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full 
            sm:w-[80%] md:w-[612px] mx-auto"
        >
            <div class="relative w-full">
                <div 
                    class="flex items-center p-3 gap-2 bg-neutral-800 rounded-lg 
                    focus-within:outline-2 focus-within:outline-offset-2 w-full"
                >
                    <label for="city">
                        <img 
                            src={searchIcon} 
                            alt="Search Icon"
                            aria-hidden="true"
                        >
                    </label>
                    <input 
                        type="search" 
                        name="city" 
                        id="city"
                        placeholder="Search for a city, e.g., New York"
                        required
                        bind:value={cityName}
                        class="w-full px-2 outline-none font-500 text-lg cursor-pointer"
                        autocomplete="off"
                        onfocus={() => {
                            if (citySuggestions.length > 0) {
                                isSearchDropdownOpen = true;
                            }
                        }}
                        onblur={() => setTimeout(() => isSearchDropdownOpen = false, 250)}
                    >
                </div>

                {#if isSearchDropdownOpen}
                    {@render searchDropdown()}
                {/if}
            </div>

            <div class="w-full sm:w-auto">
                <button
                    type="submit"
                    class="inline-block w-full sm:w-auto py-3 px-5 bg-blue-500 font-500 
                    text-neutral-50 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors 
                    duration-200 focus:outline-2 focus:outline-blue-700 focus:outline-offset-2"
                >
                    Search
                </button>
            </div>
        </div>
    </form>
</search>


{#snippet searchDropdown()}
    <div 
        class=" bg-neutral-800 p-3 mt-3 rounded-lg absolute w-full z-20"
        transition:fly={{ y: -12, duration: 200 }}
    >
        <ul class="flex flex-col items-start gap-2">
            {#if isLoadingSuggestions}
                <div class="flex items-center gap-3">
                    <figure>
                        <img 
                            src={loadingIcon}
                            alt="Loading Icon"
                            class="animate-spin"
                        >
                    </figure>
                    <span>Search in progress</span>
                </div>
            {:else if citySuggestions.length === 0}
                <div class="flex items-center gap-3">
                    <figure>
                        <img 
                            src={errorIcon}
                            alt="Loading Icon"
                        >
                    </figure>
                    <span>No search result found !</span>
                </div>
            {:else}
                {#each citySuggestions as city}
                    <li class="w-full">
                        <button 
                            type="button"
                            class="p-2 w-full hover:bg-neutral-700 hover:border 
                            hover:border-neutral-600 rounded-lg text-start"
                            onclick={() => {
                                cityName = city.name;
                                isSearchDropdownOpen = false;
                            }}
                        >
                            <span>
                                {city.name}, {city.country}
                            </span>
                        </button>
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
{/snippet}