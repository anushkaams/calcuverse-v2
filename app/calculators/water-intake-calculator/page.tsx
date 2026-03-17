import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Water Intake Calculator - Free Online Calculator",
  description: "Free online water intake calculator. Daily water intake recommendation.",
  keywords: ["water intake calculator", "free water intake calculator", "online water intake calculator"],
  openGraph: {
    title: "Water Intake Calculator - Free Online Calculator",
    description: "Daily water intake recommendation.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Water Intake Calculator",
    description: "Daily water intake recommendation.",
  },
};

export default function WaterIntakeCalcPage() {
  return <CalculatorsLayout activeId="water-intake" initialCategory="health" />;
}
