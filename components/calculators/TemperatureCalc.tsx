"use client";
import { useState } from "react";

export default function TemperatureCalc() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("C");

  const v = parseFloat(value);
  const units = ["C", "F", "K"];

  const toC = (val: number, unit: string) => {
    if (unit === "C") return val;
    if (unit === "F") return (val - 32) * 5/9;
    return val - 273.15;
  };

  const fromC = (c: number, unit: string) => {
    if (unit === "C") return c;
    if (unit === "F") return c * 9/5 + 32;
    return c + 273.15;
  };

  const celsius = isNaN(v) ? null : toC(v, from);

  const names: Record<string, string> = { C: "Celsius", F: "Fahrenheit", K: "Kelvin" };
  const symbols: Record<string, string> = { C: "°C", F: "°F", K: "K" };

  return (
    <div className="space-y-5">
      <div>
        <div className="field-label">From</div>
        <div className="tab-group mb-3">
          {units.map(u => (
            <button key={u} className={`tab-item ${from === u ? "active" : ""}`} onClick={() => setFrom(u)}>{u}</button>
          ))}
        </div>
        <input type="number" className="field-input" value={value} onChange={e => setValue(e.target.value)} placeholder={`Enter value in ${names[from]}`} />
      </div>

      <div className="space-y-2">
        {units.filter(u => u !== from).map(u => {
          const res = celsius !== null ? fromC(celsius, u) : null;
          return (
            <div key={u} className="result-box flex items-center justify-between">
              <div>
                <div className="result-label">{names[u]}</div>
                <div className="result-value">{res !== null ? res.toFixed(2) : "—"}</div>
              </div>
              <div className="text-3xl font-display" style={{ color: "var(--text-muted)", fontFamily: "var(--font-outfit)" }}>
                {symbols[u]}
              </div>
            </div>
          );
        })}
      </div>

      {celsius !== null && (
        <div className="p-4 rounded-xl text-sm space-y-1" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <div style={{ color: "var(--text-muted)" }} className="font-medium mb-2">All conversions</div>
          {units.map(u => (
            <div key={u} className="flex justify-between">
              <span style={{ color: "var(--text-secondary)" }}>{names[u]}</span>
              <span className="font-mono" style={{ color: "var(--text-primary)" }}>{fromC(celsius, u).toFixed(4)} {symbols[u]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
