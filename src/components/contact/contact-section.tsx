import { ContactForm } from "@/components/contact/contact-form"

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border pt-12"
    >
      <div className="mb-6">
        <h2
          id="contact-heading"
          className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          CONTACT
        </h2>
        <p className="mt-1 max-w-[72ch] text-base text-foreground">
          System ready for transmission. Open for collaborations and engineering roles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="rounded-sm border border-border bg-surface p-6 md:col-span-7">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-4 md:col-span-5">
          <div className="rounded-sm border border-border bg-surface p-4">
            <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Direct Line
            </span>
            <a
              href="mailto:aditchandrasa1@gmail.com"
              className="mt-1 inline-block font-mono text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              aditchandrasa1@gmail.com
            </a>
          </div>

          <div className="rounded-sm border border-border bg-surface p-4">
            <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
              WhatsApp Network
            </span>
            <a
              href="https://wa.me/6282321007009"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-mono text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              +62 823 2100 7009
            </a>
          </div>

          <div className="rounded-sm border border-border bg-surface p-4">
            <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Current Node (Location)
            </span>
            <span className="mt-1 block font-mono text-sm font-medium text-foreground">
              Tasikmalaya / Bandung, ID
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
