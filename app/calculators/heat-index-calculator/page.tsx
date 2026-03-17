import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Heat Index Calculator - Free Online Calculator",
  description: "Free online heat index calculator. Feels-like temperature calculator.",
  keywords: ["heat index calculator", "free heat index calculator", "online heat index calculator"],
  openGraph: {
    title: "Heat Index Calculator - Free Online Calculator",
    description: "Feels-like temperature calculator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Heat Index Calculator",
    description: "Feels-like temperature calculator.",
  },
};

export default function HeatIndexCalcPage() {
  return <CalculatorsLayout activeId="heat-index" initialCategory="science" />;
}
