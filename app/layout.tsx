import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Calcuverse — Every Calculator You'll Ever Need",
    template: "%s | Calcuverse",
  },
  description:
    "30+ free, beautifully designed calculators for everyday use — BMI, compound interest, tip, unit conversion, scientific and more. No sign-up, no backend.",
  openGraph: {
    title: "Calcuverse — Every Calculator You'll Ever Need",
    description:
      "30+ free calculators across 7 categories: everyday, finance, math, science, health, conversion and date & time.",
    type: "website",
    url: "https://calcuverse.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcuverse",
    description: "30+ free calculators, beautifully designed.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="transition-colors">{children}</body>
    </html>
  );
}
