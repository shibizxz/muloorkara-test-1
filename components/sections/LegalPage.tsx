import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

/** Marks text that must be confirmed by the client or legal counsel before launch. */
export function ToConfirm({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[2px] border border-dashed border-gold bg-gold/10 px-1.5 py-0.5 text-[0.9375rem] text-gold-dark">
      To be confirmed: {children}
    </span>
  );
}

interface LegalPageProps {
  title: string;
  path: string;
  lead: string;
  sections: LegalSection[];
}

export function LegalPage({ title, path, lead, sections }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        lead={lead}
        crumbs={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <section className="section-y bg-white">
        <div className="container-narrow">
          <div role="note" className="flex gap-4 rounded-[2px] border border-gold/50 bg-gold/10 p-5 text-ink">
            <Icon name="alert" className="mt-0.5 text-gold-dark" />
            <p className="leading-relaxed">
              <strong>Draft for review.</strong> This page provides a structure only. Its content must be reviewed and
              completed by {`YUKTI Engineering & Projects`} and appropriate legal counsel before it is relied upon.
            </p>
          </div>
          <div className="mt-12 grid gap-12">
            {sections.map((section, index) => (
              <article key={section.title} className="border-t border-line pt-8">
                <h2 className="flex gap-4 text-2xl font-bold text-navy">
                  <span className="text-base font-bold tabular-nums text-gold-dark">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <div className="mt-4 grid gap-4 pl-0 text-[1.0625rem] leading-relaxed text-ink-soft sm:pl-10">
                  {section.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
