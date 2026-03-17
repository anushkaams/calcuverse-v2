import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Free Online Calculator",
  description: "Free online compound interest calculator. Calculate compound interest growth.",
  keywords: ["compound interest calculator", "free compound interest calculator", "online compound interest calculator"],
  openGraph: {
    title: "Compound Interest Calculator - Free Online Calculator",
    description: "Calculate compound interest growth.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Compound Interest Calculator",
    description: "Calculate compound interest growth.",
  },
};

export default function CompoundInterestCalcPage() {
  return <CalculatorsLayout activeId="compound-interest" initialCategory="finance" />;
}
