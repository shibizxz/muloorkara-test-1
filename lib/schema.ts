import { absoluteUrl, siteConfig } from "@/lib/site-config";
import type { Service } from "@/data/services";

/** Structured data helpers. Only factual, source-backed properties are emitted. */

const ORG_ID = `${siteConfig.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.companyName,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl("/logo/logo-mark.png"),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone.e164,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone.e164,
    },
    ...(siteConfig.social.linkedin ? { sameAs: [siteConfig.social.linkedin] } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.companyName,
    url: siteConfig.url,
    publisher: { "@id": ORG_ID },
  };
}

export function webPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": ORG_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.intro,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: service.groups.flatMap((group) =>
        group.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.title },
        })),
      ),
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
