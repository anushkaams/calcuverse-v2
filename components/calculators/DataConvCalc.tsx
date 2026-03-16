"use client";
import { useState } from "react";

const UNITS = [
  { id: "bit", label: "Bit", toBits: 1 },
  { id: "B", label: "Byte", toBits: 8 },
  { id: "KB", label: "Kilobyte", toBits: 8*1024 },
  { id: "MB", label: "Megabyte", toBits: 8*1024**2 },
  { id: "GB", label: "Gigabyte", toBits: 8*1024**3 },
  { id: "TB", label: "Terabyte", toBits: 8*1024**4 },
  { id: "PB", label: "Petabyte", toBits: 8*1024**5 },
  { id: "Kib", label: "Kibibyte (KiB)", toBits: 8*1000 },
  { id: "Mib", label: "Mebibyte (MiB)", toBits: 8*1000**2 },
  { id: "Gib", label: "Gibibyte (GiB)", toBits: 8*1000**3 },
];

export default function DataConvCalc() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("GB");

  const fromUnit = UNITS.find(u=>u.id===from)!;
  const inBits = (parseFloat(value)||0) * fromUnit.toBits;

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
          const result = inBits / u.toBits;
          return (
            <div key={u.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
              <span className="text-sm" style={{color:"var(--text-secondary)"}}>{u.label}</span>
              <div className="text-right">
                <span className="font-mono text-sm" style={{color:"var(--text-primary)"}}>{result<1e-4||result>1e12?result.toExponential(4):parseFloat(result.toPrecision(8))}</span>
                <span className="text-xs ml-1.5" style={{color:"var(--text-muted)"}}>{u.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
