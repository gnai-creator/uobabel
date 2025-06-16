import { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "login",
    "painel",
    "ironman-ranking",
    "terms",
    "privacy",
    "patreon/callback",
  ];

  const urls = pages.map((p) => ({
    url: `${siteMetadata.siteUrl}/${p}`.replace(/\/$/, ""),
    lastModified: new Date(),
  }));

  return urls;
}
