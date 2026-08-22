<script lang="ts">
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
</script>

<h1 class="text-2xl font-semibold tracking-tight mb-8">Admin</h1>

<ul class="flex flex-col gap-3">
    {#each data.players as player}
        <li class="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3">
            <div class="flex items-center gap-3 min-w-0">
                {#if player.avatar}
                    <img src={player.avatar} alt="" class="h-10 w-10 rounded-full shrink-0" />
                {/if}
                <div class="min-w-0">
                    <p class="font-medium truncate">{player.personaname}</p>
                    <p class="text-xs text-neutral-500 truncate">{player.steamId}</p>
                </div>
            </div>

            <div class="shrink-0">
                {#if player.accepted}
					<span class="text-xs font-medium text-green-400 px-2 py-1 rounded bg-green-950 border border-green-900">
						Accepted
					</span>
                {:else}
                    <form method="POST" action="?/accept">
                        <input type="hidden" name="steamId" value={player.steamId} />
                        <button
                                type="submit"
                                class="text-sm font-medium px-3 py-1.5 rounded-md bg-neutral-50 text-neutral-950 hover:bg-neutral-200 transition-colors"
                        >
                            Accept
                        </button>
                    </form>
                {/if}
            </div>
        </li>
    {/each}

    {#if data.players.length === 0}
        <li class="text-neutral-500 text-sm">No users yet.</li>
    {/if}
</ul>