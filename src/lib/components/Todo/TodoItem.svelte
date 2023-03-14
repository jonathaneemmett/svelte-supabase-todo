<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { enhance, applyAction } from '$app/forms';

	// Components
	import Edit from '$lib/components/icons/Edit.svelte';
	import Close from '$lib/components/icons/Close.svelte';

	interface Todo {
		id: string;
		text: string;
		done: boolean;
	}

	export let todo: Todo;

	let edit: boolean = false;
	let editId: string = '';

	let text: string = todo.text || '';
	let done: boolean = todo.done || false;

	function setId(id: string) {
		return `<input type="hidden" name="id" value="${id || null}" />`;
	}

	async function update(id: string) {
		if (!id) return;

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

	function setEdit(id: string) {
		if (editId !== id) {
			editId = id;
			edit = true;
		} else if (editId === id) {
			editId = '';
			edit = false;
		}
	}

	function setText(e: Event) {
		text = (e?.target as HTMLInputElement)?.value || '';
	}
</script>

<div class="todo__item">
	<input
		type="checkbox"
		name="done"
		value={done}
		bind:checked={todo.done}
		on:change={() => update(todo.id)}
	/>
	{#if edit}
		<input
			type="text"
			class="todo__editing"
			name="text"
			value={todo.text}
			disabled={edit && editId === todo.id ? false : true}
			on:change={setText}
			on:keyup={(e) => {
				if (e.key === 'Enter' || e.key === 'Tab') {
					edit = false;
					editId = '';
					update(todo.id);
				}
			}}
			on:blur={() => {
				edit = false;
				editId = '';
				update(todo.id);
			}}
		/>
	{:else}
		<span class="todo__text" class:todo__item__done={todo.done}>{todo.text}</span>
	{/if}
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

<style>
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

	.todo__text {
		width: 100%;
		padding-inline-start: 0.5rem;
		font-size: 1.25rem;
		font-weight: 500;
	}

	button {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		background: none;
		outline: none;
		border: none;
		cursor: pointer;
	}
</style>
