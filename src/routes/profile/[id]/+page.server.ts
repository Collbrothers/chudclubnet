import type { PageServerLoad } from "./$types"
import { users } from '../../../db/schema.ts';
import { and, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { Player } from '../../types.ts';

export const load: PageServerLoad = async ({ params, locals, platform }) => {
	const player =  await locals.db.select().from(users).where(and(eq(users.accepted, true),eq(users.steamId, params.id)));
	const apiKey = platform?.env?.steam_webapi;

	if(player.length > 0) {
		const res = await fetch(
			`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${player[0].steamId}`
		);

		if (!res.ok) error(502, `Steam API request failed`);

		const data = await res.json();
		// @ts-expect-error Too lazy to create interface
		const steamPlayer: Player = data.response.players[0];
		steamPlayer["quote"] = player[0].quote;
		steamPlayer["description"] = player[0].description;

		return { steamPlayer, userId: locals.user?.steamId };
	}

	error(404, "Not Found")
}