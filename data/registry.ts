// ============================================================
// CALCULATOR REGISTRY
// To add a new calculator:
//  1. Create a new file in /components/calculators/YourCalc.tsx
//  2. Add an entry to CALCULATORS below
//  3. Done! It will automatically appear in the UI.
// ============================================================

import { lazy } from "react";
import type { ComponentType } from "react";

export type CalcCategory =
  | "everyday"
  | "finance"
  | "math"
  | "science"
  | "health"
  | "conversion"
  | "date-time";

export interface CalculatorMeta {
  id: string;
  name: string;
  description: string;
  category: CalcCategory;
  icon: string;
  component: ComponentType;
  tags?: string[];
}

export const CATEGORY_LABELS: Record<CalcCategory, string> = {
  everyday: "Everyday",
  finance: "Finance",
  math: "Math",
  science: "Science",
  health: "Health",
  conversion: "Conversion",
  "date-time": "Date & Time",
};

export const CATEGORY_COLORS: Record<CalcCategory, string> = {
  everyday: "#6366f1",
  finance: "#10b981",
  math: "#f59e0b",
  science: "#3b82f6",
  health: "#ef4444",
  conversion: "#8b5cf6",
  "date-time": "#ec4899",
};

export const CALCULATORS: CalculatorMeta[] = [
  // ── Everyday ──────────────────────────────────────────────
  {
    id: "standard",
    name: "Standard",
    description: "Basic arithmetic operations",
    category: "everyday",
    icon: "🧮",
    component: lazy(() => import("../components/calculators/StandardCalc")),
    tags: ["basic", "arithmetic"],
  },
  {
    id: "tip",
    name: "Tip Calculator",
    description: "Split bills and calculate tips",
    category: "everyday",
    icon: "🍽️",
    component: lazy(() => import("../components/calculators/TipCalc")),
    tags: ["tip", "split", "restaurant"],
  },
  {
    id: "discount",
    name: "Discount",
    description: "Calculate sale prices and savings",
    category: "everyday",
    icon: "🏷️",
    component: lazy(() => import("../components/calculators/DiscountCalc")),
    tags: ["sale", "percent off"],
  },
  {
    id: "sleep",
    name: "Sleep Cycle",
    description: "Best bedtimes based on sleep cycles",
    category: "everyday",
    icon: "😴",
    component: lazy(() => import("../components/calculators/SleepCalc/page")),
    tags: ["sleep", "bedtime", "wake up", "cycles"],
  },
  {
    id: "fuel",
    name: "Fuel Cost",
    description: "Estimate trip fuel expenses",
    category: "everyday",
    icon: "⛽",
    component: lazy(() => import("../components/calculators/FuelCalc/page")),
    tags: ["gas", "trip", "mpg"],
  },

  // ── Finance ───────────────────────────────────────────────
  {
    id: "compound-interest",
    name: "Compound Interest",
    description: "Grow your investment over time",
    category: "finance",
    icon: "📈",
    component: lazy(
      () => import("../components/calculators/CompoundInterestCalc"),
    ),
    tags: ["investment", "savings", "APY"],
  },
  {
    id: "loan",
    name: "Loan / EMI",
    description: "Monthly payment and total interest",
    category: "finance",
    icon: "🏦",
    component: lazy(() => import("../components/calculators/LoanCalc")),
    tags: ["mortgage", "EMI", "payment"],
  },

  // ── Math ──────────────────────────────────────────────────
  {
    id: "scientific",
    name: "Scientific",
    description: "Trig, logarithms, powers and more",
    category: "math",
    icon: "🔬",
    component: lazy(() => import("../components/calculators/ScientificCalc")),
    tags: ["sin", "cos", "log", "sqrt"],
  },
  {
    id: "percentage",
    name: "Percentage",
    description: "Percentage of, increase, decrease",
    category: "math",
    icon: "%",
    component: lazy(() => import("../components/calculators/PercentageCalc")),
    tags: ["percent", "ratio"],
  },
  {
    id: "fraction",
    name: "Fraction",
    description: "Simplify and operate on fractions",
    category: "math",
    icon: "½",
    component: lazy(() => import("../components/calculators/FractionCalc")),
    tags: ["numerator", "denominator"],
  },
  {
    id: "statistics",
    name: "Statistics",
    description: "Mean, median, mode, std deviation",
    category: "math",
    icon: "📊",
    component: lazy(() => import("../components/calculators/StatisticsCalc")),
    tags: ["average", "variance", "std"],
  },
  {
    id: "quadratic",
    name: "Quadratic",
    description: "Solve ax² + bx + c = 0",
    category: "math",
    icon: "📐",
    component: lazy(() => import("../components/calculators/QuadraticCalc")),
    tags: ["roots", "discriminant", "equation"],
  },
  {
    id: "matrix",
    name: "Matrix (2×2)",
    description: "Determinant, inverse, multiply",
    category: "math",
    icon: "🔢",
    component: lazy(() => import("../components/calculators/MatrixCalc")),
    tags: ["linear algebra", "determinant"],
  },

  // ── Science ───────────────────────────────────────────────
  {
    id: "ohms-law",
    name: "Ohm's Law",
    description: "Voltage, current, resistance, power",
    category: "science",
    icon: "⚡",
    component: lazy(() => import("../components/calculators/OhmsLawCalc")),
    tags: ["electronics", "V=IR"],
  },
  {
    id: "density",
    name: "Density",
    description: "Mass, volume, density triangle",
    category: "science",
    icon: "⚖️",
    component: lazy(() => import("../components/calculators/DensityCalc")),
    tags: ["mass", "volume", "physics"],
  },
  {
    id: "speed",
    name: "Speed / Distance / Time",
    description: "Solve any leg of the SDT triangle",
    category: "science",
    icon: "🚀",
    component: lazy(() => import("../components/calculators/SpeedCalc")),
    tags: ["velocity", "kinematics"],
  },
  {
    id: "kinetic-energy",
    name: "Kinetic Energy",
    description: "KE = ½mv² solver",
    category: "science",
    icon: "💥",
    component: lazy(
      () => import("../components/calculators/KineticEnergyCalc"),
    ),
    tags: ["physics", "energy", "mass"],
  },

  // ── Health ────────────────────────────────────────────────
  {
    id: "bmi",
    name: "BMI",
    description: "Body mass index calculator",
    category: "health",
    icon: "🏃",
    component: lazy(() => import("../components/calculators/BMICalc")),
    tags: ["body", "weight", "height"],
  },
  {
    id: "calorie",
    name: "Calorie",
    description: "Daily calorie needs (TDEE)",
    category: "health",
    icon: "🔥",
    component: lazy(() => import("../components/calculators/CalorieCalc")),
    tags: ["TDEE", "BMR", "diet"],
  },
  {
    id: "water-intake",
    name: "Water Intake",
    description: "Recommended daily hydration",
    category: "health",
    icon: "💧",
    component: lazy(() => import("../components/calculators/WaterIntakeCalc")),
    tags: ["hydration", "drink"],
  },
  {
    id: "heart-rate",
    name: "Heart Rate Zones",
    description: "Target heart rate by exercise zone",
    category: "health",
    icon: "❤️",
    component: lazy(() => import("../components/calculators/HeartRateCalc")),
    tags: ["cardio", "training", "HR"],
  },

  // ── Conversion ────────────────────────────────────────────
  {
    id: "length",
    name: "Length",
    description: "Meters, feet, inches, miles and more",
    category: "conversion",
    icon: "📏",
    component: lazy(() => import("../components/calculators/LengthConvCalc")),
    tags: ["distance", "unit"],
  },
  {
    id: "weight",
    name: "Weight / Mass",
    description: "kg, lbs, oz, grams and more",
    category: "conversion",
    icon: "⚖️",
    component: lazy(() => import("../components/calculators/WeightConvCalc")),
    tags: ["mass", "unit"],
  },
  {
    id: "temperature",
    name: "Temperature",
    description: "Celsius, Fahrenheit, Kelvin",
    category: "conversion",
    icon: "🌡️",
    component: lazy(() => import("../components/calculators/TemperatureCalc")),
    tags: ["C", "F", "K"],
  },
  {
    id: "area",
    name: "Area",
    description: "Square units converter",
    category: "conversion",
    icon: "🟦",
    component: lazy(() => import("../components/calculators/AreaConvCalc")),
    tags: ["m²", "ft²", "hectare"],
  },
  {
    id: "data",
    name: "Data Storage",
    description: "Bits, bytes, KB, MB, GB, TB",
    category: "conversion",
    icon: "💾",
    component: lazy(() => import("../components/calculators/DataConvCalc")),
    tags: ["bytes", "digital"],
  },
  {
    id: "number-base",
    name: "Number Base",
    description: "Binary, octal, decimal, hex",
    category: "conversion",
    icon: "🔟",
    component: lazy(() => import("../components/calculators/NumberBaseCalc")),
    tags: ["binary", "hex", "octal"],
  },

  // ── Date & Time ───────────────────────────────────────────
  {
    id: "age",
    name: "Age",
    description: "Exact age from date of birth",
    category: "date-time",
    icon: "🎂",
    component: lazy(() => import("../components/calculators/AgeCalc/page")),
    tags: ["birthday", "years"],
  },
  {
    id: "date-diff",
    name: "Date Difference",
    description: "Days, weeks, months between dates",
    category: "date-time",
    icon: "📅",
    component: lazy(() => import("../components/calculators/DateDiffCalc")),
    tags: ["days", "countdown"],
  },
  {
    id: "time-zone",
    name: "Time Zone",
    description: "Convert between world time zones",
    category: "date-time",
    icon: "🌐",
    component: lazy(() => import("../components/calculators/TimeZoneCalc")),
    tags: ["UTC", "GMT", "world clock"],
  },
];
