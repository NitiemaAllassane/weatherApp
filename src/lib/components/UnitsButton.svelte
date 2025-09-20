<script lang="ts">
    import { fly } from "svelte/transition";
    import { clickOutside } from "$lib/actions/actions.svelte";

    import unitIcon from "$lib/assets/images/icon-units.svg";
    import dropdownIcon from "$lib/assets/images/icon-dropdown.svg";
    import checkMarkIcon from "$lib/assets/images/icon-checkmark.svg";

    interface Unit {
        name: string;
        shortName: string | null;
        symbol: string;
    }

    interface UnitSwitcher {
        category: string,
        metric: Unit;
        imperial: Unit;
    }


    const unitSwitchers: UnitSwitcher[] = [
        {
            category: "Temperature", 
            metric: { name: "Celsius", shortName: "Celsius", symbol: "°C" },
            imperial: { name: "Fahrenheit", shortName: "Fahrenheit", symbol: "°F" }
        },
        {
            category: "Wind Speed", 
            metric: { name: "Kilometers per hour", shortName: null, symbol: "km/h" },
            imperial: { name: "Miles per hour", shortName: null, symbol: "mph" }
        },
        {
            category: "Precipitation", 
            metric: { name: "Millimeters", shortName: "Millimeters", symbol: "mm" },
            imperial: { name: "Inches", shortName: "Inches", symbol: "in" }
        }
    ];

    let isUnitsDropdownOpen = $state(false);
    const toggleUnitsDropdown = () => isUnitsDropdownOpen = !isUnitsDropdownOpen;
</script>


<div 
    class="relative"
    use:clickOutside={() => isUnitsDropdownOpen = false}
>

    <button
        class="bg-neutral-800 py-2 px-3 md:py-2.5 md:px-5 rounded cursor-pointer"
        aria-label="Open units dropdown"
        onclick={toggleUnitsDropdown}
    >
        <div class="flex items-center gap-2">
            <img 
                src={unitIcon} 
                alt="Unit Icon"
                aria-hidden="true"
            >
            <span class="font-300">Units</span>
            <img 
                src={dropdownIcon} 
                alt="Dropdown Icon"
                aria-hidden="true"
                class="{isUnitsDropdownOpen ? 'rotate-180': 'rotate-0'} 
                transition-transform duration-300"
            >
        </div>
    </button>

    {#if isUnitsDropdownOpen}
        {@render unitDropdown()}
    {/if}
</div>


<!-- unitDropdown -->
{#snippet unitDropdown()}
    <div 
        class="absolute right-0 mt-3 bg-neutral-800 p-3 rounded-lg border 
        border-neutral-600 w-56 z-30"
        transition:fly={{ y: -12, duration: 200 }}
    >
        <div>
            <button class=" w-full text-start hover:bg-neutral-600 px-2 py-1 rounded-lg cursor-pointer">
                <span class="text-neutral-0 font-500 text-lg">
                    Switch to Imperial
                </span>
            </button>

            {#each unitSwitchers as unit, index}
                <div class="{index !== unitSwitchers.length - 1 ? 'border-b-2 border-neutral-600 pb-3' : ''} mt-3 ">
                    <h3 class="text-sm font-500 text-neutral-300 mb-2">
                        {unit.category}
                    </h3>
                    <div class="flex flex-col gap-2.5">

                        <!-- metric buttons -->
                        <button 
                            class="flex items-center justify-between bg-neutral-600 
                            hover:bg-neutral-600 px-2 py-1 rounded-lg"
                        >
                            <span>
                                {
                                    unit.metric.shortName ? 
                                    `${unit.metric.shortName} (${unit.metric.symbol})` : 
                                    unit.metric.symbol
                                }
                            </span>
                            <span>
                                <img 
                                    src={checkMarkIcon}
                                    alt="CheckMarkIcon"
                                    aria-hidden="true"
                                >
                            </span>
                        </button>

                        <!-- imperial buttons -->
                        <button 
                            class="flex items-center justify-between hover:bg-neutral-600 
                            px-2 py-1 rounded-lg"
                        >
                            <span>
                                {
                                    unit.imperial.shortName ? 
                                    `${unit.imperial.shortName} (${unit.imperial.symbol})` : 
                                    unit.imperial.symbol
                                }
                            </span>
                            <!-- <span>
                                <img 
                                    src={checkMarkIcon}
                                    alt="CheckMarkIcon"
                                    aria-hidden="true"
                                >
                            </span> -->
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/snippet}