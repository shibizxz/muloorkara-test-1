import type { CSSProperties } from "react";

const G = "#E3B85C";
const W = "rgba(255,255,255,0.6)";
const WF = "rgba(255,255,255,0.18)";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * Decorative hero drawing: the circular Y-mark geometry, building elevations,
 * a single-line diagram and circuit traces — drawn in on load.
 */
export function HeroDrawing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 560"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M40 300H620M330 40V560" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 6" />
      <circle cx="330" cy="300" r="170" stroke={WF} strokeDasharray="2 8" className="fade-node" style={delay(0.2)} />
      <path d="M330 62V78M330 522V538M92 300H108M552 300H568" stroke="rgba(255,255,255,0.3)" />

      {/* Outer ring — echoes the circular frame of the YUKTI mark */}
      <path
        d="M198 111.6A230 230 0 0 0 290 526.5"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={2.5}
        pathLength={1}
        className="draw-line"
        style={delay(0.1)}
      />
      <path
        d="M492.6 137.4A230 230 0 0 1 310 529.1"
        stroke={G}
        strokeWidth={2.5}
        pathLength={1}
        className="draw-line"
        style={delay(0.4)}
      />

      {/* Building elevations */}
      <g stroke={W} strokeWidth={1.6}>
        <path d="M168 470V352H200V470" pathLength={1} className="draw-line" style={delay(0.8)} />
        <path d="M208 470V250L236 230L262 250V330L284 346V470" pathLength={1} className="draw-line" style={delay(0.9)} />
      </g>
      <path
        d="M208 290H262M208 330H262M168 392H200M208 370H284M208 410H284M168 432H200M208 450H284M150 470H300"
        stroke={WF}
        className="fade-node"
        style={delay(1.4)}
      />

      {/* Single-line diagram */}
      <g stroke={G} strokeWidth={1.8}>
        <path d="M420 110V150" pathLength={1} className="draw-line" style={delay(1.1)} />
        <circle cx="420" cy="165" r="15" pathLength={1} className="draw-line" style={delay(1.2)} />
        <circle cx="420" cy="187" r="15" pathLength={1} className="draw-line" style={delay(1.3)} />
        <path d="M420 202V222M420 236V256" pathLength={1} className="draw-line" style={delay(1.4)} />
        <rect x="413" y="222" width="14" height="14" pathLength={1} className="draw-line" style={delay(1.45)} />
        <path d="M340 256H500" strokeWidth={3} pathLength={1} className="draw-line" style={delay(1.5)} />
        <path
          d="M360 256V285M360 299V333M420 256V285M420 299V340M480 256V285M480 299V334"
          pathLength={1}
          className="draw-line"
          style={delay(1.7)}
        />
        <rect x="353" y="285" width="14" height="14" className="fade-node" style={delay(1.9)} />
        <rect x="413" y="285" width="14" height="14" className="fade-node" style={delay(1.95)} />
        <rect x="473" y="285" width="14" height="14" className="fade-node" style={delay(2)} />
        <circle cx="360" cy="345" r="12" className="fade-node" style={delay(2.1)} />
        <path d="M413 334L420 346L427 334M470 334H490L480 348Z" className="fade-node" style={delay(2.15)} />
      </g>
      <g fill={G} className="fade-node" style={delay(1.8)}>
        <circle cx="360" cy="256" r="4" />
        <circle cx="420" cy="256" r="4" />
        <circle cx="480" cy="256" r="4" />
      </g>

      {/* Circuit traces */}
      <g stroke={G} strokeWidth={2}>
        <path d="M455 490V440L485 410V380" pathLength={1} className="draw-line" style={delay(1.9)} />
        <path d="M500 482V452L525 427V412" pathLength={1} className="draw-line" style={delay(2)} />
        <path d="M455 96L516 40" pathLength={1} className="draw-line" style={delay(0.7)} />
      </g>
      <g fill={G} className="fade-node" style={delay(2.3)}>
        <circle cx="485" cy="373" r="6" />
        <circle cx="525" cy="405" r="6" />
        <circle cx="522" cy="34" r="7" />
      </g>

      <g
        fill="rgba(255,255,255,0.42)"
        fontSize="10.5"
        letterSpacing="2"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        className="fade-node"
        style={delay(2.2)}
      >
        <text x="440" y="118">SLD-01</text>
        <text x="446" y="182">TX</text>
        <text x="508" y="260">BUS</text>
        <text x="222" y="492">ELEV. A</text>
      </g>
    </svg>
  );
}
