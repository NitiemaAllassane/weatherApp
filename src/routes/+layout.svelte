<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Frontend Mentor | Weather app</title>
</svelte:head>

<Header  />
<main>
	<div class="container">
		{@render children?.()}
	</div>
</main>
<Footer  />