import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const body = await request.json();
	const { id, text, done } = body;

	if (!id)
		return new Response(
			JSON.stringify({
				status: 400,
				type: 'error',
				body: { message: 'Missing id', id, done, text }
			})
		);
	if (done === undefined)
		return new Response(
			JSON.stringify({
				status: 400,
				type: 'error',
				body: { message: 'Missing done', id, done, text }
			})
		);

	const { error } = await supabase.from('todos').update({ done, text }).match({ id });
	if (error)
		return new Response(
			JSON.stringify({ status: 500, type: 'error', body: { message: error, id, done, text } })
		);

	return new Response(JSON.stringify({ type: 'success', message: 'Todo Updated' }), {
		status: 200
	});
};
