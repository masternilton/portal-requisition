import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// Si no hay usuario (token inválido o no autenticado)
	if (!locals.user && url.pathname !== '/login') {
		throw redirect(303, '/login');
	}

	// Si está logueado e intenta ir al login
	if (locals.user && url.pathname === '/login') {
		throw redirect(303, '/');
	}

	return {
		user: locals.user
	};
};
