import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://adityac.dev"),
  title: "Aditya Chandrasa",
  description:
    "Portfolio of Aditya Chandrasa. Electrical Engineering Student at Unpad specializing in hardware logic, data analytics, and real-world business execution.",
  authors: [{ name: "Aditya Chandrasa" }],
  keywords: [
    "Aditya Chandrasa",
    "Aditya Cakti Chandrasa",
    "Aditya Cakti",
    "Portfolio",
    "Electrical Engineering",
  ],
  openGraph: {
    title: "Aditya Chandrasa | Engineering Portfolio",
    description:
      "Portfolio of Aditya Chandrasa. Bridging the gap between embedded hardware, data-driven logic, and business execution.",
    url: "https://adityac.dev",
    siteName: "Aditya Chandrasa",
    images: [{ url: "/images/web-thumbnail.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://adityac.dev",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-background text-foreground"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-sm focus:border focus:border-primary focus:bg-background focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
