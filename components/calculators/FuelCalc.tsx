"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

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

    const faqs = [
        {
            question: "How does the fuel cost calculator work?",
            answer:
                "The calculator works by taking three inputs: the total distance of your trip, your vehicle's fuel efficiency (how far it travels per litre or gallon), and the current price of fuel at the pump. It divides the distance by the fuel efficiency to find out how many litres or gallons your trip will consume, then multiplies that by the fuel price to give you the total cost. The result is a quick and reliable estimate that helps you budget for any journey, whether it's a daily commute or a long road trip.",
        },
        {
            question: "What fuel efficiency figure should I use?",
            answer:
                "The best figure to use is your real-world fuel efficiency rather than the manufacturer's official rating. Manufacturer figures are measured under controlled laboratory conditions and are almost always better than what you will achieve on the road. You can find your real-world efficiency by filling your tank completely, driving normally until you need to refuel, then dividing the kilometres or miles travelled by the litres or gallons used. Most modern vehicles also display a live or average fuel consumption figure on the dashboard, which is a convenient source for this number.",
        },
        {
            question: "Why does my actual fuel cost differ from the estimate?",
            answer:
                "Several real-world factors can cause your actual cost to differ from the estimate. Driving style has the biggest impact — frequent hard acceleration and braking significantly increases fuel consumption. Other factors include road type (highway driving is generally more efficient than stop-start city driving), vehicle load (carrying heavy cargo or passengers increases consumption), tyre pressure (under-inflated tyres create more rolling resistance), air conditioning use, and weather conditions such as strong headwinds. The calculator provides a solid baseline estimate, but treating it as a close approximation rather than an exact figure is always wise.",
        },
        {
            question: "Can I use this calculator for both petrol and diesel vehicles?",
            answer:
                "Yes, the calculator works for any fuel type including petrol, diesel, LPG, and even hydrogen vehicles, as long as you enter the correct fuel price and efficiency for that fuel type. Keep in mind that diesel and petrol are priced differently at the pump, and diesel engines typically achieve better fuel efficiency than equivalent petrol engines. Simply enter the price per litre of whatever fuel your vehicle uses and your vehicle's efficiency with that fuel, and the calculator will give you an accurate cost estimate.",
        },
        {
            question: "How do I calculate fuel cost for a return trip?",
            answer:
                "To calculate the cost of a return trip, simply double the one-way distance before entering it into the calculator. For example, if your destination is 150 km away, enter 300 km to get the total round trip fuel cost. If your return route is different in distance, calculate each leg separately and add them together. Keep in mind that return trips sometimes differ in fuel consumption due to different road conditions, elevation changes, or varying traffic levels between the outbound and return journeys.",
        },
        {
            question: "Is this calculator useful for comparing different vehicles?",
            answer:
                "Absolutely. One of the most practical uses of this calculator is comparing the running costs of different vehicles before making a purchase decision. By entering the same trip distance and fuel price but swapping out the fuel efficiency figure for each vehicle you are considering, you can see exactly how much more or less each option will cost you per trip and over time. This makes it easy to weigh up whether a more fuel-efficient vehicle justifies a higher purchase price based on your typical driving distance and fuel costs in your area.",
        },
    ];

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

            <CalculatorInfo
                title="Fuel Calculator - Guide & FAQ"
                faqs={faqs}
            />
        </div>
    );
}
