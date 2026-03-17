import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Paycheck Calculator - Free Online Calculator",
  description: "Free online paycheck calculator. Estimate your take-home pay.",
  keywords: ["paycheck calculator", "free paycheck calculator", "online paycheck calculator"],
  openGraph: {
    title: "Paycheck Calculator - Free Online Calculator",
    description: "Estimate your take-home pay.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Paycheck Calculator",
    description: "Estimate your take-home pay.",
  },
};

export default function PaycheckCalcPage() {
  return <CalculatorsLayout activeId="paycheck" initialCategory="finance" />;
}
