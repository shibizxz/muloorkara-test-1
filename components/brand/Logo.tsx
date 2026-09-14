import Image from "next/image";
import { Wordmark } from "@/components/brand/Wordmark";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** "dark" for light backgrounds, "light" for navy backgrounds. */
  tone?: "dark" | "light";
  className?: string;
}

/** Compact horizontal lockup for the header and footer: Y mark + wordmark + descriptor. */
export function Logo({ tone = "dark", className }: LogoProps) {
  const src = tone === "dark" ? "/logo/yukti-logo-mark-240.webp" : "/logo/yukti-logo-mark-light-240.webp";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image src={src} alt="" width={240} height={215} loading="eager" className="h-10 w-auto sm:h-11" />
      <span className="flex flex-col items-start gap-[7px]">
        <Wordmark tone={tone} decorative className="h-[18px] w-auto shrink-0 sm:h-5" />
        <span
          className={cn(
            "whitespace-nowrap text-[8.5px] font-bold uppercase leading-none tracking-[0.2em]",
            tone === "dark" ? "text-navy/70" : "text-white/70",
          )}
        >
          Engineering &amp; Projects
        </span>
      </span>
    </span>
  );
}
