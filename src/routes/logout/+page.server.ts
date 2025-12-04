import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ cookies }) => {
    cookies.delete("mb_access_token", { path: "/" });
    cookies.delete("mb_refresh_token", { path: "/" });
    throw redirect(303, "/login");
  },
};
