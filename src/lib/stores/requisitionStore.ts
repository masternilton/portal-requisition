import { writable } from 'svelte/store';

export type ItemRequisition = {
	id: string;
	name: string;
	cantidad: number;
	capacidad: number;
};

export const itemsRequisition = writable<ItemRequisition[]>([]);
