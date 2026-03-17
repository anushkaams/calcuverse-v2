"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What makes a password strong?", answer: "Length is the most important factor. A 16-character password with mixed case and symbols is far stronger than a short complex one. Aim for 12+ characters." },
  { question: "How is password entropy calculated?", answer: "Entropy (bits) = length × log₂(charset size). A 12-char password using 95 printable characters has ~78 bits of entropy — considered strong." },
  { question: "Should I use a password manager?", answer: "Yes! Password managers generate and store unique, strong passwords for every site. You only need to remember one master password." },
  { question: "What is a brute force attack?", answer: "A brute force attack tries every possible combination. The time to crack is based on the number of combinations divided by guessing speed." },
];

const CRACK_SPEEDS: Record<string, number> = {
  "Online attack (100/s)": 100,
  "Slow hash (1K/s)": 1000,
  "Fast hash (1M/s)": 1_000_000,
  "GPU cluster (1B/s)": 1_000_000_000,
};

export default function PasswordStrengthCalc() {
  const [password, setPassword] = useState("");
  const [speed, setSpeed] = useState("GPU cluster (1B/s)");
  const [showPw, setShowPw] = useState(false);

  const lower = /[a-z]/.test(password);
  const upper = /[A-Z]/.test(password);
  const digits = /[0-9]/.test(password);
  const symbols = /[^a-zA-Z0-9]/.test(password);

  let charset = 0;
  if (lower) charset += 26;
  if (upper) charset += 26;
  if (digits) charset += 10;
  if (symbols) charset += 32;
  if (charset === 0 && password.length > 0) charset = 26;

  const entropy = password.length > 0 ? password.length * Math.log2(charset) : 0;
  const combinations = charset > 0 ? Math.pow(charset, password.length) : 0;
  const crackSeconds = combinations / CRACK_SPEEDS[speed];

  const formatTime = (s: number) => {
    if (s < 1) return "Instantly";
    if (s < 60) return `${s.toFixed(1)} seconds`;
    if (s < 3600) return `${(s / 60).toFixed(1)} minutes`;
    if (s < 86400) return `${(s / 3600).toFixed(1)} hours`;
    if (s < 31536000) return `${(s / 86400).toFixed(1)} days`;
    if (s < 3.154e9) return `${(s / 31536000).toFixed(1)} years`;
    if (s < 3.154e12) return `${(s / 31536000 / 1000).toFixed(1)} thousand years`;
    return "Centuries+";
  };

  const strength = entropy < 28 ? ["Very Weak", "#ef4444", 1] :
    entropy < 36 ? ["Weak", "#f97316", 2] :
    entropy < 60 ? ["Fair", "#f59e0b", 3] :
    entropy < 80 ? ["Strong", "#10b981", 4] :
    ["Very Strong", "#3b82f6", 5];

  const [label, color, level] = strength;

  return (
    <div className="space-y-6   py-6 px-4">
      <div>
        <div className="field-label">Password</div>
        <div className="relative">
          <input type={showPw ? "text" : "password"} className="field-input pr-10" value={password}
            onChange={e => setPassword(e.target.value)} placeholder="Enter password to analyze" />
          <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: "var(--text-muted)" }}>{showPw ? "🙈" : "👁"}</button>
        </div>
      </div>

      <div>
        <div className="field-label">Attack Speed</div>
        <select className="field-input" value={speed} onChange={e => setSpeed(e.target.value)}>
          {Object.keys(CRACK_SPEEDS).map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {password.length > 0 && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span style={{ color: "var(--text-secondary)" }}>Strength</span>
              <span style={{ color: color as string }}>{label as string}</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${(level as number) / 5 * 100}%`, background: color as string }} />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap text-xs">
            {[
              ["Lowercase", lower],["Uppercase", upper],
              ["Numbers", digits],["Symbols", symbols],
            ].map(([t, ok]) => (
              <span key={t as string} className="px-2 py-1 rounded-full"
                style={{ background: (ok ? "#10b981" : "#ef4444") + "20", color: ok ? "#10b981" : "#ef4444" }}>
                {ok ? "✓" : "✗"} {t as string}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {[
              ["Length", `${password.length} characters`],
              ["Charset size", `${charset} characters`],
              ["Entropy", `${entropy.toFixed(1)} bits`],
              ["Time to crack", formatTime(crackSeconds)],
            ].map(([l, v]) => (
              <div key={l as string} className="result-box flex justify-between">
                <span style={{ color: "var(--text-secondary)" }}>{l as string}</span>
                <span className="font-bold">{v as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
