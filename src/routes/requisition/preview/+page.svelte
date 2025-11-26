<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { itemsRequisition } from "$lib/stores/requisitionStore";
	import { get } from "svelte/store"; // solo si necesitas leer directamente (no obligatorio)
	import type { SubmitFunction } from "@sveltejs/kit";
	import SuccessModal from '$lib/components/SuccessModal.svelte';

	let isSubmitting = false;
	let showSuccess = false;
	function newRequisition() {
		goto("/requisition/new");
	}
	function goBack() {
		goto("/");
	}

	function saveRequisition() {}

	$: message = "";

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;
		message = "";

		return async ({ result, update }) => {
			if (result.type === "success") {
				showSuccess=true;
				itemsRequisition.set([]);
			} else if (result.type === "failure") {
				message = result.data?.error || "Error desconocido";
			} else if (result.type === "error") {
				message = "Error de red";
			}

			isSubmitting = false;
			update();
		};
	};
</script>

<section class="p-6 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold mb-4">Nueva Requisición</h1>

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

	<!-- Tarjeta de información -->
	<div class="bg-white shadow-sm rounded-xl p-4 border border-gray-200 mb-6">
		<p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
		<p><strong>Solicitante:</strong></p>
		<p><strong>Estado:</strong> Por completar</p>
	</div>

	<div class="flex items-center justify-end mb-2">
		<button
			onclick={newRequisition}
			class="flex items-center bg-black font-semibold text-white hover:bg-gray-800 transition-colors rounded-lg px-3 py-2 mb-4 active:scale-95"
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
			<span>Agregar item</span>
		</button>
	</div>

	<!-- Tabla / Lista de items -->
	<div
		class="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden"
	>
		<!-- Cabecera -->
		<div
			class="grid font-semibold text-gray-700 border-b border-gray-200 px-4 py-2 text-sm"
			style="grid-template-columns: 70% 15% 15%;"
		>
			<span class="text-left">Productos solicitados</span>

			<span class="text-center">Capac.</span>
			<span class="text-center">Cant.</span>
		</div>

		{#if $itemsRequisition.length > 0}
			{#each $itemsRequisition as item}
				<div
					class="grid px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-sm items-center"
					style="grid-template-columns: 70% 15% 15%;"
				>
					<span class="truncate">{item.name}</span>
					<span class="text-center">{item.capacidad}</span>
					<span class="text-center font-bold text-md"
						>{item.cantidad}</span
					>
				</div>
			{/each}
		{:else}
			<!-- DIV PUNTEADO CUANDO NO HAY ÍTEMS -->
			<div
				class="border-2 border-dashed border-gray-300 rounded-xl p-12 m-4 text-center"
			>
				<p class="text-gray-500 text-lg font-medium">
					Aún no hay ítems agregados en la requisición
				</p>
				<p class="text-gray-400 text-sm mt-2">
					Haz clic en "Agregar ítem" para comenzar
				</p>
			</div>
		{/if}
	</div>

	<div class="mt-8 space-y-4">
		{#if message}
			<div class="w-full  mx-auto">
				<p
					class="text-center font-medium {message.includes('enviada')
						? 'text-green-600'
						: 'text-red-600'}"
				>
					{message}
				</p>
			</div>
		{/if}

		{#if $itemsRequisition.length > 0}
			<div class="w-full  mx-auto">
				<form
					method="POST"
					action="?/create_requisition"
					use:enhance={handleSubmit}
				>
					<input
						type="hidden"
						name="requisition_items"
						value={JSON.stringify($itemsRequisition)}
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						class="bg-[#0B4F6C] text-white font-semibold py-3 px-6 rounded-lg text-lg w-full active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if isSubmitting}
							Enviando...
						{:else}
							Enviar Requisición
						{/if}
					</button>
				</form>
			</div>
		{/if}
	</div>
</section>



{#if showSuccess}
    <SuccessModal
        message="¡Requisición creada!"
        redirectTo="/"
    />
{/if}


