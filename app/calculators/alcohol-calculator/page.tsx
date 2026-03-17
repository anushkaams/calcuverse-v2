import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Alcohol Calculator - Free Online Calculator",
  description: "Free online alcohol calculator. Blood alcohol content estimator.",
  keywords: ["alcohol calculator", "free alcohol calculator", "online alcohol calculator"],
  openGraph: {
    title: "Alcohol Calculator - Free Online Calculator",
    description: "Blood alcohol content estimator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alcohol Calculator",
    description: "Blood alcohol content estimator.",
  },
};

export default function AlcoholCalcPage() {
  return <CalculatorsLayout activeId="alcohol" initialCategory="health" />;
}
