<!-- src/lib/components/Combobox.svelte -->
<script lang="ts">
 import { marcas, loadingMarcas } from '$lib/stores/brandStore';

    export let onSelect: (marca: { id: string; name: string }) => void = () => {};

    let open = false;
    let search = '';
    let selected: { id: string; name: string } | null = null;

    $: filtered = $marcas.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    // AHORA SÍ SE EJECUTA
    console.log('Combobox: marcas =', $marcas);

    function select(marca: { id: string; name: string }) {
        selected = marca;
        search = marca.name;
        open = false;
        onSelect(marca);
    }

    function toggle() {
        open = !open;
        if (open) search = selected?.name || '';
    }
</script>

<div class="relative">
    <button
        type="button"
        on:click={toggle}
        class="w-full bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-black"
    >
        <span class="text-gray-800">{selected?.name || 'Selecciona una marca'}</span>
        <svg class="w-5 h-5 transition-transform {open ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    {#if open}
        <div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <input
                bind:value={search}
                type="text"
                placeholder="Buscar marca..."
                class="w-full px-4 py-2 border-b border-gray-200 sticky top-0 bg-white"
                autofocus
            />
            {#if $loadingMarcas}
                <div class="p-4 text-center text-gray-500">Cargando marcas...</div>
            {:else if filtered.length === 0}
                <div class="p-4 text-center text-gray-500">No hay resultados</div>
            {:else}
                {#each filtered as marca}
                    <button
                        type="button"
                        on:click={() => select(marca)}
                        class="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                        {marca.name}
                    </button>
                {/each}
            {/if}
        </div>
    {/if}
</div>