import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  /** Lay out horizontally on tablet when the card spans two columns. */
  wideOnTablet?: boolean;
  className?: string;
}

/** Whole-card clickable service card; the title link is the accessible target. */
export function ServiceCard({ service, wideOnTablet = false, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2px] border border-line bg-white transition-[transform,box-shadow] duration-300 ease-premium hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(10,31,63,0.4)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold",
        wideOnTablet && "md:flex-row lg:flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-navy-dark",
          wideOnTablet && "md:aspect-auto md:w-1/2 md:shrink-0 lg:aspect-[16/10] lg:w-auto",
        )}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-navy-deep/20 to-navy-deep/30 transition-opacity duration-300 group-hover:opacity-80"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
        <span className="absolute left-5 top-5 inline-flex items-center rounded-sm bg-navy-deep/85 px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-gold-light backdrop-blur-xs ring-1 ring-white/15">
          {service.number}
        </span>
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "block h-[3px] w-14 bg-gold transition-[width] duration-500 ease-premium group-hover:w-full",
          wideOnTablet && "md:hidden lg:block",
        )}
      />
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="type-h3 text-navy">
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {service.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{service.summary}</p>
        <span
          aria-hidden="true"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-navy"
        >
          Learn more
          <Icon name="arrowRight" className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
