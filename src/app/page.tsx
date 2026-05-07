"use client";

import React, { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent, SVGProps } from "react";

const LOGO_SRC = "/logo.png";
const BEFORE_LOGO_SRC = "/before-logo.png";

type IconName = "arrow" | "check" | "instagram" | "mail";

type PackageItem = {
  title: string;
  tag: string;
  description: string;
  items: string[];
};

type PackageCardProps = {
  item: PackageItem;
  active: boolean;
  onClick: () => void;
};

type LogoMarkProps = {
  className?: string;
};

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

type SectionLabelProps = {
  children: React.ReactNode;
};

const packages: PackageItem[] = [
  {
    title: "Business Setup",
    tag: "Launch Package",
    description:
      "For new businesses that need a complete online foundation built properly from day one.",
    items: [
      "Website or landing page",
      "Instagram / social profile setup",
      "LinkedIn business page setup",
      "Google / business profile setup",
      "Booking form setup",
      "Contact / client inquiry form",
      "QR code setup",
      "Review-leaving system",
      "Basic inquiry handling flow",
      "Email / ad template starter pack",
      "Basic tracking dashboard",
    ],
  },
  {
    title: "Business Modernization",
    tag: "Upgrade Package",
    description:
      "For existing businesses that look outdated, unclear, or hard to contact online.",
    items: [
      "Website refresh or landing page redesign",
      "Instagram / social profile cleanup",
      "LinkedIn business page cleanup",
      "Google / business profile cleanup",
      "Booking form improvement",
      "Contact / inquiry form improvement",
      "QR review / contact / booking setup",
      "Review-leaving system improvement",
      "Inquiry handling cleanup",
      "Ad and email template refresh",
      "Tracking dashboard setup",
    ],
  },
  {
    title: "Monthly Advertising & Reporting",
    tag: "Growth Package",
    description:
      "For businesses ready to drive traffic, capture inquiries, and see performance clearly.",
    items: [
      "Monthly ad campaign setup and management",
      "Monthly profile refinement",
      "Landing page / lead form optimization",
      "Booking / inquiry form optimization",
      "Ad creative updates",
      "Email template updates",
      "Social media profile refinement",
      "Review system monitoring",
      "Views / reach / clicks / leads tracking",
      "Monthly dashboard or BI report",
      "Performance review and recommendations",
    ],
  },
];

const systemSteps: [string, string, string][] = [
  [
    "01",
    "Set The Presence",
    "Build or clean up the website, social profiles, business profile, forms, QR touchpoints, and review systems.",
  ],
  [
    "02",
    "Capture Inquiries",
    "Create clear booking, quote, and contact flows so visitors know exactly how to reach out.",
  ],
  [
    "03",
    "Run Monthly Ads",
    "Drive traffic to a setup that is ready to convert instead of sending people to a messy online presence.",
  ],
  [
    "04",
    "Track The Data",
    "Report views, reach, clicks, inquiries, leads, and campaign performance so the business can improve month over month.",
  ],
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="AURIC Studio"
      className={`object-contain ${className}`}
    />
  );
}

function Icon({ name, size = 18, className = "" }: IconProps) {
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
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.34em] text-[#C9A55C]">
      {children}
    </div>
  );
}

