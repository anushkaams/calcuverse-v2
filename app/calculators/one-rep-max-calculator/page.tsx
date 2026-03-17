import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "One Rep Max Calculator - Free Online Calculator",
  description: "Free online one rep max calculator. Calculate your 1RM for lifts.",
  keywords: ["one rep max calculator", "free one rep max calculator", "online one rep max calculator"],
  openGraph: {
    title: "One Rep Max Calculator - Free Online Calculator",
    description: "Calculate your 1RM for lifts.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "One Rep Max Calculator",
    description: "Calculate your 1RM for lifts.",
  },
};

export default function OneRepMaxCalcPage() {
  return <CalculatorsLayout activeId="one-rep-max" initialCategory="health" />;
}
