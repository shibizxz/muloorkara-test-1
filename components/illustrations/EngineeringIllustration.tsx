import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Original line-art engineering illustrations in the brand's navy & gold
 * technical-drawing language. They are illustrative only and can be replaced
 * with real YUKTI project photography when available.
 */

const W = "rgba(255,255,255,0.62)";
const WS = "rgba(255,255,255,0.36)";
const WF = "rgba(255,255,255,0.2)";
const G = "#E3B85C";

function gridPath(width: number, height: number, step: number) {
  const parts: string[] = [];
  for (let x = step; x < width; x += step) parts.push(`M${x} 0V${height}`);
  for (let y = step; y < height; y += step) parts.push(`M0 ${y}H${width}`);
  return parts.join("");
}

const GRID = gridPath(480, 300, 24);

const WAVE = Array.from({ length: 71 }, (_, i) => {
  const x = 50 + i * 4;
  const t = (x - 50) / 280;
  const y = 140 - 34 * Math.sin(t * Math.PI * 6) - 58 * Math.exp(-((x - 232) ** 2) / 60);
  return `${x},${y.toFixed(1)}`;
}).join(" ");

function Electrical() {
  return (
    <>
      <path d="M0 126C30 124 55 112 70 102M150 102C250 150 330 150 480 128M142 142C240 190 340 190 480 170" stroke={WF} />
      <g stroke={W} strokeWidth={1.5}>
        <path d="M84 270L104 60L110 40L116 60L136 270M70 92H150M78 132H142M72 92v10M148 92v10M80 132v10M140 132v10M60 270H160" />
        <path d="M101 90L121 110L97 130L125 150L93 172L129 196L89 222L134 248L84 270" strokeWidth={1} />
      </g>
      <g stroke={G} strokeWidth={1.6}>
        <path d="M350 26V52M350 100V112M350 124V140M290 140V168M290 180V230M350 140V168M350 180V238M410 140V168M410 180V236" />
        <circle cx="350" cy="66" r="14" />
        <circle cx="350" cy="86" r="14" />
        <rect x="344" y="112" width="12" height="12" />
        <rect x="284" y="168" width="12" height="12" />
        <rect x="344" y="168" width="12" height="12" />
        <rect x="404" y="168" width="12" height="12" />
        <path d="M262 140H438" strokeWidth={3} />
        <path d="M284 230L290 242L296 230M404 236H416L410 246Z" />
        <circle cx="350" cy="250" r="12" />
      </g>
      <g fill={G}>
        <circle cx="290" cy="140" r="3.2" />
        <circle cx="350" cy="140" r="3.2" />
        <circle cx="410" cy="140" r="3.2" />
      </g>
      <path d="M170 286q12.5-14 25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0" stroke={G} strokeOpacity={0.5} />
    </>
  );
}

function Structural() {
  return (
    <>
      <path d="M20 280H460" stroke={WF} />
      <g stroke={W} strokeWidth={1.5}>
        <path d="M50 280V110H90V60H130V90H170V280" />
        <path d="M220 230H460M240 230L270 170H410L440 230M305 170V230M340 170V230M375 170V230M270 170L305 230L340 170L375 230L410 170" />
        <path d="M250 230V280M430 230V280M238 280H262M418 280H442" />
      </g>
      <path
        d="M90 110V280M130 90V280M50 135H170M50 160H170M50 185H170M50 210H170M50 235H170M50 260H170M90 85H130M130 110H170"
        stroke={WS}
      />
      <g stroke={G} strokeWidth={1.6}>
        <path d="M90 185L130 210L90 235L130 260" />
        <path d="M270 120H410M290 120V160M285 152L290 162L295 152M340 120V160M335 152L340 162L345 152M390 120V160M385 152L390 162L395 152" />
      </g>
      <path d="M220 44H460M220 38V50M460 38V50M340 38V50" stroke={WS} />
      <g fill={G}>
        <circle cx="270" cy="170" r="3" />
        <circle cx="410" cy="170" r="3" />
        <circle cx="240" cy="230" r="3" />
        <circle cx="440" cy="230" r="3" />
      </g>
    </>
  );
}

function Mechanical() {
  return (
    <>
      <path d="M20 285H460" stroke={WF} />
      <g stroke={W} strokeWidth={1.5}>
        <circle cx="70" cy="250" r="14" />
        <circle cx="320" cy="120" r="20" />
        <path d="M63.5 237.6L310.8 102.3M76.5 262.4L329.2 137.7" />
        <circle cx="142.5" cy="236.5" r="5" />
        <circle cx="205.7" cy="205.3" r="5" />
        <circle cx="268.8" cy="174.2" r="5" />
        <path d="M405 40H455V130L440 160H420L405 130ZM382 108V72H405" />
        <path d="M330 268H470M330 282H470" />
      </g>
      <path d="M142.5 242V285M205.7 211V285M268.8 180V285" stroke={WS} />
      <path d="M418 50V120M430 50V120M442 50V120" stroke={WF} />
      <g fill={W}>
        <circle cx="70" cy="250" r="2.5" />
        <circle cx="320" cy="120" r="3" />
      </g>
      <path d="M342 108H382L398 160V214H366V170L342 136Z" stroke={G} strokeWidth={1.8} />
      <g fill={G}>
        <circle cx="382" cy="230" r="2.6" />
        <circle cx="374" cy="242" r="2.6" />
        <circle cx="390" cy="246" r="2.6" />
        <circle cx="380" cy="258" r="2.6" />
      </g>
    </>
  );
}

