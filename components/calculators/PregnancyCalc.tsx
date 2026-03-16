"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How is due date calculated?", answer: "The standard method (Naegele's rule) adds 280 days (40 weeks) to the first day of your last menstrual period (LMP)." },
  { question: "How accurate is my due date?", answer: "Only about 5% of babies are born on their exact due date. Most arrive within 2 weeks before or after. Ultrasound dating is more accurate than LMP alone." },
  { question: "What is a full-term pregnancy?", answer: "Full term is 39–40 weeks. Babies born between 37–38 weeks are considered early term. Before 37 weeks is preterm." },
  { question: "What if I don't know my LMP date?", answer: "Your OB can estimate gestational age using an early ultrasound, which measures fetal size and is quite accurate in the first trimester." },
];

export default function PregnancyCalc() {
  const [method, setMethod] = useState<"lmp" | "conception" | "ivf">("lmp");
  const [date, setDate] = useState("");
  const [cycleLen, setCycleLen] = useState("28");

  let dueDate: Date | null = null;
  let gestWeeks = 0;
  let gestDays = 0;

  if (date) {
    const d = new Date(date);
    if (method === "lmp") {
      const cycleAdj = (parseInt(cycleLen) || 28) - 28;
      dueDate = new Date(d.getTime() + (280 + cycleAdj) * 86400000);
    } else if (method === "conception") {
      dueDate = new Date(d.getTime() + 266 * 86400000);
    } else {
      dueDate = new Date(d.getTime() + 266 * 86400000);
    }

    const today = new Date();
    const diffMs = today.getTime() - (method === "lmp" ? d.getTime() : d.getTime() - 14 * 86400000);
    const diffDays = Math.floor(diffMs / 86400000);
    gestWeeks = Math.floor(diffDays / 7);
    gestDays = diffDays % 7;
  }

  const trimester = gestWeeks < 13 ? "1st Trimester" : gestWeeks < 27 ? "2nd Trimester" : "3rd Trimester";
  const daysLeft = dueDate ? Math.ceil((dueDate.getTime() - new Date().getTime()) / 86400000) : 0;

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${method === "lmp" ? "active" : ""}`} onClick={() => setMethod("lmp")}>LMP</button>
        <button className={`tab-item ${method === "conception" ? "active" : ""}`} onClick={() => setMethod("conception")}>Conception</button>
        <button className={`tab-item ${method === "ivf" ? "active" : ""}`} onClick={() => setMethod("ivf")}>IVF Transfer</button>
      </div>

      <div>
        <div className="field-label">
          {method === "lmp" ? "First Day of Last Period" : method === "conception" ? "Conception Date" : "IVF Transfer Date"}
        </div>
        <input type="date" className="field-input" value={date} onChange={e => setDate(e.target.value)} />
      </div>

      {method === "lmp" && (
        <div>
          <div className="field-label">Average Cycle Length (days)</div>
          <input type="number" className="field-input" value={cycleLen} onChange={e => setCycleLen(e.target.value)} placeholder="28" />
        </div>
      )}

      {dueDate && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#ec489940", background: "#ec489912" }}>
            <div className="result-label">Estimated Due Date</div>
            <div className="result-value text-2xl">{dueDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
          {gestWeeks >= 0 && gestWeeks <= 42 && (
            <>
              <div className="result-box">
                <div className="result-label">Current Gestational Age</div>
                <div className="result-value">{gestWeeks}w {gestDays}d</div>
                <div className="result-sub">{trimester}</div>
              </div>
              <div className="result-box">
                <div className="result-label">{daysLeft > 0 ? "Days Until Due Date" : "Days Past Due Date"}</div>
                <div className="result-value">{Math.abs(daysLeft)} days</div>
              </div>
            </>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
