<script lang="ts">
	let { data } = $props();

	let players = $derived.by(() => {
		if (!data.players) {
			throw new Error('Uh oh!');
		}
		return data.players
			.map((e) => ({
				...e,
				personaname: e.personaname.split('ChudClub')[1] ?? e.personaname
			}))
			.sort((a, b) => a.personaname.localeCompare(b.personaname));
	});

	let jacobName = $derived(
		players.find((p) => p.steamid === '76561199230005954')?.personaname ?? 'Jacob'
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
		<h1 class="text-5xl font-bold tracking-wide uppercase lg:text-7xl">ChudClub</h1>
		<p class="text-olive-600">
			<span class="italic">"The chuddiest club of them all"</span> - {jacobName}
		</p>
		<div class="flex items-center gap-6">
			<a
				href="#guidelines"
				class="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">Guidelines</a
			>
			<a href="#our-members" class="text-indigo-600 underline hover:text-indigo-700">
				Our Members
			</a>
		</div>
	</section>
	<section class="flex flex-col gap-3" id="guidelines">
		<h2 class="text-4xl font-bold tracking-wide uppercase lg:text-6xl">Guidelines</h2>
		<ul class="flex flex-col">
			<li class="flex items-start gap-6 border-t border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">01</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Embrace the CHUD mindset</span> — stop worrying about what normal
					people think and fully commit to the CHUD lifestyle.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">02</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Master the CHUD look</span> — acquire the legendary CHUD appearance
					and make it instantly recognizable.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">03</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Develop maximum goblin energy</span> — be weird, chaotic, and completely
					unapologetic about it.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">04</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Study CHUD lore</span> — learn the history, traditions, memes, and
					important knowledge every CHUD should know.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">05</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Pass the CHUD test</span> — prove that you have what it takes by
					demonstrating your dedication to the CHUD lifestyle.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">06</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Find the CHUD Club</span> — locate the legendary CHUD Club and request
					membership.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">07</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Respect the CHUD code</span> — once you're in, follow the rules
					and never betray your fellow CHUDs.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">08</span>
				<p class="text-lg leading-relaxed">
					<span class="font-semibold">Spread the CHUD spirit</span> — introduce other worthy people to
					the CHUD lifestyle.
				</p>
			</li>
			<li class="flex items-start gap-6 border-t border-b border-olive-300 py-6">
				<span class="w-12 shrink-0 text-3xl font-bold text-indigo-600 tabular-nums">09</span>
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
			{#each data.players as player, i (player.steamid)}
				{@const isDev = player.steamid === '76561198350797439'}
				<li
					use:fadeInOnView
					style="transition-delay: {(i % 4) * 75}ms"
					class="translate-y-4 opacity-0 transition-all duration-500 ease-out"
				>
					<a
						href={player.profileurl}
						target="_blank"
						rel="noopener noreferrer"
						title={isDev
							? 'Developer privileges: unlimited CHUD authority, zero accountability'
							: undefined}
						class="group relative flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors
                    {isDev
							? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-600 ring-offset-2 ring-offset-olive-200'
							: 'border-olive-300 bg-olive-50 hover:border-indigo-600'}"
					>
						{#if isDev}
							<span
								class="absolute -top-2 -right-2 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold tracking-wide text-white uppercase"
							>
								Dev
							</span>
						{/if}
						<img
							alt="Profile picture of {player.personaname}"
							src={player.avatarfull}
							class="size-20 rounded-full border-2 {isDev
								? 'border-indigo-600'
								: 'border-olive-300 group-hover:border-indigo-600'}"
						/>
						<p class="w-full truncate text-center font-semibold">{player.personaname}</p>
						<p class="text-sm text-olive-600">
							CHUD since {new Date(player.timecreated * 1000).getFullYear()}
						</p>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</div>
