import { DrizzleD1Database } from 'drizzle-orm/d1';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

declare global {
	namespace App {
		interface Platform {
			env: {
				steam_webapi: string;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		// interface Error {}
		interface Locals {
			db: DrizzleD1Database
			user: {
				steamId: string;
				displayName: string;
				accepted: boolean;
				isAdmin: boolean;
				quote: string | null;
				description: string | null;
				createdAt: string;
			} | null
		}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
