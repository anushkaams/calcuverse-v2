"use client";
import { useState } from "react";

const UNITS = [
  { id: "mg", label: "Milligram", toKg: 1e-6 },
  { id: "g", label: "Gram", toKg: 0.001 },
  { id: "kg", label: "Kilogram", toKg: 1 },
  { id: "t", label: "Metric Ton", toKg: 1000 },
  { id: "oz", label: "Ounce", toKg: 0.0283495 },
  { id: "lb", label: "Pound", toKg: 0.453592 },
  { id: "st", label: "Stone", toKg: 6.35029 },
  { id: "ton", label: "US Ton", toKg: 907.185 },
];

export default function WeightConvCalc() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("kg");

  const fromUnit = UNITS.find(u=>u.id===from)!;
  const inKg = (parseFloat(value)||0) * fromUnit.toKg;

  return (
    <div className="space-y-4">
      <div>
        <div className="field-label">Value</div>
        <input type="number" className="field-input" value={value} onChange={e=>setValue(e.target.value)} placeholder="0" />
      </div>
      <div>
        <div className="field-label">From</div>
        <select className="field-select" value={from} onChange={e=>setFrom(e.target.value)}>
          {UNITS.map(u=><option key={u.id} value={u.id}>{u.label} ({u.id})</option>)}
        </select>
      </div>

      <div className="space-y-1.5">
        {UNITS.filter(u=>u.id!==from).map(u=>{
          const result = inKg / u.toKg;
          return (
            <div key={u.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
              <span className="text-sm" style={{color:"var(--text-secondary)"}}>{u.label}</span>
              <div className="text-right">
                <span className="font-mono text-sm" style={{color:"var(--text-primary)"}}>{result<0.0001||result>1e9?result.toExponential(4):parseFloat(result.toPrecision(8))}</span>
                <span className="text-xs ml-1" style={{color:"var(--text-muted)"}}>{u.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
