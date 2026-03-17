import type { Metadata } from "next";
import FuelCalc from "@/components/calculators/FuelCalc";

export const metadata: Metadata = {
  title: "Fuel Cost Calculator - Calculate Trip Fuel Costs",
  description: "Free online fuel cost calculator. Estimate how much fuel your trip will use and what it will cost based on distance, fuel efficiency, and current fuel prices.",
  keywords: ["fuel cost calculator", "trip fuel calculator", "petrol cost calculator", "fuel consumption calculator", "how much fuel will I use"],

  alternates: {
    canonical: "https://yoursite.com/calculators/fuel-calculator",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Fuel Cost Calculator - Calculate Trip Fuel Costs",
    description: "Estimate your trip fuel costs instantly based on distance, efficiency, and fuel price.",
    type: "website",
    url: "https://yoursite.com/calculators/fuel-calculator",
    siteName: "Your Site Name",
  },

  twitter: {
    card: "summary",
    title: "Fuel Cost Calculator",
    description: "Calculate how much fuel your trip will cost instantly.",
  },
};

export default function Page() {
  return <FuelCalc />;
}