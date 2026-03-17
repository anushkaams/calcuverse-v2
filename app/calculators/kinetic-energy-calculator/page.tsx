import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Kinetic Energy Calculator - Free Online Calculator",
  description: "Free online kinetic energy calculator. Calculate kinetic energy of objects.",
  keywords: ["kinetic energy calculator", "free kinetic energy calculator", "online kinetic energy calculator"],
  openGraph: {
    title: "Kinetic Energy Calculator - Free Online Calculator",
    description: "Calculate kinetic energy of objects.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kinetic Energy Calculator",
    description: "Calculate kinetic energy of objects.",
  },
};

export default function KineticEnergyCalcPage() {
  return <CalculatorsLayout activeId="kinetic-energy" initialCategory="science" />;
}
