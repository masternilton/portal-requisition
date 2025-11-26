import { redirect } from "@sveltejs/kit";
const POST = ({ cookies, locals }) => {
  cookies.delete("token", { path: "/" });
  cookies.delete("user", { path: "/" });
  locals.user = null;
  throw redirect(303, "/login");
};
export {
  POST
};
