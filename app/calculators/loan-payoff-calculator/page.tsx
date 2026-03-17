import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Loan Payoff Calculator - Free Online Calculator",
  description: "Free online loan payoff calculator. Calculate loan payoff timeline.",
  keywords: ["loan payoff calculator", "free loan payoff calculator", "online loan payoff calculator"],
  openGraph: {
    title: "Loan Payoff Calculator - Free Online Calculator",
    description: "Calculate loan payoff timeline.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Loan Payoff Calculator",
    description: "Calculate loan payoff timeline.",
  },
};

export default function LoanPayoffCalcPage() {
  return <CalculatorsLayout activeId="loan-payoff" initialCategory="finance" />;
}
