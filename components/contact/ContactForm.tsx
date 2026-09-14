"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { trackEvent } from "@/lib/analytics";
import { submitEnquiry } from "@/lib/enquiry/client";
import {
  LIMITS,
  contactMethods,
  serviceOptions,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryInput,
} from "@/lib/enquiry/schema";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: EnquiryField[] = [
  "fullName",
  "company",
  "email",
  "phone",
  "country",
  "service",
  "details",
  "contactMethod",
  "consent",
];

function readForm(form: HTMLFormElement): EnquiryInput {
  const data = new FormData(form);
  const text = (key: string) => String(data.get(key) ?? "").trim();
  return {
    fullName: text("fullName"),
    company: text("company"),
    email: text("email"),
    phone: text("phone"),
    country: text("country"),
    service: text("service"),
    details: text("details"),
    contactMethod: text("contactMethod"),
    consent: data.get("consent") === "on",
  };
}

const inputClass =
  "block min-h-12 w-full rounded-[2px] border border-line bg-white px-4 py-3 text-base text-ink transition-[border-color,box-shadow] placeholder:text-ink-soft/60 hover:border-navy/40 focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold/60 aria-[invalid=true]:border-red-600";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Field({ id, label, required, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-gold-dark">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-red-700">
          <Icon name="alert" className="mt-0.5 size-4" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const serviceRef = useRef<HTMLSelectElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const startedAt = useRef<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  // Pre-select a service when arriving from a service page (?service=slug).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    const select = serviceRef.current;
    if (requested && select && serviceOptions.some((option) => option.value === requested)) {
      select.value = requested;
    }
  }, [status]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const id = (name: string) => `${uid}-${name}`;
  const describedBy = (name: EnquiryField) => (errors[name] ? `${id(name)}-error` : undefined);

  function markStarted() {
    if (startedAt.current !== null) return;
    startedAt.current = Date.now();
    trackEvent("form_start", { form: "enquiry" });
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name as EnquiryField;
    if (!errors[name]) return;
    const next = validateEnquiry(readForm(event.currentTarget));
    setErrors((previous) => {
      const updated = { ...previous };
      if (next[name]) updated[name] = next[name];
      else delete updated[name];
      return updated;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    markStarted();

    const input = readForm(form);
    const found = validateEnquiry(input);
    setErrors(found);
    setMessage(null);

    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitEnquiry({
      ...input,
      website: String(new FormData(form).get("website") ?? ""),
      startedAt: startedAt.current ?? Date.now(),
    });

    if (result.ok) {
      trackEvent("form_submit", { form: "enquiry", service: input.service });
      startedAt.current = null;
      setStatus("success");
      return;
    }

    if (result.errors) setErrors(result.errors);
    setMessage(result.message);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-[2px] border border-line bg-white p-8 sm:p-12">
        <span className="grid size-14 place-items-center rounded-full bg-navy text-gold-light">
          <Icon name="check" className="size-7" strokeWidth={2} />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="type-h3 mt-6 text-navy focus:outline-none">
          Thank you — your enquiry has been sent.
        </h2>
        <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">
          We have received your requirement and will respond using the contact details you provided.
        </p>
        <button
          type="button"
          onClick={() => {
            setErrors({});
            setStatus("idle");
          }}
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-navy hover:text-gold-dark"
        >
          Send another enquiry <Icon name="arrowRight" className="size-4 text-gold" />
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const submitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      onFocusCapture={markStarted}
      aria-describedby={`${uid}-required-note`}
      className="relative rounded-[2px] border border-line bg-white p-6 shadow-[0_30px_80px_-50px_rgba(10,31,63,0.45)] sm:p-10"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
      <h2 className="type-h3 text-navy">Enquiry form</h2>
      <p id={`${uid}-required-note`} className="mt-2 text-sm text-ink-soft">
        Fields marked <span className="text-gold-dark">*</span> are required.
      </p>

      {errorCount > 0 && status !== "error" && (
        <div role="alert" className="mt-6 flex gap-3 rounded-[2px] border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <Icon name="alert" className="mt-0.5" />
          <p>
            Please correct {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} before
            submitting.
          </p>
        </div>
      )}

      {status === "error" && message && (
        <div role="alert" className="mt-6 flex gap-3 rounded-[2px] border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <Icon name="alert" className="mt-0.5" />
          <div>
            <p className="font-semibold">Your enquiry was not sent.</p>
            <p className="mt-1">{message}</p>
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold underline underline-offset-2">
                {siteConfig.contact.email}
              </a>
              <a href={siteConfig.contact.phone.href} className="font-semibold underline underline-offset-2">
                {siteConfig.contact.phone.display}
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id={id("fullName")} label="Full name" required error={errors.fullName}>
          <input
            id={id("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.fullName}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={describedBy("fullName")}
            className={inputClass}
          />
        </Field>

        <Field id={id("company")} label="Company / organization" error={errors.company}>
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company")}
            className={inputClass}
          />
        </Field>

        <Field id={id("email")} label="Email" required error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
        </Field>

        <Field id={id("phone")} label="Phone" error={errors.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={inputClass}
          />
        </Field>

        <Field id={id("country")} label="Country" error={errors.country}>
          <input
            id={id("country")}
            name="country"
            type="text"
            autoComplete="country-name"
            maxLength={LIMITS.country}
            aria-invalid={errors.country ? true : undefined}
            aria-describedby={describedBy("country")}
            className={inputClass}
          />
        </Field>

        <Field id={id("service")} label="Service required" required error={errors.service}>
          <div className="relative">
            <select
              ref={serviceRef}
              id={id("service")}
              name="service"
              required
              defaultValue=""
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy("service")}
              className={cn(inputClass, "appearance-none pr-10")}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="chevronDown"
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-navy"
            />
          </div>
        </Field>

        <Field
          id={id("details")}
          label="Project / requirement details"
          required
          error={errors.details}
          className="sm:col-span-2"
        >
          <textarea
            id={id("details")}
            name="details"
            rows={6}
            required
            maxLength={LIMITS.details}
            placeholder="Describe the system or project, the existing condition and what you need to achieve."
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={describedBy("details")}
            className={cn(inputClass, "resize-y")}
          />
        </Field>

        <fieldset className="sm:col-span-2" aria-describedby={describedBy("contactMethod")}>
          <legend className="text-sm font-semibold text-navy">Preferred contact method</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {contactMethods.map((method) => (
              <label
                key={method}
                className="relative inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-[2px] border border-line px-4 text-[0.9375rem] text-ink transition-colors hover:border-navy/40 has-[:checked]:border-navy has-[:checked]:bg-off-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold"
              >
                <input type="radio" name="contactMethod" value={method} className="size-4 accent-navy" />
                {method}
              </label>
            ))}
          </div>
          {errors.contactMethod && (
            <p id={`${id("contactMethod")}-error`} className="mt-2 text-sm text-red-700">
              {errors.contactMethod}
            </p>
          )}
        </fieldset>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id={id("consent")}
              name="consent"
              type="checkbox"
              required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={describedBy("consent")}
              className="mt-0.5 size-5 shrink-0 accent-navy"
            />
            <label htmlFor={id("consent")} className="text-sm leading-relaxed text-ink-soft">
              I agree that {siteConfig.companyName} may use the details I have provided to respond to this enquiry, as
              described in the{" "}
              <Link href="/privacy-policy" className="font-semibold text-navy underline underline-offset-2">
                Privacy Policy
              </Link>
              .<span aria-hidden="true" className="text-gold-dark"> *</span>
              <span className="sr-only"> (required)</span>
            </label>
          </div>
          {errors.consent && (
            <p id={`${id("consent")}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-red-700">
              <Icon name="alert" className="mt-0.5 size-4" />
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] bg-navy px-8 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-navy-light disabled:cursor-wait disabled:opacity-80"
        >
          {submitting ? (
            <>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 animate-spin" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
                <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Submit enquiry
              <Icon name="arrowRight" className="size-4 text-gold-light transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="text-sm text-ink-soft">
          Prefer email?{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-navy underline underline-offset-2">
            Write to us directly
          </a>
        </p>
      </div>
    </form>
  );
}
