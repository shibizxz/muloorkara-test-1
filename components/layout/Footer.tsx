import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { legalNav, mainNav } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";

const footerServices = [
  { label: "Electrical Engineering", href: "/services/electrical-engineering" },
  { label: "Civil & Structural", href: "/services/civil-structural-engineering" },
  { label: "Mechanical Engineering", href: "/services/mechanical-engineering" },
  { label: "Audit & Root-Cause Analysis", href: "/services/audit-root-cause-analysis" },
  { label: "Design & Documentation", href: "/services/design-documentation" },
  { label: "Project Support", href: "/services/project-support" },
];

const linkClass = "inline-flex min-h-9 items-center transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact, social } = siteConfig;

  return (
    <footer className="relative isolate overflow-hidden bg-navy-deep text-mist">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-60" />
      <div aria-hidden="true" className="h-px bg-linear-to-r from-gold via-gold/40 to-transparent" />

      <div className="container-site pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1.2fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label={`${siteConfig.companyName} — Home`} className="inline-block">
              <Logo tone="light" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed">
              Engineering-led consulting and project support focused on practical, technically sound and
              value-conscious solutions.
            </p>
            <p className="mt-8 text-2xl font-bold tracking-tight text-white">
              Engineering every need<span className="text-gold">.</span>
            </p>
            <p className="type-eyebrow mt-3 text-gold-light">Consulting | Design | Solutions</p>
          </div>

          <div>
            <h2 className="type-eyebrow text-white">Quick links</h2>
            <ul className="mt-5 grid gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-eyebrow text-white">Services</h2>
            <ul className="mt-5 grid gap-1">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-eyebrow text-white">Contact</h2>
            <ul className="mt-5 grid gap-1">
              <li>
                <a href={contact.phone.href} className={`${linkClass} gap-3`}>
                  <Icon name="phone" className="text-gold" />
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`${linkClass} gap-3 break-all`}>
                  <Icon name="mail" className="text-gold" />
                  {contact.email}
                </a>
              </li>
              {contact.whatsapp && (
                <li>
                  <a href={contact.whatsapp} className={linkClass} rel="noopener noreferrer" target="_blank">
                    WhatsApp
                  </a>
                </li>
              )}
              {social.linkedin && (
                <li>
                  <a href={social.linkedin} className={`${linkClass} gap-3`} rel="noopener noreferrer" target="_blank">
                    <Icon name="linkedin" className="text-gold" />
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
            <ButtonLink href="/contact" variant="outline-light" className="mt-6">
              Start an enquiry
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.companyName}. All Rights Reserved.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
            <ul className="flex gap-6">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              Powered by{" "}
              <a
                href="https://webappzz.com/"
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-9 items-center font-semibold text-gold-light transition-colors hover:text-white"
              >
                Webappzz Technologies
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
