<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	$: {
		const redirectTo = $page.url.searchParams.get('redirect');

		if (browser && data.session) {
			goto(redirectTo || '/');
		}
	}
</script>

<section class="waiting">
	<p>“Better than a thousand hollow words, is one word that brings peace.” – Buddha</p>
</section>

<style>
	.waiting {
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
