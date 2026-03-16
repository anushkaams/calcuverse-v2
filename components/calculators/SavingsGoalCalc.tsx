"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How does this calculator work?", answer: "Enter your savings goal, current savings, monthly contribution, and interest rate. We calculate how long it will take to reach your goal." },
  { question: "Does interest really make a big difference?", answer: "Yes! Even a modest 4% annual return significantly reduces the time needed to reach your goal, especially over long periods." },
  { question: "What savings accounts offer the best rates?", answer: "High-yield savings accounts, money market accounts, and short-term CDs often offer higher rates than traditional savings accounts." },
  { question: "What if I can't save consistently every month?", answer: "Even irregular saving helps. Try to automate what you can and treat your savings contribution like a recurring bill." },
];

export default function SavingsGoalCalc() {
  const [goal, setGoal] = useState("");
  const [current, setCurrent] = useState("");
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("4");

  const g = parseFloat(goal) || 0;
  const c = parseFloat(current) || 0;
  const m = parseFloat(monthly) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;

  let months = 0;
  if (g > c && m > 0) {
    if (r === 0) {
      months = Math.ceil((g - c) / m);
    } else {
      months = Math.ceil(Math.log((g * r + m) / (c * r + m)) / Math.log(1 + r));
    }
  }

  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const pct = g > 0 ? Math.min(100, (c / g) * 100) : 0;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Savings Goal ($)</div>
        <input type="number" className="field-input" value={goal} onChange={e => setGoal(e.target.value)} placeholder="20000" />
      </div>
      <div>
        <div className="field-label">Current Savings ($)</div>
        <input type="number" className="field-input" value={current} onChange={e => setCurrent(e.target.value)} placeholder="5000" />
      </div>
      <div>
        <div className="field-label">Monthly Contribution ($)</div>
        <input type="number" className="field-input" value={monthly} onChange={e => setMonthly(e.target.value)} placeholder="500" />
      </div>
      <div>
        <div className="field-label">Annual Interest Rate (%)</div>
        <input type="number" className="field-input" value={rate} onChange={e => setRate(e.target.value)} placeholder="4" />
      </div>

      {g > 0 && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
              <span>Progress</span><span>{pct.toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "#10b981" }} />
            </div>
          </div>
          {months > 0 && (
            <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
              <div className="result-label">Time to Reach Goal</div>
              <div className="result-value text-3xl">
                {years > 0 ? `${years}y ` : ""}{remMonths > 0 ? `${remMonths}mo` : ""}
              </div>
              <div className="result-sub">{months} total months</div>
            </div>
          )}
          {c >= g && (
            <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
              <div className="result-value">🎉 Goal Already Reached!</div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
