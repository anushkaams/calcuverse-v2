import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Roman Numeral Converter - Free Online Calculator",
  description: "Free online roman numeral converter. Convert numbers to Roman numerals.",
  keywords: ["roman numeral converter", "free roman numeral converter", "online roman numeral converter"],
  openGraph: {
    title: "Roman Numeral Converter - Free Online Calculator",
    description: "Convert numbers to Roman numerals.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Roman Numeral Converter",
    description: "Convert numbers to Roman numerals.",
  },
};

export default function RomanNumeralCalcPage() {
  return <CalculatorsLayout activeId="roman-numeral" initialCategory="math" />;
}
