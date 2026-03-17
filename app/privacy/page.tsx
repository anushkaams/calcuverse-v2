"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {useState, useEffect} from "react";

export default function PrivacyPage() {
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
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
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
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                         style={{background: "radial-gradient(circle,rgba(124,106,247,.12) 0%,transparent 70%)"}}/>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
                         style={{background: "radial-gradient(circle,rgba(16,185,129,.08) 0%,transparent 70%)"}}/>
                </div>

                <div className="relative text-center max-w-3xl mx-auto w-full">
                    <h1 className="fade-in font-bold leading-tight mb-6"
                        style={{fontFamily: "var(--font-outfit)", fontSize: "clamp(2rem,5vw,3.5rem)"}}>
                        Privacy Policy
                    </h1>

                    <p className="fade-in text-lg leading-relaxed max-w-2xl mx-auto"
                       style={{color: "var(--text-secondary)"}}>
                        Your privacy matters to us. This policy explains how we collect and use your data with transparency and respect.
                    </p>
                    <p className="text-sm mt-4" style={{color: "var(--text-muted)"}}>
                        Last updated: March 17, 2025
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Quick Overview */}
                    <div className="fade-in p-8 rounded-2xl" style={{background: "var(--surface-1)", border: "1px solid var(--border)", borderLeft: "4px solid var(--accent)"}}>
                        <h2 className="text-2xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>🔒 Quick Overview</h2>
                        <ul className="space-y-3">
                            {[
                                "We collect analytics data via Google Analytics",
                                "We display ads through Google AdSense",
                                "All calculations still happen locally in your browser",
                                "Your calculation data never leaves your device",
                                "We comply with GDPR and CCPA requirements",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span style={{color: "var(--accent)"}}>✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 1. Information We Collect */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>1. Information We Collect</h2>
                        <div className="space-y-4" style={{color: "var(--text-secondary)"}}>
                            <p>
                                Calcosmos is designed with privacy as a core principle. We collect minimal information:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li><strong>No personal data:</strong> We don't ask for or store your name, email, phone, or any identifying information.</li>
                                <li><strong>No calculation data:</strong> Your inputs and calculations never leave your browser. We don't see or store any values you enter.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. How Your Data Works */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>2. How Your Data Works</h2>
                        <div className="space-y-4" style={{color: "var(--text-secondary)"}}>
                            <p>
                                All Calcosmos calculators run entirely in your browser. Here's what that means:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    {title: "Browser-Based", desc: "Code runs locally on your device, not on our servers."},
                                    {title: "No Servers", desc: "We don't have access to your inputs or calculations."},
                                    {title: "No Network Calls", desc: "Calculations don't require internet (after initial load)."},
                                    {title: "Your Control", desc: "You have complete control over your data."},
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-xl" style={{background: "var(--surface-1)", border: "1px solid var(--border)"}}>
                                        <h4 className="font-bold mb-2">{item.title}</h4>
                                        <p className="text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Cookies and Tracking */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>3. Cookies and Tracking</h2>
                        <div className="space-y-4" style={{color: "var(--text-secondary)"}}>
                            <p>
                                Calcosmos uses cookies and third-party services to improve our service and support our business:
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">Google Analytics</h4>
                                    <p>
                                        We use Google Analytics to track user behavior, page views, session duration, and other metrics. This helps us understand how users interact with Calcosmos and improve the user experience. Google Analytics uses cookies to collect this information.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Google AdSense</h4>
                                    <p>
                                        We display personalized ads through Google AdSense to monetize our service. AdSense uses cookies and other tracking technologies to deliver relevant ads based on your interests and browsing history.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Other Tracking</h4>
                                    <p>
                                        We may use other analytics and advertising partners to help us understand usage patterns and serve you better ads.
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 p-4 rounded-lg" style={{background: "var(--surface-1)", borderLeft: "3px solid var(--accent)"}}>
                                <strong>Important:</strong> While we use these services, your calculation data and input information remain private. We only collect general analytics data about page views and user behavior, not your actual calculations.
                            </p>
                        </div>
                    </div>

                    {/* 4. Third-Party Services */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>4. Third-Party Services</h2>
                        <div className="space-y-4" style={{color: "var(--text-secondary)"}}>
                            <p>
                                Calcosmos uses the following third-party services:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li><strong>Google Analytics:</strong> Tracks user behavior and site analytics. See Google's privacy policy for more details on how they handle your data.</li>
                                <li><strong>Google AdSense:</strong> Serves personalized ads on our platform. Google may collect information about your browsing habits to serve relevant ads.</li>
                            </ul>
                            <p className="mt-4">
                                These services may collect personal information such as:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>Your IP address</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Pages visited and time spent on them</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>
                            <p className="mt-4">
                                For more information about how Google collects and uses your data, please visit{" "}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{color: "var(--accent)", textDecoration: "underline"}}>
                                    Google's Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                    </div>

                    {/* 5. Data Retention */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>5. Data Retention</h2>
                        <p style={{color: "var(--text-secondary)"}}>
                            Since we don't collect data, we have nothing to retain. Any data you enter into a calculator stays on your device and is cleared when you close the browser (unless your browser's local storage is enabled, but that's your choice).
                        </p>
                    </div>

                    {/* 6. Your Rights */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>6. Your Rights</h2>
                        <div className="space-y-3" style={{color: "var(--text-secondary)"}}>
                            <p className="font-semibold">Under GDPR, CCPA, and other privacy laws:</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li><strong>Right to access:</strong> Since we don't store your data, there's nothing to access.</li>
                                <li><strong>Right to deletion:</strong> No data to delete.</li>
                                <li><strong>Right to portability:</strong> Your data is yours—it never leaves your device.</li>
                                <li><strong>Right to opt-out:</strong> We don't track, so there's nothing to opt out of.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 7. Security */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>7. Security</h2>
                        <p style={{color: "var(--text-secondary)"}}>
                            Since Calcosmos doesn't collect or store personal data, there's very little to secure. We use HTTPS to encrypt data in transit, and all calculations happen locally on your device. For maximum security, simply don't enter sensitive personal information into any online tool.
                        </p>
                    </div>

                    {/* 8. Changes to This Policy */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>8. Changes to This Policy</h2>
                        <p style={{color: "var(--text-secondary)"}}>
                            We may update this privacy policy from time to time to reflect changes in our practices. We'll notify you of significant changes by updating the "Last updated" date at the top of this page. Your continued use of Calcosmos means you accept any changes.
                        </p>
                    </div>

                    {/* 9. Contact Us */}
                    <div className="p-8 rounded-2xl" style={{background: "var(--surface-1)", border: "1px solid var(--border)"}}>
                        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "var(--font-outfit)"}}>9. Questions?</h2>
                        <p style={{color: "var(--text-secondary)"}}>
                            If you have any questions about this privacy policy or how we handle your data, please reach out to us at{" "}
                            <a href="mailto:info@calcosmos.com" style={{color: "var(--accent)", textDecoration: "underline"}}>
                                info@calcosmos.com
                            </a>
                            {" "}or use our{" "}
                            <Link href="/contact" style={{color: "var(--accent)", textDecoration: "underline"}}>
                                contact form
                            </Link>
                            .
                        </p>
                    </div>

                    {/* Trust Badge */}
                    <div className="p-8 rounded-2xl text-center" style={{background: "var(--accent)15", border: `2px solid var(--accent)`}}>
                        <div className="text-4xl mb-4">🛡️</div>
                        <h3 className="text-2xl font-bold mb-3" style={{fontFamily: "var(--font-outfit)"}}>Your Data is Transparent</h3>
                        <p style={{color: "var(--text-secondary)"}}>
                            We use Google Analytics and AdSense to improve our service and support our business. While these services collect analytics data and browsing information, your calculation data remains private and local to your device. We're committed to transparency about what data we collect and how it's used.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6" style={{fontFamily: "var(--font-outfit)"}}>Ready to calculate with confidence?</h2>
                    <Link href="/calculators/all"
                          className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                          style={{background: "var(--accent)", boxShadow: "0 8px 40px var(--accent-glow)"}}>
                        Open Calcosmos
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
                                <img src="/logo-icon.svg" width={24} height={24} alt="Calcosmos" className="flex-shrink-0"/>
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
