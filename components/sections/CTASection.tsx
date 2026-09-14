import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { NavItem } from "@/data/navigation";

interface CTASectionProps {
  eyebrow?: string;
  title?: ReactNode;
  text?: ReactNode;
  primary?: NavItem;
  secondary?: NavItem | null;
}

export function CTASection({
  eyebrow = "Start a conversation",
  title = "Have an engineering challenge?",
  text = "Tell us about the system, the site conditions and the outcome you need. We will help you understand the problem before recommending the solution.",
  primary = { label: "Start an enquiry", href: "/contact" },
  secondary = { label: "Explore our services", href: "/services" },
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy text-white">
      <Image
        src="/images/hero/hero-engineering.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-15"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-navy via-navy/95 to-navy-dark/90" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-40" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gold" />
      <Image
        src="/logo/yukti-logo-mark-light-720.webp"
        alt=""
        width={720}
        height={643}
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 hidden w-[560px] -translate-y-1/2 opacity-[0.05] md:block"
      />
      <div className="container-site section-y relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div data-reveal>
          <p className="type-eyebrow flex items-center gap-3 text-gold-light">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {eyebrow}
          </p>
          <h2 id="cta-title" className="type-h2 mt-5 max-w-3xl">
            {title}
          </h2>
          <p className="type-lead mt-6 max-w-2xl text-mist">{text}</p>
        </div>
        <div data-reveal className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="outline-light">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
