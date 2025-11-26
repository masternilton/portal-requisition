import { goto } from '$app/navigation';

export interface Requisition {
	id: number;
	marca: string;
	cantidad: number;
	fecha: string;
}

export const requisitions: Requisition[] = [
	{ id: 1, marca: 'Requisición #001', cantidad: 120, fecha: '2025-11-05' },
	{ id: 2, marca: 'Requisición #002', cantidad: 6, fecha: '2025-11-05' },
	{ id: 3, marca: 'Requisición #003', cantidad: 24, fecha: '2025-11-05' }
];

export function goToDetail(id: number) {
	goto(`/requisition/${id}`);
}

export function newRequisition() {
	goto('/requisition/new');
}

export function listRequisitions() {
	goto('/');
}

export function previewRequisition() {
	goto('/requisition/preview');
}
