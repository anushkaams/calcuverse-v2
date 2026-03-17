import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Standard Calculator - Free Online Calculator",
  description: "Free online standard calculator. Basic arithmetic calculator.",
  keywords: ["standard calculator", "free standard calculator", "online standard calculator"],
  openGraph: {
    title: "Standard Calculator - Free Online Calculator",
    description: "Basic arithmetic calculator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Standard Calculator",
    description: "Basic arithmetic calculator.",
  },
};

export default function StandardCalcPage() {
  return <CalculatorsLayout activeId="standard" initialCategory="math" />;
}
