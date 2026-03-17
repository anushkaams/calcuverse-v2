import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Voltage Divider Calculator - Free Online Calculator",
  description: "Free online voltage divider calculator. Calculate voltage divider circuits.",
  keywords: ["voltage divider calculator", "free voltage divider calculator", "online voltage divider calculator"],
  openGraph: {
    title: "Voltage Divider Calculator - Free Online Calculator",
    description: "Calculate voltage divider circuits.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Voltage Divider Calculator",
    description: "Calculate voltage divider circuits.",
  },
};

export default function VoltageDividerCalcPage() {
  return <CalculatorsLayout activeId="voltage-divider" initialCategory="science" />;
}
