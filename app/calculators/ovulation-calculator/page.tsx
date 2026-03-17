import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Ovulation Calculator - Free Online Calculator",
  description: "Free online ovulation calculator. Estimate ovulation and fertile window.",
  keywords: ["ovulation calculator", "free ovulation calculator", "online ovulation calculator"],
  openGraph: {
    title: "Ovulation Calculator - Free Online Calculator",
    description: "Estimate ovulation and fertile window.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ovulation Calculator",
    description: "Estimate ovulation and fertile window.",
  },
};

export default function OvulationCalcPage() {
  return <CalculatorsLayout activeId="ovulation" initialCategory="health" />;
}
