import { e as ensure_array_like } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { p as page } from "../../../../chunks/index3.js";
function formatDate(dateISOString) {
  const date = new Date(dateISOString);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let requisition;
    requisition = page.data.requisition || {};
    page.data.error;
    $$renderer2.push(`<section class="p-6 max-w-4xl mx-auto"><h1 class="text-2xl font-bold mb-4">Requisición #${escape_html(formatDate(requisition?.fecha))}</h1> <div class="flex items-center justify-end mb-2"><button class="flex items-center bg-black text-white hover:bg-gray-800 transition-colors rounded-lg px-3 py-2 mb-4 active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg> <span class="font-medium">Volver</span></button></div> <div class="bg-white shadow-sm rounded-xl p-4 border border-gray-200 mb-6"><p><strong>Fecha:</strong> ${escape_html(requisition.fecha)}</p> <p><strong>Solicitante:</strong> ${escape_html(requisition.solicitante)}</p> <p><strong>Estado:</strong> ${escape_html(requisition.estado)}</p></div> <div class="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden"><div class="grid font-semibold text-gray-700 border-b border-gray-200 px-4 py-2 text-sm" style="grid-template-columns: 70% 15% 15%;"><span class="text-left">Productos solicitados</span> <span class="text-center">Capac.</span> <span class="text-center">Cant.</span></div> <!--[-->`);
    const each_array = ensure_array_like(requisition.items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<div class="grid px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-sm items-center" style="grid-template-columns: 70% 15% 15%;"><span class="truncate">${escape_html(item.brand)}</span> <span class="text-center">${escape_html(item.capacity)}</span> <span class="text-center font-bold text-md">${escape_html(item.quantity)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-5"><button class="w-full bg-[#F73B3B] text-white font-semibold py-3 rounded-lg text-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100">borrar</button></div></section> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
