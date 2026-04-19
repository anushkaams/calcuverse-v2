import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "AU Stamp Duty Calculator - All States & Territories",
  description: "Calculate stamp duty for NSW, VIC, QLD, WA, SA, TAS, ACT and NT with first home buyer exemptions and concessions. Updated 2025.",
  keywords: ["stamp duty calculator australia", "transfer duty calculator", "nsw stamp duty", "vic stamp duty", "qld stamp duty", "calcosmos"],
  openGraph: { title: "AU Stamp Duty Calculator - Calcosmos", description: "Calculate stamp duty for all Australian states with FHB concessions.", type: "website" },
  twitter: { card: "summary", title: "AU Stamp Duty Calculator", description: "All states including first home buyer exemptions." },
};

export default function Page() {
  return <CalculatorsLayout activeId="au-stamp-duty" initialCategory="australia" />;
}
