import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Prime Number Checker - Free Online Calculator",
  description: "Free online prime number checker. Check if a number is prime.",
  keywords: ["prime number checker", "free prime number checker", "online prime number checker"],
  openGraph: {
    title: "Prime Number Checker - Free Online Calculator",
    description: "Check if a number is prime.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Prime Number Checker",
    description: "Check if a number is prime.",
  },
};

export default function PrimeCalcPage() {
  return <CalculatorsLayout activeId="prime" initialCategory="math" />;
}
