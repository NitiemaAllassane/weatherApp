<script lang="ts">
    import unitIcon from "$lib/assets/images/icon-units.svg";
    import dropdownIcon from "$lib/assets/images/icon-dropdown.svg";
</script>

<button
    class="bg-neutral-800 py-2 px-3 md:py-2.5 md:px-5 rounded cursor-pointer"
    aria-label="Open units dropdown"
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
        >
    </div>
</button>