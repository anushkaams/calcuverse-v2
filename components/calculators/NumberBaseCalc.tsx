"use client";
import { useState } from "react";

type Base = "2" | "8" | "10" | "16";

export default function NumberBaseCalc() {
  const [value, setValue] = useState("255");
  const [from, setFrom] = useState<Base>("10");

  const bases: {id: Base; label: string; name: string; chars: string}[] = [
    {id:"2",label:"BIN",name:"Binary",chars:"0-1"},
    {id:"8",label:"OCT",name:"Octal",chars:"0-7"},
    {id:"10",label:"DEC",name:"Decimal",chars:"0-9"},
    {id:"16",label:"HEX",name:"Hexadecimal",chars:"0-F"},
  ];

  let decimal = NaN;
  try { decimal = parseInt(value, parseInt(from)); } catch { /**/ }

  const conversions = bases.map(b => ({
    ...b,
    result: !isNaN(decimal) && isFinite(decimal) && decimal >= 0
      ? decimal.toString(parseInt(b.id)).toUpperCase()
      : "—"
  }));

  return (
    <div className="space-y-4">
      <div>
        <div className="field-label">Input Base</div>
        <div className="tab-group">
          {bases.map(b=>(
            <button key={b.id} className={`tab-item ${from===b.id?"active":""}`} onClick={()=>setFrom(b.id)}>{b.label}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="field-label">Value ({bases.find(b=>b.id===from)?.name})</div>
        <input
          type="text"
          className="field-input font-mono uppercase tracking-widest"
          value={value}
          onChange={e=>setValue(e.target.value.toUpperCase())}
          placeholder={from==="16"?"FF":from==="2"?"11111111":"255"}
        />
      </div>

      {!isNaN(decimal) && isFinite(decimal) && (
        <div className="result-box flex items-center justify-between">
          <div className="result-label">Decimal value</div>
          <div className="result-value">{decimal.toLocaleString()}</div>
        </div>
      )}

      <div className="space-y-2">
        {conversions.filter(c=>c.id!==from).map(c=>(
          <div key={c.id} className="px-4 py-3 rounded-xl" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold mr-2" style={{color:"var(--accent)"}}>{c.label}</span>
                <span className="text-xs" style={{color:"var(--text-muted)"}}>{c.name}</span>
              </div>
              <button
                onClick={()=>{ setValue(c.result); setFrom(c.id); }}
                className="text-xs px-2 py-0.5 rounded" style={{background:"var(--surface-3)",color:"var(--text-muted)"}}>
                use ↗
              </button>
            </div>
            <div className="font-mono text-lg mt-1 break-all" style={{color:"var(--text-primary)"}}>{c.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
