import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getLegalSlugs } from "@/lib/legal";

const SITE_URL = "https://9f0e90d0.run.linkworld.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date || undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const legalRoutes: MetadataRoute.Sitemap = getLegalSlugs().map((slug) => ({
    url: `${SITE_URL}/legal/${slug}`,
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  return [...staticRoutes, ...postRoutes, ...legalRoutes];
}
