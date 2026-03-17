import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Statistics Calculator - Free Online Calculator",
  description: "Free online statistics calculator. Mean, median, mode and more.",
  keywords: ["statistics calculator", "free statistics calculator", "online statistics calculator"],
  openGraph: {
    title: "Statistics Calculator - Free Online Calculator",
    description: "Mean, median, mode and more.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Statistics Calculator",
    description: "Mean, median, mode and more.",
  },
};

export default function StatisticsCalcPage() {
  return <CalculatorsLayout activeId="statistics" initialCategory="math" />;
}
