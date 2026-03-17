import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Heart Rate Calculator - Free Online Calculator",
  description: "Free online heart rate calculator. Target heart rate zones.",
  keywords: ["heart rate calculator", "free heart rate calculator", "online heart rate calculator"],
  openGraph: {
    title: "Heart Rate Calculator - Free Online Calculator",
    description: "Target heart rate zones.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Heart Rate Calculator",
    description: "Target heart rate zones.",
  },
};

export default function HeartRateCalcPage() {
  return <CalculatorsLayout activeId="heart-rate" initialCategory="health" />;
}
