import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "AU GST Calculator - Add or Remove 10% GST",
  description: "Instantly add or remove 10% Australian GST from any amount. Instant GST calculation for invoices, quotes and business accounting.",
  keywords: ["gst calculator australia", "add gst calculator", "remove gst calculator", "10% gst australia", "calcosmos"],
  openGraph: { title: "AU GST Calculator - Calcosmos", description: "Add or remove 10% Australian GST instantly.", type: "website" },
  twitter: { card: "summary", title: "AU GST Calculator", description: "Add or remove 10% GST instantly." },
};

export default function Page() {
  return <CalculatorsLayout activeId="au-gst" initialCategory="australia" />;
}
