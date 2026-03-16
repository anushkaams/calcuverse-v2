"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How do I calculate my freelance rate?", answer: "Start with your desired annual income, then factor in taxes, business expenses, non-billable hours, and paid time off to get your true required hourly rate." },
  { question: "What are non-billable hours?", answer: "Non-billable hours include admin work, marketing, client calls, proposals, and professional development — all time you work but can't charge for." },
  { question: "What business expenses should I account for?", answer: "Software subscriptions, hardware, professional liability insurance, accounting fees, marketing, and home office expenses are common freelance costs." },
  { question: "How much should I charge for taxes?", answer: "Self-employed individuals typically pay 25–40% in taxes (income tax + self-employment tax of 15.3% in the US). Set aside at least 30% of revenue." },
];

export default function FreelanceRateCalc() {
  const [targetIncome, setTargetIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [taxRate, setTaxRate] = useState("30");
  const [weeksVacation, setWeeksVacation] = useState("2");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [billablePct, setBillablePct] = useState("70");

  const income = parseFloat(targetIncome) || 0;
  const exp = parseFloat(expenses) || 0;
  const tax = (parseFloat(taxRate) || 30) / 100;
  const workWeeks = 52 - (parseFloat(weeksVacation) || 0);
  const totalHours = workWeeks * (parseFloat(hoursPerWeek) || 40);
  const billableHours = totalHours * ((parseFloat(billablePct) || 70) / 100);

  const grossNeeded = income > 0 ? (income + exp) / (1 - tax) : 0;
  const hourlyRate = billableHours > 0 ? grossNeeded / billableHours : 0;
  const dayRate = hourlyRate * 8;
  const weekRate = hourlyRate * (parseFloat(hoursPerWeek) || 40) * ((parseFloat(billablePct) || 70) / 100);

  return (
    <div className="space-y-5 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Desired Annual Take-Home ($)</div>
        <input type="number" className="field-input" value={targetIncome} onChange={e => setTargetIncome(e.target.value)} placeholder="80000" />
      </div>
      <div>
        <div className="field-label">Annual Business Expenses ($)</div>
        <input type="number" className="field-input" value={expenses} onChange={e => setExpenses(e.target.value)} placeholder="5000" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Tax Rate (%)</div>
          <input type="number" className="field-input" value={taxRate} onChange={e => setTaxRate(e.target.value)} />
        </div>
        <div>
          <div className="field-label">Weeks Vacation</div>
          <input type="number" className="field-input" value={weeksVacation} onChange={e => setWeeksVacation(e.target.value)} />
        </div>
        <div>
          <div className="field-label">Hours/Week</div>
          <input type="number" className="field-input" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} />
        </div>
        <div>
          <div className="field-label">Billable % of Time</div>
          <input type="number" className="field-input" value={billablePct} onChange={e => setBillablePct(e.target.value)} />
        </div>
      </div>

      {hourlyRate > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
            <div className="result-label">Minimum Hourly Rate</div>
            <div className="result-value text-4xl" style={{ color: "#10b981" }}>${hourlyRate.toFixed(2)}/hr</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="result-box"><div className="result-label">Day Rate</div><div className="result-value">${dayRate.toFixed(0)}</div></div>
            <div className="result-box"><div className="result-label">Week Rate</div><div className="result-value">${weekRate.toFixed(0)}</div></div>
          </div>
          <div className="result-box"><div className="result-label">Gross Revenue Needed</div><div className="result-value">${grossNeeded.toFixed(0)}/year</div></div>
          <div className="result-box"><div className="result-label">Billable Hours / Year</div><div className="result-value">{Math.round(billableHours).toLocaleString()} hrs</div></div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
