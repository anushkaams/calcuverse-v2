"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

type State = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";

// Stamp duty brackets per state (2025 rates, property transfers)
const STAMP_DUTY: Record<State, { brackets: { min: number; max: number; rate: number; base: number }[]; fhbExemptUpTo?: number; fhbConcessUpTo?: number; fhbNewOnly?: boolean }> = {
  NSW: {
    brackets: [
      { min: 0,       max: 16000,   rate: 0.0125, base: 0 },
      { min: 16001,   max: 35000,   rate: 0.015,  base: 200 },
      { min: 35001,   max: 93000,   rate: 0.0175, base: 485 },
      { min: 93001,   max: 351000,  rate: 0.035,  base: 1500 },
      { min: 351001,  max: 1168000, rate: 0.045,  base: 10530 },
      { min: 1168001, max: 3505000, rate: 0.055,  base: 47295 },
      { min: 3505001, max: Infinity, rate: 0.07,  base: 175830 },
    ],
    fhbExemptUpTo: 800000,
    fhbConcessUpTo: 1000000,
  },
  VIC: {
    brackets: [
      { min: 0,       max: 25000,  rate: 0.014,  base: 0 },
      { min: 25001,   max: 130000, rate: 0.024,  base: 350 },
      { min: 130001,  max: 960000, rate: 0.06,   base: 2870 },
      { min: 960001,  max: Infinity, rate: 0.065, base: 52670 },
    ],
    fhbExemptUpTo: 600000,
    fhbConcessUpTo: 750000,
  },
  QLD: {
    brackets: [
      { min: 0,       max: 5000,   rate: 0,      base: 0 },
      { min: 5001,    max: 75000,  rate: 0.015,  base: 0 },
      { min: 75001,   max: 540000, rate: 0.035,  base: 1050 },
      { min: 540001,  max: 1000000, rate: 0.045, base: 17325 },
      { min: 1000001, max: Infinity, rate: 0.0575, base: 38025 },
    ],
    fhbExemptUpTo: Infinity,
    fhbNewOnly: true,
  },
  WA: {
    brackets: [
      { min: 0,       max: 120000,  rate: 0.019, base: 0 },
      { min: 120001,  max: 150000,  rate: 0.0285, base: 2280 },
      { min: 150001,  max: 360000,  rate: 0.03,   base: 3135 },
      { min: 360001,  max: 725000,  rate: 0.05,   base: 9435 },
      { min: 725001,  max: Infinity, rate: 0.051, base: 27685 },
    ],
    fhbExemptUpTo: 500000,
    fhbConcessUpTo: 600000,
  },
  SA: {
    brackets: [
      { min: 0,       max: 12000,  rate: 0.01,  base: 0 },
      { min: 12001,   max: 30000,  rate: 0.02,  base: 120 },
      { min: 30001,   max: 50000,  rate: 0.03,  base: 480 },
      { min: 50001,   max: 100000, rate: 0.035, base: 1080 },
      { min: 100001,  max: 200000, rate: 0.04,  base: 2830 },
      { min: 200001,  max: 250000, rate: 0.0425, base: 6830 },
      { min: 250001,  max: 300000, rate: 0.0450, base: 8955 },
      { min: 300001,  max: 500000, rate: 0.0475, base: 11205 },
      { min: 500001,  max: Infinity, rate: 0.05, base: 20705 },
    ],
  },
  TAS: {
    brackets: [
      { min: 0,       max: 3000,   rate: 0.01,  base: 0 },
      { min: 3001,    max: 25000,  rate: 0.0175, base: 30 },
      { min: 25001,   max: 75000,  rate: 0.025,  base: 415 },
      { min: 75001,   max: 200000, rate: 0.04,   base: 1665 },
      { min: 200001,  max: 375000, rate: 0.0425, base: 6665 },
      { min: 375001,  max: 725000, rate: 0.0450, base: 14103 },
      { min: 725001,  max: Infinity, rate: 0.045, base: 29853 },
    ],
    fhbExemptUpTo: 750000,
  },
  ACT: {
    brackets: [
      { min: 0,       max: 260000,  rate: 0.0120, base: 0 },
      { min: 260001,  max: 300000,  rate: 0.0229, base: 3120 },
      { min: 300001,  max: 500000,  rate: 0.0314, base: 4036 },
      { min: 500001,  max: 750000,  rate: 0.0383, base: 10316 },
      { min: 750001,  max: 1000000, rate: 0.0431, base: 19891 },
      { min: 1000001, max: 1455000, rate: 0.0502, base: 30666 },
      { min: 1455001, max: Infinity, rate: 0.0545, base: 53499 },
    ],
    fhbExemptUpTo: 1020000,
  },
  NT: {
    brackets: [
      { min: 0,       max: 525000,  rate: 0,     base: 0 },
      { min: 525001,  max: Infinity, rate: 0.0495, base: 0 },
    ],
  },
};

