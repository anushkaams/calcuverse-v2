"use client";
import { useState, useMemo } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is body fat percentage?", answer: "Body fat percentage is the proportion of your total body weight that is fat. It's considered a more accurate health metric than weight alone." },
  { question: "What is a healthy body fat percentage?", answer: "For men: 6-17% is athletic to fit, 18-24% acceptable. For women: 14-24% is athletic to fit, 25-31% acceptable. These ranges vary by age." },
  { question: "How accurate is the Navy formula?", answer: "The U.S. Navy circumference method has a margin of error of about ±3-4%. DEXA scans are more accurate but require medical equipment." },
  { question: "How do I measure my waist and neck accurately?", answer: "Measure your waist at the narrowest point (usually at the navel). Measure your neck just below the Adam's apple. Use a flexible tape measure." },
];

type Gender = "male" | "female";
type Unit = "cm" | "in";

interface ValidationError {
  field: string;
  message: string;
}

const LIMITS = {
  cm: {
    height: { min: 100, max: 250, label: "100–250 cm" },
    waist:  { min: 50,  max: 200, label: "50–200 cm" },
    neck:   { min: 20,  max: 70,  label: "20–70 cm" },
    hip:    { min: 60,  max: 200, label: "60–200 cm" },
  },
  in: {
    height: { min: 39,  max: 98,  label: "39–98 in" },
    waist:  { min: 20,  max: 79,  label: "20–79 in" },
    neck:   { min: 8,   max: 28,  label: "8–28 in" },
    hip:    { min: 24,  max: 79,  label: "24–79 in" },
  },
};

function getCategory(bf: number, gender: Gender): [string, string] {
  if (gender === "male") {
    if (bf < 6)  return ["Essential Fat", "#3b82f6"];
    if (bf < 14) return ["Athletic",      "#10b981"];
    if (bf < 18) return ["Fit",           "#6366f1"];
    if (bf < 25) return ["Average",       "#f59e0b"];
    return              ["Obese",         "#ef4444"];
  } else {
    if (bf < 14) return ["Essential Fat", "#3b82f6"];
    if (bf < 21) return ["Athletic",      "#10b981"];
    if (bf < 25) return ["Fit",           "#6366f1"];
    if (bf < 32) return ["Average",       "#f59e0b"];
    return              ["Obese",         "#ef4444"];
  }
}

