<script lang="ts">
    import dropdownIcon from "$lib/assets/images/icon-dropdown.svg"; 
</script>


<button 
    class="flex items-center gap-2 bg-neutral-600 
    py-2 px-3 rounded cursor-pointer"
>
    <span>Tuesday</span>
    <img 
        src={dropdownIcon} 
        alt="Dropdown Icon"
        aria-hidden="true"
    >
</button>