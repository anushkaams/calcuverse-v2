import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Length Converter - Free Online Calculator",
  description: "Free online length converter. Convert between length units.",
  keywords: ["length converter", "free length converter", "online length converter"],
  openGraph: {
    title: "Length Converter - Free Online Calculator",
    description: "Convert between length units.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Length Converter",
    description: "Convert between length units.",
  },
};

export default function LengthConvCalcPage() {
  return <CalculatorsLayout activeId="length-conv" initialCategory="science" />;
}
