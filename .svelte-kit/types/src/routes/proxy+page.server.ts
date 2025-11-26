// @ts-nocheck
// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { config } from '$lib/config';

export const load = async ({ locals, fetch }: Parameters<PageServerLoad>[0]) => {
    // 1. Verificar autenticación
    if (!locals.user?.token) {
        throw redirect(303, '/login');
    }


    try {
       
        // 2. Llamar a tu API
        const res = await fetch(`${config.API_URL}/requisitions?account_id=${locals.user?.account?.id}`, {
            headers: {
                'Authorization': `Bearer ${locals.user.token}`
            }
        });

      

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return {
                error: err.message || 'Error al cargar requisiciones'
            };
        }

        const response = await res.json();

        const data= response.data ?? [];
        const requisitions = data.data ?? [];

        return {
            requisitions
        };

    } catch (err) {
        console.error('Error cargando requisiciones:', err);
        return {
            error: 'Error de conexión'
        };
    }
};