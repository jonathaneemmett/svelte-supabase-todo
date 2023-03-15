import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		return new Response(JSON.stringify({ type: 'error', message: 'Not logged in' }));
	}

	await supabase.auth.signOut();

	return new Response(JSON.stringify({ status: 200, type: 'success', message: 'Logged out' }));
};
