import Link from "next/link"
import { Container } from "@/components/layout/container"

export default function Home() {
  return (
    <Container className="py-12">
      <section className="max-w-[72ch]">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          ADITYA CHANDRASA · ELECTRICAL ENGINEERING
        </p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          Building Logic from Schematic to Hardware
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Electrical Engineering student focused on practical logic behind physical systems. I build prototypes that work in the lab and stay reliable in the field.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/dev/tokens"
            className="inline-flex h-8 items-center rounded-sm border border-primary bg-primary px-3 py-1 font-mono text-xs font-medium text-primary-foreground transition-colors duration-150 hover:opacity-90"
          >
            Inspect Design Tokens (/dev/tokens)
          </Link>
        </div>
      </section>
    </Container>
  )
}
