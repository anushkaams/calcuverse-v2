"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is ideal body weight?", answer: "Ideal body weight is an estimate of the healthy weight range for a given height and gender. It is a guideline, not a strict target." },
  { question: "Which formula is best?", answer: "No single formula is universally best. The Hamwi formula is commonly used in clinical settings. All formulas provide rough estimates." },
  { question: "Does muscle mass affect ideal weight?", answer: "Yes — muscular individuals may exceed 'ideal' weight ranges while being very healthy. These formulas don't account for body composition." },
  { question: "Should I aim for the exact ideal weight?", answer: "Focus on a healthy BMI range (18.5–24.9) and body composition rather than a single number. Consult a doctor for personalized advice." },
];

export default function IdealWeightCalc() {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [ft, setFt] = useState("");
  const [inches, setInches] = useState("");

  const heightCm = unit === "metric"
    ? parseFloat(height) || 0
    : ((parseFloat(ft) || 0) * 12 + (parseFloat(inches) || 0)) * 2.54;

  const heightIn = heightCm / 2.54;

  // Hamwi formula (lbs → kg)
  const hamwiBase = gender === "male" ? 106 : 100;
  const hamwiExtra = gender === "male" ? 6 : 5;
  const hamwiLbs = heightIn > 60 ? hamwiBase + hamwiExtra * (heightIn - 60) : hamwiBase;
  const hamwiKg = hamwiLbs * 0.453592;

  // Devine formula
  const devineBase = gender === "male" ? 50 : 45.5;
  const devineKg = heightCm > 152 ? devineBase + 2.3 * ((heightCm - 152) / 2.54) : devineBase;

  // Robinson formula
  const robinsonBase = gender === "male" ? 52 : 49;
  const robinsonKg = heightCm > 152 ? robinsonBase + 1.9 * ((heightCm - 152) / 2.54) : robinsonBase;

  const avgKg = (hamwiKg + devineKg + robinsonKg) / 3;
  const rangeMin = avgKg * 0.9;
  const rangeMax = avgKg * 1.1;

  const display = (kg: number) => unit === "metric" ? `${kg.toFixed(1)} kg` : `${(kg * 2.20462).toFixed(1)} lbs`;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${gender === "male" ? "active" : ""}`} onClick={() => setGender("male")}>Male</button>
        <button className={`tab-item ${gender === "female" ? "active" : ""}`} onClick={() => setGender("female")}>Female</button>
      </div>
      <div className="tab-group">
        <button className={`tab-item ${unit === "metric" ? "active" : ""}`} onClick={() => setUnit("metric")}>Metric</button>
        <button className={`tab-item ${unit === "imperial" ? "active" : ""}`} onClick={() => setUnit("imperial")}>Imperial</button>
      </div>

      {unit === "metric" ? (
        <div>
          <div className="field-label">Height (cm)</div>
          <input type="number" className="field-input" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="field-label">Feet</div>
            <input type="number" className="field-input" value={ft} onChange={e => setFt(e.target.value)} placeholder="5" />
          </div>
          <div>
            <div className="field-label">Inches</div>
            <input type="number" className="field-input" value={inches} onChange={e => setInches(e.target.value)} placeholder="9" />
          </div>
        </div>
      )}

      {heightCm > 100 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#6366f140", background: "#6366f112" }}>
            <div className="result-label">Ideal Weight Range</div>
            <div className="result-value text-2xl">{display(rangeMin)} – {display(rangeMax)}</div>
          </div>
          {[["Hamwi", hamwiKg], ["Devine", devineKg], ["Robinson", robinsonKg]].map(([name, kg]) => (
            <div key={name as string} className="result-box flex justify-between items-center">
              <span style={{ color: "var(--text-secondary)" }}>{name as string} Formula</span>
              <span className="font-bold">{display(kg as number)}</span>
            </div>
          ))}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
