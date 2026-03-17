import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Carbon Footprint Calculator - Free Online Calculator",
  description: "Free online carbon footprint calculator. Estimate your carbon emissions.",
  keywords: ["carbon footprint calculator", "free carbon footprint calculator", "online carbon footprint calculator"],
  openGraph: {
    title: "Carbon Footprint Calculator - Free Online Calculator",
    description: "Estimate your carbon emissions.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Carbon Footprint Calculator",
    description: "Estimate your carbon emissions.",
  },
};

export default function CarbonFootprintCalcPage() {
  return <CalculatorsLayout activeId="carbon-footprint" initialCategory="science" />;
}
