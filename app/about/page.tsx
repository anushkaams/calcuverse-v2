"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {useState, useEffect} from "react";

export default function AboutPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div style={{background: "var(--surface-0)", color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)"}}>
            <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-in{animation:fadeInUp .6s ease-out}
        .delay-1{animation-delay:.1s}
        .delay-2{animation-delay:.2s}
        .delay-3{animation-delay:.3s}
        .delay-4{animation-delay:.4s}
      `}</style>

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                 style={{
                     background: scrolled ? "var(--nav-scrolled-bg)" : "transparent",
                     backdropFilter: scrolled ? "blur(12px)" : "none",
                     borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                 }}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src="/logo.svg" className="logo-dark" width={200} height={50} alt="Calcosmos"/>
                        <img src="/logo-light.svg" className="logo-light" width={200} height={50} alt="Calcosmos"/>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm" style={{color: "var(--text-secondary)"}}>
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/calculators/all" className="hover:text-white transition-colors">Calculators</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
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
            <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20">
                {/* Background blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                         style={{background: "radial-gradient(circle,rgba(124,106,247,.12) 0%,transparent 70%)"}}/>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
                         style={{background: "radial-gradient(circle,rgba(16,185,129,.08) 0%,transparent 70%)"}}/>
                </div>

                <div className="relative text-center max-w-3xl mx-auto w-full">
                    <h1 className="fade-in delay-1 font-bold leading-tight mb-6"
                        style={{fontFamily: "var(--font-outfit)", fontSize: "clamp(2.4rem,6vw,4rem)"}}>
                        Calculators Made<br/>
                        <span style={{background: "linear-gradient(135deg,#7c6af7,#a78bfa,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
                            Simple & Beautiful
                        </span>
                    </h1>

                    <p className="fade-in delay-2 text-lg leading-relaxed max-w-2xl mx-auto"
                       style={{color: "var(--text-secondary)"}}>
                        We believe that math should be accessible to everyone. Calcosmos was born from a simple idea: create a suite of powerful, accurate calculators that don't sacrifice beauty or usability.
                    </p>
                </div>
            </section>

            {/* MISSION & VALUES */}
            <section className="py-24 px-6" style={{background: "var(--surface-1)"}}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {/* Mission */}
                        <div className="fade-in delay-1">
                            <div className="text-4xl mb-6" style={{fontFamily: "var(--font-outfit)"}}>🎯</div>
                            <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>Our Mission</h2>
                            <p style={{color: "var(--text-secondary)", lineHeight: "1.8"}}>
                                To provide fast, accurate, and beautifully designed calculators that anyone can use instantly—without ads, without complexity, and without compromise. We're building the last calculator app you'll ever need.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="fade-in delay-2">
                            <div className="text-4xl mb-6">✨</div>
                            <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>Our Vision</h2>
                            <p style={{color: "var(--text-secondary)", lineHeight: "1.8"}}>
                                A world where calculation tools are indispensable yet invisible—so perfectly designed that they feel like an extension of your thinking, available instantly wherever you need them.
                            </p>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-10 text-center" style={{fontFamily: "var(--font-outfit)"}}>Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {icon: "⚡", title: "Speed", desc: "Instant calculations, zero loading time. Our tools work at the speed of thought."},
                                {icon: "🎨", title: "Beauty", desc: "Aesthetic excellence is not optional. Every pixel is intentional and carefully crafted."},
                                {icon: "🤝", title: "Accessibility", desc: "Powerful tools should be free and accessible to everyone, regardless of background."},
                                {icon: "🔒", title: "Privacy", desc: "Your data stays yours. All calculations happen locally in your browser."},
                                {icon: "📱", title: "Responsiveness", desc: "Perfect experience on phone, tablet, or desktop. No compromise on any device."},
                                {icon: "🛠️", title: "Reliability", desc: "Mathematically accurate, tested thoroughly, and built to never let you down."},
                            ].map((val, i) => (
                                <div key={val.title} className={`fade-in delay-${Math.min(i + 1, 4)} p-6 rounded-2xl`}
                                     style={{background: "var(--surface-2)", border: "1px solid var(--border)"}}>
                                    <div className="text-4xl mb-4">{val.icon}</div>
                                    <h3 className="font-bold text-lg mb-2" style={{fontFamily: "var(--font-outfit)"}}>
                                        {val.title}
                                    </h3>
                                    <p style={{color: "var(--text-muted)", fontSize: "0.95rem"}}>
                                        {val.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* STORY */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center" style={{fontFamily: "var(--font-outfit)"}}>Our Story</h2>

                    <div className="space-y-8">
                        <div className="fade-in delay-1 p-8 rounded-2xl" style={{background: "var(--surface-1)", border: "1px solid var(--border)"}}>
                            <h3 className="text-xl font-bold mb-3 text-accent" style={{fontFamily: "var(--font-outfit)", color: "var(--accent)"}}>
                                The Problem
                            </h3>
                            <p style={{color: "var(--text-secondary)", lineHeight: "1.8"}}>
                                We realized that every calculator app out there either felt outdated, was filled with ads, or demanded unnecessary permissions. Scientific calculators were clunky. Financial calculators were confusing. Health calculators were inaccurate. There had to be a better way.
                            </p>
                        </div>

                        <div className="fade-in delay-2 p-8 rounded-2xl" style={{background: "var(--surface-1)", border: "1px solid var(--border)"}}>
                            <h3 className="text-xl font-bold mb-3" style={{fontFamily: "var(--font-outfit)", color: "var(--accent)"}}>
                                The Solution
                            </h3>
                            <p style={{color: "var(--text-secondary)", lineHeight: "1.8"}}>
                                We decided to build Calcosmos—a modern calculator suite that combines mathematical precision with beautiful design. Everything runs in your browser. No servers. No tracking. No ads. Just pure calculation power at your fingertips.
                            </p>
                        </div>

                        <div className="fade-in delay-3 p-8 rounded-2xl" style={{background: "var(--surface-1)", border: "1px solid var(--border)"}}>
                            <h3 className="text-xl font-bold mb-3" style={{fontFamily: "var(--font-outfit)", color: "var(--accent)"}}>
                                Today & Tomorrow
                            </h3>
                            <p style={{color: "var(--text-secondary)", lineHeight: "1.8"}}>
                                What started as a personal project has grown into something we're proud to share with the world. Every day, thousands of people use Calcosmos for everything from quick mental math to complex financial planning. We're just getting started, and there's so much more to build.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BY THE NUMBERS */}
            <section className="py-24 px-6" style={{background: "var(--surface-1)"}}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center" style={{fontFamily: "var(--font-outfit)"}}>By The Numbers</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            {label: "100+", desc: "Calculators Built"},
                            {label: "0", desc: "Ads"},
                            {label: "∞", desc: "Free Forever"},
                            {label: "100%", desc: "Browser-Based"},
                        ].map((stat, i) => (
                            <div key={stat.label} className={`fade-in delay-${Math.min(i + 1, 4)} p-8 rounded-2xl text-center`}
                                 style={{background: "var(--surface-2)", border: "1px solid var(--border)"}}>
                                <div className="text-4xl font-bold mb-2" style={{color: "var(--accent)", fontFamily: "var(--font-outfit)"}}>
                                    {stat.label}
                                </div>
                                <p style={{color: "var(--text-muted)"}}>
                                    {stat.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6" style={{fontFamily: "var(--font-outfit)"}}>Ready to dive in?</h2>
                    <p className="text-lg mb-10" style={{color: "var(--text-secondary)"}}>
                        Experience the full suite of calculators and see why thousands of people choose Calcosmos.
                    </p>
                    <Link href="/calculators/all"
                          className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                          style={{background: "var(--accent)", boxShadow: "0 8px 40px var(--accent-glow)"}}>
                        Explore All Calculators
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t" style={{borderColor: "var(--border)"}}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <img src="/logo-icon.svg" width={24} height={24} alt="Calcosmos" className="rounded-md flex-shrink-0"/>
                                <span className="font-semibold" style={{fontFamily: "var(--font-outfit)"}}>Calcosmos</span>
                            </div>
                            <p className="text-sm" style={{color: "var(--text-muted)"}}>
                                The calculator suite you'll actually want to use.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-sm" style={{color: "var(--text-secondary)"}}>Product</h4>
                            <div className="space-y-2">
                                <Link href="/calculators/all" className="block text-sm transition-colors hover:text-white" style={{color: "var(--text-muted)"}}>
                                    All Calculators
                                </Link>
                                <Link href="/about" className="block text-sm transition-colors hover:text-white" style={{color: "var(--text-muted)"}}>
                                    About Us
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-sm" style={{color: "var(--text-secondary)"}}>Company</h4>
                            <div className="space-y-2">
                                <Link href="/contact" className="block text-sm transition-colors hover:text-white" style={{color: "var(--text-muted)"}}>
                                    Contact Us
                                </Link>
                                <Link href="/privacy" className="block text-sm transition-colors hover:text-white" style={{color: "var(--text-muted)"}}>
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-sm" style={{color: "var(--text-secondary)"}}>Connect</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm transition-colors hover:text-white" style={{color: "var(--text-muted)"}}>
                                    Twitter
                                </a>
                                <a href="#" className="block text-sm transition-colors hover:text-white" style={{color: "var(--text-muted)"}}>
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="h-px mb-6" style={{background: "var(--border)"}}/>
                    <div className="text-center text-sm" style={{color: "var(--text-muted)"}}>
                        © 2025 Calcosmos. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
