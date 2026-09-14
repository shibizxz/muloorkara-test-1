import { cn } from "@/lib/utils";

/** Stroke icon set (24×24) drawn in the same thin technical line language as the brand. */
const paths = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17L17 7M8 7h9v9",
  chevronDown: "M6 9l6 6 6-6",
  chevronLeft: "M15 6l-6 6 6 6",
  chevronRight: "M9 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h10",
  close: "M6 6l12 12M18 6L6 18",
  check: "M5 12.5l4.5 4.5L19 7.5",
  phone:
    "M6.6 3.5h2.6l1.4 4.1-2 1.3a12 12 0 005.9 5.9l1.3-2 4.1 1.4v2.6a2 2 0 01-2.2 2A16.5 16.5 0 014.6 5.7a2 2 0 012-2.2z",
  mail: "M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7",
  factory: "M3 20.5V11l5 3v-3l5 3V4h3v2h3v14.5H3zM7 17h2M12 17h2M16.5 17h1",
  refinery: "M6 21V9l3-2 3 2v12M12 21v-8h6v8M3 21h18M9 7V3M15 13v-3",
  bridge: "M2 16h20M4 16V9M20 16V9M2 9c4 0 6 4 10 4s6-4 10-4M8 16v-3M12 16v-3M16 16v-3M4 16v4M20 16v4",
  building: "M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3M16 13h1.5M16 17h1.5",
  shieldBolt: "M12 3l7 3v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6zM12.5 7.5L9.5 12.5h3l-1 4 3-5h-3z",
  solar: "M3 13h18l-2 6H5zM9 13l-1 6M15 13l1 6M4 16h16M12 3v2M6.3 5.3l1.4 1.4M17.7 5.3l-1.4 1.4M8.5 10a3.5 3.5 0 017 0",
  gauge: "M4 17a8 8 0 1116 0M12 17l4-5M4 17h16M7 13l.8.5M12 9v1M17 13l-.8.5",
  compass: "M12 3a9 9 0 100 18 9 9 0 000-18zM15.5 8.5l-2 5-5 2 2-5z",
  target: "M12 3a9 9 0 110 18 9 9 0 010-18zM12 7a5 5 0 110 10 5 5 0 010-10zM12 11.2v1.6",
  wrench: "M14.7 6.3a4 4 0 00-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 005.2-5.2l-2.4 2.4-2.6-.6-.6-2.6z",
  shield: "M12 3l7 3v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6zM9 12l2 2 4-4",
  scale: "M12 4v16M8 20h8M5 7h14M5 7l-3 6h6l-3-6zM19 7l-3 6h6l-3-6z",
  leaf: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l7-7",
  layers: "M12 3l9 4.5-9 4.5L3 7.5zM3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5",
  clipboard: "M8 4h8v3H8zM6 5.5H5v15h14v-15h-1M8.5 12l2 2 4-4M8.5 17h7",
  alert: "M12 3.5l9.5 16.5h-19zM12 10v4.5M12 17.2v.3",
  bolt: "M13 2L4.5 13.5H11L10 22l8.5-11.5H12z",
  search: "M11 4a7 7 0 110 14 7 7 0 010-14zM16 16l4.5 4.5",
  file: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  beam: "M3 5h18M3 19h18M12 5v14M7 5v3M17 5v3M7 16v3M17 16v3",
  cog: "M12 8.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1",
  linkedin: "M4 4h16v16H4zM8 10.5V16M8 7.8v.2M11.5 16v-5.5M11.5 13a2.5 2.5 0 015 0v3",
} as const;

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
    >
      <path d={paths[name]} />
    </svg>
  );
}
