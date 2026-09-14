import Image from "next/image";
import type { CSSProperties } from "react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { EngineeringProcess } from "@/components/sections/EngineeringProcess";
import { EvidenceDiagram } from "@/components/sections/EvidenceDiagram";
import { HomeHero } from "@/components/sections/HomeHero";
import { SectorsShowcase } from "@/components/sections/SectorsShowcase";
import { WhyYuktiList } from "@/components/sections/WhyYukti";
import { TextLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, evidenceLed, quality, sustainability, whyYukti } from "@/data/company";
import { sectorsIntro } from "@/data/sectors";
import { disciplines, services } from "@/data/services";
import { webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const title = "YUKTI Engineering & Projects | Engineering Consultancy — Consulting, Design & Solutions";
const description =
  "Engineering-led consulting and project support: power system studies, electrical audits and root-cause analysis, civil & structural and mechanical engineering, design documentation and project support.";

export const metadata = buildMetadata({ title, description, path: "/", absoluteTitle: true });

const capabilityIcons: IconName[] = ["bolt", "search", "file", "shield"];
const sustainabilityIcons: IconName[] = ["bolt", "gauge", "layers", "wrench"];

export default function HomePage() {
  const studies = services[0].groups[0].items;

  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/" })} />
      <HomeHero />

      {/* 02 — About */}
      <section aria-labelledby="about-title" className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="about-title" eyebrow="About YUKTI" title="Engineering with purpose." />
            <p data-reveal className="mt-8 border-l-2 border-gold pl-6 text-lg font-semibold leading-relaxed text-navy">
              Engineering should solve the real problem, not create unnecessary cost.
            </p>
            <div data-reveal className="relative mt-8 aspect-[16/11] overflow-hidden rounded-[2px] border border-line bg-navy-dark shadow-md">
              <Image
                src="/images/about/about-consulting.jpg"
                alt="YUKTI engineers reviewing technical drawings on site"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-gold-light">On-Site Verification</span>
                <span className="text-mist">Field Data &amp; Diagnosis</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p data-reveal className="type-lead max-w-3xl text-ink-soft">
              {about.intro}
            </p>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2">
              {about.capabilities.map((capability, index) => (
                <li key={capability} data-reveal className="flex gap-4 bg-white p-6">
                  <Icon name={capabilityIcons[index]} className="mt-0.5 size-6 text-gold" />
                  <p className="leading-relaxed text-ink">{capability}</p>
                </li>
              ))}
            </ul>
            <TextLink href="/about" className="mt-8">
              Learn more about YUKTI
            </TextLink>
          </div>
        </div>
      </section>

      {/* 03 — Engineering capabilities */}
      <section aria-labelledby="capabilities-title" className="section-y bg-off-white">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="capabilities-title"
              eyebrow="Engineering capabilities"
              title="Three disciplines. One coordinated approach."
              lead="Focused engineering and project services, with electrical engineering at the core and multidisciplinary coordination wherever the project requires it."
            />
            <TextLink href="/services" className="shrink-0">
              View all services
            </TextLink>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((service, index) => (
              <li
                key={service.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
                className={cn(index === 2 && "md:col-span-2 lg:col-span-1")}
              >
                <ServiceCard service={service} wideOnTablet={index === 2} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Engineering approach */}
      <section aria-labelledby="approach-title" className="section-y relative isolate overflow-hidden bg-navy-dark text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <SectionHeading
              tone="dark"
              id="approach-title"
              eyebrow="Our engineering approach"
              title="Consult. Analyse. Design. Support."
            />
            <p data-reveal className="type-lead max-w-2xl text-mist lg:pb-2">
              We understand the existing system, identify the actual need, and recommend proportionate interventions
              that improve safety, reliability, performance and future readiness.
            </p>
          </div>
          <div className="mt-16 lg:mt-20">
            <EngineeringProcess />
          </div>
        </div>
      </section>

      {/* 05 — Evidence-led engineering */}
      <section aria-labelledby="evidence-title" className="section-y bg-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="order-2 lg:order-1">
            <EvidenceDiagram />
          </div>
          <div className="order-1 max-w-3xl lg:order-2">
            <SectionHeading
              id="evidence-title"
              eyebrow="Evidence-led engineering"
              title="Distinguish the symptom from the root cause."
              lead={evidenceLed.text}
            />
            <p data-reveal className="mt-6 leading-relaxed text-ink-soft">
              When a system repeatedly trips, overheats, underperforms or fails, replacing equipment is not always the
              right first response. Engineering studies and data support decisions rather than assumptions.
            </p>
            <h3 className="type-eyebrow mt-10 text-navy">Electrical studies &amp; analysis</h3>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {studies.map((study) => (
                <li key={study.title} className="flex items-start gap-3 text-ink">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-gold" />
                  {study.title}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
              <TextLink href="/services/audit-root-cause-analysis">Audit &amp; root-cause analysis</TextLink>
              <TextLink href="/services/electrical-engineering">Electrical studies</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Why YUKTI */}
      <section aria-labelledby="why-title" className="section-y bg-off-white">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
            <SectionHeading
              id="why-title"
              eyebrow="Why YUKTI"
              title="A technically credible answer, not a product recommendation."
              lead={whyYukti.intro}
            />
            <TextLink href="/about" className="mt-8">
              About our approach
            </TextLink>
          </div>
          <WhyYuktiList />
        </div>
      </section>

      {/* 07 — Sectors */}
      <section aria-labelledby="sectors-title" className="section-y bg-white">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="sectors-title"
              eyebrow="Sectors we serve"
              title="One engineering approach, transferable across sectors."
              lead={sectorsIntro}
            />
            <TextLink href="/sectors" className="shrink-0">
              Explore sectors
            </TextLink>
          </div>
          <div className="mt-14">
            <SectorsShowcase />
          </div>
        </div>
      </section>

      {/* 08 — Sustainable engineering */}
      <section aria-labelledby="sustainability-title" className="section-y bg-off-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading
            id="sustainability-title"
            eyebrow="Sustainable engineering"
            title="Practical sustainability, delivered through lifecycle value."
            lead={sustainability.intro}
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {sustainability.points.map((point, index) => (
              <li
                key={point}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                className="rounded-[2px] border border-line bg-white p-6"
              >
                <Icon name={sustainabilityIcons[index]} className="size-6 text-gold" />
                <p className="mt-4 leading-relaxed text-ink">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 — Quality, safety & reliability */}
      <section aria-labelledby="quality-title" className="section-y bg-white">
        <div className="container-site">
          <div data-reveal className="grid overflow-hidden rounded-[2px] border border-line lg:grid-cols-[1fr_1.1fr]">
            <div className="relative isolate overflow-hidden bg-navy p-8 text-white sm:p-12 lg:p-16">
              <Image
                src="/images/services/audit.jpg"
                alt="Electrical inspection and compliance testing"
                fill
                sizes="(min-width: 1024px) 500px, 100vw"
                className="object-cover opacity-25"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-navy/90 via-navy-deep/95 to-navy-deep" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-30" />
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gold" />
              <p className="type-eyebrow text-gold-light">Quality, safety &amp; reliability</p>
              <h2 id="quality-title" className="type-h2 mt-5">
                {quality.statement}
              </h2>
            </div>
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="type-lead max-w-2xl text-ink-soft">{quality.text}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {quality.considerations.map((item) => (
                  <li
                    key={item.title}
                    className="flex min-h-14 items-center gap-3 rounded-[2px] border border-line px-4 py-3 font-semibold text-navy"
                  >
                    <Icon name={item.icon} className="text-gold" />
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — Final CTA */}
      <CTASection
        eyebrow="Understand the problem. Engineer the solution. Deliver the value."
        title="Have an engineering challenge?"
      />
    </>
  );
}
