import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Paint Calculator - Free Online Calculator",
  description: "Free online paint calculator. Estimate paint needed for a room.",
  keywords: ["paint calculator", "free paint calculator", "online paint calculator"],
  openGraph: {
    title: "Paint Calculator - Free Online Calculator",
    description: "Estimate paint needed for a room.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Paint Calculator",
    description: "Estimate paint needed for a room.",
  },
};

export default function PaintCalcPage() {
  return <CalculatorsLayout activeId="paint" initialCategory="construction" />;
}
