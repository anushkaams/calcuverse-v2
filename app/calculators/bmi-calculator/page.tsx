import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "BMI Calculator - Free Online Calculator",
  description: "Free online bmi calculator. Body mass index calculator.",
  keywords: ["bmi calculator", "free bmi calculator", "online bmi calculator"],
  openGraph: {
    title: "BMI Calculator - Free Online Calculator",
    description: "Body mass index calculator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BMI Calculator",
    description: "Body mass index calculator.",
  },
};

export default function BMICalcPage() {
  return <CalculatorsLayout activeId="bmi" initialCategory="health" />;
}
