import { writable } from 'svelte/store';

export interface Brand {
    id: string;
    name: string;
}

export const marcas = writable<Brand[]>([]);
export const loadingMarcas = writable(false);
export const errorMarcas = writable<string | null>(null);