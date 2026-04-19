"use client";
import { useState } from "react";

export default function DiscountCalc() {
  const [original, setOriginal] = useState("");
  const [discount, setDiscount] = useState("");

  const orig = parseFloat(original) || 0;
  const disc = parseFloat(discount) || 0;
  const saved = orig * (disc / 100);
  const final = orig - saved;

  return (
    <div className="space-y-5">
      <div>
        <div className="field-label">Original Price</div>
        <div className="relative">
          <span className="field-prefix-symbol">$</span>
          <input type="number" className="field-input field-input--prefix" value={original} onChange={e => setOriginal(e.target.value)} placeholder="100.00" />
        </div>
      </div>
      <div>
        <div className="field-label">Discount</div>
        <div className="relative">
          <input type="number" className="field-input pr-8" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="20" min="0" max="100" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>%</span>
        </div>
        <input type="range" min="0" max="100" value={disc} onChange={e => setDiscount(e.target.value)} className="mt-2 w-full" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="result-box col-span-1">
          <div className="result-label">You Save</div>
          <div className="result-value text-green-400">${saved.toFixed(2)}</div>
          <div className="result-sub">{disc}% off</div>
        </div>
        <div className="result-box col-span-2">
          <div className="result-label">Final Price</div>
          <div className="result-value">${final.toFixed(2)}</div>
          <div className="result-sub">was ${orig.toFixed(2)}</div>
        </div>
      </div>

      <div className="p-4 rounded-xl border text-sm" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
        <div className="font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Quick discounts</div>
        <div className="grid grid-cols-4 gap-2">
          {[10, 20, 25, 50].map(d => (
            <button key={d} onClick={() => setDiscount(String(d))} className="py-1.5 text-sm rounded-lg calc-btn">{d}%</button>
          ))}
        </div>
      </div>
    </div>
  );
}
