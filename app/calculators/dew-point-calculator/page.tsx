import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Dew Point Calculator - Free Online Calculator",
  description: "Free online dew point calculator. Calculate atmospheric dew point.",
  keywords: ["dew point calculator", "free dew point calculator", "online dew point calculator"],
  openGraph: {
    title: "Dew Point Calculator - Free Online Calculator",
    description: "Calculate atmospheric dew point.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dew Point Calculator",
    description: "Calculate atmospheric dew point.",
  },
};

export default function DewPointCalcPage() {
  return <CalculatorsLayout activeId="dew-point" initialCategory="science" />;
}
