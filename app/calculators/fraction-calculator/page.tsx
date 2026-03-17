import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Fraction Calculator - Free Online Calculator",
  description: "Free online fraction calculator. Add, subtract, multiply fractions.",
  keywords: ["fraction calculator", "free fraction calculator", "online fraction calculator"],
  openGraph: {
    title: "Fraction Calculator - Free Online Calculator",
    description: "Add, subtract, multiply fractions.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fraction Calculator",
    description: "Add, subtract, multiply fractions.",
  },
};

export default function FractionCalcPage() {
  return <CalculatorsLayout activeId="fraction" initialCategory="math" />;
}
