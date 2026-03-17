import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Half-Life Calculator - Free Online Calculator",
  description: "Free online half-life calculator. Radioactive decay calculator.",
  keywords: ["half-life calculator", "free half-life calculator", "online half-life calculator"],
  openGraph: {
    title: "Half-Life Calculator - Free Online Calculator",
    description: "Radioactive decay calculator.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Half-Life Calculator",
    description: "Radioactive decay calculator.",
  },
};

export default function HalfLifeCalcPage() {
  return <CalculatorsLayout activeId="half-life" initialCategory="science" />;
}
