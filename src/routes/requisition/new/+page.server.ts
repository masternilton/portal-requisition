// src/routes/requisition/new/+page.server.ts
import { marcas, loadingMarcas, errorMarcas } from '$lib/stores/brandStore';
import { config } from '$lib/config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
    loadingMarcas.set(true);
    errorMarcas.set(null);

    let marcasList: { id: string; name: string }[] = [];

    try {
        const res = await fetch(`${config.API_URL_DASH}/v2dash/brands/list`, {
            headers: {
                Authorization: `Bearer ${locals.user?.token}`
            }
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        const items = data?.data?.items ?? [];

        if (!Array.isArray(items)) {
            throw new Error('Formato inesperado');
        }

        marcasList = items.map((item: any) => ({
            id: String(item.id),
            name: String(item.name)
        }));

        // LLENA EL STORE PARA EL SERVIDOR
        marcas.set(marcasList);

    } catch (err) {
        errorMarcas.set('No se pudieron cargar las marcas');
        console.error(err);
    } finally {
        loadingMarcas.set(false);
    }

    // DEVUELVE AL CLIENTE
    return {
        marcas: marcasList
    };
};