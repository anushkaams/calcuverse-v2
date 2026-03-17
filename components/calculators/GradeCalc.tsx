"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "How is a letter grade determined?", answer: "Most US grading scales assign A for 90–100%, B for 80–89%, C for 70–79%, D for 60–69%, and F below 60%. Scales vary by institution." },
  { question: "What is a weighted grade?", answer: "Weighted grades give different assignments different values. A 30% exam counts more toward the final grade than a 10% quiz." },
  { question: "How do I calculate what I need on my final?", answer: "Use: Required = (Target grade – Current grade × (1 – Final weight)) / Final weight. This calculator does it for you." },
  { question: "What is the difference between points-based and percentage-based grading?", answer: "Points-based systems total raw points. Percentage-based systems weight each category. Both lead to the same final percentage if done correctly." },
];

type Assignment = { name: string; score: string; total: string; weight: string };

export default function GradeCalc() {
  const [mode, setMode] = useState<"simple" | "weighted">("simple");
  const [assignments, setAssignments] = useState<Assignment[]>([
    { name: "Homework", score: "", total: "100", weight: "20" },
    { name: "Midterm", score: "", total: "100", weight: "30" },
    { name: "Final Exam", score: "", total: "100", weight: "50" },
  ]);
  const [targetGrade, setTargetGrade] = useState("90");
  const [currentGrade, setCurrentGrade] = useState("");
  const [finalWeight, setFinalWeight] = useState("30");

  const addRow = () => setAssignments([...assignments, { name: "", score: "", total: "100", weight: "10" }]);
  const update = (i: number, k: keyof Assignment, v: string) => { const c = [...assignments]; c[i] = { ...c[i], [k]: v }; setAssignments(c); };

  const totalWeightPts = assignments.reduce((s, a) => s + (parseFloat(a.weight) || 0) * (parseFloat(a.score) || 0) / (parseFloat(a.total) || 1), 0);
  const totalWeight = assignments.reduce((s, a) => s + (parseFloat(a.weight) || 0), 0);
  const weightedGrade = totalWeight > 0 ? totalWeightPts / totalWeight * 100 : 0;

  const simpleTotal = assignments.reduce((s, a) => s + (parseFloat(a.score) || 0), 0);
  const simpleMax = assignments.reduce((s, a) => s + (parseFloat(a.total) || 0), 0);
  const simpleGrade = simpleMax > 0 ? (simpleTotal / simpleMax) * 100 : 0;

  const grade = mode === "weighted" ? weightedGrade : simpleGrade;

  const getLetterGrade = (pct: number) => {
    if (pct >= 97) return "A+"; if (pct >= 93) return "A"; if (pct >= 90) return "A-";
    if (pct >= 87) return "B+"; if (pct >= 83) return "B"; if (pct >= 80) return "B-";
    if (pct >= 77) return "C+"; if (pct >= 73) return "C"; if (pct >= 70) return "C-";
    if (pct >= 67) return "D+"; if (pct >= 60) return "D"; return "F";
  };

  const needed = currentGrade && finalWeight
    ? ((parseFloat(targetGrade) - parseFloat(currentGrade) * (1 - parseFloat(finalWeight) / 100)) / (parseFloat(finalWeight) / 100))
    : null;

  const gradeColor = grade >= 90 ? "#10b981" : grade >= 80 ? "#6366f1" : grade >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "simple" ? "active" : ""}`} onClick={() => setMode("simple")}>Points</button>
        <button className={`tab-item ${mode === "weighted" ? "active" : ""}`} onClick={() => setMode("weighted")}>Weighted</button>
      </div>

      <div className="space-y-2">
        {assignments.map((a, i) => (
          <div key={i} className="flex gap-2 items-end text-sm">
            <input className="field-input flex-1 min-w-0" placeholder="Name" value={a.name} onChange={e => update(i, "name", e.target.value)} />
            <div className="w-16"><div className="field-label text-xs">Score</div><input type="number" className="field-input" value={a.score} onChange={e => update(i, "score", e.target.value)} /></div>
            <div className="w-16"><div className="field-label text-xs">Max</div><input type="number" className="field-input" value={a.total} onChange={e => update(i, "total", e.target.value)} /></div>
            {mode === "weighted" && <div className="w-16"><div className="field-label text-xs">Wt%</div><input type="number" className="field-input" value={a.weight} onChange={e => update(i, "weight", e.target.value)} /></div>}
            <button onClick={() => setAssignments(assignments.filter((_, idx) => idx !== i))} style={{ color: "var(--text-muted)" }} className="pb-2">×</button>
          </div>
        ))}
        <button onClick={addRow} className="w-full py-1.5 text-xs border border-dashed rounded-lg" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>+ Add</button>
      </div>

      {grade > 0 && (
        <div className="result-box" style={{ borderColor: gradeColor + "40", background: gradeColor + "12" }}>
          <div className="result-label">Current Grade</div>
          <div className="result-value text-4xl" style={{ color: gradeColor }}>{grade.toFixed(1)}% — {getLetterGrade(grade)}</div>
        </div>
      )}

      <div className="rounded-xl border p-4 space-y-3" style={{ borderColor: "var(--border)" }}>
        <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>What do I need on my final?</div>
        <div className="grid grid-cols-3 gap-2">
          <div><div className="field-label text-xs">Current %</div><input type="number" className="field-input" value={currentGrade} onChange={e => setCurrentGrade(e.target.value)} placeholder="75" /></div>
          <div><div className="field-label text-xs">Final Wt%</div><input type="number" className="field-input" value={finalWeight} onChange={e => setFinalWeight(e.target.value)} /></div>
          <div><div className="field-label text-xs">Target %</div><input type="number" className="field-input" value={targetGrade} onChange={e => setTargetGrade(e.target.value)} /></div>
        </div>
        {needed !== null && (
          <div className="text-center font-bold" style={{ color: needed > 100 ? "#ef4444" : needed < 0 ? "#10b981" : "var(--text-primary)" }}>
            {needed > 100 ? "Not possible — need over 100%" : needed < 0 ? "Any score will do! 🎉" : `Need ${needed.toFixed(1)}% on final`}
          </div>
        )}
      </div>

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
