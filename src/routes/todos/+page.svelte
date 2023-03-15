<script lang="ts">
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import type { ActionData, PageData } from './$types';

	// Components
	import TodoItem from '$lib/components/Todo/TodoItem.svelte';
	import AddItem from '$lib/components/Todo/AddItem.svelte';

	export let data: PageData;
	export let form: ActionData;

	async function update(e: CustomEvent) {
		const { id, text, done } = e.detail;

		if (!id || !text || done === undefined) return;

		const res = await fetch('/api/todo/update', {
			method: 'POST',
			body: JSON.stringify({
				id,
				text,
				done
			})
		});

		const data = await res.json();

		if (data.type === 'success') {
			invalidateAll();
		} else if (data.type === 'error') {
			console.error(data);
		}

		applyAction(data);
	}
</script>

<section class="todo">
	<div class="todo__container">
		<h1>Todos</h1>
		<div class="todo__list">
			{#each data.todos as todo}
				<TodoItem {todo} on:edit={update} />
			{:else}
				<div class="todo__item">
					<span>No todos</span>
				</div>
			{/each}
		</div>

		<AddItem />
		<div class="todo__code">
			<a href="https://github.com/jonathaneemmett/svelte-supabase-todo">See the code</a>
		</div>
	</div>
</section>

<style>
	.todo {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-block-start: 4rem;
		padding-inline: 1rem;
	}

	.todo__container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 500px;
		margin-inline: auto;
	}

	h1 {
		font-size: 2rem;
		font-weight: 500;
		border-bottom: 1px solid #ccc;
		padding-block-end: 0.5rem;
		margin-block-end: 0.5rem;
	}

	.todo__list {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
	}

	.todo__item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 0.5rem;
		padding-inline: 0.5rem;
		font-size: 1.25rem;
		width: 100%;
		gap: 0.5rem;
	}

	.todo__code {
		display: flex;
		justify-content: flex-end;
		margin-block-start: 1rem;
	}
</style>
