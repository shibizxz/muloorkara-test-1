import Image from "next/image";
import Link from "next/link";
import { HeroDrawing } from "@/components/illustrations/HeroDrawing";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { disciplines } from "@/data/services";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-deep text-white">
      {/* Background panoramic image with deep navy gradient overlay */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/images/hero/hero-engineering.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/90 to-navy-deep/75" />
      </div>

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_78%_42%,rgba(23,64,122,0.65),transparent_75%)]"
      />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-1.5 bg-gold max-lg:hidden" />

      <div className="container-site grid items-center gap-8 pb-12 pt-[calc(var(--header-h)+2.5rem)] sm:pb-16 lg:min-h-[min(88svh,880px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-16 lg:pt-[calc(var(--header-h)+2rem)]">
        <div className="max-w-2xl">
          <p className="type-eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-gold-light max-sm:gap-x-2 max-sm:tracking-[0.16em]">
            <span aria-hidden="true" className="hidden h-px w-10 bg-gold sm:block" />
            <span>Consulting</span>
            <span aria-hidden="true" className="text-white/30">
              |
            </span>
            <span>Design</span>
            <span aria-hidden="true" className="text-white/30">
              |
            </span>
            <span>Solutions</span>
          </p>
          <h1 id="hero-title" className="type-display mt-6">
            Engineering every need<span className="text-gold">.</span>
          </h1>
          <p className="type-lead mt-7 max-w-xl text-mist">
            YUKTI Engineering &amp; Projects is an engineering-led consulting and project support partner, delivering
            practical, technically sound and value-conscious solutions across electrical, civil &amp; structural and
            mechanical engineering.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services">Explore our services</ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Talk to an engineer
            </ButtonLink>
          </div>
          <p className="mt-10 hidden border-l-2 border-gold pl-4 text-sm leading-relaxed text-mist sm:block">
            Understand the problem. Engineer the solution. Deliver the value.
          </p>
        </div>

        {/* Visual engineering frame */}
        <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[640px] 3xl:max-w-[860px]">
          <div className="relative overflow-hidden rounded-[2px] border border-white/15 bg-navy/80 p-2 shadow-2xl backdrop-blur-xs">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-navy-dark">
              <Image
                src="/images/hero/hero-engineering.jpg"
                alt="YUKTI industrial engineering infrastructure"
                fill
                priority
                sizes="(min-width: 1024px) 600px, 90vw"
                className="object-cover opacity-50"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/30 to-navy-deep/20"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-30" />

              {/* CAD Drawing Overlay */}
              <div className="absolute inset-0 grid place-items-center p-4">
                <HeroDrawing className="h-auto w-full drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]" />
              </div>

              {/* Status telemetry pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-sm border border-white/15 bg-navy-deep/85 px-4 py-2 text-xs backdrop-blur-md">
                <span className="flex items-center gap-2 font-medium text-white/90">
                  <span className="size-2 rounded-full bg-gold animate-pulse" />
                  Engineering Verification &amp; Diagnostics
                </span>
                <span className="hidden font-mono tracking-widest text-gold-light sm:inline">CAD · SLD · BIM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Engineering disciplines" className="relative border-t border-white/10 bg-navy-dark/70">
        <ul className="container-site grid sm:grid-cols-3">
          {disciplines.map((service) => (
            <li
              key={service.slug}
              className="border-white/10 max-sm:border-b max-sm:last:border-b-0 sm:border-l sm:last:border-r"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex min-h-20 items-center justify-between gap-4 py-5 transition-colors hover:bg-white/5 sm:px-5 lg:px-8"
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-xs font-bold tracking-[0.2em] text-gold">{service.number}</span>
                  <span className="font-semibold text-white">{service.shortTitle}</span>
                </span>
                <Icon
                  name="arrowRight"
                  className="size-4 text-gold-light transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
