import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Scientific Calculator - Free Online Calculator",
  description: "Free online scientific calculator. Full featured scientific calculator.",
  keywords: ["scientific calculator", "free scientific calculator", "online scientific calculator"],
  openGraph: {
    title: "Scientific Calculator - Free Online Calculator",
    description: "Full featured scientific calculator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Scientific Calculator",
    description: "Full featured scientific calculator.",
  },
};

export default function ScientificCalcPage() {
  return <CalculatorsLayout activeId="scientific" initialCategory="math" />;
}
