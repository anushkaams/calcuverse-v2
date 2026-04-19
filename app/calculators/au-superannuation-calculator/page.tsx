import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "AU Superannuation Calculator - Retirement Projection 2025",
  description: "Project your superannuation balance at retirement using the 2025-26 12% SG rate. Includes salary sacrifice, earnings tax and compound growth.",
  keywords: ["superannuation calculator australia", "super calculator 2025", "retirement super calculator", "calcosmos"],
  openGraph: { title: "AU Superannuation Calculator - Calcosmos", description: "Project your super balance at retirement with 12% SG rate.", type: "website" },
  twitter: { card: "summary", title: "AU Superannuation Calculator", description: "Retirement projection with 2025-26 super guarantee rate." },
};

export default function Page() {
  return <CalculatorsLayout activeId="au-super" initialCategory="australia" />;
}