function PackageCard({ item, active, onClick }: PackageCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative min-w-0 overflow-hidden p-6 text-left transition duration-500 hover:-translate-y-1 sm:p-7 ${
        active
          ? "border border-[#C9A55C]/80 bg-[#12100A] shadow-[0_0_45px_rgba(201,165,92,0.14)]"
          : "border border-white/10 bg-[#0E0E0E] hover:border-[#C9A55C]/55 hover:bg-[#111111]"
      }`}
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#C9A55C]/10 blur-3xl transition duration-500 group-hover:bg-[#C9A55C]/20" />

      <div className="relative flex items-center justify-between gap-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55C] sm:text-[11px]">
          {item.tag}
        </div>

        <div
          className={`h-3 w-3 rounded-full border transition duration-300 ${
            active
              ? "border-[#C9A55C] bg-[#C9A55C] shadow-[0_0_18px_rgba(201,165,92,0.8)]"
              : "border-white/25"
          }`}
        />
      </div>

      <h3 className="relative mt-5 text-2xl font-light tracking-[-0.02em] text-[#F5F0E8]">
        {item.title}
      </h3>

      <p className="relative mt-5 text-sm leading-7 text-[#A7A7A7]">
        {item.description}
      </p>

      <div className="relative mt-7 h-px w-full bg-white/10" />

      <ul className="relative mt-6 space-y-3">
        {item.items.map((service) => (
          <li
            key={service}
            className="flex gap-3 text-sm leading-6 text-[#D1C8BC]"
          >
            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#C9A55C]/45 text-[#C9A55C]">
              <Icon name="check" size={10} />
            </span>
            <span>{service}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

function BeforeUgly() {
  return (
    <div className="absolute inset-0 bg-[#f2f2f2] text-[#143c56]">
      <div className="flex h-16 items-center justify-between bg-[#0d4b70] px-8 text-xs font-bold uppercase tracking-wide text-white">
        <img
          src={BEFORE_LOGO_SRC}
          alt="Before logo"
          className="h-10 w-10 object-contain"
        />

        <div className="hidden gap-7 md:flex">
          <span>Home</span>
          <span>Services</span>
          <span>Contact Us</span>
        </div>

        <div className="rounded bg-white px-4 py-2 text-[#0d4b70]">
          Free Assessment
        </div>
      </div>

      <div className="flex h-full flex-col items-center justify-center px-8 pb-20 text-center">
        <div className="text-[clamp(2rem,7vw,5rem)] font-black tracking-tight">
          YOUR BUSINESS
        </div>

        <div className="mt-6 max-w-3xl text-[clamp(1rem,2.4vw,2rem)] font-bold">
          Generic service headline with unclear positioning
        </div>

        <p className="mt-5 max-w-2xl text-base text-[#2b5a73] md:text-xl">
          A cluttered homepage. Weak CTA. Little trust. Poor contact flow.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <div className="border border-[#0d4b70] px-7 py-3 text-xs font-bold uppercase">
            Learn More
          </div>

          <div className="bg-[#0d4b70] px-7 py-3 text-xs font-bold uppercase text-white">
            Contact
          </div>
        </div>
      </div>
    </div>
  );
}

function AfterPremium() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,165,92,0.20),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.95))]" />

      <div className="relative flex h-16 items-center justify-between border-b border-white/10 bg-black/75 px-8 text-[10px] uppercase tracking-[0.28em] text-white/65">
        <LogoMark className="h-10 w-10" />

        <div className="hidden gap-8 md:flex">
          <span>Home</span>
          <span>Services</span>
          <span>Results</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="relative flex h-full items-center px-[7%] pb-24">
        <div className="max-w-4xl">
          <div className="mb-5 text-[10px] uppercase tracking-[0.36em] text-[#C9A55C]">
            Modernized Presence
          </div>

          <div className="text-[clamp(2.7rem,8vw,6.6rem)] font-light leading-[0.95] tracking-[-0.06em]">
            Built to look sharper. Built to convert better.
          </div>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/70 md:text-xl md:leading-9">
            Clear positioning. Stronger trust. Better inquiry flow. Cleaner
            presentation across every touchpoint.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="border border-[#C9A55C] bg-[#C9A55C] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black">
              Book A Call
            </div>

            <div className="border border-white/15 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white">
              View Services
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState<number>(52);
  const [dragging, setDragging] = useState<boolean>(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = (clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition(
      Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    );
  };

  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updatePosition(event.clientX);
  };

  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging) updatePosition(event.clientX);
  };

  return (
    <div className="overflow-hidden border border-white/10 bg-[#0D0D0D] shadow-[0_0_45px_rgba(0,0,0,0.35)]">
      <div
        ref={wrapRef}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="relative aspect-[16/10] w-full cursor-ew-resize overflow-hidden bg-black touch-none select-none md:aspect-[16/8]"
      >
        <BeforeUgly />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <AfterPremium />
        </div>

        <div
          className="absolute inset-y-0 z-20 pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="relative h-full w-px bg-white/90">
            <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A55C] bg-black text-[#C9A55C] shadow-[0_0_30px_rgba(201,165,92,0.3)]">
              ↔
            </div>
          </div>
        </div>

        <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/85 backdrop-blur">
          Before
        </div>

        <div className="absolute right-4 top-4 z-20 rounded-full border border-[#C9A55C]/35 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#C9A55C] backdrop-blur">
          After
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#090909] px-4 py-4 sm:px-5">
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="w-full accent-[#C9A55C]"
          aria-label="Before and after slider"
        />
      </div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string>("");

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

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 border border-white/10 bg-[#0E0E0E] p-5 sm:p-6 md:p-8"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name"
          className="w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#F5F0E8] outline-none transition placeholder:text-white/35 focus:border-[#C9A55C]/70"
        />

        <input
          name="company"
          placeholder="Business name"
          className="w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#F5F0E8] outline-none transition placeholder:text-white/35 focus:border-[#C9A55C]/70"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#F5F0E8] outline-none transition placeholder:text-white/35 focus:border-[#C9A55C]/70"
        />

        <input
          name="phone"
          placeholder="Phone / Website / Instagram"
          className="w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#F5F0E8] outline-none transition placeholder:text-white/35 focus:border-[#C9A55C]/70"
        />
      </div>

      <select
        name="service"
        className="w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#B9B3AA] outline-none transition focus:border-[#C9A55C]/70"
      >
        <option>Business setup</option>
        <option>Business modernization</option>
        <option>Monthly advertising and reporting</option>
      </select>

      <textarea
        name="message"
        required
        placeholder="Tell us what you want built, modernized, or improved."
        className="min-h-32 w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#F5F0E8] outline-none transition placeholder:text-white/35 focus:border-[#C9A55C]/70"
      />

      <button
        disabled={status === "loading"}
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-3 border border-[#C9A55C] bg-[#C9A55C] px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-black transition duration-500 hover:bg-[#F3D486] hover:shadow-[0_0_35px_rgba(201,165,92,0.22)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Submit Inquiry"}
        <Icon name="arrow" size={16} />
      </button>

      {status === "success" && (
        <p className="text-sm text-[#C9A55C]">
          Inquiry sent. We will follow up shortly.
        </p>
      )}

      {status === "error" && <p className="text-sm text-red-300">{error}</p>}
    </form>
  );
}

export default function AuricStudioLanding() {
  const [selectedPackage, setSelectedPackage] = useState<number>(1);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main
      id="top"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-[#F5F0E8]"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#C9A55C]/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[#8F7138]/10 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
          <button
            type="button"
            onClick={() => scrollToId("#top")}
            className="group flex items-center"
          >
            <LogoMark className="h-12 w-auto max-w-[140px] transition duration-500 group-hover:drop-shadow-[0_0_18px_rgba(201,165,92,0.5)]" />
          </button>

          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.28em] text-white/60 md:flex">
            {[
              ["Offer", "#offer"],
              ["System", "#system"],
              ["Work", "#work"],
              ["Contact", "#contact"],
            ].map(([label, id]) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollToId(id)}
                className="transition duration-300 hover:text-[#C9A55C]"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative z-10 flex min-h-screen items-center px-4 pt-24 sm:px-6 md:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-7 inline-flex max-w-full items-center gap-3 border border-[#C9A55C]/25 bg-[#C9A55C]/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#C9A55C] sm:text-[11px]">
              Online Presence Studio
            </div>

            <h1 className="max-w-none text-[clamp(3rem,7.6vw,7.8rem)] font-light leading-[0.96] tracking-[-0.06em] text-[#F5F0E8] lg:whitespace-nowrap">
              Setup. Modernize. Market.
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#B9B3AA] md:text-lg">
              AURIC Studio helps businesses look sharper online, capture better
              inquiries, run monthly ads, and track performance through cleaner
              websites, profiles, forms, QR systems, and reporting dashboards.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToId("#offer")}
                className="group inline-flex items-center justify-center gap-3 border border-[#C9A55C] bg-[#C9A55C] px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-black transition duration-500 hover:bg-[#F3D486] hover:shadow-[0_0_35px_rgba(201,165,92,0.22)] active:scale-[0.98]"
              >
                View Packages
                <Icon
                  name="arrow"
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => scrollToId("#contact")}
                className="inline-flex items-center justify-center border border-white/15 px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-[#F5F0E8] transition duration-500 hover:border-[#C9A55C]/60 hover:bg-[#C9A55C]/5 hover:text-[#C9A55C] active:scale-[0.98]"
              >
                Contact AURIC
              </button>
            </div>
          </div>

          <div className="relative hidden lg:flex lg:items-center lg:justify-end">
            <div className="absolute inset-0 m-auto h-80 w-80 rounded-full bg-[#C9A55C]/10 blur-3xl" />

            <div className="animate-[float_6s_ease-in-out_infinite]">
              <LogoMark className="relative h-auto w-[min(34vw,380px)] drop-shadow-[0_0_70px_rgba(201,165,92,0.16)]" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="offer"
        className="relative z-10 border-y border-white/10 bg-[#080808]/70 px-4 py-20 sm:px-6 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <SectionLabel>Services / Packages</SectionLabel>

            <h2 className="text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[0.98] tracking-[-0.05em] lg:whitespace-nowrap">
              Three ways to build traction online.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#A7A7A7]">
              Setup for new businesses. Modernization for existing businesses.
              Monthly advertising and reporting for businesses ready to drive
              traffic and track inquiries.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((item, index) => (
              <PackageCard
                key={item.title}
                item={item}
                active={selectedPackage === index}
                onClick={() => setSelectedPackage(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="system"
        className="relative z-10 border-b border-white/10 bg-[#050505] px-4 py-20 sm:px-6 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>The AURIC System</SectionLabel>

              <h2 className="text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[0.98] tracking-[-0.05em]">
                Presence to performance.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-8 text-[#A7A7A7]">
              The process starts with a stronger online presence, then moves
              into lead capture, monthly advertising, and reporting so the
              business can see what is working.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#C9A55C] via-[#C9A55C]/35 to-transparent md:block" />

            <div className="space-y-10 md:space-y-12">
              {systemSteps.map(([num, title, text], index) => (
                <div
                  key={title}
                  className="relative grid gap-5 md:grid-cols-[5rem_0.72fr_1.28fr] md:items-start"
                >
                  <div className="flex items-center gap-4 md:block">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs tracking-[0.18em] shadow-[0_0_25px_rgba(201,165,92,0.12)] ${
                        index === 2
                          ? "border-[#C9A55C] bg-[#C9A55C] text-black"
                          : "border-[#C9A55C]/60 bg-black text-[#C9A55C]"
                      }`}
                    >
                      {num}
                    </div>

                    <div className="h-px flex-1 bg-white/10 md:hidden" />
                  </div>

                  <h3 className="text-2xl font-light tracking-[-0.02em] text-[#F5F0E8]">
                    {title}
                  </h3>

                  <p className="border-t border-white/10 pt-4 text-sm leading-7 text-[#A7A7A7] md:border-t-0 md:pt-0">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="work"
        className="relative z-10 px-4 py-20 sm:px-6 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <SectionLabel>Before / After</SectionLabel>

            <h2 className="text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[0.98] tracking-[-0.05em] lg:whitespace-nowrap">
              From outdated to premium.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#A7A7A7]">
              Drag the slider to compare a weak homepage direction with a
              sharper, modernized version.
            </p>
          </div>

          <div className="mt-12">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 border-t border-white/10 bg-[#080808]/70 px-4 py-20 sm:px-6 md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionLabel>Contact</SectionLabel>

            <h2 className="text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[0.98] tracking-[-0.05em]">
              Ready to improve your digital presence?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-[#A7A7A7]">
              Send the basics and AURIC will follow up with the right setup,
              modernization, or monthly advertising approach for your business.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black px-4 py-12 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <LogoMark className="h-auto w-28" />

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#A7A7A7]">
                Premium online presence, modernization, monthly advertising,
                and reporting systems for businesses that want to look sharper
                and attract better inquiries.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <a
                href="https://instagram.com/auricstudio.co"
                className="group inline-flex items-center gap-3 text-sm text-[#F5F0E8] transition hover:text-[#C9A55C]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#C9A55C] transition group-hover:border-[#C9A55C]/60">
                  <Icon name="instagram" size={18} />
                </span>
                <span>@auricstudio.co</span>
              </a>

              <a
                href="mailto:hello@auricstudio.co"
                className="group inline-flex items-center gap-3 text-sm text-[#F5F0E8] transition hover:text-[#C9A55C]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#C9A55C] transition group-hover:border-[#C9A55C]/60">
                  <Icon name="mail" size={18} />
                </span>
                <span>hello@auricstudio.co</span>
              </a>
            </div>
          </div>

          <div className="mt-10 h-px bg-white/10" />

          <div className="mt-6 flex flex-col gap-3 text-[11px] uppercase tracking-[0.24em] text-white/35 md:flex-row md:items-center md:justify-between">
            <span>© AURIC Studio</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </main>
  );
}