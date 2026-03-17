import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Net Worth Calculator - Free Online Calculator",
  description: "Free online net worth calculator. Calculate your total net worth.",
  keywords: ["net worth calculator", "free net worth calculator", "online net worth calculator"],
  openGraph: {
    title: "Net Worth Calculator - Free Online Calculator",
    description: "Calculate your total net worth.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Net Worth Calculator",
    description: "Calculate your total net worth.",
  },
};

export default function NetWorthCalcPage() {
  return <CalculatorsLayout activeId="net-worth" initialCategory="finance" />;
}
