import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { users } from "../../db/schema";
import { eq } from 'drizzle-orm';


export const load: PageServerLoad = ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	if (!locals.user.accepted) {
		return { pending: true };
	}
	return { user: locals.user };
}

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user?.accepted) {
			return fail(403);
		}
		const formData = await request.formData();
		const description = formData.get('description')?.toString().slice(0, 500) ?? '';
		const quote = formData.get('quote')?.toString().slice(0, 100) ?? '';

		await locals.db
			.update(users)
			.set({ description, quote })
			.where(eq(users.steamId, locals.user.steamId));

		throw redirect(302, '/profile/' + locals.user?.steamId);
	}
} satisfies Actions;
