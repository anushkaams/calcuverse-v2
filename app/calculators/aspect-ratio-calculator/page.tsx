import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Aspect Ratio Calculator - Free Online Calculator",
  description: "Free online aspect ratio calculator. Calculate display aspect ratios.",
  keywords: ["aspect ratio calculator", "free aspect ratio calculator", "online aspect ratio calculator"],
  openGraph: {
    title: "Aspect Ratio Calculator - Free Online Calculator",
    description: "Calculate display aspect ratios.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aspect Ratio Calculator",
    description: "Calculate display aspect ratios.",
  },
};

export default function AspectRatioCalcPage() {
  return <CalculatorsLayout activeId="aspect-ratio" initialCategory="math" />;
}
