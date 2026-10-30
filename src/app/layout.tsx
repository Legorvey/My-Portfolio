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
  title: {
    default: "Aditya Chandrasa | Technologist & Systems Portfolio",
    template: "%s | Aditya Chandrasa",
  },
  description:
    "Portfolio of Aditya Chandrasa. Technologist and Electrical Engineering Student at Unpad bridging hardware logic, software architecture, data analytics, and real-world execution.",
  authors: [{ name: "Aditya Chandrasa", url: "https://adityac.dev" }],
  creator: "Aditya Chandrasa",
  publisher: "Aditya Chandrasa",
  keywords: [
    "Aditya Chandrasa",
    "Aditya Cakti Chandrasa",
    "Aditya Cakti",
    "Technologist",
    "Electrical Engineering",
    "Hardware Logic",
    "Software Architecture",
    "Data Analytics",
    "Tech Innovation",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityac.dev",
    siteName: "Aditya Chandrasa",
    title: "Aditya Chandrasa | Technologist & Systems Portfolio",
    description:
      "Portfolio of Aditya Chandrasa. Technologist bridging hardware logic, software systems, data analytics, and business execution.",
    images: [
      {
        url: "/images/web-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Aditya Chandrasa Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Chandrasa | Technologist & Systems Portfolio",
    description:
      "Portfolio of Aditya Chandrasa. Technologist bridging hardware logic, software systems, data analytics, and business execution.",
    images: ["/images/web-thumbnail.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/images/favicon.png", sizes: "32x32" },
    ],
    apple: [{ url: "/icon.png" }],
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
