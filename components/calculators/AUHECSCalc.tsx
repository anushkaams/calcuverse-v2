"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

// 2025-26 HECS-HELP marginal repayment thresholds (new marginal system)
const REPAYMENT_THRESHOLDS = [
  { min: 0,       max: 67000,  rate: 0 },
  { min: 67001,   max: 78000,  rate: 0.010 },
  { min: 78001,   max: 91000,  rate: 0.020 },
  { min: 91001,   max: 104000, rate: 0.025 },
  { min: 104001,  max: 117000, rate: 0.030 },
  { min: 117001,  max: 128000, rate: 0.035 },
  { min: 128001,  max: 140000, rate: 0.040 },
  { min: 140001,  max: 151000, rate: 0.045 },
  { min: 151001,  max: 165000, rate: 0.050 },
  { min: 165001,  max: Infinity, rate: 0.100 },
];

// HELP indexation rate (CPI-based, ~4% recently)
const INDEXATION_RATE = 0.038;

function calcRepayment(income: number): number {
  let repayment = 0;
  for (const t of REPAYMENT_THRESHOLDS) {
    if (income > t.min && t.rate > 0) {
      const taxableInThisBracket = Math.min(income, t.max) - t.min;
      repayment += taxableInThisBracket * t.rate;
    }
  }
  return repayment;
}

const FAQS = [
  {
    question: "How does the new 2025-26 HECS-HELP repayment system work?",
    answer: "From 2025-26, repayments use a marginal system — you only pay on income above each threshold, not on your total income. For example, at $80,000 income you pay 1% on income between $67,001 and $78,000, and 2% on income between $78,001 and $80,000.",
  },
  {
    question: "When does my HECS repayment start?",
    answer: "Repayments begin when your repayment income exceeds the minimum threshold (currently $67,000 in 2025-26). Your employer withholds the amount from your pay if you've indicated you have a HELP debt.",
  },
  {
    question: "What is HELP indexation?",
    answer: "Your HELP debt is indexed to inflation (CPI) on 1 June each year. In recent years this has been around 3-4%. Indexation is applied to the remaining debt before your repayment credits are applied.",
  },
  {
    question: "Can I make voluntary repayments?",
    answer: "Yes. You can make voluntary repayments to the ATO at any time to reduce your HELP debt faster. Unlike previous years, there is no longer a bonus for voluntary repayments — you simply reduce the debt directly.",
  },
  {
    question: "Does HECS affect my borrowing capacity?",
    answer: "Yes. Lenders factor your HECS repayment obligations into their serviceability assessments, which reduces how much you can borrow for a home loan.",
  },
];

export default function AUHECSCalc() {
  const [income, setIncome] = useState("80000");
  const [debt, setDebt] = useState("25000");
  const [years, setYears] = useState("");

  const annualIncome = parseFloat(income) || 0;
  const totalDebt = parseFloat(debt) || 0;

  const annualRepayment = calcRepayment(annualIncome);
  const monthlyRepayment = annualRepayment / 12;
  const fortnightlyRepayment = annualRepayment / 26;

  // Estimate years to repay (with indexation)
  let remainingDebt = totalDebt;
  let yearsToRepay = 0;
  if (annualRepayment > 0 && totalDebt > 0) {
    while (remainingDebt > 0 && yearsToRepay < 40) {
      remainingDebt = remainingDebt * (1 + INDEXATION_RATE) - annualRepayment;
      yearsToRepay++;
    }
    if (remainingDebt > 0) yearsToRepay = 40; // cap
  }

  const effectiveRate = annualIncome > 0 ? (annualRepayment / annualIncome) * 100 : 0;

  const fmt = (n: number) => "$" + n.toLocaleString("en-AU", { maximumFractionDigits: 0 });

  return (
    <div className="space-y-5 py-6 px-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Annual Income (AUD)</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input type="number" className="field-input field-input--prefix" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="80000" />
          </div>
        </div>
        <div>
          <div className="field-label">HELP Debt Remaining</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input type="number" className="field-input field-input--prefix" value={debt} onChange={(e) => setDebt(e.target.value)} placeholder="25000" />
          </div>
        </div>
      </div>

      {annualIncome > 0 && (
        <div className="space-y-3">
          {annualIncome <= 67000 ? (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface-2)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
              Your income is below the $67,000 repayment threshold. No HECS repayments required this year.
            </div>
          ) : (
            <>
              <div className="result-box">
                <div className="result-label">Annual Repayment</div>
                <div className="result-value text-3xl">{fmt(annualRepayment)}</div>
                <div className="result-sub">{effectiveRate.toFixed(2)}% of your income</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="result-box">
                  <div className="result-label">Per Fortnight</div>
                  <div className="result-value text-base">{fmt(fortnightlyRepayment)}</div>
                </div>
                <div className="result-box">
                  <div className="result-label">Per Month</div>
                  <div className="result-value text-base">{fmt(monthlyRepayment)}</div>
                </div>
              </div>
            </>
          )}

          {totalDebt > 0 && annualRepayment > 0 && (
            <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
              <div className="result-label">Estimated Payoff Time</div>
              <div className="result-value text-2xl" style={{ color: "#f59e0b" }}>
                {yearsToRepay >= 40 ? "40+ years" : `~${yearsToRepay} year${yearsToRepay !== 1 ? "s" : ""}`}
              </div>
              <div className="result-sub">Includes ~{(INDEXATION_RATE * 100).toFixed(1)}% annual indexation</div>
            </div>
          )}

          <div className="p-4 rounded-xl border text-xs space-y-1" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
            <div className="font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Repayment breakdown (marginal)</div>
            {REPAYMENT_THRESHOLDS.filter((t) => t.rate > 0 && annualIncome > t.min).map((t, i) => {
              const top = Math.min(annualIncome, t.max);
              const base = t.min;
              const amount = (top - base) * t.rate;
              return (
                <div key={i} className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                  <span>{(t.rate * 100).toFixed(1)}% on ${(base + 1).toLocaleString()}–${top === Infinity ? "+" : top.toLocaleString()}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{fmt(amount)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
