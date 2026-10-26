import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
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
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
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
