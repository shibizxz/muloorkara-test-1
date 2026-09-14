import type { CSSProperties } from "react";
import { approach } from "@/data/company";
import { cn } from "@/lib/utils";

/** CONSULT → ANALYSE → DESIGN → SUPPORT. Vertical timeline on mobile, horizontal on desktop. */
export function EngineeringProcess({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const onDark = tone === "dark";

  return (
    <ol className="relative grid md:grid-cols-4 md:gap-8">
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-5 right-5 top-5 hidden h-px md:block",
          onDark ? "bg-linear-to-r from-gold via-gold/50 to-gold/10" : "bg-linear-to-r from-gold via-gold/60 to-line",
        )}
      />
      {approach.map((step, index) => (
        <li
          key={step.number}
          data-reveal
          style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
          className="relative pb-10 pl-16 last:pb-0 md:pb-0 md:pl-0 md:pt-20"
        >
          {index < approach.length - 1 && (
            <span aria-hidden="true" className="absolute bottom-0 left-5 top-12 w-px bg-gold/40 md:hidden" />
          )}
          <span
            className={cn(
              "absolute left-0 top-0 grid size-10 place-items-center rounded-full border text-sm font-bold tabular-nums",
              onDark ? "border-gold bg-navy-dark text-gold-light" : "border-gold bg-white text-gold-dark",
            )}
          >
            {step.number}
          </span>
          <h3 className={cn("text-2xl font-bold uppercase tracking-[0.08em]", onDark ? "text-white" : "text-navy")}>
            {step.title}
          </h3>
          <p className={cn("mt-3 max-w-xs leading-relaxed", onDark ? "text-mist" : "text-ink-soft")}>
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
