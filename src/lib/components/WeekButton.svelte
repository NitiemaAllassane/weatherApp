<script lang="ts">
    import { fly } from "svelte/transition";
    import { navigating } from "$app/state";
    import { clickOutside } from "$lib/actions/actions.svelte";
    import dropdownIcon from "$lib/assets/images/icon-dropdown.svg"; 


    let { onLoading = navigating.to } = $props();
    
    interface DaySwitcher  {
        day: string,
        id: number
    }

    const weekSwitchers: DaySwitcher[] = [
        {day: "Monday", id: 1},
        {day: "Tuesday", id: 2},
        {day: "Wednesday", id: 3},
        {day: "Thursday", id: 4},
        {day: "Friday", id: 5},
        {day: "Saturday", id: 6},
        {day: "Sunday", id: 7},
    ];

    let selectedDay = $state(weekSwitchers[0].day);
    let isWeekDropdownOpen = $state(false);

    const toggleWeekMenu = () => isWeekDropdownOpen = !isWeekDropdownOpen;
</script>


<div 
    class="relative"
    use:clickOutside={() => isWeekDropdownOpen = false}
>

    <button 
        class="flex items-center gap-2 bg-neutral-600 
        py-2 px-3 rounded cursor-pointer"
        onclick={toggleWeekMenu}
        disabled={onLoading}
    >
        <span>
            {#if onLoading}
                __
            {:else}
                {selectedDay}
            {/if}
        </span>
        <img 
            src={dropdownIcon} 
            alt="Dropdown Icon"
            aria-hidden="true"
            class=" transition-transform duration-300 
            {isWeekDropdownOpen ? 'rotate-180' : 'rotate-0'} "
        >
    </button>

    {#if isWeekDropdownOpen}
        {@render weekDropdown()}
    {/if}

</div>


{#snippet weekDropdown()}
    <div 
        class="absolute right-0 mt-3 bg-neutral-800 border border-neutral-600 
        w-44 p-3 rounded-lg"
        transition:fly={{ y: -12, duration: 200 }}
    >
        <div class="flex flex-col items-start gap-2">
            {#each weekSwitchers as week}
                <button 
                    class="px-3 py-2 rounded-sm hover:bg-neutral-600 w-full 
                    text-start cursor-pointer transition-colors duration-100 ease-in-out
                    {selectedDay === week.day ? 'bg-neutral-600 ' : ''} "

                    onclick={() => {
                        selectedDay = week.day
                    }}
                >
                    <span class=" font-500">
                        {week.day}
                    </span>
                </button>
            {/each}
        </div>
    </div>
{/snippet}