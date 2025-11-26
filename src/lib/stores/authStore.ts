// src/lib/stores/authStore.ts
import { writable } from 'svelte/store';

// Guardamos el token del usuario (JWT)
export const authToken = writable<string | null>(null);

// Guardamos info básica del usuario logueado (si la quieres usar)
export const userInfo = writable<{ email?: string; name?: string } | null>(null);

// Pequeñas funciones helpers opcionales:
export function setAuth(token: string, user?: { email?: string; name?: string }) {
	authToken.set(token);
	userInfo.set(user || null);
	localStorage.setItem('token', token);
	if (user) localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth() {
	authToken.set(null);
	userInfo.set(null);
	localStorage.removeItem('token');
	localStorage.removeItem('user');
}
