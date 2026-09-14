import { serviceLabel, type EnquiryInput } from "@/lib/enquiry/schema";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

/**
 * Server-side enquiry delivery.
 *
 * Configure ENQUIRY_WEBHOOK_URL with any endpoint that accepts JSON — for example
 * a Formspree form endpoint (https://formspree.io/f/xxxx), a Make/Zapier webhook,
 * or your own serverless email function. ENQUIRY_WEBHOOK_TOKEN is sent as a
 * Bearer token when set. Swap this function for SMTP (e.g. Nodemailer) if preferred.
 */
export async function deliverEnquiry(enquiry: EnquiryInput): Promise<DeliveryResult> {
  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) return { ok: false, reason: "not_configured" };

  const token = process.env.ENQUIRY_WEBHOOK_TOKEN;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        ...enquiry,
        serviceLabel: serviceLabel(enquiry.service),
        _subject: `Website enquiry — ${serviceLabel(enquiry.service)}`,
        _replyto: enquiry.email,
        source: "yukti-website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    return response.ok ? { ok: true } : { ok: false, reason: "provider_error" };
  } catch {
    return { ok: false, reason: "provider_error" };
  }
}
