<script lang="ts">
    import { fly } from "svelte/transition";
    import { navigating } from "$app/state";
    import { clickOutside } from "$lib/actions/actions.svelte";
    import dropdownIcon from "$lib/assets/images/icon-dropdown.svg"; 


    let { 
        onLoading = navigating.to, 
        selectedDay, 
        onDayChange 
    } = $props();
    
    interface DaySwitcher  {
        day: string,
        id: number
    }
    

    function generateDaysOrder(): DaySwitcher[] {
        const today = new Date();
        const daysOfWeek = [
            "Sunday", 
            "Monday", 
            "Tuesday", 
            "Wednesday", 
            "Thursday", 
            "Friday", 
            "Saturday"
        ];
        
        const result: DaySwitcher[] = [
            {day: "Today", id: 0}
        ];
        
        // Add the 6 days following
        for (let i = 1; i <= 6; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const dayName = daysOfWeek[futureDate.getDay()];
            
            result.push({
                day: dayName,
                id: i
            });
        }
        
        return result;
    }

    const weekSwitchers: DaySwitcher[] = generateDaysOrder();

    let isWeekDropdownOpen = $state(false);
    const toggleWeekMenu = () => isWeekDropdownOpen = !isWeekDropdownOpen;
</script>


<div 
    class="relative"
    use:clickOutside={() => isWeekDropdownOpen = false}
>
    <!-- Week button -->
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
                        onDayChange(week.day);
                        isWeekDropdownOpen = false;
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