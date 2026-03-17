import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Temperature Converter - Free Online Calculator",
  description: "Free online temperature converter. Convert between temperature scales.",
  keywords: ["temperature converter", "free temperature converter", "online temperature converter"],
  openGraph: {
    title: "Temperature Converter - Free Online Calculator",
    description: "Convert between temperature scales.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Temperature Converter",
    description: "Convert between temperature scales.",
  },
};

export default function TemperatureCalcPage() {
  return <CalculatorsLayout activeId="temperature" initialCategory="science" />;
}
