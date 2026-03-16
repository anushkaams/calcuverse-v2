"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is a carbon footprint?", answer: "A carbon footprint is the total amount of greenhouse gases (measured in CO₂ equivalent) produced by human activities, directly or indirectly." },
  { question: "What is the average carbon footprint?", answer: "The global average is about 4 tonnes CO₂e per person per year. The US average is ~16 tonnes; India's is ~2 tonnes." },
  { question: "What has the biggest impact?", answer: "Diet (especially meat), transportation (particularly flying and driving), home energy use, and purchases are the largest contributors for most people." },
  { question: "How can I offset my carbon footprint?", answer: "Plant trees, invest in verified carbon offset projects, switch to renewables, or use certified climate programs. Reduction is always preferable to offsetting." },
];

export default function CarbonFootprintCalc() {
  const [carMiles, setCarMiles] = useState("");
  const [flights, setFlights] = useState("0");
  const [electricity, setElectricity] = useState("");
  const [diet, setDiet] = useState<"vegan" | "vegetarian" | "omnivore" | "heavy_meat">("omnivore");
  const [recycling, setRecycling] = useState<"yes" | "no">("yes");

  const DIET_KG: Record<string, number> = { vegan: 1000, vegetarian: 1500, omnivore: 2500, heavy_meat: 3300 };

  const carCO2 = (parseFloat(carMiles) || 0) * 0.21; // kg CO2 per km
  const flightCO2 = (parseFloat(flights) || 0) * 255; // avg short-haul per flight
  const electricityCO2 = (parseFloat(electricity) || 0) * 0.233 * 12; // kWh/month × avg grid
  const dietCO2 = DIET_KG[diet];
  const recyclingCredit = recycling === "yes" ? -200 : 0;

  const total = (carCO2 + flightCO2 + electricityCO2 + dietCO2 + recyclingCredit) / 1000; // tonnes
  const globalAvg = 4;
  const pct = total / globalAvg * 100;

  const color = total < 2 ? "#10b981" : total < 5 ? "#f59e0b" : "#ef4444";

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Car Driving (km per year)</div>
        <input type="number" className="field-input" value={carMiles} onChange={e => setCarMiles(e.target.value)} placeholder="12000" />
      </div>
      <div>
        <div className="field-label">Short/Medium Flights per Year</div>
        <input type="number" className="field-input" value={flights} onChange={e => setFlights(e.target.value)} placeholder="2" />
      </div>
      <div>
        <div className="field-label">Home Electricity (kWh per month)</div>
        <input type="number" className="field-input" value={electricity} onChange={e => setElectricity(e.target.value)} placeholder="350" />
      </div>
      <div>
        <div className="field-label">Diet</div>
        <select className="field-input" value={diet} onChange={e => setDiet(e.target.value as any)}>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="omnivore">Omnivore (average meat)</option>
          <option value="heavy_meat">Heavy Meat Eater</option>
        </select>
      </div>
      <div>
        <div className="field-label">Do you recycle regularly?</div>
        <div className="tab-group">
          <button className={`tab-item ${recycling === "yes" ? "active" : ""}`} onClick={() => setRecycling("yes")}>Yes</button>
          <button className={`tab-item ${recycling === "no" ? "active" : ""}`} onClick={() => setRecycling("no")}>No</button>
        </div>
      </div>

      {total > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: color + "40", background: color + "12" }}>
            <div className="result-label">Estimated Annual Footprint</div>
            <div className="result-value text-3xl" style={{ color }}>{total.toFixed(2)} t CO₂e</div>
            <div className="result-sub">{pct.toFixed(0)}% of global average ({globalAvg}t)</div>
          </div>
          {[["🚗 Transport", carCO2 + flightCO2], ["⚡ Electricity", electricityCO2], ["🥩 Diet", dietCO2]].map(([label, val]) => (
            <div key={label as string} className="result-box flex justify-between">
              <span>{label as string}</span>
              <span>{((val as number) / 1000).toFixed(2)} t</span>
            </div>
          ))}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
