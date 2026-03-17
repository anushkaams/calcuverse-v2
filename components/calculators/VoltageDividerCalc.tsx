"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is a voltage divider?", answer: "A voltage divider uses two resistors in series to produce an output voltage that is a fraction of the input. Vout = Vin × R2 / (R1 + R2)." },
  { question: "Where are voltage dividers used?", answer: "Voltage dividers are used to set reference voltages, interface sensors with microcontrollers, level-shift signals, and create analog inputs." },
  { question: "Why can't I power a load directly with a voltage divider?", answer: "Voltage dividers are for low-current signal uses only. Adding a load changes the resistance ratio and drops the output voltage - use a voltage regulator instead." },
  { question: "What happens if R2 is much larger than R1?", answer: "Vout approaches Vin. If R1 is much larger than R2, Vout approaches 0. The ratio R2/(R1+R2) determines the output fraction." },
];

export default function VoltageDividerCalc() {
  const [vin, setVin] = useState("5");
  const [r1, setR1] = useState("10000");
  const [mode, setMode] = useState<"find_vout" | "find_r2">("find_vout");
  const [r2, setR2] = useState("10000");
  const [targetVout, setTargetVout] = useState("2.5");

  const vinV = parseFloat(vin) || 0;
  const r1V = parseFloat(r1) || 0;
  const r2V = parseFloat(r2) || 0;
  const targetV = parseFloat(targetVout) || 0;

  const vout = vinV > 0 && (r1V + r2V) > 0 ? vinV * r2V / (r1V + r2V) : 0;
  const r2Calc = vinV > targetV && r1V > 0 ? r1V * targetV / (vinV - targetV) : 0;
  const current = vinV > 0 ? vinV / (r1V + r2V) * 1000 : 0; // mA

  const fmt = (r: number) => r >= 1_000_000 ? `${(r / 1_000_000).toFixed(3)}MΩ` : r >= 1000 ? `${(r / 1000).toFixed(3)}kΩ` : `${r.toFixed(1)}Ω`;

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "find_vout" ? "active" : ""}`} onClick={() => setMode("find_vout")}>Find Vout</button>
        <button className={`tab-item ${mode === "find_r2" ? "active" : ""}`} onClick={() => setMode("find_r2")}>Find R2</button>
      </div>

      <div>
        <div className="field-label">Input Voltage Vin (V)</div>
        <div className="flex gap-2 flex-wrap mb-2">
          {["3.3","5","9","12","24"].map(v => (
            <button key={v} onClick={() => setVin(v)} className="px-2 py-1 text-xs rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>{v}V</button>
          ))}
        </div>
        <input type="number" className="field-input" value={vin} onChange={e => setVin(e.target.value)} />
      </div>

      <div>
        <div className="field-label">R1 (Ω)</div>
        <input type="number" className="field-input" value={r1} onChange={e => setR1(e.target.value)} placeholder="10000" />
      </div>

      {mode === "find_vout" ? (
        <div>
          <div className="field-label">R2 (Ω)</div>
          <input type="number" className="field-input" value={r2} onChange={e => setR2(e.target.value)} placeholder="10000" />
        </div>
      ) : (
        <div>
          <div className="field-label">Target Vout (V)</div>
          <input type="number" className="field-input" value={targetVout} onChange={e => setTargetVout(e.target.value)} placeholder="2.5" />
        </div>
      )}

      {vinV > 0 && (
        <div className="space-y-3">
          {mode === "find_vout" && vout > 0 && (
            <div className="result-box" style={{ borderColor: "#6366f140", background: "#6366f112" }}>
              <div className="result-label">Output Voltage (Vout)</div>
              <div className="result-value text-3xl">{vout.toFixed(4)} V</div>
              <div className="result-sub">{((vout / vinV) * 100).toFixed(1)}% of Vin</div>
            </div>
          )}
          {mode === "find_r2" && r2Calc > 0 && (
            <div className="result-box" style={{ borderColor: "#6366f140", background: "#6366f112" }}>
              <div className="result-label">Required R2</div>
              <div className="result-value text-3xl">{fmt(r2Calc)}</div>
            </div>
          )}
          <div className="result-box">
            <div className="result-label">Current through divider</div>
            <div className="result-value">{current.toFixed(3)} mA</div>
          </div>
          <div className="result-box">
            <div className="result-label">R1 + R2 Total</div>
            <div className="result-value">{fmt(mode === "find_vout" ? r1V + r2V : r1V + r2Calc)}</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
