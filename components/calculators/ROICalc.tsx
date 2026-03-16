"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is ROI?", answer: "ROI (Return on Investment) measures the profitability of an investment relative to its cost. A higher ROI means a better return for every dollar invested." },
  { question: "What is a good ROI?", answer: "A 'good' ROI depends on the context. Stock market average is ~7-10% annually. Real estate typically yields 8-12%. Any positive ROI is generally profitable." },
  { question: "How is ROI calculated?", answer: "ROI = ((Net Return – Cost of Investment) / Cost of Investment) × 100. It expresses profit as a percentage of the investment." },
  { question: "What is annualized ROI?", answer: "Annualized ROI accounts for the duration of the investment, letting you compare returns across different time periods on an equal basis." },
];

export default function ROICalc() {
  const [initial, setInitial] = useState("");
  const [finalVal, setFinalVal] = useState("");
  const [years, setYears] = useState("");

  const init = parseFloat(initial) || 0;
  const fin = parseFloat(finalVal) || 0;
  const yrs = parseFloat(years) || 0;

  const gain = fin - init;
  const roi = init > 0 ? (gain / init) * 100 : 0;
  const annualized = init > 0 && yrs > 0 ? (Math.pow(fin / init, 1 / yrs) - 1) * 100 : 0;
  const positive = gain >= 0;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Initial Investment ($)</div>
        <input type="number" className="field-input" value={initial} onChange={e => setInitial(e.target.value)} placeholder="10000" />
      </div>
      <div>
        <div className="field-label">Final Value ($)</div>
        <input type="number" className="field-input" value={finalVal} onChange={e => setFinalVal(e.target.value)} placeholder="15000" />
      </div>
      <div>
        <div className="field-label">Duration (years, optional)</div>
        <input type="number" className="field-input" value={years} onChange={e => setYears(e.target.value)} placeholder="3" />
      </div>

      {init > 0 && fin > 0 && (
        <div className="space-y-3">
          <div className="result-box">
            <div className="result-label">Net Gain / Loss</div>
            <div className="result-value" style={{ color: positive ? "#10b981" : "#ef4444" }}>
              {positive ? "+" : ""}${gain.toFixed(2)}
            </div>
          </div>
          <div className="result-box" style={{ borderColor: (positive ? "#10b981" : "#ef4444") + "40", background: (positive ? "#10b981" : "#ef4444") + "12" }}>
            <div className="result-label">ROI</div>
            <div className="result-value text-3xl" style={{ color: positive ? "#10b981" : "#ef4444" }}>
              {positive ? "+" : ""}{roi.toFixed(2)}%
            </div>
          </div>
          {yrs > 0 && (
            <div className="result-box">
              <div className="result-label">Annualized ROI</div>
              <div className="result-value">{annualized.toFixed(2)}% / year</div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
