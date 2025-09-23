<script lang="ts">
    import { page } from "$app/state";
    import errorIcon from "$lib/assets/images/icon-error.svg";
    import { RefreshCcw } from "@lucide/svelte";

    import SearchForm from "$lib/components/SearchForm.svelte";
</script>

<main class="mb-16">
    {#if page.status === 404 || page.status === 400}
        <header class="mb-8 md:mb-16">
            <h1 class=" text-5xl xs:text-6xl font-700 font-bricolage text-center mb-12">
                How's the sky looking today?
            </h1>

            <SearchForm  />
            <p 
                class=" text-2xl text-center font-700 
                text-neutral-0 mt-12" 
            >
                {page.error?.message} 😓
            </p>
        </header>
    {:else}
        <div class="flex flex-col items-center text-center md:max-w-2xl mx-auto">
            <figure class="w-10 h-10 mb-6">
                <img 
                    src={errorIcon}
                    alt="Error Icon"
                    aria-hidden="true"
                    class="w-full h-full object-cover"
                >
            </figure>
            <h1 class="text-4xl md:text-5xl font font-bricolage font-700 mb-6">
                Something went wrong
            </h1>
            <p class=" font-500 text-neutral-200 mb-6 md:max-w-96 mx-auto">
                We couldn't connect the server (API error). Please try again in a few moments.
            </p>

            <button
                class="flex items-center gap-2 bg-neutral-800 p-3 rounded-lg cursor-pointer"
                onclick={() => window.location.reload()}
                aria-label="Retry loading the page"
            >
                <RefreshCcw  />
                <span>Retry</span>
            </button>
        </div>
    {/if}
    
</main>