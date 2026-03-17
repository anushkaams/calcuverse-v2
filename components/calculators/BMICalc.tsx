"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const CATEGORIES = [
  { max: 18.5, label: "Underweight", color: "#3b82f6" },
  { max: 25, label: "Normal weight", color: "#10b981" },
  { max: 30, label: "Overweight", color: "#f59e0b" },
  { max: Infinity, label: "Obese", color: "#ef4444" },
];

const FAQS = [
  {
    question: "What is BMI?",
    answer:
      "BMI (Body Mass Index) is a number calculated from a person's weight and height. It gives a general idea of whether someone is underweight, normal, overweight, or obese.",
  },
  {
    question: "Why is BMI important?",
    answer:
      "BMI helps identify potential health risks related to weight. While it doesn't measure body fat directly, it is a simple and widely used screening tool.",
  },
  {
    question: "What are the limitations of BMI?",
    answer:
      "BMI does not account for muscle mass, bone density, or distribution of fat. Athletes or muscular individuals may have a high BMI but low body fat.",
  },
  {
    question: "How to maintain a healthy BMI?",
    answer:
      "A combination of balanced nutrition, regular physical activity, and healthy lifestyle habits helps maintain a healthy BMI.",
  },
];

export default function BMICalcPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [ft, setFt] = useState("");
  const [inches, setInches] = useState("");

  // Calculate BMI
  let bmi = 0;
  if (unit === "metric") {
    const w = parseFloat(weight),
      h = parseFloat(height) / 100;
    if (w > 0 && h > 0) bmi = w / (h * h);
  } else {
    const w = parseFloat(weight),
      h = parseFloat(ft) * 12 + parseFloat(inches || "0");
    if (w > 0 && h > 0) bmi = (703 * w) / (h * h);
  }

  const cat = CATEGORIES.find((c) => bmi < c.max) ?? CATEGORIES[3];
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));

  return (
    <div className="space-y-8   py-6 px-4">
      {/* ── Unit Selector ── */}
      <div className="tab-group">
        <button
          className={`tab-item ${unit === "metric" ? "active" : ""}`}
          onClick={() => setUnit("metric")}
        >
          Metric (kg/cm)
        </button>
        <button
          className={`tab-item ${unit === "imperial" ? "active" : ""}`}
          onClick={() => setUnit("imperial")}
        >
          Imperial (lb/ft)
        </button>
      </div>

      {/* ── Weight Input ── */}
      <div>
        <div className="field-label">
          Weight ({unit === "metric" ? "kg" : "lbs"})
        </div>
        <input
          type="number"
          className="field-input"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder={unit === "metric" ? "70" : "154"}
        />
      </div>

      {/* ── Height Input ── */}
      {unit === "metric" ? (
        <div>
          <div className="field-label">Height (cm)</div>
          <input
            type="number"
            className="field-input"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="field-label">Feet</div>
            <input
              type="number"
              className="field-input"
              value={ft}
              onChange={(e) => setFt(e.target.value)}
              placeholder="5"
            />
          </div>
          <div>
            <div className="field-label">Inches</div>
            <input
              type="number"
              className="field-input"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              placeholder="9"
            />
          </div>
        </div>
      )}

      {/* ── Ad Placeholder: After Inputs ── */}
      <div className="my-4 flex justify-center">
        {/* Replace with your AdSense code */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXX"
          data-ad-slot="YYYYYYYYYY"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>

      {/* ── BMI Result ── */}
      {bmi > 0 && (
        <div className="space-y-4">
          <div
            className="result-box"
            style={{
              borderColor: cat.color + "40",
              background: cat.color + "12",
            }}
          >
            <div className="result-label" style={{ color: cat.color }}>
              BMI Score
            </div>
            <div className="result-value text-3xl">{bmi.toFixed(1)}</div>
            <div className="result-sub" style={{ color: cat.color }}>
              {cat.label}
            </div>
          </div>

          {/* BMI scale */}
          <div className="space-y-1.5">
            <div className="h-3 rounded-full overflow-hidden flex">
              <div style={{ flex: 1, background: "#3b82f6" }} />
              <div style={{ flex: 1.3, background: "#10b981" }} />
              <div style={{ flex: 1, background: "#f59e0b" }} />
              <div style={{ flex: 1, background: "#ef4444" }} />
            </div>
            <div className="relative h-4">
              <div
                className="absolute w-0.5 h-4 rounded"
                style={{
                  left: `${pct}%`,
                  background: "white",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
            <div
              className="flex justify-between text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Ad Placeholder: After Results ── */}
      {bmi > 0 && (
        <div className="my-4 flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXX"
            data-ad-slot="ZZZZZZZZZZ"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
      )}

      {/* ── FAQ / Guide Section ── */}
      <CalculatorInfo faqs={FAQS} />

      {/* ── Ad Placeholder: After FAQ ── */}
      <div className="my-6 flex justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXX"
          data-ad-slot="WWWWWWWWWW"
          data-ad-format="fluid"
          data-ad-layout-key="-gw-3+1f-3d+2z"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    </div>
  );
}
