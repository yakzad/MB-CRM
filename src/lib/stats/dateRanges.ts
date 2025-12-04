export type DateRange = {
  from: string;
  to: string;
};

export function generateMonthlyRanges(start: string, end: string): DateRange[] {
  const output: DateRange[] = [];

  let current = new Date(start);
  const endDate = new Date(end);

  while (current < endDate) {
    const next = new Date(current);
    next.setMonth(current.getMonth() + 1);

    const from = current.toISOString().slice(0, 10);
    const to = next.toISOString().slice(0, 10);

    output.push({ from, to });
    current = next;
  }

  return output;
}
