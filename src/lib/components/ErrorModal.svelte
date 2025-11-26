<!-- src/lib/components/modals/ErrorModal.svelte -->
<script lang="ts">
    import { fade } from 'svelte/transition';

    // Props
    export let message: string = 'Ocurrió un error';
    export let onClose: () => void = () => {}; // Callback opcional

    function handleClose() {
        onClose(); // Ejecuta callback (ej: ocultar modal)
    }
</script>

<div
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
    transition:fade={{ duration: 200 }}
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="error-title"
    aria-describedby="error-desc"
    on:click|self={handleClose}
>
    <div
        class="bg-white rounded-3xl shadow-2xl w-full max-w-xs p-8 text-center animate-in slide-in-from-bottom duration-300"
        role="document"
        on:click|stopPropagation
    >
        <!-- Icono grande -->
        <div class="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                class="w-12 h-12 text-red-600"
                aria-hidden="true"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>

        <!-- Título -->
        <h3 id="error-title" class="text-2xl font-bold text-gray-900 mb-3">
            Error
        </h3>

        <!-- Mensaje -->
        <p id="error-desc" class="text-lg text-gray-700 mb-8 leading-relaxed">{message}</p>

        <!-- Botón: SOLO CIERRA -->
        <button
            on:click={handleClose}
            on:keydown={(e) => ['Enter', ' '].includes(e.key) && handleClose()}
            class="w-full min-h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 rounded-2xl active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
            type="button"
        >
            Cerrar
        </button>
    </div>
</div>