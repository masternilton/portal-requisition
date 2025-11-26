import { redirect } from "@sveltejs/kit";
const load = async ({ locals, url }) => {
  if (!locals.user && url.pathname !== "/login") {
    throw redirect(303, "/login");
  }
  if (locals.user && url.pathname === "/login") {
    throw redirect(303, "/");
  }
  return {
    user: locals.user
  };
};
export {
  load
};
