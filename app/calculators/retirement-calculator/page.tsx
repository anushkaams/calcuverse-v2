import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Retirement Calculator - Free Online Calculator",
  description: "Free online retirement calculator. Plan your retirement savings.",
  keywords: ["retirement calculator", "free retirement calculator", "online retirement calculator"],
  openGraph: {
    title: "Retirement Calculator - Free Online Calculator",
    description: "Plan your retirement savings.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Retirement Calculator",
    description: "Plan your retirement savings.",
  },
};

export default function RetirementCalcPage() {
  return <CalculatorsLayout activeId="retirement" initialCategory="finance" />;
}
