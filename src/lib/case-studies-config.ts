/**
 * Case Studies Access Configuration
 *
 * Controls whether individual project case study pages (/projects/[slug])
 * are accessible and clickable across the site.
 *
 * Logic:
 * 1. Explicit override via `NEXT_PUBLIC_ENABLE_CASE_STUDIES`:
 *    - "true"  -> always enabled
 *    - "false" -> always disabled
 * 2. Default behavior:
 *    - "development" or "test" -> true (viewable on localhost and during unit tests)
 *    - "production" -> false (blocked for MVP deployment)
 */
export function areCaseStudiesEnabled(): boolean {
  const envOverride = process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES

  if (envOverride === "true") {
    return true
  }
  if (envOverride === "false") {
    return false
  }

  return process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
}
