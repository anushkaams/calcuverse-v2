"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What deductions come out of my paycheck?", answer: "Common deductions include federal income tax, state income tax, Social Security (6.2%), Medicare (1.45%), health insurance, and retirement contributions." },
  { question: "What is gross vs net pay?", answer: "Gross pay is your total earnings before deductions. Net pay (take-home pay) is what you actually receive after all deductions." },
  { question: "How does tax filing status affect my paycheck?", answer: "Filing as Single results in more tax withheld. Married filing jointly usually results in less withholding. Claiming dependents also reduces withholding." },
  { question: "What is the Social Security wage base?", answer: "Social Security tax (6.2%) only applies to the first $168,600 of income (2024). Medicare tax (1.45%) applies to all wages, plus 0.9% for high earners." },
];

export default function PaycheckCalc() {
  const [salary, setSalary] = useState("");
  const [period, setPeriod] = useState<"annual" | "hourly">("annual");
  const [hours, setHours] = useState("40");
  const [federal, setFederal] = useState("22");
  const [state, setState] = useState("5");
  const [retirement, setRetirement] = useState("5");

  const annualGross = period === "annual"
    ? parseFloat(salary) || 0
    : (parseFloat(salary) || 0) * (parseFloat(hours) || 40) * 52;

  const federalTax = annualGross * ((parseFloat(federal) || 0) / 100);
  const stateTax = annualGross * ((parseFloat(state) || 0) / 100);
  const socialSecurity = Math.min(annualGross, 168600) * 0.062;
  const medicare = annualGross * 0.0145;
  const retirementAmt = annualGross * ((parseFloat(retirement) || 0) / 100);
  const totalDeductions = federalTax + stateTax + socialSecurity + medicare + retirementAmt;
  const netAnnual = annualGross - totalDeductions;
  const netMonthly = netAnnual / 12;
  const netBiweekly = netAnnual / 26;

  return (
    <div className="space-y-5 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${period === "annual" ? "active" : ""}`} onClick={() => setPeriod("annual")}>Salary</button>
        <button className={`tab-item ${period === "hourly" ? "active" : ""}`} onClick={() => setPeriod("hourly")}>Hourly</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">{period === "annual" ? "Annual Salary ($)" : "Hourly Rate ($)"}</div>
          <input type="number" className="field-input" value={salary} onChange={e => setSalary(e.target.value)} placeholder={period === "annual" ? "60000" : "25"} />
        </div>
        {period === "hourly" && (
          <div>
            <div className="field-label">Hours/Week</div>
            <input type="number" className="field-input" value={hours} onChange={e => setHours(e.target.value)} placeholder="40" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <div className="field-label">Federal Tax %</div>
          <input type="number" className="field-input" value={federal} onChange={e => setFederal(e.target.value)} />
        </div>
        <div>
          <div className="field-label">State Tax %</div>
          <input type="number" className="field-input" value={state} onChange={e => setState(e.target.value)} />
        </div>
        <div>
          <div className="field-label">401k/IRA %</div>
          <input type="number" className="field-input" value={retirement} onChange={e => setRetirement(e.target.value)} />
        </div>
      </div>

      {annualGross > 0 && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl border space-y-2 text-sm" style={{ borderColor: "var(--border)" }}>
            {[
              ["Gross Annual", annualGross, ""],
              ["Federal Tax", -federalTax, "var(--text-secondary)"],
              ["State Tax", -stateTax, "var(--text-secondary)"],
              ["Social Security", -socialSecurity, "var(--text-secondary)"],
              ["Medicare", -medicare, "var(--text-secondary)"],
              ["Retirement", -retirementAmt, "var(--text-secondary)"],
            ].map(([label, val, color]) => (
              <div key={label as string} className="flex justify-between" style={{ color: (color as string) || "var(--text-primary)" }}>
                <span>{label as string}</span>
                <span>{(val as number) < 0 ? "-" : ""}${Math.abs(val as number).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
            <div className="result-label">Take-Home Pay</div>
            <div className="result-value text-3xl">${netMonthly.toFixed(2)}<span className="text-base font-normal">/mo</span></div>
            <div className="result-sub">${netBiweekly.toFixed(2)}/biweekly · ${netAnnual.toFixed(2)}/yr</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
