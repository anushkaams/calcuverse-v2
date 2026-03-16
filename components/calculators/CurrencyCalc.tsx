"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, AUD: 1.53, CAD: 1.36,
  CHF: 0.89, CNY: 7.24, INR: 83.1, MXN: 17.2, BRL: 4.97, SGD: 1.34,
  HKD: 7.82, NOK: 10.6, SEK: 10.4, NZD: 1.63, ZAR: 18.6, KRW: 1330,
};

const FAQS = [
  { question: "Are these exchange rates live?", answer: "These rates are approximate and for reference only. For financial transactions, always use real-time rates from a bank or forex provider." },
  { question: "What is the mid-market rate?", answer: "The mid-market rate is the midpoint between buy and sell rates. Banks and services add a markup, so the rate you get will differ slightly." },
  { question: "Why do exchange rates change?", answer: "Rates fluctuate due to interest rates, inflation, political stability, trade balances, and market speculation." },
  { question: "What is a pip?", answer: "A pip (percentage in point) is the smallest price move in currency trading, typically 0.0001 for most pairs." },
];

export default function CurrencyCalc() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const result = (parseFloat(amount) || 0) * (RATES[to] / RATES[from]);
  const currencies = Object.keys(RATES);

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">Amount</div>
        <input type="number" className="field-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="100" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">From</div>
          <select className="field-input" value={from} onChange={e => setFrom(e.target.value)}>
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <div className="field-label">To</div>
          <select className="field-input" value={to} onChange={e => setTo(e.target.value)}>
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <button
        className="w-full py-2 rounded-lg text-sm font-medium"
        style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}
        onClick={() => { setFrom(to); setTo(from); }}
      >
        ⇅ Swap Currencies
      </button>

      {parseFloat(amount) > 0 && (
        <div className="result-box">
          <div className="result-label">{amount} {from} =</div>
          <div className="result-value text-3xl">{result.toFixed(4)} {to}</div>
          <div className="result-sub">1 {from} = {(RATES[to] / RATES[from]).toFixed(4)} {to}</div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
