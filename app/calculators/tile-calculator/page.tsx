import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Tile Calculator - Free Online Calculator",
  description: "Free online tile calculator. Estimate tiles needed for a floor or wall.",
  keywords: ["tile calculator", "free tile calculator", "online tile calculator"],
  openGraph: {
    title: "Tile Calculator - Free Online Calculator",
    description: "Estimate tiles needed for a floor or wall.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tile Calculator",
    description: "Estimate tiles needed for a floor or wall.",
  },
};

export default function TileCalcPage() {
  return <CalculatorsLayout activeId="tile" initialCategory="construction" />;
}
