// src/hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');
    const userJson = event.cookies.get('user');

    // Si hay token, reconstruir user completo
    if (token && userJson) {
        try {
            const user = JSON.parse(userJson);
            event.locals.user = { token, ...user };
        } catch {
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    // Rutas protegidas
    const protectedRoutes = ['/requisition', '/profile', '/dashboard'];
    const isProtected = protectedRoutes.some((path) =>
        event.url.pathname.startsWith(path)
    );

    if (isProtected && !event.locals.user) {
        throw redirect(303, '/login');
    }

    return resolve(event);
};