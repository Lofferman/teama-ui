import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { repos } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const repoId = formData.get('repoId')?.toString() ?? null;
		const repoName = formData.get('repoName')?.toString() ?? '';
		const repoUrl = formData.get('repoUrl')?.toString() ?? '';
		const languagesUrl = formData.get('languagesUrl')?.toString() ?? '';
		const owner = formData.get('owner')?.toString() ?? '';
		const isPrivate = formData.get('isPrivate') === 'true';
		const name = formData.get('name')?.toString() ?? '';
		const tagline = formData.get('tagline')?.toString() ?? '';
		const description = formData.get('description')?.toString() ?? null;
		const techStack = formData.get('techStack')?.toString() ?? '';
		const thumbnail = formData.get('thumbnail')?.toString() ?? null;
		const contact = formData.get('contact')?.toString() ?? null;
		const lookingForRoles = formData.get('lookingForRoles')?.toString() ?? null;
		const repoSlug =`${formData.get('repoName')?.toString()}-${formData.get('owner')?.toString()}`.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');


		if (isPrivate) {
			return json({ error: 'Private repositories are not allowed' }, { status: 400 });
		}

		await db.insert(repos).values({
			userId: locals.user.id,
			repoId,
			repoName,
			repoUrl,
			languagesUrl,
			owner,
			isPrivate,
			name,
			tagline,
			description,
			techStack,
			thumbnail,
			contact,
			lookingForRoles,
			repoSlug
		});

		return json({ success: true }, { status: 201 });
	} catch (error) {
		console.error('Error adding repo:', error);
		return json({ error: 'Failed to add repository' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const repoIdValue = formData.get('repoId')?.toString();
		const repoId = repoIdValue ? Number(repoIdValue) : NaN;

		if (!Number.isInteger(repoId)) {
			return json({ error: 'Invalid repo id' }, { status: 400 });
		}

		const deletedRows = await db
			.delete(repos)
			.where(and(eq(repos.userId, locals.user.id), eq(repos.repoId, repoId)))
			.returning({ id: repos.id });

		if (deletedRows.length === 0) {
			return json({ error: 'Repository not found' }, { status: 404 });
		}

		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Error removing repo:', error);
		return json({ error: 'Failed to remove repository' }, { status: 500 });
	}
};


