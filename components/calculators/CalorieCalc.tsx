"use client";
import { useState } from "react";

const ACTIVITY = [
  { label: "Sedentary (desk job, no exercise)", factor: 1.2 },
  { label: "Lightly active (1–3 days/week)", factor: 1.375 },
  { label: "Moderately active (3–5 days/week)", factor: 1.55 },
  { label: "Very active (6–7 days/week)", factor: 1.725 },
  { label: "Extremely active (athlete/physical job)", factor: 1.9 },
];

export default function CalorieCalc() {
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [sex, setSex] = useState<"male"|"female">("male");
  const [activity, setActivity] = useState(1.55);
  const [unit, setUnit] = useState<"metric"|"imperial">("metric");

  const w = parseFloat(weight)||0, h = parseFloat(height)||0, a = parseFloat(age)||0;
  const wKg = unit==="metric" ? w : w*0.453592;
  const hCm = unit==="metric" ? h : h*2.54;

  // Mifflin-St Jeor BMR
  const bmr = sex==="male"
    ? 10*wKg + 6.25*hCm - 5*a + 5
    : 10*wKg + 6.25*hCm - 5*a - 161;

  const tdee = bmr * activity;

  const goals = [
    { label: "Lose weight (−500 cal)", cals: tdee - 500, color: "#3b82f6" },
    { label: "Maintain weight", cals: tdee, color: "#10b981" },
    { label: "Gain weight (+500 cal)", cals: tdee + 500, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-4">
      <div className="tab-group">
        <button className={`tab-item ${unit==="metric"?"active":""}`} onClick={()=>setUnit("metric")}>Metric</button>
        <button className={`tab-item ${unit==="imperial"?"active":""}`} onClick={()=>setUnit("imperial")}>Imperial</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Sex</div>
          <div className="tab-group">
            <button className={`tab-item ${sex==="male"?"active":""}`} onClick={()=>setSex("male")}>Male</button>
            <button className={`tab-item ${sex==="female"?"active":""}`} onClick={()=>setSex("female")}>Female</button>
          </div>
        </div>
        <div>
          <div className="field-label">Age</div>
          <input type="number" className="field-input" value={age} onChange={e=>setAge(e.target.value)} placeholder="30" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Weight ({unit==="metric"?"kg":"lbs"})</div>
          <input type="number" className="field-input" value={weight} onChange={e=>setWeight(e.target.value)} />
        </div>
        <div>
          <div className="field-label">Height ({unit==="metric"?"cm":"in"})</div>
          <input type="number" className="field-input" value={height} onChange={e=>setHeight(e.target.value)} />
        </div>
      </div>

      <div>
        <div className="field-label">Activity Level</div>
        <select className="field-select" value={activity} onChange={e=>setActivity(parseFloat(e.target.value))}>
          {ACTIVITY.map(a=><option key={a.factor} value={a.factor}>{a.label}</option>)}
        </select>
      </div>

      <div className="result-box">
        <div className="result-label">BMR (base metabolic rate)</div>
        <div className="result-value">{isNaN(bmr) ? "-" : Math.round(bmr)} kcal/day</div>
      </div>

      <div className="space-y-2">
        {goals.map(g=>(
          <div key={g.label} className="flex items-center justify-between p-3 rounded-xl" style={{background:`${g.color}12`,border:`1px solid ${g.color}30`}}>
            <span className="text-sm" style={{color:`${g.color}`}}>{g.label}</span>
            <span className="font-mono font-semibold" style={{color:"var(--text-primary)"}}>{Math.round(g.cals)} kcal</span>
          </div>
        ))}
      </div>
    </div>
  );
}
