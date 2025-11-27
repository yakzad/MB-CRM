import { redirect, fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const user = data.get("email");
    const password = data.get("password");

    if (!user || !password) {
      return fail(400, { message: "Please fill both fields." });
    }

    // ============================================================
    // TEMPORARY FAKE LOGIN (DEVELOPMENT ONLY)
    // ============================================================
    if (user === "jacktest" && password === "1234") {
      cookies.set("access_token", "dev-token", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 60 * 60,
      });

      cookies.set("refresh_token", "dev-refresh", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
      });

      throw redirect(302, "/dashboard");
    }

    // REAL API LOGIN BELOW
    const response = await fetch("https://api.mb-smart.net/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        User: user,
        Password: password,
      }),
    });

    if (!response.ok) {
      return fail(401, { message: "Invalid credentials." });
    }

    const json = await response.json();

    cookies.set("access_token", json.access_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 60 * 60,
    });

    cookies.set("refresh_token", json.refresh_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    throw redirect(302, "/dashboard");
  },
};
