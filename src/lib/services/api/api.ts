
import { get } from 'svelte/store';
/*import { token } from '../auth/auth';

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
	const t = get(token);
	const headers = new Headers(init.headers ?? {});
	if (t) headers.set('Authorization', `Bearer ${t}`);
	headers.set('Content-Type', headers.get('Content-Type') ?? 'application/json');

	const res = await fetch(input, { ...init, headers, credentials: 'same-origin' });

	// manejo básico de 401: puedes forzar logout si lo deseas
	if (res.status === 401) {
		// opcional: logout(); y redirigir
	}

	return res;
}*/
