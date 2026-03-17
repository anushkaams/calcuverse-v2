import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Percentage Calculator - Free Online Calculator",
  description: "Free online percentage calculator. Calculate percentages instantly.",
  keywords: ["percentage calculator", "free percentage calculator", "online percentage calculator"],
  openGraph: {
    title: "Percentage Calculator - Free Online Calculator",
    description: "Calculate percentages instantly.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Percentage Calculator",
    description: "Calculate percentages instantly.",
  },
};

export default function PercentageCalcPage() {
  return <CalculatorsLayout activeId="percentage" initialCategory="math" />;
}
