"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const GST_RATE = 0.1;

const FAQS = [
  {
    question: "What is GST?",
    answer: "GST (Goods and Services Tax) is a broad-based tax of 10% on most goods and services sold in Australia. It was introduced on 1 July 2000 and the rate has remained at 10% since.",
  },
  {
    question: "How do I add GST to a price?",
    answer: "Multiply the pre-GST price by 1.1. For example, $100 + GST = $110. Or use this calculator — enter the pre-GST amount and select 'Add GST'.",
  },
  {
    question: "How do I remove GST from a price?",
    answer: "Divide the GST-inclusive price by 1.1. For example, $110 ÷ 1.1 = $100. The GST component is the difference: $110 – $100 = $10.",
  },
  {
    question: "Which goods and services are GST-free?",
    answer: "Basic food items, most medical and health services, childcare, education courses, and exports are generally GST-free. Financial supplies are 'input taxed'. Check the ATO website for specifics.",
  },
  {
    question: "Do I need to register for GST?",
    answer: "You must register for GST if your annual turnover is $75,000 or more ($150,000 for non-profit organisations). Ride-share and taxi drivers must register regardless of turnover.",
  },
];

export default function AUGSTCalc() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const value = parseFloat(amount) || 0;
  const gstAmount = mode === "add" ? value * GST_RATE : value - value / (1 + GST_RATE);
  const result = mode === "add" ? value + gstAmount : value / (1 + GST_RATE);

  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-5 py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "add" ? "active" : ""}`} onClick={() => setMode("add")}>Add GST</button>
        <button className={`tab-item ${mode === "remove" ? "active" : ""}`} onClick={() => setMode("remove")}>Remove GST</button>
      </div>

      <div>
        <div className="field-label">{mode === "add" ? "Amount Before GST (AUD)" : "GST-Inclusive Amount (AUD)"}</div>
        <div className="relative">
          <span className="field-prefix-symbol">$</span>
          <input
            type="number"
            className="field-input field-input--prefix"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={mode === "add" ? "100.00" : "110.00"}
          />
        </div>
      </div>

      {value > 0 && (
        <div className="space-y-3">
          <div className="result-box">
            <div className="result-label">{mode === "add" ? "Total (GST Inclusive)" : "Price Before GST"}</div>
            <div className="result-value text-3xl">{fmt(result)}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="result-box">
              <div className="result-label">GST Component (10%)</div>
              <div className="result-value text-base" style={{ color: "var(--accent)" }}>{fmt(gstAmount)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">{mode === "add" ? "Original Amount" : "GST-Inc Amount"}</div>
              <div className="result-value text-base">{fmt(value)}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border text-sm space-y-2" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
            {mode === "add" ? (
              <>
                <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                  <span>Pre-GST</span><span>{fmt(value)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                  <span>GST (10%)</span><span>+ {fmt(gstAmount)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
                  <span>Total</span><span>{fmt(result)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                  <span>GST-inclusive price</span><span>{fmt(value)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                  <span>Less GST</span><span>− {fmt(gstAmount)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
                  <span>Ex-GST price</span><span>{fmt(result)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
