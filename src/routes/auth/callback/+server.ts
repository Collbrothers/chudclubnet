import { error, redirect } from '@sveltejs/kit';
import { users, sessions } from '$lib/../db/schema';

export async function GET({ url, locals, platform, cookies }) {
	const params = new URLSearchParams(url.search);
	params.set('openid.mode', 'check_authentication');

	const verifyRes = await fetch('https://steamcommunity.com/openid/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: params.toString()
	});
	const verifyText = await verifyRes.text();

	if (!verifyText.includes('is_valid:true')) {
		throw error(401, 'Steam verification failed');
	}

	const claimedId = params.get('openid.claimed_id');
	const steamId = claimedId?.split('/').pop();

	if (!steamId) throw error(400, 'Could not parse Steam ID');

	const apiKey = platform?.env.steam_webapi;
	const summaryRes = await fetch(
		`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
	);
	const summaryData = await summaryRes.json();
	// @ts-expect-error too lazy to create interface... once again
	const player = summaryData.response?.players?.[0];

	if (!player) throw error(502, 'Could not fetch Steam profile');

	await locals.db
		.insert(users)
		.values({
			steamId: steamId
		})
		.onConflictDoNothing({ target: users.steamId });

	const sessionId = crypto.randomUUID();
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
	await locals.db.insert(sessions).values({
		id: sessionId,
		steamId,
		expiresAt
	}).onConflictDoNothing();

	cookies.set('session', sessionId, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		expires: expiresAt
	});

	throw redirect(302, '/');
}