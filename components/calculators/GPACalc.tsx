"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const GRADE_MAP: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};
const GRADES = Object.keys(GRADE_MAP);

const FAQS = [
  { question: "How is GPA calculated?", answer: "GPA is calculated by multiplying each course's grade points by its credit hours, summing all those values, and dividing by total credit hours." },
  { question: "What is a good GPA?", answer: "A 3.5+ GPA is generally considered excellent. Most employers and graduate schools look for a minimum of 3.0. Requirements vary by program." },
  { question: "What is the difference between weighted and unweighted GPA?", answer: "Unweighted GPA uses a standard 4.0 scale. Weighted GPA gives extra points for advanced or honors courses, potentially exceeding 4.0." },
  { question: "Can I raise my GPA significantly?", answer: "Earlier in your academic career it's easier to raise. Later, each semester has less impact. Focus on the courses with the most credit hours." },
];

type Course = { name: string; grade: string; credits: string };

export default function GPACalc() {
  const [courses, setCourses] = useState<Course[]>([
    { name: "Course 1", grade: "A", credits: "3" },
    { name: "Course 2", grade: "B+", credits: "3" },
    { name: "Course 3", grade: "A-", credits: "4" },
  ]);

  const addCourse = () => setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: "B", credits: "3" }]);
  const remove = (i: number) => setCourses(courses.filter((_, idx) => idx !== i));
  const update = (i: number, key: keyof Course, val: string) => {
    const copy = [...courses];
    copy[i] = { ...copy[i], [key]: val };
    setCourses(copy);
  };

  const totalCredits = courses.reduce((s, c) => s + (parseFloat(c.credits) || 0), 0);
  const totalPoints = courses.reduce((s, c) => s + (GRADE_MAP[c.grade] ?? 0) * (parseFloat(c.credits) || 0), 0);
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const gpaColor = gpa >= 3.7 ? "#10b981" : gpa >= 3.0 ? "#6366f1" : gpa >= 2.0 ? "#f59e0b" : "#ef4444";

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="space-y-2">
        {courses.map((c, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input className="field-input flex-1 min-w-0" value={c.name} onChange={e => update(i, "name", e.target.value)} placeholder="Course" />
            <select className="field-input w-20" value={c.grade} onChange={e => update(i, "grade", e.target.value)}>
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <input type="number" className="field-input w-16" value={c.credits} onChange={e => update(i, "credits", e.target.value)} placeholder="cr" />
            <button onClick={() => remove(i)} style={{ color: "var(--text-muted)" }} className="text-lg px-1">×</button>
          </div>
        ))}
      </div>

      <button onClick={addCourse} className="w-full py-2 rounded-lg text-sm border border-dashed" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        + Add Course
      </button>

      {totalCredits > 0 && (
        <div className="result-box" style={{ borderColor: gpaColor + "40", background: gpaColor + "12" }}>
          <div className="result-label">Semester GPA</div>
          <div className="result-value text-4xl" style={{ color: gpaColor }}>{gpa.toFixed(2)}</div>
          <div className="result-sub">{totalCredits} total credit hours</div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
