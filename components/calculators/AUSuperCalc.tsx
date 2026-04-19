"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const SG_RATE = 0.12; // 2025-26 Super Guarantee rate
const SUPER_TAX = 0.15; // Contributions tax inside fund
const EARNINGS_TAX = 0.15; // Earnings tax inside fund

const FAQS = [
  {
    question: "What is the Superannuation Guarantee rate in 2025-26?",
    answer: "The Super Guarantee (SG) rate is 12% from 1 July 2025. Your employer must pay 12% of your ordinary time earnings into your nominated super fund on top of your salary.",
  },
  {
    question: "What is salary sacrifice?",
    answer: "Salary sacrifice lets you redirect pre-tax salary into super, reducing your taxable income. Combined with employer SG contributions, total concessional contributions are capped at $30,000 per year in 2025-26.",
  },
  {
    question: "How is super taxed?",
    answer: "Contributions (concessional) are taxed at 15% inside the fund. Investment earnings are also taxed at 15%. High earners (income + super above $250,000) pay an additional 15% Division 293 tax on contributions.",
  },
  {
    question: "When can I access my super?",
    answer: "Generally at your preservation age (60 for anyone born after 1 July 1964) when you retire. Early access is available for severe financial hardship, terminal illness, or compassionate grounds approved by the ATO.",
  },
  {
    question: "What is the concessional contributions cap?",
    answer: "In 2025-26, total concessional (pre-tax) contributions — employer SG plus any salary sacrifice — are capped at $30,000 per year. Contributions above this are taxed at your marginal rate instead of 15%.",
  },
];

export default function AUSuperCalc() {
  const [salary, setSalary] = useState("80000");
  const [currentBalance, setCurrentBalance] = useState("50000");
  const [age, setAge] = useState("35");
  const [retireAge, setRetireAge] = useState("67");
  const [extraContrib, setExtraContrib] = useState("0");
  const [growth, setGrowth] = useState("7");

  const annualSalary = parseFloat(salary) || 0;
  const balance = parseFloat(currentBalance) || 0;
  const currentAge = parseFloat(age) || 35;
  const retirementAge = parseFloat(retireAge) || 67;
  const extra = parseFloat(extraContrib) || 0;
  const growthRate = (parseFloat(growth) || 7) / 100;

  const years = Math.max(0, retirementAge - currentAge);
  const employerSuper = annualSalary * SG_RATE;
  const totalAnnualContrib = (employerSuper + extra) * (1 - SUPER_TAX);
  const netGrowth = growthRate - EARNINGS_TAX * growthRate;

  // Future value with annual contributions
  let projected = balance;
  for (let i = 0; i < years; i++) {
    projected = projected * (1 + netGrowth) + totalAnnualContrib;
  }

  const totalContributed = balance + totalAnnualContrib * years;
  const growthEarned = projected - totalContributed;

  const fmt = (n: number) => {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M";
    if (n >= 1000) return "$" + n.toLocaleString("en-AU", { maximumFractionDigits: 0 });
    return "$" + n.toFixed(0);
  };

  const concCapWarning = employerSuper + extra > 30000;

  return (
    <div className="space-y-5 py-6 px-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Annual Salary (AUD)</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input type="number" className="field-input field-input--prefix" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="80000" />
          </div>
        </div>
        <div>
          <div className="field-label">Current Super Balance</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input type="number" className="field-input field-input--prefix" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} placeholder="50000" />
          </div>
        </div>
        <div>
          <div className="field-label">Current Age</div>
          <input type="number" className="field-input" value={age} onChange={(e) => setAge(e.target.value)} placeholder="35" />
        </div>
        <div>
          <div className="field-label">Retirement Age</div>
          <input type="number" className="field-input" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} placeholder="67" />
        </div>
        <div>
          <div className="field-label">Extra Contributions/yr</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input type="number" className="field-input field-input--prefix" value={extraContrib} onChange={(e) => setExtraContrib(e.target.value)} placeholder="0" />
          </div>
        </div>
        <div>
          <div className="field-label">Expected Growth Rate</div>
          <div className="relative">
            <input type="number" className="field-input pr-7" value={growth} onChange={(e) => setGrowth(e.target.value)} placeholder="7" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>%</span>
          </div>
        </div>
      </div>

      {concCapWarning && (
        <div className="px-4 py-3 rounded-xl text-xs" style={{ background: "#f59e0b20", color: "#f59e0b", border: "1px solid #f59e0b40" }}>
          ⚠️ Total concessional contributions may exceed the $30,000 cap. Excess is taxed at your marginal rate.
        </div>
      )}

      {annualSalary > 0 && years > 0 && (
        <div className="space-y-3">
          <div className="result-box">
            <div className="result-label">Projected Balance at {retirementAge}</div>
            <div className="result-value text-3xl">{fmt(projected)}</div>
            <div className="result-sub">Over {years} years · {growthRate * 100}% p.a. growth</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="result-box">
              <div className="result-label">Employer SG</div>
              <div className="result-value text-sm">{fmt(employerSuper)}/yr</div>
            </div>
            <div className="result-box">
              <div className="result-label">Contributed</div>
              <div className="result-value text-sm">{fmt(totalContributed)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Growth</div>
              <div className="result-value text-sm" style={{ color: "#10b981" }}>{fmt(Math.max(0, growthEarned))}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border space-y-2 text-xs" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
            <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
              <span>Contributions</span><span>Growth</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
              <div className="h-full flex rounded-full">
                <div style={{ width: `${Math.min(100, (totalContributed / projected) * 100)}%`, background: "var(--accent)", transition: "width 0.4s" }} />
                <div style={{ flex: 1, background: "#10b981" }} />
              </div>
            </div>
            <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
              <span>{Math.min(100, ((totalContributed / projected) * 100)).toFixed(0)}%</span>
              <span>{Math.max(0, ((growthEarned / projected) * 100)).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
