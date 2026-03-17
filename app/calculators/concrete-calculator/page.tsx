import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Concrete Calculator - Free Online Calculator",
  description: "Free online concrete calculator. Estimate concrete volume needed.",
  keywords: ["concrete calculator", "free concrete calculator", "online concrete calculator"],
  openGraph: {
    title: "Concrete Calculator - Free Online Calculator",
    description: "Estimate concrete volume needed.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Concrete Calculator",
    description: "Estimate concrete volume needed.",
  },
};

export default function ConcreteCalcPage() {
  return <CalculatorsLayout activeId="concrete" initialCategory="construction" />;
}
