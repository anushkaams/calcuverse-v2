import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Solar Panel Calculator - Free Online Calculator",
  description: "Free online solar panel calculator. Estimate solar panel output and savings.",
  keywords: ["solar panel calculator", "free solar panel calculator", "online solar panel calculator"],
  openGraph: {
    title: "Solar Panel Calculator - Free Online Calculator",
    description: "Estimate solar panel output and savings.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Solar Panel Calculator",
    description: "Estimate solar panel output and savings.",
  },
};

export default function SolarCalcPage() {
  return <CalculatorsLayout activeId="solar" initialCategory="science" />;
}
