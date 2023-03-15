<script lang="ts">
	import '$styles/global.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
</script>

<svelte:head>
	<title>Todo</title>
</svelte:head>

<Navbar />
<h1>SvelteKit - Supabase Demo</h1>
<slot />

<style>
	h1 {
		text-align: center;
		margin-block-end: 1rem;
		font-size: 3rem;
	}
</style>
