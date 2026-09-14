import { evidenceLed } from "@/data/company";

function Connector() {
  return <span aria-hidden="true" className="mx-auto block h-9 w-px bg-linear-to-b from-white/25 to-gold" />;
}

/** Symptom → diagnosis → root cause → action, using the brochure's audit terminology. */
export function EvidenceDiagram() {
  return (
    <figure className="relative overflow-hidden rounded-[2px] bg-navy-deep p-6 text-white sm:p-10">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint" />
      <figcaption className="sr-only">
        Evidence-led diagnosis: observed symptoms are investigated to identify the root cause before corrective action
        and verification.
      </figcaption>
      <div className="relative">
        <p className="type-eyebrow text-center text-mist">Observed symptoms</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {evidenceLed.symptoms.map((symptom) => (
            <li
              key={symptom}
              className="rounded-[2px] border border-white/15 px-3 py-2.5 text-center text-sm font-semibold text-white/85"
            >
              {symptom}
            </li>
          ))}
        </ul>
        <Connector />
        <div className="rounded-[2px] border border-white/20 bg-white/[0.04] px-5 py-4 text-center">
          <p className="font-bold">Evidence-led diagnosis</p>
          <p className="mt-1 text-sm text-mist">Inspection · Records · Measurements · Modelling</p>
        </div>
        <Connector />
        <div className="rounded-[2px] border border-gold bg-gold/10 px-5 py-4 text-center">
          <p className="font-bold text-gold-light">Root cause identified</p>
          <p className="mt-1 text-sm text-mist">Prioritized by technical risk and business impact</p>
        </div>
        <Connector />
        <div className="grid gap-2 sm:grid-cols-2">
          <p className="rounded-[2px] border border-white/20 px-4 py-3 text-center text-sm font-semibold">
            Corrective &amp; preventive action
          </p>
          <p className="rounded-[2px] border border-white/20 px-4 py-3 text-center text-sm font-semibold">
            Verification &amp; documentation
          </p>
        </div>
      </div>
    </figure>
  );
}
