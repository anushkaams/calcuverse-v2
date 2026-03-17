"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "Why do I need to know my pool volume?", answer: "Pool volume is needed to calculate the correct amount of chemicals (chlorine, pH adjusters, algaecide) required to maintain safe, balanced water." },
  { question: "How much chlorine does a pool need?", answer: "Pools typically need 1–3 ppm of free chlorine. The amount of chlorine product needed depends on volume and your specific product's concentration." },
  { question: "How often should I test pool water?", answer: "Test pH and chlorine at least 2–3 times per week in summer. Test alkalinity, calcium hardness, and cyanuric acid weekly." },
  { question: "How do I calculate a pool with a deep and shallow end?", answer: "Use the average depth: (shallow depth + deep depth) / 2. Multiply that by length × width for a rectangular pool." },
];

export default function PoolVolumeCalc() {
  const [shape, setShape] = useState<"rect" | "oval" | "round" | "irregular">("rect");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [shallowDepth, setShallowDepth] = useState("");
  const [deepDepth, setDeepDepth] = useState("");
  const [diameter, setDiameter] = useState("");
  const [unit, setUnit] = useState<"m" | "ft">("m");

  const avgDepth = shallowDepth && deepDepth
    ? (parseFloat(shallowDepth) + parseFloat(deepDepth)) / 2
    : parseFloat(depth) || 0;

  let volumeM3 = 0;
  const FT3_TO_M3 = 0.0283168;

  if (shape === "rect") {
    const v = (parseFloat(length) || 0) * (parseFloat(width) || 0) * avgDepth;
    volumeM3 = unit === "m" ? v : v * FT3_TO_M3;
  } else if (shape === "oval") {
    const v = (parseFloat(length) || 0) * (parseFloat(width) || 0) * avgDepth * 0.89;
    volumeM3 = unit === "m" ? v : v * FT3_TO_M3;
  } else if (shape === "round") {
    const r = (parseFloat(diameter) || 0) / 2;
    const v = Math.PI * r * r * avgDepth;
    volumeM3 = unit === "m" ? v : v * FT3_TO_M3;
  } else {
    const v = (parseFloat(length) || 0) * (parseFloat(width) || 0) * avgDepth * 0.85;
    volumeM3 = unit === "m" ? v : v * FT3_TO_M3;
  }

  const litres = volumeM3 * 1000;
  const gallons = litres * 0.264172;

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${shape === "rect" ? "active" : ""}`} onClick={() => setShape("rect")}>Rectangle</button>
        <button className={`tab-item ${shape === "oval" ? "active" : ""}`} onClick={() => setShape("oval")}>Oval</button>
        <button className={`tab-item ${shape === "round" ? "active" : ""}`} onClick={() => setShape("round")}>Round</button>
        <button className={`tab-item ${shape === "irregular" ? "active" : ""}`} onClick={() => setShape("irregular")}>Irregular</button>
      </div>
      <div className="tab-group">
        <button className={`tab-item ${unit === "m" ? "active" : ""}`} onClick={() => setUnit("m")}>Metres</button>
        <button className={`tab-item ${unit === "ft" ? "active" : ""}`} onClick={() => setUnit("ft")}>Feet</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shape !== "round" && (
          <><div><div className="field-label">Length ({unit})</div><input type="number" className="field-input" value={length} onChange={e => setLength(e.target.value)} placeholder="10" /></div>
          <div><div className="field-label">Width ({unit})</div><input type="number" className="field-input" value={width} onChange={e => setWidth(e.target.value)} placeholder="5" /></div></>
        )}
        {shape === "round" && (
          <div className="col-span-2"><div className="field-label">Diameter ({unit})</div><input type="number" className="field-input" value={diameter} onChange={e => setDiameter(e.target.value)} placeholder="6" /></div>
        )}
        <div>
          <div className="field-label">Shallow End ({unit})</div>
          <input type="number" className="field-input" value={shallowDepth} onChange={e => setShallowDepth(e.target.value)} placeholder="1.2" />
        </div>
        <div>
          <div className="field-label">Deep End ({unit})</div>
          <input type="number" className="field-input" value={deepDepth} onChange={e => setDeepDepth(e.target.value)} placeholder="2.4" />
        </div>
      </div>

      {volumeM3 > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#3b82f640", background: "#3b82f612" }}>
            <div className="result-label">Pool Volume</div>
            <div className="result-value text-3xl">{litres.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} L</div>
            <div className="result-sub">{gallons.toFixed(0)} US gallons · {volumeM3.toFixed(2)} m³</div>
          </div>
          <div className="result-box">
            <div className="result-label">Average Depth</div>
            <div className="result-value">{avgDepth.toFixed(2)} {unit}</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
