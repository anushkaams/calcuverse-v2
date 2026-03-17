import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Loan Calculator - Free Online Calculator",
  description: "Free online loan calculator. Monthly payment and interest calculator.",
  keywords: ["loan calculator", "free loan calculator", "online loan calculator"],
  openGraph: {
    title: "Loan Calculator - Free Online Calculator",
    description: "Monthly payment and interest calculator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Loan Calculator",
    description: "Monthly payment and interest calculator.",
  },
};

export default function LoanCalcPage() {
  return <CalculatorsLayout activeId="loan" initialCategory="finance" />;
}
