import { siteMetadata } from "@/lib/seo";

export async function GET(): Promise<Response> {
  const pages = [
    "",
    "login",
    "painel",
    "ironman-ranking",
    "terms",
    "privacy",
    "patreon/callback",
  ];

  const urls = pages
    .map((p) => {
      const loc = `${siteMetadata.siteUrl}/${p}`.replace(/\/$/, "");
      const lastmod = new Date().toISOString();
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
