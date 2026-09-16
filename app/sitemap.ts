import type { MetadataRoute } from "next";

const BASE = "https://try.octoglehire.com";

// Only the indexable landing page. /booked is a post-conversion confirmation
// page marked noindex, so it is deliberately excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
