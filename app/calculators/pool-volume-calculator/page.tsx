import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Pool Volume Calculator - Free Online Calculator",
  description: "Free online pool volume calculator. Calculate swimming pool volume.",
  keywords: ["pool volume calculator", "free pool volume calculator", "online pool volume calculator"],
  openGraph: {
    title: "Pool Volume Calculator - Free Online Calculator",
    description: "Calculate swimming pool volume.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pool Volume Calculator",
    description: "Calculate swimming pool volume.",
  },
};

export default function PoolVolumeCalcPage() {
  return <CalculatorsLayout activeId="pool-volume" initialCategory="construction" />;
}
