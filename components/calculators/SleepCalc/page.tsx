"use client";
import { useState } from "react";

function addMinutes(time: string, mins: number): string {
    const [h, m] = time.split(":").map(Number);
    const total = (h * 60 + m + mins + 1440) % 1440;
    const nh = Math.floor(total / 60);
    const nm = total % 60;
    const ampm = nh >= 12 ? "PM" : "AM";
    const displayH = nh % 12 === 0 ? 12 : nh % 12;
    return `${displayH}:${String(nm).padStart(2, "0")} ${ampm}`;
}

function subtractMinutes(time: string, mins: number): string {
    return addMinutes(time, -mins);
}

const CYCLE = 90; // minutes per sleep cycle
const FALL_ASLEEP = 14; // avg minutes to fall asleep

export default function SleepCalc() {
    const [mode, setMode] = useState<"wake" | "bed">("wake");
    const [time, setTime] = useState("07:00");

    const cycles = [6, 5, 4.5, 4]; // recommended → minimum
    const cycleMinutes = cycles.map(c => c * 60);

    return (
        <div className="space-y-5">
            <div className="tab-group">
                <button className={`tab-item ${mode === "wake" ? "active" : ""}`} onClick={() => setMode("wake")}>
                    I want to wake at…
                </button>
                <button className={`tab-item ${mode === "bed" ? "active" : ""}`} onClick={() => setMode("bed")}>
                    I'm going to bed at…
                </button>
            </div>

            <div>
                <div className="field-label">{mode === "wake" ? "Wake-up time" : "Bedtime"}</div>
                <input type="time" className="field-input" value={time} onChange={e => setTime(e.target.value)} />
            </div>

            <div className="p-3 rounded-xl text-xs" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--text-muted)" }}>
                    Based on <span style={{ color: "var(--text-secondary)" }}>90-min sleep cycles</span> + <span style={{ color: "var(--text-secondary)" }}>~{FALL_ASLEEP} min</span> to fall asleep
                </div>
            </div>

            <div className="space-y-2">
                {cycleMinutes.map((mins, i) => {
                    const numCycles = cycles[i];
                    const hours = mins / 60;
                    const result = mode === "wake"
                        ? subtractMinutes(time, mins + FALL_ASLEEP)
                        : addMinutes(time, mins + FALL_ASLEEP);
                    const label = mode === "wake" ? "Go to bed at" : "Wake up at";
                    const isIdeal = i < 2;

                    return (
                        <div
                            key={i}
                            className="flex items-center justify-between px-4 py-3 rounded-xl"
                            style={{
                                background: isIdeal ? "var(--accent-soft)" : "var(--surface-2)",
                                border: `1px solid ${isIdeal ? "rgba(124,106,247,0.3)" : "var(--border)"}`,
                            }}
                        >
                            <div>
                                <div className="text-xs font-medium" style={{ color: isIdeal ? "#a89bfb" : "var(--text-muted)" }}>
                                    {numCycles} cycles · {hours}h {isIdeal ? "✦ Recommended" : ""}
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
                            </div>
                            <div className="font-mono text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                                {result}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                Adults need 7–9 hours · One cycle ≈ 90 minutes
            </div>
        </div>
    );
}
