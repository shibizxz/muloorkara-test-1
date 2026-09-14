import type { ServiceSlug } from "@/data/services";

/** Shared enquiry model and validation — used by both the form and the API route. */

export const serviceOptions: { value: ServiceSlug | "other"; label: string }[] = [
  { value: "electrical-engineering", label: "Electrical Engineering" },
  { value: "civil-structural-engineering", label: "Civil & Structural Engineering" },
  { value: "mechanical-engineering", label: "Mechanical Engineering" },
  { value: "audit-root-cause-analysis", label: "Audit & Root-Cause Analysis" },
  { value: "design-documentation", label: "Design & Documentation" },
  { value: "project-support", label: "Project Support" },
  { value: "other", label: "Other" },
];

export const contactMethods = ["Email", "Phone", "Either"] as const;

export interface EnquiryInput {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  details: string;
  contactMethod: string;
  consent: boolean;
}

export type EnquiryField = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** Payload sent to the API: enquiry plus spam-protection fields. */
export interface EnquiryPayload extends EnquiryInput {
  /** Honeypot — must stay empty. */
  website: string;
  /** Timestamp of the first interaction with the form. */
  startedAt: number;
}

export interface EnquiryApiResponse {
  ok: boolean;
  code?: "validation" | "not_configured" | "delivery_failed" | "bad_request";
  message?: string;
  errors?: EnquiryErrors;
}

export const LIMITS = {
  fullName: 120,
  company: 160,
  email: 254,
  phone: 40,
  country: 80,
  details: 5000,
} as const;

export const MIN_DETAILS_LENGTH = 20;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()0-9\s.-]{6,40}$/;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (input.fullName.length < 2) errors.fullName = "Please enter your full name.";
  else if (input.fullName.length > LIMITS.fullName) errors.fullName = "Please shorten your name.";

  if (!EMAIL_PATTERN.test(input.email) || input.email.length > LIMITS.email)
    errors.email = "Please enter a valid email address.";

  if (input.phone && !PHONE_PATTERN.test(input.phone)) errors.phone = "Please enter a valid phone number.";

  if (input.company.length > LIMITS.company) errors.company = "Please shorten the company name.";
  if (input.country.length > LIMITS.country) errors.country = "Please shorten the country name.";

  if (!serviceOptions.some((option) => option.value === input.service))
    errors.service = "Please select the service you require.";

  if (input.details.length < MIN_DETAILS_LENGTH)
    errors.details = `Please describe your requirement (at least ${MIN_DETAILS_LENGTH} characters).`;
  else if (input.details.length > LIMITS.details)
    errors.details = `Please keep the description under ${LIMITS.details} characters.`;

  if (input.contactMethod && !(contactMethods as readonly string[]).includes(input.contactMethod))
    errors.contactMethod = "Please choose a contact method.";

  if (!input.consent) errors.consent = "Please confirm consent so we can respond to your enquiry.";

  return errors;
}

/** Coerce an untrusted request body into an EnquiryInput. */
export function normalizeEnquiry(raw: unknown): EnquiryInput | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const text = (key: string) => (typeof record[key] === "string" ? (record[key] as string).trim() : "");

  return {
    fullName: text("fullName"),
    company: text("company"),
    email: text("email"),
    phone: text("phone"),
    country: text("country"),
    service: text("service"),
    details: text("details"),
    contactMethod: text("contactMethod"),
    consent: record.consent === true,
  };
}

export function serviceLabel(value: string): string {
  return serviceOptions.find((option) => option.value === value)?.label ?? value;
}
