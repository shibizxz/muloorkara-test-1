import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy-deep hover:bg-gold-light",
  secondary: "bg-navy text-white hover:bg-navy-light",
  "outline-light": "border border-white/35 text-white hover:border-gold-light hover:text-gold-light",
  "outline-dark": "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
};

const sizes = {
  md: "min-h-12 px-6",
  sm: "min-h-11 px-4",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
  arrow?: boolean;
  /** Spacing and alignment only — control visibility on a wrapping element. */
  className?: string;
}

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  arrow = true,
  className,
}: ButtonLinkProps) {
  const classes = cn(
    "group items-center justify-center gap-3 rounded-[2px] py-3 text-[0.8125rem] font-bold uppercase tracking-[0.12em] transition-[background-color,border-color,color] duration-300 ease-premium",
    fullWidth ? "flex w-full" : "inline-flex",
    sizes[size],
    variants[variant],
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <Icon name="arrowRight" className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
      )}
    </>
  );

  return isExternal(href) ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

interface TextLinkProps {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}

/** Inline arrow link for contextual calls to action. */
export function TextLink({ href, children, tone = "dark", className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] transition-colors",
        tone === "dark" ? "text-navy hover:text-gold-dark" : "text-white hover:text-gold-light",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <Icon name="arrowRight" className="size-4 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
