import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Reading Time Calculator - Free Online Calculator",
  description: "Free online reading time calculator. Estimate reading time for text.",
  keywords: ["reading time calculator", "free reading time calculator", "online reading time calculator"],
  openGraph: {
    title: "Reading Time Calculator - Free Online Calculator",
    description: "Estimate reading time for text.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Reading Time Calculator",
    description: "Estimate reading time for text.",
  },
};

export default function ReadingTimeCalcPage() {
  return <CalculatorsLayout activeId="reading-time" initialCategory="everyday" />;
}
