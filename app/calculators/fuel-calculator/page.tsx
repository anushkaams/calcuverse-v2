import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Fuel Calculator - Free Online Calculator",
  description: "Free online fuel calculator. Calculate trip fuel costs.",
  keywords: ["fuel calculator", "free fuel calculator", "online fuel calculator"],
  openGraph: {
    title: "Fuel Calculator - Free Online Calculator",
    description: "Calculate trip fuel costs.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fuel Calculator",
    description: "Calculate trip fuel costs.",
  },
};

export default function FuelCalcPage() {
  return <CalculatorsLayout activeId="fuel" initialCategory="everyday" />;
}
