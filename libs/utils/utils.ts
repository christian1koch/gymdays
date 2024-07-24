export function dateToYearMonthDay(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function numberToWeightString(weight: number): string {
  return `${weight} kg`;
}

export function bulkNumberToWeightString(weights: number[]): string {
  return weights.map((weight) => `${weight}`).join(" ");
}
