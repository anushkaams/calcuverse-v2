"use client";
import { useState } from "react";

export default function WaterIntakeCalc() {
  const [weight, setWeight] = useState("70");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("temperate");

  const w = parseFloat(weight) || 0;
  const wKg = unit === "kg" ? w : w * 0.453592;

  // Base: ~35ml per kg
  let base = wKg * 35;
  if (activity === "light") base *= 1;
  if (activity === "moderate") base *= 1.1;
  if (activity === "intense") base *= 1.2;
  if (climate === "hot") base *= 1.1;
  if (climate === "cold") base *= 0.95;

  const liters = base / 1000;
  const cups = liters * 4.22675;
  const oz = liters * 33.814;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Body Weight</div>
          <input
            type="number"
            className="field-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
          />
        </div>
        <div>
          <div className="field-label">Unit</div>
          <div className="tab-group">
            <button
              className={`tab-item ${unit === "kg" ? "active" : ""}`}
              onClick={() => setUnit("kg")}
            >
              kg
            </button>
            <button
              className={`tab-item ${unit === "lbs" ? "active" : ""}`}
              onClick={() => setUnit("lbs")}
            >
              lbs
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="field-label">Activity Level</div>
        <div className="space-y-1.5">
          {[
            { id: "light", label: "💤 Light - mostly sedentary" },
            { id: "moderate", label: "🚶 Moderate - some exercise" },
            { id: "intense", label: "🏋️ Intense - heavy exercise" },
          ].map((a) => (
            <button
              key={a.id}
              onClick={() => setActivity(a.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${activity === a.id ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border)] bg-[var(--surface-2)]"}`}
              style={{ color: "var(--text-secondary)" }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="field-label">Climate</div>
        <div className="tab-group">
          {[
            { id: "cold", label: "❄️ Cold" },
            { id: "temperate", label: "🌤 Mild" },
            { id: "hot", label: "☀️ Hot" },
          ].map((c) => (
            <button
              key={c.id}
              className={`tab-item ${climate === c.id ? "active" : ""}`}
              onClick={() => setClimate(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="result-box">
        <div className="result-label">Daily Intake Recommendation</div>
        <div className="result-value text-3xl">{liters.toFixed(1)} L</div>
        <div className="result-sub">
          {cups.toFixed(1)} cups · {oz.toFixed(0)} fl oz
        </div>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 8 }).map((_, i) => {
          // Each cup represents 1/8 of total recommended liters
          const cupLiters = liters / 8;
          // Determine height: 100% full if this cup is fully reached, partial for the last cup
          const fullCups = Math.floor(liters); // full cups
          const partial = liters - fullCups; // remaining fraction

          let heightPercent = 0;
          if (i < fullCups)
            heightPercent = 100; // full cup
          else if (i === fullCups)
            heightPercent = partial * 100; // partially filled cup
          else heightPercent = 0; // empty cup

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: "40px", background: "var(--surface-3)" }}
              >
                <div
                  className="w-full rounded-full"
                  style={{
                    height: `${heightPercent}%`,
                    background: "var(--accent)",
                    marginTop: "auto",
                    transition: "height 0.5s",
                  }}
                />
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {i + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
