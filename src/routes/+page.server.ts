import type { PageServerLoad } from './$types';
import { users } from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ platform, locals }) => {
	const apiKey = platform?.env?.steam_webapi;
	const acceptedUsers = await locals.db.select().from(users).where(eq(users.accepted, true));

	const res = await fetch(
		`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${acceptedUsers.map((u) => u.steamId).join(',')}`
	);
	if (!res.ok) return json({ error: 'Steam API request failed' }, { status: 502 });

	const data = await res.json();
	// @ts-expect-error Too lazy to create interface
	const rawPlayers: Player[] = data.response.players;
	if (!rawPlayers || rawPlayers.length == 0)
		return json({ error: 'No such profile' }, { status: 404 });

	const players = rawPlayers.map((player) => {
		const match = acceptedUsers.find((u) => u.steamId === player.steamid);
		return {
			...player,
			quote: match?.quote ?? null
		};
	});

	return { players, isLoggedIn: !!locals.user };
};