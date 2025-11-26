// src/routes/login/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { config } from '$lib/config';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const login = data.get('login')?.toString();
        const password = data.get('password')?.toString();

        if (!login || !password) {
            return { error: 'Faltan credenciales' };
        }

        // Llamar a tu API
        const res = await fetch(`${config.API_URL_DASH}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return { error: err.message || 'Credenciales incorrectas' };
        }

        // RECIBIR TODO EL JSON
        const apiResponse = await res.json();

        // EXTRAER TOKEN
        const token = apiResponse.token;
        if (!token) {
            return { error: 'No se recibió token' };
        }



        const res2 = await fetch(
            `${config.API_URL}/warehouses?group_id=${apiResponse.group_id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

      

        if (!res2.ok) {
            const err = await res.json().catch(() => ({}));
            return { error: err.message || 'Hubo un problema al encontrar el Almacen central' };
        }

        const apiResponse2 = await res2.json();

    

        // CREAR OBJETO USER con los datos que sí vienen

        const warehouses = apiResponse2.data ?? [];
        const user = {
            id: apiResponse.id,
            name: apiResponse.name,
            email: apiResponse.email,
            isActive: apiResponse.isActive,
            roles: apiResponse.roles,
            group: {
                id: apiResponse.group_id,
                name: apiResponse.group_name
            },
            account: {
                id: apiResponse.account_id,
                name: apiResponse.account_name
            },
            warehouses: warehouses ?? []


        };


        if (warehouses.length == 0) {
            const err = await res.json().catch(() => ({}));
            return { error: err.message || 'No existe Almacen Central para su cuenta' };
        }

        // GUARDAR TOKEN (httpOnly)
        cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 // 1 día
        });

        // GUARDAR USER (no httpOnly, para frontend)
        cookies.set('user', JSON.stringify(user), {
            httpOnly: false,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24
        });

        // REDIRIGIR
        throw redirect(303, '/');
    }
};