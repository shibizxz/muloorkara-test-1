import Link from "next/link";
import { LegalPage, ToConfirm, type LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How YUKTI Engineering & Projects handles information submitted through this website.",
  path: "/privacy-policy",
});

const sections: LegalSection[] = [
  {
    title: "Who we are",
    body: (
      <p>
        This website is operated by {siteConfig.companyName}. <ToConfirm>registered business name and address</ToConfirm>
      </p>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <>
        <p>
          When you submit the enquiry form, we collect the details you choose to provide: full name, company or
          organization, email address, phone number, country, the service you are interested in, your requirement
          details and your preferred contact method.
        </p>
        <p>
          Our hosting provider may process basic technical information, such as IP address and browser type, in server
          logs. <ToConfirm>hosting provider and log retention</ToConfirm>
        </p>
      </>
    ),
  },
  {
    title: "How we use information",
    body: (
      <p>
        Enquiry information is used to respond to your enquiry, to discuss your engineering requirement and to keep a
        record of our correspondence.
      </p>
    ),
  },
  {
    title: "Sharing",
    body: (
      <p>
        Enquiry details are transmitted through the service used to deliver website enquiries.{" "}
        <ToConfirm>enquiry delivery provider and any other recipients</ToConfirm>
      </p>
    ),
  },
  {
    title: "Cookies and analytics",
    body: (
      <p>
        This website does not set analytics or advertising cookies unless an analytics service is enabled.{" "}
        <ToConfirm>update this section if Google Analytics or Google Tag Manager is configured</ToConfirm>
      </p>
    ),
  },
  {
    title: "Retention",
    body: (
      <p>
        <ToConfirm>how long enquiry information is kept</ToConfirm>
      </p>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        You may contact us to ask about the information we hold about you or to request its correction or deletion.{" "}
        <ToConfirm>applicable data-protection law and rights</ToConfirm>
      </p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-navy underline underline-offset-2">
          {siteConfig.contact.email}
        </a>{" "}
        or through the{" "}
        <Link href="/contact" className="font-semibold text-navy underline underline-offset-2">
          contact page
        </Link>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      lead="How information submitted through this website is collected and used."
      sections={sections}
    />
  );
}
