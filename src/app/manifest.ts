import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rowen Hutchins | Full-Stack Developer",
    short_name: "Rowen Hutchins",
    description:
      "Portfolio of Rowen Hutchins, a full-stack developer and U.S. Army veteran with an active Secret clearance, working in React, JavaScript, and MySQL.",
    start_url: "/",
    display: "standalone",
    background_color: "#070b0a",
    theme_color: "#0F172A",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
