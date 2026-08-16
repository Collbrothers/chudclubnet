import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Player } from './types.ts';

export const load: PageServerLoad = async ({ platform, fetch }) => {
	const apiKey = platform?.env?.steam_webapi;

	const res = await fetch(
		`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=76561198330488355,76561199230005954,76561198350797439,76561198408781709,76561198999159532,76561198327601046,76561198984099599`
	);

	if (!res.ok) return json({ error: 'Steam API request failed' }, { status: 502 });

	const data = await res.json();
	// @ts-expect-error Too lazy to create interface
	const players: Player[] = data.response.players;

	if (players.length == 0 || !players) return json({ error: 'No such profile' }, { status: 404 });

	return { players };
};
