import { l as loadingMarcas, e as errorMarcas, m as marcas } from "../../../../chunks/brandStore.js";
import { c as config } from "../../../../chunks/config.js";
const load = async ({ fetch, locals }) => {
  loadingMarcas.set(true);
  errorMarcas.set(null);
  let marcasList = [];
  try {
    const res = await fetch(`${config.API_URL_DASH}/v2dash/brands/list`, {
      headers: {
        Authorization: `Bearer ${locals.user?.token}`
      }
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }
    const data = await res.json();
    const items = data?.data?.items ?? [];
    if (!Array.isArray(items)) {
      throw new Error("Formato inesperado");
    }
    marcasList = items.map((item) => ({
      id: String(item.id),
      name: String(item.name)
    }));
    marcas.set(marcasList);
  } catch (err) {
    errorMarcas.set("No se pudieron cargar las marcas");
    console.error(err);
  } finally {
    loadingMarcas.set(false);
  }
  return {
    marcas: marcasList
  };
};
export {
  load
};
