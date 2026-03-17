// StairCalc.tsx
"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What are standard stair dimensions?", answer: "Building codes typically require riser height of 4–7.75 inches (10–20 cm) and tread depth of 10–11 inches (25–28 cm) minimum." },
  { question: "What is the 2R+T rule?", answer: "The 2R+T rule states that 2× the riser height plus the tread depth should equal 24–25 inches (61–63.5 cm). This ensures comfortable stair proportions." },
  { question: "How many stairs do I need?", answer: "Divide total rise (floor-to-floor height) by desired riser height. Round to the nearest whole number and recalculate the exact riser." },
  { question: "What is a stringer?", answer: "A stringer is the diagonal support board that runs along the sides of the staircase, providing structural support for the treads and risers." },
];

export default function StairCalc() {
  const [totalRise, setTotalRise] = useState("");
  const [riserHeight, setRiserHeight] = useState("18");
  const [treadDepth, setTreadDepth] = useState("25");
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  const tr = parseFloat(totalRise) || 0;
  const rh = parseFloat(riserHeight) || 18;

  const numSteps = tr > 0 ? Math.round(tr / rh) : 0;
  const actualRiser = numSteps > 0 ? tr / numSteps : 0;
  const td = parseFloat(treadDepth) || 25;
  const totalRun = numSteps * td;
  const stringerLength = Math.sqrt(tr * tr + totalRun * totalRun);
  const angle = Math.atan(tr / totalRun) * (180 / Math.PI);
  const twoRT = 2 * actualRiser + td;
  const isComfortable = unit === "cm" ? twoRT >= 61 && twoRT <= 63.5 : twoRT >= 24 && twoRT <= 25;

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${unit === "cm" ? "active" : ""}`} onClick={() => setUnit("cm")}>cm</button>
        <button className={`tab-item ${unit === "in" ? "active" : ""}`} onClick={() => setUnit("in")}>inches</button>
      </div>

      <div>
        <div className="field-label">Total Rise — Floor to Floor ({unit})</div>
        <input type="number" className="field-input" value={totalRise} onChange={e => setTotalRise(e.target.value)} placeholder={unit === "cm" ? "270" : "107"} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><div className="field-label">Desired Riser Height ({unit})</div><input type="number" className="field-input" value={riserHeight} onChange={e => setRiserHeight(e.target.value)} /></div>
        <div><div className="field-label">Tread Depth ({unit})</div><input type="number" className="field-input" value={treadDepth} onChange={e => setTreadDepth(e.target.value)} /></div>
      </div>

      {numSteps > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
            <div className="result-label">Number of Steps</div>
            <div className="result-value text-3xl">{numSteps}</div>
          </div>
          {[
            ["Actual Riser Height", `${actualRiser.toFixed(1)} ${unit}`],
            ["Total Run", `${totalRun.toFixed(1)} ${unit}`],
            ["Stringer Length", `${stringerLength.toFixed(1)} ${unit}`],
            ["Stair Angle", `${angle.toFixed(1)}°`],
            ["2R+T Comfort Check", `${twoRT.toFixed(1)} ${isComfortable ? "✓ Comfortable" : "⚠ Adjust"}`],
          ].map(([label, value]) => (
            <div key={label as string} className="result-box flex justify-between items-center">
              <span style={{ color: "var(--text-secondary)" }}>{label as string}</span>
              <span className="font-bold">{value as string}</span>
            </div>
          ))}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
