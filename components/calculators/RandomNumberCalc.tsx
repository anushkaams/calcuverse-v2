"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "Are these truly random numbers?", answer: "These use JavaScript's Math.random(), which is a pseudo-random number generator (PRNG). It's suitable for most applications but not cryptographic use." },
  { question: "What is the difference between random and pseudo-random?", answer: "True random numbers come from physical processes (noise, radioactive decay). Pseudo-random numbers use deterministic algorithms that approximate randomness." },
  { question: "How do I pick a random winner from a list?", answer: "Assign each person a number, then generate a random integer in that range. This calculator supports that use case directly." },
  { question: "Can I generate non-repeating random numbers?", answer: "Yes — enable 'No duplicates' mode and generate a set. This creates a random permutation without repetition." },
];

export default function RandomNumberCalc() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [noDupes, setNoDupes] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const lo = parseInt(min);
    const hi = parseInt(max);
    const n = Math.min(parseInt(count) || 1, 100);
    if (isNaN(lo) || isNaN(hi) || lo > hi) return;

    if (noDupes) {
      const pool: number[] = [];
      for (let i = lo; i <= hi; i++) pool.push(i);
      const shuffled = pool.sort(() => Math.random() - 0.5);
      setResults(shuffled.slice(0, Math.min(n, pool.length)));
    } else {
      const nums: number[] = [];
      for (let i = 0; i < n; i++) nums.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
      setResults(nums);
    }
  };

  const QUICK_RANGES = [
    { label: "1–6 (Dice)", min: "1", max: "6" },
    { label: "1–10", min: "1", max: "10" },
    { label: "1–100", min: "1", max: "100" },
    { label: "0–255 (Byte)", min: "0", max: "255" },
  ];

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="flex flex-wrap gap-2">
        {QUICK_RANGES.map(r => (
          <button key={r.label} onClick={() => { setMin(r.min); setMax(r.max); }}
            className="px-3 py-1 text-xs rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div><div className="field-label">Minimum</div><input type="number" className="field-input" value={min} onChange={e => setMin(e.target.value)} /></div>
        <div><div className="field-label">Maximum</div><input type="number" className="field-input" value={max} onChange={e => setMax(e.target.value)} /></div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="field-label">How Many Numbers</div>
          <input type="number" className="field-input" value={count} onChange={e => setCount(e.target.value)} min="1" max="100" />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <input type="checkbox" id="dupes" checked={noDupes} onChange={e => setNoDupes(e.target.checked)} />
          <label htmlFor="dupes" className="text-sm" style={{ color: "var(--text-secondary)" }}>No duplicates</label>
        </div>
      </div>

      <button onClick={generate}
        className="w-full py-3 rounded-xl font-semibold text-white"
        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
        🎲 Generate
      </button>

      {results.length > 0 && (
        <div className="space-y-3">
          {results.length === 1 ? (
            <div className="result-box" style={{ borderColor: "#6366f140", background: "#6366f112" }}>
              <div className="result-label">Random Number</div>
              <div className="result-value text-5xl">{results[0]}</div>
            </div>
          ) : (
            <div className="result-box">
              <div className="result-label">{results.length} Random Numbers</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {results.map((n, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg font-mono font-bold text-lg"
                    style={{ background: "var(--surface-2)", color: "#6366f1" }}>{n}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
