import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "GPA Calculator - Free Online Calculator",
  description: "Free online gpa calculator. Calculate your grade point average.",
  keywords: ["gpa calculator", "free gpa calculator", "online gpa calculator"],
  openGraph: {
    title: "GPA Calculator - Free Online Calculator",
    description: "Calculate your grade point average.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GPA Calculator",
    description: "Calculate your grade point average.",
  },
};

export default function GPACalcPage() {
  return <CalculatorsLayout activeId="gpa" initialCategory="education" />;
}
