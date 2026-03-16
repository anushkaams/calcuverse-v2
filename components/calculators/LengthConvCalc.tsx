"use client";
import { useState } from "react";

const UNITS = [
  { id: "mm", label: "Millimeter", toM: 0.001 },
  { id: "cm", label: "Centimeter", toM: 0.01 },
  { id: "m", label: "Meter", toM: 1 },
  { id: "km", label: "Kilometer", toM: 1000 },
  { id: "in", label: "Inch", toM: 0.0254 },
  { id: "ft", label: "Foot", toM: 0.3048 },
  { id: "yd", label: "Yard", toM: 0.9144 },
  { id: "mi", label: "Mile", toM: 1609.344 },
  { id: "nmi", label: "Nautical Mile", toM: 1852 },
];

export default function LengthConvCalc() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");

  const fromUnit = UNITS.find(u=>u.id===from)!;
  const inMeters = (parseFloat(value)||0) * fromUnit.toM;

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
          const result = inMeters / u.toM;
          return (
            <div key={u.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
              <span className="text-sm" style={{color:"var(--text-secondary)"}}>{u.label}</span>
              <div className="text-right">
                <span className="font-mono text-sm" style={{color:"var(--text-primary)"}}>{result < 0.0001 || result > 1e9 ? result.toExponential(4) : parseFloat(result.toPrecision(8))}</span>
                <span className="text-xs ml-1" style={{color:"var(--text-muted)"}}>{u.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
