import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Discount Calculator - Free Online Calculator",
  description: "Free online discount calculator. Calculate sale prices and savings.",
  keywords: ["discount calculator", "free discount calculator", "online discount calculator"],
  openGraph: {
    title: "Discount Calculator - Free Online Calculator",
    description: "Calculate sale prices and savings.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Discount Calculator",
    description: "Calculate sale prices and savings.",
  },
};

export default function DiscountCalcPage() {
  return <CalculatorsLayout activeId="discount" initialCategory="everyday" />;
}
