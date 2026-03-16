"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What are Roman numerals?", answer: "Roman numerals are a numeral system from ancient Rome using letters: I(1), V(5), X(10), L(50), C(100), D(500), M(1000)." },
  { question: "How does subtraction work in Roman numerals?", answer: "When a smaller value precedes a larger one, it's subtracted. IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900." },
  { question: "What is the largest standard Roman numeral?", answer: "The standard system goes up to 3,999 (MMMCMXCIX). A bar over a letter multiplies it by 1,000 for larger numbers." },
  { question: "Where are Roman numerals used today?", answer: "Clock faces, book chapters, movie sequels, Super Bowl numbering, copyright years, and formal document outlines still use Roman numerals." },
];

const VALS: [number, string][] = [
  [1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],
  [50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]
];

const toRoman = (n: number): string => {
  if (n < 1 || n > 3999) return "Out of range (1–3999)";
  let result = "";
  for (const [val, sym] of VALS) { while (n >= val) { result += sym; n -= val; } }
  return result;
};

const fromRoman = (s: string): number => {
  const map: Record<string, number> = { I:1,V:5,X:10,L:50,C:100,D:500,M:1000 };
  const str = s.toUpperCase();
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const curr = map[str[i]] ?? 0;
    const next = map[str[i + 1]] ?? 0;
    result += curr < next ? -curr : curr;
  }
  return result;
};

export default function RomanNumeralCalc() {
  const [mode, setMode] = useState<"toRoman" | "fromRoman">("toRoman");
  const [input, setInput] = useState("");

  const result = mode === "toRoman"
    ? toRoman(parseInt(input) || 0)
    : String(fromRoman(input) || (input ? "Invalid" : ""));

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "toRoman" ? "active" : ""}`} onClick={() => { setMode("toRoman"); setInput(""); }}>Number → Roman</button>
        <button className={`tab-item ${mode === "fromRoman" ? "active" : ""}`} onClick={() => { setMode("fromRoman"); setInput(""); }}>Roman → Number</button>
      </div>

      <div>
        <div className="field-label">{mode === "toRoman" ? "Arabic Number (1–3999)" : "Roman Numeral"}</div>
        <input className="field-input font-mono text-xl" value={input} onChange={e => setInput(e.target.value)}
          placeholder={mode === "toRoman" ? "2024" : "MMXXIV"} />
      </div>

      {input && result && (
        <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
          <div className="result-label">{mode === "toRoman" ? "Roman Numeral" : "Arabic Number"}</div>
          <div className="result-value text-3xl font-mono">{result}</div>
        </div>
      )}

      <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
        <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>REFERENCE</div>
        <div className="grid grid-cols-4 gap-1 text-sm font-mono">
          {[["I","1"],["V","5"],["X","10"],["L","50"],["C","100"],["D","500"],["M","1000"],["IV","4"],["IX","9"],["XL","40"],["XC","90"],["CD","400"],["CM","900"]].map(([r, a]) => (
            <div key={r} className="flex justify-between px-2 py-1 rounded" style={{ background: "var(--surface-2)" }}>
              <span style={{ color: "#f59e0b" }}>{r}</span>
              <span style={{ color: "var(--text-secondary)" }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
