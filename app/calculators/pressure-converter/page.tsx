import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Pressure Converter - Free Online Calculator",
  description: "Free online pressure converter. Convert between pressure units.",
  keywords: ["pressure converter", "free pressure converter", "online pressure converter"],
  openGraph: {
    title: "Pressure Converter - Free Online Calculator",
    description: "Convert between pressure units.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pressure Converter",
    description: "Convert between pressure units.",
  },
};

export default function PressureCalcPage() {
  return <CalculatorsLayout activeId="pressure" initialCategory="science" />;
}
