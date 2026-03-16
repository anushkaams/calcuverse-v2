"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is one alcohol unit?", answer: "One UK unit = 10ml (8g) of pure alcohol. A standard pub measure of spirits (25ml at 40%) is 1 unit. A pint of 5% beer is ~2.8 units." },
  { question: "How is BAC estimated?", answer: "BAC uses the Widmark formula, adjusted for gender, weight, and time elapsed. It's an estimate — many factors affect real BAC." },
  { question: "How long until I'm sober?", answer: "Your liver processes about 1 unit per hour on average. This varies by weight, metabolism, food intake, and individual factors." },
  { question: "What BAC is illegal to drive?", answer: "Limits vary: US/Canada: 0.08%, UK: 0.08% (Scotland 0.05%), Australia: 0.05%, most of Europe: 0.05%. Zero tolerance applies in some countries." },
];

type Drink = { type: string; vol: string; abv: string };

const PRESETS: Drink[] = [
  { type: "Beer (pint)", vol: "568", abv: "5" },
  { type: "Wine (glass)", vol: "175", abv: "12" },
  { type: "Spirits (single)", vol: "25", abv: "40" },
  { type: "Cider (pint)", vol: "568", abv: "4.5" },
];

export default function AlcoholCalc() {
  const [drinks, setDrinks] = useState<Drink[]>([{ type: "Beer (pint)", vol: "568", abv: "5" }]);
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [hours, setHours] = useState("2");

  const addDrink = (preset?: Drink) => setDrinks([...drinks, preset ?? { type: "Custom", vol: "", abv: "" }]);
  const update = (i: number, k: keyof Drink, v: string) => { const c = [...drinks]; c[i] = { ...c[i], [k]: v }; setDrinks(c); };

  const totalUnits = drinks.reduce((s, d) => s + ((parseFloat(d.vol) || 0) * (parseFloat(d.abv) || 0)) / 1000, 0);
  const weightKg = parseFloat(weight) || 70;
  const r = gender === "male" ? 0.68 : 0.55;
  const gramsAlcohol = totalUnits * 8;
  const bac = (gramsAlcohol / (weightKg * 1000 * r)) * 100;
  const elapsed = parseFloat(hours) || 0;
  const currentBac = Math.max(0, bac - elapsed * 0.015);
  const soberInHours = currentBac > 0 ? Math.ceil(currentBac / 0.015) : 0;

  const bacColor = currentBac === 0 ? "#10b981" : currentBac < 0.05 ? "#10b981" : currentBac < 0.08 ? "#f59e0b" : "#ef4444";

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${gender === "male" ? "active" : ""}`} onClick={() => setGender("male")}>Male</button>
        <button className={`tab-item ${gender === "female" ? "active" : ""}`} onClick={() => setGender("female")}>Female</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div><div className="field-label">Body Weight (kg)</div><input type="number" className="field-input" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" /></div>
        <div><div className="field-label">Hours Since 1st Drink</div><input type="number" className="field-input" value={hours} onChange={e => setHours(e.target.value)} placeholder="2" /></div>
      </div>

      <div className="space-y-2">
        <div className="field-label">Drinks Consumed</div>
        {drinks.map((d, i) => (
          <div key={i} className="flex gap-2 items-end">
            <input className="field-input flex-1 min-w-0 text-xs" value={d.type} onChange={e => update(i, "type", e.target.value)} />
            <div><div className="field-label text-xs">Vol(ml)</div><input type="number" className="field-input w-16" value={d.vol} onChange={e => update(i, "vol", e.target.value)} /></div>
            <div><div className="field-label text-xs">ABV%</div><input type="number" className="field-input w-16" value={d.abv} onChange={e => update(i, "abv", e.target.value)} /></div>
            <button onClick={() => setDrinks(drinks.filter((_, idx) => idx !== i))} style={{ color: "var(--text-muted)" }} className="pb-2">×</button>
          </div>
        ))}
        <div className="flex flex-wrap gap-1 mt-1">
          {PRESETS.map(p => <button key={p.type} onClick={() => addDrink(p)} className="px-2 py-1 text-xs rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>+ {p.type}</button>)}
        </div>
      </div>

      {totalUnits > 0 && (
        <div className="space-y-3">
          <div className="result-box"><div className="result-label">Total Units</div><div className="result-value">{totalUnits.toFixed(1)} units</div></div>
          <div className="result-box" style={{ borderColor: bacColor + "40", background: bacColor + "12" }}>
            <div className="result-label">Estimated BAC Now</div>
            <div className="result-value text-3xl" style={{ color: bacColor }}>{currentBac.toFixed(3)}%</div>
          </div>
          {soberInHours > 0 && <div className="result-box"><div className="result-label">Estimated Time to Sober (0.00%)</div><div className="result-value">{soberInHours}h</div></div>}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
