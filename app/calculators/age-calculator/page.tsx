import type { Metadata } from "next";
import AgeCalculator from "@/components/calculators/AgeCalculator";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age",
  description: "Free online age calculator. Find your exact age in years, months, days, weeks, and when your next birthday is.",
  keywords: ["age calculator", "calculate age", "birthday calculator", "how old am I"],
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age",
    description: "Find your exact age in years, months, days and weeks instantly.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Age Calculator",
    description: "Calculate your exact age instantly.",
  },
};

export default function Page() {
  return <AgeCalculator />;
}