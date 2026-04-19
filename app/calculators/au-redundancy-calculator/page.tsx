import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "AU Redundancy Pay Calculator - Fair Work Entitlements",
  description: "Calculate your Australian redundancy pay, notice period and annual leave payout under Fair Work NES entitlements. Includes 2025-26 tax-free limits.",
  keywords: ["redundancy calculator australia", "fair work redundancy", "redundancy pay 2025", "notice period calculator australia", "calcosmos"],
  openGraph: { title: "AU Redundancy Calculator - Calcosmos", description: "Fair Work redundancy pay, notice period and leave payout.", type: "website" },
  twitter: { card: "summary", title: "AU Redundancy Calculator", description: "Fair Work entitlements: redundancy, notice, leave." },
};

export default function Page() {
  return <CalculatorsLayout activeId="au-redundancy" initialCategory="australia" />;
}
