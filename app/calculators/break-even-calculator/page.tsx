import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Break-Even Calculator - Free Online Calculator",
  description: "Free online break-even calculator. Find your break-even point.",
  keywords: ["break-even calculator", "free break-even calculator", "online break-even calculator"],
  openGraph: {
    title: "Break-Even Calculator - Free Online Calculator",
    description: "Find your break-even point.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Break-Even Calculator",
    description: "Find your break-even point.",
  },
};

export default function BreakEvenCalcPage() {
  return <CalculatorsLayout activeId="break-even" initialCategory="finance" />;
}
