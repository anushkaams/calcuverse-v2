"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is an aspect ratio?", answer: "An aspect ratio is the proportional relationship between width and height. 16:9 means for every 16 units wide, it is 9 units tall." },
  { question: "What are common screen aspect ratios?", answer: "16:9 is the standard widescreen (HDTVs, monitors). 4:3 is classic TV. 21:9 is ultrawide. 9:16 is vertical smartphone video." },
  { question: "How do I maintain aspect ratio when resizing?", answer: "To resize while maintaining aspect ratio: new height = (new width / original width) × original height, or use this calculator." },
  { question: "What is the golden ratio?", answer: "The golden ratio is approximately 1.618:1. Many find it aesthetically pleasing, and it appears throughout nature, art, and architecture." },
];

const COMMON = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "21:9", w: 21, h: 9 },
  { label: "9:16", w: 9, h: 16 },
  { label: "3:2", w: 3, h: 2 },
];

export default function AspectRatioCalc() {
  const [mode, setMode] = useState<"find" | "resize">("find");
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [newWidth, setNewWidth] = useState("");
  const [newHeight, setNewHeight] = useState("");

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const w = parseInt(width) || 0;
  const h = parseInt(height) || 0;
  const g = gcd(w, h);
  const ratioW = g > 0 ? w / g : 0;
  const ratioH = g > 0 ? h / g : 0;
  const decimal = h > 0 ? (w / h).toFixed(4) : "0";

  const calcNewHeight = () => {
    const nw = parseFloat(newWidth) || 0;
    return h > 0 ? ((nw / w) * h).toFixed(0) : "0";
  };
  const calcNewWidth = () => {
    const nh = parseFloat(newHeight) || 0;
    return w > 0 ? ((nh / h) * w).toFixed(0) : "0";
  };

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="tab-group">
        <button className={`tab-item ${mode === "find" ? "active" : ""}`} onClick={() => setMode("find")}>Find Ratio</button>
        <button className={`tab-item ${mode === "resize" ? "active" : ""}`} onClick={() => setMode("resize")}>Resize</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {COMMON.map(c => (
          <button key={c.label} onClick={() => { setWidth(String(c.w * 100)); setHeight(String(c.h * 100)); }}
            className="px-3 py-1 text-xs rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div><div className="field-label">Width (px)</div><input type="number" className="field-input" value={width} onChange={e => setWidth(e.target.value)} /></div>
        <div><div className="field-label">Height (px)</div><input type="number" className="field-input" value={height} onChange={e => setHeight(e.target.value)} /></div>
      </div>

      {w > 0 && h > 0 && (
        <div className="space-y-3">
          <div className="result-box" style={{ borderColor: "#6366f140", background: "#6366f112" }}>
            <div className="result-label">Aspect Ratio</div>
            <div className="result-value text-3xl">{ratioW}:{ratioH}</div>
            <div className="result-sub">{decimal}:1 decimal ratio</div>
          </div>

          {mode === "resize" && (
            <div className="rounded-xl border p-4 space-y-3" style={{ borderColor: "var(--border)" }}>
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Resize keeping ratio</div>
              <div>
                <div className="field-label">New Width → Height</div>
                <div className="flex items-center gap-2">
                  <input type="number" className="field-input flex-1" value={newWidth} onChange={e => setNewWidth(e.target.value)} placeholder="1280" />
                  <span style={{ color: "var(--text-muted)" }}>→</span>
                  <div className="flex-1 field-input font-bold" style={{ color: "#6366f1" }}>{newWidth ? calcNewHeight() : "—"} px</div>
                </div>
              </div>
              <div>
                <div className="field-label">New Height → Width</div>
                <div className="flex items-center gap-2">
                  <input type="number" className="field-input flex-1" value={newHeight} onChange={e => setNewHeight(e.target.value)} placeholder="720" />
                  <span style={{ color: "var(--text-muted)" }}>→</span>
                  <div className="flex-1 field-input font-bold" style={{ color: "#6366f1" }}>{newHeight ? calcNewWidth() : "—"} px</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
