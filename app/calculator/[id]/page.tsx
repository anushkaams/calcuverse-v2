"use client";
import { Suspense, useMemo, useState, use } from "react";
import {
  type CalcCategory,
  type CalculatorMeta,
  CALCULATORS,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
} from "@/data/registry";
import ThemeToggleIO from "@/components/ThemeToggleIO";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

function CalcSkeleton() {
  return (
    <div className="animate-pulse space-y-3 p-2">
      <div className="h-16 rounded-xl bg-[var(--surface-2)]" />
      <div className="keypad-4 mt-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-[var(--surface-2)]" />
        ))}
      </div>
    </div>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
           width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input type="text" placeholder="  Search calculators…" value={value}
             onChange={e => onChange(e.target.value)}
             className="field-input pl-9 py-2.5 text-sm" style={{ fontSize: "0.875rem" }} />
    </div>
  );
}

function CategoryFilter({
  active, onChange, counts,
}: {
  active: CalcCategory | "all";
  onChange: (c: CalcCategory | "all") => void;
  counts: Record<string, number>;
}) {
  const all = [
    { id: "all", label: "All", color: "#7c6af7" },
    ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
      id, label, color: CATEGORY_COLORS[id as CalcCategory],
    })),
  ];
  return (
    <nav className="space-y-0.5">
      {all.map(cat => (
        <button key={cat.id} onClick={() => onChange(cat.id as CalcCategory | "all")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                  active === cat.id
                    ? "bg-[var(--surface-2)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
                }`}>
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: cat.color, opacity: active === cat.id ? 1 : 0.5 }} />
            {cat.label}
          </span>
          <span className={`text-xs ${active === cat.id ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}`}>
            {counts[cat.id] ?? 0}
          </span>
        </button>
      ))}
    </nav>
  );
}

function CalcCard({ calc, active, onClick }: { calc: CalculatorMeta; active: boolean; onClick: () => void }) {
  const color = CATEGORY_COLORS[calc.category];
  return (
    <button onClick={onClick}
            className={`w-full text-left p-3.5 rounded-xl border transition-all ${
              active
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)]"
            }`}>
      <div className="flex items-start gap-3">
        <span className="text-xl w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
              style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
          {calc.icon}
        </span>
        <div className="min-w-0">
          <div className="font-medium text-sm leading-tight text-[var(--text-primary)]">{calc.name}</div>
          <div className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug line-clamp-1">{calc.description}</div>
        </div>
      </div>
    </button>
  );
}

export default function CalculatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const initialCalc = CALCULATORS.find(c => c.id === id);
  if (!initialCalc) notFound();

  const [activeId, setActiveId] = useState(id);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CalcCategory | "all">(initialCalc.category);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return CALCULATORS.filter(c => {
      const matchCat = category === "all" || c.category === category;
      const matchSearch = !q || c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) || c.tags?.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const counts = useMemo(() => {
    const out: Record<string, number> = { all: CALCULATORS.length };
    for (const c of CALCULATORS) out[c.category] = (out[c.category] ?? 0) + 1;
    return out;
  }, []);

  const activeCalc = CALCULATORS.find(c => c.id === activeId) ?? initialCalc;
  const ActiveComponent = activeCalc.component;

  const handleCategoryChange = (c: CalcCategory | "all") => {
    setCategory(c);
    setSearch("");
    const first = CALCULATORS.find(calc => c === "all" || calc.category === c);
    if (first) {
      setActiveId(first.id);
      router.push(`/calculator/${first.id}`, { scroll: false });
    } else {
      router.push(`/calculators/${c}`, { scroll: false });
    }
  };

  const handleCalcSelect = (calcId: string) => {
    setActiveId(calcId);
    setSidebarOpen(false);
    router.push(`/calculator/${calcId}`, { scroll: false });
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--surface-0)" }}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed lg:relative z-30 lg:z-auto inset-y-0 left-0 flex flex-col w-72 border-r transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
             style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}>

        <Link href="/" className="flex items-center gap-3 px-5 py-4 border-b"
              style={{ borderColor: "var(--border)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
               style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent-glow)" }}>∑</div>
          <div>
            <div className="font-bold text-base leading-none" style={{ fontFamily: "var(--font-outfit)" }}>Calcuverse</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{CALCULATORS.length} calculators</div>
          </div>
          <button className="ml-auto lg:hidden p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  onClick={e => { e.preventDefault(); setSidebarOpen(false); }}>✕</button>
        </Link>

        <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="px-4 pt-3 pb-2">
          <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>Category</div>
          <CategoryFilter active={category} onChange={handleCategoryChange} counts={counts} />
        </div>

        <div className="mx-4 border-t my-1" style={{ borderColor: "var(--border)" }} />

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 pb-6">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-sm" style={{ color: "var(--text-muted)" }}>
              No calculators match<br /><span className="text-xs">"{search}"</span>
            </div>
          ) : (
            filtered.map(calc => (
              <CalcCard key={calc.id} calc={calc} active={calc.id === activeId}
                        onClick={() => handleCalcSelect(calc.id)} />
            ))
          )}
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-4 px-5 py-3.5 border-b flex-shrink-0"
                style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}>
          <button className="lg:hidden p-1.5 rounded-lg border text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text-secondary)" }}
                  onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="flex items-center gap-3">
            <span className="text-lg">{activeCalc.icon}</span>
            <div>
              <h1 className="font-semibold text-base leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                {activeCalc.name}
              </h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{activeCalc.description}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: `${CATEGORY_COLORS[activeCalc.category]}18`,
                    color: CATEGORY_COLORS[activeCalc.category],
                    border: `1px solid ${CATEGORY_COLORS[activeCalc.category]}30`,
                  }}>
              {CATEGORY_LABELS[activeCalc.category]}
            </span>
            <ThemeToggleIO />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto flex items-start justify-center p-6">
          <div className="w-full max-w-md">
            <Suspense fallback={<CalcSkeleton />}>
              <ActiveComponent />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
