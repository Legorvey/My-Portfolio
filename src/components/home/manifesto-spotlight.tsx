import { TextSpotlight } from "@/components/ui/text-spotlight"

interface ManifestoSpotlightProps {
  className?: string
}

export function ManifestoSpotlight({ className }: ManifestoSpotlightProps) {
  return (
    <section
      aria-label="Engineering Focus"
      className={className}
    >
      <div className="border-l-2 border-primary/60 pl-6 sm:pl-8 py-1 space-y-4 max-w-[72ch]">
        {/* Monospace Technical Label */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            // 01 · ORIENTATION & FOCUS
          </span>
          <span className="h-px flex-1 max-w-[60px] bg-border" aria-hidden="true" />
        </div>

        {/* Editorial Spotlight Headline */}
        <TextSpotlight
          text="Bridging physical circuitry, low-level firmware, and deterministic logic into reliable real-world systems."
          textClassName="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug"
          baseClassName="text-muted-foreground/45"
          spotlightClassName="text-foreground"
          spotlightSize={190}
          spotlightArea={65}
          animateOnPhone={true}
        />

        {/* Dense Technical Metadata Subline */}
        <p className="font-mono text-xs text-muted-foreground sm:text-sm pt-1">
          Electrical Engineering @ Padjadjaran University · IoT telemetry, robotics actuation, and hardware-software co-design.
        </p>
      </div>
    </section>
  )
}
