import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Random Number Generator - Free Online Calculator",
  description: "Free online random number generator. Generate random numbers.",
  keywords: ["random number generator", "free random number generator", "online random number generator"],
  openGraph: {
    title: "Random Number Generator - Free Online Calculator",
    description: "Generate random numbers.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Random Number Generator",
    description: "Generate random numbers.",
  },
};

export default function RandomNumberCalcPage() {
  return <CalculatorsLayout activeId="random-number" initialCategory="math" />;
}
