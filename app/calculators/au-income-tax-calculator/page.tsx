import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "AU Income Tax Calculator - Free Australian Calculator",
  description: "Calculate your Australian take-home pay with 2025-26 ATO tax brackets, Medicare levy, LITO offset and super. Updated for Stage 3 tax cuts.",
  keywords: ["australia income tax calculator", "ato tax calculator 2025", "take home pay calculator australia", "calcosmos"],
  openGraph: { title: "AU Income Tax Calculator - Calcosmos", description: "Calculate your Australian take-home pay with 2025-26 ATO tax brackets.", type: "website" },
  twitter: { card: "summary", title: "AU Income Tax Calculator", description: "2025-26 ATO tax brackets, Medicare levy and LITO." },
};

export default function Page() {
  return <CalculatorsLayout activeId="au-income-tax" initialCategory="australia" />;
}
