import { ContactForm } from "@/components/contact/contact-form"

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="space-y-8 border-t border-border pt-16"
    >
      <div className="space-y-2">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
          INQUIRIES &amp; CONTACT
        </p>
        <h2
          id="contact-heading"
          className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          Let&apos;s Build Reliable Systems.
        </h2>
        <p className="max-w-[72ch] text-sm text-muted-foreground sm:text-base">
          Open for embedded hardware engineering, IoT systems, and operational leadership roles. Send a message using the form below or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="rounded-sm border border-border bg-surface p-6 sm:p-8 md:col-span-7">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-4 md:col-span-5">
          <div className="rounded-sm border border-border bg-surface p-5 transition-colors hover:border-primary/50">
            <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Direct Email
            </span>
            <a
              href="mailto:aditchandrasa1@gmail.com"
              className="mt-1 inline-block font-mono text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              aditchandrasa1@gmail.com ↗
            </a>
          </div>

          <div className="rounded-sm border border-border bg-surface p-5 transition-colors hover:border-primary/50">
            <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
              WhatsApp / Mobile
            </span>
            <a
              href="https://wa.me/6282321007009"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-mono text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              +62 823 2100 7009 ↗
            </a>
          </div>

          <div className="rounded-sm border border-border bg-surface p-5 transition-colors hover:border-primary/50">
            <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Current Location
            </span>
            <span className="mt-1 block font-mono text-sm font-medium text-foreground">
              Tasikmalaya / Bandung, West Java, ID
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
