import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/fs/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://lenvx.dev/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://lenvx.dev/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://lenvx.dev/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lenvx.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://lenvx.dev/status",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    ...postEntries,
  ];
}
