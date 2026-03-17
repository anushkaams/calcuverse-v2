"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How deep should mulch be applied?", answer: "A 5–10 cm (2–4 inch) layer of mulch is ideal. Too shallow won't suppress weeds; too deep can suffocate plant roots and cause rot." },
  { question: "How deep should gravel be for a path?", answer: "For foot traffic, 5–7 cm is sufficient. For driveways, use 10–15 cm of compacted gravel with a weed barrier underneath." },
  { question: "How much does a tonne of gravel cover?", answer: "One tonne of typical gravel covers about 10 m² at 5 cm depth, or 7 m² at 7 cm depth." },
  { question: "What is the difference between mulch and gravel for landscaping?", answer: "Organic mulch (wood chips, bark) improves soil and decomposes over time. Gravel is permanent, better for drainage, but doesn't enrich soil." },
];

const MATERIALS = [
  { label: "Gravel (1680 kg/m³)", density: 1680 },
  { label: "Mulch (400 kg/m³)", density: 400 },
  { label: "Topsoil (1200 kg/m³)", density: 1200 },
  { label: "Sand (1600 kg/m³)", density: 1600 },
  { label: "Compost (500 kg/m³)", density: 500 },
];

export default function GravelMulchCalc() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [material, setMaterial] = useState("Gravel (1680 kg/m³)");
  const [unit, setUnit] = useState<"m" | "ft">("m");
  const [pricePerTonne, setPricePerTonne] = useState("");

  const FT_TO_M = 0.3048;
  const l = (parseFloat(length) || 0) * (unit === "ft" ? FT_TO_M : 1);
  const w = (parseFloat(width) || 0) * (unit === "ft" ? FT_TO_M : 1);
  const d = (parseFloat(depth) || 0) * (unit === "ft" ? FT_TO_M : 0.01); // depth in cm if metric

  const volumeM3 = l * w * d;
  const density = MATERIALS.find(m => m.label === material)?.density ?? 1680;
  const tonnes = (volumeM3 * density) / 1000;
  const cost = parseFloat(pricePerTonne) > 0 ? tonnes * parseFloat(pricePerTonne) : 0;

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${unit === "m" ? "active" : ""}`} onClick={() => setUnit("m")}>Metric</button>
        <button className={`tab-item ${unit === "ft" ? "active" : ""}`} onClick={() => setUnit("ft")}>Imperial</button>
      </div>

      <div>
        <div className="field-label">Material</div>
        <select className="field-input" value={material} onChange={e => setMaterial(e.target.value)}>
          {MATERIALS.map(m => <option key={m.label}>{m.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div><div className="field-label">Length ({unit === "m" ? "m" : "ft"})</div><input type="number" className="field-input" value={length} onChange={e => setLength(e.target.value)} placeholder="5" /></div>
        <div><div className="field-label">Width</div><input type="number" className="field-input" value={width} onChange={e => setWidth(e.target.value)} placeholder="3" /></div>
        <div><div className="field-label">Depth ({unit === "m" ? "cm" : "ft"})</div><input type="number" className="field-input" value={depth} onChange={e => setDepth(e.target.value)} placeholder="7" /></div>
      </div>

      <div>
        <div className="field-label">Price per Tonne ($, optional)</div>
        <input type="number" className="field-input" value={pricePerTonne} onChange={e => setPricePerTonne(e.target.value)} placeholder="60" />
      </div>

      {volumeM3 > 0 && (
        <div className="space-y-3">
          <div className="result-box"><div className="result-label">Volume</div><div className="result-value">{volumeM3.toFixed(3)} m³</div></div>
          <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
            <div className="result-label">Weight Required</div>
            <div className="result-value text-3xl">{tonnes.toFixed(2)} tonnes</div>
            <div className="result-sub">{(tonnes * 1000).toFixed(0)} kg</div>
          </div>
          {cost > 0 && <div className="result-box"><div className="result-label">Estimated Cost</div><div className="result-value">${cost.toFixed(2)}</div></div>}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
