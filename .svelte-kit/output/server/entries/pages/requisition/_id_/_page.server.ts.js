import { c as config } from "../../../../chunks/config.js";
import { redirect, fail } from "@sveltejs/kit";
const load = async ({ locals, fetch: fetch2, params }) => {
  const id = params.id;
  if (!locals.user?.token) {
    throw redirect(303, "/login");
  }
  try {
    const res = await fetch2(`${config.API_URL}/requisitions/${id}`, {
      headers: {
        "Authorization": `Bearer ${locals.user.token}`
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        error: err.message || "Error al cargar requisiciones"
      };
    }
    const response = await res.json();
    const data = response.data ?? {};
    const requisition = {
      id,
      fecha: data.created_at,
      solicitante: data.user?.name,
      estado: data.status?.name,
      items: data.requisition_details ?? []
    };
    return { requisition };
  } catch (err) {
    console.error("Error cargando requisiciones:", err);
    return {
      error: "Error de conexión"
    };
  }
};
const actions = {
  delete: async ({ request, locals, params }) => {
    const id = params.id;
    if (!locals.user?.token) return fail(401, { error: "No autenticado" });
    try {
      const res = await fetch(`${config.API_URL}/requisitions/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${locals.user.token}`
        }
      });
      const apiResponse = await res.json();
      if (!res.ok || !apiResponse.status) {
        let errorMsg = apiResponse.message || "Error del servidor";
        if (apiResponse.data && typeof apiResponse.data === "object") {
          const fieldErrors = Object.values(apiResponse.data).flat();
          if (fieldErrors.length > 0) {
            errorMsg = fieldErrors.join(" ");
          }
        }
        return fail(res.status, { error: errorMsg });
      }
      return { success: true };
    } catch (err) {
      return fail(500, { success: false, error: "Error de conexión" });
    }
  }
};
export {
  actions,
  load
};
