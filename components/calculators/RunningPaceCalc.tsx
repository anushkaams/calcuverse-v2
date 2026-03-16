"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is running pace?", answer: "Running pace is expressed as time per unit distance (e.g., minutes per mile or km). It's the inverse of speed." },
  { question: "What is a good running pace?", answer: "Average recreational runners cover a mile in 9–12 minutes. Competitive runners aim for under 8 minutes, while elite marathoners run under 5 minutes per mile." },
  { question: "How do I calculate race finish time?", answer: "Multiply your pace (min/mile or min/km) by the race distance in the same unit. This calculator does that for you automatically." },
  { question: "What is a negative split?", answer: "Running the second half of a race faster than the first is a negative split — a common strategy for stronger finishes and better overall times." },
];

const RACE_DISTANCES = [
  { name: "5K", km: 5 },
  { name: "10K", km: 10 },
  { name: "Half Marathon", km: 21.0975 },
  { name: "Marathon", km: 42.195 },
];

export default function RunningPaceCalc() {
  const [mode, setMode] = useState<"pace" | "finish" | "speed">("pace");
  const [distKm, setDistKm] = useState("");
  const [hrs, setHrs] = useState("0");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState("0");
  const [paceMin, setPaceMin] = useState("");
  const [paceSec, setPaceSec] = useState("0");
  const [unit, setUnit] = useState<"km" | "mi">("km");

  const KM_PER_MI = 1.60934;
  const distMi = parseFloat(distKm) / KM_PER_MI;
  const distDisplay = unit === "km" ? parseFloat(distKm) : distMi;

  // Calculate pace from distance + finish time
  const totalSecs = (parseFloat(hrs) || 0) * 3600 + (parseFloat(mins) || 0) * 60 + (parseFloat(secs) || 0);
  const paceSecPerUnit = distDisplay > 0 ? totalSecs / distDisplay : 0;
  const paceM = Math.floor(paceSecPerUnit / 60);
  const paceS = Math.round(paceSecPerUnit % 60);

  // Calculate finish time from pace + distance
  const paceTotalSecs = (parseFloat(paceMin) || 0) * 60 + (parseFloat(paceSec) || 0);
  const finishSecs = paceTotalSecs * distDisplay;
  const finishH = Math.floor(finishSecs / 3600);
  const finishM = Math.floor((finishSecs % 3600) / 60);
  const finishS = Math.round(finishSecs % 60);

  const speedKmh = paceSecPerUnit > 0 ? 3600 / (paceSecPerUnit * (unit === "km" ? 1 : KM_PER_MI)) : 0;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "pace" ? "active" : ""}`} onClick={() => setMode("pace")}>Find Pace</button>
        <button className={`tab-item ${mode === "finish" ? "active" : ""}`} onClick={() => setMode("finish")}>Find Finish Time</button>
      </div>
      <div className="tab-group">
        <button className={`tab-item ${unit === "km" ? "active" : ""}`} onClick={() => setUnit("km")}>km</button>
        <button className={`tab-item ${unit === "mi" ? "active" : ""}`} onClick={() => setUnit("mi")}>miles</button>
      </div>

      <div>
        <div className="field-label">Distance (km)</div>
        <input type="number" className="field-input" value={distKm} onChange={e => setDistKm(e.target.value)} placeholder="10" />
        <div className="flex flex-wrap gap-2 mt-2">
          {RACE_DISTANCES.map(r => (
            <button key={r.name} onClick={() => setDistKm(String(r.km))}
              className="px-2 py-1 text-xs rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {mode === "pace" ? (
        <div>
          <div className="field-label">Finish Time (hh:mm:ss)</div>
          <div className="flex gap-2">
            <input type="number" className="field-input" value={hrs} onChange={e => setHrs(e.target.value)} placeholder="h" min="0" />
            <input type="number" className="field-input" value={mins} onChange={e => setMins(e.target.value)} placeholder="m" min="0" max="59" />
            <input type="number" className="field-input" value={secs} onChange={e => setSecs(e.target.value)} placeholder="s" min="0" max="59" />
          </div>
        </div>
      ) : (
        <div>
          <div className="field-label">Pace (min/km or min/mi)</div>
          <div className="flex gap-2">
            <input type="number" className="field-input" value={paceMin} onChange={e => setPaceMin(e.target.value)} placeholder="min" />
            <input type="number" className="field-input" value={paceSec} onChange={e => setPaceSec(e.target.value)} placeholder="sec" min="0" max="59" />
          </div>
        </div>
      )}

      {mode === "pace" && paceSecPerUnit > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
            <div className="result-label">Your Pace</div>
            <div className="result-value text-3xl">{paceM}:{String(paceS).padStart(2, "0")}<span className="text-base font-normal"> /{unit}</span></div>
          </div>
          <div className="result-box">
            <div className="result-label">Average Speed</div>
            <div className="result-value">{speedKmh.toFixed(2)} km/h · {(speedKmh / KM_PER_MI).toFixed(2)} mph</div>
          </div>
        </div>
      )}

      {mode === "finish" && finishSecs > 0 && (
        <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
          <div className="result-label">Estimated Finish Time</div>
          <div className="result-value text-3xl">
            {finishH > 0 ? `${finishH}h ` : ""}{finishM}m {String(finishS).padStart(2, "0")}s
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
