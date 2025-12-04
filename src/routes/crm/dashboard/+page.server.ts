import { statsFetch } from "$lib/api/stats.Fetch";

type MonthlyStatsResponse = {
  labels: string[];
  ios: number[];
  android: number[];
  mac: number[];
};

function toSeries(data: MonthlyStatsResponse) {
  const devices = ["ios", "android", "mac"] as const;

  return devices.map((dev) => ({
    device: dev.toUpperCase(),
    points: data.labels.map((label: string, i: number) => ({
      label,
      value: data[dev][i] ?? 0,
    })),
  }));
}

type Platform = "ios" | "android" | "mac";

type MonthlyPlatformQueries = {
  monthLabel: string;
  queries: Record<Platform, string>;
};

const TIMEZONE = "America/Mexico_City";

function buildMonthlyInstalledQueries(
  year: number,
  extraQuery: string
): MonthlyPlatformQueries[] {
  const months = [
    { label: "January", start: "-1-1", end: "-2-1" },
    { label: "February", start: "-2-1", end: "-3-1" },
    { label: "March", start: "-3-1", end: "-4-1" },
    { label: "April", start: "-4-1", end: "-5-1" },
    { label: "May", start: "-5-1", end: "-6-1" },
    { label: "June", start: "-6-1", end: "-7-1" },
    { label: "July", start: "-7-1", end: "-8-1" },
    { label: "August", start: "-8-1", end: "-9-1" },
    { label: "September", start: "-9-1", end: "-10-1" },
    { label: "October", start: "-10-1", end: "-11-1" },
    { label: "November", start: "-11-1", end: "-12-1" },
    { label: "December", start: "-12-1", end: "-1-1", nextYear: true },
  ];

  const platforms: Platform[] = ["ios", "android", "mac"];

  return months.map((m) => {
    const from = `${year}${m.start}`;
    const toYear = m.nextYear ? year + 1 : year;
    const to = `${toYear}${m.end}`;

    const queries: Record<Platform, string> = {
      ios: "",
      android: "",
      mac: "",
    };

    for (const platform of platforms) {
      const parts: string[] = [];

      if (extraQuery.trim() !== "") parts.push(extraQuery.trim());

      parts.push(platform);
      parts.push(`timezone=${TIMEZONE}`);
      parts.push("installed");
      parts.push(`activated_from=${from}`);
      parts.push(`activated_to=${to}`);

      queries[platform] = parts.join("&");
    }

    return {
      monthLabel: m.label,
      queries,
    };
  });
}

async function fetchMonthlyPlatformCounts(
  event: any,
  monthlyQueries: MonthlyPlatformQueries[]
) {
  const results: MonthlyStatsResponse = {
    labels: [],
    ios: [],
    android: [],
    mac: [],
  };

  for (const entry of monthlyQueries) {
    results.labels.push(entry.monthLabel);

    const iosRes = await statsFetch(event, "/devices/query", {
      method: "POST",
      body: JSON.stringify({ query: entry.queries.ios }),
    });
    results.ios.push((await iosRes.json()).query ?? 0);

    const androidRes = await statsFetch(event, "/devices/query", {
      method: "POST",
      body: JSON.stringify({ query: entry.queries.android }),
    });
    results.android.push((await androidRes.json()).query ?? 0);

    const macRes = await statsFetch(event, "/devices/query", {
      method: "POST",
      body: JSON.stringify({ query: entry.queries.mac }),
    });
    results.mac.push((await macRes.json()).query ?? 0);
  }

  return results;
}

export async function load(event) {
  try {
    // PRO
    const monthlyPro = buildMonthlyInstalledQueries(2024, "pro");
    const monthlyCountsPro = await fetchMonthlyPlatformCounts(
      event,
      monthlyPro
    );

    // BASIC
    const monthlyBasic = buildMonthlyInstalledQueries(2024, "basic");
    const monthlyCountsBasic = await fetchMonthlyPlatformCounts(
      event,
      monthlyBasic
    );

    // GENERAL = PRO + BASIC
    const monthlyGeneralCounts: MonthlyStatsResponse = {
      labels: monthlyCountsPro.labels,
      ios: monthlyCountsPro.ios.map((v, i) => v + monthlyCountsBasic.ios[i]),
      android: monthlyCountsPro.android.map(
        (v, i) => v + monthlyCountsBasic.android[i]
      ),
      mac: monthlyCountsPro.mac.map((v, i) => v + monthlyCountsBasic.mac[i]),
    };

    return {
      monthlyGeneralSeries: toSeries(monthlyGeneralCounts),
      monthlyProSeries: toSeries(monthlyCountsPro),
      monthlyBasicSeries: toSeries(monthlyCountsBasic),
    };
  } catch (err) {
    console.error("Dashboard failed:", err);
    return {
      monthlyGeneralSeries: null,
      monthlyProSeries: null,
      monthlyBasicSeries: null,
    };
  }
}
