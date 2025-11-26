<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from '$app/state';
    import { formatDate, formatToDMY } from '$lib/helpers/date'
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import SuccessModal from '$lib/components/SuccessModal.svelte';
    import ErrorModal from '$lib/components/ErrorModal.svelte';
    $: requisition = page.data.requisition || {};
	$: error = page.data.error;
   let showModal = false;
   let isSubmitting = false;
   let showSuccess = false;
   let showError = false;

   

    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    function goBack() {
        goto("/");
    }

    // use:enhance para feedback
    const handleDelete: SubmitFunction = () => {

        isSubmitting = true;
        return async ({ result, update }) => {
			if (result.type === "success") {
				showSuccess=true;
				
			} else if (result.type === "failure") {
				showError=true;
			} else if (result.type === "error") {
				
                showError=true;
			}
            showModal = false;
			isSubmitting = false;
			update();
		};
    };

    function closeError() {
        showError = false;
    }

    
</script>

<section class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Requisición #{ formatDate(requisition?.fecha) }</h1>

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
        <p><strong>Fecha:</strong> {requisition.fecha}</p>
        <p><strong>Solicitante:</strong> {requisition.solicitante}</p>
        <p><strong>Estado:</strong> {requisition.estado}</p>
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

        <!-- Filas -->
        {#each requisition.items as item}
            <div
                class="grid px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-sm items-center"
                style="grid-template-columns: 70% 15% 15%;"
            >
                <span class="truncate">{item.brand}</span>
                <span class="text-center">{item.capacity}</span>
                <span class="text-center font-bold text-md"
                    >{item.quantity}</span
                >
            </div>
        {/each}
    </div>

    <div class="mt-5">
        <button
            onclick={openModal}
            class="w-full bg-[#F73B3B] text-white font-semibold py-3 rounded-lg text-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
            borrar
        </button>
    </div>
</section>
<!-- MODAL DE CONFIRMACIÓN -->
{#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 class="text-lg font-bold text-gray-900 mb-2">¿Borrar requisición?</h3>
            <p class="text-sm text-gray-600 mb-6">
                Esta acción no se puede deshacer.
            </p>

            <form method="POST" action="?/delete" use:enhance={handleDelete} class="flex gap-3">
                <button
                    type="button"
                    onclick={closeModal}
                    class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg active:scale-95 transition"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg active:scale-95 transition"
                >
                    Borrar
                </button>
            </form>
        </div>
    </div>
{/if}


{#if showSuccess}
    <SuccessModal
        message="¡Requisición borrada!"
        redirectTo="/"
    />
{/if}

{#if showError}
    <ErrorModal
        message="¡Requisición no borrada!"
        onClose={closeError}
    />
{/if}


