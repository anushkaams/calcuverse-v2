import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator - Free Online Calculator",
  description: "Free online ideal weight calculator. Calculate your ideal body weight.",
  keywords: ["ideal weight calculator", "free ideal weight calculator", "online ideal weight calculator"],
  openGraph: {
    title: "Ideal Weight Calculator - Free Online Calculator",
    description: "Calculate your ideal body weight.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ideal Weight Calculator",
    description: "Calculate your ideal body weight.",
  },
};

export default function IdealWeightCalcPage() {
  return <CalculatorsLayout activeId="ideal-weight" initialCategory="health" />;
}
