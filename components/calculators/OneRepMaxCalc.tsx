"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is a 1 rep max (1RM)?", answer: "Your 1RM is the maximum weight you can lift for a single repetition with proper form. It's used to gauge strength and set training loads." },
  { question: "Is it safe to test my 1RM?", answer: "Testing true 1RM requires a spotter and good technique. Using a rep-based formula is a safer way to estimate it without maximal loading." },
  { question: "Which formula is most accurate?", answer: "The Epley and Brzycki formulas are the most widely used. Accuracy is highest for rep counts of 1–10. Above 15 reps, estimates become less reliable." },
  { question: "How do I use my 1RM for training?", answer: "Common percentages: 85–95% for strength, 70–85% for hypertrophy, 50–70% for endurance. Programs like 5/3/1 are built around 1RM percentages." },
];

const LIFTS = ["Bench Press", "Squat", "Deadlift", "Overhead Press", "Other"];

export default function OneRepMaxCalc() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [lift, setLift] = useState("Bench Press");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");

  const w = parseFloat(weight) || 0;
  const r = parseInt(reps) || 0;

  const epley = r > 0 && w > 0 ? w * (1 + r / 30) : 0;
  const brzycki = r > 1 && w > 0 ? w * (36 / (37 - r)) : r === 1 ? w : 0;
  const avg = epley > 0 && brzycki > 0 ? (epley + brzycki) / 2 : epley || brzycki;

  const pcts = [100, 95, 90, 85, 80, 75, 70, 65, 60].map(p => ({
    pct: p,
    weight: avg * (p / 100),
  }));

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${unit === "kg" ? "active" : ""}`} onClick={() => setUnit("kg")}>kg</button>
        <button className={`tab-item ${unit === "lb" ? "active" : ""}`} onClick={() => setUnit("lb")}>lb</button>
      </div>

      <div>
        <div className="field-label">Exercise</div>
        <select className="field-input" value={lift} onChange={e => setLift(e.target.value)}>
          {LIFTS.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Weight ({unit})</div>
          <input type="number" className="field-input" value={weight} onChange={e => setWeight(e.target.value)} placeholder="100" />
        </div>
        <div>
          <div className="field-label">Reps Performed</div>
          <input type="number" className="field-input" value={reps} onChange={e => setReps(e.target.value)} placeholder="5" min="1" max="30" />
        </div>
      </div>

      {avg > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#6366f140", background: "#6366f112" }}>
            <div className="result-label">Estimated 1RM — {lift}</div>
            <div className="result-value text-3xl">{avg.toFixed(1)} {unit}</div>
          </div>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
              Training Percentages
            </div>
            {pcts.map(({ pct, weight: pw }) => (
              <div key={pct} className="flex justify-between px-4 py-2 text-sm border-t" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "var(--text-secondary)" }}>{pct}%</span>
                <span className="font-medium">{pw.toFixed(1)} {unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
