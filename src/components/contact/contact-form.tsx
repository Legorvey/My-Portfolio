"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

type SubmissionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string }

export function ContactForm() {
  const [state, setState] = React.useState<SubmissionState>({ status: "idle" })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    // Honeypot check: if botcheck checkbox is checked, silently ignore
    if (formData.get("botcheck")) {
      setState({
        status: "success",
        message: "Transmission Successful",
      })
      form.reset()
      return
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (!accessKey) {
      setState({
        status: "error",
        message:
          "Transmission Failed: NEXT_PUBLIC_WEB3FORMS_KEY is not configured.",
      })
      return
    }

    setState({ status: "loading" })

    try {
      const payload = {
        access_key: accessKey,
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim(),
        botcheck: Boolean(formData.get("botcheck")),
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setState({
          status: "success",
          message: "Transmission Successful",
        })
        form.reset()
      } else {
        setState({
          status: "error",
          message: "Transmission Failed",
        })
      }
    } catch {
      setState({
        status: "error",
        message: "System Error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          ID / Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter your name"
          disabled={state.status === "loading"}
          className="w-full rounded-sm border border-input bg-background px-3 py-2 font-sans text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Secure Route (Email)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="address@company.com"
          disabled={state.status === "loading"}
          className="w-full rounded-sm border border-input bg-background px-3 py-2 font-sans text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="message"
          className="block font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Payload (Message)
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="State your intent..."
          disabled={state.status === "loading"}
          className="w-full rounded-sm border border-input bg-background px-3 py-2 font-sans text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button
          type="submit"
          variant="default"
          disabled={state.status === "loading"}
        >
          {state.status === "loading"
            ? "Transmitting..."
            : "Execute Transmission ➔"}
        </Button>

        {state.status === "success" && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-sm border border-primary bg-surface px-3 py-1 font-mono text-xs font-medium text-primary"
          >
            {state.message}
          </p>
        )}

        {state.status === "error" && (
          <p
            role="alert"
            aria-live="assertive"
            className="rounded-sm border border-destructive bg-surface px-3 py-1 font-mono text-xs font-medium text-destructive"
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}
