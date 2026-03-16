"use client";
import { useState } from "react";

type Solve = "ke" | "mass" | "velocity";

export default function KineticEnergyCalc() {
  const [solve, setSolve] = useState<Solve>("ke");
  const [mass, setMass] = useState("");
  const [velocity, setVelocity] = useState("");
  const [ke, setKe] = useState("");

  const m = parseFloat(mass), v = parseFloat(velocity), k = parseFloat(ke);
  let result = NaN, unit = "", label = "";
  if (solve === "ke" && !isNaN(m) && !isNaN(v)) { result = 0.5*m*v*v; unit="J"; label="Kinetic Energy"; }
  if (solve === "mass" && !isNaN(k) && !isNaN(v)) { result = 2*k/(v*v); unit="kg"; label="Mass"; }
  if (solve === "velocity" && !isNaN(k) && !isNaN(m)) { result = Math.sqrt(2*k/m); unit="m/s"; label="Velocity"; }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl text-center" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
        <div className="text-xl font-mono" style={{color:"var(--text-secondary)"}}>
          KE = ½ × <span style={{color:"var(--accent)"}}>m</span> × <span style={{color:"#10b981"}}>v</span>²
        </div>
      </div>

      <div>
        <div className="field-label">Solve for</div>
        <div className="tab-group">
          <button className={`tab-item ${solve==="ke"?"active":""}`} onClick={()=>setSolve("ke")}>KE (J)</button>
          <button className={`tab-item ${solve==="mass"?"active":""}`} onClick={()=>setSolve("mass")}>Mass (kg)</button>
          <button className={`tab-item ${solve==="velocity"?"active":""}`} onClick={()=>setSolve("velocity")}>Velocity (m/s)</button>
        </div>
      </div>

      {solve !== "ke" && (
        <div>
          <div className="field-label">Kinetic Energy (J)</div>
          <div className="relative">
            <input type="number" className="field-input pr-8" value={ke} onChange={e=>setKe(e.target.value)} placeholder="joules" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{color:"var(--text-muted)"}}>J</span>
          </div>
        </div>
      )}
      {solve !== "mass" && (
        <div>
          <div className="field-label">Mass (kg)</div>
          <div className="relative">
            <input type="number" className="field-input pr-10" value={mass} onChange={e=>setMass(e.target.value)} placeholder="kg" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{color:"var(--text-muted)"}}>kg</span>
          </div>
        </div>
      )}
      {solve !== "velocity" && (
        <div>
          <div className="field-label">Velocity (m/s)</div>
          <div className="relative">
            <input type="number" className="field-input pr-12" value={velocity} onChange={e=>setVelocity(e.target.value)} placeholder="m/s" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{color:"var(--text-muted)"}}>m/s</span>
          </div>
        </div>
      )}

      <div className="result-box">
        <div className="result-label">{label || "Result"}</div>
        <div className="result-value text-3xl">
          {!isNaN(result) && isFinite(result) ? `${parseFloat(result.toPrecision(6))} ${unit}` : "—"}
        </div>
      </div>
    </div>
  );
}
