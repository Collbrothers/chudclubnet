import { users } from '../../db/schema.ts';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { Player } from '../types.ts';

export async function GET({ locals }) {
	const baseUrl = 'https://chudclub.net';
	const acceptedUsers = await locals.db.select().from(users).where(eq(users.accepted, true));

	const urls = [
		{ loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
		...acceptedUsers.map((player) => ({
			loc: `${baseUrl}/profile/${player.steamId}`,
			priority: '0.7',
			changefreq: 'weekly'
		}))
	];

	const urlEntries = urls
		.map(
			(u) => `<url>
<loc>${u.loc}</loc>
<changefreq>${u.changefreq}</changefreq>
<priority>${u.priority}</priority>
</url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
