import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface PageSeo {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is, without the site-name template. */
  absoluteTitle?: boolean;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  keywords,
  noIndex = false,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.companyName}`;
  const image = {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: `${siteConfig.companyName} — ${siteConfig.tagline}`,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en",
      siteName: siteConfig.companyName,
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
