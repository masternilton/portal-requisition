<!-- src/components/Header.svelte -->
<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';

    // Usa $derived en vez de $:
    const user = derived(page, ($page) => $page.data.user);
    const authenticated = derived(user, ($user) => !!$user);

    let menuOpen = $state(false);

    function toggleMenu() {
        menuOpen = !menuOpen;
    }

    async function handleLogout() {
        await fetch('/logout', { method: 'POST' });
        await invalidateAll();
        goto('/login');
    }

    function goHome() { goto('/'); }
    function goToProfile() { goto('/profile'); }
</script>

<header class="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo -->
        <button onclick={goHome} class="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" class="h-8 w-auto" />
            <span class="text-lg font-semibold">Bottle Tracking</span>
        </button>

        <!-- Menú hamburguesa -->
        <button class="md:hidden" onclick={toggleMenu}>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <!-- Menú de escritorio -->
        <nav class="hidden md:flex items-center space-x-6">
            {#if $authenticated}
                <span class="text-sm">Hola, {$user?.name}</span>
                
                <form action="/logout" method="POST">
                    <button type="submit" class="hover:text-gray-300">Logout</button>
                </form>
            {:else}
                <a href="/login" class="hover:text-gray-300">Login</a>
            {/if}
        </nav>
    </div>

    <!-- Menú móvil -->
    <div class={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <ul class="py-2 bg-black border-t border-gray-700">
            {#if $authenticated}
                <li class="px-4 py-2 text-sm">Hola, {$user?.name}</li>
                <li>
                    <button onclick={() => { goToProfile(); toggleMenu(); }} class="block w-full px-4 py-2 text-left hover:bg-gray-800">
                        Perfil
                    </button>
                </li>
                <li>
                    <form action="/logout" method="POST" class="w-full">
                        <button type="submit" onclick={toggleMenu} class="block w-full px-4 py-2 text-left hover:bg-gray-800">
                            Logout
                        </button>
                    </form>
                </li>
            {:else}
                <li>
                    <a href="/login" onclick={toggleMenu} class="block w-full px-4 py-2 text-left hover:bg-gray-800">
                        Login
                    </a>
                </li>
            {/if}
        </ul>
    </div>
</header>