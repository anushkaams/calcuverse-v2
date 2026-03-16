"use client";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorInfoProps {
  title?: string;
  faqs: FAQItem[];
}

export default function CalculatorInfo({
                                         title = "Guide & FAQ",
                                         faqs,
                                       }: CalculatorInfoProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
      <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--border)", background: "var(--surface-1)" }}
      >
        <div
            className="px-5 py-4 border-b flex items-center gap-2"
            style={{ borderColor: "var(--border)" }}
        >
          <span className="text-base">💡</span>
          <h2
              className="font-semibold text-base"
              style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h2>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
                <div key={i}>
                  <button
                      className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-3 transition-colors"
                      style={{
                        background: isOpen ? "var(--surface-2, rgba(255,255,255,0.03))" : "transparent",
                        color: "var(--text-primary)",
                      }}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <span className="font-medium text-sm">{f.question}</span>
                    <span
                        className="text-lg leading-none flex-shrink-0 transition-transform duration-200"
                        style={{
                          color: "var(--text-muted)",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                    >
                  +
                </span>
                  </button>
                  {isOpen && (
                      <div
                          className="px-5 pb-4 text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                      >
                        {f.answer}
                      </div>
                  )}
                </div>
            );
          })}
        </div>
      </div>
  );
}
