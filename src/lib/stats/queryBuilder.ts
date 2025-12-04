import type { MetricRule, DeviceType } from "./rules";
import type { DateRange } from "./dateRanges";

//Ajuste TimeZone
const TIMEZONE = "America/Mexico_City";

export function buildQuery(
  rule: MetricRule,
  device: DeviceType,
  range: DateRange
): string {
  const parts: string[] = [];

  parts.push(...rule.metricParts);

  if (device !== "Total") {
    parts.push(device);
  }

  parts.push(`timezone=${TIMEZONE}`);

  parts.push(`activated_from=${range.from}`);
  parts.push(`activated_to=${range.to}`);

  return parts.join("&");
}
