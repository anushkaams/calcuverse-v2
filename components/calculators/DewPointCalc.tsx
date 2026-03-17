"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is dew point?", answer: "Dew point is the temperature at which air becomes saturated with moisture and water begins to condense. Higher dew points feel more humid and muggy." },
  { question: "How does dew point differ from humidity?", answer: "Relative humidity is a percentage relative to the air's current temperature. Dew point is an absolute temperature - it's a more reliable comfort indicator." },
  { question: "What dew point feels uncomfortable?", answer: "Below 10°C (50°F) is dry and comfortable. 13–16°C is mild. 18–21°C starts feeling humid. Above 24°C (75°F) is oppressive and uncomfortable." },
  { question: "When does condensation form?", answer: "Condensation forms on surfaces that are at or below the dew point temperature. This is why cold glass 'sweats' in humid air." },
];

export default function DewPointCalc() {
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const t = parseFloat(temp) || 0;
  const rh = parseFloat(humidity) || 0;
  const tC = unit === "C" ? t : (t - 32) * 5 / 9;

  // Magnus formula
  const a = 17.625, b = 243.04;
  const alpha = (a * tC / (b + tC)) + Math.log(rh / 100);
  const dpC = (b * alpha) / (a - alpha);
  const dpF = dpC * 9 / 5 + 32;
  const dpDisplay = unit === "C" ? dpC : dpF;

  const getComfort = (dp: number) => {
    if (dp < 10) return ["Dry & Comfortable", "#3b82f6"];
    if (dp < 16) return ["Pleasant", "#10b981"];
    if (dp < 21) return ["Slightly Humid", "#f59e0b"];
    if (dp < 24) return ["Uncomfortable", "#f97316"];
    return ["Oppressive", "#ef4444"];
  };

  const [comfort, comfortColor] = temp && humidity ? getComfort(dpC) : ["-", "var(--text-muted)"];

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${unit === "C" ? "active" : ""}`} onClick={() => setUnit("C")}>Celsius</button>
        <button className={`tab-item ${unit === "F" ? "active" : ""}`} onClick={() => setUnit("F")}>Fahrenheit</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Air Temperature (°{unit})</div>
          <input type="number" className="field-input" value={temp} onChange={e => setTemp(e.target.value)} placeholder={unit === "C" ? "25" : "77"} />
        </div>
        <div>
          <div className="field-label">Relative Humidity (%)</div>
          <input type="number" className="field-input" value={humidity} onChange={e => setHumidity(e.target.value)} placeholder="65" min="1" max="100" />
        </div>
      </div>

      {temp && humidity && rh > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: (comfortColor as string) + "40", background: (comfortColor as string) + "12" }}>
            <div className="result-label">Dew Point</div>
            <div className="result-value text-3xl">{dpDisplay.toFixed(1)}°{unit}</div>
            <div className="result-sub" style={{ color: comfortColor as string }}>{comfort as string}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="result-box"><div className="result-label">°C</div><div className="result-value">{dpC.toFixed(1)}°C</div></div>
            <div className="result-box"><div className="result-label">°F</div><div className="result-value">{dpF.toFixed(1)}°F</div></div>
          </div>
          <div className="result-box">
            <div className="result-label">Spread (T − Dp)</div>
            <div className="result-value">{(tC - dpC).toFixed(1)}°C — {(tC - dpC) < 2.5 ? "⚠ Fog possible" : "Low fog risk"}</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
