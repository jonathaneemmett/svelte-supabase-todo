<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	let newText: string = '';

	let ref: HTMLInputElement;

	onMount(() => {
		ref.focus();
	});
</script>

<form
	action="?/addTodo"
	method="POST"
	use:enhance={({ form }) => {
		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidateAll();
			}
			ref.value = '';
			await applyAction(result);
		};
	}}
>
	<input
		type="text"
		name="text"
		id="text"
		value={newText}
		placeholder="Add new todo"
		bind:this={ref}
	/>
	<button type="submit">Add</button>
</form>

<style>
	input[type='text'] {
		width: 100%;
		padding-block: 1rem;
		background: none;
		outline: none;
		border: none;
		border-bottom: 1px solid #ccc;
		font-size: 1.25rem;
		color: var(--primary-text-color);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		margin-inline: auto;
	}

	button {
		width: 100%;
		padding-block: 1rem;
		font-size: 1.25rem;
		background: none;
		outline: none;
		border: 1px solid #ccc;
		cursor: pointer;
		color: #ccc;
		font-weight: 500;
	}

	button:hover {
		color: #000;
		border-color: #000;
	}
</style>
