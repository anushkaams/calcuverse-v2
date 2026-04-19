"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

type State = "NSW" | "VIC" | "QLD" | "WA" | "SA";

// Subject scaling factors by state (approximate, based on historical data)
const SCALING: Record<State, Record<string, number>> = {
  NSW: {
    "Mathematics Extension 2": 1.35,
    "Mathematics Extension 1": 1.20,
    "Physics": 1.15,
    "Chemistry": 1.12,
    "Economics": 1.08,
    "English Advanced": 1.05,
    "Biology": 1.03,
    "Modern History": 1.02,
    "Business Studies": 1.00,
    "English Standard": 0.95,
    "Visual Arts": 0.95,
    "Physical Education": 0.92,
    "Drama": 0.90,
  },
  VIC: {
    "Specialist Mathematics": 1.30,
    "Mathematical Methods": 1.18,
    "Physics": 1.14,
    "Chemistry": 1.11,
    "Further Mathematics": 1.05,
    "English": 1.04,
    "Biology": 1.02,
    "History": 1.01,
    "Business Management": 0.99,
    "PE": 0.91,
    "Drama/Theatre Studies": 0.90,
    "Art": 0.90,
  },
  QLD: {
    "Specialist Mathematics": 1.28,
    "Mathematical Methods": 1.16,
    "Physics": 1.13,
    "Chemistry": 1.10,
    "English": 1.04,
    "Biology": 1.02,
    "Modern History": 1.00,
    "Economics": 1.05,
    "Business": 0.98,
    "Physical Education": 0.90,
    "Drama": 0.89,
    "Visual Art": 0.88,
  },
  WA: {
    "Mathematics Specialist": 1.30,
    "Mathematics Methods": 1.17,
    "Physics": 1.14,
    "Chemistry": 1.10,
    "English": 1.03,
    "Biology": 1.02,
    "Economics": 1.05,
    "History": 1.01,
    "Physical Education Studies": 0.90,
    "Drama": 0.89,
    "Visual Arts": 0.88,
  },
  SA: {
    "Mathematical Methods": 1.18,
    "Specialist Mathematics": 1.28,
    "Physics": 1.12,
    "Chemistry": 1.10,
    "English": 1.04,
    "Biology": 1.02,
    "History": 1.01,
    "Business Innovation": 0.98,
    "PE": 0.90,
    "Drama": 0.89,
  },
};

const STATE_LABELS: Record<State, string> = {
  NSW: "NSW (HSC)",
  VIC: "VIC (VCE)",
  QLD: "QLD (QCE)",
  WA: "WA (WACE)",
  SA: "SA (SACE)",
};

const GRADE_TO_SCORE: Record<string, number> = {
  "A (90–100)": 95,
  "B (80–89)": 84,
  "C (70–79)": 74,
  "D (60–69)": 64,
  "E (50–59)": 54,
  "F (<50)": 44,
};

const FAQS = [
  {
    question: "What is ATAR?",
    answer: "The Australian Tertiary Admission Rank (ATAR) is a number from 0 to 99.95 indicating your rank relative to all Year 12 students in your state. It's used by universities to allocate places in courses.",
  },
  {
    question: "How is ATAR calculated?",
    answer: "ATAR is based on your best subjects (usually 4–5) with subject scaling applied to account for difficulty differences. Scaling ensures it's fair to compare students who chose different subjects.",
  },
  {
    question: "Why do some subjects scale higher?",
    answer: "Subjects that attract high-performing students across the board — like Extension Maths and Physics — scale higher because students who study them tend to perform well in all subjects. This reflects the cohort's overall ability, not just subject difficulty.",
  },
  {
    question: "Should I pick subjects just for higher scaling?",
    answer: "No — education experts consistently advise against this. You're likely to perform better in subjects you enjoy and understand, which usually outweighs any scaling benefit from a harder subject you struggle with.",
  },
  {
    question: "Is this calculator official?",
    answer: "No. This is an estimator based on approximate historical scaling data. Actual ATARs are calculated by your state's tertiary admissions centre (UAC, VTAC, QTAC, TISC, or SATAC) and can vary year to year.",
  },
];

interface Subject {
  name: string;
  grade: string;
}

