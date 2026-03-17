import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Calorie Calculator - Free Online Calculator",
  description: "Free online calorie calculator. Daily calorie needs estimator.",
  keywords: ["calorie calculator", "free calorie calculator", "online calorie calculator"],
  openGraph: {
    title: "Calorie Calculator - Free Online Calculator",
    description: "Daily calorie needs estimator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calorie Calculator",
    description: "Daily calorie needs estimator.",
  },
};

export default function CalorieCalcPage() {
  return <CalculatorsLayout activeId="calorie" initialCategory="health" />;
}
