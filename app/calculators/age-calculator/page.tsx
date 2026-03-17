import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Age Calculator - Free Online Calculator",
  description: "Free online age calculator. Calculate your exact age.",
  keywords: ["age calculator", "free age calculator", "online age calculator"],
  openGraph: {
    title: "Age Calculator - Free Online Calculator",
    description: "Calculate your exact age.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Age Calculator",
    description: "Calculate your exact age.",
  },
};

export default function AgeCalculatorPage() {
  return <CalculatorsLayout activeId="age" initialCategory="date-time" />;
}
