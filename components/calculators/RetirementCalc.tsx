"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How much do I need to retire?", answer: "A common guideline is to save 25× your annual expenses (the '4% rule'). This allows withdrawing 4% per year with a high likelihood of lasting 30+ years." },
  { question: "What is the 4% rule?", answer: "The 4% rule states you can withdraw 4% of your retirement portfolio annually with minimal risk of running out over a 30-year retirement." },
  { question: "When should I start saving for retirement?", answer: "The earlier the better. Starting at 25 vs 35 can double your final balance due to compound growth. Even small amounts early are very powerful." },
  { question: "What accounts should I use?", answer: "Maximize tax-advantaged accounts first: 401(k) (especially employer match), Roth IRA, and traditional IRA before investing in taxable accounts." },
];

export default function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retireAge, setRetireAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthly, setMonthly] = useState("");
  const [returnRate, setReturnRate] = useState("7");
  const [expenses, setExpenses] = useState("");

  const years = (parseFloat(retireAge) || 65) - (parseFloat(currentAge) || 30);
  const n = years * 12;
  const r = (parseFloat(returnRate) || 0) / 100 / 12;
  const pv = parseFloat(currentSavings) || 0;
  const pmt = parseFloat(monthly) || 0;

  const futureValue = r > 0
    ? pv * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r)
    : pv + pmt * n;

  const annualExpenses = parseFloat(expenses) || 0;
  const needed = annualExpenses * 25;
  const onTrack = futureValue >= needed;

  return (
    <div className="space-y-5   py-6 px-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Current Age</div>
          <input type="number" className="field-input" value={currentAge} onChange={e => setCurrentAge(e.target.value)} />
        </div>
        <div>
          <div className="field-label">Retirement Age</div>
          <input type="number" className="field-input" value={retireAge} onChange={e => setRetireAge(e.target.value)} />
        </div>
      </div>
      <div>
        <div className="field-label">Current Savings ($)</div>
        <input type="number" className="field-input" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="50000" />
      </div>
      <div>
        <div className="field-label">Monthly Contribution ($)</div>
        <input type="number" className="field-input" value={monthly} onChange={e => setMonthly(e.target.value)} placeholder="500" />
      </div>
      <div>
        <div className="field-label">Expected Annual Return (%)</div>
        <input type="number" className="field-input" value={returnRate} onChange={e => setReturnRate(e.target.value)} placeholder="7" />
      </div>
      <div>
        <div className="field-label">Annual Retirement Expenses ($) — optional</div>
        <input type="number" className="field-input" value={expenses} onChange={e => setExpenses(e.target.value)} placeholder="50000" />
      </div>

      {futureValue > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
            <div className="result-label">Projected Retirement Savings</div>
            <div className="result-value text-3xl">${Math.round(futureValue).toLocaleString()}</div>
            <div className="result-sub">in {years} years</div>
          </div>
          {annualExpenses > 0 && (
            <div className="result-box" style={{ borderColor: (onTrack ? "#10b981" : "#ef4444") + "40", background: (onTrack ? "#10b981" : "#ef4444") + "12" }}>
              <div className="result-label">Goal (25× expenses)</div>
              <div className="result-value">${Math.round(needed).toLocaleString()}</div>
              <div className="result-sub" style={{ color: onTrack ? "#10b981" : "#ef4444" }}>{onTrack ? "✓ On track!" : `Shortfall: $${Math.round(needed - futureValue).toLocaleString()}`}</div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
