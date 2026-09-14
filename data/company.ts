import type { IconName } from "@/components/ui/Icon";

/** Company content — sourced from the YUKTI Engineering & Projects brochure. */

export const about = {
  headline: "Engineering with purpose.",
  intro:
    "YUKTI Engineering & Projects is an engineering-led consulting and project support partner focused on practical, technically sound and value-conscious solutions. YUKTI brings engineering analysis, design review, troubleshooting, audits and project execution support into one coordinated approach.",
  capabilities: [
    "Electrical engineering solutions across industrial, infrastructure and commercial environments.",
    "Root-cause analysis, fault investigation and technical problem solving.",
    "Engineering studies, design review, drawing correction and detailed documentation.",
    "Project support focused on safety, reliability, maintainability and lifecycle value.",
  ],
  commitment:
    "Engineering should solve the real problem, not create unnecessary cost. We understand the existing system, identify the actual need, and recommend proportionate interventions that improve safety, reliability, performance and future readiness.",
  rightSized: {
    title: "Right-sized engineering. Measurable value.",
    points: [
      "Client-first technical decisions based on actual site and system conditions.",
      "Avoiding unnecessary replacement, over-design and avoidable capital expenditure.",
      "Clear recommendations that explain what should be done — and why.",
      "Long-term value through reliability, energy awareness and maintainability.",
    ],
  },
};

export const vision =
  "To become a trusted engineering and projects partner known for technical depth, practical judgement and responsible engineering.";

export const mission =
  "To convert complex engineering problems into clear, implementable solutions that protect people, assets, uptime and investment.";

export const howWeDeliver = [
  "Technically defensible solutions with clarity and accountability.",
  "Engineering studies and data to support decisions rather than assumptions.",
  "Support from assessment and design through implementation and verification.",
  "Sustainable improvements without unnecessary financial burden.",
  "Continuous improvement in engineering methods, tools and project delivery.",
];

export interface Value {
  title: string;
  description: string;
  icon: IconName;
}

export const values: Value[] = [
  { title: "Integrity", description: "Objective recommendations and transparent communication.", icon: "compass" },
  { title: "Technical Excellence", description: "Engineering decisions grounded in sound analysis.", icon: "target" },
  { title: "Practicality", description: "Solutions that can actually be implemented and maintained.", icon: "wrench" },
  {
    title: "Safety & Reliability",
    description: "Protection of people, equipment and continuity of operations.",
    icon: "shield",
  },
  { title: "Client Value", description: "Spend where it creates value; avoid expenditure that does not.", icon: "scale" },
  { title: "Sustainability", description: "Improve efficiency and lifecycle performance responsibly.", icon: "leaf" },
  {
    title: "Continuous Learning",
    description: "Stronger solutions through better methods, tools and knowledge.",
    icon: "layers",
  },
];

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

/** Core approach: CONSULT → ANALYSE → DESIGN → SUPPORT. */
export const approach: ApproachStep[] = [
  {
    number: "01",
    title: "Consult",
    description: "Understand the existing system, the site conditions and the actual need.",
  },
  {
    number: "02",
    title: "Analyse",
    description: "Use engineering studies and data to support decisions rather than assumptions.",
  },
  {
    number: "03",
    title: "Design",
    description: "Develop proportionate, technically defensible solutions and clear documentation.",
  },
  {
    number: "04",
    title: "Support",
    description: "Assist implementation, testing, commissioning, verification and close-out.",
  },
];

export const whyYukti = {
  intro:
    "YUKTI is designed to be the engineering partner clients can call when they need a technically credible answer, not simply a product recommendation.",
  differentiators: [
    { title: "Engineering-first", text: "Engineering-first approach rather than sales-first recommendations." },
    { title: "Root-cause understanding", text: "Strong focus on problem diagnosis and root-cause understanding." },
    { title: "Practical solutions", text: "Practical solutions matched to the client’s actual need." },
    {
      title: "Studies to execution",
      text: "Capability to connect studies, drawings, site conditions and execution.",
    },
    {
      title: "Cost-conscious",
      text: "Cost-conscious engineering that avoids unnecessary financial burden.",
    },
    {
      title: "Lifecycle thinking",
      text: "Sustainability through efficiency, lifecycle value and responsible intervention.",
    },
    {
      title: "Clear communication",
      text: "Clear communication and documentation for better client decisions.",
    },
  ],
};

export const sustainability = {
  intro:
    "Sustainability at YUKTI is practical: improve efficiency, reliability and lifecycle performance while respecting the client’s investment priorities.",
  points: [
    "Energy-conscious engineering and system optimization.",
    "Reduction of avoidable losses, unnecessary replacement and premature upgrades.",
    "Lifecycle thinking — operation, maintenance, reliability and future expansion.",
    "Reuse, retrofit and optimization where technically sound and safe.",
  ],
};

export const quality = {
  statement: "Quality and safety are engineering requirements.",
  text: "Every recommendation considers compliance, operational risk, maintainability and the consequences of failure.",
  considerations: [
    { title: "Compliance", icon: "clipboard" as IconName },
    { title: "Operational risk", icon: "alert" as IconName },
    { title: "Maintainability", icon: "wrench" as IconName },
    { title: "Consequences of failure", icon: "shield" as IconName },
  ],
};

export const evidenceLed = {
  title: "Evidence-led engineering",
  text: "Analysis distinguishes symptoms from root causes and prioritizes interventions according to technical risk and business impact.",
  symptoms: ["Trips", "Overheats", "Underperforms", "Fails"],
};
