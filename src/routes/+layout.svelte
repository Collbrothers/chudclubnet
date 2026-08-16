<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<main class="mx-auto max-w-3xl bg-olive-200 px-4 py-16 text-olive-900">
	{@render children()}
</main>
<footer class="mx-auto mb-6 max-w-3xl text-center text-olive-900">
	<p>Made with &#129505; from Sweden</p>
</footer>
