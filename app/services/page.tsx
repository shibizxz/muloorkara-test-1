import Image from "next/image";
import type { CSSProperties } from "react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { EngineeringIllustration } from "@/components/illustrations/EngineeringIllustration";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { EngineeringProcess } from "@/components/sections/EngineeringProcess";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quality, sustainability } from "@/data/company";
import { disciplines, getService, services } from "@/data/services";
import { webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const title = "Engineering Consulting Services";
const description =
  "Electrical engineering, civil & structural engineering, mechanical engineering, audit and root-cause analysis, design and documentation, and engineering project support from YUKTI.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/services",
  keywords: ["engineering consulting services", "engineering consultancy", "industrial engineering services"],
});

export default function ServicesPage() {
  const electrical = getService("electrical-engineering")!;
  const specialist = services.filter((service) => !service.isDiscipline);

  return (
    <>
      <JsonLd
        data={{
          ...webPageSchema({ name: title, description, path: "/services", type: "CollectionPage" }),
          hasPart: services.map((service) => ({ "@type": "Service", name: service.title })),
        }}
      />
      <PageHero
        eyebrow="Our services"
        title="Focused engineering and project services."
        lead="YUKTI provides focused engineering and project services, with electrical engineering at the core and multidisciplinary coordination wherever the project requires it."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        actions={
          <>
            <ButtonLink href="/contact">Talk to an engineer</ButtonLink>
            <ButtonLink href="#disciplines" variant="outline-light">
              View capabilities
            </ButtonLink>
          </>
        }
        visual={
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-white/15 bg-navy shadow-2xl">
            <Image
              src="/images/services/documentation.jpg"
              alt="Engineering drawings and technical documentation"
              fill
              priority
              sizes="(min-width: 1024px) 500px, 90vw"
              className="object-cover opacity-85"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-transparent to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold text-gold-light">Multidisciplinary Engineering</span>
              <span className="font-mono text-mist">ELECTRICAL · CIVIL · MECHANICAL</span>
            </div>
          </div>
        }
      />

      {/* Disciplines */}
      <section id="disciplines" aria-labelledby="disciplines-title" className="section-y scroll-mt-16 bg-off-white">
        <div className="container-site">
          <SectionHeading
            id="disciplines-title"
            eyebrow="Engineering disciplines"
            title="Electrical, civil & structural and mechanical engineering."
          />
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

      {/* Electrical at the core */}
      <section aria-labelledby="electrical-core-title" className="section-y bg-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-line bg-navy-dark shadow-xl">
            <Image
              src="/images/services/electrical.jpg"
              alt="High-voltage electrical substation and power grid analysis"
              fill
              sizes="(min-width: 1024px) 600px, 90vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold text-gold-light">Power Systems &amp; Grid Studies</span>
              <span className="text-mist">Load Flow · Protection · Quality</span>
            </div>
          </div>
          <div className="max-w-3xl">
            <SectionHeading
              id="electrical-core-title"
              eyebrow="Electrical engineering at the core"
              title="Understand system behaviour before committing to major expenditure."
              lead={electrical.intro}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {electrical.groups[0].items.map((study) => (
                <li key={study.title} className="border-l-2 border-gold pl-4">
                  <p className="font-bold text-navy">{study.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{study.description}</p>
                </li>
              ))}
            </ul>
            <ButtonLink href="/services/electrical-engineering" variant="secondary" className="mt-10">
              Electrical capabilities
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Specialist services */}
      <section aria-labelledby="specialist-title" className="section-y bg-off-white">
        <div className="container-site">
          <SectionHeading
            id="specialist-title"
            eyebrow="Specialist services"
            title="From diagnosis and documentation to project close-out."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specialist.map((service, index) => (
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

      {/* Approach */}
      <section aria-labelledby="approach-title" className="section-y relative isolate overflow-hidden bg-navy-dark text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
        <div className="container-site">
          <SectionHeading tone="dark" id="approach-title" eyebrow="Core approach" title="Consult. Analyse. Design. Support." />
          <div className="mt-16">
            <EngineeringProcess />
          </div>
        </div>
      </section>

      {/* Sustainability + Quality */}
      <section aria-label="Sustainable engineering and quality" className="section-y bg-white">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <article
            id="sustainable-engineering"
            aria-labelledby="sustainable-title"
            data-reveal
            className="scroll-mt-28 rounded-[2px] border border-line bg-off-white p-8 sm:p-12"
          >
            <p className="type-eyebrow text-gold-dark">Sustainable engineering</p>
            <h2 id="sustainable-title" className="type-h3 mt-4 text-navy sm:text-[1.875rem]">
              Improve efficiency, reliability and lifecycle performance.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{sustainability.intro}</p>
            <ul className="mt-8 grid gap-4">
              {sustainability.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <Icon name="leaf" className="mt-0.5 text-gold" />
                  <span className="leading-relaxed text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </article>
          <article
            id="quality-safety-reliability"
            aria-labelledby="quality-title"
            data-reveal
            className="relative isolate scroll-mt-28 overflow-hidden rounded-[2px] bg-navy p-8 text-white sm:p-12"
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
            <p className="type-eyebrow text-gold-light">Quality, safety &amp; reliability</p>
            <h2 id="quality-title" className="type-h3 mt-4 sm:text-[1.875rem]">
              {quality.statement}
            </h2>
            <p className="mt-4 leading-relaxed text-mist">{quality.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {quality.considerations.map((item) => (
                <li key={item.title} className="flex min-h-14 items-center gap-3 border border-white/15 px-4 py-3 font-semibold">
                  <Icon name={item.icon} className="text-gold-light" />
                  {item.title}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <CTASection
        title="Not sure which service you need?"
        text="Describe the problem or project. We will help define the right scope, discipline and level of intervention."
        secondary={{ label: "View sectors", href: "/sectors" }}
      />
    </>
  );
}
