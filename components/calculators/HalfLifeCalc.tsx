"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is half-life?", answer: "Half-life is the time it takes for half of a radioactive substance to decay. After each half-life, the quantity is halved again." },
  { question: "Is half-life only for radioactive decay?", answer: "No! Half-life applies to any exponential decay: drug concentration in blood, bacterial populations, capacitor discharge, and radioactive materials." },
  { question: "What are common half-lives?", answer: "Carbon-14: 5,730 years (used in carbon dating). Uranium-238: 4.5 billion years. Ibuprofen in blood: ~2 hours. Caffeine in blood: ~5 hours." },
  { question: "How is half-life related to the decay constant?", answer: "Half-life (t½) = ln(2) / λ, where λ is the decay constant. The larger the decay constant, the faster and shorter the half-life." },
];

const PRESETS = [
  { label: "Carbon-14", hl: 5730, unit: "years" },
  { label: "Caffeine", hl: 5, unit: "hours" },
  { label: "Ibuprofen", hl: 2, unit: "hours" },
  { label: "Uranium-238", hl: 4.468e9, unit: "years" },
];

export default function HalfLifeCalc() {
  const [initial, setInitial] = useState("100");
  const [halfLife, setHalfLife] = useState("5730");
  const [elapsed, setElapsed] = useState("11460");
  const [mode, setMode] = useState<"remaining" | "elapsed" | "halflife">("remaining");

  const n0 = parseFloat(initial) || 0;
  const hl = parseFloat(halfLife) || 0;
  const t = parseFloat(elapsed) || 0;

  let remaining = 0, timeToAmount = 0, halfLifeCalc = 0;

  if (mode === "remaining" && n0 > 0 && hl > 0) {
    remaining = n0 * Math.pow(0.5, t / hl);
  }

  const halves = hl > 0 ? t / hl : 0;
  const pctRemaining = n0 > 0 ? (remaining / n0) * 100 : 0;

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => setHalfLife(String(p.hl))}
            className="px-2 py-1 text-xs rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            {p.label} ({p.hl} {p.unit})
          </button>
        ))}
      </div>

      <div>
        <div className="field-label">Initial Quantity</div>
        <input type="number" className="field-input" value={initial} onChange={e => setInitial(e.target.value)} placeholder="100" />
      </div>
      <div>
        <div className="field-label">Half-Life</div>
        <input type="number" className="field-input" value={halfLife} onChange={e => setHalfLife(e.target.value)} placeholder="5730" />
      </div>
      <div>
        <div className="field-label">Elapsed Time (same unit as half-life)</div>
        <input type="number" className="field-input" value={elapsed} onChange={e => setElapsed(e.target.value)} placeholder="11460" />
      </div>

      {remaining > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#3b82f640", background: "#3b82f612" }}>
            <div className="result-label">Remaining Quantity</div>
            <div className="result-value text-3xl">{remaining.toFixed(4)}</div>
            <div className="result-sub">{pctRemaining.toFixed(2)}% of original</div>
          </div>
          <div className="result-box">
            <div className="result-label">Number of Half-Lives Elapsed</div>
            <div className="result-value">{halves.toFixed(2)}</div>
          </div>
          <div className="result-box">
            <div className="result-label">Decayed Amount</div>
            <div className="result-value">{(n0 - remaining).toFixed(4)} ({(100 - pctRemaining).toFixed(2)}%)</div>
          </div>
          <div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
              <div className="h-full rounded-full" style={{ width: `${pctRemaining}%`, background: "#3b82f6" }} />
            </div>
            <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              <span>0%</span><span>{pctRemaining.toFixed(1)}% remaining</span><span>100%</span>
            </div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
