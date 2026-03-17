import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Circumference Calculator - Free Online Calculator",
  description: "Free online circumference calculator. Calculate circle circumference.",
  keywords: ["circumference calculator", "free circumference calculator", "online circumference calculator"],
  openGraph: {
    title: "Circumference Calculator - Free Online Calculator",
    description: "Calculate circle circumference.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Circumference Calculator",
    description: "Calculate circle circumference.",
  },
};

export default function CircumferenceCalcPage() {
  return <CalculatorsLayout activeId="circumference" initialCategory="math" />;
}
