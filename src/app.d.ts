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
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
