"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is wind chill?", answer: "Wind chill is how cold air feels on exposed skin due to wind. Wind accelerates heat loss from your body, making it feel colder than the actual temperature." },
  { question: "What formula is used?", answer: "The NWS Wind Chill formula (2001): WC = 35.74 + 0.6215T – 35.75(V^0.16) + 0.4275T(V^0.16), where T is °F and V is wind speed in mph." },
  { question: "When does wind chill matter?", answer: "Wind chill effects are significant below 10°C (50°F). At 0°C with 30km/h wind, it can feel like -8°C - a dangerous difference for exposed skin." },
  { question: "At what wind chill is frostbite a risk?", answer: "Frostbite on exposed skin can occur in under 30 minutes when wind chill falls below -27°C (-17°F), and in under 5 minutes below -48°C (-54°F)." },
];

export default function WindChillCalc() {
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const t = parseFloat(temp) || 0;
  const w = parseFloat(wind) || 0;

  // Convert to imperial for formula
  const tF = unit === "C" ? t * 9 / 5 + 32 : t;
  const wMph = unit === "C" ? w * 0.621371 : w;

  let wc = 0;
  if (wMph >= 3 && tF <= 50) {
    wc = 35.74 + 0.6215 * tF - 35.75 * Math.pow(wMph, 0.16) + 0.4275 * tF * Math.pow(wMph, 0.16);
  } else {
    wc = tF;
  }

  const wcDisplay = unit === "C" ? (wc - 32) * 5 / 9 : wc;
  const tempDisplay = unit === "C" ? t : tF;

  const frostbiteRisk = wcDisplay < -27 ? "⚠️ Frostbite in <30 min" : wcDisplay < -15 ? "Caution: Cold danger" : wcDisplay < 0 ? "Dress warmly" : "Low risk";
  const riskColor = wcDisplay < -27 ? "#ef4444" : wcDisplay < -15 ? "#f59e0b" : "var(--text-secondary)";

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${unit === "C" ? "active" : ""}`} onClick={() => setUnit("C")}>°C / km/h</button>
        <button className={`tab-item ${unit === "F" ? "active" : ""}`} onClick={() => setUnit("F")}>°F / mph</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Temperature (°{unit})</div>
          <input type="number" className="field-input" value={temp} onChange={e => setTemp(e.target.value)} placeholder={unit === "C" ? "-5" : "20"} />
        </div>
        <div>
          <div className="field-label">Wind Speed ({unit === "C" ? "km/h" : "mph"})</div>
          <input type="number" className="field-input" value={wind} onChange={e => setWind(e.target.value)} placeholder="20" />
        </div>
      </div>

      {temp && wind && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#3b82f640", background: "#3b82f612" }}>
            <div className="result-label">Wind Chill Temperature</div>
            <div className="result-value text-3xl">{wcDisplay.toFixed(1)}°{unit}</div>
            <div className="result-sub">Actual: {tempDisplay.toFixed(1)}°{unit} · Feels {Math.abs(tempDisplay - wcDisplay).toFixed(1)}° colder</div>
          </div>
          <div className="result-box">
            <div className="result-label">Risk Level</div>
            <div className="result-value" style={{ color: riskColor }}>{frostbiteRisk}</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
