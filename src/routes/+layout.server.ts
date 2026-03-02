import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { repos } from '$lib/server/db/schema';
import type { Repo } from '$lib/types/savedRepos';

export const load: LayoutServerLoad = async (event) => {
	// Get user's saved repos from database
	let teamaRepos: Repo[] = [];
	teamaRepos = await db.select().from(repos) as Repo[];
	return {
		user: event.locals.user,
		teamaRepos: teamaRepos
	};
};
