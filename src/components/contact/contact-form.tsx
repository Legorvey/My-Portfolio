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

    setState({ status: "loading" })

    try {
      const payload = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
        botcheck: Boolean(formData.get("botcheck")),
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data: unknown = await response.json().catch(() => null)

      if (response.ok) {
        setState({
          status: "success",
          message: "Transmission Successful",
        })
        form.reset()
      } else {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Transmission Failed"

        setState({
          status: "error",
          message: errorMessage,
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
