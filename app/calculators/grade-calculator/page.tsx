import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Grade Calculator - Free Online Calculator",
  description: "Free online grade calculator. Calculate weighted grades.",
  keywords: ["grade calculator", "free grade calculator", "online grade calculator"],
  openGraph: {
    title: "Grade Calculator - Free Online Calculator",
    description: "Calculate weighted grades.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Grade Calculator",
    description: "Calculate weighted grades.",
  },
};

export default function GradeCalcPage() {
  return <CalculatorsLayout activeId="grade" initialCategory="education" />;
}
