"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is unit price comparison?", answer: "Unit price comparison lets you compare products of different sizes or quantities by reducing each to a cost per standard unit (e.g., per gram, per oz)." },
  { question: "Why doesn't the biggest always win?", answer: "Larger sizes often have lower unit prices, but not always. Sales, store brands, or expiry concerns may make a smaller size the better value." },
  { question: "How do stores display unit prices?", answer: "Many grocery stores are required by law to display unit prices on shelf labels, but comparing across stores or online still requires manual calculation." },
  { question: "Should I always buy the lowest unit price?", answer: "Consider storage space, expiry date, and whether you'll actually use it all. Waste eliminates any price advantage." },
];

type Product = { name: string; price: string; quantity: string; unit: string };

export default function UnitPriceCalc() {
  const [products, setProducts] = useState<Product[]>([
    { name: "Small", price: "", quantity: "", unit: "oz" },
    { name: "Large", price: "", quantity: "", unit: "oz" },
  ]);

  const addProduct = () => setProducts([...products, { name: `Option ${products.length + 1}`, price: "", quantity: "", unit: "oz" }]);
  const update = (i: number, k: keyof Product, v: string) => {
    const c = [...products]; c[i] = { ...c[i], [k]: v }; setProducts(c);
  };

  const withUnit = products.map(p => ({
    ...p,
    unitPrice: parseFloat(p.quantity) > 0 ? (parseFloat(p.price) || 0) / parseFloat(p.quantity) : Infinity,
  }));
  const minPrice = Math.min(...withUnit.map(p => p.unitPrice));

  return (
    <div className="space-y-6 max-w-md mx-auto py-6 px-4">
      <div className="space-y-3">
        {products.map((p, i) => (
          <div key={i} className="p-3 rounded-xl border" style={{ borderColor: "var(--border)" }}>
            <input className="field-input mb-2 font-medium" value={p.name} onChange={e => update(i, "name", e.target.value)} placeholder="Product name" />
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="field-label">Price ($)</div>
                <input type="number" className="field-input" value={p.price} onChange={e => update(i, "price", e.target.value)} placeholder="3.99" />
              </div>
              <div>
                <div className="field-label">Qty</div>
                <input type="number" className="field-input" value={p.quantity} onChange={e => update(i, "quantity", e.target.value)} placeholder="16" />
              </div>
              <div>
                <div className="field-label">Unit</div>
                <input className="field-input" value={p.unit} onChange={e => update(i, "unit", e.target.value)} placeholder="oz" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addProduct} className="w-full py-2 rounded-lg text-sm border border-dashed" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
        + Add Product
      </button>

      {withUnit.some(p => p.unitPrice < Infinity) && (
        <div className="space-y-2">
          {withUnit.map((p, i) => {
            const isBest = p.unitPrice === minPrice && p.unitPrice < Infinity;
            return (
              <div key={i} className="result-box flex justify-between items-center" style={isBest ? { borderColor: "#10b98140", background: "#10b98112" } : {}}>
                <span>{p.name} {isBest && "✓ Best Value"}</span>
                <span className="font-bold" style={{ color: isBest ? "#10b981" : "var(--text-primary)" }}>
                  {p.unitPrice < Infinity ? `$${p.unitPrice.toFixed(4)}/${p.unit}` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
