import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, cookies }) => {
    // Simulación de login correcto
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");

    // Login FALSO para probar — reemplazar más adelante
    if (!email || !password) {
      return {
        error: "Missing credentials",
      };
    }

    // Guardar token
    cookies.set("access_token", "123456", {
      path: "/", // ← MUY IMPORTANTE
      httpOnly: true,
      sameSite: "strict",
      secure: false, // true en producción
      maxAge: 60 * 60 * 24 * 7,
    });

    throw redirect(302, "/dashboard");
  },
};
