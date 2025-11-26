import { s as store_get, a as attr_class, u as unsubscribe_stores, b as slot, c as bind_props } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { d as derived } from "../../chunks/index.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { g as getContext } from "../../chunks/context.js";
import "clsx";
import { e as escape_html } from "../../chunks/escaping.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const user = derived(page, ($page) => $page.data.user);
    const authenticated = derived(user, ($user) => !!$user);
    $$renderer2.push(`<header class="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50"><div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><button class="flex items-center space-x-2"><img src="/logo.png" alt="Logo" class="h-8 w-auto"/> <span class="text-lg font-semibold">Bottle Tracking</span></button> <button class="md:hidden"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button> <nav class="hidden md:flex items-center space-x-6">`);
    if (store_get($$store_subs ??= {}, "$authenticated", authenticated)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-sm">Hola, ${escape_html(store_get($$store_subs ??= {}, "$user", user)?.name)}</span> <form action="/logout" method="POST"><button type="submit" class="hover:text-gray-300">Logout</button></form>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a href="/login" class="hover:text-gray-300">Login</a>`);
    }
    $$renderer2.push(`<!--]--></nav></div> <div${attr_class(`md:hidden overflow-hidden transition-all duration-300 ${"max-h-0"}`)}><ul class="py-2 bg-black border-t border-gray-700">`);
    if (store_get($$store_subs ??= {}, "$authenticated", authenticated)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<li class="px-4 py-2 text-sm">Hola, ${escape_html(store_get($$store_subs ??= {}, "$user", user)?.name)}</li> <li><button class="block w-full px-4 py-2 text-left hover:bg-gray-800">Perfil</button></li> <li><form action="/logout" method="POST" class="w-full"><button type="submit" class="block w-full px-4 py-2 text-left hover:bg-gray-800">Logout</button></form></li>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<li><a href="/login" class="block w-full px-4 py-2 text-left hover:bg-gray-800">Login</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    data.user;
    $$renderer2.push(`<div class="min-h-screen flex flex-col">`);
    Header($$renderer2);
    $$renderer2.push(`<!----> <main class="flex-1 pt-16 md:pt-20 pb-safe bg-gray-100 text-gray-900 svelte-12qhfyh"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></main></div>`);
    bind_props($$props, { data });
  });
}
export {
  _layout as default
};
