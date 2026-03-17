import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Quadratic Formula Calculator - Free Online Calculator",
  description: "Free online quadratic formula calculator. Solve quadratic equations.",
  keywords: ["quadratic formula calculator", "free quadratic formula calculator", "online quadratic formula calculator"],
  openGraph: {
    title: "Quadratic Formula Calculator - Free Online Calculator",
    description: "Solve quadratic equations.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Quadratic Formula Calculator",
    description: "Solve quadratic equations.",
  },
};

export default function QuadraticCalcPage() {
  return <CalculatorsLayout activeId="quadratic" initialCategory="math" />;
}
