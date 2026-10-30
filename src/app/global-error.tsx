"use client"

import * as React from "react"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#0B0C0E] text-[#ECEAE4] p-6 font-mono text-xs">
        <div className="max-w-md space-y-4 rounded-sm border border-[#232730] bg-[#13151A] p-6">
          <p className="text-xl font-semibold text-[#38BDF8]">500</p>
          <h1 className="text-sm font-semibold text-[#ECEAE4]">
            Global Application Fault
          </h1>
          <p className="text-[#94A3B8]">
            An unrecoverable application error occurred. Diagnostic details suppressed.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex h-8 items-center rounded-sm border border-[#38BDF8] bg-[#38BDF8] px-3 py-1 text-xs font-medium text-[#0B0C0E] hover:opacity-90"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
