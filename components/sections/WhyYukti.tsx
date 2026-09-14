import type { CSSProperties } from "react";
import { whyYukti } from "@/data/company";
import { siteConfig } from "@/lib/site-config";

export function WhyYuktiList() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2">
      {whyYukti.differentiators.map((item, index) => (
        <li
          key={item.title}
          data-reveal
          style={{ "--reveal-delay": `${(index % 2) * 80}ms` } as CSSProperties}
          className="group relative bg-white p-7 sm:p-8"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-premium group-hover:scale-y-100"
          />
          <span className="text-sm font-bold tabular-nums text-gold-dark">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-lg font-bold text-navy">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{item.text}</p>
        </li>
      ))}
      <li className="relative flex flex-col justify-center overflow-hidden bg-navy p-7 text-white sm:p-8">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint" />
        <p className="relative text-xl font-bold leading-snug">
          {siteConfig.philosophy.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </li>
    </ol>
  );
}
