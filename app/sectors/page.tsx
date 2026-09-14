import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CoordinationCard, SectorCard } from "@/components/cards/SectorCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { EngineeringProcess } from "@/components/sections/EngineeringProcess";
import { PageHero } from "@/components/sections/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectors, sectorsIntro } from "@/data/sectors";
import { webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const title = "Sectors We Serve — Industrial, Energy & Infrastructure";
const description =
  "YUKTI supports industrial plants, energy and process facilities, infrastructure, buildings, critical systems, renewables and existing assets requiring audit, troubleshooting or modernization.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/sectors",
  keywords: ["industrial engineering consultancy", "industrial engineering services", "engineering consultancy"],
});

const coordination: { title: string; href: string; icon: IconName; text: string }[] = [
  {
    title: "Electrical",
    href: "/services/electrical-engineering",
    icon: "bolt",
    text: "Power-system studies, audits, fault analysis, protection coordination and documentation.",
  },
  {
    title: "Civil & Structural",
    href: "/services/civil-structural-engineering",
    icon: "beam",
    text: "Structural analysis and design, assessment and design documentation.",
  },
  {
    title: "Mechanical",
    href: "/services/mechanical-engineering",
    icon: "cog",
    text: "Conveyors and chutes, plant structures, dust collection, process equipment and piping.",
  },
  {
    title: "Project Support",
    href: "/services/project-support",
    icon: "clipboard",
    text: "Scope, tender support, site engineering, commissioning support and close-out.",
  },
];

export default function SectorsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/sectors", type: "CollectionPage" })} />
      <PageHero
        eyebrow="Sectors we serve"
        title="Safe, reliable and value-driven infrastructure."
        lead={sectorsIntro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Sectors", path: "/sectors" },
        ]}
        visual={
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-white/15 bg-navy shadow-2xl">
            <Image
              src="/images/sectors/infrastructure.jpg"
              alt="Major infrastructure and utility engineering"
              fill
              priority
              sizes="(min-width: 1024px) 500px, 90vw"
              className="object-cover opacity-85"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-transparent to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold text-gold-light">Multi-Sector Engineering</span>
              <span className="font-mono text-mist">7 SECTORS · PROVEN METHODS</span>
            </div>
          </div>
        }
      />

      <section aria-labelledby="sectors-title" className="section-y bg-off-white">
        <div className="container-site">
          <SectionHeading
            id="sectors-title"
            eyebrow="Where we work"
            title="Seven sectors, one engineering objective."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {sectors.map((sector, index) => (
              <li key={sector.title} data-reveal style={{ "--reveal-delay": `${(index % 4) * 70}ms` } as CSSProperties}>
                <SectorCard sector={sector} />
              </li>
            ))}
            <li data-reveal>
              <CoordinationCard />
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="section-y relative isolate overflow-hidden bg-navy-dark text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
        <div className="container-site">
          <SectionHeading
            tone="dark"
            id="approach-title"
            eyebrow="Transferable approach"
            title="The same engineering discipline in every environment."
            lead="Whatever the sector, we understand the existing system, identify the actual need and recommend proportionate interventions."
          />
          <div className="mt-16">
            <EngineeringProcess />
          </div>
        </div>
      </section>

      <section aria-labelledby="coordination-title" className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            id="coordination-title"
            eyebrow="Multidisciplinary coordination"
            title="Electrical · Civil & Structural · Mechanical · Project Support"
            lead="Electrical engineering at the core, with multidisciplinary coordination wherever the project requires it."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {coordination.map((item) => (
              <li key={item.title} className="bg-white">
                <Link href={item.href} className="group flex h-full flex-col p-7 transition-colors hover:bg-off-white sm:p-8">
                  <span className="grid size-12 place-items-center rounded-[2px] bg-navy text-gold-light">
                    <Icon name={item.icon} className="size-6" />
                  </span>
                  <span className="mt-8 flex items-center justify-between gap-3 text-xl font-bold text-navy">
                    {item.title}
                    <Icon name="arrowRight" className="size-5 text-gold transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 leading-relaxed text-ink-soft">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Have a facility that needs engineering attention?"
        text="From new projects to existing assets requiring audit, troubleshooting, upgrades or modernization — start with an engineering conversation."
      />
    </>
  );
}
