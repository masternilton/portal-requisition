<script lang="ts">
	import { goto } from '$app/navigation';
	import { itemsRequisition } from '$lib/stores/requisitionStore';
	import type { ItemRequisition } from '$lib/stores/requisitionStore';
	import { onMount } from 'svelte';
    import { marcas, loadingMarcas, errorMarcas } from '$lib/stores/brandStore';
    import Combobox from '$lib/components/Combobox.svelte';

	
	let nombre = '';
	let cantidad: number | null = null;
	let capacidad: number | null = null;

    export let data; // ← viene del load

    let selectedMarca: { id: string; name: string } | null = null;

    let isSubmitting = false;
    onMount(() => {
        marcas.set(data.marcas);
        console.log('Marcas cargadas en cliente:', data.marcas);
    });

    function handleMarcaSelect(marca: { id: string; name: string }) {
        selectedMarca = marca;
        console.log('Seleccionado:', marca);
    }

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

	
        if (isSubmitting) return;

        if (!selectedMarca || !cantidad || !capacidad) {
            alert('Completa todos los campos');
            return;
        }

        isSubmitting = true;

		const nuevo: ItemRequisition = {
			id: selectedMarca?.id ?? "0", // genera un ID temporal único
			name: selectedMarca?.name ?? "sin definir",
			cantidad: cantidad ?? 0,
			capacidad: capacidad ?? 0
		};

		// Agrega el nuevo item al store global
		itemsRequisition.update((lista) => [...lista, nuevo]);

		
		goto('/requisition/preview');
	}


	function goBack() {
		goto("/requisition/preview");
	}
</script>

<section class="p-6 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold text-gray-800 mb-6">Agregar un ítem</h1>

	<div class="flex items-center justify-end mb-2">
		<button
			onclick={goBack}
			class="flex items-center bg-black text-white hover:bg-gray-800 transition-colors rounded-lg px-3 py-2 mb-4 active:scale-95"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-5 h-5 mr-2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 19l-7-7 7-7"
				/>
			</svg>
			<span class="font-medium">Volver</span>
		</button>
	</div>

	<form onsubmit={handleSubmit} class="w-full flex flex-col gap-5 bg-white shadow-sm rounded-xl p-6 border border-gray-200">
		<div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Marca</label>
            <Combobox onSelect={handleMarcaSelect} />
        </div>

		<div>
			<label class="block text-sm font-semibold text-gray-700 mb-1">Cantidad</label>
			<input
				bind:value={cantidad}
				type="number"
				required
				min="1"
				placeholder="00"
				class="w-full bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-black"
			/>
		</div>

		<div>
			<label class="block text-sm font-semibold text-gray-700 mb-1">Capacidad (ml)</label>
			<input
				bind:value={capacidad}
				type="number"
				required
				min="50"
				step="50"
				placeholder="Ej. 750"
				class="w-full bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-black"
			/>
		</div>

		<button
            type="submit"
            disabled={isSubmitting}
            class="w-full bg-[#0B4F6C] text-white font-semibold py-3 rounded-lg text-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
            {#if isSubmitting}
                <span class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Agregando...
                </span>
            {:else}
                Agregar
            {/if}
        </button>
	</form>
</section>
