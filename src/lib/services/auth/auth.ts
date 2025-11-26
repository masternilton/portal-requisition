// src/lib/services/auth.ts
export async function loginAPI(endpoint: string, credentials: Record<string, any>) {
	const res = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials)
	});

	if (!res.ok) {
		const err = await res.json().catch(() => ({ message: 'Login failed' }));
		throw new Error(err.message || res.statusText);
	}

	const data = await res.json();
	// asume respuesta: { token: string, user: {...} }
	return data;
}
