import Image from "next/image";
import type { CSSProperties } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { WhyYuktiList } from "@/components/sections/WhyYukti";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, howWeDeliver, mission, values, vision, whyYukti } from "@/data/company";
import { webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const title = "About YUKTI — Engineering-Led Consultancy";
const description =
  "YUKTI Engineering & Projects brings engineering analysis, design review, troubleshooting, audits and project execution support into one coordinated, engineering-first approach.";

export const metadata = buildMetadata({ title, description, path: "/about" });

const capabilityIcons: IconName[] = ["bolt", "search", "file", "shield"];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/about", type: "AboutPage" })} />
      <PageHero
        eyebrow="About YUKTI"
        title="Engineering with purpose."
        lead={about.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        visual={
          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-white/15 bg-navy shadow-2xl">
              <Image
                src="/images/about/about-consulting.jpg"
                alt="YUKTI site engineering consultants"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover opacity-85"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
              <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-sm border border-white/15 bg-navy-deep/90 px-4 py-2 text-xs backdrop-blur-md">
                <span className="size-2 rounded-full bg-gold animate-pulse" />
                <span className="font-semibold text-white">YUKTI Engineering &amp; Projects</span>
                <span className="ml-auto font-mono text-[11px] text-gold-light">CONSULT · ANALYSE · DESIGN</span>
              </div>
            </div>
          </div>
        }
      />

      {/* Capabilities */}
      <section aria-labelledby="capabilities-title" className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Our capabilities"
            title="Analysis, design review, troubleshooting, audits and execution support."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.capabilities.map((capability, index) => (
              <li
                key={capability}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                className="relative rounded-[2px] border border-line bg-white p-7"
              >
                <span aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-12 bg-gold" />
                <span className="grid size-12 place-items-center rounded-[2px] bg-navy text-gold-light">
                  <Icon name={capabilityIcons[index]} className="size-6" />
                </span>
                <p className="mt-6 leading-relaxed text-ink">{capability}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Commitment */}
      <section aria-labelledby="commitment-title" className="section-y bg-off-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="commitment-title"
              eyebrow="Our commitment"
              title="Solve the real problem, without creating unnecessary cost."
            />
            <p data-reveal className="type-lead mt-8 border-l-2 border-gold pl-6 text-ink">
              {about.commitment}
            </p>
            <div data-reveal className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2px] border border-line bg-navy-dark shadow-md">
              <Image
                src="/images/services/documentation.jpg"
                alt="Precision engineering design, calculations and drawing review"
                fill
                sizes="(min-width: 1024px) 500px, 90vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-gold-light">Engineering Design &amp; Review</span>
                <span className="text-mist">Calculations &amp; As-Builts</span>
              </div>
            </div>
          </div>
          <div data-reveal className="rounded-[2px] border border-line bg-white p-8 sm:p-12">
            <h3 className="type-h3 text-navy">{about.rightSized.title}</h3>
            <ul className="mt-8 grid gap-5">
              {about.rightSized.points.map((point) => (
                <li key={point} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-dark">
                    <Icon name="check" className="size-4" strokeWidth={2.2} />
                  </span>
                  <p className="leading-relaxed text-ink">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section aria-labelledby="vision-title" className="section-y relative isolate overflow-hidden bg-navy-dark text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
        <div className="container-site">
          <SectionHeading tone="dark" id="vision-title" eyebrow="Vision & mission" title="Why YUKTI exists." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              { label: "Vision", text: vision },
              { label: "Mission", text: mission },
            ].map((item) => (
              <article key={item.label} data-reveal className="relative border border-white/10 bg-white/[0.03] p-8 sm:p-12">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gold" />
                <h3 className="type-eyebrow text-gold-light">{item.label}</h3>
                <p className="mt-6 text-2xl font-semibold leading-snug sm:text-[1.875rem]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we deliver */}
      <section aria-labelledby="deliver-title" className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="deliver-title"
            eyebrow="How we deliver"
            title="Technically defensible. Clearly accountable."
            lead="From assessment and design through implementation and verification."
          />
          <ol className="border-t border-line">
            {howWeDeliver.map((item, index) => (
              <li key={item} data-reveal className="flex gap-6 border-b border-line py-6 sm:gap-10 sm:py-7">
                <span className="w-8 shrink-0 pt-0.5 text-sm font-bold tabular-nums text-gold-dark">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-relaxed text-ink sm:text-xl">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="section-y bg-off-white">
        <div className="container-site">
          <SectionHeading id="values-title" eyebrow="Our values" title="Principles behind every recommendation." />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <li
                key={value.title}
                data-reveal
                style={{ "--reveal-delay": `${(index % 4) * 70}ms` } as CSSProperties}
                className="group relative overflow-hidden rounded-[2px] border border-line bg-white p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100"
                />
                <Icon name={value.icon} className="size-7 text-gold" />
                <h3 className="mt-6 text-lg font-bold text-navy">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{value.description}</p>
              </li>
            ))}
            <li className="relative isolate flex flex-col justify-between overflow-hidden rounded-[2px] bg-navy p-7 text-white">
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
              <p className="text-xl font-bold leading-snug">
                Right-sized engineering.
                <span className="block text-gold-light">Measurable value.</span>
              </p>
              <ButtonLink href="/services" variant="outline-light" className="mt-8 self-start">
                Our services
              </ButtonLink>
            </li>
          </ul>
        </div>
      </section>

      {/* Why YUKTI */}
      <section aria-labelledby="why-title" className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
            <SectionHeading id="why-title" eyebrow="Why YUKTI" title="What sets us apart." lead={whyYukti.intro} />
          </div>
          <WhyYuktiList />
        </div>
      </section>

      <CTASection title="Work with an engineering-first partner." />
    </>
  );
}
