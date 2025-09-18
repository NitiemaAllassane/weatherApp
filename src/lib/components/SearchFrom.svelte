<script lang="ts">
    import searchIcon from "$lib/assets/images/icon-search.svg";
</script>


<search>
    <form action="" method="get">
        <div 
            class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full 
            sm:w-[80%] md:w-2xl mx-auto"
        >
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
                    class="w-full px-2 outline-none font-500 text-lg"
                >
            </div>

            <button
                type="submit"
                class="inline-block w-full sm:w-auto py-3 px-5 bg-blue-500 font-500 text-neutral-50 rounded-lg 
                cursor-pointer hover:bg-blue-700 transition-colors duration-200 focus:outline-2 
                focus:outline-blue-700 focus:outline-offset-2"
            >
                Search
            </button>
        </div>
    </form>
</search>