const STATES: State[] = ["NSW", "VIC", "QLD", "WA", "SA"];

export default function AUATARCalc() {
  const [state, setState] = useState<State>("NSW");
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "English Advanced", grade: "B (80–89)" },
    { name: "Mathematics Extension 1", grade: "B (80–89)" },
    { name: "Physics", grade: "C (70–79)" },
    { name: "Chemistry", grade: "C (70–79)" },
    { name: "Biology", grade: "B (80–89)" },
  ]);

  const subjectList = Object.keys(SCALING[state]);

  const updateSubject = (index: number, field: keyof Subject, value: string) => {
    setSubjects((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addSubject = () => {
    if (subjects.length < 6) setSubjects((prev) => [...prev, { name: subjectList[0], grade: "B (80–89)" }]);
  };

  const removeSubject = (index: number) => {
    if (subjects.length > 4) setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculate scaled scores
  const scaledScores = subjects.map((s) => {
    const raw = GRADE_TO_SCORE[s.grade] || 74;
    const scale = SCALING[state][s.name] || 1.0;
    return raw * scale;
  });

  // Use best 4 for ATAR estimate
  const sorted = [...scaledScores].sort((a, b) => b - a);
  const best4 = sorted.slice(0, 4);
  const aggregateScore = best4.reduce((sum, s) => sum + s, 0) / 4;

  // Convert aggregate score to approximate ATAR (rough linear mapping 44–99 → 0–99.95)
  const estimatedATAR = Math.min(99.95, Math.max(0, ((aggregateScore - 44) / 55) * 99.95));

  return (
    <div className="space-y-5 py-6 px-4">
      <div>
        <div className="field-label">State / Curriculum</div>
        <select className="field-select" value={state} onChange={(e) => { setState(e.target.value as State); setSubjects(subjects.map((s) => ({ ...s, name: Object.keys(SCALING[e.target.value as State])[0] }))); }}>
          {STATES.map((s) => <option key={s} value={s}>{STATE_LABELS[s]}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <div className="field-label">Subjects (best 4 are used)</div>
        {subjects.map((s, i) => (
          <div key={i} className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
            <select
              className="field-select text-sm"
              value={s.name}
              onChange={(e) => updateSubject(i, "name", e.target.value)}
            >
              {subjectList.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
            </select>
            <select
              className="field-select text-sm"
              value={s.grade}
              onChange={(e) => updateSubject(i, "grade", e.target.value)}
            >
              {Object.keys(GRADE_TO_SCORE).map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <button
              onClick={() => removeSubject(i)}
              className="px-2 py-1 rounded-lg text-sm"
              style={{ color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)" }}
              disabled={subjects.length <= 4}
            >✕</button>
          </div>
        ))}
        {subjects.length < 6 && (
          <button
            onClick={addSubject}
            className="text-sm px-3 py-1.5 rounded-lg"
            style={{ color: "var(--accent)", background: "var(--accent-soft)", border: "1px solid var(--border)" }}
          >+ Add subject</button>
        )}
      </div>

      <div className="space-y-3">
        <div className="result-box">
          <div className="result-label">Estimated ATAR</div>
          <div className="result-value text-4xl">{estimatedATAR.toFixed(2)}</div>
          <div className="result-sub">Estimate only — actual ATAR may vary</div>
        </div>

        <div className="p-4 rounded-xl border text-xs space-y-1.5" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
          <div className="font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Scaled scores (descending)</div>
          {subjects
            .map((s, i) => ({ name: s.name, raw: GRADE_TO_SCORE[s.grade], scaled: scaledScores[i], isUsed: i < 4 }))
            .sort((a, b) => b.scaled - a.scaled)
            .map((s, i) => (
              <div key={i} className="flex justify-between" style={{ color: i < 4 ? "var(--text-primary)" : "var(--text-muted)" }}>
                <span>{s.name}{i < 4 ? "" : " (not counted)"}</span>
                <span>{s.scaled.toFixed(1)}</span>
              </div>
            ))}
        </div>

        <div className="text-xs px-1" style={{ color: "var(--text-muted)" }}>
          ⚠️ This is an estimate using approximate scaling factors. For official results contact UAC, VTAC, QTAC, TISC or SATAC.
        </div>
      </div>

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
