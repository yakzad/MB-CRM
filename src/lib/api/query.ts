import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

const API_BASE = "https://api.mb-smart.net";

export async function runQuery(event: RequestEvent, body: Record<string, any>) {
  const { cookies, fetch } = event;

  const access = cookies.get("mb_access_token");
  if (!access) throw redirect(303, "/login");

  const res = await fetch(`${API_BASE}/devices/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Query error:", res.status);
    throw redirect(303, "/login");
  }

  return await res.json();
}