function Audit() {
  return (
    <>
      <rect x="40" y="50" width="300" height="180" rx="4" stroke={WS} />
      <path d="M40 140H340M190 50V230" stroke={WF} strokeDasharray="3 5" />
      <polyline points={WAVE} stroke={W} strokeWidth={1.6} />
      <circle cx="232" cy="112" r="40" stroke={G} strokeWidth={2} />
      <path d="M261 141L292 172" stroke={G} strokeWidth={5} />
      <g stroke={W} strokeWidth={1.4}>
        <rect x="372" y="70" width="16" height="16" rx="2" />
        <rect x="372" y="116" width="16" height="16" rx="2" />
        <rect x="372" y="162" width="16" height="16" rx="2" />
        <path d="M400 78H452M400 124H440M400 170H448" />
      </g>
      <path d="M375.5 78l3.5 3.5 6.5-7M375.5 124l3.5 3.5 6.5-7" stroke={G} strokeWidth={2} />
      <path d="M190 230V252M120 272V262H260V272M190 252V271" stroke={WS} />
      <circle cx="120" cy="278" r="6" stroke={W} />
      <circle cx="260" cy="278" r="6" stroke={W} />
      <circle cx="190" cy="278" r="7" fill={G} />
    </>
  );
}

function Documentation() {
  return (
    <>
      <rect x="50" y="30" width="380" height="250" stroke={W} strokeWidth={1.5} />
      <rect x="62" y="42" width="356" height="226" stroke={WF} />
      <path
        d="M300 222H418M300 222V268M300 237H418M300 252H418M350 237V268M300 60H400M300 74H380M80 226H200M80 240H180M80 254H190M76 110V184M71 110H81M71 184H81"
        stroke={WS}
      />
      <g stroke={G} strokeWidth={1.6}>
        <circle cx="185" cy="68" r="11" />
        <circle cx="185" cy="84" r="11" />
        <path d="M185 48V57M185 95V110M130 110V132M130 144V184M185 110V132M185 144V184M240 110V132M240 144V184" />
        <path d="M110 110H260" strokeWidth={2.6} />
        <rect x="124" y="132" width="12" height="12" />
        <rect x="179" y="132" width="12" height="12" />
        <rect x="234" y="132" width="12" height="12" />
        <circle cx="130" cy="193" r="9" />
        <circle cx="185" cy="193" r="9" />
        <circle cx="240" cy="193" r="9" />
      </g>
      <path
        d="M218 124a8 8 0 0 1 16 0a8 8 0 0 1 16 0a8 8 0 0 1 16 0a8 8 0 0 1 0 16a8 8 0 0 1 0 16a8 8 0 0 1 0 16a8 8 0 0 1 0 16a8 8 0 0 1 0 16a8 8 0 0 1-16 0a8 8 0 0 1-16 0a8 8 0 0 1-16 0a8 8 0 0 1 0-16a8 8 0 0 1 0-16a8 8 0 0 1 0-16a8 8 0 0 1 0-16a8 8 0 0 1 0-16Z"
        stroke={G}
        strokeOpacity={0.85}
      />
      <path d="M276 118l8-14l8 14Z" stroke={G} />
    </>
  );
}

function Project() {
  return (
    <>
      <path d="M60 40V260H440M40 78H52M40 113H52M40 148H52M40 183H52M40 218H52" stroke={WS} />
      <g fill={G} fillOpacity={0.85}>
        <rect x="80" y="70" width="120" height="16" rx="2" />
        <rect x="150" y="105" width="120" height="16" rx="2" />
        <rect x="210" y="140" width="60" height="16" rx="2" />
      </g>
      <g stroke={W} strokeWidth={1.4}>
        <rect x="80" y="70" width="120" height="16" rx="2" />
        <rect x="150" y="105" width="130" height="16" rx="2" />
        <rect x="210" y="140" width="110" height="16" rx="2" />
        <rect x="270" y="175" width="110" height="16" rx="2" />
        <rect x="330" y="210" width="90" height="16" rx="2" />
      </g>
      <path d="M270 44V256" stroke={G} strokeDasharray="4 5" />
      <path d="M430 208l10 10-10 10-10-10Z" fill={G} />
      <circle cx="410" cy="80" r="20" stroke={G} strokeWidth={1.8} />
      <path d="M400 80l7 7 13-14" stroke={G} strokeWidth={2.2} />
    </>
  );
}

const artwork = {
  electrical: Electrical,
  structural: Structural,
  mechanical: Mechanical,
  audit: Audit,
  documentation: Documentation,
  project: Project,
} satisfies Record<string, () => ReactElement>;

export type IllustrationName = keyof typeof artwork;

interface EngineeringIllustrationProps {
  name: IllustrationName;
  className?: string;
  svgClassName?: string;
}

export function EngineeringIllustration({ name, className, svgClassName }: EngineeringIllustrationProps) {
  const Art = artwork[name];

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[radial-gradient(120%_90%_at_80%_10%,#17407a_0%,#0a1f3f_45%,#040d20_100%)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 480 300"
        preserveAspectRatio="xMidYMid meet"
        className={cn("absolute inset-0 h-full w-full", svgClassName)}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d={GRID} stroke="rgba(255,255,255,0.055)" />
        <Art />
      </svg>
    </div>
  );
}
