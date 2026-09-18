<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>
<h1 class="mb-8 text-2xl font-semibold tracking-tight">Admin</h1>

<ul class="flex flex-col gap-3">
	{#each data.players as player (player.steamId)}
		<li
			class="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3"
		>
			<div class="flex min-w-0 items-center gap-3">
				{#if player.avatar}
					<img src={player.avatar} alt="" class="h-10 w-10 shrink-0 rounded-full" />
				{/if}
				<div class="min-w-0">
					<p class="truncate font-medium">{player.personaname}</p>
					<p class="truncate text-xs text-neutral-500">{player.steamId}</p>
				</div>
			</div>

			<div class="shrink-0">
				{#if player.accepted}
					<span
						class="rounded border border-green-900 bg-green-950 px-2 py-1 text-xs font-medium text-green-400"
					>
						Accepted
					</span>
				{:else}
					<form method="POST" action="?/accept">
						<input type="hidden" name="steamId" value={player.steamId} />
						<button
							type="submit"
							class="rounded-md bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
						>
							Accept
						</button>
					</form>
				{/if}
			</div>
		</li>
	{/each}

	{#if data.players.length === 0}
		<li class="text-sm text-neutral-500">No users yet.</li>
	{/if}
</ul>
