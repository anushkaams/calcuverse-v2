import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Data Converter - Free Online Calculator",
  description: "Free online data converter. Convert between data units.",
  keywords: ["data converter", "free data converter", "online data converter"],
  openGraph: {
    title: "Data Converter - Free Online Calculator",
    description: "Convert between data units.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Data Converter",
    description: "Convert between data units.",
  },
};

export default function DataConvCalcPage() {
  return <CalculatorsLayout activeId="data-conv" initialCategory="science" />;
}
