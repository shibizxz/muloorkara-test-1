import type { IllustrationName } from "@/components/illustrations/EngineeringIllustration";

/**
 * Service content — sourced from the YUKTI Engineering & Projects brochure.
 */

export type ServiceSlug =
  | "electrical-engineering"
  | "civil-structural-engineering"
  | "mechanical-engineering"
  | "audit-root-cause-analysis"
  | "design-documentation"
  | "project-support";

export interface CapabilityItem {
  title: string;
  description?: string;
}

export interface CapabilityGroup {
  title: string;
  intro?: string;
  /** Presentation hint. Defaults to cards when items have descriptions, otherwise a checklist. */
  layout?: "cards" | "checklist" | "steps";
  items: CapabilityItem[];
}

export interface Service {
  slug: ServiceSlug;
  number: string;
  title: string;
  /** Short label for navigation and cards. */
  shortTitle: string;
  /** Primary engineering discipline (Electrical, Civil & Structural, Mechanical). */
  isDiscipline: boolean;
  illustration: IllustrationName;
  image: string;
  summary: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  groups: CapabilityGroup[];
  highlight?: { title: string; text: string };
  codes?: string[];
  software?: string[];
  related: ServiceSlug[];
}

const studiesAndAnalysis: CapabilityGroup = {
  title: "Studies & Analysis",
  items: [
    { title: "Load Flow Analysis", description: "Voltage profile, loading and system capacity." },
    { title: "Short Circuit / Fault Analysis", description: "Fault levels and equipment duty." },
    { title: "Protection Coordination", description: "Selective and dependable protection settings." },
    { title: "Motor & Equipment Studies", description: "Starting, loading and system impact." },
    { title: "Power Quality / Reliability Assessment", description: "Identify causes of poor performance." },
    { title: "Backup Power Assessment", description: "Review resilience, capacity and critical loads." },
  ],
};

const auditGroup: CapabilityGroup = {
  title: "Audit & Root-Cause Analysis",
  intro:
    "When a system repeatedly trips, overheats, underperforms or fails, replacing equipment is not always the right first response. YUKTI focuses on evidence-led diagnosis to identify the underlying technical cause and define corrective action.",
  items: [
    { title: "Site inspection and data collection" },
    { title: "Review of drawings, settings, maintenance records and operating history" },
    { title: "Electrical measurements and system modelling where appropriate" },
    { title: "Failure-mode and root-cause assessment" },
    { title: "Prioritized corrective and preventive recommendations" },
    { title: "Post-correction verification and documentation" },
  ],
};

const designGroup: CapabilityGroup = {
  title: "Design & Documentation",
  intro:
    "Good engineering is also good documentation. YUKTI helps clients bring drawings and technical records closer to the actual installation so future operation, maintenance, modification and troubleshooting become safer and faster.",
  items: [
    { title: "Single-line diagrams and electrical schematics" },
    { title: "Drawing correction and as-built updating" },
    { title: "Detailed engineering drawings and design detailing" },
    { title: "Technical specifications and equipment schedules" },
    { title: "Engineering calculations and study reports" },
    { title: "Document review for constructability, clarity and consistency" },
  ],
};

const projectSupportGroup: CapabilityGroup = {
  title: "Project Support",
  items: [
    { title: "Technical scope development and work-package definition" },
    { title: "Tender and contractor technical support" },
    { title: "Vendor / equipment technical evaluation" },
    { title: "Site engineering and installation review" },
    { title: "Interdisciplinary coordination and design clarification" },
    { title: "Testing, commissioning support and close-out documentation" },
    { title: "Execution monitoring against approved technical requirements" },
  ],
};

