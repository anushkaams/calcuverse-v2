"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is net worth?", answer: "Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). It's a snapshot of your financial health." },
  { question: "What counts as an asset?", answer: "Assets include cash, savings, investments, retirement accounts, real estate, vehicles, and valuable personal property." },
  { question: "What counts as a liability?", answer: "Liabilities include mortgages, car loans, student loans, credit card debt, medical debt, and any other money owed." },
  { question: "What is a good net worth?", answer: "A common benchmark is 10× your annual income by age 60. But any positive and growing net worth is a healthy sign." },
];

type Item = { label: string; value: string };

export default function NetWorthCalc() {
  const [assets, setAssets] = useState<Item[]>([
    { label: "Checking/Savings", value: "" },
    { label: "Investments", value: "" },
    { label: "Real Estate", value: "" },
    { label: "Retirement Accounts", value: "" },
  ]);
  const [liabilities, setLiabilities] = useState<Item[]>([
    { label: "Mortgage", value: "" },
    { label: "Car Loans", value: "" },
    { label: "Student Loans", value: "" },
    { label: "Credit Cards", value: "" },
  ]);

  const totalAssets = assets.reduce((s, i) => s + (parseFloat(i.value) || 0), 0);
  const totalLiabilities = liabilities.reduce((s, i) => s + (parseFloat(i.value) || 0), 0);
  const netWorth = totalAssets - totalLiabilities;
  const positive = netWorth >= 0;

  const update = (arr: Item[], setArr: (a: Item[]) => void, idx: number, val: string) => {
    const copy = [...arr];
    copy[idx] = { ...copy[idx], value: val };
    setArr(copy);
  };

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div>
        <div className="font-semibold mb-3" style={{ color: "#10b981" }}>Assets</div>
        <div className="space-y-2">
          {assets.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
              <input type="number" className="field-input" style={{ width: "140px" }} value={item.value} onChange={e => update(assets, setAssets, i, e.target.value)} placeholder="0" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold mb-3" style={{ color: "#ef4444" }}>Liabilities</div>
        <div className="space-y-2">
          {liabilities.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
              <input type="number" className="field-input" style={{ width: "140px" }} value={item.value} onChange={e => update(liabilities, setLiabilities, i, e.target.value)} placeholder="0" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm px-1" style={{ color: "var(--text-secondary)" }}>
          <span>Total Assets</span><span style={{ color: "#10b981" }}>${totalAssets.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm px-1" style={{ color: "var(--text-secondary)" }}>
          <span>Total Liabilities</span><span style={{ color: "#ef4444" }}>${totalLiabilities.toLocaleString()}</span>
        </div>
        <div className="result-box" style={{ borderColor: (positive ? "#10b981" : "#ef4444") + "40", background: (positive ? "#10b981" : "#ef4444") + "12" }}>
          <div className="result-label">Net Worth</div>
          <div className="result-value text-3xl" style={{ color: positive ? "#10b981" : "#ef4444" }}>
            {positive ? "" : "-"}${Math.abs(netWorth).toLocaleString()}
          </div>
        </div>
      </div>

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
