import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

const API_BASE = "https://api-test.mbsmart.dev/apiv2";

export async function apiFetch(
  event: RequestEvent,
  path: string,
  options: RequestInit = {}
) {
  const { cookies, fetch } = event;

  const access = cookies.get("mb_access_token");
  const refresh = cookies.get("mb_refresh_token");

  if (!access || !refresh) {
    throw redirect(303, "/login");
  }

  async function doRequest(token: string) {
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${token}`);

    if (!headers.has("Content-Type") && options.body) {
      headers.set("Content-Type", "application/json");
    }

    return fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });
  }

  // Intento con access token
  let res = await doRequest(access);

  if (res.status !== 401) {
    return res;
  }

  // REFRESH TOKEN — usando API nueva
  const refreshRes = await fetch(`${API_BASE}/admin/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ RefreshToken: refresh }),
  });

  if (!refreshRes.ok) {
    cookies.delete("mb_access_token", { path: "/" });
    cookies.delete("mb_refresh_token", { path: "/" });
    throw redirect(303, "/login");
  }

  const newTokens = await refreshRes.json();

  cookies.set("mb_access_token", newTokens.Token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 60 * 60 * 24,
  });

  cookies.set("mb_refresh_token", newTokens.RefreshToken, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
  });

  // Reintento con token nuevo
  res = await doRequest(newTokens.Token);
  return res;
}
