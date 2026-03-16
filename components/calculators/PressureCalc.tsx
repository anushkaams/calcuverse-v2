"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is pressure?", answer: "Pressure is force per unit area. It is measured in many units: Pascal (Pa), bar, PSI, atm, mmHg, and more, all interconvertible." },
  { question: "What is standard atmospheric pressure?", answer: "Standard atmosphere (1 atm) = 101,325 Pa = 1013.25 mbar = 14.696 PSI = 760 mmHg = 29.92 inHg." },
  { question: "What is the difference between absolute and gauge pressure?", answer: "Absolute pressure is measured from perfect vacuum. Gauge pressure is measured relative to atmospheric pressure. Tire pressure is usually gauge." },
  { question: "What pressure unit is used for blood pressure?", answer: "Blood pressure is measured in mmHg (millimetres of mercury). Normal is around 120/80 mmHg (systolic/diastolic)." },
];

const UNITS: Record<string, number> = {
  "Pascal (Pa)": 1,
  "Kilopascal (kPa)": 1000,
  "Megapascal (MPa)": 1_000_000,
  "Bar": 100_000,
  "Millibar (mbar)": 100,
  "PSI": 6894.757,
  "Atmosphere (atm)": 101_325,
  "mmHg (Torr)": 133.322,
  "inHg": 3386.39,
  "cmH₂O": 98.0665,
};

export default function PressureCalc() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("Atmosphere (atm)");

  const val = parseFloat(value) || 0;
  const basePa = val * (UNITS[from] ?? 1);
  const unitKeys = Object.keys(UNITS);

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Value</div>
        <input type="number" className="field-input" value={value} onChange={e => setValue(e.target.value)} placeholder="1" />
      </div>
      <div>
        <div className="field-label">From Unit</div>
        <select className="field-input" value={from} onChange={e => setFrom(e.target.value)}>
          {unitKeys.map(u => <option key={u}>{u}</option>)}
        </select>
      </div>

      {val > 0 && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {unitKeys.filter(u => u !== from).map(u => (
            <div key={u} className="flex justify-between px-4 py-2.5 border-b last:border-0 text-sm" style={{ borderColor: "var(--border)" }}>
              <span style={{ color: "var(--text-secondary)" }}>{u}</span>
              <span className="font-mono font-bold">
                {(basePa / UNITS[u]).toLocaleString("en", { maximumSignificantDigits: 6 })}
              </span>
            </div>
          ))}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
