<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	async function handleLogout() {
		const res = await fetch('/api/auth/logout', {
			method: 'POST'
		});

		const data = await res.json();

		if (data.type === 'success') {
			await invalidateAll();
		}

		applyAction(data);
	}
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/todos">Todo</a></li>
	</ul>
	{#if $page.data.session}
		<button on:click={handleLogout}>Logout</button>
	{:else}
		<a href="/login">Login</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		width: 100%;
		padding: 1rem;
	}

	nav ul {
		display: flex;
		list-style: none;
	}

	nav ul li {
		margin-right: 1rem;
	}

	button {
		border: none;
		background: none;
		color: #fff;
		cursor: pointer;
		font-size: 1rem;
	}
</style>
