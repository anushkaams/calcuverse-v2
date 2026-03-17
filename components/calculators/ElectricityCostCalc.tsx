"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How is electricity cost calculated?", answer: "Electricity cost = (Watts × Hours used per day × Days) / 1000 × Price per kWh. The /1000 converts watts to kilowatts." },
  { question: "What is a kilowatt-hour (kWh)?", answer: "A kilowatt-hour is the standard unit of electrical energy. Using a 1000W appliance for 1 hour consumes 1 kWh." },
  { question: "What is the average electricity price per kWh?", answer: "Global average is around $0.12–0.16/kWh. US averages ~$0.15, Australia ~$0.25–0.35, UK ~$0.30. Check your bill for your exact rate." },
  { question: "Which appliances use the most electricity?", answer: "HVAC systems, water heaters, electric ovens, dryers, and older refrigerators are typically the biggest energy consumers in a home." },
];

const PRESETS = [
  { label: "LED Bulb", w: 10 },
  { label: "TV 55\"", w: 100 },
  { label: "Desktop PC", w: 300 },
  { label: "Washing Machine", w: 500 },
  { label: "Air Conditioner", w: 1500 },
  { label: "Electric Oven", w: 2000 },
  { label: "Water Heater", w: 4000 },
];

export default function ElectricityCostCalc() {
  const [watts, setWatts] = useState("");
  const [hours, setHours] = useState("8");
  const [days, setDays] = useState("30");
  const [price, setPrice] = useState("0.15");

  const w = parseFloat(watts) || 0;
  const h = parseFloat(hours) || 0;
  const d = parseFloat(days) || 0;
  const p = parseFloat(price) || 0;

  const kWh = (w * h * d) / 1000;
  const cost = kWh * p;
  const dailyCost = cost / (d || 1);
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;

  return (
    <div className="space-y-6   py-6 px-4">
      <div>
        <div className="field-label">Appliance Wattage (W)</div>
        <input type="number" className="field-input" value={watts} onChange={e => setWatts(e.target.value)} placeholder="100" />
        <div className="flex flex-wrap gap-2 mt-2">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => setWatts(String(p.w))}
              className="px-2 py-1 text-xs rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
              {p.label} ({p.w}W)
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div><div className="field-label">Hours/Day</div><input type="number" className="field-input" value={hours} onChange={e => setHours(e.target.value)} /></div>
        <div><div className="field-label">Days</div><input type="number" className="field-input" value={days} onChange={e => setDays(e.target.value)} /></div>
        <div><div className="field-label">$/kWh</div><input type="number" className="field-input" value={price} onChange={e => setPrice(e.target.value)} /></div>
      </div>

      {w > 0 && (
        <div className="space-y-3">
          <div className="result-box"><div className="result-label">Energy Consumed</div><div className="result-value">{kWh.toFixed(2)} kWh</div></div>
          <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
            <div className="result-label">Total Cost ({d} days)</div>
            <div className="result-value text-3xl">${cost.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="result-box"><div className="result-label">Per Month</div><div className="result-value">${monthlyCost.toFixed(2)}</div></div>
            <div className="result-box"><div className="result-label">Per Year</div><div className="result-value">${yearlyCost.toFixed(2)}</div></div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
