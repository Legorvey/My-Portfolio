import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aditya Chandrasa | Technologist Portfolio",
    short_name: "Aditya Chandrasa",
    description:
      "Portfolio of Aditya Chandrasa. Technologist and Electrical Engineering Student at Unpad bridging hardware logic, software architecture, data analytics, and real-world execution.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
