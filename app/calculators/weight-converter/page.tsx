import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Weight Converter - Free Online Calculator",
  description: "Free online weight converter. Convert between weight units.",
  keywords: ["weight converter", "free weight converter", "online weight converter"],
  openGraph: {
    title: "Weight Converter - Free Online Calculator",
    description: "Convert between weight units.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Weight Converter",
    description: "Convert between weight units.",
  },
};

export default function WeightConvCalcPage() {
  return <CalculatorsLayout activeId="weight-conv" initialCategory="science" />;
}
