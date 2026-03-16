"use client";
import { useState, useCallback } from "react";

const BUTTONS = [
  ["sin", "cos", "tan", "π"],
  ["log", "ln", "√", "x²"],
  ["(", ")", "xⁿ", "1/x"],
  ["AC", "⌫", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "±", "="],
];

export default function ScientificCalc() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [deg, setDeg] = useState(true);

  const toRad = (v: number) => deg ? v * Math.PI / 180 : v;

  const handleBtn = useCallback((btn: string) => {
    const n = parseFloat(display);

    if (btn === "AC") { setDisplay("0"); setExpression(""); return; }
    if (btn === "⌫") { setDisplay(d => d.length > 1 ? d.slice(0, -1) : "0"); return; }

    const unary: Record<string, () => number> = {
      "sin": () => Math.sin(toRad(n)),
      "cos": () => Math.cos(toRad(n)),
      "tan": () => Math.tan(toRad(n)),
      "log": () => Math.log10(n),
      "ln":  () => Math.log(n),
      "√":  () => Math.sqrt(n),
      "x²": () => n * n,
      "1/x": () => 1 / n,
      "%": () => n / 100,
      "±": () => -n,
    };

    if (unary[btn]) {
      const res = unary[btn]();
      setExpression(`${btn}(${display})`);
      setDisplay(String(parseFloat(res.toPrecision(10))));
      return;
    }

    if (btn === "π") { setDisplay(String(Math.PI)); return; }
    if (btn === "xⁿ") { setExpression(display + "^"); setDisplay("0"); return; }

    if (["÷","×","−","+"].includes(btn) || btn === "(" || btn === ")") {
      setExpression(e => e + display + btn); setDisplay("0"); return;
    }

    if (btn === "=") {
      try {
        const expr = expression + display;
        // Safe evaluate using Function
        const safe = expr
          .replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-")
          .replace(/\^/g, "**");
        // eslint-disable-next-line no-new-func
        const res = new Function(`return ${safe}`)();
        setDisplay(String(parseFloat(res.toPrecision(12))));
        setExpression("");
      } catch { setDisplay("Error"); setExpression(""); }
      return;
    }

    if (btn === "." && display.includes(".")) return;
    setDisplay(d => d === "0" ? btn : d.length < 14 ? d + btn : d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, expression, deg]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-xs truncate" style={{ color: "var(--text-muted)", maxWidth: "200px" }}>{expression || " "}</div>
        <div className="tab-group" style={{ width: "auto" }}>
          <button className={`tab-item px-3 ${deg ? "active" : ""}`} onClick={() => setDeg(true)}>DEG</button>
          <button className={`tab-item px-3 ${!deg ? "active" : ""}`} onClick={() => setDeg(false)}>RAD</button>
        </div>
      </div>
      <div className="calc-display" style={{ fontSize: display.length > 10 ? "1.4rem" : "2rem" }}>{display}</div>
      <div className="keypad-4">
        {BUTTONS.flat().map((btn, i) => {
          const isOp = ["+","−","×","÷"].includes(btn);
          const isEq = btn === "=";
          const isFn = ["sin","cos","tan","log","ln","√","x²","1/x","π","xⁿ"].includes(btn);
          const isMuted = ["AC","⌫","%","±","(", ")"].includes(btn);
          return (
            <button
              key={i}
              onClick={() => handleBtn(btn)}
              className={`calc-btn text-sm ${isEq ? "calc-btn-accent" : isOp ? "calc-btn-soft" : isFn ? "calc-btn-soft" : isMuted ? "calc-btn-muted" : ""}`}
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
