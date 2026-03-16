"use client";
import { useState, useMemo } from "react";

export default function StatisticsCalc() {
  const [input, setInput] = useState("4, 8, 15, 16, 23, 42");

  const nums = useMemo(() => {
    return input.split(/[\s,;]+/).map(Number).filter(n => !isNaN(n) && n !== undefined);
  }, [input]);

  const stats = useMemo(() => {
    if (nums.length === 0) return null;
    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const freq: Record<number, number> = {};
    nums.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(k => freq[Number(k)] === maxFreq).map(Number);
    const variance = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const range = sorted[n - 1] - sorted[0];
    const sum = nums.reduce((a, b) => a + b, 0);
    return { n, mean, median, modes, variance, stdDev, range, sum, min: sorted[0], max: sorted[n - 1] };
  }, [nums]);

  return (
    <div className="space-y-4">
      <div>
        <div className="field-label">Data values (comma or space separated)</div>
        <textarea
          className="field-input resize-none"
          rows={3}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="4, 8, 15, 16, 23, 42"
          style={{ lineHeight: "1.6" }}
        />
        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{nums.length} value{nums.length !== 1 ? "s" : ""} detected</div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Count (n)", value: stats.n },
            { label: "Sum", value: stats.sum.toFixed(4) },
            { label: "Mean (avg)", value: stats.mean.toFixed(6) },
            { label: "Median", value: stats.median.toFixed(4) },
            { label: "Mode", value: stats.modes.join(", ") },
            { label: "Std Deviation", value: stats.stdDev.toFixed(6) },
            { label: "Variance", value: stats.variance.toFixed(6) },
            { label: "Range", value: stats.range.toFixed(4) },
            { label: "Min", value: stats.min },
            { label: "Max", value: stats.max },
          ].map(({ label, value }) => (
            <div key={label} className="result-box p-3">
              <div className="result-label">{label}</div>
              <div className="font-mono text-sm mt-1" style={{ color: "var(--text-primary)" }}>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
