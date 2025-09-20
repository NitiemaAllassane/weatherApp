<script lang="ts">
    import { fly } from "svelte/transition";
    import searchIcon from "$lib/assets/images/icon-search.svg";

    const citiesSuggestions = [
        {name: "Abidjan"},
        {name: "Yamoussoukro"},
        {name: "Daloa"},
        {name: "Quebec"},
    ];

    let isSearchDropdownOpen = $state(false);
    let cityName = $state("");
</script>


<search>
    <form action="" method="get">
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
                        bind:value={cityName}
                        class="w-full px-2 outline-none font-500 text-lg cursor-pointer"
                        autocomplete="off"
                        onfocus={() => isSearchDropdownOpen = true}
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
            {#each citiesSuggestions as city, index}
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
                            {city.name}
                        </span>
                    </button>
                </li>
            {/each}
        </ul>
    </div>
{/snippet}