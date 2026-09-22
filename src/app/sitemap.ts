import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getStories } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/work", "/services", "/about", "/inquire"].map((p) => ({ url: `${site.url}${p}` }));
  const stories = (await getStories()).map((s) => ({ url: `${site.url}/work/${s.slug}` }));
  return [...pages, ...stories];
}
