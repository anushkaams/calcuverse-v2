import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Body Fat Calculator - Free Online Calculator",
  description: "Free online body fat calculator. Estimate your body fat percentage.",
  keywords: ["body fat calculator", "free body fat calculator", "online body fat calculator"],
  openGraph: {
    title: "Body Fat Calculator - Free Online Calculator",
    description: "Estimate your body fat percentage.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Body Fat Calculator",
    description: "Estimate your body fat percentage.",
  },
};

export default function BodyFatCalcPage() {
  return <CalculatorsLayout activeId="body-fat" initialCategory="health" />;
}
