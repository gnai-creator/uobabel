import type { Metadata } from "next";

export const siteMetadata = {
  title: "UO Babel - Survival Hardcore",
  description:
    "Servidor de Ultima Online focado em sobreviv\u00eancia hardcore com conte\u00fado exclusivo.",
  siteUrl: "https://www.uobabel.com",
};

export const defaultOpenGraph = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  url: siteMetadata.siteUrl,
  siteName: "UO Babel",
  images: [
    {
      url: `${siteMetadata.siteUrl}/Banner.png`,
      width: 1200,
      height: 630,
      alt: "UO Babel Banner",
    },
  ],
  locale: "pt_BR",
  type: "website" as const,
};

export const defaultMetadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  openGraph: defaultOpenGraph,
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.siteUrl}/Banner.png`],
  },
};
