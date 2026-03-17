"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is VAT?", answer: "VAT (Value Added Tax) is a consumption tax placed on a product at each stage of production. It is collected by businesses on behalf of the government." },
  { question: "How do I calculate VAT?", answer: "To add VAT: multiply the price by (1 + VAT rate/100). To remove VAT: divide the price by (1 + VAT rate/100)." },
  { question: "What are common VAT rates?", answer: "Common rates vary by country: UK is 20%, EU averages 20–25%, Australia GST is 10%, and the US uses sales tax which varies by state." },
  { question: "What is the difference between tax-inclusive and tax-exclusive pricing?", answer: "Tax-exclusive pricing shows the price before tax is added. Tax-inclusive pricing already includes the tax in the displayed price." },
];

export default function VATCalc() {
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("10");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const p = parseFloat(price) || 0;
  const r = parseFloat(rate) || 0;
  const taxAmount = mode === "add" ? p * (r / 100) : p - p / (1 + r / 100);
  const total = mode === "add" ? p + taxAmount : p - taxAmount;
  const base = mode === "add" ? p : p / (1 + r / 100);

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "add" ? "active" : ""}`} onClick={() => setMode("add")}>Add Tax</button>
        <button className={`tab-item ${mode === "remove" ? "active" : ""}`} onClick={() => setMode("remove")}>Remove Tax</button>
      </div>

      <div>
        <div className="field-label">{mode === "add" ? "Pre-tax Price" : "Tax-inclusive Price"}</div>
        <input type="number" className="field-input" value={price} onChange={e => setPrice(e.target.value)} placeholder="100" />
      </div>

      <div>
        <div className="field-label">Tax Rate (%)</div>
        <input type="number" className="field-input" value={rate} onChange={e => setRate(e.target.value)} placeholder="10" />
      </div>

      {p > 0 && (
        <div className="space-y-3">
          <div className="result-box">
            <div className="result-label">Base Price</div>
            <div className="result-value">${base.toFixed(2)}</div>
          </div>
          <div className="result-box">
            <div className="result-label">Tax Amount ({rate}%)</div>
            <div className="result-value">${Math.abs(taxAmount).toFixed(2)}</div>
          </div>
          <div className="result-box" style={{ borderColor: "var(--accent, #6366f1)40", background: "var(--accent, #6366f1)12" }}>
            <div className="result-label">{mode === "add" ? "Total (inc. Tax)" : "Pre-tax Price"}</div>
            <div className="result-value text-3xl">${(mode === "add" ? total : base).toFixed(2)}</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
