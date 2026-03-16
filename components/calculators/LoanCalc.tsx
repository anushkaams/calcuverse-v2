"use client";
import { useState } from "react";

export default function LoanCalc() {
  const [amount, setAmount] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");

  const P = parseFloat(amount) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  const emi = r > 0 ? P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : P / n;
  const totalPay = emi * n;
  const totalInt = totalPay - P;

  return (
    <div className="space-y-4">
      {[
        { label: "Loan Amount ($)", value: amount, set: setAmount, prefix: "$" },
        { label: "Annual Interest Rate (%)", value: rate, set: setRate, suffix: "%" },
        { label: "Loan Term (years)", value: years, set: setYears, suffix: "yr" },
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

      <div className="result-box">
        <div className="result-label">Monthly Payment (EMI)</div>
        <div className="result-value text-2xl">${emi.toFixed(2)}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="result-box">
          <div className="result-label">Total Payment</div>
          <div className="result-value text-base">${(totalPay / 1000).toFixed(1)}k</div>
        </div>
        <div className="result-box">
          <div className="result-label">Total Interest</div>
          <div className="result-value text-base text-red-400">${(totalInt / 1000).toFixed(1)}k</div>
        </div>
      </div>

      {totalPay > 0 && (
        <div className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
          <div className="flex justify-between">
            <span>Principal</span><span style={{ color: "var(--text-secondary)" }}>{((P / totalPay) * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
            <div style={{ height: "100%", width: `${(P / totalPay) * 100}%`, background: "var(--accent)", borderRadius: "9999px" }} />
          </div>
        </div>
      )}
    </div>
  );
}
