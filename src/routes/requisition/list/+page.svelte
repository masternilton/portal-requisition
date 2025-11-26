<script lang="ts">
	import { goto } from '$app/navigation';
	import { itemsRequisition } from '$lib/stores/requisitionStore';
	import { get } from 'svelte/store'; // solo si necesitas leer directamente (no obligatorio)

	function newRequisition() {
		goto('/requisition/new');
	}
</script>

<div class="min-h-screen px-4 py-6">
	<h1 class="text-xl font-bold text-gray-800 mb-6 text-start">
		Requisiciónes
	</h1>

	<div class="flex items-center justify-end mb-2">
		<button
			onclick={newRequisition}
			class="bg-black text-white font-semibold py-3 rounded-lg text-md w-[40%] max-w-sm active:scale-95 transition-transform"
		>
			+ Nueva
		</button>
	</div>

	<!-- Contenedor responsivo -->
	<div class="flex flex-col gap-4">
		{#each $itemsRequisition as req}
			<div
				class="bg-white rounded-xl shadow-sm p-2 flex flex-col gap-1 border border-gray-200 active:scale-[0.98] transition-transform"
			>
				<div class="flex justify-between items-center">
					<h2 class="font-semibold text-gray-900 text-lg">
						<span>{req.marca}</span>
					</h2>
					<span class="text-lg text-gray-900 font-bold">{req.cantidad}</span>
				</div>
				<div class="flex justify-between text-sm text-gray-700">
					<small class="font-medium">Capacidad: {req.capacidad} ml</small>
				</div>
			</div>
		{/each}
	</div>
</div>
