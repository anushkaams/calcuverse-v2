"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is the heat index?", answer: "The heat index (or 'feels like' temperature) combines air temperature and relative humidity to indicate how hot it feels to the human body." },
  { question: "Why does humidity make it feel hotter?", answer: "High humidity prevents sweat from evaporating efficiently, which is your body's primary cooling mechanism. This makes heat much harder to tolerate." },
  { question: "When is heat dangerous?", answer: "Heat index above 40°C (103°F) is 'Danger'; above 51°C (124°F) is 'Extreme Danger' with high risk of heat stroke. Limit outdoor activity and hydrate." },
  { question: "Who is most at risk in extreme heat?", answer: "Elderly people, young children, outdoor workers, athletes, and those with chronic illnesses are most vulnerable to heat-related illness." },
];

export default function HeatIndexCalc() {
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const t = parseFloat(temp) || 0;
  const rh = parseFloat(humidity) || 0;

  const tF = unit === "C" ? t * 9 / 5 + 32 : t;

  // Rothfusz regression
  let hi = 0;
  if (tF >= 80 && rh >= 40) {
    hi = -42.379 + 2.04901523 * tF + 10.14333127 * rh
      - 0.22475541 * tF * rh - 0.00683783 * tF * tF
      - 0.05481717 * rh * rh + 0.00122874 * tF * tF * rh
      + 0.00085282 * tF * rh * rh - 0.00000199 * tF * tF * rh * rh;
  } else {
    hi = tF;
  }

  const hiC = (hi - 32) * 5 / 9;
  const hiDisplay = unit === "C" ? hiC : hi;
  const tempDisplay = unit === "C" ? t : tF;

  const getRisk = (hiC: number) => {
    if (hiC < 27) return ["Normal", "var(--text-secondary)"];
    if (hiC < 32) return ["Caution", "#10b981"];
    if (hiC < 41) return ["Extreme Caution", "#f59e0b"];
    if (hiC < 51) return ["⚠️ Danger", "#ef4444"];
    return ["🚨 Extreme Danger", "#ef4444"];
  };

  const [risk, riskColor] = temp && humidity ? getRisk(hiC) : ["—", "var(--text-muted)"];

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${unit === "C" ? "active" : ""}`} onClick={() => setUnit("C")}>Celsius</button>
        <button className={`tab-item ${unit === "F" ? "active" : ""}`} onClick={() => setUnit("F")}>Fahrenheit</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Air Temperature (°{unit})</div>
          <input type="number" className="field-input" value={temp} onChange={e => setTemp(e.target.value)} placeholder={unit === "C" ? "35" : "95"} />
        </div>
        <div>
          <div className="field-label">Relative Humidity (%)</div>
          <input type="number" className="field-input" value={humidity} onChange={e => setHumidity(e.target.value)} placeholder="70" min="0" max="100" />
        </div>
      </div>

      {temp && humidity && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#ef444440", background: "#ef444412" }}>
            <div className="result-label">Feels Like</div>
            <div className="result-value text-3xl">{hiDisplay.toFixed(1)}°{unit}</div>
            <div className="result-sub">Actual: {tempDisplay}°{unit} · {Math.abs(tempDisplay - hiDisplay).toFixed(1)}° difference</div>
          </div>
          <div className="result-box">
            <div className="result-label">Risk Level</div>
            <div className="result-value" style={{ color: riskColor as string }}>{risk as string}</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
