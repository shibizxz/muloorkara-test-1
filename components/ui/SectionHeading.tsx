import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "left" | "center";
  /** "dark" when placed on a navy background. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const onDark = tone === "dark";

  return (
    <div data-reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "type-eyebrow flex items-center gap-3",
            align === "center" && "justify-center",
            onDark ? "text-gold-light" : "text-gold-dark",
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={cn("type-h2 mt-5", onDark ? "text-white" : "text-navy")}>
        {title}
      </h2>
      {lead && <p className={cn("type-lead mt-6", onDark ? "text-mist" : "text-ink-soft")}>{lead}</p>}
    </div>
  );
}
