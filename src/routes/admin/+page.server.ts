import { redirect, fail, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, platform }) => {
	if (!locals.user) throw redirect(302, '/login');
	if (!locals.user.isAdmin) throw error(403, 'Not authorized');

	const allUsers = await locals.db.select().from(users);
	if (allUsers.length === 0) return { players: [] };

	const apiKey = platform?.env?.steam_webapi;
	const res = await fetch(
		`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${allUsers.map((u) => u.steamId).join(',')}`
	);
	if (!res.ok) error(502, 'Steam API request failed');

	const data = await res.json();
	// @ts-expect-error lazy again...
	const rawPlayers = data.response.players;

	const players = allUsers.map((u) => {
		const steamInfo = rawPlayers.find((p: any) => p.steamid === u.steamId);
		return {
			steamId: u.steamId,
			accepted: u.accepted,
			isAdmin: u.isAdmin,
			personaname: steamInfo?.personaname ?? '(unknown)',
			avatar: steamInfo?.avatar ?? null
		};
	});

	return { players };
};

export const actions = {
	accept: async ({ request, locals }) => {
		if (!locals.user?.isAdmin) return fail(403);
		const formData = await request.formData();
		const steamId = formData.get('steamId')?.toString();
		if (!steamId) return fail(400);
		await locals.db.update(users).set({ accepted: true }).where(eq(users.steamId, steamId));
		return { success: true };
	}
} satisfies Actions;
