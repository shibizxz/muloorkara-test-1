"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * One delegated click listener that maps links to analytics events,
 * so individual components do not need tracking code.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const label = link.textContent?.trim().slice(0, 80);

      let name: AnalyticsEvent | null = null;
      if (href.startsWith("tel:")) name = "phone_click";
      else if (href.startsWith("mailto:")) name = "email_click";
      else if (href.includes("wa.me") || href.includes("whatsapp")) name = "whatsapp_click";
      else if (href.startsWith("/contact")) name = "contact_click";

      if (name) trackEvent(name, { link_text: label, link_url: href, page_path: window.location.pathname });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
