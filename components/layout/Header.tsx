"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav, primaryCta } from "@/data/navigation";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const solid = scrolled && !menuOpen;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  // Mobile menu: scroll lock, initial focus, Escape and focus trap.
  useEffect(() => {
    if (!menuOpen) return;
    const header = headerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    header?.querySelector<HTMLElement>("#mobile-menu a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !header) return;
      const focusable = Array.from(header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
        (el) => el.getClientRects().length > 0,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Desktop services menu: Escape and outside click.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target as Element).closest("[data-services-nav]")) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [servicesOpen]);

  const navLinkClass = (active: boolean) =>
    cn(
      "relative inline-flex h-11 items-center px-3 text-[0.9375rem] font-semibold transition-colors",
      "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:bg-gold after:transition-transform after:duration-300",
      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
    );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        solid
          ? "bg-white/[0.97] text-navy shadow-[0_1px_0_rgba(10,31,63,0.08),0_10px_30px_-18px_rgba(10,31,63,0.3)]"
          : "bg-transparent text-white",
      )}
    >
      <div className="container-site flex h-(--header-h) items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${siteConfig.companyName} — Home`}
          className="relative shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <Logo tone="light" className={cn("transition-opacity duration-300", solid && "opacity-0")} />
          <Logo tone="dark" className={cn("absolute inset-0 transition-opacity duration-300", !solid && "opacity-0")} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {mainNav.map((item) =>
              item.href === "/services" ? (
                <li
                  key={item.href}
                  data-services-nav
                  className="relative flex items-center"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={navLinkClass(isActive(item.href))}
                    onClick={() => setServicesOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    aria-label="Show services"
                    onClick={() => setServicesOpen((open) => !open)}
                    className="-ml-2 grid size-9 place-items-center"
                  >
                    <Icon
                      name="chevronDown"
                      className={cn("size-4 transition-transform duration-300", servicesOpen && "rotate-180")}
                    />
                  </button>
                  <div id="services-menu" hidden={!servicesOpen} className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-3">
                    <div className="overflow-hidden rounded-[2px] border border-line bg-white text-navy shadow-[0_30px_70px_-30px_rgba(10,31,63,0.45)]">
                      <span aria-hidden="true" className="block h-[3px] bg-gold" />
                      <ul className="grid grid-cols-2 gap-1 p-3">
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              onClick={() => setServicesOpen(false)}
                              aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
                              className="group flex items-start gap-3 rounded-[2px] p-3 transition-colors hover:bg-off-white"
                            >
                              <span className="pt-0.5 text-xs font-bold tracking-[0.15em] text-gold-dark">
                                {service.number}
                              </span>
                              <span className="font-semibold leading-snug group-hover:text-navy-light">
                                {service.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-line bg-off-white px-6 py-3">
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="inline-flex min-h-10 items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-navy hover:text-gold-dark"
                        >
                          View all services <Icon name="arrowRight" className="size-4 text-gold" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={navLinkClass(isActive(item.href))}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          </div>
          <div className={menuOpen ? "hidden" : "hidden sm:block lg:hidden"}>
            <ButtonLink href="/contact" variant={solid ? "outline-dark" : "outline-light"} size="sm" arrow={false}>
              Enquire
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2 grid size-11 place-items-center lg:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <Icon name={menuOpen ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} isActive={isActive} onNavigate={() => setMenuOpen(false)} />
    </header>
  );
}
