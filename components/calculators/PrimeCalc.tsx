"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is a prime number?", answer: "A prime number is a natural number greater than 1 that has no divisors other than 1 and itself. Examples: 2, 3, 5, 7, 11, 13..." },
  { question: "What is prime factorization?", answer: "Prime factorization expresses a number as a product of its prime factors. Every integer > 1 has a unique prime factorization (Fundamental Theorem of Arithmetic)." },
  { question: "What is the largest known prime?", answer: "As of 2024, the largest known prime is 2^136,279,841 − 1, discovered by the Great Internet Mersenne Prime Search (GIMPS). It has over 41 million digits." },
  { question: "Why are primes important in cryptography?", answer: "RSA encryption relies on the fact that multiplying two large primes is easy, but factoring their product back into primes is computationally very hard." },
];

const isPrime = (n: number) => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) if (n % i === 0) return false;
  return true;
};

const factorize = (n: number) => {
  const factors: { p: number; e: number }[] = [];
  let d = 2;
  while (n > 1) {
    if (n % d === 0) {
      let e = 0;
      while (n % d === 0) { e++; n /= d; }
      factors.push({ p: d, e });
    }
    d++;
    if (d * d > n && n > 1) { factors.push({ p: n, e: 1 }); break; }
  }
  return factors;
};

export default function PrimeCalc() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"check" | "factorize" | "list">("factorize");
  const [listRange, setListRange] = useState("100");

  const n = parseInt(input) || 0;
  const factors = mode === "factorize" && n > 1 ? factorize(n) : [];
  const prime = mode === "check" && n >= 2 ? isPrime(n) : null;

  const limit = Math.min(parseInt(listRange) || 100, 1000);
  const primeList = mode === "list" ? Array.from({ length: limit }, (_, i) => i + 2).filter(isPrime) : [];

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "factorize" ? "active" : ""}`} onClick={() => setMode("factorize")}>Factorize</button>
        <button className={`tab-item ${mode === "check" ? "active" : ""}`} onClick={() => setMode("check")}>Is Prime?</button>
        <button className={`tab-item ${mode === "list" ? "active" : ""}`} onClick={() => setMode("list")}>List Primes</button>
      </div>

      {mode !== "list" ? (
        <div>
          <div className="field-label">Number</div>
          <input type="number" className="field-input" value={input} onChange={e => setInput(e.target.value)} placeholder="360" min="2" />
        </div>
      ) : (
        <div>
          <div className="field-label">Find all primes up to...</div>
          <input type="number" className="field-input" value={listRange} onChange={e => setListRange(e.target.value)} placeholder="100" max="1000" />
        </div>
      )}

      {mode === "check" && prime !== null && (
        <div className="result-box" style={{ borderColor: (prime ? "#10b981" : "#ef4444") + "40", background: (prime ? "#10b981" : "#ef4444") + "12" }}>
          <div className="result-label">{n}</div>
          <div className="result-value text-2xl" style={{ color: prime ? "#10b981" : "#ef4444" }}>
            {prime ? "✓ Is a prime number" : "✗ Not a prime number"}
          </div>
          {!prime && n > 1 && <div className="result-sub">Smallest factor: {factorize(n)[0]?.p}</div>}
        </div>
      )}

      {mode === "factorize" && factors.length > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#6366f140", background: "#6366f112" }}>
            <div className="result-label">Prime Factorization of {n}</div>
            <div className="result-value text-2xl font-mono">
              {factors.map((f, i) => <span key={i}>{i > 0 && " × "}{f.p}{f.e > 1 ? <sup>{f.e}</sup> : ""}</span>)}
            </div>
          </div>
          <div className="result-box">
            <div className="result-label">Factors (expanded)</div>
            <div className="result-value font-mono text-sm">{factors.map(f => Array(f.e).fill(f.p)).flat().join(" × ")}</div>
          </div>
          <div className="result-box">
            <div className="result-label">Total divisors</div>
            <div className="result-value">{factors.reduce((s, f) => s * (f.e + 1), 1)}</div>
          </div>
        </div>
      )}

      {mode === "list" && (
        <div className="space-y-2">
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{primeList.length} primes found up to {limit}</div>
          <div className="flex flex-wrap gap-1.5 max-h-64 overflow-y-auto">
            {primeList.map(p => (
              <span key={p} className="px-2 py-0.5 rounded font-mono text-sm"
                style={{ background: "var(--surface-2)", color: "#6366f1" }}>{p}</span>
            ))}
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
