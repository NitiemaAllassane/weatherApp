<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from "$lib/assets/images/app-favicon.png";
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="shortcut icon" href={favicon} type="image/x-icon">
	<title>Weather Now</title>
</svelte:head>

<Header  />
<main>
	<div class="container">
		{@render children?.()}
	</div>
</main>
<Footer  />