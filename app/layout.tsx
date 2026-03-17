import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Calcosmos - Every Calculator You'll Ever Need",
    template: "%s | Calcosmos",
  },
  description:
    "30+ free, beautifully designed calculators for everyday use — BMI, compound interest, tip, unit conversion, scientific and more. No sign-up, no backend.",
  openGraph: {
    title: "Calcosmos — Every Calculator You'll Ever Need",
    description:
      "30+ free calculators across 7 categories: everyday, finance, math, science, health, conversion and date & time.",
    type: "website",
    url: "https://Calcosmos.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcosmos",
    description: "30+ free calculators, beautifully designed.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Calcosmos - The calculator suite you'll actually want to use." />
        <link rel="icon" type="image/svg+xml" href="/logo-icon.svg" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
        <meta name="theme-color" content="#7C3AED" />
        <title>Calcosmos</title>
      </head>
      <body className="transition-colors">{children}</body>
      </html>
  );
}
