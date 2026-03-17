import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Running Pace Calculator - Free Online Calculator",
  description: "Free online running pace calculator. Calculate running pace and finish time.",
  keywords: ["running pace calculator", "free running pace calculator", "online running pace calculator"],
  openGraph: {
    title: "Running Pace Calculator - Free Online Calculator",
    description: "Calculate running pace and finish time.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Running Pace Calculator",
    description: "Calculate running pace and finish time.",
  },
};

export default function RunningPaceCalcPage() {
  return <CalculatorsLayout activeId="running-pace" initialCategory="health" />;
}
