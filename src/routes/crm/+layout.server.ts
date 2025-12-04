import { redirect } from "@sveltejs/kit";

export async function load({ cookies, url }) {
  const access = cookies.get("mb_access_token") ?? null;
  const refresh = cookies.get("mb_refresh_token") ?? null;

  if (!access && !refresh) {
    throw redirect(302, "/login");
  }

  return {
    authenticated: true,
  };
}
