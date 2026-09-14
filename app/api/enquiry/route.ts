import { deliverEnquiry } from "@/lib/enquiry/deliver";
import { normalizeEnquiry, validateEnquiry, type EnquiryApiResponse } from "@/lib/enquiry/schema";
import { siteConfig } from "@/lib/site-config";

const MAX_BODY_BYTES = 20_000;
/** Submissions completed faster than this are treated as automated. */
const MIN_FILL_TIME_MS = 3_000;

function reply(body: EnquiryApiResponse, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return reply({ ok: false, code: "bad_request", message: "The enquiry is too large." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ ok: false, code: "bad_request", message: "The enquiry could not be read." }, 400);
  }

  const record = (body ?? {}) as Record<string, unknown>;

  // Spam protection layer 1: honeypot field. Bots receive a neutral response and nothing is delivered.
  if (typeof record.website === "string" && record.website.trim() !== "") {
    return reply({ ok: true });
  }

  // Spam protection layer 2: minimum completion time.
  const startedAt = Number(record.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return reply(
      { ok: false, code: "bad_request", message: "Please take a moment to review your enquiry and submit again." },
      400,
    );
  }

  const enquiry = normalizeEnquiry(body);
  if (!enquiry) {
    return reply({ ok: false, code: "bad_request", message: "The enquiry could not be read." }, 400);
  }

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return reply({ ok: false, code: "validation", message: "Please correct the highlighted fields.", errors }, 422);
  }

  const result = await deliverEnquiry(enquiry);
  if (result.ok) return reply({ ok: true });

  const fallback = `Please email ${siteConfig.contact.email} or call ${siteConfig.contact.phone.display}.`;
  if (result.reason === "not_configured") {
    return reply(
      {
        ok: false,
        code: "not_configured",
        message: `Online enquiries are not connected yet, so your message was not sent. ${fallback}`,
      },
      503,
    );
  }

  return reply(
    { ok: false, code: "delivery_failed", message: `Your enquiry could not be delivered right now. ${fallback}` },
    502,
  );
}
