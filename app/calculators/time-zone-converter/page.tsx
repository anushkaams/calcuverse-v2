import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Time Zone Converter - Free Online Calculator",
  description: "Free online time zone converter. Convert times between time zones.",
  keywords: ["time zone converter", "free time zone converter", "online time zone converter"],
  openGraph: {
    title: "Time Zone Converter - Free Online Calculator",
    description: "Convert times between time zones.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Time Zone Converter",
    description: "Convert times between time zones.",
  },
};

export default function TimeZoneCalcPage() {
  return <CalculatorsLayout activeId="time-zone" initialCategory="date-time" />;
}
