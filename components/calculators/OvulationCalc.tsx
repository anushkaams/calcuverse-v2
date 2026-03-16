"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "When do I ovulate?", answer: "Ovulation typically occurs 14 days before your next expected period. For a 28-day cycle, that's around day 14." },
  { question: "What is the fertile window?", answer: "The fertile window spans about 6 days: the 5 days before ovulation and the day of ovulation. Sperm can survive up to 5 days in the reproductive tract." },
  { question: "Does cycle length affect ovulation timing?", answer: "Yes. Ovulation day shifts with cycle length. Longer cycles mean later ovulation. Only the pre-ovulation phase varies; the post-ovulation phase is fairly constant at ~14 days." },
  { question: "How can I confirm ovulation?", answer: "Use ovulation predictor kits (OPKs), track basal body temperature (BBT), monitor cervical mucus changes, or use fertility monitors for the most accurate tracking." },
];

export default function OvulationCalc() {
  const [lmpDate, setLmpDate] = useState("");
  const [cycleLen, setCycleLen] = useState("28");

  let ovulationDate: Date | null = null;
  let fertileStart: Date | null = null;
  let fertileEnd: Date | null = null;
  let nextPeriod: Date | null = null;

  if (lmpDate) {
    const lmp = new Date(lmpDate);
    const cycle = parseInt(cycleLen) || 28;
    const ovDay = cycle - 14;
    ovulationDate = new Date(lmp.getTime() + ovDay * 86400000);
    fertileStart = new Date(lmp.getTime() + (ovDay - 5) * 86400000);
    fertileEnd = new Date(lmp.getTime() + ovDay * 86400000);
    nextPeriod = new Date(lmp.getTime() + cycle * 86400000);
  }

  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="field-label">First Day of Last Period</div>
        <input type="date" className="field-input" value={lmpDate} onChange={e => setLmpDate(e.target.value)} />
      </div>
      <div>
        <div className="field-label">Average Cycle Length (days)</div>
        <input type="number" className="field-input" value={cycleLen} onChange={e => setCycleLen(e.target.value)} placeholder="28" min="21" max="35" />
      </div>

      {ovulationDate && fertileStart && fertileEnd && nextPeriod && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#ec489940", background: "#ec489912" }}>
            <div className="result-label">🥚 Estimated Ovulation Date</div>
            <div className="result-value text-xl">{fmt(ovulationDate)}</div>
          </div>
          <div className="result-box" style={{ borderColor: "#10b98140", background: "#10b98112" }}>
            <div className="result-label">🌱 Fertile Window</div>
            <div className="result-value text-lg">{fmt(fertileStart)} — {fmt(fertileEnd)}</div>
            <div className="result-sub">6 days of highest fertility</div>
          </div>
          <div className="result-box">
            <div className="result-label">📅 Next Expected Period</div>
            <div className="result-value">{fmt(nextPeriod)}</div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
