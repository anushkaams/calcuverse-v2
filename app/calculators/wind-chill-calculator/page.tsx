import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Wind Chill Calculator - Free Online Calculator",
  description: "Free online wind chill calculator. Calculate wind chill temperature.",
  keywords: ["wind chill calculator", "free wind chill calculator", "online wind chill calculator"],
  openGraph: {
    title: "Wind Chill Calculator - Free Online Calculator",
    description: "Calculate wind chill temperature.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Wind Chill Calculator",
    description: "Calculate wind chill temperature.",
  },
};

export default function WindChillCalcPage() {
  return <CalculatorsLayout activeId="wind-chill" initialCategory="science" />;
}
