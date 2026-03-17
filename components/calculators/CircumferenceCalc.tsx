"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is the formula for circumference?", answer: "Circumference = 2πr = πd, where r is the radius and d is the diameter. Pi (π) ≈ 3.14159." },
  { question: "What is the area of a circle?", answer: "Area = πr². If you know the diameter, use: Area = π(d/2)²." },
  { question: "What is the relationship between diameter and radius?", answer: "The diameter is always twice the radius (d = 2r). The radius is the distance from the center to the edge." },
  { question: "Where is circle calculation useful?", answer: "Circle calculations are used in engineering (pipes, wheels, gears), construction (columns, tanks), landscaping (circular areas), and everyday geometry." },
];

export default function CircumferenceCalc() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"radius" | "diameter" | "circumference" | "area">("radius");

  const val = parseFloat(input) || 0;

  let r = 0;
  if (mode === "radius") r = val;
  else if (mode === "diameter") r = val / 2;
  else if (mode === "circumference") r = val / (2 * Math.PI);
  else if (mode === "area") r = Math.sqrt(val / Math.PI);

  const circumference = 2 * Math.PI * r;
  const area = Math.PI * r * r;
  const diameter = 2 * r;

  return (
    <div className="space-y-6   py-6 px-4">
      <div>
        <div className="field-label">I know the...</div>
        <div className="tab-group">
          <button className={`tab-item ${mode === "radius" ? "active" : ""}`} onClick={() => setMode("radius")}>Radius</button>
          <button className={`tab-item ${mode === "diameter" ? "active" : ""}`} onClick={() => setMode("diameter")}>Diameter</button>
          <button className={`tab-item ${mode === "circumference" ? "active" : ""}`} onClick={() => setMode("circumference")}>Circumference</button>
          <button className={`tab-item ${mode === "area" ? "active" : ""}`} onClick={() => setMode("area")}>Area</button>
        </div>
      </div>

      <div>
        <div className="field-label">{mode.charAt(0).toUpperCase() + mode.slice(1)}</div>
        <input type="number" className="field-input" value={input} onChange={e => setInput(e.target.value)} placeholder="5" />
      </div>

      {r > 0 && (
        <div className="space-y-3">
          {[
            ["Radius", r, mode === "radius"],
            ["Diameter", diameter, mode === "diameter"],
            ["Circumference", circumference, mode === "circumference"],
            ["Area", area, mode === "area"],
          ].map(([label, value, active]) => (
            <div key={label as string} className="result-box flex justify-between items-center"
              style={active ? { borderColor: "#6366f140", background: "#6366f112" } : {}}>
              <span style={{ color: "var(--text-secondary)" }}>{label as string}</span>
              <span className="font-bold text-xl">{(value as number).toFixed(4)}</span>
            </div>
          ))}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
