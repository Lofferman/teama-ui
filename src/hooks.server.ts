import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const isPublicPath = (pathname: string): boolean => {
	if (pathname === '/' || pathname === '/login' || pathname === '/repos') {
		return true;
	}

	// Allow exactly one slug segment: /repos/<slug>
	if (/^\/repos\/[^/]+\/?$/.test(pathname)) {
		return true;
	}

	// Better Auth handlers must stay publicly reachable
	if (pathname.startsWith('/api/auth')) {
		return true;
	}

	return false;
};

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	if (!event.locals.user && !isPublicPath(event.url.pathname)) {
		const redirectTo = event.url.pathname + event.url.search;
		throw redirect(302, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
