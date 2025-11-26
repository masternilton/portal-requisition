// @ts-nocheck
// src/routes/requisition/new/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { config } from '$lib/config';
import { itemsRequisition } from '$lib/stores/requisitionStore';
import { get } from 'svelte/store';
import { fail } from '@sveltejs/kit';

export const actions = {
    create_requisition: async ({ request, locals }: import('./$types').RequestEvent) => {
    
       if (!locals.user?.token) {
            throw redirect(303, '/login');
        }

        const token = locals.user.token;
        const formData = await request.formData();
        const itemsJson = formData.get('requisition_items')?.toString();

        if (!itemsJson) {
            return { success: false, error: 'No se recibieron ítems' };
        }

       let  currentItems;
        try {
             currentItems = JSON.parse(itemsJson);
        } catch (err) {
            return { success: false, error: 'Datos inválidos' };
        }

        if (!Array.isArray( currentItems) ||  currentItems.length === 0) {
            return { success: false, error: 'No hay ítems válidos' };
        }

        let warehouse= locals.user?.warehouses[0] ?? {};
        const payload = {
            account_id: locals.user?.account.id,
            warehouse_id: warehouse.id ,
            week_number: 1,
            description: "REQUISICIÓN",
            observations: "Requisición a almacen central",
            requisition_details: currentItems.map(item => ({
                brand_id: item.id,
                capacity: item.capacidad,
                quantity: item.cantidad
            })),

        };
     

       

        try {
            const res = await fetch(`${config.API_URL}/requisitions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const apiResponse = await res.json();
           
            if (!res.ok || !apiResponse.status) {
                let errorMsg = apiResponse.message || 'Error del servidor';

                if (apiResponse.data && typeof apiResponse.data === 'object') {
                    const fieldErrors = Object.values(apiResponse.data).flat();
                    if (fieldErrors.length > 0) {
                        errorMsg = fieldErrors.join(' ');
                    }
                }

                return fail(res.status, { error: errorMsg });
            }

            itemsRequisition.set([]); 
            return { success: true };

        } catch (err) {
            console.error('Error en acción de requisición:', err);
            return fail(500, { error: 'Error de conexión' });
        }
    }
};;null as any as Actions;