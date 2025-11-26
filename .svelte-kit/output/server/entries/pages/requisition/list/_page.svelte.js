import { e as ensure_array_like, s as store_get, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { i as itemsRequisition } from "../../../../chunks/requisitionStore.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="min-h-screen px-4 py-6"><h1 class="text-xl font-bold text-gray-800 mb-6 text-start">Requisiciónes</h1> <div class="flex items-center justify-end mb-2"><button class="bg-black text-white font-semibold py-3 rounded-lg text-md w-[40%] max-w-sm active:scale-95 transition-transform">+ Nueva</button></div> <div class="flex flex-col gap-4"><!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$itemsRequisition", itemsRequisition));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let req = each_array[$$index];
      $$renderer2.push(`<div class="bg-white rounded-xl shadow-sm p-2 flex flex-col gap-1 border border-gray-200 active:scale-[0.98] transition-transform"><div class="flex justify-between items-center"><h2 class="font-semibold text-gray-900 text-lg"><span>${escape_html(req.marca)}</span></h2> <span class="text-lg text-gray-900 font-bold">${escape_html(req.cantidad)}</span></div> <div class="flex justify-between text-sm text-gray-700"><small class="font-medium">Capacidad: ${escape_html(req.capacidad)} ml</small></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
