"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

// ATO 2025-26 tax brackets (post Stage 3 cuts)
const TAX_BRACKETS = [
  { min: 0,       max: 18200,  rate: 0,    base: 0 },
  { min: 18201,   max: 45000,  rate: 0.16, base: 0 },
  { min: 45001,   max: 135000, rate: 0.30, base: 4288 },
  { min: 135001,  max: 190000, rate: 0.37, base: 31288 },
  { min: 190001,  max: Infinity, rate: 0.45, base: 51638 },
];

const LITO_MAX = 700;
const LITO_SHADE_START = 37500;
const LITO_SHADE_END = 45000;
const LITO_SHADE_START2 = 45001;
const LITO_SHADE_END2 = 66667;

const MEDICARE_RATE = 0.02;
const MEDICARE_SHADE_START = 26000;
const MEDICARE_SHADE_END = 32500;

const SUPER_RATE = 0.12;

function calcIncomeTax(income: number): number {
  for (const b of TAX_BRACKETS) {
    if (income <= b.max) {
      return b.base + (income - b.min + 1) * b.rate;
    }
  }
  return 0;
}

function calcLITO(income: number): number {
  if (income <= LITO_SHADE_START) return LITO_MAX;
  if (income <= LITO_SHADE_END) return LITO_MAX - (income - LITO_SHADE_START) * (LITO_MAX / (LITO_SHADE_END - LITO_SHADE_START));
  if (income <= LITO_SHADE_END2) return (LITO_SHADE_END2 - income) * (700 / (LITO_SHADE_END2 - LITO_SHADE_START2));
  return 0;
}

function calcMedicare(income: number): number {
  if (income <= MEDICARE_SHADE_START) return 0;
  if (income < MEDICARE_SHADE_END) return (income - MEDICARE_SHADE_START) * 0.1;
  return income * MEDICARE_RATE;
}

const FAQS = [
  {
    question: "What are the 2025-26 Australian income tax rates?",
    answer: "For residents: 0% on income up to $18,200; 16% from $18,201–$45,000; 30% from $45,001–$135,000; 37% from $135,001–$190,000; and 45% above $190,000. These reflect the Stage 3 tax cuts effective from 1 July 2024.",
  },
  {
    question: "What is the Medicare Levy?",
    answer: "Most Australian residents pay a 2% Medicare Levy on their taxable income to fund the public health system. Low-income earners below ~$26,000 are exempt, with a phase-in between $26,000 and $32,500.",
  },
  {
    question: "What is LITO (Low Income Tax Offset)?",
    answer: "LITO reduces the tax payable for lower earners. In 2025-26, it's worth up to $700 for incomes up to $37,500, then phases out completely by $66,667.",
  },
  {
    question: "Does my employer pay super on top of my salary?",
    answer: "Yes. From 1 July 2025 the Superannuation Guarantee rate is 12%. Your employer pays this on top of your ordinary time earnings — it does not come out of your salary.",
  },
  {
    question: "What is the tax-free threshold?",
    answer: "Australian residents can earn up to $18,200 per year without paying income tax. You should claim this threshold with your main employer on your Tax File Number declaration.",
  },
];

export default function AUIncomeTaxCalc() {
  const [income, setIncome] = useState("80000");
  const [period, setPeriod] = useState<"annual" | "hourly">("annual");
  const [hours, setHours] = useState("38");
  const [includeSuper, setIncludeSuper] = useState(false);

  const annualGross =
    period === "annual"
      ? parseFloat(income) || 0
      : (parseFloat(income) || 0) * (parseFloat(hours) || 38) * 52;

  const baseTax = calcIncomeTax(annualGross);
  const lito = calcLITO(annualGross);
  const medicare = calcMedicare(annualGross);
  const totalTax = Math.max(0, baseTax - lito) + medicare;
  const netAnnual = annualGross - totalTax;
  const super_ = annualGross * SUPER_RATE;

  const effRate = annualGross > 0 ? (totalTax / annualGross) * 100 : 0;

  const fmt = (n: number) =>
    n >= 1000 ? "$" + n.toLocaleString("en-AU", { maximumFractionDigits: 0 }) : "$" + n.toFixed(2);

  return (
    <div className="space-y-5 py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${period === "annual" ? "active" : ""}`} onClick={() => setPeriod("annual")}>Salary</button>
        <button className={`tab-item ${period === "hourly" ? "active" : ""}`} onClick={() => setPeriod("hourly")}>Hourly</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">{period === "annual" ? "Annual Income (AUD)" : "Hourly Rate (AUD)"}</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input
              type="number"
              className="field-input field-input--prefix"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder={period === "annual" ? "80000" : "40"}
            />
          </div>
        </div>
        {period === "hourly" && (
          <div>
            <div className="field-label">Hours/Week</div>
            <input
              type="number"
              className="field-input"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="38"
            />
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "var(--text-secondary)" }}>
        <input
          type="checkbox"
          checked={includeSuper}
          onChange={(e) => setIncludeSuper(e.target.checked)}
          className="accent-[var(--accent)]"
        />
        Show employer super (12%)
      </label>

      {annualGross > 0 && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl border space-y-2 text-sm" style={{ borderColor: "var(--border)" }}>
            {[
              ["Gross Income", annualGross, "var(--text-primary)"],
              ["Income Tax", -Math.max(0, baseTax - lito), "var(--text-secondary)"],
              ["Medicare Levy", -medicare, "var(--text-secondary)"],
              ["LITO Offset", lito > 0 ? lito : null, "#10b981"],
            ]
              .filter(([, val]) => val !== null)
              .map(([label, val, color]) => (
                <div key={label as string} className="flex justify-between" style={{ color: color as string }}>
                  <span>{label as string}</span>
                  <span>
                    {(val as number) < 0 ? "−" : ""}
                    {fmt(Math.abs(val as number))}
                  </span>
                </div>
              ))}
            <div
              className="flex justify-between border-t pt-2 font-medium"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              <span>Take-Home Pay</span>
              <span style={{ color: "var(--accent)" }}>{fmt(netAnnual)}</span>
            </div>
          </div>

          <div className="result-box">
            <div className="result-label">Monthly Take-Home</div>
            <div className="result-value text-3xl">{fmt(netAnnual / 12)}<span className="text-base font-normal">/mo</span></div>
            <div className="result-sub">{fmt(netAnnual / 26)}/fortnight · {fmt(netAnnual / 52)}/week</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="result-box">
              <div className="result-label">Total Tax</div>
              <div className="result-value text-base text-red-400">{fmt(totalTax)}/yr</div>
            </div>
            <div className="result-box">
              <div className="result-label">Effective Rate</div>
              <div className="result-value text-base">{effRate.toFixed(1)}%</div>
            </div>
          </div>

          {includeSuper && (
            <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
              <div className="result-label">Employer Super (12%)</div>
              <div className="result-value text-base" style={{ color: "#10b981" }}>{fmt(super_)}/yr</div>
              <div className="result-sub">Paid on top of your salary — not deducted from it</div>
            </div>
          )}

          {annualGross > 0 && (
            <div className="p-4 rounded-xl border space-y-2 text-xs" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
              <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                <span>Take-home</span><span>Tax</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
                <div className="h-full flex rounded-full">
                  <div style={{ width: `${(netAnnual / annualGross) * 100}%`, background: "var(--accent)", transition: "width 0.4s" }} />
                  <div style={{ flex: 1, background: "#f87171" }} />
                </div>
              </div>
              <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                <span>{((netAnnual / annualGross) * 100).toFixed(0)}%</span>
                <span>{effRate.toFixed(1)}%</span>
              </div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
