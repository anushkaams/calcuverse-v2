import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "VAT Calculator - Free Online Calculator",
  description: "Free online vat calculator. Add or remove VAT from prices.",
  keywords: ["vat calculator", "free vat calculator", "online vat calculator"],
  openGraph: {
    title: "VAT Calculator - Free Online Calculator",
    description: "Add or remove VAT from prices.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "VAT Calculator",
    description: "Add or remove VAT from prices.",
  },
};

export default function VATCalcPage() {
  return <CalculatorsLayout activeId="vat" initialCategory="finance" />;
}
