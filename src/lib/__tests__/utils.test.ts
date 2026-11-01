import { describe, expect, it } from "vitest"
import {
  cn,
  formatPeriod,
  formatProjectTypeLabel,
  formatYearMonth,
  resolveProjectStatus,
} from "@/lib/utils"

describe("Utils: cn (classnames helper)", () => {
  it("merges conditional classnames correctly", () => {
    expect(cn("base-class", true && "active", false && "inactive")).toBe(
      "base-class active"
    )
  })
})

describe("Utils: formatYearMonth", () => {
  it("formats standard YYYY-MM strings to Month Year", () => {
    expect(formatYearMonth("2025-01")).toBe("Jan 2025")
    expect(formatYearMonth("2024-12")).toBe("Dec 2024")
    expect(formatYearMonth("2023-08")).toBe("Aug 2023")
  })

  it("returns raw string if format is unrecognized", () => {
    expect(formatYearMonth("invalid")).toBe("invalid")
    expect(formatYearMonth("")).toBe("")
  })
})

describe("Utils: formatPeriod", () => {
  it("returns [W.I.P] when start is undefined or empty", () => {
    expect(formatPeriod()).toBe("[W.I.P]")
    expect(formatPeriod("")).toBe("[W.I.P]")
  })

  it("handles identical start and end dates as single period", () => {
    expect(formatPeriod("2025-01", "2025-01")).toBe("Jan 2025")
  })

  it("handles 'present' as end date", () => {
    expect(formatPeriod("2024-06", "present")).toBe("Jun 2024 – Present")
  })

  it("formats standard date ranges", () => {
    expect(formatPeriod("2024-01", "2024-06")).toBe("Jan 2024 – Jun 2024")
  })
})

describe("Utils: formatProjectTypeLabel", () => {
  it("capitalizes project types", () => {
    expect(formatProjectTypeLabel("hardware")).toBe("Hardware")
    expect(formatProjectTypeLabel("software")).toBe("Software")
    expect(formatProjectTypeLabel("research")).toBe("Research")
  })

  it("returns empty string on empty input", () => {
    expect(formatProjectTypeLabel("")).toBe("")
  })
})

describe("Utils: resolveProjectStatus", () => {
  it("returns explicit status when provided", () => {
    expect(resolveProjectStatus({ status: "In Review" })).toBe("In Review")
    expect(resolveProjectStatus({ status: "Completed", end: "present" })).toBe(
      "Completed"
    )
  })

  it("resolves to 'Ongoing' when end is 'present'", () => {
    expect(resolveProjectStatus({ end: "present" })).toBe("Ongoing")
  })

  it("resolves to 'Completed' when end date is before current year-month", () => {
    expect(resolveProjectStatus({ end: "2023-01" }, "2024-01")).toBe(
      "Completed"
    )
  })

  it("returns empty string when end date is in the future", () => {
    expect(resolveProjectStatus({ end: "2025-12" }, "2025-01")).toBe("")
  })
})
