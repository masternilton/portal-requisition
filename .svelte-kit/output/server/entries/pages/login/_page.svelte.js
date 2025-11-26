import { h as head, d as attr, c as bind_props } from "../../../chunks/index2.js";
import { U as fallback } from "../../../chunks/utils2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = fallback($$props["form"], () => ({}), true);
    let submitting = false;
    head("1x05zx6", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Iniciar Sesión | Requisiciones</title>`);
      });
      $$renderer3.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>`);
    });
    $$renderer2.push(`<section class="flex items-center justify-center min-h-screen p-4 -mt-16 md:-mt-20"><div class="w-full max-w-sm"><div class="bg-white rounded-3xl shadow-2xl p-8 animate-in slide-in-from-bottom duration-500"><div class="text-center mb-8"><div class="mx-auto w-20 h-20 bg-transparent flex items-center justify-center mb-3"><img src="/logo.png" alt="Logo" class="h-15 w-auto"/></div> <h1 class="text-3xl font-bold text-gray-900">Requisiciones</h1> <p class="text-gray-600 text-sm mt-1">Ingresa con tu cuenta</p></div> <form method="POST" class="space-y-6"><div><label for="login" class="block text-sm font-semibold text-gray-800 mb-2">Usuario</label> <input id="login" name="login" type="text" autocomplete="username" required placeholder="tu.usuario" enterkeyhint="next" autocapitalize="off"${attr("spellcheck", false)} class="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200"/></div> <div><label for="password" class="block text-sm font-semibold text-gray-800 mb-2">Contraseña</label> <input id="password" name="password" type="password" autocomplete="current-password" required placeholder="••••••••" enterkeyhint="go" class="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200"/></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm flex items-center gap-2 animate-in fade-in duration-300"><svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path></svg> <span>${escape_html(form.error)}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", submitting, true)} class="w-full bg-black hover:bg-gray-900 text-white font-bold text-xl py-5 rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-3 shadow-lg">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span>Entrar</span>`);
    }
    $$renderer2.push(`<!--]--></button></form> <p class="text-center text-xs text-gray-500 mt-8 font-medium">© 2025 Requisiciones App</p></div></div></section>`);
    bind_props($$props, { form });
  });
}
export {
  _page as default
};
