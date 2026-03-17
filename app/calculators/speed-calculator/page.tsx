import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Speed Calculator - Free Online Calculator",
  description: "Free online speed calculator. Calculate speed, distance, or time.",
  keywords: ["speed calculator", "free speed calculator", "online speed calculator"],
  openGraph: {
    title: "Speed Calculator - Free Online Calculator",
    description: "Calculate speed, distance, or time.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Speed Calculator",
    description: "Calculate speed, distance, or time.",
  },
};

export default function SpeedCalcPage() {
  return <CalculatorsLayout activeId="speed" initialCategory="science" />;
}
