"use client";
import { useState } from "react";

type Mode = "of" | "change" | "is";

export default function PercentageCalc() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const av = parseFloat(a) || 0;
  const bv = parseFloat(b) || 0;

  let result = 0, label = "", formula = "";
  if (mode === "of") {
    result = (av / 100) * bv;
    label = "Result"; formula = `${av}% of ${bv}`;
  } else if (mode === "change") {
    result = ((bv - av) / Math.abs(av)) * 100;
    label = bv >= av ? "% Increase" : "% Decrease"; formula = `${av} → ${bv}`;
  } else {
    result = (av / bv) * 100;
    label = "Percentage"; formula = `${av} is what % of ${bv}`;
  }

  const modes: { id: Mode; label: string }[] = [
    { id: "of", label: "X% of Y" },
    { id: "change", label: "% Change" },
    { id: "is", label: "X is ?% of Y" },
  ];

  return (
    <div className="space-y-5">
      <div className="tab-group">
        {modes.map(m => (
          <button key={m.id} className={`tab-item text-xs ${mode === m.id ? "active" : ""}`} onClick={() => setMode(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">{mode === "of" ? "Percentage (%)" : mode === "change" ? "From" : "Value (X)"}</div>
          <input type="number" className="field-input" value={a} onChange={e => setA(e.target.value)} placeholder="0" />
        </div>
        <div>
          <div className="field-label">{mode === "of" ? "Of Value" : mode === "change" ? "To" : "Of Total (Y)"}</div>
          <input type="number" className="field-input" value={b} onChange={e => setB(e.target.value)} placeholder="0" />
        </div>
      </div>

      <div className="result-box">
        <div className="result-label">{label}</div>
        <div className="result-value text-3xl">
          {isNaN(result) || !isFinite(result) ? "—" : mode === "of" ? result.toFixed(2) : result.toFixed(2) + "%"}
        </div>
        <div className="result-sub">{formula}</div>
      </div>

      <div className="p-4 rounded-xl text-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
        <div className="font-medium mb-3" style={{ color: "var(--text-secondary)" }}>Quick reference</div>
        <div className="space-y-1.5">
          {[10, 15, 20, 25, 50].map(pct => (
            <div key={pct} className="flex justify-between text-xs">
              <span style={{ color: "var(--text-muted)" }}>{pct}% of {bv || "Y"}</span>
              <span className="font-mono" style={{ color: "var(--text-primary)" }}>{((pct / 100) * bv).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
