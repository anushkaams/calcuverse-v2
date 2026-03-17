"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How are solar savings calculated?", answer: "Savings = (system output in kWh per year) × (electricity price). Output depends on panel wattage, sun hours, and system efficiency." },
  { question: "What are peak sun hours?", answer: "Peak sun hours measure daily solar irradiance — how many hours of equivalent full sunlight your location receives. US averages 4–6 hours; deserts get 7+." },
  { question: "How long to break even on solar?", answer: "Payback periods typically range from 5–12 years depending on system cost, electricity prices, incentives, and local sun availability." },
  { question: "What incentives are available for solar?", answer: "The US federal tax credit is 30% of system cost. Many states offer additional rebates. Net metering lets you sell excess power back to the grid." },
];

export default function SolarCalc() {
  const [panels, setPanels] = useState("10");
  const [wattage, setWattage] = useState("400");
  const [sunHours, setSunHours] = useState("5");
  const [efficiency, setEfficiency] = useState("80");
  const [electricityPrice, setElectricityPrice] = useState("0.15");
  const [systemCost, setSystemCost] = useState("");
  const [incentive, setIncentive] = useState("30");

  const n = parseInt(panels) || 0;
  const w = parseFloat(wattage) || 0;
  const sh = parseFloat(sunHours) || 0;
  const eff = (parseFloat(efficiency) || 80) / 100;
  const price = parseFloat(electricityPrice) || 0;
  const cost = parseFloat(systemCost) || 0;
  const inc = (parseFloat(incentive) || 0) / 100;

  const dailyKwh = (n * w * sh * eff) / 1000;
  const annualKwh = dailyKwh * 365;
  const annualSavings = annualKwh * price;
  const netCost = cost * (1 - inc);
  const payback = annualSavings > 0 && netCost > 0 ? netCost / annualSavings : 0;
  const savings25yr = annualSavings * 25;

  return (
    <div className="space-y-5   py-6 px-4">
      <div className="grid grid-cols-2 gap-3">
        <div><div className="field-label">Number of Panels</div><input type="number" className="field-input" value={panels} onChange={e => setPanels(e.target.value)} /></div>
        <div><div className="field-label">Panel Wattage (W)</div><input type="number" className="field-input" value={wattage} onChange={e => setWattage(e.target.value)} /></div>
        <div><div className="field-label">Peak Sun Hours/Day</div><input type="number" className="field-input" value={sunHours} onChange={e => setSunHours(e.target.value)} /></div>
        <div><div className="field-label">System Efficiency (%)</div><input type="number" className="field-input" value={efficiency} onChange={e => setEfficiency(e.target.value)} /></div>
        <div><div className="field-label">Electricity Price ($/kWh)</div><input type="number" className="field-input" value={electricityPrice} onChange={e => setElectricityPrice(e.target.value)} /></div>
        <div><div className="field-label">System Cost ($)</div><input type="number" className="field-input" value={systemCost} onChange={e => setSystemCost(e.target.value)} placeholder="15000" /></div>
      </div>
      <div>
        <div className="field-label">Incentive / Tax Credit (%)</div>
        <input type="number" className="field-input" value={incentive} onChange={e => setIncentive(e.target.value)} />
      </div>

      {annualKwh > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
            <div className="result-label">☀️ Annual Energy Production</div>
            <div className="result-value text-3xl">{annualKwh.toFixed(0)} kWh</div>
            <div className="result-sub">{dailyKwh.toFixed(1)} kWh/day · {(n * w / 1000).toFixed(1)} kW system</div>
          </div>
          <div className="result-box">
            <div className="result-label">Annual Savings</div>
            <div className="result-value">${annualSavings.toFixed(2)}</div>
          </div>
          {cost > 0 && (
            <>
              <div className="result-box">
                <div className="result-label">Net System Cost (after {incentive}% incentive)</div>
                <div className="result-value">${netCost.toFixed(2)}</div>
              </div>
              <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
                <div className="result-label">Payback Period</div>
                <div className="result-value text-3xl">{payback.toFixed(1)} years</div>
              </div>
              <div className="result-box">
                <div className="result-label">25-Year Total Savings</div>
                <div className="result-value">${savings25yr.toFixed(0)}</div>
              </div>
            </>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
