import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Pregnancy Calculator - Free Online Calculator",
  description: "Free online pregnancy calculator. Calculate due date and milestones.",
  keywords: ["pregnancy calculator", "free pregnancy calculator", "online pregnancy calculator"],
  openGraph: {
    title: "Pregnancy Calculator - Free Online Calculator",
    description: "Calculate due date and milestones.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pregnancy Calculator",
    description: "Calculate due date and milestones.",
  },
};

export default function PregnancyCalcPage() {
  return <CalculatorsLayout activeId="pregnancy" initialCategory="health" />;
}
