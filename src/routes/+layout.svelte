<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/favicon.png" /></svelte:head>
<main class="mx-auto max-w-3xl bg-neutral-950 px-4 py-16 text-neutral-50 flex-1">
	{@render children()}
</main>
<footer class="mx-auto pb-6 max-w-3xl text-center text-neutral-50">
	<p>Made with &#129505; from Sweden</p>
</footer>
