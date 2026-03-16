"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  {
    question: "How do I add or subtract time durations?",
    answer:
      "Convert all durations to seconds, perform arithmetic, then convert back. This avoids confusion with minutes/hours rollovers.",
  },
  {
    question: "What is the difference between duration and time of day?",
    answer:
      "Duration is an elapsed amount of time (e.g., 2h 30m). Time of day refers to a specific clock reading (e.g., 2:30 PM).",
  },
  {
    question: "How many seconds are in a day?",
    answer: "1 day = 24 hours = 1,440 minutes = 86,400 seconds.",
  },
  {
    question: "How do I calculate the duration between two times?",
    answer:
      "Subtract the start time from the end time. If the end time is earlier (overnight), add 24 hours to the end before subtracting.",
  },
];

type Duration = { h: string; m: string; s: string };

interface DurationInputProps {
  label: string;
  val: Duration;
  onChange: (v: Duration) => void;
}

function DurationInput({ label, val, onChange }: DurationInputProps) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <div className="flex gap-2">
        <div>
          <div className="field-label text-xs">h</div>
          <input
            type="number"
            className="field-input"
            style={{ width: "72px" }}
            value={val.h}
            min="0"
            placeholder="0"
            onChange={(e) => onChange({ ...val, h: e.target.value })}
          />
        </div>
        <div>
          <div className="field-label text-xs">m</div>
          <input
            type="number"
            className="field-input"
            style={{ width: "72px" }}
            value={val.m}
            min="0"
            max="59"
            placeholder="0"
            onChange={(e) => onChange({ ...val, m: e.target.value })}
          />
        </div>
        <div>
          <div className="field-label text-xs">s</div>
          <input
            type="number"
            className="field-input"
            style={{ width: "72px" }}
            value={val.s}
            min="0"
            max="59"
            placeholder="0"
            onChange={(e) => onChange({ ...val, s: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function toSec(d: Duration): number {
  return (
    (parseInt(d.h) || 0) * 3600 +
    (parseInt(d.m) || 0) * 60 +
    (parseInt(d.s) || 0)
  );
}

function fromSec(total: number) {
  const abs = Math.abs(total);
  return {
    h: Math.floor(abs / 3600),
    m: Math.floor((abs % 3600) / 60),
    s: abs % 60,
    neg: total < 0,
  };
}

export default function TimeDurationCalc() {
  const [mode, setMode] = useState<"add" | "subtract" | "convert">("add");
  const [d1, setD1] = useState<Duration>({ h: "", m: "", s: "" });
  const [d2, setD2] = useState<Duration>({ h: "", m: "", s: "" });
  const [seconds, setSeconds] = useState("");

  const s1 = toSec(d1);
  const s2 = toSec(d2);
  const rawResult =
    mode === "add"
      ? s1 + s2
      : mode === "subtract"
      ? s1 - s2
      : parseInt(seconds) || 0;

  const hasInput =
    mode === "convert"
      ? seconds !== ""
      : !!(d1.h || d1.m || d1.s || d2.h || d2.m || d2.s);

  const res = fromSec(rawResult);

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      {/* Mode */}
      <div className="tab-group">
        <button
          className={`tab-item ${mode === "add" ? "active" : ""}`}
          onClick={() => setMode("add")}
        >
          Add
        </button>
        <button
          className={`tab-item ${mode === "subtract" ? "active" : ""}`}
          onClick={() => setMode("subtract")}
        >
          Subtract
        </button>
        <button
          className={`tab-item ${mode === "convert" ? "active" : ""}`}
          onClick={() => setMode("convert")}
        >
          Convert
        </button>
      </div>

      {/* Inputs */}
      {mode === "convert" ? (
        <div>
          <div className="field-label">Total Seconds</div>
          <input
            type="number"
            className="field-input"
            value={seconds}
            min="0"
            placeholder="3661"
            onChange={(e) => setSeconds(e.target.value)}
          />
        </div>
      ) : (
        <>
          <DurationInput label="Duration 1" val={d1} onChange={setD1} />
          <DurationInput label="Duration 2" val={d2} onChange={setD2} />
        </>
      )}

      {/* Result */}
      {hasInput && (
        <div className="space-y-3">
          <div
            className="result-box"
            style={{ borderColor: "#6366f140", background: "#6366f112" }}
          >
            <div className="result-label">Result</div>
            <div className="result-value text-3xl">
              {res.neg && "−"}
              {res.h}h {String(res.m).padStart(2, "0")}m{" "}
              {String(res.s).padStart(2, "0")}s
            </div>
          </div>

          {(
            [
              ["Total Seconds", Math.abs(rawResult).toLocaleString()],
              ["Total Minutes", (Math.abs(rawResult) / 60).toFixed(2)],
              ["Total Hours", (Math.abs(rawResult) / 3600).toFixed(4)],
              ["Total Days", (Math.abs(rawResult) / 86400).toFixed(4)],
            ] as [string, string][]
          ).map(([label, value]) => (
            <div
              key={label}
              className="result-box flex justify-between items-center"
            >
              <span style={{ color: "var(--text-secondary)" }}>{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