export const services: Service[] = [
  {
    slug: "electrical-engineering",
    number: "01",
    title: "Electrical Engineering",
    shortTitle: "Electrical Engineering",
    isDiscipline: true,
    illustration: "electrical",
    image: "/images/services/electrical.jpg",
    summary:
      "Power-system studies, audits, fault analysis, protection coordination, design review, documentation and project support.",
    intro:
      "YUKTI’s electrical engineering capability helps clients understand system behaviour, identify risks and make confident technical decisions before committing to major expenditure.",
    seoTitle: "Electrical Engineering & Power System Studies",
    seoDescription:
      "Electrical engineering services from YUKTI: load flow analysis, short circuit and fault analysis, protection coordination, power quality assessment, electrical audits, design documentation and project support.",
    keywords: [
      "electrical engineering consultancy",
      "power system studies",
      "load flow analysis",
      "short circuit analysis",
      "protection coordination",
      "power quality assessment",
      "electrical audit",
    ],
    groups: [studiesAndAnalysis, auditGroup, designGroup, projectSupportGroup],
    highlight: {
      title: "Evidence-led engineering",
      text: "Analysis distinguishes symptoms from root causes and prioritizes interventions according to technical risk and business impact.",
    },
    related: ["audit-root-cause-analysis", "design-documentation", "project-support"],
  },
  {
    slug: "civil-structural-engineering",
    number: "02",
    title: "Civil & Structural Engineering",
    shortTitle: "Civil & Structural",
    isDiscipline: true,
    illustration: "structural",
    image: "/images/services/structural.jpg",
    summary:
      "Structural analysis and design, industrial and infrastructure structures, buildings, bridges, assessment, codes and design documentation.",
    intro:
      "YUKTI’s Civil & Structural Engineering division provides analytical, design and technical support across industrial facilities, high-rise buildings, specialized infrastructure and bridge works, combining strong structural analysis capability with practical engineering experience.",
    seoTitle: "Civil & Structural Engineering Consultancy",
    seoDescription:
      "Structural analysis and design for steel and reinforced concrete, industrial and infrastructure structures, buildings, bridges and structural assessment to ACI 318, AISC 360, Eurocode 2 & 3, IS 456 and IS 800.",
    keywords: [
      "civil structural engineering consultancy",
      "structural analysis and design",
      "structural assessment",
      "steel structure design",
      "reinforced concrete design",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          { title: "Structural Analysis & Design", description: "Steel and reinforced concrete structures." },
          {
            title: "Industrial & Infrastructure Structures",
            description: "Industrial facilities, infrastructure and specialized structures.",
          },
          { title: "Building Structures", description: "Residential, commercial and high-rise developments." },
          { title: "Bridge & Specialized Structures", description: "Engineering analysis and design support." },
          {
            title: "Structural Assessment & Review",
            description: "Design verification and evaluation of existing and proposed structures.",
          },
          {
            title: "International Design Codes",
            description: "ACI 318, AISC 360, Eurocode 2 & 3, IS 456:2000 and IS 800.",
          },
          {
            title: "Design Documentation",
            description: "Structural calculations, engineering drawings, design reports and technical documentation.",
          },
        ],
      },
    ],
    codes: ["ACI 318", "AISC 360", "Eurocode 2", "Eurocode 3", "IS 456:2000", "IS 800"],
    software: ["STAAD.Pro", "ETABS", "SAFE", "RAM Connection", "Dlubal RFEM", "STAAD Foundation"],
    related: ["mechanical-engineering", "design-documentation", "project-support"],
  },
  {
    slug: "mechanical-engineering",
    number: "03",
    title: "Mechanical Engineering",
    shortTitle: "Mechanical Engineering",
    isDiscipline: true,
    illustration: "mechanical",
    image: "/images/services/mechanical.jpg",
    summary:
      "Conveyor and chute analysis, mechanical plant structures, dust collection, process equipment, piping evaluation and mechanical documentation.",
    intro:
      "YUKTI’s Mechanical Engineering capability combines practical design and analysis experience across bulk material handling, process equipment, fluid systems and mechanical processing plant applications.",
    seoTitle: "Mechanical Engineering Consultancy & Conveyor Design",
    seoDescription:
      "Mechanical engineering from YUKTI: conveyor design and optimization, conveyor and chute analysis, mechanical plant structures, dust collection systems, process equipment and piping system evaluation.",
    keywords: [
      "mechanical engineering consultancy",
      "conveyor design",
      "chute analysis",
      "dust collection system design",
      "pipe stress analysis",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          {
            title: "Conveyor Design & Optimization",
            description: "Belt and chain conveyor design, drive pulley selection, shaft sizing and bearing configuration.",
          },
          {
            title: "Conveyor & Chute Analysis",
            description: "Helix-based conveyor performance analysis and DEM analysis of material transfer chutes.",
          },
          {
            title: "Mechanical Plant Structures",
            description:
              "Structural analysis of mechanical processing plant structures and steelwork using Dlubal RFEM.",
          },
          {
            title: "Dust Collection Systems",
            description: "Filter-bag dust collection design, duct sizing and hydraulic calculations.",
          },
          { title: "Process Equipment", description: "Rotary dryer design calculations and process equipment sizing." },
          {
            title: "Piping System Evaluation",
            description: "Basic pipe stress analysis and modelling using Bentley AutoPIPE.",
          },
          {
            title: "Mechanical Design & Documentation",
            description: "3D modelling, drawings, isometrics, calculation reports and technical submittals.",
          },
        ],
      },
    ],
    software: ["Helix", "Dlubal RFEM", "Autodesk Inventor", "AutoCAD", "AutoCAD Plant 3D", "Bentley AutoPIPE"],
    related: ["civil-structural-engineering", "design-documentation", "project-support"],
  },
  {
    slug: "audit-root-cause-analysis",
    number: "04",
    title: "Audit & Root-Cause Analysis",
    shortTitle: "Audit & Root-Cause Analysis",
    isDiscipline: false,
    illustration: "audit",
    image: "/images/services/audit.jpg",
    summary:
      "Evidence-led diagnosis of systems that trip, overheat, underperform or fail — identifying the underlying technical cause before committing to replacement.",
    intro: auditGroup.intro as string,
    seoTitle: "Engineering Audit & Root-Cause Analysis",
    seoDescription:
      "Electrical audits and engineering root-cause analysis: site inspection, records review, measurements, system modelling, failure-mode assessment and prioritized corrective and preventive recommendations.",
    keywords: [
      "engineering audit services",
      "electrical root cause analysis",
      "engineering root cause analysis",
      "fault investigation",
    ],
    groups: [{ ...auditGroup, title: "How the diagnosis works", intro: undefined, layout: "steps" }],
    highlight: {
      title: "Symptoms are not causes",
      text: "Analysis distinguishes symptoms from root causes and prioritizes interventions according to technical risk and business impact.",
    },
    related: ["electrical-engineering", "design-documentation", "project-support"],
  },
  {
    slug: "design-documentation",
    number: "05",
    title: "Design & Documentation",
    shortTitle: "Design & Documentation",
    isDiscipline: false,
    illustration: "documentation",
    image: "/images/services/documentation.jpg",
    summary:
      "Drawings, schematics, specifications, calculations and as-built records brought closer to the actual installation.",
    intro: designGroup.intro as string,
    seoTitle: "Engineering Design & Documentation Services",
    seoDescription:
      "Engineering design and documentation: single-line diagrams, schematics, drawing correction, as-built updating, specifications, equipment schedules, calculations, study reports and constructability review.",
    keywords: [
      "engineering design services",
      "engineering documentation",
      "as-built drawings",
      "single-line diagrams",
    ],
    groups: [
      { ...designGroup, title: "Electrical design & documentation", intro: undefined },
      {
        title: "Multidisciplinary documentation",
        items: [
          {
            title: "Civil & Structural",
            description: "Structural calculations, engineering drawings, design reports and technical documentation.",
          },
          {
            title: "Mechanical",
            description: "3D modelling, drawings, isometrics, calculation reports and technical submittals.",
          },
        ],
      },
    ],
    related: ["electrical-engineering", "civil-structural-engineering", "mechanical-engineering"],
  },
  {
    slug: "project-support",
    number: "06",
    title: "Project Support",
    shortTitle: "Project Support",
    isDiscipline: false,
    illustration: "project",
    image: "/images/services/project-support.jpg",
    summary:
      "Technical support from scope definition and tendering through site engineering, testing, commissioning and close-out.",
    intro:
      "YUKTI supports projects from assessment and design through implementation and verification — keeping execution aligned with approved technical requirements and coordinated across disciplines.",
    seoTitle: "Engineering Project Support Services",
    seoDescription:
      "Engineering project support: technical scope development, tender and contractor support, vendor evaluation, site engineering, interdisciplinary coordination, testing, commissioning and close-out documentation.",
    keywords: ["project engineering support", "engineering project support", "commissioning support"],
    groups: [{ ...projectSupportGroup, title: "Project support capabilities" }],
    related: ["electrical-engineering", "design-documentation", "audit-root-cause-analysis"],
  },
];

export const disciplines = services.filter((service) => service.isDiscipline);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
