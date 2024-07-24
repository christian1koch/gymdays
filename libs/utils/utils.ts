export function dateToYearMonthDay(date: Date): string {
  return date.toISOString().split("T")[0];
}
