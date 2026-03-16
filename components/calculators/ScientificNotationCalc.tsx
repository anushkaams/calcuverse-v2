"use client";
// ScientificNotationCalc.tsx
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is scientific notation?", answer: "Scientific notation expresses numbers as a × 10ⁿ, where 1 ≤ a < 10. It's used to conveniently write very large or very small numbers." },
  { question: "How do I convert to scientific notation?", answer: "Move the decimal point until one non-zero digit remains before it. Count the moves — positive if you moved left, negative if right." },
  { question: "Where is scientific notation used?", answer: "Physics, chemistry, astronomy, and engineering regularly use scientific notation. The mass of an electron is ~9.11 × 10⁻³¹ kg." },
  { question: "What is E notation?", answer: "E notation is a computing shorthand. '3.5E6' means 3.5 × 10⁶. This is identical to scientific notation." },
];

export default function ScientificNotationCalc() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"toSci" | "fromSci">("toSci");
  const [mantissa, setMantissa] = useState("");
  const [exponent, setExponent] = useState("");

  let result = "";
  let standard = "";

  if (mode === "toSci" && input) {
    const num = parseFloat(input);
    if (!isNaN(num) && num !== 0) {
      const exp = Math.floor(Math.log10(Math.abs(num)));
      const mant = num / Math.pow(10, exp);
      result = `${mant.toFixed(4)} × 10^${exp}`;
      standard = num.toExponential(4);
    }
  } else if (mode === "fromSci" && mantissa && exponent) {
    const val = parseFloat(mantissa) * Math.pow(10, parseFloat(exponent));
    result = val.toLocaleString("fullwide");
    standard = val.toExponential(4);
  }

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "toSci" ? "active" : ""}`} onClick={() => setMode("toSci")}>To Scientific</button>
        <button className={`tab-item ${mode === "fromSci" ? "active" : ""}`} onClick={() => setMode("fromSci")}>From Scientific</button>
      </div>

      {mode === "toSci" ? (
        <div>
          <div className="field-label">Standard Number</div>
          <input type="text" className="field-input" value={input} onChange={e => setInput(e.target.value)} placeholder="0.00000456" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div><div className="field-label">Mantissa (a)</div><input type="number" className="field-input" value={mantissa} onChange={e => setMantissa(e.target.value)} placeholder="3.5" /></div>
          <div><div className="field-label">Exponent (n)</div><input type="number" className="field-input" value={exponent} onChange={e => setExponent(e.target.value)} placeholder="6" /></div>
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#3b82f640", background: "#3b82f612" }}>
            <div className="result-label">Result</div>
            <div className="result-value text-xl font-mono">{result}</div>
          </div>
          <div className="result-box"><div className="result-label">E Notation</div><div className="result-value font-mono">{standard}</div></div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
