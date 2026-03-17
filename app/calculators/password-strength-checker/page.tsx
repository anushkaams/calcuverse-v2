import type { Metadata } from "next";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const metadata: Metadata = {
  title: "Password Strength Checker - Free Online Calculator",
  description: "Free online password strength checker. Check how strong your password is.",
  keywords: ["password strength checker", "free password strength checker", "online password strength checker"],
  openGraph: {
    title: "Password Strength Checker - Free Online Calculator",
    description: "Check how strong your password is.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Password Strength Checker",
    description: "Check how strong your password is.",
  },
};

export default function PasswordStrengthCalcPage() {
  return <CalculatorsLayout activeId="password-strength" initialCategory="everyday" />;
}
