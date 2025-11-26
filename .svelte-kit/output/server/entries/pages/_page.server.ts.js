import { redirect } from "@sveltejs/kit";
import { c as config } from "../../chunks/config.js";
const load = async ({ locals, fetch }) => {
  if (!locals.user?.token) {
    throw redirect(303, "/login");
  }
  console.log("INGRESO A LAS REQUI");
  try {
    const res = await fetch(`${config.API_URL}/requisitions`, {
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
    const data = response.data ?? [];
    console.log(data.data);
    const requisitions = data.data ?? [];
    return {
      requisitions
    };
  } catch (err) {
    console.error("Error cargando requisiciones:", err);
    return {
      error: "Error de conexión"
    };
  }
};
export {
  load
};
