import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://images.unsplash.com;
  font-src 'self' data:;
  connect-src 'self';
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim()

const nextConfig: NextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), interest-cohort=(), accelerometer=(), gyroscope=(), magnetometer=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/Resume.pdf",
        destination: "/resume.pdf",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/projects.html",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects/:slug.html",
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/images/projects/aquafeederiot/:file*",
        destination: "/projects/aquafeeder/:file*",
        permanent: true,
      },
      {
        source: "/images/projects/mimu-tsm/:file*",
        destination: "/projects/matcha-tasikmalaya/:file*",
        permanent: true,
      },
      {
        source: "/images/projects/pgs/:file*",
        destination: "/projects/pgs25/:file*",
        permanent: true,
      },
      {
        source: "/images/projects/university-explore/:file*",
        destination: "/projects/unex/:file*",
        permanent: true,
      },
      {
        source: "/images/projects/:slug/:file*",
        destination: "/projects/:slug/:file*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
