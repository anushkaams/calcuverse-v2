"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What are macros?", answer: "Macros (macronutrients) are protein, carbohydrates, and fat — the three main nutrients that provide calories. Protein and carbs have 4 cal/g; fat has 9 cal/g." },
  { question: "What is a common macro split?", answer: "A balanced diet often follows 40% carbs / 30% protein / 30% fat. Athletes may increase protein, while keto diets push fat up to 70–75%." },
  { question: "How much protein do I need?", answer: "A common recommendation is 0.7–1g of protein per pound of body weight for active individuals, or 0.36g per pound for sedentary adults." },
  { question: "Can I lose weight by tracking macros?", answer: "Yes. Macro tracking helps you stay within a calorie deficit while ensuring adequate protein to preserve muscle mass during weight loss." },
];

const PRESETS = [
  { label: "Balanced", p: 30, c: 40, f: 30 },
  { label: "High Protein", p: 40, c: 35, f: 25 },
  { label: "Keto", p: 25, c: 5, f: 70 },
  { label: "Low Fat", p: 30, c: 55, f: 15 },
];

export default function MacrosCalc() {
  const [calories, setCalories] = useState("2000");
  const [protein, setProtein] = useState("30");
  const [carbs, setCarbs] = useState("40");
  const [fat, setFat] = useState("30");

  const cal = parseFloat(calories) || 0;
  const p = parseFloat(protein) || 0;
  const c = parseFloat(carbs) || 0;
  const f = parseFloat(fat) || 0;
  const total = p + c + f;

  const proteinG = (cal * p / 100) / 4;
  const carbsG = (cal * c / 100) / 4;
  const fatG = (cal * f / 100) / 9;

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setProtein(String(preset.p));
    setCarbs(String(preset.c));
    setFat(String(preset.f));
  };

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Daily Calorie Target</div>
        <input type="number" className="field-input" value={calories} onChange={e => setCalories(e.target.value)} placeholder="2000" />
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map(preset => (
          <button key={preset.label} onClick={() => applyPreset(preset)}
            className="px-3 py-1.5 rounded-full text-xs border"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            {preset.label}
          </button>
        ))}
      </div>

      {[["Protein", protein, setProtein, "#3b82f6"], ["Carbohydrates", carbs, setCarbs, "#f59e0b"], ["Fat", fat, setFat, "#ef4444"]].map(([label, val, setter, color]) => (
        <div key={label as string}>
          <div className="flex justify-between mb-1">
            <div className="field-label">{label as string} (%)</div>
            <span className="text-sm" style={{ color: color as string }}>{val as string}%</span>
          </div>
          <input type="range" min="0" max="100" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} className="w-full" />
        </div>
      ))}

      {total !== 100 && cal > 0 && (
        <div className="text-sm text-center" style={{ color: "#f59e0b" }}>⚠ Percentages must add up to 100% (currently {total}%)</div>
      )}

      {cal > 0 && total === 100 && (
        <div className="space-y-3">
          <div className="h-4 rounded-full overflow-hidden flex">
            <div style={{ flex: p, background: "#3b82f6" }} />
            <div style={{ flex: c, background: "#f59e0b" }} />
            <div style={{ flex: f, background: "#ef4444" }} />
          </div>
          {[["Protein", proteinG, "#3b82f6"], ["Carbohydrates", carbsG, "#f59e0b"], ["Fat", fatG, "#ef4444"]].map(([label, grams, color]) => (
            <div key={label as string} className="result-box flex justify-between items-center">
              <span style={{ color: color as string }}>{label as string}</span>
              <span className="font-bold">{(grams as number).toFixed(1)}g</span>
            </div>
          ))}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
