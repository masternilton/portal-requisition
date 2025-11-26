<script lang="ts">
	import { onMount } from "svelte";
	import { page } from '$app/state';
	import { previewRequisition, goToDetail } from "$lib/requisitions/list";

	$: requisitions = page.data.requisitions || [];
	$: error = page.data.error;

	import { itemsRequisition } from "$lib/stores/requisitionStore";

	onMount(() => {
		itemsRequisition.set([]); // ← AQUÍ SE REINICIA
		console.log("itemsRequisition reiniciado al entrar a /new");
	});

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const year = String(date.getFullYear()).slice(-2);
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		const seconds = String(date.getSeconds()).padStart(2, "0");
		return `${year}${month}${day}${hours}${minutes}${seconds}`;
	}

	function formatToDMY(dateString: string): string {
		const date = new Date(dateString);

		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}
</script>

<section class="p-6">
	<h1 class="text-2xl font-bold mb-4">Requisiciones</h1>
	<div class="flex items-center justify-end mb-2">
		<button
			onclick={previewRequisition}
			class="bg-black text-white font-semibold py-2 rounded-lg text-md w-[40%] max-w-sm active:scale-95 transition-transform"
		>
			+ Nueva
		</button>
	</div>

	<!-- Contenedor responsivo -->
	<div class="flex flex-col gap-4">
		{#each requisitions as req}
			<div
				class="bg-white rounded-xl shadow-sm border border-gray-200 transition-transform active:scale-[0.98]"
			>
				<a
					href={`/requisition/${req.id}`}
					onclick={(event) => {
						event.preventDefault();
						goToDetail(req.id);
					}}
					class="block p-2 flex flex-col gap-1 cursor-pointer hover:bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
				>
					<div class="flex justify-between items-center">
						<h2 class="font-semibold text-gray-900 text-lg">
							{req.description}
						</h2>
						<span class="text-lg text-gray-900">
							<small></small>
							{#if req.status?.name.includes("finalizada")}
								<span
									class="px-3 py-1 rounded-full text-xs font-semibold border
                 bg-green-100 text-green-700 border-green-300"
								>
									{req.status?.name}
								</span>
							{:else}
								<span
									class="px-3 py-1 rounded-full text-xs font-semibold border
                 bg-yellow-100 text-yellow-700 border-yellow-300"
								>
									{req.status?.name}
								</span>
							{/if}
						</span>
					</div>
					<div class="flex justify-between text-md text-gray-700">
						<small class="font-medium"
							>#{formatDate(req.created_at)}</small
						>
						<small class="font-medium"
							>Fecha: {formatToDMY(req.created_at)}</small
						>
					</div>
				</a>
			</div>
		{/each}

		{#if requisitions.length == 0}
			<div
				class="border-2 border-dashed border-gray-300 rounded-xl p-4 m-4 text-center"
			>
				<p class="text-gray-500 text-lg font-medium">
					Aún no hay requisiciones agregadas
				</p>
			</div>
		{/if}
	</div>
</section>
