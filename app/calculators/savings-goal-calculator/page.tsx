import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Savings Goal Calculator - Free Online Calculator",
  description: "Free online savings goal calculator. Plan how to reach a savings target.",
  keywords: ["savings goal calculator", "free savings goal calculator", "online savings goal calculator"],
  openGraph: {
    title: "Savings Goal Calculator - Free Online Calculator",
    description: "Plan how to reach a savings target.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Savings Goal Calculator",
    description: "Plan how to reach a savings target.",
  },
};

export default function SavingsGoalCalcPage() {
  return <CalculatorsLayout activeId="savings-goal" initialCategory="finance" />;
}
