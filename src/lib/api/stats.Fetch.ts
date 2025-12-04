import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

const API_BASE = "https://api-test.mbsmart.dev/apiv2";

export async function statsFetch(
  event: RequestEvent,
  path: string,
  options: RequestInit = {}
) {
  const { cookies, fetch } = event;
  const access = cookies.get("mb_access_token");

  if (!access) {
    throw redirect(303, "/login");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${access}`);
  headers.set("Content-Type", "application/json");

  // 👇 ESTE ES EL LOG QUE NECESITAMOS
  console.log("AUTH HEADER ENVIADO →", headers.get("Authorization"));

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
}
