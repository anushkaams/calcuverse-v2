"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How does paying extra principal help?", answer: "Extra payments directly reduce the loan balance, which means less interest accrues each month. Over time this saves thousands and shortens the loan term significantly." },
  { question: "What is an amortization schedule?", answer: "An amortization schedule shows each monthly payment broken down into principal and interest portions. Early payments are mostly interest; later ones are mostly principal." },
  { question: "Is it better to pay extra principal or invest?", answer: "If your loan interest rate exceeds expected investment returns, paying down debt wins. If investments reliably return more than your rate, investing may be better." },
  { question: "Can I pay off a mortgage early without penalty?", answer: "Many modern mortgages have no prepayment penalty, but check your loan agreement. Some loans charge a fee for paying off early — especially in the first few years." },
];

export default function LoanPayoffCalc() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [payment, setPayment] = useState("");
  const [extra, setExtra] = useState("");

  const b = parseFloat(balance) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const p = parseFloat(payment) || 0;
  const e = parseFloat(extra) || 0;

  const calcMonths = (bal: number, monthlyRate: number, pmt: number) => {
    if (pmt <= bal * monthlyRate) return Infinity;
    return Math.ceil(Math.log(pmt / (pmt - bal * monthlyRate)) / Math.log(1 + monthlyRate));
  };

  const monthsStd = b > 0 && r > 0 && p > 0 ? calcMonths(b, r, p) : 0;
  const monthsExtra = b > 0 && r > 0 && p > 0 ? calcMonths(b, r, p + e) : 0;

  const totalStd = monthsStd * p;
  const totalExtra = monthsExtra * (p + e);
  const interestStd = totalStd - b;
  const interestExtra = totalExtra - b;
  const savedInterest = interestStd - interestExtra;
  const savedMonths = monthsStd - monthsExtra;

  const fmt = (m: number) => {
    if (!isFinite(m)) return "∞";
    const y = Math.floor(m / 12);
    const mo = m % 12;
    return `${y > 0 ? y + "y " : ""}${mo > 0 ? mo + "mo" : ""}`;
  };

  return (
    <div className="space-y-6   py-6 px-4">
      <div>
        <div className="field-label">Current Loan Balance ($)</div>
        <input type="number" className="field-input" value={balance} onChange={e => setBalance(e.target.value)} placeholder="25000" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Annual Interest Rate (%)</div>
          <input type="number" className="field-input" value={rate} onChange={e => setRate(e.target.value)} placeholder="6.5" />
        </div>
        <div>
          <div className="field-label">Monthly Payment ($)</div>
          <input type="number" className="field-input" value={payment} onChange={e => setPayment(e.target.value)} placeholder="450" />
        </div>
      </div>
      <div>
        <div className="field-label">Extra Monthly Payment ($)</div>
        <input type="number" className="field-input" value={extra} onChange={e => setExtra(e.target.value)} placeholder="100" />
      </div>

      {monthsStd > 0 && (
        <div className="space-y-3">
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            <div className="grid grid-cols-3 text-xs font-semibold px-4 py-2" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
              <span></span><span className="text-center">Standard</span><span className="text-center">With Extra</span>
            </div>
            {[
              ["Payoff Time", fmt(monthsStd), fmt(monthsExtra)],
              ["Total Paid", `$${totalStd.toFixed(0)}`, `$${totalExtra.toFixed(0)}`],
              ["Total Interest", `$${interestStd.toFixed(0)}`, `$${interestExtra.toFixed(0)}`],
            ].map(([label, a, b]) => (
              <div key={label as string} className="grid grid-cols-3 px-4 py-2.5 border-t text-sm" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "var(--text-secondary)" }}>{label as string}</span>
                <span className="text-center">{a as string}</span>
                <span className="text-center font-bold" style={{ color: "#10b981" }}>{b as string}</span>
              </div>
            ))}
          </div>

          {e > 0 && savedInterest > 0 && (
            <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
              <div className="result-label">🎉 You Save</div>
              <div className="result-value text-2xl" style={{ color: "#10b981" }}>${savedInterest.toFixed(2)} in interest</div>
              <div className="result-sub">Paid off {fmt(savedMonths)} earlier</div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
