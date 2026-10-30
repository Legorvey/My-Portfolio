import { afterEach, describe, expect, it, vi } from "vitest"
import { GET } from "@/app/api/weather/route"

describe("Weather API Route (/api/weather)", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("returns formatted temperature with 15-minute cache header on successful fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          current: {
            temperature_2m: 23.4,
          },
        }),
      })
    )

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ temp: "23°C" })
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=900")
  })

  it("falls back to default 24°C with 5-minute cache on upstream failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    )

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ temp: "24°C" })
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=300")
  })

  it("falls back to default 24°C when upstream response is malformed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          current: {},
        }),
      })
    )

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ temp: "24°C" })
  })

  it("falls back to default 24°C when fetch throws a network error or timeout", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network timeout"))
    )

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ temp: "24°C" })
  })
})
