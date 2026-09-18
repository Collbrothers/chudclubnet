<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url: `https://chudclub.net/profile/${data.steamPlayer.steamid}`,
		mainEntity: {
			'@type': 'Person',
			name: data.steamPlayer.personaname,
			url: `https://chudclub.net/profile/${data.steamPlayer.steamid}`
		}
	};
</script>

<svelte:head>
	<link rel="canonical" href="https://chudclub.net/profile/{data.steamPlayer.steamid}" />
	<title>{data.steamPlayer.personaname} — ChudClub</title>
	<meta name="description" content={`${data.steamPlayer.personaname}'s profile on ChudClub`} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>
<section class="flex gap-8">
	<img src={data.steamPlayer.avatarfull} alt="Profile picture of {data.steamPlayer.personaname}" />
	<div>
		<a href={data.steamPlayer.profileurl} target="_blank"
			><h1 class="text-2xl font-bold text-orange-400 underline hover:text-orange-500">
				{data.steamPlayer.personaname}
			</h1></a
		>
		<p>{data.steamPlayer.description}</p>
	</div>
</section>
<section class="mt-8 flex justify-center">
	<blockquote>
		<p class="text-xl italic">{data.steamPlayer.quote}</p>
		<cite class="mt-2 block text-sm not-italic opacity-70">
			- {data.steamPlayer.personaname}
		</cite>
	</blockquote>
</section>
<section class="mt-8 flex justify-center gap-8">
	{#if data.userId === data.steamPlayer.steamid}
		<a
			href={resolve('/profile')}
			class="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-400">Edit Profile</a
		>
	{/if}
	<a
		href={resolve('/')}
		class="rounded-lg px-6 py-3 text-white ring ring-orange-500 hover:bg-orange-400">Home</a
	>
</section>
