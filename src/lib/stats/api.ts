import { generateMonthlyRanges } from "./dateRanges";
import { buildQuery } from "./queryBuilder";
import type { MetricRule, DeviceType } from "./rules";

export type MonthlyPoint = {
  label: string;
  value: number;
};

export type SeriesByDevice = {
  device: DeviceType;
  points: MonthlyPoint[];
};

export async function fetchSeriesForRule(
  rule: MetricRule
): Promise<SeriesByDevice[]> {
  const ranges = generateMonthlyRanges(rule.from, rule.to);

  const result: SeriesByDevice[] = [];

  for (const device of rule.devices) {
    const points: MonthlyPoint[] = [];

    for (const range of ranges) {
      const query = buildQuery(rule, device, range);

      const url = `https://api.mbsmart.org/stats?${query}`;

      let value = 0;

      try {
        const res = await fetch(url);
        const data = await res.json();

        value = Number(data.count ?? 0);
      } catch (err) {
        console.error("Stats API error:", err);
        value = 0;
      }

      points.push({
        label: range.from.slice(0, 7),
        value,
      });
    }

    result.push({ device, points });
  }

  return result;
}
