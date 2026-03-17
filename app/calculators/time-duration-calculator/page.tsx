import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Time Duration Calculator - Free Online Calculator",
  description: "Free online time duration calculator. Calculate time between two times.",
  keywords: ["time duration calculator", "free time duration calculator", "online time duration calculator"],
  openGraph: {
    title: "Time Duration Calculator - Free Online Calculator",
    description: "Calculate time between two times.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Time Duration Calculator",
    description: "Calculate time between two times.",
  },
};

export default function TimeDurationCalcPage() {
  return <CalculatorsLayout activeId="time-duration" initialCategory="date-time" />;
}
