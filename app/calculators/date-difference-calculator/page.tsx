import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Date Difference Calculator - Free Online Calculator",
  description: "Free online date difference calculator. Days between two dates.",
  keywords: ["date difference calculator", "free date difference calculator", "online date difference calculator"],
  openGraph: {
    title: "Date Difference Calculator - Free Online Calculator",
    description: "Days between two dates.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Date Difference Calculator",
    description: "Days between two dates.",
  },
};

export default function DateDiffCalcPage() {
  return <CalculatorsLayout activeId="date-diff" initialCategory="date-time" />;
}
