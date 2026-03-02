import { db } from '$lib/server/db';
import { repos } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Repo } from '$lib/types/savedRepos';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Get user's GitHub repos
	const githubRepos = await fetch(`https://api.github.com/users/${event.locals.user?.name}/repos`)
		.then(res => res.json())
		.catch(() => []);
	// Get user's saved repos from database
	let savedRepos: Repo[] = [];
	if (event.locals.user?.id) {
		savedRepos = await db.select().from(repos).where(eq(repos.userId, event.locals.user.id)) as Repo[];
	}

	return {
		user: event.locals.user,
		repos: githubRepos,
		savedRepos: savedRepos
	};
};