"use client";
import { useState } from "react";

export default function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState("12");
  const [monthly, setMonthly] = useState("0");

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(years) || 0;
  const n = parseFloat(freq) || 12;
  const m = parseFloat(monthly) || 0;

  const futureValue = P * Math.pow(1 + r / n, n * t) + m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
  const totalContrib = P + m * n * t;
  const interest = futureValue - totalContrib;

  return (
    <div className="space-y-4">
      {[
        { label: "Principal ($)", value: principal, set: setPrincipal, prefix: "$" },
        { label: "Annual Rate (%)", value: rate, set: setRate, suffix: "%" },
        { label: "Duration (years)", value: years, set: setYears, suffix: "yr" },
        { label: "Monthly Contribution ($)", value: monthly, set: setMonthly, prefix: "$" },
      ].map(({ label, value, set, prefix, suffix }) => (
        <div key={label}>
          <div className="field-label">{label}</div>
          <div className="relative">
            {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>{prefix}</span>}
            <input type="number" className={`field-input ${prefix ? "pl-7" : ""} ${suffix ? "pr-10" : ""}`} value={value} onChange={e => set(e.target.value)} />
            {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>{suffix}</span>}
          </div>
        </div>
      ))}

      <div>
        <div className="field-label">Compounding Frequency</div>
        <select className="field-select" value={freq} onChange={e => setFreq(e.target.value)}>
          <option value="1">Annually</option>
          <option value="2">Semi-annually</option>
          <option value="4">Quarterly</option>
          <option value="12">Monthly</option>
          <option value="365">Daily</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="result-box">
          <div className="result-label">Final Value</div>
          <div className="result-value text-sm">${futureValue >= 1e6 ? (futureValue / 1e6).toFixed(2) + "M" : futureValue.toFixed(0)}</div>
        </div>
        <div className="result-box">
          <div className="result-label">Invested</div>
          <div className="result-value text-sm">${totalContrib >= 1e6 ? (totalContrib / 1e6).toFixed(2) + "M" : totalContrib.toFixed(0)}</div>
        </div>
        <div className="result-box">
          <div className="result-label">Interest</div>
          <div className="result-value text-sm text-green-400">${interest >= 1e6 ? (interest / 1e6).toFixed(2) + "M" : interest.toFixed(0)}</div>
        </div>
      </div>

      {/* Simple bar visualization */}
      {futureValue > 0 && (
        <div className="p-4 rounded-xl border space-y-2 text-xs" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
          <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
            <span>Principal</span><span>Interest</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
            <div className="h-full rounded-full flex">
              <div style={{ width: `${Math.min(100, (totalContrib / futureValue) * 100)}%`, background: "var(--accent)", transition: "width 0.5s" }} />
              <div style={{ flex: 1, background: "#10b981" }} />
            </div>
          </div>
          <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
            <span>{((totalContrib / futureValue) * 100).toFixed(0)}%</span>
            <span>{((interest / futureValue) * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
