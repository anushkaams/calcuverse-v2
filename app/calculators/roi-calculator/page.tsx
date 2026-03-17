import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "ROI Calculator - Free Online Calculator",
  description: "Free online roi calculator. Calculate return on investment.",
  keywords: ["roi calculator", "free roi calculator", "online roi calculator"],
  openGraph: {
    title: "ROI Calculator - Free Online Calculator",
    description: "Calculate return on investment.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ROI Calculator",
    description: "Calculate return on investment.",
  },
};

export default function ROICalcPage() {
  return <CalculatorsLayout activeId="roi" initialCategory="finance" />;
}
