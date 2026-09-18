<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex flex-col items-center rounded-lg border border-neutral-800 bg-neutral-900 p-8">
	{#if data.pending}
		<p class="text-2xl font-bold">Your account is pending approval.</p>
		<p>Check back later!</p>
		<a
			href={resolve('/')}
			class="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-400">Home</a
		>
	{:else}
		<h1 class="text-2xl">Edit Profile</h1>
		<form method="POST" class="flex w-full flex-col justify-center gap-2">
			<label for="description" class="flex flex-col">Description (max 500):</label>
			<textarea name="description" maxlength="500" class="rounded bg-neutral-600"
				>{data.user.description}</textarea
			>
			<label for="quote" class="flex flex-col">Quote (max 100):</label>
			<input name="quote" maxlength="100" value={data.user.quote} class="rounded bg-neutral-600" />
			<button
				type="submit"
				class="mt-4 rounded bg-orange-500 p-2 hover:cursor-pointer hover:bg-orange-400">Save</button
			>
		</form>
		<a
			href={resolve('/')}
			class="mt-4 w-full rounded p-2 text-center text-white ring ring-orange-500 hover:bg-orange-400"
			>Home</a
		>
	{/if}
</div>
