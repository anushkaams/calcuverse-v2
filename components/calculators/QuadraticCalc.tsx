"use client";
import { useState } from "react";

export default function QuadraticCalc() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-5");
  const [c, setC] = useState("6");

  const av = parseFloat(a) || 0;
  const bv = parseFloat(b) || 0;
  const cv = parseFloat(c) || 0;

  const disc = bv * bv - 4 * av * cv;
  let roots: string[] = [];
  let nature = "";

  if (av === 0) {
    nature = "Not a quadratic (a = 0)";
  } else if (disc > 0) {
    const r1 = (-bv + Math.sqrt(disc)) / (2 * av);
    const r2 = (-bv - Math.sqrt(disc)) / (2 * av);
    roots = [r1.toFixed(6), r2.toFixed(6)];
    nature = "Two distinct real roots";
  } else if (disc === 0) {
    const r = -bv / (2 * av);
    roots = [r.toFixed(6)];
    nature = "One repeated real root";
  } else {
    const realPart = (-bv / (2 * av)).toFixed(4);
    const imagPart = (Math.sqrt(-disc) / (2 * av)).toFixed(4);
    roots = [`${realPart} + ${imagPart}i`, `${realPart} − ${imagPart}i`];
    nature = "Two complex roots";
  }

  const vertex = av !== 0
    ? { x: (-bv / (2 * av)).toFixed(4), y: (cv - (bv * bv) / (4 * av)).toFixed(4) }
    : null;

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl text-center text-lg font-display" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", fontFamily: "var(--font-outfit)", color: "var(--text-secondary)" }}>
        <span style={{ color: "var(--accent)" }}>{a || "a"}</span>x² +{" "}
        <span style={{ color: "#10b981" }}>{b || "b"}</span>x +{" "}
        <span style={{ color: "#f59e0b" }}>{c || "c"}</span> = 0
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "a (x²)", value: a, set: setA, color: "var(--accent)" },
          { label: "b (x)", value: b, set: setB, color: "#10b981" },
          { label: "c (const)", value: c, set: setC, color: "#f59e0b" },
        ].map(({ label, value, set, color }) => (
          <div key={label}>
            <div className="field-label" style={{ color }}>{label}</div>
            <input type="number" className="field-input text-center" value={value} onChange={e => set(e.target.value)} />
          </div>
        ))}
      </div>

      <div className="result-box">
        <div className="result-label">Discriminant (Δ = b²−4ac)</div>
        <div className="result-value text-xl">{disc.toFixed(4)}</div>
        <div className="result-sub">{nature}</div>
      </div>

      {roots.length > 0 && (
        <div className="space-y-2">
          {roots.map((r, i) => (
            <div key={i} className="result-box flex items-center justify-between">
              <div className="result-label">x{roots.length > 1 ? `${i + 1}` : ""}</div>
              <div className="font-mono text-lg" style={{ color: "var(--text-primary)" }}>{r}</div>
            </div>
          ))}
        </div>
      )}

      {vertex && (
        <div className="result-box flex items-center justify-between">
          <div className="result-label">Vertex (−b/2a, …)</div>
          <div className="font-mono text-sm" style={{ color: "var(--text-primary)" }}>({vertex.x}, {vertex.y})</div>
        </div>
      )}
    </div>
  );
}
