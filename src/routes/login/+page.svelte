<!-- src/routes/login/+page.svelte -->
<script lang="ts">
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';

    export let form: { error?: string } = {};
    let submitting = false;
    let loginInput: HTMLInputElement;

    const handleSubmit: SubmitFunction = () => {
        submitting = true;
        return async ({ result, update }) => {
            submitting = false;
            if (result.type === 'failure') {
                loginInput?.focus();
            }
            update();
        };
    };
</script>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Iniciar Sesión | Requisiciones</title>
</svelte:head>

<section class="flex items-center justify-center min-h-screen p-4 -mt-16 md:-mt-20">
    <div class="w-full max-w-sm">
        <div class="bg-white rounded-3xl shadow-2xl p-8 animate-in slide-in-from-bottom duration-500">
            <!-- Logo + Título -->
            <div class="text-center mb-8">
                <div class="mx-auto w-20 h-20 bg-transparent  flex items-center justify-center mb-3 ">
                     <img src="/logo.png" alt="Logo" class="h-15 w-auto" />
                </div>
                <h1 class="text-3xl font-bold text-gray-900">Requisiciones</h1>
                <p class="text-gray-600 text-sm mt-1">Ingresa con tu cuenta</p>
            </div>

            <!-- Form -->
            <form method="POST" use:enhance={handleSubmit} class="space-y-6">
                <!-- Usuario -->
                <div>
                    <label for="login" class="block text-sm font-semibold text-gray-800 mb-2">
                        Usuario
                    </label>
                    <input
                        bind:this={loginInput}
                        id="login"
                        name="login"
                        type="text"
                        autocomplete="username"
                        required
                        placeholder="tu.usuario"
                        enterkeyhint="next"
                        autocapitalize="off"
                        spellcheck={false}
                        class="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200"
                    />
                </div>

                <!-- Contraseña -->
                <div>
                    <label for="password" class="block text-sm font-semibold text-gray-800 mb-2">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        placeholder="••••••••"
                        enterkeyhint="go"
                        class="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200"
                    />
                </div>

                <!-- Error -->
                {#if form?.error}
                    <div class="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm flex items-center gap-2 animate-in fade-in duration-300">
                        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <span>{form.error}</span>
                    </div>
                {/if}

                <!-- Botón -->
                <button
                    type="submit"
                    disabled={submitting}
                    class="w-full bg-black hover:bg-gray-900 text-white font-bold text-xl py-5 rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-3 shadow-lg"
                >
                    {#if submitting}
                        <svg class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Entrando...</span>
                    {:else}
                        <span>Entrar</span>
                    {/if}
                </button>
            </form>

            <!-- Footer -->
            <p class="text-center text-xs text-gray-500 mt-8 font-medium">
                © 2025 Requisiciones App
            </p>
        </div>
    </div>
</section>