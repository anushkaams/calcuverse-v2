import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Pythagorean Theorem Calculator - Free Online Calculator",
  description: "Free online pythagorean theorem calculator. Solve right triangle sides.",
  keywords: ["pythagorean theorem calculator", "free pythagorean theorem calculator", "online pythagorean theorem calculator"],
  openGraph: {
    title: "Pythagorean Theorem Calculator - Free Online Calculator",
    description: "Solve right triangle sides.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pythagorean Theorem Calculator",
    description: "Solve right triangle sides.",
  },
};

export default function PythagoreanCalcPage() {
  return <CalculatorsLayout activeId="pythagorean" initialCategory="math" />;
}
