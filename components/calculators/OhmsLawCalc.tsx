"use client";
import { useState } from "react";

type Solve = "V" | "I" | "R" | "P";

export default function OhmsLawCalc() {
  const [solve, setSolve] = useState<Solve>("V");
  const [v, setV] = useState(""); const [i, setI] = useState(""); const [r, setR] = useState(""); const [p, setP] = useState("");

  const vn = parseFloat(v), in_ = parseFloat(i), rn = parseFloat(r), pn = parseFloat(p);

  let result = NaN, unit = "", name = "";
  if (solve === "V") { result = !isNaN(in_) && !isNaN(rn) ? in_*rn : !isNaN(pn)&&!isNaN(in_) ? pn/in_ : NaN; unit="V"; name="Voltage"; }
  if (solve === "I") { result = !isNaN(vn)&&!isNaN(rn) ? vn/rn : !isNaN(pn)&&!isNaN(vn) ? pn/vn : NaN; unit="A"; name="Current"; }
  if (solve === "R") { result = !isNaN(vn)&&!isNaN(in_) ? vn/in_ : NaN; unit="Ω"; name="Resistance"; }
  if (solve === "P") { result = !isNaN(vn)&&!isNaN(in_) ? vn*in_ : !isNaN(vn)&&!isNaN(rn) ? vn*vn/rn : !isNaN(in_)&&!isNaN(rn) ? in_*in_*rn : NaN; unit="W"; name="Power"; }

  const fields: {id:Solve; label:string; placeholder:string; unit:string; value:string; set:(v:string)=>void}[] = [
    {id:"V",label:"Voltage (V)",placeholder:"volts",unit:"V",value:v,set:setV},
    {id:"I",label:"Current (I)",placeholder:"amps",unit:"A",value:i,set:setI},
    {id:"R",label:"Resistance (R)",placeholder:"ohms",unit:"Ω",value:r,set:setR},
    {id:"P",label:"Power (P)",placeholder:"watts",unit:"W",value:p,set:setP},
  ];

  return (
    <div className="space-y-4">
      <div>
        <div className="field-label">Solve for</div>
        <div className="tab-group">
          {(["V","I","R","P"] as Solve[]).map(s => (
            <button key={s} className={`tab-item ${solve===s?"active":""}`} onClick={()=>setSolve(s)}>{s}</button>
          ))}
        </div>
      </div>

      {fields.filter(f => f.id !== solve).map(f => (
        <div key={f.id}>
          <div className="field-label">{f.label}</div>
          <div className="relative">
            <input type="number" className="field-input pr-10" value={f.value} onChange={e=>f.set(e.target.value)} placeholder={f.placeholder} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-mono" style={{color:"var(--text-muted)"}}>{f.unit}</span>
          </div>
        </div>
      ))}

      <div className="result-box">
        <div className="result-label">{name}</div>
        <div className="result-value text-3xl">
          {!isNaN(result) && isFinite(result) ? `${parseFloat(result.toPrecision(6))} ${unit}` : "—"}
        </div>
      </div>

      <div className="p-4 rounded-xl text-sm space-y-1.5" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
        <div className="font-medium mb-2" style={{color:"var(--text-secondary)"}}>Ohm's Law formulas</div>
        {["V = I × R","I = V / R","R = V / I","P = V × I"].map(f=>(
          <div key={f} className="font-mono text-xs" style={{color:"var(--text-muted)"}}>{f}</div>
        ))}
      </div>
    </div>
  );
}
