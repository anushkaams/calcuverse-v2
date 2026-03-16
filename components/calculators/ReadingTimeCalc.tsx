"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is the average reading speed?", answer: "Adults average 200–250 words per minute (wpm) for general reading. Speed readers can exceed 400 wpm. Technical content is typically read slower." },
  { question: "How many words per page?", answer: "A standard paperback page has ~250–300 words. A printed A4 page typically has 500–600 words. Double-spaced academic papers average ~275 words per page." },
  { question: "Does reading speed affect comprehension?", answer: "Very high speeds often reduce comprehension. The sweet spot for comprehension is typically 150–300 wpm for most readers." },
  { question: "How can I improve my reading speed?", answer: "Reduce subvocalization (inner voice), use a pointer or finger, expand your eye span to take in groups of words, and practice regularly." },
];

export default function ReadingTimeCalc() {
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState("200");
  const [wordCount, setWordCount] = useState("");
  const [mode, setMode] = useState<"paste" | "count">("paste");

  const words = mode === "paste"
    ? text.trim().split(/\s+/).filter(Boolean).length
    : parseInt(wordCount) || 0;

  const minutes = words / (parseInt(wpm) || 200);
  const hrs = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.round((minutes % 1) * 60);

  const SPEED_PRESETS = [
    { label: "Slow (150)", val: "150" },
    { label: "Average (200)", val: "200" },
    { label: "Fast (300)", val: "300" },
    { label: "Speed (450)", val: "450" },
  ];

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "paste" ? "active" : ""}`} onClick={() => setMode("paste")}>Paste Text</button>
        <button className={`tab-item ${mode === "count" ? "active" : ""}`} onClick={() => setMode("count")}>Word Count</button>
      </div>

      {mode === "paste" ? (
        <div>
          <div className="field-label">Paste your text</div>
          <textarea className="field-input" rows={6} value={text} onChange={e => setText(e.target.value)} placeholder="Paste article or text here..." style={{ resize: "vertical" }} />
        </div>
      ) : (
        <div>
          <div className="field-label">Number of Words</div>
          <input type="number" className="field-input" value={wordCount} onChange={e => setWordCount(e.target.value)} placeholder="5000" />
        </div>
      )}

      <div>
        <div className="field-label">Reading Speed (wpm)</div>
        <input type="number" className="field-input" value={wpm} onChange={e => setWpm(e.target.value)} />
        <div className="flex gap-2 flex-wrap mt-2">
          {SPEED_PRESETS.map(p => (
            <button key={p.label} onClick={() => setWpm(p.val)}
              className="px-2 py-1 text-xs rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
              {p.label} wpm
            </button>
          ))}
        </div>
      </div>

      {words > 0 && (
        <div className="space-y-3">
          <div className="result-box"><div className="result-label">Word Count</div><div className="result-value">{words.toLocaleString()} words</div></div>
          <div className="result-box" style={{ borderColor: "#6366f140", background: "#6366f112" }}>
            <div className="result-label">Reading Time</div>
            <div className="result-value text-3xl">
              {hrs > 0 ? `${hrs}h ` : ""}{mins > 0 ? `${mins}m ` : ""}{secs}s
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="result-box"><div className="result-label">Pages (~250 wds)</div><div className="result-value">{(words / 250).toFixed(1)}</div></div>
            <div className="result-box"><div className="result-label">Characters</div><div className="result-value">{text.length > 0 ? text.length.toLocaleString() : "—"}</div></div>
          </div>
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
