"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "Why does minimum payment take so long?", answer: "Minimum payments are typically 1–3% of the balance. With high APR, most of your payment covers interest, leaving very little to reduce the principal." },
  { question: "What is APR on a credit card?", answer: "APR (Annual Percentage Rate) is the yearly interest rate. Divided by 12 gives your monthly rate. Average US credit card APR is around 20–25%." },
  { question: "What is the avalanche method?", answer: "The avalanche method pays the highest-APR card first while paying minimums on others. It minimizes total interest paid." },
  { question: "What is the snowball method?", answer: "The snowball method pays the smallest balance first for psychological wins. It may cost more in interest but keeps motivation high." },
];

export default function CreditCardCalc() {
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("20");
  const [mode, setMode] = useState<"payment" | "payoff">("payment");
  const [payment, setPayment] = useState("");
  const [months, setMonths] = useState("24");

  const b = parseFloat(balance) || 0;
  const r = (parseFloat(apr) || 0) / 100 / 12;

  // Mode 1: Fixed payment → months to payoff + total interest
  const p = parseFloat(payment) || 0;
  const payoffMonths = p > b * r ? Math.ceil(Math.log(p / (p - b * r)) / Math.log(1 + r)) : Infinity;
  const totalPaid = isFinite(payoffMonths) ? payoffMonths * p : Infinity;
  const totalInterest = isFinite(totalPaid) ? totalPaid - b : Infinity;

  // Mode 2: Target months → required payment
  const n = parseInt(months) || 24;
  const requiredPayment = r > 0 ? b * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : b / n;
  const totalMode2 = requiredPayment * n;
  const interestMode2 = totalMode2 - b;

  // Min payment warning
  const minPayment = Math.max(25, b * 0.02);
  const minMonths = minPayment > b * r ? Math.ceil(Math.log(minPayment / (minPayment - b * r)) / Math.log(1 + r)) : Infinity;
  const minInterest = isFinite(minMonths) ? minMonths * minPayment - b : Infinity;

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "payment" ? "active" : ""}`} onClick={() => setMode("payment")}>Fixed Payment</button>
        <button className={`tab-item ${mode === "payoff" ? "active" : ""}`} onClick={() => setMode("payoff")}>Target Date</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Balance ($)</div>
          <input type="number" className="field-input" value={balance} onChange={e => setBalance(e.target.value)} placeholder="5000" />
        </div>
        <div>
          <div className="field-label">APR (%)</div>
          <input type="number" className="field-input" value={apr} onChange={e => setApr(e.target.value)} placeholder="20" />
        </div>
      </div>

      {mode === "payment" ? (
        <div>
          <div className="field-label">Monthly Payment ($)</div>
          <input type="number" className="field-input" value={payment} onChange={e => setPayment(e.target.value)} placeholder="200" />
        </div>
      ) : (
        <div>
          <div className="field-label">Pay Off In (months)</div>
          <input type="number" className="field-input" value={months} onChange={e => setMonths(e.target.value)} placeholder="24" />
        </div>
      )}

      {b > 0 && (
        <div className="space-y-3">
          {mode === "payment" && p > 0 && (
            <>
              <div className="result-box" style={{ borderColor: "#ef444440", background: "#ef444412" }}>
                <div className="result-label">Payoff Time</div>
                <div className="result-value text-3xl">{isFinite(payoffMonths) ? `${Math.floor(payoffMonths / 12)}y ${payoffMonths % 12}mo` : "Never"}</div>
              </div>
              <div className="result-box"><div className="result-label">Total Interest Paid</div><div className="result-value">${isFinite(totalInterest) ? totalInterest.toFixed(2) : "∞"}</div></div>
            </>
          )}
          {mode === "payoff" && (
            <>
              <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
                <div className="result-label">Monthly Payment Needed</div>
                <div className="result-value text-3xl">${requiredPayment.toFixed(2)}/mo</div>
              </div>
              <div className="result-box"><div className="result-label">Total Interest</div><div className="result-value">${interestMode2.toFixed(2)}</div></div>
            </>
          )}
          <div className="p-3 rounded-xl border text-sm" style={{ borderColor: "#ef444420", background: "#ef444408" }}>
            <div className="font-medium mb-1" style={{ color: "#ef4444" }}>⚠ Minimum payment (${minPayment.toFixed(0)}/mo)</div>
            <div style={{ color: "var(--text-secondary)" }}>
              Takes {isFinite(minMonths) ? `${Math.floor(minMonths / 12)}y ${minMonths % 12}mo` : "forever"} and
              costs ${isFinite(minInterest) ? minInterest.toFixed(0) : "∞"} in interest
            </div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
