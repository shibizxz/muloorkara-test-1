"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds `.is-revealed` to `[data-reveal]` elements as they enter the viewport. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
