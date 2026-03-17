import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Sleep Calculator - Free Online Calculator",
  description: "Free online sleep calculator. Calculate ideal sleep and wake times.",
  keywords: ["sleep calculator", "free sleep calculator", "online sleep calculator"],
  openGraph: {
    title: "Sleep Calculator - Free Online Calculator",
    description: "Calculate ideal sleep and wake times.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sleep Calculator",
    description: "Calculate ideal sleep and wake times.",
  },
};

export default function SleepCalcPage() {
  return <CalculatorsLayout activeId="sleep" initialCategory="health" />;
}
