<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	// Components
	import TodoItem from '$lib/components/Todo/TodoItem.svelte';

	export let data: PageData;
	export let form: ActionData;

	let text: string = '';
</script>

<section class="todo">
	<div class="todo__container">
		<h1>Todos</h1>

		<div class="todo__list">
			{#each data.todos as todo}
				<TodoItem {todo} />
			{:else}
				<div class="todo__item">
					<span>No todos</span>
				</div>
			{/each}
		</div>

		<form action="?/addTodo" method="POST" use:enhance>
			<input
				type="text"
				name="text"
				class="todo__add-control"
				value={text}
				placeholder="Add new todo"
			/>
			<button type="submit">Add</button>
		</form>
	</div>
</section>

<style>
	.todo {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-block-start: 4rem;
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

	.todo__add-control {
		width: 100%;
		padding-block: 1rem;
		background: none;
		outline: none;
		border: none;
		border-bottom: 1px solid #ccc;
		font-size: 1.25rem;
		color: var(--primary-text-color);
	}
	.todo__list button {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		background: none;
		outline: none;
		border: none;
		cursor: pointer;
	}

	.todo__text {
		flex: 1;
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
