import { NextResponse } from "next/server"

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-6.9175&longitude=107.6191&current=temperature_2m"

interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number
  }
}

export async function GET() {
  try {
    const res = await fetch(WEATHER_URL, {
      next: { revalidate: 900 },
    })

    if (!res.ok) {
      throw new Error(`Weather fetch failed: ${res.status}`)
    }

    const data = (await res.json()) as OpenMeteoResponse

    if (typeof data.current?.temperature_2m !== "number") {
      throw new Error("Missing temperature_2m in response")
    }

    const temp = Math.round(data.current.temperature_2m)

    return NextResponse.json(
      { temp: `${temp}°C` },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
        },
      }
    )
  } catch {
    return NextResponse.json({ temp: "24°C" })
  }
}
