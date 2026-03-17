import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Electricity Cost Calculator - Free Online Calculator",
  description: "Free online electricity cost calculator. Estimate electricity costs.",
  keywords: ["electricity cost calculator", "free electricity cost calculator", "online electricity cost calculator"],
  openGraph: {
    title: "Electricity Cost Calculator - Free Online Calculator",
    description: "Estimate electricity costs.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Electricity Cost Calculator",
    description: "Estimate electricity costs.",
  },
};

export default function ElectricityCostCalcPage() {
  return <CalculatorsLayout activeId="electricity-cost" initialCategory="everyday" />;
}
