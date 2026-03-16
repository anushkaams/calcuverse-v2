"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How much area does a gallon of paint cover?", answer: "A standard gallon of paint covers approximately 350–400 square feet (32–37 m²) per coat on smooth surfaces. Rough or porous surfaces need more." },
  { question: "How many coats do I need?", answer: "New drywall or drastic color changes typically need 2 coats. Repainting a similar color may only need 1. Dark-to-light transitions may need 3." },
  { question: "Should I subtract doors and windows?", answer: "For small rooms, it's often easier to skip the subtraction and just have leftover paint for touch-ups. For large spaces, subtracting saves money." },
  { question: "What is 10% waste for?", answer: "Extra paint accounts for spills, uneven application, touch-ups, and future repairs. Always buy slightly more than the minimum calculation." },
];

export default function PaintCalc() {
  const [rooms, setRooms] = useState([{ length: "", width: "", height: "", doors: "1", windows: "1" }]);
  const [coats, setCoats] = useState("2");
  const [coverage, setCoverage] = useState("35"); // m² per litre

  const addRoom = () => setRooms([...rooms, { length: "", width: "", height: "", doors: "1", windows: "1" }]);
  const update = (i: number, k: string, v: string) => {
    const c = [...rooms]; (c[i] as any)[k] = v; setRooms(c);
  };

  const totalArea = rooms.reduce((sum, r) => {
    const l = parseFloat(r.length) || 0, w = parseFloat(r.width) || 0, h = parseFloat(r.height) || 0;
    const wallArea = 2 * (l + w) * h;
    const doors = (parseInt(r.doors) || 0) * 1.9; // ~1.9m² per door
    const windows = (parseInt(r.windows) || 0) * 1.2; // ~1.2m² per window
    return sum + Math.max(0, wallArea - doors - windows);
  }, 0);

  const litresNeeded = totalArea * parseInt(coats) / parseFloat(coverage) * 1.1;
  const gallonsNeeded = litresNeeded / 3.785;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="space-y-4">
        {rooms.map((r, i) => (
          <div key={i} className="p-4 rounded-xl border space-y-3" style={{ borderColor: "var(--border)" }}>
            <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>Room {i + 1}</div>
            <div className="grid grid-cols-3 gap-2">
              <div><div className="field-label">Length (m)</div><input type="number" className="field-input" value={r.length} onChange={e => update(i, "length", e.target.value)} placeholder="4" /></div>
              <div><div className="field-label">Width (m)</div><input type="number" className="field-input" value={r.width} onChange={e => update(i, "width", e.target.value)} placeholder="3.5" /></div>
              <div><div className="field-label">Height (m)</div><input type="number" className="field-input" value={r.height} onChange={e => update(i, "height", e.target.value)} placeholder="2.4" /></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><div className="field-label">Doors</div><input type="number" className="field-input" value={r.doors} onChange={e => update(i, "doors", e.target.value)} /></div>
              <div><div className="field-label">Windows</div><input type="number" className="field-input" value={r.windows} onChange={e => update(i, "windows", e.target.value)} /></div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addRoom} className="w-full py-2 rounded-lg text-sm border border-dashed" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        + Add Room
      </button>

      <div className="grid grid-cols-2 gap-3">
        <div><div className="field-label">Number of Coats</div>
          <select className="field-input" value={coats} onChange={e => setCoats(e.target.value)}>
            {["1","2","3"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div><div className="field-label">Coverage (m²/L)</div>
          <input type="number" className="field-input" value={coverage} onChange={e => setCoverage(e.target.value)} placeholder="35" />
        </div>
      </div>

      {totalArea > 0 && (
        <div className="space-y-3">
          <div className="result-box"><div className="result-label">Total Wall Area</div><div className="result-value">{totalArea.toFixed(1)} m²</div></div>
          <div className="result-box" style={{ borderColor: "#8b5cf640", background: "#8b5cf612" }}>
            <div className="result-label">Paint Required (inc. 10% waste)</div>
            <div className="result-value text-3xl">{litresNeeded.toFixed(1)} L</div>
            <div className="result-sub">{gallonsNeeded.toFixed(2)} gallons</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
