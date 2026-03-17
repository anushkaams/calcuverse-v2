import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Number Base Converter - Free Online Calculator",
  description: "Free online number base converter. Convert between number bases.",
  keywords: ["number base converter", "free number base converter", "online number base converter"],
  openGraph: {
    title: "Number Base Converter - Free Online Calculator",
    description: "Convert between number bases.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Number Base Converter",
    description: "Convert between number bases.",
  },
};

export default function NumberBaseCalcPage() {
  return <CalculatorsLayout activeId="number-base" initialCategory="math" />;
}
