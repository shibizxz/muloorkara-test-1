import type { IconName } from "@/components/ui/Icon";

export interface Sector {
  number: string;
  title: string;
  description: string;
  icon: IconName;
  image: string;
}

/** Sectors — sourced from the YUKTI brochure. */
export const sectorsIntro =
  "YUKTI’s engineering approach is transferable across sectors because the underlying objective remains the same: safe, reliable and value-driven infrastructure.";

export const sectors: Sector[] = [
  {
    number: "01",
    title: "Industrial",
    description: "Industrial plants & manufacturing facilities.",
    icon: "factory",
    image: "/images/sectors/industrial.jpg",
  },
  {
    number: "02",
    title: "Energy & Process",
    description: "Oil & gas, process and utility environments.",
    icon: "refinery",
    image: "/images/sectors/energy-process.jpg",
  },
  {
    number: "03",
    title: "Infrastructure",
    description: "Infrastructure and public utility projects.",
    icon: "bridge",
    image: "/images/sectors/infrastructure.jpg",
  },
  {
    number: "04",
    title: "Buildings",
    description: "Commercial buildings and facilities.",
    icon: "building",
    image: "/images/sectors/buildings.jpg",
  },
  {
    number: "05",
    title: "Critical Systems",
    description: "Critical power and mission-critical environments.",
    icon: "shieldBolt",
    image: "/images/sectors/critical-systems.jpg",
  },
  {
    number: "06",
    title: "Renewables",
    description: "Renewable and energy-related installations.",
    icon: "solar",
    image: "/images/sectors/renewables.jpg",
  },
  {
    number: "07",
    title: "Existing Assets",
    description: "Facilities requiring audit, troubleshooting, upgrades or modernization.",
    icon: "gauge",
    image: "/images/sectors/existing-assets.jpg",
  },
];
