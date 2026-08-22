<script lang="ts">
    import {resolve} from "$app/paths";

    let { data } = $props();
</script>


<div class="flex items-center flex-col rounded-lg border border-neutral-800 bg-neutral-900 p-8">
    {#if data.pending}
        <p class="text-2xl font-bold">Your account is pending approval.</p>
        <p>Check back later!</p>
        <a href={resolve("/")} class="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-400 mt-6">Home</a>
    {:else}
        <h1 class="text-2xl">Edit Profile</h1>
        <form method="POST" class="flex flex-col justify-center w-full gap-2">
            <label for="description" class="flex flex-col">Description (max 500):</label>
            <textarea name="description" maxlength="500" class="bg-neutral-600 rounded">{data.user.description}</textarea>
            <label for="quote" class="flex flex-col">Quote (max 100):</label>
                <input name="quote" maxlength="100" value={data.user.quote} class="bg-neutral-600 rounded"/>
            <button type="submit" class="bg-orange-500 hover:bg-orange-400 rounded p-2 mt-4 hover:cursor-pointer">Save</button>
        </form>
        <a href={resolve("/")} class="rounded text-center  ring ring-orange-500 p-2 text-white hover:bg-orange-400 mt-4 w-full">Home</a>
    {/if}
</div>