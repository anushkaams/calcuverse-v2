"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How much house can I afford?", answer: "A common rule is that your monthly mortgage payment should not exceed 28% of your gross monthly income. Total debt payments should stay under 36%." },
  { question: "What is a down payment?", answer: "A down payment is an upfront payment toward the home price. A 20% down payment avoids private mortgage insurance (PMI)." },
  { question: "What factors affect mortgage rates?", answer: "Credit score, loan-to-value ratio, loan type, term length, and broader economic conditions all influence your mortgage rate." },
  { question: "What is PMI?", answer: "Private Mortgage Insurance is required when your down payment is less than 20%. It protects the lender if you default, typically costing 0.5–1% of the loan per year." },
];

export default function MortgageAffordCalc() {
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");
  const [down, setDown] = useState("");
  const [rate, setRate] = useState("7");
  const [term, setTerm] = useState("30");

  const monthlyIncome = (parseFloat(income) || 0) / 12;
  const monthlyDebt = parseFloat(debt) || 0;
  const downPayment = parseFloat(down) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(term) || 30) * 12;

  const maxPayment = monthlyIncome * 0.28 - monthlyDebt;
  const maxLoan = maxPayment > 0 && r > 0
    ? maxPayment * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)))
    : 0;
  const maxHome = maxLoan + downPayment;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Annual Gross Income ($)</div>
        <input type="number" className="field-input" value={income} onChange={e => setIncome(e.target.value)} placeholder="80000" />
      </div>
      <div>
        <div className="field-label">Monthly Debt Payments ($)</div>
        <input type="number" className="field-input" value={debt} onChange={e => setDebt(e.target.value)} placeholder="300" />
      </div>
      <div>
        <div className="field-label">Down Payment ($)</div>
        <input type="number" className="field-input" value={down} onChange={e => setDown(e.target.value)} placeholder="40000" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Interest Rate (%)</div>
          <input type="number" className="field-input" value={rate} onChange={e => setRate(e.target.value)} placeholder="7" />
        </div>
        <div>
          <div className="field-label">Term (years)</div>
          <select className="field-input" value={term} onChange={e => setTerm(e.target.value)}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>

      {maxHome > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
            <div className="result-label">Estimated Affordable Home Price</div>
            <div className="result-value text-3xl">${Math.round(maxHome).toLocaleString()}</div>
          </div>
          <div className="result-box">
            <div className="result-label">Max Monthly Payment</div>
            <div className="result-value">${Math.max(0, maxPayment).toFixed(2)}</div>
          </div>
          <div className="result-box">
            <div className="result-label">Max Loan Amount</div>
            <div className="result-value">${Math.round(maxLoan).toLocaleString()}</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
