"use client";

interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorInfoProps {
  title?: string; // Optional section tit
  faqs: FAQItem[]; // Array of Q&A
}

export default function CalculatorInfo({
  title = "Guide & FAQ",
  faqs,
}: CalculatorInfoProps) {
  return (
    <div
      className="space-y-4 p-4 rounded-xl border"
      style={{ borderColor: "var(--border)", background: "var(--surface-1)" }}
    >
      <h2
        className="font-semibold text-lg mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>

      {faqs.map((f, i) => (
        <div key={i} className="space-y-1">
          <div className="font-medium" style={{ color: "var(--text-primary)" }}>
            Q: {f.question}
          </div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            A: {f.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
