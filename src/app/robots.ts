import type { MetadataRoute } from "next";

const SITE_URL = "https://9f0e90d0.run.linkworld.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
