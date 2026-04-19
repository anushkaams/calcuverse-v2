import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "AU Home Loan Repayment Calculator",
  description: "Calculate Australian mortgage repayments with offset account support. Compare principal & interest vs interest-only. Updated for current rates.",
  keywords: ["mortgage calculator australia", "home loan calculator", "repayment calculator australia", "offset account calculator", "calcosmos"],
  openGraph: { title: "AU Mortgage Calculator - Calcosmos", description: "Australian home loan repayments with offset account.", type: "website" },
  twitter: { card: "summary", title: "AU Mortgage Calculator", description: "Home loan repayments with offset account support." },
};

export default function Page() {
  return <CalculatorsLayout activeId="au-mortgage" initialCategory="australia" />;
}
