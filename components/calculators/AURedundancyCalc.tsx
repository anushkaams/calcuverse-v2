"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

// Fair Work redundancy pay scale (years of continuous service → weeks of pay)
const REDUNDANCY_SCALE = [
  { minYears: 1,  maxYears: 2,  weeks: 4 },
  { minYears: 2,  maxYears: 3,  weeks: 6 },
  { minYears: 3,  maxYears: 4,  weeks: 7 },
  { minYears: 4,  maxYears: 5,  weeks: 8 },
  { minYears: 5,  maxYears: 6,  weeks: 10 },
  { minYears: 6,  maxYears: 7,  weeks: 11 },
  { minYears: 7,  maxYears: 8,  weeks: 13 },
  { minYears: 8,  maxYears: 9,  weeks: 14 },
  { minYears: 9,  maxYears: 10, weeks: 16 },
  { minYears: 10, maxYears: Infinity, weeks: 12 }, // capped at 12 for 10+ years (genuine redundancy)
];

// Notice period entitlements (continuous service)
const NOTICE_SCALE = [
  { minYears: 0,  maxYears: 1,   weeks: 1 },
  { minYears: 1,  maxYears: 3,   weeks: 2 },
  { minYears: 3,  maxYears: 5,   weeks: 3 },
  { minYears: 5,  maxYears: Infinity, weeks: 4 },
];

function getRedundancyWeeks(years: number): number {
  if (years < 1) return 0;
  for (const s of REDUNDANCY_SCALE) {
    if (years >= s.minYears && years < s.maxYears) return s.weeks;
  }
  return 12;
}

function getNoticeWeeks(years: number, over45: boolean): number {
  let base = 0;
  for (const s of NOTICE_SCALE) {
    if (years >= s.minYears && years < s.maxYears) { base = s.weeks; break; }
  }
  if (over45 && years >= 2) base += 1; // extra week if over 45 with 2+ years service
  return base;
}

const FAQS = [
  {
    question: "Who is entitled to redundancy pay in Australia?",
    answer: "Employees covered by the National Employment Standards (NES) with 1+ year of continuous service are entitled to redundancy pay when their position is made redundant. Casual employees and some small business employees (under 15 employees) may have different entitlements.",
  },
  {
    question: "Is redundancy pay taxed?",
    answer: "Genuine redundancy payments up to the tax-free limit are exempt from tax. In 2025-26, the tax-free limit is $11,985 plus $5,994 for each completed year of service. Amounts above this are taxed at a concessional rate (up to 32% including Medicare).",
  },
  {
    question: "What is the difference between notice and redundancy pay?",
    answer: "Notice pay is payment in lieu of the notice period your employer must give before termination. Redundancy pay is a separate severance entitlement based on years of service — it compensates you for the loss of your job.",
  },
  {
    question: "What happens to my unused annual leave?",
    answer: "Your employer must pay out all accrued but unused annual leave and long service leave (if applicable) when your employment ends, regardless of the reason.",
  },
  {
    question: "Can I negotiate a higher redundancy payment?",
    answer: "Yes. The NES provides minimum entitlements — your contract or enterprise agreement may provide more. You can also negotiate a higher payment, especially if the employer wants to avoid an unfair dismissal claim.",
  },
];

export default function AURedundancyCalc() {
  const [weeklyPay, setWeeklyPay] = useState("1500");
  const [yearsService, setYearsService] = useState("5");
  const [over45, setOver45] = useState(false);
  const [annualLeave, setAnnualLeave] = useState("10");

  const weekly = parseFloat(weeklyPay) || 0;
  const years = parseFloat(yearsService) || 0;
  const annualLeaveWeeks = parseFloat(annualLeave) || 0;

  const redundancyWeeks = getRedundancyWeeks(years);
  const noticeWeeks = getNoticeWeeks(years, over45);

  const redundancyPay = redundancyWeeks * weekly;
  const noticePay = noticeWeeks * weekly;
  const annualLeavePay = annualLeaveWeeks * weekly;
  const totalPayout = redundancyPay + noticePay + annualLeavePay;

  // Tax-free limit (2025-26)
  const taxFreeBase = 11985;
  const taxFreePerYear = 5994;
  const taxFreeLimit = taxFreeBase + taxFreePerYear * Math.floor(years);
  const taxableRedundancy = Math.max(0, redundancyPay - taxFreeLimit);

  const fmt = (n: number) => "$" + n.toLocaleString("en-AU", { maximumFractionDigits: 0 });

  return (
    <div className="space-y-5 py-6 px-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Weekly Base Pay (AUD)</div>
          <div className="relative">
            <span className="field-prefix-symbol">$</span>
            <input type="number" className="field-input field-input--prefix" value={weeklyPay} onChange={(e) => setWeeklyPay(e.target.value)} placeholder="1500" />
          </div>
        </div>
        <div>
          <div className="field-label">Years of Service</div>
          <input type="number" className="field-input" value={yearsService} onChange={(e) => setYearsService(e.target.value)} placeholder="5" step="0.5" />
        </div>
        <div>
          <div className="field-label">Unused Annual Leave (weeks)</div>
          <input type="number" className="field-input" value={annualLeave} onChange={(e) => setAnnualLeave(e.target.value)} placeholder="10" step="0.5" />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "var(--text-secondary)" }}>
        <input type="checkbox" checked={over45} onChange={(e) => setOver45(e.target.checked)} className="accent-[var(--accent)]" />
        Age 45+ with 2+ years service (extra 1 week notice)
      </label>

      {weekly > 0 && (
        <div className="space-y-3">
          {years < 1 && (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "var(--surface-2)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
              Less than 1 year of service — no redundancy pay entitlement under Fair Work NES.
            </div>
          )}

          <div className="result-box">
            <div className="result-label">Total Payout</div>
            <div className="result-value text-3xl">{fmt(totalPayout)}</div>
          </div>

          <div className="p-4 rounded-xl border space-y-2 text-sm" style={{ borderColor: "var(--border)" }}>
            {[
              [`Redundancy Pay (${redundancyWeeks} wks)`, redundancyPay],
              [`Notice Pay (${noticeWeeks} wks)`, noticePay],
              [`Annual Leave Payout (${annualLeaveWeeks} wks)`, annualLeavePay],
            ].map(([label, val]) => (
              <div key={label as string} className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                <span>{label as string}</span>
                <span style={{ color: "var(--text-primary)" }}>{fmt(val as number)}</span>
              </div>
            ))}
            <div className="flex justify-between font-medium border-t pt-2" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
              <span>Total</span><span>{fmt(totalPayout)}</span>
            </div>
          </div>

          {redundancyPay > 0 && (
            <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
              <div className="result-label">Tax-Free Limit (2025-26)</div>
              <div className="result-value text-base" style={{ color: "#10b981" }}>{fmt(Math.min(redundancyPay, taxFreeLimit))}</div>
              {taxableRedundancy > 0 && (
                <div className="result-sub">Taxable at concessional rate: {fmt(taxableRedundancy)}</div>
              )}
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
