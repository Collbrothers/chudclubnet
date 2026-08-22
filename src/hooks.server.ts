import { drizzle } from 'drizzle-orm/d1';
import { sessions, users } from './db/schema.ts';
import { eq } from 'drizzle-orm';

export async function handle({ event, resolve }) {
	event.locals.db = drizzle(event.platform?.env.chudclubnet_db);
	event.locals.user = null;

	const sessionId = event.cookies.get('session');
	if (sessionId) {
		const result = await event.locals.db
			.select({ user: users, expiresAt: sessions.expiresAt })
			.from(sessions)
			.innerJoin(users, eq(sessions.steamId, users.steamId))
			.where(eq(sessions.id, sessionId));

		if (result.length > 0) {
			const { user, expiresAt } = result[0];
			if (expiresAt > new Date()) {
				event.locals.user = user;
			} else {
				await event.locals.db.delete(sessions).where(eq(sessions.id, sessionId));
				event.cookies.delete('session', { path: '/' });
			}
		}
	}

	return resolve(event);
}