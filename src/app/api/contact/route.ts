import { NextResponse } from "next/server"
import { z } from "zod"

const ContactPayloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(200),
  email: z
    .string()
    .trim()
    .email("A valid email address is required.")
    .max(320),
  message: z.string().trim().min(1, "Message is required.").max(5000),
  botcheck: z.union([z.boolean(), z.string()]).optional(),
})

export async function POST(request: Request) {
  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    )
  }

  const parsed = ContactPayloadSchema.safeParse(rawBody)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid form input."
    return NextResponse.json({ error: firstIssue }, { status: 400 })
  }

  const { name, email, message, botcheck } = parsed.data

  // Honeypot check: silently succeed if botcheck is triggered
  if (
    botcheck === true ||
    (typeof botcheck === "string" &&
      botcheck.trim() !== "" &&
      botcheck !== "false")
  ) {
    return NextResponse.json(
      { success: true, message: "Transmission Successful" },
      { status: 200 }
    )
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    return NextResponse.json(
      { error: "Server configuration error: WEB3FORMS_ACCESS_KEY is not set." },
      { status: 500 }
    )
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        botcheck: false,
      }),
    })

    const result: unknown = await response.json().catch(() => null)

    if (response.ok) {
      return NextResponse.json(
        result ?? { success: true },
        { status: 200 }
      )
    }

    const upstreamError =
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof (result as { message?: unknown }).message === "string"
        ? (result as { message: string }).message
        : "Transmission Failed"

    return NextResponse.json(
      { error: upstreamError },
      { status: response.status }
    )
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
