import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator - Free Online Calculator",
  description: "Free online mortgage affordability calculator. How much house can you afford.",
  keywords: ["mortgage affordability calculator", "free mortgage affordability calculator", "online mortgage affordability calculator"],
  openGraph: {
    title: "Mortgage Affordability Calculator - Free Online Calculator",
    description: "How much house can you afford.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mortgage Affordability Calculator",
    description: "How much house can you afford.",
  },
};

export default function MortgageAffordCalcPage() {
  return <CalculatorsLayout activeId="mortgage-afford" initialCategory="finance" />;
}
