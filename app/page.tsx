"use client";
import {useState, useEffect, useRef, useMemo} from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {CALCULATORS, CATEGORY_LABELS, CATEGORY_COLORS, type CalcCategory} from "@/data/registry";

function Counter({target, suffix = ""}: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            obs.disconnect();
            let start = 0;
            const step = Math.ceil(target / 40);
            const t = setInterval(() => {
                start = Math.min(start + step, target);
                setCount(start);
                if (start >= target) clearInterval(t);
            }, 30);
        }, {threshold: 0.5});
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={ref}>{count}{suffix}</span>;
}

function FloatingCard({icon, name, delay}: { icon: string; name: string; delay: number }) {
    return (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium select-none"
             style={{
                 background: "var(--surface-2)", border: "1px solid var(--border)",
                 color: "var(--text-secondary)",
                 animation: `floatCard 4s ease-in-out ${delay}s infinite`,
                 boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
             }}>
            <span>{icon}</span>{name}
        </div>
    );
}

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<CalcCategory | "all">("all");
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Keyboard shortcut: "/" to focus search
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
                e.preventDefault();
                searchRef.current?.focus();
                searchRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const categories = Object.keys(CATEGORY_LABELS) as CalcCategory[];

    const filteredCalcs = useMemo(() => {
        let calcs = CALCULATORS;
        if (activeCategory !== "all") calcs = calcs.filter(c => c.category === activeCategory);
        if (search.trim()) {
            const q = search.toLowerCase();
            calcs = calcs.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.description?.toLowerCase().includes(q) ||
                CATEGORY_LABELS[c.category].toLowerCase().includes(q)
            );
        }
        return calcs;
    }, [search, activeCategory]);

    // Group filtered calcs by category
    const groupedCalcs = useMemo(() => {
        if (activeCategory !== "all" || search.trim()) {
            return null; // flat list when filtered
        }
        return categories.map(cat => ({
            cat,
            calcs: CALCULATORS.filter(c => c.category === cat)
        }));
    }, [activeCategory, search, categories]);

    return (
        <div style={{background: "var(--surface-0)", color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)"}}>
            <style>{`
        @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-glow { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.7;transform:scale(1.05)} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .hero-fade-1{animation:heroFadeUp .7s ease-out .1s both}
        .hero-fade-2{animation:heroFadeUp .7s ease-out .25s both}
        .hero-fade-3{animation:heroFadeUp .7s ease-out .4s both}
        .hero-fade-4{animation:heroFadeUp .7s ease-out .55s both}
        .hero-fade-5{animation:heroFadeUp .7s ease-out .7s both}
        .ticker-track{animation:ticker 300s linear infinite}
        .ticker-track:hover{animation-play-state:paused}
        .calc-card:hover .calc-arrow{opacity:1;transform:translateX(2px)}
        .calc-arrow{opacity:0;transition:opacity .15s,transform .15s}
        .search-input:focus{outline:none}
        .cat-pill{transition:all .2s}
        .cat-pill:hover{transform:translateY(-1px)}
        .calc-card{transition:all .2s cubic-bezier(.34,1.56,.64,1)}
        .calc-card:hover{transform:translateY(-3px) scale(1.02)}
      `}</style>

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                 style={{
                     background: scrolled ? "var(--nav-scrolled-bg)" : "transparent",
                     backdropFilter: scrolled ? "blur(12px)" : "none",
                     borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                 }}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="/logo.svg" className="logo-dark" width={200} height={50} alt="Calcuverse"/>
                        <img src="/logo-light.svg" className="logo-light" width={200} height={50} alt="Calcuverse"/>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm" style={{color: "var(--text-secondary)"}}>
                        <a href="#calculators" className="hover:text-white transition-colors">Calculators</a>
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/calculators/all"
                              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                              style={{background: "var(--accent)", boxShadow: "0 0 20px var(--accent-glow)"}}>
                            Open App →
                        </Link>
                        <ThemeToggle/>
                    </div>
                </div>
            </nav>

            {/* HERO — compact, action-focused */}
            <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16">
                {/* Background blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                         style={{background: "radial-gradient(circle,rgba(124,106,247,.12) 0%,transparent 70%)", animation: "pulse-glow 6s ease-in-out infinite"}}/>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
                         style={{background: "radial-gradient(circle,rgba(16,185,129,.08) 0%,transparent 70%)", animation: "pulse-glow 8s ease-in-out 2s infinite"}}/>
                    <div className="absolute inset-0 opacity-[0.025]"
                         style={{backgroundImage: "linear-gradient(var(--text-primary) 1px,transparent 1px),linear-gradient(90deg,var(--text-primary) 1px,transparent 1px)", backgroundSize: "60px 60px"}}/>
                </div>

                <div className="relative text-center max-w-3xl mx-auto w-full">
                    {/* Floating cards — left side */}
                    <div className="absolute hidden lg:block" style={{top: "5%", left: "-18%"}}><FloatingCard icon="📈" name="Compound Interest" delay={0}/></div>
                    <div className="absolute hidden lg:block" style={{top: "35%", left: "-20%"}}><FloatingCard icon="🧮" name="Scientific" delay={1.2}/></div>
                    <div className="absolute hidden lg:block" style={{top: "65%", left: "-16%"}}><FloatingCard icon="❤️" name="Heart Rate" delay={0.6}/></div>
                    {/* Floating cards — right side */}
                    <div className="absolute hidden lg:block" style={{top: "5%", right: "-18%"}}><FloatingCard icon="🌡️" name="Temperature" delay={0.9}/></div>
                    <div className="absolute hidden lg:block" style={{top: "35%", right: "-20%"}}><FloatingCard icon="💹" name="Loan / EMI" delay={1.8}/></div>
                    <div className="absolute hidden lg:block" style={{top: "65%", right: "-16%"}}><FloatingCard icon="📅" name="Date Diff" delay={0.4}/></div>
                    <div className="hero-fade-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6"
                         style={{background: "var(--accent-soft)", border: "1px solid rgba(124,106,247,.3)", color: "#a89bfb"}}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" style={{animation: "pulse-glow 2s infinite"}}/>
                        {CALCULATORS.length}+ calculators · 100% free · no sign-up
                    </div>

                    <h1 className="hero-fade-2 font-bold leading-[1.08] tracking-tight mb-4"
                        style={{fontFamily: "var(--font-outfit)", fontSize: "clamp(2.4rem,6vw,4.2rem)"}}>
                        Every calculator<br/>
                        <span style={{background: "linear-gradient(135deg,#7c6af7,#a78bfa,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
                            you'll ever need
                        </span>
                    </h1>

                    <p className="hero-fade-3 text-lg leading-relaxed mb-8 max-w-xl mx-auto" style={{color: "var(--text-secondary)"}}>
                        From tip splitting to compound interest — all beautifully designed, instantly ready to use.
                    </p>

                    {/* Stats row */}
                    <div className="hero-fade-3 flex flex-wrap justify-center gap-3 mb-8">
                        {[
                            {n: CALCULATORS.length, suffix: "+", label: "Calculators"},
                            {n: categories.length, suffix: "", label: "Categories"},
                            {n: 0, suffix: "0KB", label: "No backend"},
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                                 style={{background: "var(--surface-2)", border: "1px solid var(--border)"}}>
                                <span className="font-bold font-mono" style={{color: "var(--accent)"}}>
                                    {s.n > 0 ? <Counter target={s.n} suffix={s.suffix}/> : s.suffix}
                                </span>
                                <span className="text-sm" style={{color: "var(--text-muted)"}}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* SEARCH BAR — front and center */}
                    <div className="hero-fade-4 relative max-w-xl mx-auto">
                        <div className="absolute inset-0 rounded-2xl blur-xl"
                             style={{background: "var(--accent)", opacity: 0.15}}/>
                        <div className="relative flex items-center gap-3 px-5 py-4 rounded-2xl"
                             style={{background: "var(--surface-1)", border: "2px solid var(--accent)", boxShadow: "0 0 40px var(--accent-glow)"}}>
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{color: "var(--accent)", flexShrink: 0}}>
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input
                                ref={searchRef}
                                className="search-input flex-1 bg-transparent text-base"
                                placeholder={`Search ${CALCULATORS.length}+ calculators...`}
                                value={search}
                                onChange={e => { setSearch(e.target.value); setActiveCategory("all"); }}
                                style={{color: "var(--text-primary)", caretColor: "var(--accent)"}}
                            />
                            {search && (
                                <button onClick={() => setSearch("")}
                                        className="flex items-center justify-center w-6 h-6 rounded-full text-xs transition-colors hover:bg-red-500/20"
                                        style={{color: "var(--text-muted)"}}>
                                    ✕
                                </button>
                            )}
                            {!search && (
                                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
                                     style={{background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)"}}>
                                    /
                                </kbd>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* TICKER */}
            <div className="relative overflow-hidden py-4 border-y"
                 style={{borderColor: "var(--border)", background: "var(--surface-1)"}}>
                <div className="ticker-track flex gap-8 w-max">
                    {[...CALCULATORS, ...CALCULATORS].map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap" style={{color: "var(--text-muted)"}}>
                            <span>{c.icon}</span><span>{c.name}</span><span className="opacity-30 mx-1">·</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CALCULATOR DIRECTORY — the main event */}
            <section id="calculators" className="py-16 px-6" style={{background: "var(--surface-0)"}}>
                <div className="max-w-7xl mx-auto">

                    {/* Category filter pills */}
                    <div className="flex flex-wrap gap-2 mb-10 hero-fade-5">
                        <button
                            onClick={() => { setActiveCategory("all"); setSearch(""); }}
                            className="cat-pill flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                            style={{
                                background: activeCategory === "all" ? "var(--accent)" : "var(--surface-2)",
                                color: activeCategory === "all" ? "white" : "var(--text-secondary)",
                                border: activeCategory === "all" ? "1px solid transparent" : "1px solid var(--border)",
                                boxShadow: activeCategory === "all" ? "0 0 20px var(--accent-glow)" : "none",
                            }}>
                            ✦ All
                            <span className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                                  style={{background: activeCategory === "all" ? "rgba(255,255,255,.2)" : "var(--surface-3)", color: activeCategory === "all" ? "white" : "var(--text-muted)"}}>
                                {CALCULATORS.length}
                            </span>
                        </button>
                        {categories.map(cat => {
                            const color = CATEGORY_COLORS[cat];
                            const count = CALCULATORS.filter(c => c.category === cat).length;
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setSearch(""); }}
                                    className="cat-pill flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                                    style={{
                                        background: isActive ? `${color}20` : "var(--surface-2)",
                                        color: isActive ? color : "var(--text-secondary)",
                                        border: isActive ? `1px solid ${color}60` : "1px solid var(--border)",
                                        boxShadow: isActive ? `0 0 16px ${color}30` : "none",
                                    }}>
                                    {CALCULATORS.find(c => c.category === cat)?.icon} {CATEGORY_LABELS[cat]}
                                    <span className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                                          style={{background: isActive ? `${color}25` : "var(--surface-3)", color: isActive ? color : "var(--text-muted)"}}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Results count when searching */}
                    {(search || activeCategory !== "all") && (
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm" style={{color: "var(--text-muted)"}}>
                                {filteredCalcs.length === 0
                                    ? "No calculators found"
                                    : <><span style={{color: "var(--accent)", fontWeight: 600}}>{filteredCalcs.length}</span> calculator{filteredCalcs.length !== 1 ? "s" : ""} {search ? `for "${search}"` : `in ${CATEGORY_LABELS[activeCategory as CalcCategory]}`}</>
                                }
                            </p>
                            {(search || activeCategory !== "all") && (
                                <button onClick={() => { setSearch(""); setActiveCategory("all"); }}
                                        className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
                                        style={{background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)"}}>
                                    Clear filters
                                </button>
                            )}
                        </div>
                    )}

                    {/* FLAT GRID — for search/filter results */}
                    {(search.trim() || activeCategory !== "all") && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                            {filteredCalcs.length === 0 ? (
                                <div className="col-span-full text-center py-24">
                                    <div className="text-5xl mb-4">🔍</div>
                                    <p className="font-semibold mb-2">No calculators found</p>
                                    <p className="text-sm" style={{color: "var(--text-muted)"}}>Try a different search term or browse a category</p>
                                </div>
                            ) : filteredCalcs.map(calc => {
                                const color = CATEGORY_COLORS[calc.category];
                                return (
                                    <Link key={calc.id} href={`/calculator/${calc.id}`}
                                          className="calc-card group relative flex flex-col gap-2.5 p-4 rounded-2xl border"
                                          style={{background: "var(--surface-1)", borderColor: "var(--border)"}}
                                          onMouseEnter={e => {
                                              const el = e.currentTarget as HTMLElement;
                                              el.style.borderColor = `${color}60`;
                                              el.style.background = `${color}0a`;
                                              el.style.boxShadow = `0 8px 32px ${color}20`;
                                          }}
                                          onMouseLeave={e => {
                                              const el = e.currentTarget as HTMLElement;
                                              el.style.borderColor = "var(--border)";
                                              el.style.background = "var(--surface-1)";
                                              el.style.boxShadow = "none";
                                          }}>
                                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                             style={{background: `radial-gradient(circle at 30% 20%, ${color}12, transparent 70%)`}}/>
                                        <span className="text-2xl">{calc.icon}</span>
                                        <div className="flex-1">
                                            <div className="font-semibold text-sm leading-tight" style={{color: "var(--text-primary)", fontFamily: "var(--font-outfit)"}}>
                                                {calc.name}
                                            </div>
                                            <div className="text-xs mt-1 leading-snug line-clamp-2" style={{color: "var(--text-muted)"}}>
                                                {calc.description}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="calc-arrow text-xs font-medium flex items-center gap-1" style={{color}}>Open →</span>
                                            <span className="text-xs px-1.5 py-0.5 rounded-md opacity-60"
                                                  style={{background: `${color}15`, color}}>
                                                {CATEGORY_LABELS[calc.category].slice(0, 3).toUpperCase()}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {/* GROUPED BY CATEGORY — default view */}
                    {!search.trim() && activeCategory === "all" && groupedCalcs && (
                        <div className="space-y-14">
                            {groupedCalcs.map(({cat, calcs}) => {
                                const color = CATEGORY_COLORS[cat];
                                return (
                                    <div key={cat}>
                                        {/* Category header */}
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                                                     style={{background: `${color}20`, border: `1px solid ${color}40`}}>
                                                    {calcs[0]?.icon}
                                                </div>
                                                <h3 className="font-bold text-xl" style={{fontFamily: "var(--font-outfit)", color: "var(--text-primary)"}}>
                                                    {CATEGORY_LABELS[cat]}
                                                </h3>
                                                <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                                                      style={{background: `${color}15`, color, border: `1px solid ${color}30`}}>
                                                    {calcs.length}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setActiveCategory(cat)}
                                                    className="hidden sm:flex text-xs items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                                                    style={{color, background: `${color}12`, border: `1px solid ${color}25`}}>
                                                    Filter category
                                                </button>
                                                <Link href={`/calculators/${cat}`}
                                                      className="hidden sm:flex text-xs items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                                                      style={{color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)"}}>
                                                    Full page →
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="mb-5 h-px" style={{background: `linear-gradient(to right, ${color}40, transparent)`}}/>

                                        {/* Calculator grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                            {calcs.map(calc => (
                                                <Link key={calc.id} href={`/calculator/${calc.id}`}
                                                      className="calc-card group relative flex flex-col gap-2.5 p-4 rounded-2xl border"
                                                      style={{background: "var(--surface-1)", borderColor: "var(--border)"}}
                                                      onMouseEnter={e => {
                                                          const el = e.currentTarget as HTMLElement;
                                                          el.style.borderColor = `${color}60`;
                                                          el.style.background = `${color}0a`;
                                                          el.style.boxShadow = `0 8px 32px ${color}20`;
                                                      }}
                                                      onMouseLeave={e => {
                                                          const el = e.currentTarget as HTMLElement;
                                                          el.style.borderColor = "var(--border)";
                                                          el.style.background = "var(--surface-1)";
                                                          el.style.boxShadow = "none";
                                                      }}>
                                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                                         style={{background: `radial-gradient(circle at 30% 20%, ${color}12, transparent 70%)`}}/>
                                                    <span className="text-2xl relative">{calc.icon}</span>
                                                    <div className="relative flex-1">
                                                        <div className="font-semibold text-sm leading-tight" style={{color: "var(--text-primary)", fontFamily: "var(--font-outfit)"}}>
                                                            {calc.name}
                                                        </div>
                                                        <div className="text-xs mt-1 leading-snug line-clamp-2" style={{color: "var(--text-muted)"}}>
                                                            {calc.description}
                                                        </div>
                                                    </div>
                                                    <div className="relative flex items-center justify-between mt-1">
                                                        <span className="calc-arrow text-xs font-medium flex items-center gap-1" style={{color}}>Open →</span>
                                                        <span className="text-xs px-1.5 py-0.5 rounded-md opacity-60"
                                                              style={{background: `${color}15`, color}}>
                                                            {CATEGORY_LABELS[calc.category].slice(0, 3).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* FEATURES — slimmed down, below the fold */}
            <section id="features" className="py-24 px-6" style={{background: "var(--surface-1)"}}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                             style={{background: "var(--accent-soft)", color: "#a89bfb", border: "1px solid rgba(124,106,247,.3)"}}>
                            Why Calcuverse
                        </div>
                        <h2 className="text-4xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>Built for real people</h2>
                        <p className="text-lg max-w-xl mx-auto" style={{color: "var(--text-secondary)"}}>
                            No bloat, no ads, no sign-up. Just fast, accurate calculators with a UI you'll actually enjoy.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            {icon: "⚡", title: "Instant results", desc: "Every calculation updates live as you type. No submit buttons, no loading.", color: "#f59e0b"},
                            {icon: "📱", title: "Works everywhere", desc: "Fully responsive — as comfortable on mobile as on a wide desktop monitor.", color: "#3b82f6"},
                            {icon: "🔍", title: "Searchable", desc: "Fuzzy search across all calculators by name, category, or keyword.", color: "var(--accent)"},
                            {icon: "🎨", title: "Beautifully designed", desc: "Dark, modern UI with a consistent design language across every calculator.", color: "#ec4899"},
                            {icon: "🏗️", title: "Easily extensible", desc: "Add a new calculator in minutes — one file and one registry entry.", color: "#10b981"},
                            {icon: "🔒", title: "Privacy first", desc: "Everything runs in your browser. No data sent anywhere, ever.", color: "#8b5cf6"},
                        ].map(f => (
                            <div key={f.title} className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                                 style={{background: "var(--surface-2)", border: "1px solid var(--border)"}}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
                                     style={{background: `${f.color}18`, border: `1px solid ${f.color}30`}}>
                                    {f.icon}
                                </div>
                                <h3 className="font-semibold mb-2" style={{fontFamily: "var(--font-outfit)"}}>{f.title}</h3>
                                <p className="text-sm leading-relaxed" style={{color: "var(--text-secondary)"}}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 rounded-full blur-3xl" style={{background: "var(--accent)", opacity: 0.15}}/>
                        <div className="relative w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-3xl"
                             style={{background: "var(--accent)", boxShadow: "0 0 40px var(--accent-glow)"}}>∑</div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>Ready to calculate?</h2>
                    <p className="text-lg mb-10" style={{color: "var(--text-secondary)"}}>
                        No account needed. No install required. Just open and start calculating.
                    </p>
                    <Link href="/calculators/all"
                          className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                          style={{background: "var(--accent)", boxShadow: "0 8px 40px var(--accent-glow)"}}>
                        Open Calcuverse
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 px-6 border-t" style={{borderColor: "var(--border)"}}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
                             style={{background: "var(--accent)"}}>∑</div>
                        <span className="font-semibold" style={{fontFamily: "var(--font-outfit)"}}>Calcuverse</span>
                    </div>
                    <p className="text-sm" style={{color: "var(--text-muted)"}}>
                        {CALCULATORS.length} calculators · Built with Next.js & Tailwind CSS
                    </p>
                    <Link href="/calculators/all" className="text-sm hover:text-white transition-colors" style={{color: "var(--text-muted)"}}>
                        Open App →
                    </Link>
                </div>
            </footer>
        </div>
    );
}
