import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Contact YUKTI — Start an Engineering Enquiry";
const description =
  "Discuss your engineering requirement with YUKTI Engineering & Projects: electrical, civil & structural, mechanical engineering, audits, root-cause analysis, documentation and project support.";

export const metadata = buildMetadata({ title, description, path: "/contact" });

const helpfulDetails = [
  "The facility, system or structure involved",
  "Symptoms observed — trips, overheating, underperformance or failure",
  "Available drawings, settings, maintenance records or operating history",
  "The project stage and what you need to achieve",
];

export default function ContactPage() {
  const { phone, email } = siteConfig.contact;

  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/contact", type: "ContactPage" })} />
      <PageHero
        eyebrow="Contact YUKTI"
        title="Let’s discuss your engineering requirement."
        lead="Share the requirement, the existing condition and the outcome you need. The more technical context you provide, the more useful the first conversation will be."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        visual={
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-white/15 bg-navy shadow-2xl">
            <Image
              src="/images/services/project-support.jpg"
              alt="Engineering enquiry and technical consultation"
              fill
              priority
              sizes="(min-width: 1024px) 500px, 90vw"
              className="object-cover opacity-85"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-transparent to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-20" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold text-gold-light">Technical Scope &amp; Consultation</span>
              <span className="font-mono text-mist">DIRECT ENGINEER ACCESS</span>
            </div>
          </div>
        }
      />

      <section aria-label="Enquiry" className="section-y bg-off-white">
        <div className="container-site grid gap-10 lg:grid-cols-[0.75fr_1.25fr] xl:gap-16">
          <aside className="grid content-start gap-8">
            <div>
              <h2 className="type-h3 text-navy">Speak with YUKTI</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Call or email directly, or use the enquiry form to send the details of your requirement.
              </p>
            </div>

            <ul className="grid gap-3">
              <li>
                <a
                  href={phone.href}
                  className="group flex items-center gap-4 rounded-[2px] border border-line bg-white p-5 transition-colors hover:border-navy/30"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-[2px] bg-navy text-gold-light">
                    <Icon name="phone" />
                  </span>
                  <span className="min-w-0">
                    <span className="type-eyebrow block text-gold-dark">Phone</span>
                    <span className="mt-1.5 block text-lg font-bold text-navy">{phone.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-4 rounded-[2px] border border-line bg-white p-5 transition-colors hover:border-navy/30"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-[2px] bg-navy text-gold-light">
                    <Icon name="mail" />
                  </span>
                  <span className="min-w-0">
                    <span className="type-eyebrow block text-gold-dark">Email</span>
                    <span className="mt-1.5 block break-all text-lg font-bold text-navy">{email}</span>
                  </span>
                </a>
              </li>
            </ul>

            <div className="rounded-[2px] border-l-2 border-gold bg-white p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy">Helpful to include</h2>
              <ul className="mt-5 grid gap-3">
                {helpfulDetails.map((item) => (
                  <li key={item} className="flex gap-3 text-ink">
                    <Icon name="check" className="mt-0.5 size-4 text-gold-dark" strokeWidth={2.2} />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
