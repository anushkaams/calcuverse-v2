"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is the Pythagorean theorem?", answer: "The Pythagorean theorem states that in a right triangle: a² + b² = c², where c is the hypotenuse (the longest side, opposite the right angle)." },
  { question: "Who discovered the Pythagorean theorem?", answer: "While named after Greek mathematician Pythagoras (~570 BC), the relationship was known in Babylonian mathematics over 1000 years earlier." },
  { question: "What are Pythagorean triples?", answer: "These are sets of 3 integers that satisfy a² + b² = c². Common examples: (3,4,5), (5,12,13), (8,15,17), (7,24,25)." },
  { question: "Where is this used in real life?", answer: "Construction (checking square corners), navigation, physics, computer graphics, and any calculation involving right-angle distances." },
];

const TRIPLES = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];

export default function PythagoreanCalc() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [solve, setSolve] = useState<"c" | "a" | "b">("c");

  const av = parseFloat(a) || 0;
  const bv = parseFloat(b) || 0;
  const cv = parseFloat(c) || 0;

  let result = 0;
  if (solve === "c" && av > 0 && bv > 0) result = Math.sqrt(av * av + bv * bv);
  else if (solve === "a" && bv > 0 && cv > bv) result = Math.sqrt(cv * cv - bv * bv);
  else if (solve === "b" && av > 0 && cv > av) result = Math.sqrt(cv * cv - av * av);

  const isValid = result > 0 && !isNaN(result);
  const angle = solve === "c" && isValid ? Math.atan(av / bv) * (180 / Math.PI) : 0;

  return (
    <div className="space-y-6   py-6 px-4">
      <div>
        <div className="field-label">Solve for...</div>
        <div className="tab-group">
          <button className={`tab-item ${solve === "c" ? "active" : ""}`} onClick={() => setSolve("c")}>Hypotenuse (c)</button>
          <button className={`tab-item ${solve === "a" ? "active" : ""}`} onClick={() => setSolve("a")}>Side a</button>
          <button className={`tab-item ${solve === "b" ? "active" : ""}`} onClick={() => setSolve("b")}>Side b</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {solve !== "a" && <div><div className="field-label">Side a</div><input type="number" className="field-input" value={a} onChange={e => setA(e.target.value)} placeholder="3" /></div>}
        {solve !== "b" && <div><div className="field-label">Side b</div><input type="number" className="field-input" value={b} onChange={e => setB(e.target.value)} placeholder="4" /></div>}
        {solve !== "c" && <div><div className="field-label">Hypotenuse c</div><input type="number" className="field-input" value={c} onChange={e => setC(e.target.value)} placeholder="5" /></div>}
      </div>

      <div className="flex flex-wrap gap-2">
        {TRIPLES.map(([ta, tb, tc]) => (
          <button key={`${ta}-${tb}`} onClick={() => { setA(String(ta)); setB(String(tb)); setC(String(tc)); setSolve("c"); }}
            className="px-2 py-1 text-xs rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            {ta}·{tb}·{tc}
          </button>
        ))}
      </div>

      {isValid && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#f59e0b40", background: "#f59e0b12" }}>
            <div className="result-label">{solve === "c" ? "Hypotenuse c" : `Side ${solve}`}</div>
            <div className="result-value text-3xl">{result.toFixed(6)}</div>
          </div>
          {solve === "c" && av > 0 && bv > 0 && (
            <div className="result-box">
              <div className="result-label">Angle opposite a</div>
              <div className="result-value">{angle.toFixed(2)}° · {(90 - angle).toFixed(2)}°</div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
