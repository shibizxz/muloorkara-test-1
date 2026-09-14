import type { EnquiryApiResponse, EnquiryErrors, EnquiryPayload } from "@/lib/enquiry/schema";

export interface SubmitResult {
  ok: boolean;
  message: string | null;
  errors?: EnquiryErrors;
}

/**
 * Sends the enquiry to the site's own API route.
 * To use a client-side provider instead (e.g. EmailJS), replace the body of this function.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => ({}))) as EnquiryApiResponse;

    if (response.ok && data.ok) return { ok: true, message: null };
    return {
      ok: false,
      message: data.message ?? "Something went wrong while sending your enquiry. Please try again.",
      errors: data.errors,
    };
  } catch {
    return {
      ok: false,
      message: "We could not reach the server. Please check your connection and try again.",
    };
  }
}
