import { e as ensure_array_like, d as attr } from "../../chunks/index2.js";
import { p as page } from "../../chunks/index3.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { e as escape_html } from "../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let requisitions;
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = String(date.getFullYear()).slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    function formatToDMY(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    requisitions = page.data.requisitions || [];
    page.data.error;
    $$renderer2.push(`<section class="p-6"><h1 class="text-2xl font-bold mb-4">Requisiciones</h1> <div class="flex items-center justify-end mb-2"><button class="bg-black text-white font-semibold py-2 rounded-lg text-md w-[40%] max-w-sm active:scale-95 transition-transform">+ Nueva</button></div> <div class="flex flex-col gap-4"><!--[-->`);
    const each_array = ensure_array_like(requisitions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let req = each_array[$$index];
      $$renderer2.push(`<div class="bg-white rounded-xl shadow-sm border border-gray-200 transition-transform active:scale-[0.98]"><a${attr("href", `/requisition/${req.id}`)} class="block p-2 flex flex-col gap-1 cursor-pointer hover:bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"><div class="flex justify-between items-center"><h2 class="font-semibold text-gray-900 text-lg">${escape_html(req.description)}</h2> <span class="text-lg text-gray-900"><small></small> `);
      if (req.status?.name.includes("finalizada")) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="px-3 py-1 rounded-full text-xs font-semibold border bg-green-100 text-green-700 border-green-300">${escape_html(req.status?.name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="px-3 py-1 rounded-full text-xs font-semibold border bg-yellow-100 text-yellow-700 border-yellow-300">${escape_html(req.status?.name)}</span>`);
      }
      $$renderer2.push(`<!--]--></span></div> <div class="flex justify-between text-md text-gray-700"><small class="font-medium">#${escape_html(formatDate(req.created_at))}</small> <small class="font-medium">Fecha: ${escape_html(formatToDMY(req.created_at))}</small></div></a></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (requisitions.length == 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="border-2 border-dashed border-gray-300 rounded-xl p-4 m-4 text-center"><p class="text-gray-500 text-lg font-medium">Aún no hay requisiciones agregadas</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
export {
  _page as default
};
