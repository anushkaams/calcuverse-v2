"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  {
    question: "What is the current RBA cash rate?",
    answer: "The RBA cash rate changes at Reserve Bank board meetings. Most Australian lenders set their variable home loan rates at the cash rate plus a margin (typically 1.5–2.5%). Check the RBA website for the latest rate.",
  },
  {
    question: "What is an offset account?",
    answer: "An offset account is a transaction account linked to your home loan. Any money sitting in it reduces the loan balance on which interest is calculated. For example, a $500,000 loan with $50,000 in offset means you only pay interest on $450,000.",
  },
  {
    question: "Principal & interest vs interest-only — what's the difference?",
    answer: "Principal & interest (P&I) repayments pay down the loan balance each period. Interest-only repayments cover just the interest, leaving the principal unchanged — often used by investors for tax purposes but results in higher total cost.",
  },
  {
    question: "How much can I borrow in Australia?",
    answer: "Lenders typically cap borrowing at around 5–6x your gross annual income, but serviceability is assessed using a buffer (usually 3% above the loan rate). HECS debts, existing loans, and number of dependants all reduce borrowing capacity.",
  },
  {
    question: "What is LMI (Lenders Mortgage Insurance)?",
    answer: "LMI is insurance that protects the lender (not you) if you default. It's charged when your deposit is below 20% of the property value. Costs vary but can be $5,000–$20,000+. Some lenders waive it for medical professionals.",
  },
];

export default function AUMortgageCalc() {
  const [loanAmount, setLoanAmount] = useState("600000");
  const [rate, setRate] = useState("6.25");
  const [termYears, setTermYears] = useState("30");
  const [type, setType] = useState<"pi" | "io">("pi");
  const [offset, setOffset] = useState("0");

  const P = parseFloat(loanAmount) || 0;
  const annualRate = (parseFloat(rate) || 0) / 100;
  const months = (parseFloat(termYears) || 30) * 12;
  const offsetAmt = parseFloat(offset) || 0;
  const effectivePrincipal = Math.max(0, P - offsetAmt);
  const r = annualRate / 12;

  let monthlyRepayment = 0;
  if (type === "pi") {
    monthlyRepayment = r > 0 ? effectivePrincipal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1) : effectivePrincipal / months;
  } else {
    monthlyRepayment = effectivePrincipal * r;
  }

  const totalRepaid = monthlyRepayment * months;
  const totalInterest = type === "pi" ? totalRepaid - P : monthlyRepayment * months;
  const fortnightlyRepayment = monthlyRepayment * 12 / 26;
  const interestSavedByOffset = offsetAmt > 0 ? (P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1) - monthlyRepayment) * months : 0;

  const fmt = (n: number) => {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M";
    return "$" + n.toLocaleString("en-AU", { maximumFractionDigits: 0 });
  };

  return (
    <div className="space-y-5 py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${type === "pi" ? "active" : ""}`} onClick={() => setType("pi")}>Principal & Interest</button>
        <button className={`tab-item ${type === "io" ? "active" : ""}`} onClick={() => setType("io")}>Interest Only</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Loan Amount (AUD)</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input type="number" className="field-input field-input--prefix" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="600000" />
          </div>
        </div>
        <div>
          <div className="field-label">Interest Rate (% p.a.)</div>
          <div className="relative">
            <input type="number" className="field-input pr-7" value={rate} onChange={(e) => setRate(e.target.value)} step="0.05" placeholder="6.25" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>%</span>
          </div>
        </div>
        <div>
          <div className="field-label">Loan Term (years)</div>
          <input type="number" className="field-input" value={termYears} onChange={(e) => setTermYears(e.target.value)} placeholder="30" />
        </div>
        <div>
          <div className="field-label">Offset Account Balance</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input type="number" className="field-input field-input--prefix" value={offset} onChange={(e) => setOffset(e.target.value)} placeholder="0" />
          </div>
        </div>
      </div>

      {P > 0 && (
        <div className="space-y-3">
          <div className="result-box">
            <div className="result-label">Monthly Repayment</div>
            <div className="result-value text-3xl">${monthlyRepayment.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="result-sub">${fortnightlyRepayment.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/fortnight</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="result-box">
              <div className="result-label">Total Repaid</div>
              <div className="result-value text-base">{fmt(totalRepaid)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Total Interest</div>
              <div className="result-value text-base text-red-400">{fmt(totalInterest)}</div>
            </div>
          </div>

          {offsetAmt > 0 && interestSavedByOffset > 0 && (
            <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
              <div className="result-label">Interest Saved by Offset</div>
              <div className="result-value text-base" style={{ color: "#10b981" }}>{fmt(interestSavedByOffset)}</div>
              <div className="result-sub">Over the life of the loan</div>
            </div>
          )}

          {type === "pi" && P > 0 && (
            <div className="p-4 rounded-xl border space-y-2 text-xs" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
              <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                <span>Principal</span><span>Interest</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
                <div className="h-full flex rounded-full">
                  <div style={{ width: `${Math.min(100, (P / totalRepaid) * 100)}%`, background: "var(--accent)", transition: "width 0.4s" }} />
                  <div style={{ flex: 1, background: "#f87171" }} />
                </div>
              </div>
              <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                <span>{((P / totalRepaid) * 100).toFixed(0)}%</span>
                <span>{((totalInterest / totalRepaid) * 100).toFixed(0)}%</span>
              </div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
