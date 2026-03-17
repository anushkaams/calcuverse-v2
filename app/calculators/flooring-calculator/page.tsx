import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Flooring Calculator - Free Online Calculator",
  description: "Free online flooring calculator. Estimate flooring materials needed.",
  keywords: ["flooring calculator", "free flooring calculator", "online flooring calculator"],
  openGraph: {
    title: "Flooring Calculator - Free Online Calculator",
    description: "Estimate flooring materials needed.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Flooring Calculator",
    description: "Estimate flooring materials needed.",
  },
};

export default function FlooringCalcPage() {
  return <CalculatorsLayout activeId="flooring" initialCategory="construction" />;
}
