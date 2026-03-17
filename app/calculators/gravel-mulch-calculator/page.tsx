import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Gravel & Mulch Calculator - Free Online Calculator",
  description: "Free online gravel & mulch calculator. Estimate gravel or mulch needed.",
  keywords: ["gravel & mulch calculator", "free gravel & mulch calculator", "online gravel & mulch calculator"],
  openGraph: {
    title: "Gravel & Mulch Calculator - Free Online Calculator",
    description: "Estimate gravel or mulch needed.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gravel & Mulch Calculator",
    description: "Estimate gravel or mulch needed.",
  },
};

export default function GravelMulchCalcPage() {
  return <CalculatorsLayout activeId="gravel-mulch" initialCategory="construction" />;
}
