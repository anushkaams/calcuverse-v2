import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Macro Calculator - Free Online Calculator",
  description: "Free online macro calculator. Calculate daily macronutrient targets.",
  keywords: ["macro calculator", "free macro calculator", "online macro calculator"],
  openGraph: {
    title: "Macro Calculator - Free Online Calculator",
    description: "Calculate daily macronutrient targets.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Macro Calculator",
    description: "Calculate daily macronutrient targets.",
  },
};

export default function MacrosCalcPage() {
  return <CalculatorsLayout activeId="macros" initialCategory="health" />;
}