function calcStampDuty(state: State, value: number, isFHB: boolean): number {
  const cfg = STAMP_DUTY[state];

  if (isFHB) {
    if (cfg.fhbExemptUpTo && value <= cfg.fhbExemptUpTo) return 0;
    // For NT we calculate differently
  }

  // Special NT flat calculation
  if (state === "NT") {
    if (value < 525000) {
      const v = value / 1000;
      return Math.max(0, (0.06571441 * v * v + 15 * v) - (value <= 525000 ? 0 : 0));
    }
    return value * 0.0495;
  }

  let duty = 0;
  for (const b of cfg.brackets) {
    if (value <= b.max) {
      duty = b.base + (value - b.min) * b.rate;
      break;
    }
  }

  // FHB concession (partial discount for higher priced homes in some states)
  if (isFHB && cfg.fhbConcessUpTo && value <= cfg.fhbConcessUpTo) {
    const fullDuty = duty;
    const exemptDuty = calcStampDuty(state, cfg.fhbExemptUpTo || 0, false);
    const fraction = (cfg.fhbConcessUpTo - value) / (cfg.fhbConcessUpTo - (cfg.fhbExemptUpTo || 0));
    duty = fullDuty * (1 - Math.max(0, fraction));
  }

  return Math.max(0, duty);
}

const FAQS = [
  {
    question: "What is stamp duty?",
    answer: "Stamp duty (also called transfer duty) is a state government tax on property purchases. The rate and calculation method varies significantly between states and territories.",
  },
  {
    question: "Do first home buyers get stamp duty discounts?",
    answer: "Yes — most states offer exemptions or concessions for first home buyers. NSW exempts properties up to $800k; VIC up to $600k; QLD exempts new homes for FHBs; WA up to $500k; ACT up to $1.02m.",
  },
  {
    question: "When do I pay stamp duty?",
    answer: "Stamp duty is generally due within 30 days of settlement (or signing in some states). Your conveyancer or solicitor will usually arrange payment as part of settlement.",
  },
  {
    question: "Is stamp duty tax deductible?",
    answer: "For your primary home, stamp duty is not tax deductible. For investment properties, it forms part of the cost base and reduces capital gains when you eventually sell.",
  },
];

const STATES: State[] = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const STATE_NAMES: Record<State, string> = {
  NSW: "New South Wales", VIC: "Victoria", QLD: "Queensland", WA: "Western Australia",
  SA: "South Australia", TAS: "Tasmania", ACT: "ACT", NT: "Northern Territory",
};

export default function AUStampDutyCalc() {
  const [value, setValue] = useState("750000");
  const [state, setState] = useState<State>("NSW");
  const [isFHB, setIsFHB] = useState(false);

  const propertyValue = parseFloat(value) || 0;
  const duty = calcStampDuty(state, propertyValue, isFHB);
  const totalCost = propertyValue + duty;
  const cfg = STAMP_DUTY[state];

  const fmt = (n: number) => "$" + n.toLocaleString("en-AU", { maximumFractionDigits: 0 });

  return (
    <div className="space-y-5 py-6 px-4">
      <div>
        <div className="field-label">State / Territory</div>
        <select className="field-select" value={state} onChange={(e) => setState(e.target.value as State)}>
          {STATES.map((s) => (
            <option key={s} value={s}>{s} — {STATE_NAMES[s]}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="field-label">Property Value (AUD)</div>
        <div className="relative">
          <span className="field-prefix-symbol">$</span>
          <input
            type="number"
            className="field-input field-input--prefix"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="750000"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "var(--text-secondary)" }}>
        <input
          type="checkbox"
          checked={isFHB}
          onChange={(e) => setIsFHB(e.target.checked)}
          className="accent-[var(--accent)]"
        />
        First Home Buyer
      </label>

      {propertyValue > 0 && (
        <div className="space-y-3">
          {duty === 0 && isFHB && (
            <div className="px-4 py-3 rounded-xl text-sm font-medium" style={{ background: "#10b98120", color: "#10b981", border: "1px solid #10b98140" }}>
              🎉 You qualify for a full stamp duty exemption in {state}!
            </div>
          )}

          {isFHB && cfg.fhbExemptUpTo && cfg.fhbExemptUpTo !== Infinity && (
            <div className="text-xs px-1" style={{ color: "var(--text-muted)" }}>
              {state} FHB exemption: up to {fmt(cfg.fhbExemptUpTo)}
              {cfg.fhbConcessUpTo ? `, concession up to ${fmt(cfg.fhbConcessUpTo)}` : ""}
            </div>
          )}

          <div className="result-box">
            <div className="result-label">Stamp Duty Payable</div>
            <div className="result-value text-3xl">{fmt(duty)}</div>
            {propertyValue > 0 && <div className="result-sub">{((duty / propertyValue) * 100).toFixed(2)}% of property value</div>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="result-box">
              <div className="result-label">Property Price</div>
              <div className="result-value text-base">{fmt(propertyValue)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Total Cost</div>
              <div className="result-value text-base">{fmt(totalCost)}</div>
            </div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
