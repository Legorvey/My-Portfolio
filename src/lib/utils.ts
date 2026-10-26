export { cn } from "cn"

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

const BUILD_YEAR_MONTH = (() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
})()

export function formatYearMonth(ym: string): string {
  const [year, monthStr] = ym.split("-")
  const monthIndex = Number(monthStr) - 1
  const monthName = MONTH_NAMES[monthIndex]
  if (!year || !monthName) return ym
  return `${monthName} ${year}`
}

export function formatPeriod(start?: string, end?: string): string {
  if (!start) return "[W.I.P]"
  const formattedStart = formatYearMonth(start)
  if (!end || start === end) return formattedStart
  if (end === "present") return `${formattedStart} – Present`
  return `${formattedStart} – ${formatYearMonth(end)}`
}

export function formatProjectTypeLabel(type: string): string {
  if (!type) return ""
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function resolveProjectStatus(
  input: { status?: string; end?: string },
  currentYearMonth: string = BUILD_YEAR_MONTH
): string {
  if (input.status && input.status.trim() !== "") {
    return input.status.trim()
  }
  if (input.end === "present") {
    return "Ongoing"
  }
  if (input.end && input.end.localeCompare(currentYearMonth) < 0) {
    return "Completed"
  }
  return ""
}
