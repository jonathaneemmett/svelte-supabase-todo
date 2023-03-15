<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="login">
	<h1>Magic Login</h1>
	<div class="login__container">
		<div class="col-6 form-widget">
			<Auth
				supabaseClient={data.supabase}
				view="magic_link"
				redirectTo={`${data.url}/waiting?redirect=${data.url}`}
				showLinks={false}
				appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
			/>
		</div>
	</div>
</section>

<style>
	.login {
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
	}

	.login__container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-block: 1rem;
	}

	.form-widget {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
		max-width: 400px;
	}

	/* .form-widget > .button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: #444444;
		text-transform: none !important;
		transition: all 0.2s ease;
	}

	.form-widget .button:hover {
		background-color: #2a2a2a;
	}

	.form-widget .button > .loader {
		width: 17px;
		animation: spin 1s linear infinite;
		filter: invert(1);
	} */
</style>
