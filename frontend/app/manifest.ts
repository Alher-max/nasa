import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KarbonTani - NASA Space Apps 2026",
    short_name: "KarbonTani",
    description: "Demokratisasi Pasar Karbon Petani Padi via Data Terbuka Satelit NASA",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFC",
    theme_color: "#FF5E00",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
