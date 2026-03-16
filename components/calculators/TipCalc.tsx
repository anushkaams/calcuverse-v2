"use client";
import { useState } from "react";

export default function TipCalc() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(1);
  const [custom, setCustom] = useState(false);

  const billN = parseFloat(bill) || 0;
  const tip = billN * (tipPct / 100);
  const total = billN + tip;
  const perPerson = people > 0 ? total / people : 0;
  const tipPer = people > 0 ? tip / people : 0;

  const presets = [10, 15, 18, 20, 25];

  return (
    <div className="space-y-5">
      <div>
        <div className="field-label">Bill Amount</div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>$</span>
          <input type="number" className="field-input pl-7" value={bill} onChange={e => setBill(e.target.value)} placeholder="0.00" min="0" step="0.01" />
        </div>
      </div>

      <div>
        <div className="field-label">Tip %</div>
        <div className="flex gap-2 mb-2">
          {presets.map(p => (
            <button
              key={p}
              onClick={() => { setTipPct(p); setCustom(false); }}
              className={`flex-1 py-2 text-sm rounded-lg border font-medium transition-all ${!custom && tipPct === p ? "calc-btn-accent" : "calc-btn"}`}
            >
              {p}%
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range" min="0" max="50" value={tipPct}
            onChange={e => { setTipPct(Number(e.target.value)); setCustom(true); }}
            className="flex-1"
          />
          <span className="text-sm font-mono w-10 text-right" style={{ color: "var(--text-secondary)" }}>{tipPct}%</span>
        </div>
      </div>

      <div>
        <div className="field-label">Split between</div>
        <div className="flex items-center gap-3">
          <button className="calc-btn w-10 h-10 text-lg" onClick={() => setPeople(p => Math.max(1, p - 1))}>−</button>
          <div className="flex-1 text-center text-2xl font-mono" style={{ color: "var(--text-primary)" }}>{people}</div>
          <button className="calc-btn w-10 h-10 text-lg" onClick={() => setPeople(p => p + 1)}>+</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="result-box">
          <div className="result-label">Tip Amount</div>
          <div className="result-value">${tip.toFixed(2)}</div>
          {people > 1 && <div className="result-sub">${tipPer.toFixed(2)} / person</div>}
        </div>
        <div className="result-box">
          <div className="result-label">Total</div>
          <div className="result-value">${total.toFixed(2)}</div>
          {people > 1 && <div className="result-sub">${perPerson.toFixed(2)} / person</div>}
        </div>
      </div>
    </div>
  );
}
