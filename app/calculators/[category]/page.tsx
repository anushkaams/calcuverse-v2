// app/calculators/[category]/SleepCalculator.tsx
// Handles /calculators/all, /calculators/finance, etc.
// No per-calculator metadata here — that lives in the individual pages

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { type CalcCategory, CATEGORY_LABELS } from "@/data/registry";
import CalculatorsLayout from "@/components/CalculatorsLayout";

export const runtime = "edge";

const VALID_CATEGORIES = ["all", ...Object.keys(CATEGORY_LABELS)];

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = category === "all" ? "All Calculators" : CATEGORY_LABELS[category as CalcCategory] ?? "Calculators";
  return {
    title: `${label} - Calcosmos`,
    description: `Browse ${label.toLowerCase()} on Calcosmos.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) notFound();

  return (
    <CalculatorsLayout
      initialCategory={category === "all" ? "all" : (category as CalcCategory)}
    />
  );
}
