import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  visual?: ReactNode;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, lead, crumbs, visual, actions }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_85%_20%,rgba(23,64,122,0.65),transparent_70%)]"
      />
      <div
        className={cn(
          "container-site grid items-center gap-12 pb-16 pt-[calc(var(--header-h)+2.5rem)] sm:pb-20 lg:pb-24 lg:pt-[calc(var(--header-h)+4rem)]",
          Boolean(visual) && "lg:grid-cols-[1.15fr_0.85fr]",
        )}
      >
        <div className="max-w-3xl">
          {crumbs && <Breadcrumbs crumbs={crumbs} />}
          <p className="type-eyebrow flex items-center gap-3 text-gold-light">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {eyebrow}
          </p>
          <h1 className="type-h1 mt-5">{title}</h1>
          {lead && <p className="type-lead mt-6 max-w-2xl text-mist">{lead}</p>}
          {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
        </div>
        {visual && <div className="relative w-full max-lg:max-w-xl">{visual}</div>}
      </div>
      <div aria-hidden="true" className="h-px bg-linear-to-r from-gold via-gold/40 to-transparent" />
    </section>
  );
}
