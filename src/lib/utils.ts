export { cn } from "cn"

export function formatPeriod(start?: string, end?: string): string {
  if (!start && !end) return "—"
  if (start && end) {
    return start === end ? start : `${start} — ${end}`
  }
  return start ?? end ?? "—"
}
