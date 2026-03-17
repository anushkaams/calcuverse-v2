"use client";
import { useState } from "react";

type Solve = "density" | "mass" | "volume";

export default function DensityCalc() {
  const [solve, setSolve] = useState<Solve>("density");
  const [mass, setMass] = useState("");
  const [volume, setVolume] = useState("");
  const [density, setDensity] = useState("");

  const m = parseFloat(mass), v = parseFloat(volume), d = parseFloat(density);
  let result = NaN, unit = "";
  if (solve === "density" && !isNaN(m) && !isNaN(v)) { result = m/v; unit="g/cm³"; }
  if (solve === "mass" && !isNaN(d) && !isNaN(v)) { result = d*v; unit="g"; }
  if (solve === "volume" && !isNaN(m) && !isNaN(d)) { result = m/d; unit="cm³"; }

  return (
    <div className="space-y-4">
      <div>
        <div className="field-label">Solve for</div>
        <div className="tab-group">
          {(["density","mass","volume"] as Solve[]).map(s=>(
            <button key={s} className={`tab-item capitalize ${solve===s?"active":""}`} onClick={()=>setSolve(s)}>{s}</button>
          ))}
        </div>
      </div>

      {solve !== "mass" && (
        <div>
          <div className="field-label">Mass (g)</div>
          <div className="relative">
            <input type="number" className="field-input pr-8" value={mass} onChange={e=>setMass(e.target.value)} placeholder="grams" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{color:"var(--text-muted)"}}>g</span>
          </div>
        </div>
      )}
      {solve !== "volume" && (
        <div>
          <div className="field-label">Volume (cm³)</div>
          <div className="relative">
            <input type="number" className="field-input pr-14" value={volume} onChange={e=>setVolume(e.target.value)} placeholder="cm³" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{color:"var(--text-muted)"}}>cm³</span>
          </div>
        </div>
      )}
      {solve !== "density" && (
        <div>
          <div className="field-label">Density (g/cm³)</div>
          <div className="relative">
            <input type="number" className="field-input pr-16" value={density} onChange={e=>setDensity(e.target.value)} placeholder="g/cm³" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{color:"var(--text-muted)"}}>g/cm³</span>
          </div>
        </div>
      )}

      <div className="result-box">
        <div className="result-label capitalize">{solve}</div>
        <div className="result-value text-3xl">
          {!isNaN(result) && isFinite(result) ? `${parseFloat(result.toPrecision(6))} ${unit}` : "-"}
        </div>
      </div>

      <div className="p-4 rounded-xl text-center" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
        <div className="font-mono text-2xl" style={{color:"var(--text-secondary)"}}>
          D = <span style={{color:"var(--accent)"}}>M</span> / <span style={{color:"#10b981"}}>V</span>
        </div>
      </div>
    </div>
  );
}
