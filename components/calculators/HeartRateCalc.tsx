"use client";
import { useState } from "react";

const ZONES = [
  { name: "Zone 1 — Rest", pct: [50, 60], color: "#3b82f6", desc: "Recovery, warm-up" },
  { name: "Zone 2 — Fat Burn", pct: [60, 70], color: "#10b981", desc: "Aerobic base, endurance" },
  { name: "Zone 3 — Aerobic", pct: [70, 80], color: "#f59e0b", desc: "Cardiovascular fitness" },
  { name: "Zone 4 — Anaerobic", pct: [80, 90], color: "#f97316", desc: "Speed, performance" },
  { name: "Zone 5 — Max", pct: [90, 100], color: "#ef4444", desc: "Peak power, short bursts" },
];

export default function HeartRateCalc() {
  const [age, setAge] = useState("30");
  const [method, setMethod] = useState<"max"|"karvonen">("max");
  const [rhr, setRhr] = useState("60");

  const a = parseInt(age)||30;
  const maxHR = 220 - a;
  const rhrN = parseInt(rhr)||60;
  const hrr = maxHR - rhrN; // heart rate reserve

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Age</div>
          <input type="number" className="field-input" value={age} onChange={e=>setAge(e.target.value)} placeholder="30" min="1" max="120" />
        </div>
        <div>
          <div className="field-label">Method</div>
          <div className="tab-group">
            <button className={`tab-item text-xs ${method==="max"?"active":""}`} onClick={()=>setMethod("max")}>%Max HR</button>
            <button className={`tab-item text-xs ${method==="karvonen"?"active":""}`} onClick={()=>setMethod("karvonen")}>Karvonen</button>
          </div>
        </div>
      </div>

      {method==="karvonen" && (
        <div>
          <div className="field-label">Resting Heart Rate (bpm)</div>
          <input type="number" className="field-input" value={rhr} onChange={e=>setRhr(e.target.value)} placeholder="60" />
        </div>
      )}

      <div className="result-box flex items-center justify-between">
        <div>
          <div className="result-label">Max Heart Rate (est.)</div>
          <div className="result-value text-2xl">{maxHR} bpm</div>
        </div>
        <div className="text-3xl">❤️</div>
      </div>

      <div className="space-y-2">
        {ZONES.map(z=>{
          const lo = method==="max"
            ? Math.round(maxHR * z.pct[0]/100)
            : Math.round(rhrN + hrr * z.pct[0]/100);
          const hi = method==="max"
            ? Math.round(maxHR * z.pct[1]/100)
            : Math.round(rhrN + hrr * z.pct[1]/100);
          return (
            <div key={z.name} className="flex items-center gap-3 p-3 rounded-xl" style={{background:`${z.color}12`,border:`1px solid ${z.color}30`}}>
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{background:z.color}} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium" style={{color:z.color}}>{z.name}</div>
                <div className="text-xs" style={{color:"var(--text-muted)"}}>{z.desc}</div>
              </div>
              <div className="font-mono text-sm font-semibold" style={{color:"var(--text-primary)"}}>{lo}–{hi}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
