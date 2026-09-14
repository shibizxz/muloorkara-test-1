import Link from "next/link";
import { LegalPage, ToConfirm, type LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of the YUKTI Engineering & Projects website.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    title: "Use of this website",
    body: (
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the website.
      </p>
    ),
  },
  {
    title: "General information only",
    body: (
      <p>
        Content on this website describes the services of {siteConfig.companyName} for general information. It is not
        engineering advice for any specific facility, system or project. Engineering advice is provided only under an
        agreed scope of work.
      </p>
    ),
  },
  {
    title: "Illustrations",
    body: (
      <p>
        Illustrations and diagrams on this website are representative and do not depict specific projects or client
        installations.
      </p>
    ),
  },
  {
    title: "Trademarks and third-party names",
    body: (
      <p>
        Software and design-code names referenced on this website belong to their respective owners. Their mention
        describes tools and standards used in engineering work and does not imply partnership, affiliation or
        endorsement.
      </p>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <p>
        The YUKTI name, logo and website content are used by {siteConfig.companyName}.{" "}
        <ToConfirm>ownership and permitted use of website content</ToConfirm>
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        <ToConfirm>limitation of liability wording, to be drafted by legal counsel</ToConfirm>
      </p>
    ),
  },
  {
    title: "Governing law",
    body: (
      <p>
        <ToConfirm>governing law and jurisdiction</ToConfirm>
      </p>
    ),
  },
  {
    title: "Changes and contact",
    body: (
      <p>
        These terms may be updated from time to time. Questions can be sent through the{" "}
        <Link href="/contact" className="font-semibold text-navy underline underline-offset-2">
          contact page
        </Link>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      lead="Terms governing the use of this website."
      sections={sections}
    />
  );
}
