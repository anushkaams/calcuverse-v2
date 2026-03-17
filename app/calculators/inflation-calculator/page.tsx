import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Inflation Calculator - Free Online Calculator",
  description: "Free online inflation calculator. Calculate inflation impact over time.",
  keywords: ["inflation calculator", "free inflation calculator", "online inflation calculator"],
  openGraph: {
    title: "Inflation Calculator - Free Online Calculator",
    description: "Calculate inflation impact over time.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Inflation Calculator",
    description: "Calculate inflation impact over time.",
  },
};

export default function InflationCalcPage() {
  return <CalculatorsLayout activeId="inflation" initialCategory="finance" />;
}
