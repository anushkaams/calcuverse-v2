import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Ohms Law Calculator - Free Online Calculator",
  description: "Free online ohms law calculator. Calculate voltage, current, resistance.",
  keywords: ["ohms law calculator", "free ohms law calculator", "online ohms law calculator"],
  openGraph: {
    title: "Ohms Law Calculator - Free Online Calculator",
    description: "Calculate voltage, current, resistance.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ohms Law Calculator",
    description: "Calculate voltage, current, resistance.",
  },
};

export default function OhmsLawCalcPage() {
  return <CalculatorsLayout activeId="ohms-law" initialCategory="science" />;
}
