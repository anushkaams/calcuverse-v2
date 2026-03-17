import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "LED Resistor Calculator - Free Online Calculator",
  description: "Free online led resistor calculator. Calculate LED series resistor value.",
  keywords: ["led resistor calculator", "free led resistor calculator", "online led resistor calculator"],
  openGraph: {
    title: "LED Resistor Calculator - Free Online Calculator",
    description: "Calculate LED series resistor value.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "LED Resistor Calculator",
    description: "Calculate LED series resistor value.",
  },
};

export default function LEDResistorCalcPage() {
  return <CalculatorsLayout activeId="led-resistor" initialCategory="science" />;
}
