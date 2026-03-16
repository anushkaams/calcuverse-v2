"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is profit margin?", answer: "Profit margin shows what percentage of revenue is profit after deducting costs. Gross margin excludes operating costs; net margin includes all costs." },
  { question: "What is a good profit margin?", answer: "It varies widely by industry. Retail averages 2–5%, SaaS companies can exceed 70%, and restaurants average 3–9%." },
  { question: "How do I improve profit margin?", answer: "Raise prices, reduce costs, improve operational efficiency, or focus on higher-margin products/services." },
  { question: "Gross vs net profit margin?", answer: "Gross margin only subtracts cost of goods sold. Net margin subtracts all expenses including operating, tax, and interest costs." },
];

export default function ProfitMarginCalc() {
  const [mode, setMode] = useState<"margin" | "markup">("margin");
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");

  const r = parseFloat(revenue) || 0;
  const c = parseFloat(cost) || 0;
  const profit = r - c;
  const margin = r > 0 ? (profit / r) * 100 : 0;
  const markup = c > 0 ? (profit / c) * 100 : 0;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "margin" ? "active" : ""}`} onClick={() => setMode("margin")}>Margin</button>
        <button className={`tab-item ${mode === "markup" ? "active" : ""}`} onClick={() => setMode("markup")}>Markup</button>
      </div>

      <div>
        <div className="field-label">Revenue / Selling Price ($)</div>
        <input type="number" className="field-input" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="1000" />
      </div>
      <div>
        <div className="field-label">Cost ($)</div>
        <input type="number" className="field-input" value={cost} onChange={e => setCost(e.target.value)} placeholder="600" />
      </div>

      {r > 0 && c > 0 && (
        <div className="space-y-3">
          <div className="result-box">
            <div className="result-label">Net Profit</div>
            <div className="result-value" style={{ color: profit >= 0 ? "#10b981" : "#ef4444" }}>
              ${profit.toFixed(2)}
            </div>
          </div>
          <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
            <div className="result-label">{mode === "margin" ? "Profit Margin" : "Markup"}</div>
            <div className="result-value text-3xl">{(mode === "margin" ? margin : markup).toFixed(2)}%</div>
          </div>
          <div className="result-box">
            <div className="result-label">{mode === "margin" ? "Markup" : "Profit Margin"}</div>
            <div className="result-value">{(mode === "margin" ? markup : margin).toFixed(2)}%</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
