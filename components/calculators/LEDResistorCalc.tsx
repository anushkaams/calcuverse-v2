"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "Why does an LED need a resistor?", answer: "LEDs have a fixed forward voltage drop. Without a current-limiting resistor, too much current flows and the LED burns out instantly." },
  { question: "How do I find my LED's forward voltage?", answer: "Check the datasheet. Typical values: red/yellow/green ~2V, blue/white ~3.2–3.4V. If unknown, start with 2V for coloured and 3.2V for white." },
  { question: "What wattage resistor should I use?", answer: "Use a resistor with power rating at least 2× the calculated dissipation. Standard resistors come in 1/8W, 1/4W, 1/2W, and 1W ratings." },
  { question: "Can I put multiple LEDs in series?", answer: "Yes — add all forward voltages together. The same current flows through all, and you need one resistor: R = (Vsupply – sum of Vf) / Iforward." },
];

const LED_COLORS = [
  { label: "Red", vf: 2.0 },
  { label: "Yellow", vf: 2.1 },
  { label: "Green", vf: 2.2 },
  { label: "Blue", vf: 3.2 },
  { label: "White", vf: 3.3 },
  { label: "IR", vf: 1.5 },
  { label: "UV", vf: 3.4 },
  { label: "Custom", vf: null },
];

const E24 = [1.0,1.1,1.2,1.3,1.5,1.6,1.8,2.0,2.2,2.4,2.7,3.0,3.3,3.6,3.9,4.3,4.7,5.1,5.6,6.2,6.8,7.5,8.2,9.1];
const getStandard = (r: number) => {
  const exp = Math.floor(Math.log10(r));
  const base = Math.pow(10, exp);
  const norm = r / base;
  const closest = E24.reduce((a, b) => Math.abs(b - norm) < Math.abs(a - norm) ? b : a);
  return closest * base;
};

export default function LEDResistorCalc() {
  const [vsupply, setVsupply] = useState("5");
  const [vfColor, setVfColor] = useState("Red");
  const [vfCustom, setVfCustom] = useState("2.0");
  const [current, setCurrent] = useState("20");
  const [leds, setLeds] = useState("1");

  const selectedColor = LED_COLORS.find(c => c.label === vfColor);
  const vf = selectedColor?.vf ?? parseFloat(vfCustom) ?? 2.0;
  const vs = parseFloat(vsupply) || 0;
  const if_mA = parseFloat(current) || 20;
  const n = parseInt(leds) || 1;
  const totalVf = vf * n;

  const R = (vs - totalVf) / (if_mA / 1000);
  const power = ((if_mA / 1000) ** 2) * R;
  const stdR = R > 0 ? getStandard(R) : 0;

  const rColor = R <= 0 ? "#ef4444" : "#10b981";

  return (
    <div className="space-y-6   py-6 px-4">
      <div>
        <div className="field-label">Supply Voltage (V)</div>
        <div className="flex gap-2 flex-wrap mb-2">
          {["3.3","5","9","12"].map(v => (
            <button key={v} onClick={() => setVsupply(v)} className="px-3 py-1 text-xs rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>{v}V</button>
          ))}
        </div>
        <input type="number" className="field-input" value={vsupply} onChange={e => setVsupply(e.target.value)} />
      </div>

      <div>
        <div className="field-label">LED Color</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {LED_COLORS.map(c => (
            <button key={c.label} onClick={() => setVfColor(c.label)}
              className={`px-3 py-1 text-xs rounded-full border ${vfColor === c.label ? "active" : ""}`}
              style={{ borderColor: "var(--border)", color: vfColor === c.label ? "white" : "var(--text-secondary)", background: vfColor === c.label ? "#6366f1" : "transparent" }}>
              {c.label}{c.vf ? ` (${c.vf}V)` : ""}
            </button>
          ))}
        </div>
        {vfColor === "Custom" && (
          <input type="number" className="field-input" value={vfCustom} onChange={e => setVfCustom(e.target.value)} placeholder="2.0" step="0.1" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">Forward Current (mA)</div>
          <input type="number" className="field-input" value={current} onChange={e => setCurrent(e.target.value)} placeholder="20" />
        </div>
        <div>
          <div className="field-label">LEDs in Series</div>
          <input type="number" className="field-input" value={leds} onChange={e => setLeds(e.target.value)} min="1" placeholder="1" />
        </div>
      </div>

      {vs > 0 && (
        <div className="space-y-3">
          {R <= 0 ? (
            <div className="result-box" style={{ borderColor: "#ef444440", background: "#ef444412" }}>
              <div className="result-value" style={{ color: "#ef4444" }}>⚠ Supply voltage too low for {n} LED(s) in series ({totalVf.toFixed(1)}V needed)</div>
            </div>
          ) : (
            <>
              <div className="result-box" style={{ borderColor: rColor + "40", background: rColor + "12" }}>
                <div className="result-label">Calculated Resistance</div>
                <div className="result-value text-3xl">{R.toFixed(1)} Ω</div>
                <div className="result-sub">Nearest E24 standard: <strong>{stdR < 1000 ? stdR + "Ω" : (stdR/1000).toFixed(2) + "kΩ"}</strong></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="result-box"><div className="result-label">Power Dissipation</div><div className="result-value">{(power * 1000).toFixed(1)} mW</div></div>
                <div className="result-box"><div className="result-label">Recommended Rating</div><div className="result-value">{power < 0.125 ? "1/8W" : power < 0.25 ? "1/4W" : power < 0.5 ? "1/2W" : "1W"}</div></div>
              </div>
            </>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
