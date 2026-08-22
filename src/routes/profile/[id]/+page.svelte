<script lang="ts">
    import {resolve} from "$app/paths";

    let { data } = $props()
</script>
<section class="flex gap-8">
    <img src={data.steamPlayer.avatarfull} alt="Profile picture of {data.steamPlayer.personaname}"/>
    <div>
        <h1 class="text-2xl font-bold text-orange-400">{data.steamPlayer.personaname}</h1>
        <p>{data.steamPlayer.description}</p>
    </div>
</section>
<section class="flex justify-center mt-8">
    <blockquote>
        <p class="text-xl italic">{data.steamPlayer.quote}</p>
        <cite class="mt-2 block text-sm not-italic opacity-70">
            - {data.steamPlayer.personaname}
        </cite>
    </blockquote>
</section>
<section class="flex justify-center mt-8 gap-8">
    {#if data.userId === data.steamPlayer.steamid}
    <a href={resolve("/profile")} class="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-400">Edit Profile</a>
        {/if}
    <a href={resolve("/")} class="rounded-lg ring ring-orange-500 px-6 py-3 text-white hover:bg-orange-400">Home</a>
</section>