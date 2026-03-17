"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is body fat percentage?", answer: "Body fat percentage is the proportion of your total body weight that is fat. It's considered a more accurate health metric than weight alone." },
  { question: "What is a healthy body fat percentage?", answer: "For men: 6-17% is athletic to fit, 18-24% acceptable. For women: 14-24% is athletic to fit, 25-31% acceptable. These ranges vary by age." },
  { question: "How accurate is the Navy formula?", answer: "The U.S. Navy circumference method has a margin of error of about ±3-4%. DEXA scans are more accurate but require medical equipment." },
  { question: "How do I measure my waist and neck accurately?", answer: "Measure your waist at the narrowest point (usually at the navel). Measure your neck just below the Adam's apple. Use a flexible tape measure." },
];

export default function BodyFatCalc() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  const convert = (v: number) => unit === "in" ? v * 2.54 : v;
  const h = convert(parseFloat(height) || 0);
  const w = convert(parseFloat(waist) || 0);
  const n = convert(parseFloat(neck) || 0);
  const hi = convert(parseFloat(hip) || 0);

  let bf = 0;
  if (h > 0 && w > 0 && n > 0) {
    if (gender === "male" && w > n) {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else if (gender === "female" && w > 0 && hi > 0 && n > 0) {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }
  }

  const getCategory = (bf: number, g: string) => {
    if (g === "male") {
      if (bf < 6) return ["Essential Fat", "#3b82f6"];
      if (bf < 14) return ["Athletic", "#10b981"];
      if (bf < 18) return ["Fit", "#6366f1"];
      if (bf < 25) return ["Average", "#f59e0b"];
      return ["Obese", "#ef4444"];
    } else {
      if (bf < 14) return ["Essential Fat", "#3b82f6"];
      if (bf < 21) return ["Athletic", "#10b981"];
      if (bf < 25) return ["Fit", "#6366f1"];
      if (bf < 32) return ["Average", "#f59e0b"];
      return ["Obese", "#ef4444"];
    }
  };

  const [cat, color] = bf > 0 ? getCategory(bf, gender) : ["-", "var(--text-muted)"];

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${gender === "male" ? "active" : ""}`} onClick={() => setGender("male")}>Male</button>
        <button className={`tab-item ${gender === "female" ? "active" : ""}`} onClick={() => setGender("female")}>Female</button>
      </div>
      <div className="tab-group">
        <button className={`tab-item ${unit === "cm" ? "active" : ""}`} onClick={() => setUnit("cm")}>cm</button>
        <button className={`tab-item ${unit === "in" ? "active" : ""}`} onClick={() => setUnit("in")}>inches</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Height ({unit})</div>
          <input type="number" className="field-input" value={height} onChange={e => setHeight(e.target.value)} placeholder={unit === "cm" ? "175" : "69"} />
        </div>
        <div>
          <div className="field-label">Neck ({unit})</div>
          <input type="number" className="field-input" value={neck} onChange={e => setNeck(e.target.value)} placeholder={unit === "cm" ? "37" : "14.5"} />
        </div>
        <div>
          <div className="field-label">Waist ({unit})</div>
          <input type="number" className="field-input" value={waist} onChange={e => setWaist(e.target.value)} placeholder={unit === "cm" ? "85" : "33"} />
        </div>
        {gender === "female" && (
          <div>
            <div className="field-label">Hip ({unit})</div>
            <input type="number" className="field-input" value={hip} onChange={e => setHip(e.target.value)} placeholder={unit === "cm" ? "95" : "37"} />
          </div>
        )}
      </div>

      {bf > 0 && (
        <div className="result-box" style={{ borderColor: (color as string) + "40", background: (color as string) + "12" }}>
          <div className="result-label">Estimated Body Fat</div>
          <div className="result-value text-3xl" style={{ color: color as string }}>{bf.toFixed(1)}%</div>
          <div className="result-sub" style={{ color: color as string }}>{cat as string}</div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
