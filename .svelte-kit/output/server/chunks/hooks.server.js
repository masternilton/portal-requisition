import { redirect } from "@sveltejs/kit";
const handle = async ({ event, resolve }) => {
  const token = event.cookies.get("token");
  const userJson = event.cookies.get("user");
  if (token && userJson) {
    try {
      const user = JSON.parse(userJson);
      event.locals.user = { token, ...user };
    } catch {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }
  const protectedRoutes = ["/requisition", "/profile", "/dashboard"];
  const isProtected = protectedRoutes.some(
    (path) => event.url.pathname.startsWith(path)
  );
  if (isProtected && !event.locals.user) {
    throw redirect(303, "/login");
  }
  return resolve(event);
};
export {
  handle
};
