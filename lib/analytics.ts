/**
 * Analytics abstraction. Nothing is sent unless GA4 / GTM is configured
 * (NEXT_PUBLIC_GTM_ID). Events are pushed to window.dataLayer so a GTM
 * container can map them to GA4 or any other tool.
 */

export type AnalyticsEvent =
  | "contact_click"
  | "service_view"
  | "form_start"
  | "form_submit"
  | "phone_click"
  | "email_click"
  | "whatsapp_click";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event, ...params });
}
