import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';

const normalizeRedirectPath = (value: string | null): string => {
	if (!value) return '/';

	// Prevent open redirects by allowing only in-app absolute paths.
	if (!value.startsWith('/') || value.startsWith('//')) {
		return '/';
	}

	return value;
};

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}

	const redirectTo = normalizeRedirectPath(event.url.searchParams.get('redirectTo'));
	return { redirectTo };
};

export const actions: Actions = {
	signInSocial: async (event) => {
		const formData = await event.request.formData();
		const provider = formData.get('provider')?.toString() ?? 'github';
		const callbackURL = normalizeRedirectPath(formData.get('callbackURL')?.toString() ?? '/');

		const result = await auth.api.signInSocial({
			body: {
				provider: provider as 'github',
				callbackURL
			}
		});

		if (result.url) {
			return redirect(302, result.url);
		}
		return fail(400, { message: 'Social sign-in failed' });
	}
};
