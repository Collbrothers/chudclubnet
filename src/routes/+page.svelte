<script lang="ts">
	import type { Player } from './types.ts';
	import Carousel from '$lib/Carousel.svelte';
	import { resolve } from "$app/paths"

	let { data } = $props();
	let players = $derived.by(() => {
		if (!data.players) {
			throw new Error('Uh oh!');
		}

		return data.players
			.filter((player: Player) => player.personaname.toLowerCase().includes('chudclub'))
			.map((player: Player) => ({
				...player,
				personaname: player.personaname.replace(/chudclub/gi, '').trim()
			}))
			.sort((a, b) => a.personaname.localeCompare(b.personaname));
	});

	let quotes = $derived(
			players
					.filter(({ quote }) => quote)
					.map(({ personaname, quote }) => ({
						text: quote as string,
						author: personaname
					}))
	);

	function fadeInOnView(node: Element) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.classList.add('opacity-100', 'translate-y-0');
					node.classList.remove('opacity-0', 'translate-y-4');
					observer.unobserve(node);
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(node);
	}
</script>

<div class="flex flex-col gap-4">
	<section class="flex flex-col gap-3">
		<h1 class="text-5xl font-bold tracking-wide uppercase lg:text-7xl">
			ChudClub
		</h1>
		<p class="text-olive-600">
			<span class="italic">"The chuddiest club of them all"</span> - {players[Math.floor(Math.random() * players.length)].personaname}
		</p>
		<div class="flex items-center gap-6">
			{#if data.isLoggedIn}
				<a class="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-400" href={resolve("/profile")}>View Profile</a>
			{:else}
				<a href={resolve("/login")}>
					<img src="https://community.fastly.steamstatic.com/public/images/signinthroughsteam/sits_01.png" alt="Sign in with Steam" />
				</a>
			{/if}
			<a
				href="#guidelines"
				class="rounded-lg ring ring-orange-500 px-6 py-3 text-white hover:bg-orange-500">Guidelines</a
			>
			<a href="#our-members" class="text-orange-400 underline hover:text-orange-700">
				Our Members
			</a>
		</div>
	</section>
	<section>
	</section>
	{#if quotes.length > 0}
	<section>
		<Carousel
			quotes={quotes}
		/>
	</section>
		{/if}
	<section class="flex flex-col gap-3" id="guidelines">
		<h2 class="text-4xl font-bold tracking-wide uppercase lg:text-6xl">Guidelines</h2>
		<ul class="flex flex-col">
			<li class="flex items-start gap-6 border-t border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">01</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Commit to the CHUD mindset</span> — add "ChudClub" before or after you steam name.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">02</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Master the CHUD look</span> — acquire the legendary CHUD appearance
					and make it instantly recognizable.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">03</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Develop maximum goblin energy</span> — be weird, chaotic, and completely
					unapologetic about it.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">04</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Study CHUD lore</span> — learn the history, traditions, memes, and
					important knowledge every CHUD should know.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">05</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Pass the CHUD test</span> — prove that you have what it takes by
					demonstrating your dedication to the CHUD lifestyle.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">06</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Find the CHUD Club</span> — locate the legendary CHUD Club and request
					membership.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">07</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Respect the CHUD code</span> — once you're in, follow the rules
					and never betray your fellow CHUDs.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">08</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Spread the CHUD spirit</span> — introduce other worthy people to
					the CHUD lifestyle.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-b border-neutral-800 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-orange-400 tabular-nums">09</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Achieve ultimate CHUD status</span> — once you've mastered everything
					above, you can officially call yourself a certified CHUD.
				</p>
			</li>
		</ul>
	</section>
	<section class="flex flex-col gap-6" id="our-members">
		<h2 class="text-4xl font-bold tracking-wide uppercase lg:text-6xl">Our Members</h2>
		<ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{#each players as player, i (player.steamid)}
				<li
					use:fadeInOnView
					style="transition-delay: {(i % 4) * 75}ms"
					class="translate-y-4 opacity-0 transition-all duration-500 ease-out"
				>
					<a
						href={resolve("/profile/[id]", { id: player.steamid })}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative flex flex-col items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:border-orange-500"
					>
						<img
							alt="Profile picture of {player.personaname}"
							src={player.avatarfull}
							class="size-20 rounded-full border-2 border-neutral-800 group-hover:border-orange-500"
						/>
						<p class="w-full truncate text-center font-semibold">{player.personaname}</p>
						<p class="text-sm text-neutral-600">
							CHUD since {new Date(player.timecreated * 1000).getFullYear()}
						</p>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</div>
