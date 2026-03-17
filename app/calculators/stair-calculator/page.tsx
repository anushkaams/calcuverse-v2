import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Stair Calculator - Free Online Calculator",
  description: "Free online stair calculator. Calculate stair dimensions and rise/run.",
  keywords: ["stair calculator", "free stair calculator", "online stair calculator"],
  openGraph: {
    title: "Stair Calculator - Free Online Calculator",
    description: "Calculate stair dimensions and rise/run.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Stair Calculator",
    description: "Calculate stair dimensions and rise/run.",
  },
};

export default function StairCalcPage() {
  return <CalculatorsLayout activeId="stair" initialCategory="construction" />;
}
