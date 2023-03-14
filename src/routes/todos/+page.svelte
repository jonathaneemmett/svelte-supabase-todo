<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { enhance, applyAction } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	// Components
	import Close from '$lib/components/icons/Close.svelte';
	import Edit from '$lib/components/icons/Edit.svelte';

	export let data: PageData;
	export let form: ActionData;

	let { todos } = data;
	$: todos = data.todos;

	let updateForm: HTMLFormElement;

	let loading: boolean = false;
	let edit: boolean = false;

	let text: string = '';
	let editId: string = '';

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}

	function setId(id: string) {
		return `<input type="hidden" name="id" value="${id || null}" />`;
	}

	async function update() {
		const id = updateForm.id.value;
		const done = updateForm.done.value;
		const text = updateForm.text.value;
		if (!id || !done) return;

		const res = await fetch('/api/todo/update', {
			method: 'POST',
			body: JSON.stringify({
				id,
				text,
				done
			})
		});

		const data = await res.json();
		if (data.type === 'status') {
			invalidateAll();
		}

		applyAction(data);
	}

	function setEdit(id) {
		if (editId !== id) {
			editId = id;
			edit = true;
		} else if (editId === id) {
			editId = '';
			edit = false;
		}
	}
</script>

<section class="todo">
	<div class="todo__container">
		<h1>Todo</h1>

		<div class="todo__list">
			{#each todos as todo}
				<div class="todo__item">
					<form class="todo__update" bind:this={updateForm}>
						{@html setId(todo.id)}
						<input
							type="checkbox"
							name="done"
							value={todo.done}
							bind:checked={todo.done}
							on:change={update}
						/>
						<input
							type="text"
							class={edit && editId === todo.id ? 'todo__editing' : 'todo__not-editing'}
							class:todo__item__done={todo.done}
							name="text"
							value={todo.text}
							disabled={edit && editId === todo.id ? false : true}
							on:change={update}
							on:blur={() => {
								edit = false;
								editId = '';
								update();
							}}
						/>
					</form>
					<button on:click={() => setEdit(todo.id)} disabled={todo.done}>
						<Edit isEdit={edit && editId === todo.id} disabled={todo.done} />
					</button>
					<form class="todo__delete" action="?/deleteTodo" method="POST" use:enhance>
						{@html setId(todo.id)}
						<button type="submit">
							<Close />
						</button>
					</form>
				</div>
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
				value={form?.text || text}
				placeholder="Add new todo"
			/>
			<button type="submit">
				{#if loading}
					<span>Loading...</span>
				{:else}
					<span>Add</span>
				{/if}
			</button>
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

	.todo__update {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.todo__delete {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
	}

	.todo__item__done {
		text-decoration: line-through;
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

	.todo__editing {
		width: 100%;
		padding-block: 1rem;
		background: none;
		outline: none;
		border: none;
		border-bottom: 1px solid #ccc;
		font-size: 1.25rem;
		color: var(--primary-text-color);
	}

	.todo__not-editing {
		background: none;
		border: none;
		outline: none;
		padding: 0;
		font-size: 1.25rem;
		color: var(--primary-text-color);
		width: 100%;
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
