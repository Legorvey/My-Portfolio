import { describe, expect, it } from "vitest"
import { EXPERIENCES } from "@/components/experience/experience-timeline"

describe("Experience section data integrity", () => {
  it("contains valid experience records", () => {
    expect(EXPERIENCES.length).toBeGreaterThan(0)

    for (const exp of EXPERIENCES) {
      expect(exp.id).toBeTruthy()
      expect(exp.company).toBeTruthy()
      expect(exp.role).toBeTruthy()
      expect(exp.period).toBeTruthy()
      expect(exp.category).toBeTruthy()
      expect(exp.bullets.length).toBeGreaterThan(0)
      expect(exp.logo).toBeDefined()
      expect(exp.logo.text).toBeTruthy()
      expect(exp.status).toMatch(/^(Active|Inactive)$/)
      expect(exp.actions.length).toBeGreaterThan(0)
    }
  })

  it("has valid link formats if present", () => {
    for (const exp of EXPERIENCES) {
      if (exp.links) {
        for (const link of exp.links) {
          expect(link.label).toBeTruthy()
          expect(link.href).toBeTruthy()
        }
      }
    }
  })
})
