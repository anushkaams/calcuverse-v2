import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Matrix Calculator - Free Online Calculator",
  description: "Free online matrix calculator. Matrix math operations.",
  keywords: ["matrix calculator", "free matrix calculator", "online matrix calculator"],
  openGraph: {
    title: "Matrix Calculator - Free Online Calculator",
    description: "Matrix math operations.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Matrix Calculator",
    description: "Matrix math operations.",
  },
};

export default function MatrixCalcPage() {
  return <CalculatorsLayout activeId="matrix" initialCategory="math" />;
}
