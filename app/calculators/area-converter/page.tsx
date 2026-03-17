import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Area Converter - Free Online Calculator",
  description: "Free online area converter. Convert between area units.",
  keywords: ["area converter", "free area converter", "online area converter"],
  openGraph: {
    title: "Area Converter - Free Online Calculator",
    description: "Convert between area units.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Area Converter",
    description: "Convert between area units.",
  },
};

export default function AreaConvCalcPage() {
  return <CalculatorsLayout activeId="area-conv" initialCategory="science" />;
}
