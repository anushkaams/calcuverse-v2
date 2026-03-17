import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Currency Converter - Free Online Calculator",
  description: "Free online currency converter. Convert between currencies.",
  keywords: ["currency converter", "free currency converter", "online currency converter"],
  openGraph: {
    title: "Currency Converter - Free Online Calculator",
    description: "Convert between currencies.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Currency Converter",
    description: "Convert between currencies.",
  },
};

export default function CurrencyCalcPage() {
  return <CalculatorsLayout activeId="currency" initialCategory="finance" />;
}
