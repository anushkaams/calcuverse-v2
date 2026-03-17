import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Calories Burned Calculator - Free Online Calculator",
  description: "Free online calories burned calculator. Calories burned during exercise.",
  keywords: ["calories burned calculator", "free calories burned calculator", "online calories burned calculator"],
  openGraph: {
    title: "Calories Burned Calculator - Free Online Calculator",
    description: "Calories burned during exercise.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calories Burned Calculator",
    description: "Calories burned during exercise.",
  },
};

export default function CaloriesBurnedCalcPage() {
  return <CalculatorsLayout activeId="calories-burned" initialCategory="health" />;
}
