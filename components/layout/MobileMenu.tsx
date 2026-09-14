"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav, primaryCta } from "@/data/navigation";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}

export function MobileMenu({ open, isActive, onNavigate }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-0 -z-10 overflow-y-auto bg-navy-deep pt-(--header-h) text-white lg:hidden"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-blueprint" />
      <nav aria-label="Mobile" className="container-site relative pb-12 pt-4">
        <ul className="border-t border-white/10">
          {mainNav.map((item) => (
            <li key={item.href} className="border-b border-white/10">
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-16 items-center justify-between text-2xl font-semibold transition-colors",
                  isActive(item.href) ? "text-gold-light" : "text-white hover:text-gold-light",
                )}
              >
                {item.label}
                <Icon name="arrowRight" className="size-5 text-gold" />
              </Link>
              {item.href === "/services" && (
                <ul className="grid gap-0.5 pb-4">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={onNavigate}
                        className="flex min-h-11 items-center gap-3 text-[0.9375rem] text-mist hover:text-white"
                      >
                        <span className="text-xs font-bold tracking-[0.15em] text-gold">{service.number}</span>
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <ButtonLink href={primaryCta.href} fullWidth className="mt-8">
          {primaryCta.label}
        </ButtonLink>

        <div className="mt-8 grid gap-1 text-[0.9375rem] text-mist">
          <a href={siteConfig.contact.phone.href} className="flex min-h-11 items-center gap-3 hover:text-white">
            <Icon name="phone" className="text-gold" />
            {siteConfig.contact.phone.display}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex min-h-11 items-center gap-3 break-all hover:text-white"
          >
            <Icon name="mail" className="text-gold" />
            {siteConfig.contact.email}
          </a>
        </div>
      </nav>
    </div>
  );
}
