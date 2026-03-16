"use client";
import { useState } from "react";

type Solve = "speed" | "distance" | "time";

export default function SpeedCalc() {
  const [solve, setSolve] = useState<Solve>("speed");
  const [speed, setSpeed] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [unit, setUnit] = useState("km/h");

  const s = parseFloat(speed), d = parseFloat(distance), t = parseFloat(time);
  let result = NaN;
  if (solve === "speed" && !isNaN(d) && !isNaN(t)) result = d/t;
  if (solve === "distance" && !isNaN(s) && !isNaN(t)) result = s*t;
  if (solve === "time" && !isNaN(d) && !isNaN(s)) result = d/s;

  const labels: Record<Solve, string> = { speed: unit, distance: unit === "km/h" ? "km" : "miles", time: "hours" };

  return (
    <div className="space-y-4">
      <div>
        <div className="field-label">Solve for</div>
        <div className="tab-group">
          {(["speed","distance","time"] as Solve[]).map(s=>(
            <button key={s} className={`tab-item capitalize ${solve===s?"active":""}`} onClick={()=>setSolve(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="field-label">Unit system</div>
        <div className="tab-group">
          <button className={`tab-item ${unit==="km/h"?"active":""}`} onClick={()=>setUnit("km/h")}>Metric (km/h)</button>
          <button className={`tab-item ${unit==="mph"?"active":""}`} onClick={()=>setUnit("mph")}>Imperial (mph)</button>
        </div>
      </div>

      {solve !== "speed" && (
        <div>
          <div className="field-label">Speed ({unit})</div>
          <input type="number" className="field-input" value={speed} onChange={e=>setSpeed(e.target.value)} placeholder={unit} />
        </div>
      )}
      {solve !== "distance" && (
        <div>
          <div className="field-label">Distance ({unit==="km/h"?"km":"miles"})</div>
          <input type="number" className="field-input" value={distance} onChange={e=>setDistance(e.target.value)} placeholder={unit==="km/h"?"km":"miles"} />
        </div>
      )}
      {solve !== "time" && (
        <div>
          <div className="field-label">Time (hours)</div>
          <input type="number" className="field-input" value={time} onChange={e=>setTime(e.target.value)} placeholder="hours" />
        </div>
      )}

      <div className="result-box">
        <div className="result-label capitalize">{solve}</div>
        <div className="result-value text-3xl">
          {!isNaN(result) && isFinite(result) ? `${parseFloat(result.toPrecision(6))} ${labels[solve]}` : "—"}
        </div>
      </div>
    </div>
  );
}
