import Image from "next/image";
import { TextLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Sector } from "@/data/sectors";

export function SectorCard({ sector }: { sector: Sector }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2px] border border-line bg-white transition-[transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_20px_50px_-30px_rgba(10,31,63,0.45)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-dark">
        <Image
          src={sector.image}
          alt={sector.title}
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 85vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/25 to-navy-deep/15 transition-opacity duration-300 group-hover:opacity-75"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-15" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-[2px] bg-navy-deep/85 text-gold-light backdrop-blur-xs ring-1 ring-white/15">
            <Icon name={sector.icon} className="size-4.5" />
          </span>
          <span className="rounded-sm bg-navy-deep/85 px-2 py-0.5 text-xs font-bold tracking-[0.2em] text-gold backdrop-blur-xs ring-1 ring-white/15">
            {sector.number}
          </span>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="block h-[2px] w-10 bg-gold transition-[width] duration-500 ease-premium group-hover:w-full"
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-bold text-navy transition-colors duration-300 group-hover:text-navy-light">
          {sector.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft sm:text-base">{sector.description}</p>
      </div>
    </article>
  );
}

export function CoordinationCard() {
  return (
    <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2px] bg-navy p-6 text-white sm:p-8">
      <Image
        src="/images/hero/hero-engineering.jpg"
        alt=""
        fill
        sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 85vw"
        className="object-cover opacity-20"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-navy/90 via-navy-deep/95 to-navy-deep" />
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-40" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gold" />
      <div className="relative">
        <p className="type-eyebrow text-gold-light">Multidisciplinary coordination</p>
        <h3 className="mt-5 text-xl font-bold leading-snug">
          <span className="sr-only">Electrical, Civil &amp; Structural, Mechanical and Project Support</span>
          <span aria-hidden="true" className="grid gap-1">
            <span>Electrical</span>
            <span>Civil &amp; Structural</span>
            <span>Mechanical</span>
            <span className="text-gold-light">Project Support</span>
          </span>
        </h3>
      </div>
      <TextLink href="/contact" tone="light" className="relative mt-8">
        Discuss your requirement
      </TextLink>
    </article>
  );
}
