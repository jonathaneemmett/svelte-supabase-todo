import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const body = await request.json();
	const { id, text, done } = body;
	console.log('updateDone', id, done);
	if (!id) return { status: 400, body: { message: 'Missing id' } };
	if (!done) return { status: 400, body: { message: 'Missing done' } };

	const { error } = await supabase.from('todos').update({ done, text }).match({ id });
	if (error) return { status: 500, body: { message: error, id, done } };

	return new Response(JSON.stringify({ type: 'success', message: 'Todo Updated' }), {
		status: 200
	});
};
