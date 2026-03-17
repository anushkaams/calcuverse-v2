import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Credit Card Calculator - Free Online Calculator",
  description: "Free online credit card calculator. Credit card payoff estimator.",
  keywords: ["credit card calculator", "free credit card calculator", "online credit card calculator"],
  openGraph: {
    title: "Credit Card Calculator - Free Online Calculator",
    description: "Credit card payoff estimator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Credit Card Calculator",
    description: "Credit card payoff estimator.",
  },
};

export default function CreditCardCalcPage() {
  return <CalculatorsLayout activeId="credit-card" initialCategory="finance" />;
}
