interface WordmarkProps {
  tone?: "dark" | "light";
  className?: string;
  /** Hide from assistive technology when an accessible name is provided elsewhere. */
  decorative?: boolean;
}

/**
 * Vector YUKTI wordmark — thin geometric capitals with the gold Y arm and gold
 * dot over the I, matching the original logo lockup.
 */
export function Wordmark({ tone = "dark", className, decorative = false }: WordmarkProps) {
  const ink = tone === "dark" ? "#0A1F3F" : "#FFFFFF";
  const gold = "#C8962E";

  return (
    <svg
      viewBox="0 0 146 40"
      className={className}
      fill="none"
      strokeWidth={3.4}
      strokeLinejoin="miter"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "YUKTI" })}
    >
      <path d="M3 4 L14 19" stroke={gold} />
      <path d="M25 4 L14 19 V36" stroke={ink} />
      <path d="M37 4 V25 A11 11 0 0 0 59 25 V4" stroke={ink} />
      <path d="M73 4 V36 M93 4 L74.5 20.5 M80.5 15.5 L94 36" stroke={ink} />
      <path d="M104 4 H128 M116 4 V36" stroke={ink} />
      <path d="M141 13 V36" stroke={ink} />
      <circle cx="141" cy="5" r="3" fill={gold} />
    </svg>
  );
}
