/**
 * Central site configuration.
 * Every component reads company, contact and social details from here —
 * update this file (or the environment variables) rather than individual pages.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  companyName: "YUKTI Engineering & Projects",
  shortName: "YUKTI",
  tagline: "Engineering Every Need.",
  positioning: ["Consulting", "Design", "Solutions"] as const,
  philosophy: ["Understand the problem.", "Engineer the solution.", "Deliver the value."] as const,
  description:
    "YUKTI Engineering & Projects is an engineering-led consulting and project support partner providing electrical, civil & structural and mechanical engineering, audits, root-cause analysis, design documentation and project support.",

  /** Production domain. Set NEXT_PUBLIC_SITE_URL in the deployment environment. */
  url: rawUrl.replace(/\/$/, ""),

  /**
   * TEMPORARY contact details supplied for launch.
   * Replace with official company contact details when available.
   */
  contact: {
    phone: {
      display: "+91 9567094491",
      href: "tel:+919567094491",
      e164: "+919567094491",
    },
    email: "shibilmulakkal@gmail.com",
    /** e.g. "https://wa.me/919567094491" — left unset until confirmed. */
    whatsapp: null as string | null,
    /** Registered office address — not provided in source material. */
    address: null as string | null,
  },

  social: {
    /** LinkedIn company page URL — not yet provided. */
    linkedin: null as string | null,
  },

  ogImage: "/og-image.png",
  contentLastUpdated: "2026-09-14",
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}
