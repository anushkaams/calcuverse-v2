import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Tip Calculator - Free Online Calculator",
  description: "Free online tip calculator. Calculate tips and split bills.",
  keywords: ["tip calculator", "free tip calculator", "online tip calculator"],
  openGraph: {
    title: "Tip Calculator - Free Online Calculator",
    description: "Calculate tips and split bills.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tip Calculator",
    description: "Calculate tips and split bills.",
  },
};

export default function TipCalcPage() {
  return <CalculatorsLayout activeId="tip" initialCategory="everyday" />;
}
