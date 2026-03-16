"use client";
import { useState } from "react";

export default function DateDiffCalc() {
  const today = new Date().toISOString().split("T")[0];
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);

  const s = new Date(start), e = new Date(end);
  const valid = !isNaN(s.getTime()) && !isNaN(e.getTime());
  const diffMs = valid ? Math.abs(e.getTime() - s.getTime()) : 0;
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);
  const remDays = diffDays % 7;

  let months = 0, years = 0, mRemDays = 0;
  if (valid) {
    const [lo, hi] = e >= s ? [s, e] : [e, s];
    years = hi.getFullYear() - lo.getFullYear();
    months = hi.getMonth() - lo.getMonth();
    mRemDays = hi.getDate() - lo.getDate();
    if (mRemDays < 0) { months--; const prev = new Date(hi.getFullYear(), hi.getMonth(), 0); mRemDays += prev.getDate(); }
    if (months < 0) { years--; months += 12; }
  }

  const isNeg = valid && e < s;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Start Date</div>
          <input type="date" className="field-input" value={start} onChange={e=>setStart(e.target.value)} />
        </div>
        <div>
          <div className="field-label">End Date</div>
          <input type="date" className="field-input" value={end} onChange={e=>setEnd(e.target.value)} />
        </div>
      </div>

      <button className="primary-btn" onClick={()=>{ setStart(today); setEnd(today); }}>
        Reset to Today
      </button>

      {valid && (
        <>
          <div className="result-box">
            <div className="result-label">Difference {isNeg?"(past)":"(future)"}</div>
            <div className="result-value text-2xl">{diffDays.toLocaleString()} days</div>
            <div className="result-sub">{years}y {months}m {mRemDays}d</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              {label:"Weeks",value:`${diffWeeks} wk ${remDays} d`},
              {label:"Hours",value:(diffDays*24).toLocaleString()+" h"},
              {label:"Minutes",value:(diffDays*1440).toLocaleString()+" m"},
              {label:"Seconds",value:(diffDays*86400).toLocaleString()+" s"},
            ].map(item=>(
              <div key={item.label} className="result-box">
                <div className="result-label">{item.label}</div>
                <div className="result-value text-base">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl text-sm" style={{background:"var(--surface-2)",border:"1px solid var(--border)"}}>
            <div className="flex justify-between text-xs">
              <span style={{color:"var(--text-muted)"}}>{new Date(start).toDateString()}</span>
              <span style={{color:"var(--text-muted)"}}>{new Date(end).toDateString()}</span>
            </div>
            <div className="mt-2 h-2 rounded-full" style={{background:"var(--surface-3)"}}>
              <div className="h-full rounded-full" style={{width:"100%",background:"linear-gradient(90deg, var(--accent), #10b981)"}} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
