"use client";
import { useState } from "react";

const UNITS = [
  { id: "mm2", label: "Sq. Millimeter", toM2: 1e-6 },
  { id: "cm2", label: "Sq. Centimeter", toM2: 1e-4 },
  { id: "m2", label: "Sq. Meter", toM2: 1 },
  { id: "km2", label: "Sq. Kilometer", toM2: 1e6 },
  { id: "ha", label: "Hectare", toM2: 10000 },
  { id: "ac", label: "Acre", toM2: 4046.86 },
  { id: "in2", label: "Sq. Inch", toM2: 0.00064516 },
  { id: "ft2", label: "Sq. Foot", toM2: 0.092903 },
  { id: "yd2", label: "Sq. Yard", toM2: 0.836127 },
  { id: "mi2", label: "Sq. Mile", toM2: 2.59e6 },
];

export default function AreaConvCalc() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m2");

  const fromUnit = UNITS.find(u=>u.id===from)!;
  const inM2 = (parseFloat(value)||0) * fromUnit.toM2;

  return (
    <div className="space-y-4">
      <div>
        <div className="field-label">Value</div>
        <input type="number" className="field-input" value={value} onChange={e=>setValue(e.target.value)} placeholder="0" />
      </div>
      <div>
        <div className="field-label">From</div>
        <select className="field-select" value={from} onChange={e=>setFrom(e.target.value)}>
          {UNITS.map(u=><option key={u.id} value={u.id}>{u.label}</option>)}
        </select>
      </div>
      <div className="space-y-1.5">
        {UNITS.filter(u=>u.id!==from).map(u=>{
          const result = inM2 / u.toM2;
          return (
            <div key={u.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
              <span className="text-sm" style={{color:"var(--text-secondary)"}}>{u.label}</span>
              <span className="font-mono text-sm" style={{color:"var(--text-primary)"}}>{result<1e-4||result>1e10?result.toExponential(4):parseFloat(result.toPrecision(6))}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
