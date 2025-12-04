import { redirect, type Actions } from "@sveltejs/kit";

const API_BASE = "https://api-test.mbsmart.dev/apiv2";

export const actions: Actions = {
  default: async ({ request, cookies, fetch }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Missing credentials" };
    }

    const res = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        User: email,
        Password: password,
      }),
    });

    if (!res.ok) {
      return { error: "Invalid credentials" };
    }

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    cookies.set("mb_access_token", data.token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 60 * 60 * 24,
    });

    cookies.set("mb_refresh_token", data.refresh_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    throw redirect(303, "/crm/dashboard");
  },
};
