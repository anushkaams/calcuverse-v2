"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "Why add 10% extra?", answer: "Adding 10–15% extra accounts for spillage, uneven surfaces, and the natural settling of materials. Running short mid-pour is a costly mistake." },
  { question: "How many bags of concrete do I need?", answer: "An 80lb (36kg) bag of concrete mix makes about 0.6 cubic feet (0.017 m³). A 60lb bag makes about 0.45 cubic feet." },
  { question: "What is the difference between concrete and cement?", answer: "Cement is an ingredient in concrete. Concrete is a mixture of cement, sand, gravel, and water. You use concrete for structures, not plain cement." },
  { question: "What shapes can I calculate?", answer: "This calculator supports slabs (rectangular), cylinders (columns, posts), and circular slabs - the three most common concrete pour shapes." },
];

export default function ConcreteCalc() {
  const [shape, setShape] = useState<"slab" | "cylinder" | "circle">("slab");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [diameter, setDiameter] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"m" | "ft">("m");

  let volumeM3 = 0;

  if (shape === "slab") {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    volumeM3 = unit === "m" ? l * w * d : l * w * d * 0.0283168;
  } else if (shape === "cylinder") {
    const r = (parseFloat(diameter) || 0) / 2;
    const h = parseFloat(height) || 0;
    volumeM3 = unit === "m" ? Math.PI * r * r * h : Math.PI * r * r * h * 0.0283168;
  } else {
    const r = (parseFloat(diameter) || 0) / 2;
    const d = parseFloat(depth) || 0;
    volumeM3 = unit === "m" ? Math.PI * r * r * d : Math.PI * r * r * d * 0.0283168;
  }

  const volumeWithWaste = volumeM3 * 1.1;
  const bags80lb = Math.ceil(volumeM3 / 0.0170097);
  const bags60lb = Math.ceil(volumeM3 / 0.0127572);
  const weightKg = volumeM3 * 2400; // approx density

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${shape === "slab" ? "active" : ""}`} onClick={() => setShape("slab")}>Slab</button>
        <button className={`tab-item ${shape === "cylinder" ? "active" : ""}`} onClick={() => setShape("cylinder")}>Cylinder</button>
        <button className={`tab-item ${shape === "circle" ? "active" : ""}`} onClick={() => setShape("circle")}>Circle Slab</button>
      </div>
      <div className="tab-group">
        <button className={`tab-item ${unit === "m" ? "active" : ""}`} onClick={() => setUnit("m")}>Meters</button>
        <button className={`tab-item ${unit === "ft" ? "active" : ""}`} onClick={() => setUnit("ft")}>Feet</button>
      </div>

      {shape === "slab" && (
        <div className="grid grid-cols-3 gap-3">
          <div><div className="field-label">Length</div><input type="number" className="field-input" value={length} onChange={e => setLength(e.target.value)} placeholder="5" /></div>
          <div><div className="field-label">Width</div><input type="number" className="field-input" value={width} onChange={e => setWidth(e.target.value)} placeholder="4" /></div>
          <div><div className="field-label">Depth</div><input type="number" className="field-input" value={depth} onChange={e => setDepth(e.target.value)} placeholder="0.1" /></div>
        </div>
      )}
      {shape === "cylinder" && (
        <div className="grid grid-cols-2 gap-3">
          <div><div className="field-label">Diameter</div><input type="number" className="field-input" value={diameter} onChange={e => setDiameter(e.target.value)} placeholder="0.3" /></div>
          <div><div className="field-label">Height</div><input type="number" className="field-input" value={height} onChange={e => setHeight(e.target.value)} placeholder="2" /></div>
        </div>
      )}
      {shape === "circle" && (
        <div className="grid grid-cols-2 gap-3">
          <div><div className="field-label">Diameter</div><input type="number" className="field-input" value={diameter} onChange={e => setDiameter(e.target.value)} placeholder="3" /></div>
          <div><div className="field-label">Depth</div><input type="number" className="field-input" value={depth} onChange={e => setDepth(e.target.value)} placeholder="0.1" /></div>
        </div>
      )}

      {volumeM3 > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
            <div className="result-label">Volume Needed</div>
            <div className="result-value text-3xl">{volumeM3.toFixed(3)} m³</div>
            <div className="result-sub">+10% waste: {volumeWithWaste.toFixed(3)} m³</div>
          </div>
          <div className="result-box">
            <div className="result-label">Pre-mixed Bags Required</div>
            <div className="result-value">{bags80lb} × 80lb bags  ·  {bags60lb} × 60lb bags</div>
          </div>
          <div className="result-box">
            <div className="result-label">Estimated Weight</div>
            <div className="result-value">{(weightKg / 1000).toFixed(2)} tonnes · {(weightKg * 2.20462 / 2000).toFixed(2)} US tons</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
