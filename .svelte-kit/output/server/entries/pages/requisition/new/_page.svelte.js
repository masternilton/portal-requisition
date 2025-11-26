import { s as store_get, a as attr_class, u as unsubscribe_stores, c as bind_props, f as stringify, d as attr } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { m as marcas } from "../../../../chunks/brandStore.js";
import { U as fallback } from "../../../../chunks/utils2.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function Combobox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let onSelect = fallback($$props["onSelect"], () => {
    });
    let search = "";
    console.log("Combobox: marcas =", store_get($$store_subs ??= {}, "$marcas", marcas));
    store_get($$store_subs ??= {}, "$marcas", marcas).filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));
    $$renderer2.push(`<div class="relative"><button type="button" class="w-full bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-black"><span class="text-gray-800">${escape_html("Selecciona una marca")}</span> <svg${attr_class(`w-5 h-5 transition-transform ${stringify("")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { onSelect });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let cantidad = null;
    let capacidad = null;
    let data = $$props["data"];
    let isSubmitting = false;
    function handleMarcaSelect(marca) {
      console.log("Seleccionado:", marca);
    }
    $$renderer2.push(`<section class="p-6 max-w-4xl mx-auto"><h1 class="text-2xl font-bold text-gray-800 mb-6">Agregar un ítem</h1> <div class="flex items-center justify-end mb-2"><button class="flex items-center bg-black text-white hover:bg-gray-800 transition-colors rounded-lg px-3 py-2 mb-4 active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg> <span class="font-medium">Volver</span></button></div> <form class="w-full flex flex-col gap-5 bg-white shadow-sm rounded-xl p-6 border border-gray-200"><div><label class="block text-sm font-semibold text-gray-700 mb-1">Marca</label> `);
    Combobox($$renderer2, { onSelect: handleMarcaSelect });
    $$renderer2.push(`<!----></div> <div><label class="block text-sm font-semibold text-gray-700 mb-1">Cantidad</label> <input${attr("value", cantidad)} type="number" required min="1" placeholder="00" class="w-full bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-black"/></div> <div><label class="block text-sm font-semibold text-gray-700 mb-1">Capacidad (ml)</label> <input${attr("value", capacidad)} type="number" required min="50" step="50" placeholder="Ej. 750" class="w-full bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-black"/></div> <button type="submit"${attr("disabled", isSubmitting, true)} class="w-full bg-[#0B4F6C] text-white font-semibold py-3 rounded-lg text-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`Agregar`);
    }
    $$renderer2.push(`<!--]--></button></form></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
