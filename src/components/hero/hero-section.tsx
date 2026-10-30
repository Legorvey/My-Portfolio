export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex h-screen min-h-[100dvh] w-full flex-col justify-between pt-3 sm:pt-4 px-6 sm:px-8 lg:px-12 pb-6 sm:pb-8 overflow-hidden"
    >
      {/* Top Spacer matching the height of the fixed SiteHeader navbar */}
      <div className="h-10 sm:h-12 w-full shrink-0" aria-hidden="true" />

      {/* Center Stage: Display Headline + Close Metadata Group */}
      <div className="my-auto flex w-full flex-col items-center justify-center">
        <div className="relative inline-flex flex-col items-start max-w-full">
          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-sans font-extrabold tracking-[-0.04em] leading-[0.88] sm:leading-[0.86]"
          >
            <span className="sr-only">Hi there I am Aditya.</span>

            {/* Line 1: Sized larger to match the horizontal width of Line 2, with metallic drop shading */}
            <span
              aria-hidden="true"
              className="block text-[14.0vw] sm:text-[12.65vw] lg:text-[10.067rem] xl:text-[11.865rem] 2xl:text-[12.584rem] font-extrabold bg-gradient-to-b from-neutral-950 via-neutral-800 via-40% to-neutral-500 dark:from-white dark:via-neutral-200 dark:via-40% dark:to-neutral-500 bg-clip-text text-transparent"
            >
              Hi there
            </span>

            {/* Line 2: Balanced width, subtle specular metallic gradient + square accent period */}
            <span
              aria-hidden="true"
              className="inline-flex items-baseline text-[9.8vw] sm:text-[8.8vw] lg:text-[7.0rem] xl:text-[8.25rem] 2xl:text-[8.75rem] font-extrabold"
            >
              <span className="bg-gradient-to-b from-neutral-950 via-neutral-800 via-60% to-neutral-600 dark:from-white dark:via-neutral-100 dark:via-60% dark:to-neutral-400 bg-clip-text text-transparent pb-[0.25em] -mb-[0.25em]">
                I am Aditya
              </span>
              <span
                className="inline-block aspect-square w-[0.16em] bg-primary ml-[0.08em] rounded-none select-none"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Close-standing Metadata (No divider line) */}
          <div className="mt-6 sm:mt-8 space-y-1.5 font-sans text-sm sm:text-base text-muted-foreground">
            <p>
              Designing stuff since{" "}
              <span className="font-semibold text-foreground">2024</span>
            </p>
            <p>
              <span className="font-medium text-foreground">Electrical Engineering</span>{" "}
              Student at{" "}
              <a
                href="https://www.unpad.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>Padjadjaran University</span>
                <span
                  className="text-xs text-primary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Optical bottom counter-balance spacer */}
      <div className="invisible h-6 w-full" aria-hidden="true" />
    </section>
  )
}
