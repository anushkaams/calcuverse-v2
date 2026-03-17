import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Subnet Calculator - Free Online Calculator",
  description: "Free online subnet calculator. Calculate IP subnets and CIDR ranges.",
  keywords: ["subnet calculator", "free subnet calculator", "online subnet calculator"],
  openGraph: {
    title: "Subnet Calculator - Free Online Calculator",
    description: "Calculate IP subnets and CIDR ranges.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Subnet Calculator",
    description: "Calculate IP subnets and CIDR ranges.",
  },
};

export default function SubnetCalcPage() {
  return <CalculatorsLayout activeId="subnet" initialCategory="everyday" />;
}
