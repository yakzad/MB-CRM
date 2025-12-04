export type DeviceType = "Total" | "iOS" | "Android" | "Mac";

//Tipos
export type MetricRule = {
  id: string;
  label: string;
  metricParts: string[];
  from: string;
  to: string;
  devices: DeviceType[];
};

// installed
export const installedRule: MetricRule = {
  id: "installed_monthly",
  label: "Installed (Mensual)",
  metricParts: ["installed"],
  from: "2025-06-23",
  to: "2025-07-01",
  devices: ["Total", "iOS", "Android", "Mac"],
};

// installed_pro
export const installedProRule: MetricRule = {
  id: "installed_pro_monthly",
  label: "Installed Pro (Mensual)",
  metricParts: ["pro", "installed"],
  from: "2024-01-23",
  to: "2025-07-01",
  devices: ["Total", "iOS", "Android", "Mac"],
};

// UI
export const ALL_RULES: MetricRule[] = [installedRule, installedProRule];
