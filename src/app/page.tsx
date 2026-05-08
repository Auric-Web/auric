"use client";

import React, { FormEvent, PointerEvent, SVGProps, useRef, useState } from "react";

const LOGO_SRC = "/logo.png";
const BEFORE_LOGO_SRC = "/before-logo.png";

type IconName = "arrow" | "check" | "instagram" | "mail" | "spark" | "link";

type PackageItem = {
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  bullets: string[];
};

const packages: PackageItem[] = [
  {
    eyebrow: "01 / First touch",
    title: "Presence Review",
    description:
      "A practical audit of the business website, Instagram, Google profile, contact flow, and customer trust signals.",
    price: "Starter review",
    bullets: [
      "Website + homepage review",
      "Instagram/profile review",
      "Google Business Profile check",
      "Contact flow review",
      "Improvement report",
    ],
  },
  {
    eyebrow: "02 / Core offer",
    title: "Online Cleanup",
    description:
      "For businesses that already exist but look outdated, unclear, inconsistent, or hard to contact online.",
    price: "Main package",
    bullets: [
      "Profile cleanup",
      "Landing page or website refresh",
      "QR/contact link setup",
      "Review capture flow",
      "Inquiry form setup",
    ],
  },
  {
    eyebrow: "03 / Buildout",
    title: "Full Setup",
    description:
      "For new or messy businesses that need a proper online system built from scratch across key touchpoints.",
    price: "Complete setup",
    bullets: [
      "Website or landing page",
      "Instagram/business profile setup",
      "Google profile setup",
      "Forms + QR system",
      "Basic tracking/reporting setup",
    ],
  },
];

function Icon({ name, size = 18, className = "" }: { name: IconName; size?: number; className?: string }) {
  const common: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M17.2 6.8h.01" />
      </>
    ),
    mail: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3z" />
        <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo({ className = "" }: { className?: string }) {
  return <img src={LOGO_SRC} alt="AURIC Studio" className={`object-contain ${className}`} />;
}

