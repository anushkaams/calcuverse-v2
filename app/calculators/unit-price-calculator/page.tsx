import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Unit Price Calculator - Free Online Calculator",
  description: "Free online unit price calculator. Compare unit prices while shopping.",
  keywords: ["unit price calculator", "free unit price calculator", "online unit price calculator"],
  openGraph: {
    title: "Unit Price Calculator - Free Online Calculator",
    description: "Compare unit prices while shopping.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Unit Price Calculator",
    description: "Compare unit prices while shopping.",
  },
};

export default function UnitPriceCalcPage() {
  return <CalculatorsLayout activeId="unit-price" initialCategory="everyday" />;
}
