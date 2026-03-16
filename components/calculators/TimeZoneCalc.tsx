"use client";
import { useState, useEffect } from "react";

const ZONES = [
  { id: "Pacific/Honolulu", label: "Honolulu", abbr: "HST" },
  { id: "America/Los_Angeles", label: "Los Angeles", abbr: "PT" },
  { id: "America/Denver", label: "Denver", abbr: "MT" },
  { id: "America/Chicago", label: "Chicago", abbr: "CT" },
  { id: "America/New_York", label: "New York", abbr: "ET" },
  { id: "America/Sao_Paulo", label: "São Paulo", abbr: "BRT" },
  { id: "Europe/London", label: "London", abbr: "GMT/BST" },
  { id: "Europe/Paris", label: "Paris", abbr: "CET" },
  { id: "Europe/Moscow", label: "Moscow", abbr: "MSK" },
  { id: "Asia/Dubai", label: "Dubai", abbr: "GST" },
  { id: "Asia/Kolkata", label: "Mumbai", abbr: "IST" },
  { id: "Asia/Bangkok", label: "Bangkok", abbr: "ICT" },
  { id: "Asia/Shanghai", label: "Shanghai", abbr: "CST" },
  { id: "Asia/Tokyo", label: "Tokyo", abbr: "JST" },
  { id: "Australia/Sydney", label: "Sydney", abbr: "AEST" },
  { id: "Pacific/Auckland", label: "Auckland", abbr: "NZST" },
];

function getTime(zone: string, date: Date) {
  try {
    return date.toLocaleTimeString("en-US", { timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: true });
  } catch { return "—"; }
}
function getDate(zone: string, date: Date) {
  try {
    return date.toLocaleDateString("en-US", { timeZone: zone, weekday: "short", month: "short", day: "numeric" });
  } catch { return "—"; }
}

export default function TimeZoneCalc() {
  const [now, setNow] = useState(new Date());
  const [from, setFrom] = useState("America/New_York");
  const [inputTime, setInputTime] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  });
  const [pinned, setPinned] = useState(["America/Los_Angeles","Europe/London","Asia/Tokyo","Australia/Sydney"]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Build date from inputTime + today in "from" zone
  const [h, m] = inputTime.split(":").map(Number);
  const baseDate = new Date();
  baseDate.setHours(h||0, m||0, 0, 0);

  const togglePin = (id: string) => {
    setPinned(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="field-label">From Zone</div>
          <select className="field-select" value={from} onChange={e=>setFrom(e.target.value)}>
            {ZONES.map(z=><option key={z.id} value={z.id}>{z.label} ({z.abbr})</option>)}
          </select>
        </div>
        <div>
          <div className="field-label">Time</div>
          <input type="time" className="field-input" value={inputTime} onChange={e=>setInputTime(e.target.value)} />
        </div>
      </div>

      <div className="text-xs" style={{color:"var(--text-muted)"}}>
        📍 Your local time: <span className="font-mono" style={{color:"var(--text-secondary)"}}>{now.toLocaleTimeString()}</span>
      </div>

      <div className="space-y-1.5 max-h-72 overflow-y-auto">
        {ZONES.map(z=>{
          const t = getTime(z.id, baseDate);
          const d = getDate(z.id, baseDate);
          const isPinned = pinned.includes(z.id);
          return (
            <div key={z.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${isPinned?"border":"border"}`}
              style={{
                background: isPinned ? "var(--accent-soft)" : "var(--surface-2)",
                border: isPinned ? "1px solid rgba(124,106,247,0.3)" : "1px solid var(--border)"
              }}
              onClick={()=>togglePin(z.id)}>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium" style={{color:"var(--text-primary)"}}>{z.label}</div>
                <div className="text-xs" style={{color:"var(--text-muted)"}}>{z.abbr} · {d}</div>
              </div>
              <div className="font-mono text-base font-semibold" style={{color: isPinned ? "var(--accent)" : "var(--text-primary)"}}>{t}</div>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-center" style={{color:"var(--text-muted)"}}>Tap a city to pin/unpin it</div>
    </div>
  );
}