export default function BodyFatCalc() {
  const [gender, setGender] = useState<Gender>("male");
  const [unit, setUnit]     = useState<Unit>("cm");
  const [height, setHeight] = useState("");
  const [waist,  setWaist]  = useState("");
  const [neck,   setNeck]   = useState("");
  const [hip,    setHip]    = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Convert inches → cm for formula (formula always uses cm)
  const toCm = (v: number) => unit === "in" ? v * 2.54 : v;

  const parsed = {
    height: parseFloat(height),
    waist:  parseFloat(waist),
    neck:   parseFloat(neck),
    hip:    parseFloat(hip),
  };

  // ── Validation ──────────────────────────────────────────────────────────
  const errors = useMemo<Record<string, string>>(() => {
    const lim = LIMITS[unit];
    const errs: Record<string, string> = {};
    const fields: Array<[string, number, { min: number; max: number; label: string }]> = [
      ["height", parsed.height, lim.height],
      ["waist",  parsed.waist,  lim.waist],
      ["neck",   parsed.neck,   lim.neck],
    ];
    if (gender === "female") fields.push(["hip", parsed.hip, lim.hip]);

    for (const [field, val, lim] of fields) {
      if (!val && val !== 0) {
        errs[field] = "This field is required";
      } else if (isNaN(val)) {
        errs[field] = "Must be a number";
      } else if (val < lim.min || val > lim.max) {
        errs[field] = `Enter a value between ${lim.label}`;
      }
    }

    // Logical checks (needed for log to be defined)
    if (!errs.waist && !errs.neck) {
      if (gender === "male" && parsed.waist <= parsed.neck) {
        errs.waist = "Waist must be greater than neck";
      }
      if (gender === "female" && !errs.hip && (parsed.waist + parsed.hip) <= parsed.neck) {
        errs.waist = "Waist + hip must be greater than neck";
      }
    }

    return errs;
  }, [parsed.height, parsed.waist, parsed.neck, parsed.hip, gender, unit]);

  const allFieldsFilled =
      height !== "" && waist !== "" && neck !== "" && (gender === "male" || hip !== "");

  const isValid = allFieldsFilled && Object.keys(errors).length === 0;

  // ── Formula ──────────────────────────────────────────────────────────────
  const bf = useMemo<number>(() => {
    if (!isValid) return 0;
    const h = toCm(parsed.height);
    const w = toCm(parsed.waist);
    const n = toCm(parsed.neck);
    const hi = toCm(parsed.hip);

    if (gender === "male") {
      return 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      return 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }
  }, [isValid, gender, parsed.height, parsed.waist, parsed.neck, parsed.hip, unit]);

  const [cat, color] = isValid && bf > 0 ? getCategory(bf, gender) : ["-", "var(--text-muted)"];

  // Mark field as touched on blur
  const handleBlur = (field: string) =>
      setTouched(prev => ({ ...prev, [field]: true }));

  // Show error only if field was touched
  const fieldError = (field: string) => touched[field] ? errors[field] : undefined;

  // ── Missing fields hint ──────────────────────────────────────────────────
  const missingFields = useMemo(() => {
    const missing: string[] = [];
    if (!height) missing.push("Height");
    if (!neck)   missing.push("Neck");
    if (!waist)  missing.push("Waist");
    if (gender === "female" && !hip) missing.push("Hip");
    return missing;
  }, [height, neck, waist, hip, gender]);

  const handleGenderChange = (g: Gender) => {
    setGender(g);
    setHip("");
    setTouched({});
  };

  const handleUnitChange = (u: Unit) => {
    setUnit(u);
    setHeight("");
    setWaist("");
    setNeck("");
    setHip("");
    setTouched({});
  };

  return (
      <div className="space-y-6 py-6 px-4">
        {/* Gender toggle */}
        <div className="tab-group">
          <button
              className={`tab-item ${gender === "male" ? "active" : ""}`}
              onClick={() => handleGenderChange("male")}
          >
            Male
          </button>
          <button
              className={`tab-item ${gender === "female" ? "active" : ""}`}
              onClick={() => handleGenderChange("female")}
          >
            Female
          </button>
        </div>

        {/* Unit toggle */}
        <div className="tab-group">
          <button
              className={`tab-item ${unit === "cm" ? "active" : ""}`}
              onClick={() => handleUnitChange("cm")}
          >
            cm
          </button>
          <button
              className={`tab-item ${unit === "in" ? "active" : ""}`}
              onClick={() => handleUnitChange("in")}
          >
            inches
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <Field
              label={`Height (${unit})`}
              value={height}
              placeholder={unit === "cm" ? "175" : "69"}
              error={fieldError("height")}
              onChange={setHeight}
              onBlur={() => handleBlur("height")}
          />
          <Field
              label={`Neck (${unit})`}
              value={neck}
              placeholder={unit === "cm" ? "37" : "14.5"}
              error={fieldError("neck")}
              onChange={setNeck}
              onBlur={() => handleBlur("neck")}
          />
          <Field
              label={`Waist (${unit})`}
              value={waist}
              placeholder={unit === "cm" ? "85" : "33"}
              error={fieldError("waist")}
              onChange={setWaist}
              onBlur={() => handleBlur("waist")}
          />
          {gender === "female" && (
              <Field
                  label={`Hip (${unit})`}
                  value={hip}
                  placeholder={unit === "cm" ? "95" : "37"}
                  error={fieldError("hip")}
                  onChange={setHip}
                  onBlur={() => handleBlur("hip")}
              />
          )}
        </div>

        {/* Incomplete fields hint */}
        {missingFields.length > 0 && (
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", textAlign: "center" }}>
              Fill in: {missingFields.join(", ")} to see your result
            </p>
        )}

        {/* Result */}
        {isValid && bf > 0 && bf < 70 && (
            <div
                className="result-box"
                style={{
                  borderColor: (color as string) + "40",
                  background: (color as string) + "12",
                }}
            >
              <div className="result-label">Estimated Body Fat</div>
              <div className="result-value text-3xl" style={{ color: color as string }}>
                {bf.toFixed(1)}%
              </div>
              <div className="result-sub" style={{ color: color as string }}>
                {cat as string}
              </div>
            </div>
        )}

        {/* Edge case: formula returned unrealistic value */}
        {isValid && (bf <= 0 || bf >= 70) && (
            <p style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center" }}>
              The measurements entered produced an unrealistic result. Please double-check your values.
            </p>
        )}

        <CalculatorInfo faqs={FAQS} />
      </div>
  );
}

// ── Reusable field component ─────────────────────────────────────────────────
interface FieldProps {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}

function Field({ label, value, placeholder, error, onChange, onBlur }: FieldProps) {
  return (
      <div>
        <div className="field-label">{label}</div>
        <input
            type="number"
            className={`field-input ${error ? "border-red-400" : ""}`}
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            min={0}
        />
        {error && (
            <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "4px" }}>
              {error}
            </p>
        )}
      </div>
  );
}
