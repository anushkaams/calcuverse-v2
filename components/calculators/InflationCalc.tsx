"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is inflation?", answer: "Inflation is the general rise in prices over time, which erodes the purchasing power of money. A dollar today buys less than it did 10 years ago." },
  { question: "How is inflation measured?", answer: "Inflation is commonly tracked using the Consumer Price Index (CPI), which measures price changes of a basket of goods and services." },
  { question: "What is the average historical inflation rate?", answer: "In the US, inflation has historically averaged around 3% per year over the long term, though it varies significantly by period." },
  { question: "How can I protect against inflation?", answer: "Investing in assets that grow with or above inflation — like stocks, real estate, TIPS bonds, or I-bonds — helps preserve purchasing power." },
];

export default function InflationCalc() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("10");
  const [mode, setMode] = useState<"future" | "past">("future");

  const a = parseFloat(amount) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const y = parseFloat(years) || 0;

  const result = mode === "future"
    ? a * Math.pow(1 + r, y)
    : a / Math.pow(1 + r, y);

  const change = result - a;
  const pctChange = a > 0 ? (change / a) * 100 : 0;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "future" ? "active" : ""}`} onClick={() => setMode("future")}>Future Value</button>
        <button className={`tab-item ${mode === "past" ? "active" : ""}`} onClick={() => setMode("past")}>Past Value</button>
      </div>

      <div>
        <div className="field-label">{mode === "future" ? "Today's Amount ($)" : "Future Amount ($)"}</div>
        <input type="number" className="field-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1000" />
      </div>
      <div>
        <div className="field-label">Annual Inflation Rate (%)</div>
        <input type="number" className="field-input" value={rate} onChange={e => setRate(e.target.value)} placeholder="3" />
      </div>
      <div>
        <div className="field-label">Number of Years</div>
        <input type="number" className="field-input" value={years} onChange={e => setYears(e.target.value)} placeholder="10" />
      </div>

      {a > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
            <div className="result-label">{mode === "future" ? `Value in ${y} years` : `Equivalent ${y} years ago`}</div>
            <div className="result-value text-3xl">${result.toFixed(2)}</div>
          </div>
          <div className="result-box">
            <div className="result-label">Purchasing Power {mode === "future" ? "Lost" : "Gained"}</div>
            <div className="result-value">${Math.abs(change).toFixed(2)} ({Math.abs(pctChange).toFixed(1)}%)</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
