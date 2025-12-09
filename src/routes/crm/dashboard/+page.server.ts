import { statsFetch } from "$lib/api/stats.fetch";

function buildMonthlyQueries(prefix: string, device: string) {
  const queries: Record<string, string> = {};

  for (let month = 1; month <= 12; month++) {
    const mm = String(month).padStart(2, "0");

    const key = `${prefix}_${device}_2024-${mm}`;

    const from = `2024-${mm}-01`;
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? 2025 : 2024;
    const to = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

    // FIX 🔥 installed_pro → installed&pro
    const rulePrefix = prefix.includes("_") ? prefix.replace("_", "&") : prefix;

    const rule =
      device === "total"
        ? `${rulePrefix}&activated_from=${from}&activated_to=${to}`
        : `${device}&${rulePrefix}&activated_from=${from}&activated_to=${to}`;

    queries[key] = rule;
  }

  return queries;
}

export async function load(event) {
  const type = event.url.searchParams.get("type") ?? "general";

  const queries = {
    // installed general
    ...buildMonthlyQueries("installed", "ios"),
    ...buildMonthlyQueries("installed", "android"),
    ...buildMonthlyQueries("installed", "mac"),
    ...buildMonthlyQueries("installed", "total"),

    // installed PRO
    ...buildMonthlyQueries("installed_pro", "ios"),
    ...buildMonthlyQueries("installed_pro", "android"),
    ...buildMonthlyQueries("installed_pro", "mac"),
    ...buildMonthlyQueries("installed_pro", "total"),
  };

  const res = await statsFetch(event, "/devices/query", {
    method: "POST",
    body: JSON.stringify({ queries }),
  });

  const stats = await res.json();

  return { type, stats };
}
