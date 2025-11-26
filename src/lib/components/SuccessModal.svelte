<!-- src/lib/components/modals/SuccessModal.svelte -->
<script lang="ts">
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';

    export let message: string = '¡Operación exitosa!';
    export let redirectTo: string = '/';

    function handleRedirect() {
        goto(redirectTo);
    }
</script>

<div
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="success-title"
    on:click|self={() => {}}
>
    <div
        class="bg-white rounded-3xl shadow-2xl w-full max-w-xs p-8 text-center animate-in slide-in-from-bottom duration-300"
        role="document"
    >
        <!-- Icono grande -->
        <div class="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                class="w-12 h-12 text-green-600"
                aria-hidden="true"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>

        <!-- Título -->
        <h3 id="success-title" class="text-2xl font-bold text-gray-900 mb-3">
            ¡Éxito!
        </h3>

        <!-- Mensaje -->
        <p class="text-lg text-gray-700 mb-8 leading-relaxed">{message}</p>

        <!-- Botón grande (mínimo 48px de alto) -->
        <button
            on:click={handleRedirect}
            on:keydown={(e) => ['Enter', ' '].includes(e.key) && handleRedirect()}
            class="w-full min-h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-4 rounded-2xl active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
            type="button"
        >
            Continuar
        </button>
    </div>
</div>