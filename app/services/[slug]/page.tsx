import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { TrackServiceView } from "@/components/behaviour/TrackView";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { EngineeringIllustration } from "@/components/illustrations/EngineeringIllustration";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { EvidenceDiagram } from "@/components/sections/EvidenceDiagram";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getService, services, type CapabilityGroup, type Service } from "@/data/services";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function CapabilityItems({ group }: { group: CapabilityGroup }) {
  const layout = group.layout ?? (group.items.some((item) => item.description) ? "cards" : "checklist");

  if (layout === "steps") {
    return (
      <ol className="mt-8 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
        {group.items.map((item, index) => (
          <li key={item.title} data-reveal className="bg-white p-6 sm:p-7">
            <span className="text-3xl font-bold tabular-nums text-gold">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-4 font-semibold leading-relaxed text-navy">{item.title}</p>
          </li>
        ))}
      </ol>
    );
  }

  if (layout === "cards") {
    return (
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {group.items.map((item, index) => (
          <li
            key={item.title}
            data-reveal
            style={{ "--reveal-delay": `${(index % 2) * 70}ms` } as CSSProperties}
            className="group relative overflow-hidden rounded-[2px] border border-line bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(10,31,63,0.45)] sm:p-7"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[3px] bg-gold/70 transition-colors group-hover:bg-gold"
            />
            <h3 className="text-lg font-bold leading-snug text-navy">{item.title}</h3>
            {item.description && <p className="mt-2 leading-relaxed text-ink-soft">{item.description}</p>}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
      {group.items.map((item) => (
        <li key={item.title} className="flex gap-4 border-b border-line py-4">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-dark">
            <Icon name="check" className="size-3.5" strokeWidth={2.4} />
          </span>
          <span className="leading-relaxed text-ink">{item.title}</span>
        </li>
      ))}
    </ul>
  );
}

function ToolList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex min-h-11 items-center rounded-[2px] border border-line bg-off-white px-4 text-[0.9375rem] font-semibold text-navy"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related.map((relatedSlug) => getService(relatedSlug)).filter((s): s is Service => Boolean(s));

  const sections = [
    ...service.groups.map((group) => ({ id: toId(group.title), label: group.title })),
    ...(service.codes ? [{ id: "design-codes", label: "Design codes" }] : []),
    ...(service.software ? [{ id: "engineering-software", label: "Engineering software" }] : []),
  ];

  const enquiryHref = `/contact?service=${service.slug}`;

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <TrackServiceView service={service.slug} />

      <PageHero
        eyebrow={`${service.number} · ${service.isDiscipline ? "Engineering discipline" : "Specialist service"}`}
        title={service.title}
        lead={service.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        actions={
          <>
            <ButtonLink href={enquiryHref}>Discuss your requirement</ButtonLink>
            <ButtonLink href="/services" variant="outline-light">
              All services
            </ButtonLink>
          </>
        }
        visual={
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-white/15 bg-navy shadow-2xl">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              sizes="(min-width: 1024px) 500px, 90vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold text-gold-light">{service.shortTitle}</span>
              <span className="font-mono text-mist">{service.number} · YUKTI SPEC</span>
            </div>
          </div>
        }
      />

      <section aria-label={`${service.title} capabilities`} className="section-y bg-white">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <aside
            className={cn(
              "min-w-0 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start",
              sections.length < 2 && "max-lg:hidden",
            )}
          >
            {sections.length > 1 && (
              <nav aria-label="On this page">
                <p className="type-eyebrow text-gold-dark">On this page</p>
                <ul className="no-scrollbar -mx-(--gutter) mt-4 flex gap-2 overflow-x-auto px-(--gutter) lg:mx-0 lg:flex-col lg:gap-0 lg:border-l lg:border-line lg:px-0">
                  {sections.map((section) => (
                    <li key={section.id} className="shrink-0">
                      <a
                        href={`#${section.id}`}
                        className="inline-flex min-h-11 items-center whitespace-nowrap rounded-[2px] border border-line px-4 text-sm font-semibold text-navy transition-colors hover:border-navy lg:-ml-px lg:w-full lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:px-5 lg:hover:border-gold"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="relative isolate mt-10 hidden overflow-hidden rounded-[2px] bg-navy p-6 text-white lg:block">
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
              <p className="font-bold leading-snug">Need {service.shortTitle.toLowerCase()} support?</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">Share the requirement and existing condition.</p>
              <ButtonLink href={enquiryHref} size="sm" fullWidth className="mt-5">
                Enquire
              </ButtonLink>
            </div>
          </aside>

          <div className="grid min-w-0 gap-16 sm:gap-20">
            {service.groups.map((group) => {
              const id = toId(group.title);
              return (
                <section key={group.title} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
                  <div data-reveal className="flex items-center gap-4">
                    <span aria-hidden="true" className="h-9 w-1 shrink-0 bg-gold" />
                    <h2 id={`${id}-title`} className="text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-bold leading-tight tracking-tight text-navy">
                      {group.title}
                    </h2>
                  </div>
                  {group.intro && <p className="type-lead mt-6 max-w-3xl text-ink-soft">{group.intro}</p>}
                  <CapabilityItems group={group} />
                </section>
              );
            })}

            {service.codes && (
              <section id="design-codes" aria-labelledby="design-codes-title" className="scroll-mt-28">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-9 w-1 shrink-0 bg-gold" />
                  <h2 id="design-codes-title" className="text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-bold leading-tight tracking-tight text-navy">
                    International design codes
                  </h2>
                </div>
                <ToolList items={service.codes} />
              </section>
            )}

            {service.software && (
              <section id="engineering-software" aria-labelledby="engineering-software-title" className="scroll-mt-28">
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-9 w-1 shrink-0 bg-gold" />
                  <h2 id="engineering-software-title" className="text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-bold leading-tight tracking-tight text-navy">
                    Engineering software
                  </h2>
                </div>
                <p className="mt-4 text-ink-soft">Tools used for analysis, modelling and documentation.</p>
                <ToolList items={service.software} />
              </section>
            )}
          </div>
        </div>
      </section>

      {service.highlight && (
        <section aria-labelledby="highlight-title" className="section-y relative isolate overflow-hidden bg-navy-dark text-white">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
          <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              tone="dark"
              id="highlight-title"
              eyebrow="Evidence-led engineering"
              title={service.highlight.title}
              lead={service.highlight.text}
            />
            <div data-reveal>
              <EvidenceDiagram />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="related-title" className="section-y bg-off-white">
        <div className="container-site">
          <SectionHeading id="related-title" eyebrow="Multidisciplinary coordination" title="Related services" />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <li key={item.slug} data-reveal className={cn(index === 2 && "md:col-span-2 lg:col-span-1")}>
                <ServiceCard service={item} wideOnTablet={index === 2} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow={service.title}
        title="Discuss your engineering requirement."
        text="Tell us about the system, the existing condition and what you need to achieve."
        primary={{ label: "Start an enquiry", href: enquiryHref }}
        secondary={{ label: "All services", href: "/services" }}
      />
    </>
  );
}
