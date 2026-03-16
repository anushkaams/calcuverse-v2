"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is break-even analysis?", answer: "Break-even analysis determines the sales volume at which total revenue equals total costs — meaning no profit or loss. It helps businesses plan pricing and sales targets." },
  { question: "What are fixed costs?", answer: "Fixed costs remain constant regardless of output, such as rent, salaries, and insurance." },
  { question: "What are variable costs?", answer: "Variable costs change with production volume, like raw materials, packaging, or shipping per unit." },
  { question: "How can I lower my break-even point?", answer: "Reduce fixed costs, lower variable cost per unit, or increase the selling price. Each approach shifts the point where you start making profit." },
];

export default function BreakEvenCalc() {
  const [fixed, setFixed] = useState("");
  const [varCost, setVarCost] = useState("");
  const [price, setPrice] = useState("");

  const f = parseFloat(fixed) || 0;
  const v = parseFloat(varCost) || 0;
  const p = parseFloat(price) || 0;
  const margin = p - v;
  const units = margin > 0 ? Math.ceil(f / margin) : 0;
  const revenue = units * p;
  const marginPct = p > 0 ? (margin / p) * 100 : 0;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Fixed Costs ($)</div>
        <input type="number" className="field-input" value={fixed} onChange={e => setFixed(e.target.value)} placeholder="5000" />
      </div>
      <div>
        <div className="field-label">Variable Cost per Unit ($)</div>
        <input type="number" className="field-input" value={varCost} onChange={e => setVarCost(e.target.value)} placeholder="12" />
      </div>
      <div>
        <div className="field-label">Selling Price per Unit ($)</div>
        <input type="number" className="field-input" value={price} onChange={e => setPrice(e.target.value)} placeholder="25" />
      </div>

      {f > 0 && p > v && (
        <div className="space-y-3">
          <div className="result-box">
            <div className="result-label">Contribution Margin</div>
            <div className="result-value">${margin.toFixed(2)} / unit ({marginPct.toFixed(1)}%)</div>
          </div>
          <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
            <div className="result-label">Break-even Units</div>
            <div className="result-value text-3xl">{units.toLocaleString()}</div>
          </div>
          <div className="result-box">
            <div className="result-label">Break-even Revenue</div>
            <div className="result-value">${revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      )}
      {margin <= 0 && p > 0 && v > 0 && (
        <div className="result-box" style={{ borderColor: "#ef444440", background: "#ef444412" }}>
          <div className="result-value" style={{ color: "#ef4444" }}>Selling price must exceed variable cost</div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
