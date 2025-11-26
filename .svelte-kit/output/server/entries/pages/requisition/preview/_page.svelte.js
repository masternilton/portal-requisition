import { s as store_get, e as ensure_array_like, a as attr_class, f as stringify, d as attr, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { i as itemsRequisition } from "../../../../chunks/requisitionStore.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let message;
    let isSubmitting = false;
    message = "";
    $$renderer2.push(`<section class="p-6 max-w-4xl mx-auto"><h1 class="text-2xl font-bold mb-4">Nueva Requisición</h1> <div class="flex items-center justify-end mb-2"><button class="flex items-center bg-black text-white hover:bg-gray-800 transition-colors rounded-lg px-3 py-2 mb-4 active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg> <span class="font-medium">Volver</span></button></div> <div class="bg-white shadow-sm rounded-xl p-4 border border-gray-200 mb-6"><p><strong>Fecha:</strong> ${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString())}</p> <p><strong>Solicitante:</strong></p> <p><strong>Estado:</strong> Por completar</p></div> <div class="flex items-center justify-end mb-2"><button class="flex items-center bg-black font-semibold text-white hover:bg-gray-800 transition-colors rounded-lg px-3 py-2 mb-4 active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg> <span>Agregar item</span></button></div> <div class="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden"><div class="grid font-semibold text-gray-700 border-b border-gray-200 px-4 py-2 text-sm" style="grid-template-columns: 70% 15% 15%;"><span class="text-left">Productos solicitados</span> <span class="text-center">Capac.</span> <span class="text-center">Cant.</span></div> `);
    if (store_get($$store_subs ??= {}, "$itemsRequisition", itemsRequisition).length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$itemsRequisition", itemsRequisition));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<div class="grid px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-sm items-center" style="grid-template-columns: 70% 15% 15%;"><span class="truncate">${escape_html(item.name)}</span> <span class="text-center">${escape_html(item.capacidad)}</span> <span class="text-center font-bold text-md">${escape_html(item.cantidad)}</span></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="border-2 border-dashed border-gray-300 rounded-xl p-12 m-4 text-center"><p class="text-gray-500 text-lg font-medium">Aún no hay ítems agregados en la requisición</p> <p class="text-gray-400 text-sm mt-2">Haz clic en "Agregar ítem" para comenzar</p></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-8 space-y-4">`);
    if (message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full mx-auto"><p${attr_class(`text-center font-medium ${stringify(message.includes("enviada") ? "text-green-600" : "text-red-600")}`)}>${escape_html(message)}</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$itemsRequisition", itemsRequisition).length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full mx-auto"><form method="POST" action="?/create_requisition"><input type="hidden" name="requisition_items"${attr("value", JSON.stringify(store_get($$store_subs ??= {}, "$itemsRequisition", itemsRequisition)))}/> <button type="submit"${attr("disabled", isSubmitting, true)} class="bg-[#0B4F6C] text-white font-semibold py-3 px-6 rounded-lg text-lg w-full active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Enviar Requisición`);
      }
      $$renderer2.push(`<!--]--></button></form></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
