import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Scientific Notation Converter - Free Online Calculator",
  description: "Free online scientific notation converter. Convert to and from scientific notation.",
  keywords: ["scientific notation converter", "free scientific notation converter", "online scientific notation converter"],
  openGraph: {
    title: "Scientific Notation Converter - Free Online Calculator",
    description: "Convert to and from scientific notation.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Scientific Notation Converter",
    description: "Convert to and from scientific notation.",
  },
};

export default function ScientificNotationCalcPage() {
  return <CalculatorsLayout activeId="scientific-notation" initialCategory="math" />;
}
