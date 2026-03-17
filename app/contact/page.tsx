"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {useState, useEffect} from "react";

export default function ContactPage() {
    const [scrolled, setScrolled] = useState(false);
    const [formData, setFormData] = useState({name: "", email: "", subject: "", message: ""});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({name: "", email: "", subject: "", message: ""});
    };

    return (
        <div style={{background: "var(--surface-0)", color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)"}}>
            <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-in{animation:fadeInUp .6s ease-out}
        .delay-1{animation-delay:.1s}
        .delay-2{animation-delay:.2s}
        .delay-3{animation-delay:.3s}
        .input-focus { transition: all .2s; }
        .input-focus:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 20px var(--accent-glow); }
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
                    <h1 className="fade-in delay-1 font-bold leading-tight mb-6"
                        style={{fontFamily: "var(--font-outfit)", fontSize: "clamp(2.4rem,6vw,4rem)"}}>
                        Get in Touch
                    </h1>

                    <p className="fade-in delay-2 text-lg leading-relaxed max-w-2xl mx-auto"
                       style={{color: "var(--text-secondary)"}}>
                        Have a question, suggestion, or just want to say hi? We'd love to hear from you. Our team reads every message.
                    </p>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1">
                            <h2 className="text-2xl font-bold mb-8" style={{fontFamily: "var(--font-outfit)"}}>Contact Info</h2>

                            <div className="space-y-4">
                                {[
                                    {icon: "📧", title: "Email", value: "info@calcosmos.com", link: "mailto:info@calcosmos.com"},
                                    {icon: "🐦", title: "Twitter", value: "@calcosmos", link: "#"},
                                ].map((contact) => (
                                    <a key={contact.title} href={contact.link}
                                       className="group fade-in p-4 rounded-xl transition-all hover:scale-105 flex items-start gap-4"
                                       style={{background: "var(--surface-1)", border: "1px solid var(--border)"}}>
                                        <div className="text-2xl flex-shrink-0 mt-1">{contact.icon}</div>
                                        <div className="flex-grow min-w-0">
                                            <div className="text-xs" style={{color: "var(--text-muted)"}}>
                                                {contact.title}
                                            </div>
                                            <div className="font-semibold text-sm mt-1 break-words" style={{color: "var(--accent)"}}>
                                                {contact.value}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="fade-in delay-1 space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: "var(--text-secondary)"}}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="Your name"
                                        className="input-focus w-full px-4 py-3 rounded-xl bg-transparent border"
                                        style={{borderColor: "var(--border)", color: "var(--text-primary)"}}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: "var(--text-secondary)"}}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="your@email.com"
                                        className="input-focus w-full px-4 py-3 rounded-xl bg-transparent border"
                                        style={{borderColor: "var(--border)", color: "var(--text-primary)"}}
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: "var(--text-secondary)"}}>
                                        Subject
                                    </label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        className="input-focus w-full px-4 py-3 rounded-xl bg-transparent border"
                                        style={{borderColor: "var(--border)", color: "var(--text-primary)"}}
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="feedback">Feature Feedback</option>
                                        <option value="bug">Bug Report</option>
                                        <option value="request">Calculator Request</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: "var(--text-secondary)"}}>
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        placeholder="Tell us what's on your mind..."
                                        rows={6}
                                        className="input-focus w-full px-4 py-3 rounded-xl bg-transparent border resize-none"
                                        style={{borderColor: "var(--border)", color: "var(--text-primary)"}}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                                    style={{background: "var(--accent)", boxShadow: "0 8px 40px var(--accent-glow)"}}>
                                    {submitted ? "Message Sent! 🎉" : "Send Message"}
                                </button>

                                {submitted && (
                                    <div className="p-4 rounded-xl text-center"
                                         style={{background: "var(--accent)20", borderLeft: `3px solid var(--accent)`, color: "var(--accent)"}}>
                                        Thanks for reaching out! We'll get back to you soon.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6" style={{background: "var(--surface-1)"}}>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center" style={{fontFamily: "var(--font-outfit)"}}>Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: "How do I add a new calculator?",
                                a: "We regularly add new calculators based on user feedback and requests. Email us with your suggestion!"
                            },
                            {
                                q: "Is Calcosmos really free?",
                                a: "Yes! Calcosmos is 100% free and ad-free forever. No premium tiers, no catches."
                            },
                            {
                                q: "Do you collect my data?",
                                a: "No. All calculations happen locally in your browser. We don't collect, store, or transmit any of your data."
                            },
                            {
                                q: "Can I use Calcosmos offline?",
                                a: "Once loaded, most calculators work offline. Just open the site once, and you're good to go!"
                            },
                            {
                                q: "How accurate are the calculations?",
                                a: "We use JavaScript's native number precision. For financial calculations, we round to appropriate decimal places."
                            },
                            {
                                q: "Is the code open source?",
                                a: "Yes! Check out our GitHub repository for the source code. Feel free to contribute or fork it."
                            },
                        ].map((faq, i) => (
                            <details key={i} className="group p-6 rounded-2xl cursor-pointer transition-all"
                                     style={{background: "var(--surface-2)", border: "1px solid var(--border)"}}>
                                <summary className="flex items-center justify-between font-semibold"
                                         style={{fontFamily: "var(--font-outfit)"}}>
                                    <span>{faq.q}</span>
                                    <span className="transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <p className="mt-4 text-sm" style={{color: "var(--text-secondary)"}}>
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6" style={{fontFamily: "var(--font-outfit)"}}>Still have questions?</h2>
                    <p className="text-lg mb-10" style={{color: "var(--text-secondary)"}}>
                        Can't find the answer you're looking for? Please send us a message from the form above.
                    </p>
                    <Link href="/calculators/all"
                          className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 hover:-translate-y-1"
                          style={{background: "var(--accent)", boxShadow: "0 8px 40px var(--accent-glow)"}}>
                        Try Our Calculators
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
