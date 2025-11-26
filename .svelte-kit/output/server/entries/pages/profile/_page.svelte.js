import { e as escape_html } from "../../../chunks/escaping.js";
import "clsx";
function _page($$renderer) {
  let user = { name: "Juan Pérez", email: "juan@example.com" };
  $$renderer.push(`<section class="p-6"><h1 class="text-2xl font-semibold mb-4">Perfil de usuario</h1> <div class="bg-white shadow-md rounded-xl p-4"><p><strong>Nombre:</strong> ${escape_html(user.name)}</p> <p><strong>Email:</strong> ${escape_html(user.email)}</p></div></section>`);
}
export {
  _page as default
};
