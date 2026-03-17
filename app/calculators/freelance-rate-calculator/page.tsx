import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Freelance Rate Calculator - Free Online Calculator",
  description: "Free online freelance rate calculator. Calculate your hourly freelance rate.",
  keywords: ["freelance rate calculator", "free freelance rate calculator", "online freelance rate calculator"],
  openGraph: {
    title: "Freelance Rate Calculator - Free Online Calculator",
    description: "Calculate your hourly freelance rate.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Freelance Rate Calculator",
    description: "Calculate your hourly freelance rate.",
  },
};

export default function FreelanceRateCalcPage() {
  return <CalculatorsLayout activeId="freelance-rate" initialCategory="finance" />;
}
