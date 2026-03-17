"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How are calories burned calculated?", answer: "Using MET (Metabolic Equivalent of Task) values: Calories = MET × weight (kg) × duration (hours). MET values are standardized estimates of activity intensity." },
  { question: "Are these numbers exact?", answer: "No - individual variation is significant. Factors like fitness level, body composition, heat, and intensity affect actual calorie burn by ±20–30%." },
  { question: "What is a MET value?", answer: "MET measures how many times more energy an activity uses compared to sitting at rest (1 MET). Running at 8 mph has a MET of ~11.5." },
  { question: "Does weight affect calories burned?", answer: "Yes. Heavier individuals burn more calories for the same activity because more energy is needed to move greater mass." },
];

const ACTIVITIES = [
  { label: "Walking (slow, 3km/h)", met: 2.5 },
  { label: "Walking (brisk, 6km/h)", met: 3.5 },
  { label: "Running (8km/h)", met: 8.0 },
  { label: "Running (12km/h)", met: 11.5 },
  { label: "Cycling (moderate)", met: 7.5 },
  { label: "Swimming (moderate)", met: 6.0 },
  { label: "Jump rope", met: 10.0 },
  { label: "Yoga", met: 3.0 },
  { label: "Weight training", met: 5.0 },
  { label: "HIIT", met: 9.0 },
  { label: "Basketball", met: 7.5 },
  { label: "Soccer", met: 8.0 },
  { label: "Hiking", met: 5.3 },
  { label: "Dancing (vigorous)", met: 7.0 },
  { label: "Sitting at desk", met: 1.3 },
];

export default function CaloriesBurnedCalc() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [activity, setActivity] = useState("Running (8km/h)");
  const [minutes, setMinutes] = useState("30");

  const weightKg = unit === "kg" ? parseFloat(weight) || 0 : (parseFloat(weight) || 0) * 0.453592;
  const met = ACTIVITIES.find(a => a.label === activity)?.met ?? 5;
  const calories = met * weightKg * ((parseFloat(minutes) || 0) / 60);

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${unit === "kg" ? "active" : ""}`} onClick={() => setUnit("kg")}>kg</button>
        <button className={`tab-item ${unit === "lb" ? "active" : ""}`} onClick={() => setUnit("lb")}>lbs</button>
      </div>

      <div>
        <div className="field-label">Your Weight ({unit})</div>
        <input type="number" className="field-input" value={weight} onChange={e => setWeight(e.target.value)} placeholder={unit === "kg" ? "70" : "154"} />
      </div>

      <div>
        <div className="field-label">Activity</div>
        <select className="field-input" value={activity} onChange={e => setActivity(e.target.value)}>
          {ACTIVITIES.map(a => <option key={a.label}>{a.label}</option>)}
        </select>
      </div>

      <div>
        <div className="field-label">Duration (minutes)</div>
        <input type="number" className="field-input" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="30" />
      </div>

      {calories > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#ef444440", background: "#ef444412" }}>
            <div className="result-label">Calories Burned 🔥</div>
            <div className="result-value text-3xl">{Math.round(calories)} kcal</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="result-box"><div className="result-label">Per Hour</div><div className="result-value">{Math.round(calories / (parseFloat(minutes) / 60))} kcal</div></div>
            <div className="result-box"><div className="result-label">MET Value</div><div className="result-value">{met}</div></div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
