import { redirect } from "@sveltejs/kit";
import { c as config } from "../../../chunks/config.js";
const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const login = data.get("login")?.toString();
    const password = data.get("password")?.toString();
    if (!login || !password) {
      return { error: "Faltan credenciales" };
    }
    const res = await fetch(`${config.API_URL_DASH}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { error: err.message || "Credenciales incorrectas" };
    }
    const apiResponse = await res.json();
    const token = apiResponse.token;
    if (!token) {
      return { error: "No se recibió token" };
    }
    const user = {
      id: apiResponse.id,
      name: apiResponse.name,
      email: apiResponse.email,
      isActive: apiResponse.isActive,
      roles: apiResponse.roles,
      group: {
        id: apiResponse.group_id,
        name: apiResponse.group_name
      },
      account: {
        id: apiResponse.account_id,
        name: apiResponse.account_name
      }
    };
    cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24
      // 1 día
    });
    cookies.set("user", JSON.stringify(user), {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24
    });
    throw redirect(303, "/");
  }
};
export {
  actions
};
