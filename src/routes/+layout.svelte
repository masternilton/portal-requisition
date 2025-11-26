<script lang="ts">
	import "../app.css";
	import Header from '$lib/components/Header.svelte';

	export let data; 
	const user = data.user; 
</script>


<div class="min-h-screen flex flex-col">
    <!-- Header fijo -->
    <Header />

    <!-- Contenido principal con padding -->
    <main class="flex-1 pt-16 md:pt-20 pb-safe bg-gray-100 text-gray-900">
        <slot />
    </main>
</div>




<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }

    /* Safe area para iOS (notch) */
    .pb-safe {
        padding-bottom: env(safe-area-inset-bottom, 1rem);
    }

    @supports (padding-top: env(safe-area-inset-top)) {
        main {
            padding-top: calc(env(safe-area-inset-top, 0) + 4rem); /* 4rem = 64px */
        }
        @media (min-width: 768px) {
            main {
                padding-top: calc(env(safe-area-inset-top, 0) + 5rem); /* 5rem = 80px */
            }
        }
    }
</style>