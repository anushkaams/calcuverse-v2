"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How much extra flooring should I buy?", answer: "Add 10% for straight-lay patterns and 15% for diagonal. Extra accounts for cutting waste, mistakes, and future repairs." },
  { question: "What unit is flooring sold in?", answer: "Flooring is typically sold in square metres (m²), square feet (ft²), or by box - each covering a stated area. Always check box coverage before buying." },
  { question: "How do I measure an L-shaped room?", answer: "Split the L shape into two rectangles, calculate each area separately, and add them together." },
  { question: "Do I need underlayment?", answer: "Most laminate and floating floors require underlayment for sound insulation and moisture protection. Glue-down and nail-down installations usually don't." },
];

export default function FlooringCalc() {
  const [rooms, setRooms] = useState([{ length: "", width: "" }]);
  const [waste, setWaste] = useState("10");
  const [pricePerSqm, setPricePerSqm] = useState("");
  const [unit, setUnit] = useState<"m" | "ft">("m");

  const addRoom = () => setRooms([...rooms, { length: "", width: "" }]);
  const update = (i: number, k: string, v: string) => { const c = [...rooms]; (c[i] as any)[k] = v; setRooms(c); };

  const rawArea = rooms.reduce((s, r) => {
    const l = parseFloat(r.length) || 0, w = parseFloat(r.width) || 0;
    const area = l * w;
    return s + (unit === "ft" ? area * 0.092903 : area);
  }, 0);

  const totalArea = rawArea * (1 + (parseFloat(waste) || 10) / 100);
  const totalAreaFt = totalArea * 10.7639;
  const cost = parseFloat(pricePerSqm) > 0 ? totalArea * parseFloat(pricePerSqm) : 0;

  return (
    <div className="space-y-6 py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${unit === "m" ? "active" : ""}`} onClick={() => setUnit("m")}>Metres</button>
        <button className={`tab-item ${unit === "ft" ? "active" : ""}`} onClick={() => setUnit("ft")}>Feet</button>
      </div>

      <div className="space-y-3">
        {rooms.map((r, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex-1"><div className="field-label">Length</div><input type="number" className="field-input" value={r.length} onChange={e => update(i, "length", e.target.value)} placeholder="5" /></div>
            <div className="flex-1"><div className="field-label">Width</div><input type="number" className="field-input" value={r.width} onChange={e => update(i, "width", e.target.value)} placeholder="4" /></div>
            <button onClick={() => setRooms(rooms.filter((_, idx) => idx !== i))} style={{ color: "var(--text-muted)" }} className="pb-2 text-xl">×</button>
          </div>
        ))}
      </div>

      <button onClick={addRoom} className="w-full py-2 rounded-lg text-sm border border-dashed" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        + Add Room / Area
      </button>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Waste % (10–15%)</div>
          <input type="number" className="field-input" value={waste} onChange={e => setWaste(e.target.value)} placeholder="10" />
        </div>
        <div>
          <div className="field-label">Price per m² ($, optional)</div>
          <input type="number" className="field-input" value={pricePerSqm} onChange={e => setPricePerSqm(e.target.value)} placeholder="45" />
        </div>
      </div>

      {rawArea > 0 && (
        <div className="space-y-3">
          <div className="result-box"><div className="result-label">Net Area</div><div className="result-value">{rawArea.toFixed(2)} m² · {(rawArea * 10.7639).toFixed(1)} ft²</div></div>
          <div className="result-box" style={{ borderColor: "#8b5cf640", background: "#8b5cf612" }}>
            <div className="result-label">Total to Purchase (+{waste}%)</div>
            <div className="result-value text-3xl">{totalArea.toFixed(2)} m²</div>
            <div className="result-sub">{totalAreaFt.toFixed(1)} ft²</div>
          </div>
          {cost > 0 && <div className="result-box"><div className="result-label">Estimated Material Cost</div><div className="result-value">${cost.toFixed(2)}</div></div>}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
