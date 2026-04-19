import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "AU ATAR Estimator - HSC, VCE, QCE, WACE, SACE",
  description: "Estimate your ATAR for NSW HSC, VIC VCE, QLD QCE, WA WACE and SA SACE with state-specific subject scaling factors.",
  keywords: ["atar calculator", "hsc atar calculator", "vce atar calculator", "qce atar calculator", "atar estimator australia", "calcosmos"],
  openGraph: { title: "AU ATAR Estimator - Calcosmos", description: "ATAR estimate for HSC, VCE, QCE, WACE and SACE with subject scaling.", type: "website" },
  twitter: { card: "summary", title: "AU ATAR Estimator", description: "Estimate ATAR across all Australian states." },
};

export default function Page() {
  return <CalculatorsLayout activeId="au-atar" initialCategory="australia" />;
}
