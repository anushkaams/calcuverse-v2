import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Density Calculator - Free Online Calculator",
  description: "Free online density calculator. Calculate mass, volume, density.",
  keywords: ["density calculator", "free density calculator", "online density calculator"],
  openGraph: {
    title: "Density Calculator - Free Online Calculator",
    description: "Calculate mass, volume, density.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Density Calculator",
    description: "Calculate mass, volume, density.",
  },
};

export default function DensityCalcPage() {
  return <CalculatorsLayout activeId="density" initialCategory="science" />;
}
