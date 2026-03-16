"use client";
import { useState } from "react";

export default function FuelCalc() {
    const [distance, setDistance] = useState("300");
    const [efficiency, setEfficiency] = useState("30");
    const [fuelPrice, setFuelPrice] = useState("3.50");
    const [unit, setUnit] = useState<"imperial" | "metric">("imperial");

    const d = parseFloat(distance) || 0;
    const eff = parseFloat(efficiency) || 1;
    const price = parseFloat(fuelPrice) || 0;

    // Imperial: miles / mpg * $/gallon
    // Metric: km / (L/100km) / 100 * $/L
    const fuelUsed = unit === "imperial" ? d / eff : (d / 100) * eff;
    const totalCost = fuelUsed * price;
    const costPer100 = unit === "imperial"
        ? (100 / eff) * price
        : eff * price;

    const effLabel = unit === "imperial" ? "MPG" : "L/100km";
    const distLabel = unit === "imperial" ? "miles" : "km";
    const fuelLabel = unit === "imperial" ? "gallons" : "litres";
    const priceLabel = unit === "imperial" ? "$/gallon" : "$/litre";

    return (
        <div className="space-y-4">
            <div className="tab-group">
                <button className={`tab-item ${unit === "imperial" ? "active" : ""}`} onClick={() => setUnit("imperial")}>Imperial (MPG)</button>
                <button className={`tab-item ${unit === "metric" ? "active" : ""}`} onClick={() => setUnit("metric")}>Metric (L/100km)</button>
            </div>

            <div>
                <div className="field-label">Trip Distance ({distLabel})</div>
                <input type="number" className="field-input" value={distance} onChange={e => setDistance(e.target.value)} placeholder="300" />
            </div>

            <div>
                <div className="field-label">Fuel Efficiency ({effLabel})</div>
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min={unit === "imperial" ? "10" : "4"}
                        max={unit === "imperial" ? "60" : "25"}
                        step="0.5"
                        value={efficiency}
                        onChange={e => setEfficiency(e.target.value)}
                        className="flex-1"
                    />
                    <div className="relative w-24">
                        <input type="number" className="field-input text-center pr-1" value={efficiency} onChange={e => setEfficiency(e.target.value)} />
                    </div>
                </div>
            </div>

            <div>
                <div className="field-label">Fuel Price ({priceLabel})</div>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>$</span>
                    <input type="number" className="field-input pl-7" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)} step="0.01" />
                </div>
            </div>

            <div className="result-box">
                <div className="result-label">Total Fuel Cost</div>
                <div className="result-value text-3xl">${totalCost.toFixed(2)}</div>
                <div className="result-sub">{fuelUsed.toFixed(2)} {fuelLabel} used</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="result-box">
                    <div className="result-label">Cost per 100 {distLabel}</div>
                    <div className="result-value text-base">${costPer100.toFixed(2)}</div>
                </div>
                <div className="result-box">
                    <div className="result-label">Cost per {distLabel}</div>
                    <div className="result-value text-base">${(totalCost / (d || 1)).toFixed(3)}</div>
                </div>
            </div>

            <div className="p-3 rounded-xl text-xs" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <div className="font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Quick comparison</div>
                <div className="space-y-1">
                    {(unit === "imperial" ? [20, 25, 30, 35, 40] : [5, 7, 9, 12, 15]).map(e => (
                        <div key={e} className="flex justify-between" style={{ color: e === parseFloat(efficiency) ? "var(--text-primary)" : "var(--text-muted)" }}>
                            <span>{e} {effLabel}</span>
                            <span className="font-mono">
                ${((unit === "imperial" ? d / e : (d / 100) * e) * price).toFixed(2)}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
