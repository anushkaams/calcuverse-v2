import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "AU HECS-HELP Repayment Calculator 2025-26",
  description: "Calculate your HECS-HELP student loan repayments under the new 2025-26 marginal repayment system. Includes payoff timeline with indexation.",
  keywords: ["hecs calculator", "help debt calculator", "hecs repayment 2025", "student loan calculator australia", "calcosmos"],
  openGraph: { title: "AU HECS-HELP Calculator - Calcosmos", description: "2025-26 marginal repayment rates and payoff timeline.", type: "website" },
  twitter: { card: "summary", title: "AU HECS-HELP Calculator", description: "New 2025-26 marginal repayment system." },
};

export default function Page() {
  return <CalculatorsLayout activeId="au-hecs" initialCategory="australia" />;
}
