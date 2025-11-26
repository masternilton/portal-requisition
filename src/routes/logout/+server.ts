// src/routes/logout/+server.ts
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';


export const POST: RequestHandler = ({ cookies, locals }) => {
    cookies.delete('token', { path: '/' });
    cookies.delete('user', { path: '/' });
    locals.user = null;
    throw redirect(303, '/login');
};