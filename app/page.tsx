"use client";
import {useState, useEffect, useRef} from "react";
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
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const categories = Object.keys(CATEGORY_LABELS) as CalcCategory[];

    return (
        <div style={{background: "var(--surface-0)", color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)"}}>
            <style>{`
        @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-glow { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.7;transform:scale(1.05)} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .hero-fade-1{animation:heroFadeUp .7s ease-out .1s both}
        .hero-fade-2{animation:heroFadeUp .7s ease-out .25s both}
        .hero-fade-3{animation:heroFadeUp .7s ease-out .4s both}
        .hero-fade-4{animation:heroFadeUp .7s ease-out .55s both}
        .ticker-track{animation:ticker 30s linear infinite}
        .ticker-track:hover{animation-play-state:paused}
      `}</style>

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                 style={{
                     background: scrolled ? "var(--nav-scrolled-bg)" : "transparent",
                     backdropFilter: scrolled ? "blur(12px)" : "none",
                     borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                 }}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="/logo.svg" className="logo-dark" width={200} height={50} alt="Calcuverse"/>
                        <img src="/logo-light.svg" className="logo-light" width={200} height={50} alt="Calcuverse"/>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm" style={{color: "var(--text-secondary)"}}>
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#categories" className="hover:text-white transition-colors">Categories</a>
                        <a href="#calculators" className="hover:text-white transition-colors">Calculators</a>
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

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                         style={{
                             background: "radial-gradient(circle,rgba(124,106,247,.12) 0%,transparent 70%)",
                             animation: "pulse-glow 6s ease-in-out infinite"
                         }}/>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
                         style={{
                             background: "radial-gradient(circle,rgba(16,185,129,.08) 0%,transparent 70%)",
                             animation: "pulse-glow 8s ease-in-out 2s infinite"
                         }}/>
                    <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full"
                         style={{
                             background: "radial-gradient(circle,rgba(236,72,153,.07) 0%,transparent 70%)",
                             animation: "pulse-glow 7s ease-in-out 4s infinite"
                         }}/>
                    <div className="absolute inset-0 opacity-[0.03]"
                         style={{
                             backgroundImage: "linear-gradient(var(--text-primary) 1px,transparent 1px),linear-gradient(90deg,var(--text-primary) 1px,transparent 1px)",
                             backgroundSize: "60px 60px"
                         }}/>
                </div>

                <div className="absolute hidden lg:block" style={{top: "22%", left: "6%"}}><FloatingCard icon="📈"
                                                                                                         name="Compound Interest"
                                                                                                         delay={0}/>
                </div>
                <div className="absolute hidden lg:block" style={{top: "38%", left: "3%"}}><FloatingCard icon="🧮"
                                                                                                         name="Scientific"
                                                                                                         delay={1.2}/>
                </div>
                <div className="absolute hidden lg:block" style={{bottom: "28%", left: "7%"}}><FloatingCard icon="❤️"
                                                                                                            name="Heart Rate"
                                                                                                            delay={0.6}/>
                </div>
                <div className="absolute hidden lg:block" style={{top: "20%", right: "5%"}}><FloatingCard icon="🌡️"
                                                                                                          name="Temperature"
                                                                                                          delay={0.9}/>
                </div>
                <div className="absolute hidden lg:block" style={{top: "40%", right: "3%"}}><FloatingCard icon="💹"
                                                                                                          name="Loan / EMI"
                                                                                                          delay={1.8}/>
                </div>
                <div className="absolute hidden lg:block" style={{bottom: "26%", right: "6%"}}><FloatingCard icon="📅"
                                                                                                             name="Date Diff"
                                                                                                             delay={0.4}/>
                </div>

                <div className="relative text-center max-w-3xl mx-auto">
                    <div
                        className="hero-fade-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-8"
                        style={{
                            background: "var(--accent-soft)",
                            border: "1px solid rgba(124,106,247,.3)",
                            color: "#a89bfb"
                        }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
                              style={{animation: "pulse-glow 2s infinite"}}/>
                        {CALCULATORS.length}+ calculators · 100% free · no sign-up
                    </div>
                    <h1 className="hero-fade-2 font-bold leading-[1.08] tracking-tight mb-6"
                        style={{fontFamily: "var(--font-outfit)", fontSize: "clamp(2.8rem,7vw,5rem)"}}>
                        Every calculator<br/>
                        <span style={{
                            background: "linear-gradient(135deg,#7c6af7,#a78bfa,#ec4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
              you'll ever need
            </span>
                    </h1>
                    <p className="hero-fade-3 text-lg leading-relaxed mb-10 max-w-xl mx-auto"
                       style={{color: "var(--text-secondary)"}}>
                        From everyday tip splitting to compound interest, BMI to binary conversion —
                        all beautifully designed and instantly ready to use.
                    </p>
                    <div className="hero-fade-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <Link href="/calculators/all"
                              className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                              style={{
                                  background: "var(--accent)",
                                  boxShadow: "0 4px 32px var(--accent-glow)",
                                  fontSize: "1rem"
                              }}>
                            Launch Calcuverse
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                 strokeWidth={2.5}>
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                        <a href="#categories"
                           className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-all duration-200 hover:bg-[var(--surface-2)]"
                           style={{
                               border: "1px solid var(--border)",
                               color: "var(--text-secondary)",
                               fontSize: "1rem"
                           }}>
                            Explore categories
                        </a>
                    </div>
                    <div className="hero-fade-4 flex flex-wrap justify-center gap-4 mt-12">
                        {[
                            {n: CALCULATORS.length, suffix: "+", label: "Calculators"},
                            {n: 7, suffix: "", label: "Categories"},
                            {n: 0, suffix: "KB backend", label: "No backend"},
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                                 style={{background: "var(--surface-2)", border: "1px solid var(--border)"}}>
                <span className="font-bold font-mono text-lg" style={{color: "var(--accent)"}}>
                  {s.n > 0 ? <Counter target={s.n} suffix={s.suffix}/> : s.suffix}
                </span>
                                <span className="text-sm" style={{color: "var(--text-muted)"}}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-xs tracking-widest uppercase"
                          style={{color: "var(--text-muted)"}}>scroll</span>
                    <div className="w-px h-8"
                         style={{background: "linear-gradient(to bottom,var(--text-muted),transparent)"}}/>
                </div>
            </section>

            {/* TICKER */}
            <div className="relative overflow-hidden py-4 border-y"
                 style={{borderColor: "var(--border)", background: "var(--surface-1)"}}>
                <div className="ticker-track flex gap-8 w-max">
                    {[...CALCULATORS, ...CALCULATORS].map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap"
                             style={{color: "var(--text-muted)"}}>
                            <span>{c.icon}</span><span>{c.name}</span><span className="opacity-30 mx-1">·</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* FEATURES */}
            <section id="features" className="py-28 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div
                            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                            style={{
                                background: "var(--accent-soft)",
                                color: "#a89bfb",
                                border: "1px solid rgba(124,106,247,.3)"
                            }}>
                            Why Calcuverse
                        </div>
                        <h2 className="text-4xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>Built for
                            real people</h2>
                        <p className="text-lg max-w-xl mx-auto" style={{color: "var(--text-secondary)"}}>
                            No bloat, no ads, no sign-up. Just fast, accurate calculators with a UI you'll actually
                            enjoy.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            {
                                icon: "⚡",
                                title: "Instant results",
                                desc: "Every calculation updates live as you type. No submit buttons, no loading.",
                                color: "#f59e0b"
                            },
                            {
                                icon: "📱",
                                title: "Works everywhere",
                                desc: "Fully responsive — as comfortable on mobile as on a wide desktop monitor.",
                                color: "#3b82f6"
                            },
                            {
                                icon: "🔍",
                                title: "Searchable",
                                desc: "Fuzzy search across all calculators by name, category, or keyword. Find anything fast.",
                                color: "var(--accent)"
                            },
                            {
                                icon: "🎨",
                                title: "Beautifully designed",
                                desc: "Dark, modern UI with a consistent design language across every single calculator.",
                                color: "#ec4899"
                            },
                            {
                                icon: "🏗️",
                                title: "Easily extensible",
                                desc: "Add a new calculator in minutes — one file and one registry entry is all it takes.",
                                color: "#10b981"
                            },
                            {
                                icon: "🔒",
                                title: "Privacy first",
                                desc: "Everything runs in your browser. No data sent anywhere, ever. Zero backend.",
                                color: "#8b5cf6"
                            },
                        ].map(f => (
                            <div key={f.title}
                                 className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                                 style={{background: "var(--surface-1)", border: "1px solid var(--border)"}}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
                                     style={{background: `${f.color}18`, border: `1px solid ${f.color}30`}}>
                                    {f.icon}
                                </div>
                                <h3 className="font-semibold mb-2"
                                    style={{fontFamily: "var(--font-outfit)"}}>{f.title}</h3>
                                <p className="text-sm leading-relaxed"
                                   style={{color: "var(--text-secondary)"}}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES + CALCULATOR DIRECTORY */}
            <section id="categories" className="py-28 px-6" style={{background: "var(--surface-1)"}}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div
                            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                            style={{
                                background: "rgba(16,185,129,.12)",
                                color: "#34d399",
                                border: "1px solid rgba(16,185,129,.3)"
                            }}>
                            All Calculators
                        </div>
                        <h2 className="text-4xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>
                            <Counter target={CALCULATORS.length}/>+ calculators across{" "}
                            <span style={{color: "var(--accent)"}}>{categories.length} categories</span>
                        </h2>
                        <p className="text-lg max-w-xl mx-auto" style={{color: "var(--text-secondary)"}}>
                            Click any calculator to open it instantly — no searching required.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {categories.map(cat => {
                            const color = CATEGORY_COLORS[cat];
                            const calcs = CALCULATORS.filter(c => c.category === cat);
                            return (
                                <div key={cat}>
                                    {/* Category header */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                                                 style={{background: `${color}20`, border: `1px solid ${color}40`}}>
                                                {calcs[0]?.icon}
                                            </div>
                                            <h3 className="font-bold text-xl" style={{
                                                fontFamily: "var(--font-outfit)",
                                                color: "var(--text-primary)"
                                            }}>
                                                {CATEGORY_LABELS[cat]}
                                            </h3>
                                            <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                                                  style={{
                                                      background: `${color}15`,
                                                      color,
                                                      border: `1px solid ${color}30`
                                                  }}>
                        {calcs.length}
                      </span>
                                        </div>
                                        <Link href={`/calculators/${cat}`}
                                              className="hidden sm:flex text-xs items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                                              style={{color, background: `${color}12`, border: `1px solid ${color}25`}}>
                                            Browse all
                                            <svg width="10" height="10" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor" strokeWidth={2.5}>
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </Link>
                                    </div>

                                    {/* Divider */}
                                    <div className="mb-5 h-px"
                                         style={{background: `linear-gradient(to right, ${color}40, transparent)`}}/>

                                    {/* Calculator grid */}
                                    <div
                                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                        {calcs.map(calc => (
                                            <Link key={calc.id} href={`/calculator/${calc.id}`}
                                                  className="group relative flex flex-col gap-2.5 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                                                  style={{background: "var(--surface-2)", borderColor: "var(--border)"}}
                                                  onMouseEnter={e => {
                                                      const el = e.currentTarget as HTMLElement;
                                                      el.style.borderColor = `${color}60`;
                                                      el.style.background = `${color}0a`;
                                                  }}
                                                  onMouseLeave={e => {
                                                      const el = e.currentTarget as HTMLElement;
                                                      el.style.borderColor = "var(--border)";
                                                      el.style.background = "var(--surface-2)";
                                                  }}>
                                                {/* Hover glow */}
                                                <div
                                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                                    style={{background: `radial-gradient(circle at 30% 20%, ${color}12, transparent 70%)`}}/>
                                                <span className="text-2xl relative">{calc.icon}</span>
                                                <div className="relative flex-1">
                                                    <div className="font-semibold text-sm leading-tight"
                                                         style={{
                                                             color: "var(--text-primary)",
                                                             fontFamily: "var(--font-outfit)"
                                                         }}>
                                                        {calc.name}
                                                    </div>
                                                    <div className="text-xs mt-1 leading-snug line-clamp-2"
                                                         style={{color: "var(--text-muted)"}}>
                                                        {calc.description}
                                                    </div>
                                                </div>
                                                <div className="relative flex items-center justify-between mt-1">
                          <span
                              className="text-xs opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-0.5 flex items-center gap-1 font-medium"
                              style={{color}}>
                            Open →
                          </span>
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
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-28 px-6" style={{background: "var(--surface-1)"}}>
                <div className="max-w-3xl mx-auto text-center">
                    <div
                        className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                        style={{
                            background: "rgba(124,106,247,.12)",
                            color: "#a89bfb",
                            border: "1px solid rgba(124,106,247,.3)"
                        }}>
                        How it works
                    </div>
                    <h2 className="text-4xl font-bold mb-16" style={{fontFamily: "var(--font-outfit)"}}>Three steps,
                        zero friction</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                icon: "🔍",
                                title: "Find your calculator",
                                desc: "Search by name or browse 7 categories from the sidebar."
                            },
                            {
                                step: "02",
                                icon: "⌨️",
                                title: "Enter your values",
                                desc: "Type your numbers — results update instantly as you type."
                            },
                            {
                                step: "03",
                                icon: "✅",
                                title: "Get your answer",
                                desc: "Clear, formatted results with helpful context every time."
                            },
                        ].map(s => (
                            <div key={s.step} className="relative">
                                <div className="text-5xl font-bold mb-4 select-none"
                                     style={{
                                         fontFamily: "var(--font-outfit)",
                                         color: "var(--surface-3)",
                                         lineHeight: 1
                                     }}>
                                    {s.step}
                                </div>
                                <div className="text-2xl mb-3">{s.icon}</div>
                                <h3 className="font-semibold mb-2"
                                    style={{fontFamily: "var(--font-outfit)"}}>{s.title}</h3>
                                <p className="text-sm leading-relaxed"
                                   style={{color: "var(--text-secondary)"}}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-28 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 rounded-full blur-3xl"
                             style={{background: "var(--accent)", opacity: 0.15}}/>
                        <div
                            className="relative w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-3xl"
                            style={{background: "var(--accent)", boxShadow: "0 0 40px var(--accent-glow)"}}>∑
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>Ready to
                        calculate?</h2>
                    <p className="text-lg mb-10" style={{color: "var(--text-secondary)"}}>
                        No account needed. No install required. Just open and start calculating.
                    </p>
                    <Link href="/calculators/all"
                          className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                          style={{background: "var(--accent)", boxShadow: "0 8px 40px var(--accent-glow)"}}>
                        Open Calcuverse
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             strokeWidth={2.5}>
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 px-6 border-t" style={{borderColor: "var(--border)"}}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
                            style={{background: "var(--accent)"}}>∑
                        </div>
                        <span className="font-semibold" style={{fontFamily: "var(--font-outfit)"}}>Calcuverse</span>
                    </div>
                    <p className="text-sm" style={{color: "var(--text-muted)"}}>
                        {CALCULATORS.length} calculators · Built with Next.js & Tailwind CSS
                    </p>
                    <Link href="/calculators/all" className="text-sm hover:text-white transition-colors"
                          style={{color: "var(--text-muted)"}}>
                        Open App →
                    </Link>
                </div>
            </footer>
        </div>
    );
}
