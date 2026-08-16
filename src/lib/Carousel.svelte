<script lang="ts">
	interface Quote {
		text: string;
		author: string;
	}

	let { quotes }: { quotes: Quote[] } = $props();

	let index = $state(0);
	let paused = $state(false);

	$effect(() => {
		if (paused || quotes.length <= 1) return;

		const timer = setInterval(() => {
			index = (index + 1) % quotes.length;
		}, 5000);

		return () => clearInterval(timer);
	});

	function goTo(i: number) {
		index = i;
	}
</script>

<div
	class="mx-auto max-w-xl px-4 py-8 text-center"
	role="region"
	aria-label="Quote carousel"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
	onfocusin={() => (paused = true)}
	onfocusout={() => (paused = false)}
	tabindex="-1"
>
	{#key index}
		<blockquote class="animate-[fade_0.5s_ease]">
			<p class="text-xl italic">"{quotes[index].text}"</p>
			<cite class="mt-2 block text-sm not-italic opacity-70">
				- {quotes[index].author}
			</cite>
		</blockquote>
	{/key}

	<div class="mt-6 flex justify-center gap-2">
		{#each quotes as _, i (i)}
			<button
				class="h-2 w-2 cursor-pointer rounded-full border-none p-0 transition-colors {i === index
					? 'bg-white/70'
					: 'bg-white/20'}"
				aria-label={`Go to quote ${i + 1}`}
				onclick={() => goTo(i)}
			></button>
		{/each}
	</div>
</div>
