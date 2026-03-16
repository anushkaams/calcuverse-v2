"use client";
import { useState, useCallback } from "react";

const BUTTONS = [
  ["AC", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

export default function StandardCalc() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(false);

  const handleBtn = useCallback((btn: string) => {
    if (btn === "AC") { setDisplay("0"); setPrev(null); setOp(null); setFresh(false); return; }
    if (btn === "±") { setDisplay(d => String(-parseFloat(d))); return; }
    if (btn === "⌫") { setDisplay(d => d.length > 1 ? d.slice(0, -1) : "0"); return; }
    if (btn === "%") { setDisplay(d => String(parseFloat(d) / 100)); return; }

    if (["+", "−", "×", "÷"].includes(btn)) {
      setPrev(parseFloat(display)); setOp(btn); setFresh(true); return;
    }

    if (btn === "=") {
      if (prev === null || !op) return;
      const cur = parseFloat(display);
      let res = 0;
      if (op === "+") res = prev + cur;
      if (op === "−") res = prev - cur;
      if (op === "×") res = prev * cur;
      if (op === "÷") res = cur === 0 ? NaN : prev / cur;
      setDisplay(isNaN(res) ? "Error" : String(parseFloat(res.toPrecision(12))));
      setPrev(null); setOp(null); setFresh(false);
      return;
    }

    if (btn === "." && display.includes(".") && !fresh) return;
    setDisplay(d => fresh || d === "0" ? btn : d.length < 16 ? d + btn : d);
    setFresh(false);
  }, [display, prev, op, fresh]);

  return (
    <div className="space-y-3">
      <div className="calc-display" style={{ fontSize: display.length > 12 ? "1.2rem" : display.length > 8 ? "1.6rem" : "2rem" }}>
        {display}
      </div>
      {op && (
        <div className="text-right text-xs pr-1" style={{ color: "var(--text-muted)" }}>
          {prev} {op}
        </div>
      )}
      <div className="keypad-4">
        {BUTTONS.flat().map((btn, i) => {
          const isOp = ["+", "−", "×", "÷"].includes(btn);
          const isEq = btn === "=";
          const isMuted = ["AC", "±", "%", "⌫"].includes(btn);
          return (
            <button
              key={i}
              onClick={() => handleBtn(btn)}
              className={`calc-btn ${isEq ? "calc-btn-accent" : isOp ? "calc-btn-soft" : isMuted ? "calc-btn-muted" : ""}`}
              style={btn === "0" ? { gridColumn: "span 2" } : {}}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
