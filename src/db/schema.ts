import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	steamId: text('steam_id').primaryKey(),
	accepted: integer('accepted', { mode: 'boolean' }).notNull().default(false),
	isAdmin: integer('is_admin', { mode: 'boolean' }).notNull().default(false),
	quote: text('quote'),
	description: text('description'),
	createdAt: text()
		.$defaultFn(() => new Date().toISOString())
		.notNull()
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	steamId: text('steam_id')
		.notNull()
		.references(() => users.steamId),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});