function PackageCard({ item, index }: { item: PackageItem; index: number }) {
  return (
    <article className="group relative overflow-hidden border border-white/10 bg-[#090909] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#C9A55C]/60 hover:bg-[#0f0d08] md:p-8">
      <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-[#C9A55C]/10 blur-3xl transition group-hover:bg-[#C9A55C]/20" />

      <div className="relative flex items-start justify-between gap-6">
        <div className="text-[10px] uppercase tracking-[0.32em] text-[#C9A55C]">{item.eyebrow}</div>
        <div className="text-5xl font-light tracking-[-0.08em] text-white/10">0{index + 1}</div>
      </div>

      <h3 className="relative mt-8 text-3xl font-light tracking-[-0.04em] text-[#F5F0E8]">
        {item.title}
      </h3>

      <p className="relative mt-5 text-sm leading-7 text-[#A7A7A7]">{item.description}</p>

      <div className="relative mt-7 inline-flex border border-[#C9A55C]/30 bg-[#C9A55C]/5 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-[#C9A55C]">
        {item.price}
      </div>

      <ul className="relative mt-7 space-y-3">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-6 text-[#D7D0C5]">
            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#C9A55C]/50 text-[#C9A55C]">
              <Icon name="check" size={10} />
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function BeforePanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#efefef] text-[#12384f]">
      <div className="flex h-16 items-center justify-between bg-[#15577a] px-6 text-xs font-bold uppercase text-white">
        <img src={BEFORE_LOGO_SRC} alt="Before logo" className="h-10 w-10 object-contain" />
        <div className="hidden gap-6 md:flex">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <div className="bg-white px-4 py-2 text-[#15577a]">Click Here</div>
      </div>

      <div className="grid h-[calc(100%-4rem)] place-items-center px-8 text-center">
        <div>
          <div className="mx-auto mb-6 w-fit border-4 border-dashed border-[#15577a]/40 px-5 py-3 text-xs font-black uppercase">
            No clear direction
          </div>
          <h3 className="text-[clamp(2rem,7vw,5.8rem)] font-black leading-none tracking-[-0.05em]">
            WELCOME TO OUR WEBSITE
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold text-[#255f7e]">
            Generic headline. Weak trust. No clean contact path. No reason to inquire.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <div className="border-2 border-[#15577a] px-5 py-3 text-xs font-black uppercase">Learn More</div>
            <div className="bg-[#15577a] px-5 py-3 text-xs font-black uppercase text-white">Contact Us</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AfterPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] text-[#F5F0E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,165,92,0.22),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(201,165,92,0.13),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(0,0,0,0.95))]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative flex h-16 items-center justify-between border-b border-white/10 bg-black/50 px-6 backdrop-blur">
        <Logo className="h-10 w-auto" />
        <div className="hidden gap-7 text-[10px] uppercase tracking-[0.28em] text-white/55 md:flex">
          <span>Services</span>
          <span>Work</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="relative flex h-[calc(100%-4rem)] items-center px-[7%]">
        <div className="max-w-4xl">
          <div className="mb-5 w-fit border border-[#C9A55C]/30 bg-[#C9A55C]/10 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-[#C9A55C]">
            Modernized presence
          </div>
          <h3 className="text-[clamp(2.4rem,7vw,6.8rem)] font-light leading-[0.92] tracking-[-0.07em]">
            Clearer trust. Cleaner contact. Sharper first impression.
          </h3>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/68">
            A focused landing page, stronger profile flow, clear inquiry path, and better presentation across online touchpoints.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="bg-[#C9A55C] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black">
              Request Review
            </div>
            <div className="border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
              View Services
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  function updatePosition(clientX: number) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updatePosition(event.clientX);
  }

  return (
    <div className="overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_0_70px_rgba(0,0,0,0.45)]">
      <div
        ref={wrapRef}
        onPointerDown={pointerDown}
        onPointerMove={(event) => dragging && updatePosition(event.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="relative aspect-[16/11] cursor-ew-resize touch-none select-none overflow-hidden md:aspect-[16/8]"
      >
        <BeforePanel />

        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <AfterPanel />
        </div>

        <div className="pointer-events-none absolute inset-y-0 z-20" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
          <div className="relative h-full w-px bg-white">
            <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#C9A55C] bg-black text-[#C9A55C] shadow-[0_0_35px_rgba(201,165,92,0.35)]">
              ↔
            </div>
          </div>
        </div>

        <div className="absolute left-4 top-4 z-30 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-black backdrop-blur">
          Before
        </div>
        <div className="absolute right-4 top-4 z-30 rounded-full border border-[#C9A55C]/40 bg-black/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A55C] backdrop-blur">
          After
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { ok?: boolean; error?: string } = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send inquiry.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send inquiry.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#F5F0E8] outline-none transition placeholder:text-white/35 focus:border-[#C9A55C]/70";
  const labelClass = "mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/40";

  return (
    <form onSubmit={handleSubmit} className="border border-white/10 bg-[#0B0B0B] p-5 sm:p-7 md:p-9">
      <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required placeholder="Your name" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Business</label>
          <input name="company" placeholder="Business name" className={inputClass} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" type="email" required placeholder="Email address" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Phone / Link</label>
          <input name="phone" placeholder="Phone, website, or Instagram" className={inputClass} />
        </div>
      </div>

      <div className="mt-5">
        <label className={labelClass}>What do you need?</label>
        <select
          name="service"
          className="w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#B9B3AA] outline-none transition focus:border-[#C9A55C]/70"
        >
          <option>Presence Review</option>
          <option>Online Cleanup</option>
          <option>Full Setup</option>
          <option>Monthly Ads / Reporting</option>
        </select>
      </div>

      <div className="mt-5">
        <label className={labelClass}>Message</label>
        <textarea
          name="message"
          required
          placeholder="Tell us what you want reviewed, cleaned up, or built."
          className={`${inputClass} min-h-36 resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-3 border border-[#C9A55C] bg-[#C9A55C] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition duration-500 hover:bg-[#F3D486] hover:shadow-[0_0_40px_rgba(201,165,92,0.22)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {status === "loading" ? "Sending..." : "Request Review"}
        <Icon name="arrow" size={16} />
      </button>

      {status === "success" && (
        <p className="mt-4 text-sm text-[#C9A55C]">Inquiry sent. AURIC will follow up shortly.</p>
      )}

      {status === "error" && <p className="mt-4 text-sm text-red-300">{error}</p>}
    </form>
  );
}

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-[#050505] text-[#F5F0E8]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-12rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[#C9A55C]/10 blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[#C9A55C]/8 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
          <button type="button" onClick={() => scrollToId("#top")} className="group flex items-center">
            <Logo className="h-11 w-auto max-w-[150px] transition duration-500 group-hover:drop-shadow-[0_0_18px_rgba(201,165,92,0.45)]" />
          </button>

          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.26em] text-white/55 md:flex">
            <button onClick={() => scrollToId("#packages")} className="transition hover:text-[#C9A55C]">Packages</button>
            <button onClick={() => scrollToId("#showcase")} className="transition hover:text-[#C9A55C]">Showcase</button>
            <button onClick={() => scrollToId("#contact")} className="transition hover:text-[#C9A55C]">Contact</button>
            <a href="/connect" className="transition hover:text-[#C9A55C]">Connect</a>
          </nav>

          <button
            type="button"
            onClick={() => scrollToId("#contact")}
            className="hidden border border-[#C9A55C]/40 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-[#C9A55C] transition hover:bg-[#C9A55C] hover:text-black md:inline-flex"
          >
            Request Review
          </button>
        </div>
      </header>

      <section className="relative z-10 px-4 pt-28 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[calc(100vh-7rem)] border-x border-white/10 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="hidden border-r border-white/10 bg-white/[0.02] p-8 lg:flex lg:flex-col lg:justify-between">
              <div>
                <Logo className="h-auto w-32" />
                <p className="mt-8 max-w-xs text-sm leading-7 text-white/50">
                  Online presence cleanup, setup, QR contact systems, and review-ready business touchpoints.
                </p>
              </div>

              <div className="space-y-4 text-[11px] uppercase tracking-[0.24em] text-white/38">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C9A55C]" />
                  Website
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C9A55C]" />
                  Instagram
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C9A55C]" />
                  Google Profile
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C9A55C]" />
                  Contact Flow
                </div>
              </div>
            </aside>

            <div className="relative overflow-hidden px-5 py-16 sm:px-8 md:px-12 lg:px-16">
              <div className="absolute right-[-12rem] top-12 h-[28rem] w-[28rem] rounded-full border border-[#C9A55C]/20" />
              <div className="absolute right-[-6rem] top-28 h-[17rem] w-[17rem] rounded-full border border-white/10" />

              <div className="relative max-w-6xl">
                <div className="mb-8 inline-flex items-center gap-3 border border-[#C9A55C]/25 bg-[#C9A55C]/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#C9A55C]">
                  <Icon name="spark" size={14} />
                  For businesses that look better in real life than online
                </div>

                <h1 className="max-w-6xl text-[clamp(3.2rem,9vw,9rem)] font-light leading-[0.9] tracking-[-0.075em]">
                  Make the first impression match the business.
                </h1>

                <div className="mt-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                  <div className="border-l border-[#C9A55C]/50 pl-5 text-[11px] uppercase leading-6 tracking-[0.24em] text-[#C9A55C]">
                    Website / Instagram / Google / QR / Forms / Review Flow
                  </div>

                  <p className="max-w-3xl text-base leading-8 text-[#B9B3AA] md:text-lg">
                    AURIC Studio helps local businesses clean up their online presence, look more legitimate, and make it easier for customers to contact them.
                  </p>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => scrollToId("#contact")}
                    className="group inline-flex items-center justify-center gap-3 border border-[#C9A55C] bg-[#C9A55C] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition duration-500 hover:bg-[#F3D486] hover:shadow-[0_0_35px_rgba(201,165,92,0.25)]"
                  >
                    Request Review
                    <Icon name="arrow" size={16} className="transition group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToId("#showcase")}
                    className="inline-flex items-center justify-center border border-white/15 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#F5F0E8] transition duration-500 hover:border-[#C9A55C]/60 hover:text-[#C9A55C]"
                  >
                    See Example
                  </button>
                </div>
              </div>

              <div className="relative mt-16 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
                {[
                  ["01", "Fix the trust gap", "Cleaner online presentation for businesses that already do good work."],
                  ["02", "Make contact easier", "Forms, QR links, email paths, and simple inquiry flows."],
                  ["03", "Show what matters", "Sharper website/profile structure without overcomplicated marketing fluff."],
                ].map(([num, title, text]) => (
                  <div key={title} className="border border-white/10 bg-black/25 p-5">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-[#C9A55C]">{num}</div>
                    <div className="mt-4 text-xl font-light tracking-[-0.03em]">{title}</div>
                    <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="relative z-10 border-y border-white/10 bg-[#070707] px-4 py-20 sm:px-6 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#C9A55C]">Service packages</div>
              <h2 className="mt-5 text-[clamp(2.4rem,5.6vw,5.8rem)] font-light leading-[0.92] tracking-[-0.06em]">
                Start with the review. Then fix what matters.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-[#A7A7A7]">
              The offer is designed to avoid sounding like a fake agency. You lead with a useful review, then sell the cleanup or setup once the business sees the issues clearly.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((item, index) => (
              <PackageCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="showcase" className="relative z-10 px-4 py-20 sm:px-6 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#C9A55C]">Sample showcase</div>
              <h2 className="mt-5 text-[clamp(2.4rem,5.4vw,5.4rem)] font-light leading-[0.92] tracking-[-0.06em]">
                Show them the difference visually.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-[#A7A7A7]">
              Use this section when you are standing with a business owner. Show how an unclear digital presence can be turned into a cleaner, premium, easier-to-contact setup.
            </p>
          </div>

          <div className="mt-12">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 border-t border-white/10 bg-[#070707] px-4 py-20 sm:px-6 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#C9A55C]">Contact</div>
            <h2 className="mt-5 text-[clamp(2.4rem,5.4vw,5.4rem)] font-light leading-[0.92] tracking-[-0.06em]">
              Request a presence review.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#A7A7A7]">
              Send the business name, website, Instagram, or Google profile. AURIC will review the current setup and recommend what should be cleaned up first.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[#D7D0C5]">
              <a href="mailto:hello@auricstudio.co" className="flex items-center gap-3 transition hover:text-[#C9A55C]">
                <span className="grid h-10 w-10 place-items-center border border-white/10 bg-black/30 text-[#C9A55C]">
                  <Icon name="mail" />
                </span>
                hello@auricstudio.co
              </a>

              <a href="https://instagram.com/auricstudio.co" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-[#C9A55C]">
                <span className="grid h-10 w-10 place-items-center border border-white/10 bg-black/30 text-[#C9A55C]">
                  <Icon name="instagram" />
                </span>
                @auricstudio.co
              </a>

              <a href="/connect" className="flex items-center gap-3 transition hover:text-[#C9A55C]">
                <span className="grid h-10 w-10 place-items-center border border-white/10 bg-black/30 text-[#C9A55C]">
                  <Icon name="link" />
                </span>
                QR connect page
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black px-4 py-10 sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Logo className="h-auto w-28" />
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">
            © AURIC Studio — Online presence setup & cleanup
          </div>
        </div>
      </footer>
    </main>
  );
}
