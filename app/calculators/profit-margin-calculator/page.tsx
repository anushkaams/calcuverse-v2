import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Profit Margin Calculator - Free Online Calculator",
  description: "Free online profit margin calculator. Calculate business profit margins.",
  keywords: ["profit margin calculator", "free profit margin calculator", "online profit margin calculator"],
  openGraph: {
    title: "Profit Margin Calculator - Free Online Calculator",
    description: "Calculate business profit margins.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Profit Margin Calculator",
    description: "Calculate business profit margins.",
  },
};

export default function ProfitMarginCalcPage() {
  return <CalculatorsLayout activeId="profit-margin" initialCategory="finance" />;
}
