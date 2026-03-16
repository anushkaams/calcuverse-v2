"use client";
import { useState } from "react";

function gcd(a: number, b: number): number { return b === 0 ? Math.abs(a) : gcd(b, a % b); }
function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [n, 0];
  const g = gcd(Math.abs(n), Math.abs(d));
  return [n / g, d / g];
}

type Op = "+" | "−" | "×" | "÷";

export default function FractionCalc() {
  const [n1, setN1] = useState("1"); const [d1, setD1] = useState("2");
  const [n2, setN2] = useState("1"); const [d2, setD2] = useState("3");
  const [op, setOp] = useState<Op>("+");

  const a = parseInt(n1) || 0, b = parseInt(d1) || 1;
  const c = parseInt(n2) || 0, d = parseInt(d2) || 1;

  let rn = 0, rd = 1;
  if (op === "+") { rn = a * d + c * b; rd = b * d; }
  if (op === "−") { rn = a * d - c * b; rd = b * d; }
  if (op === "×") { rn = a * c; rd = b * d; }
  if (op === "÷") { rn = a * d; rd = b * c; }

  const [sn, sd] = simplify(rn, rd);
  const isNeg = sd < 0;
  const displayN = isNeg ? -sn : sn;
  const displayD = isNeg ? -sd : sd;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1 flex-1">
          <input type="number" className="field-input text-center" value={n1} onChange={e => setN1(e.target.value)} />
          <div className="w-full h-px" style={{ background: "var(--border)" }} />
          <input type="number" className="field-input text-center" value={d1} onChange={e => setD1(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          {(["+", "−", "×", "÷"] as Op[]).map(o => (
            <button key={o} onClick={() => setOp(o)}
              className={`calc-btn w-10 h-10 text-lg ${op === o ? "calc-btn-accent" : ""}`}>{o}</button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 flex-1">
          <input type="number" className="field-input text-center" value={n2} onChange={e => setN2(e.target.value)} />
          <div className="w-full h-px" style={{ background: "var(--border)" }} />
          <input type="number" className="field-input text-center" value={d2} onChange={e => setD2(e.target.value)} />
        </div>
      </div>

      <div className="result-box text-center">
        <div className="result-label text-center mb-2">Result</div>
        <div className="flex flex-col items-center gap-1">
          <div className="font-mono text-2xl" style={{ color: "var(--text-primary)" }}>{displayN}</div>
          {displayD !== 1 && displayD !== 0 && (
            <>
              <div className="w-12 h-0.5" style={{ background: "var(--accent)" }} />
              <div className="font-mono text-2xl" style={{ color: "var(--text-primary)" }}>{displayD}</div>
            </>
          )}
        </div>
        <div className="result-sub text-center mt-2">
          ≈ {displayD !== 0 ? (displayN / displayD).toFixed(6) : "undefined"}
        </div>
      </div>

      <div className="p-3 rounded-xl text-xs" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
        <div className="flex justify-between">
          <span style={{ color: "var(--text-muted)" }}>Unsimplified:</span>
          <span className="font-mono" style={{ color: "var(--text-secondary)" }}>{rn}/{rd}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span style={{ color: "var(--text-muted)" }}>Simplified:</span>
          <span className="font-mono" style={{ color: "var(--text-secondary)" }}>{displayN}/{displayD}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span style={{ color: "var(--text-muted)" }}>Decimal:</span>
          <span className="font-mono" style={{ color: "var(--text-secondary)" }}>
            {displayD !== 0 ? (displayN / displayD).toFixed(8) : "undefined"}
          </span>
        </div>
      </div>
    </div>
  );
}
