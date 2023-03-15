import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(303, '/login');
	}

	const { data: todos } = await supabase
		.from('todos')
		.select('*')
		.eq('user_id', session.user.id)
		.order('id', { ascending: false });

	return { todos };
};

export const actions: Actions = {
	addTodo: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			return fail(401);
		}

		const data = Object.fromEntries(await request.formData());
		const { text } = data;
		if (!text) return fail(400, { message: 'Missing text' });

		const { error } = await supabase
			.from('todos')
			.insert({ user_id: session?.user.id, text, created_at: new Date() });
		if (error) return fail(500, { message: error, text });

		return { status: 200, body: { message: 'Todo added' } };
	},
	updateDone: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			return fail(401);
		}
		const data = Object.fromEntries(await request.formData());
		const { id, done } = data;

		if (!id) return fail(400, { message: 'Missing id' });
		if (!done) return fail(400, { message: 'Missing done' });

		const { error } = await supabase
			.from('todos')
			.update({ user_id: session?.user.id, done })
			.match({ id });

		if (error) return fail(500, { message: error, id, done });

		return { status: 200, body: { message: 'Todo updated' } };
	},
	deleteTodo: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			return fail(401);
		}
		const data = Object.fromEntries(await request.formData());
		const { id } = data;
		if (!id) return fail(400, { message: 'Missing id' });

		const { error } = await supabase.from('todos').delete().match({ id });
		if (error) return fail(500, { message: error, id });

		return { type: 'success', status: 200, body: { message: 'Todo deleted' } };
	}
};
