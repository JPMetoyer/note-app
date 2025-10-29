<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	  import "../app.scss";

	let { children } = $props();
	import Navbar from '../lib/components/navbar.svelte';
</script>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Navbar always visible -->
<Navbar />

<!-- Page content rendered below -->
<main>
	{@render children?.()}
</main>
