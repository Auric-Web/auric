"use client";

import React, {
  FormEvent,
  PointerEvent,
  SVGProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const LOGO_SRC = "/logo.png";

const EMAIL = "hello@theauricstudios.com";
const INSTAGRAM_URL = "https://www.instagram.com/auricstudio.co/";
const LINKEDIN_URL = "https://www.linkedin.com/company/auricstudios";
const WEBSITE_URL = "https://theauricstudios.com";

const CAELUS_NEW_LOGO = "/showcase/caelus-new-logo.png";
const CAELUS_NEW_CARD = "/showcase/caelus-new-business-card.png";
const CAELUS_OLD_LOGO_1 = "/showcase/caelus-old-logo-1.png";

type IconName =
  | "arrow"
  | "check"
  | "instagram"
  | "mail"
  | "linkedin"
  | "globe";

type PackageItem = {
  title: string;
  label: string;
  description: string;
  items: string[];
};

type NoteItem = {
  x: string;
  y: string;
  side?: "left" | "right";
  text: string;
  width?: string;
};

type ExampleId = "website" | "cards" | "logos";

type ShowcaseItem = {
  id: ExampleId;
  tab: string;
  title: string;
  beforeNotes: NoteItem[];
  afterNotes: NoteItem[];
};

const packages: PackageItem[] = [
  {
    title: "Presence Review",
    label: "First Step",
    description:
      "A focused review of how the business appears online, where trust is weak, and where the contact flow can improve.",
    items: [
      "Website / landing page review",
      "Instagram profile review",
      "Google Business Profile check",
      "Contact flow review",
      "Short improvement report",
    ],
  },
  {
    title: "Online Cleanup",
    label: "Core Package",
    description:
      "For businesses that already exist but look outdated, inconsistent, unclear, or hard to contact online.",
    items: [
      "Website or landing page refresh",
      "Instagram/profile cleanup",
      "Google profile cleanup",
      "QR/contact link setup",
      "Inquiry form setup",
    ],
  },
  {
    title: "Full Setup",
    label: "Build Package",
    description:
      "For new businesses or messy setups that need a clean foundation across website, profiles, forms, and customer contact points.",
    items: [
      "Website or landing page setup",
      "Business profile setup",
      "Social profile setup",
      "Review capture flow",
      "Basic tracking setup",
    ],
  },
];

const showcaseItems: ShowcaseItem[] = [
  {
    id: "website",
    tab: "Website",
    title: "Website Refresh",
    beforeNotes: [
      {
        x: "7%",
        y: "15%",
        side: "right",
        text: "Generic hero with weak first impression.",
      },
      {
        x: "8%",
        y: "60%",
        side: "right",
        text: "Poor hierarchy and cluttered service blocks.",
      },
      {
        x: "63%",
        y: "26%",
        side: "left",
        text: "No clear structure or confident positioning.",
      },
    ],
    afterNotes: [
      {
        x: "7%",
        y: "16%",
        side: "right",
        text: "Sharper positioning and more professional tone.",
      },
      {
        x: "62%",
        y: "25%",
        side: "left",
        text: "Cleaner service split improves clarity fast.",
      },
      {
        x: "58%",
        y: "72%",
        side: "left",
        text: "Stronger CTAs and contact path help convert inquiries.",
      },
    ],
  },
  {
    id: "cards",
    tab: "Business Cards",
    title: "Business Card Refresh",
    beforeNotes: [
      {
        x: "9%",
        y: "18%",
        side: "right",
        text: "Too busy and visually dated.",
      },
      {
        x: "58%",
        y: "50%",
        side: "left",
        text: "Weak spacing and low-end presentation.",
      },
      {
        x: "10%",
        y: "76%",
        side: "right",
        text: "Looks like a starter mockup, not a serious brand asset.",
      },
    ],
    afterNotes: [
      {
        x: "9%",
        y: "17%",
        side: "right",
        text: "Premium visual style increases perceived quality.",
      },
      {
        x: "62%",
        y: "38%",
        side: "left",
        text: "Cleaner layout improves readability and credibility.",
      },
      {
        x: "58%",
        y: "77%",
        side: "left",
        text: "Better brand consistency for meetings and networking.",
      },
    ],
  },
  {
    id: "logos",
    tab: "Logos",
    title: "Logo Refresh",
    beforeNotes: [
      {
        x: "9%",
        y: "20%",
        side: "right",
        text: "Old concept feels generic and inconsistent.",
      },
      {
        x: "58%",
        y: "38%",
        side: "left",
        text: "Weak execution lowers perceived professionalism.",
      },
      {
        x: "9%",
        y: "74%",
        side: "right",
        text: "The identity does not feel modern or premium.",
      },
    ],
    afterNotes: [
      {
        x: "9%",
        y: "20%",
        side: "right",
        text: "Cleaner mark gives the brand a stronger identity.",
      },
      {
        x: "62%",
        y: "38%",
        side: "left",
        text: "Sharper execution feels more premium and intentional.",
      },
      {
        x: "58%",
        y: "76%",
        side: "left",
        text: "A stronger logo carries better across web and print.",
      },
    ],
  },
];

function Icon({
  name,
  size = 18,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
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
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v2" />
        <rect x="2" y="9" width="4" height="11" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8" />
        <path d="M3.6 15h16.8" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      alt="AURIC Studio"
      className={`object-contain ${className}`}
    />
  );
}

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.34em] text-[#C9A55C]">
      {children}
    </div>
  );
}

function PackageCard({ item }: { item: PackageItem }) {
  return (
    <article className="group relative overflow-hidden border border-[#C9A55C]/15 bg-black/40 p-5 transition duration-500 hover:-translate-y-1 hover:border-[#C9A55C]/45 hover:bg-[#0b0b0b] md:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.2))]" />
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-10 -translate-y-10 rounded-full bg-[#C9A55C]/10 blur-3xl" />

      <div className="relative text-[10px] uppercase tracking-[0.3em] text-[#C9A55C]">
        {item.label}
      </div>

      <h3 className="relative mt-4 text-[1.85rem] font-light tracking-[-0.04em] text-[#F5F0E8]">
        {item.title}
      </h3>

      <p className="relative mt-4 text-sm leading-7 text-[#A7A7A7]">
        {item.description}
      </p>

      <div className="relative my-6 h-px bg-gradient-to-r from-[#C9A55C]/40 via-white/10 to-transparent" />

      <ul className="relative space-y-3">
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
    </article>
  );
}

function OverlayNotes({
  notes,
  tone,
}: {
  notes: NoteItem[];
  tone: "before" | "after";
}) {
  const lineColor =
    tone === "before" ? "bg-red-300/65" : "bg-[#C9A55C]/80";
  const boxBorder =
    tone === "before" ? "border-red-300/45" : "border-[#C9A55C]/45";
  const boxText = tone === "before" ? "text-white/88" : "text-[#F5F0E8]";

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {notes.map((note, index) => {
        const isRight = note.side !== "left";
        return (
          <div
            key={`${tone}-${index}`}
            className="absolute"
            style={{ left: note.x, top: note.y }}
          >
            <div
              className={`flex items-center gap-2 ${
                isRight ? "" : "flex-row-reverse"
              }`}
            >
              <span className={`h-px w-7 shrink-0 ${lineColor}`} />
              <div
                className={`rounded-md border ${boxBorder} bg-black/72 px-2.5 py-2 text-[10px] leading-4 shadow-[0_0_18px_rgba(0,0,0,0.28)] ${boxText}`}
                style={{ width: note.width || "170px" }}
              >
                {note.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OldWebsitePanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#eef1f5] text-[#244e66]">
      <div className="flex h-14 items-center justify-between bg-[#1e607c] px-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded bg-white text-[#1e607c]">
            C
          </div>
          <span>Caeluscore</span>
        </div>

        <div className="hidden gap-5 md:flex">
          <span>Home</span>
          <span>Services</span>
          <span>About</span>
          <span>Contact</span>
        </div>

        <div className="rounded bg-white px-3 py-1.5 text-[#1e607c]">
          Start
        </div>
      </div>

      <div className="grid h-[calc(100%-3.5rem)] grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="px-8 py-8">
          <div className="mb-5 inline-block border-2 border-dashed border-[#1e607c]/35 px-3 py-2 text-[10px] font-black uppercase">
            We do many things
          </div>

          <h3 className="max-w-xl text-[clamp(2rem,4vw,4.7rem)] font-black leading-[0.94] tracking-[-0.05em] text-[#21546f]">
            WELCOME TO CAELUSCORE
          </h3>

          <p className="mt-5 max-w-lg text-sm font-semibold leading-7 text-[#44718a]">
            We offer engineering, staffing, operations, project support, audits,
            inspection, logistics and other solutions for your needs.
          </p>

          <div className="mt-7 flex gap-3">
            <div className="border-2 border-[#1e607c] px-4 py-3 text-[11px] font-black uppercase">
              Read More
            </div>
            <div className="bg-[#1e607c] px-4 py-3 text-[11px] font-black uppercase text-white">
              Contact Us
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              "Industrial Support",
              "Staffing",
              "Engineering",
              "Consulting",
            ].map((item) => (
              <div
                key={item}
                className="border-2 border-[#8fb0c3] bg-white px-4 py-5 text-sm font-bold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#dce7ee] p-6">
          <div className="rounded border-2 border-[#98b3c2] bg-white p-4">
            <div className="text-[11px] font-black uppercase text-[#1e607c]">
              Why Choose Us?
            </div>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-[#456d85]">
              <li>• Great service</li>
              <li>• Many capabilities</li>
              <li>• Flexible team</li>
              <li>• Fast response</li>
            </ul>
          </div>

          <div className="mt-4 rounded border-2 border-[#98b3c2] bg-white p-4">
            <div className="text-[11px] font-black uppercase text-[#1e607c]">
              Contact Form
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-9 border border-[#bdd0dc] bg-[#f5fafc]" />
              <div className="h-9 border border-[#bdd0dc] bg-[#f5fafc]" />
              <div className="h-20 border border-[#bdd0dc] bg-[#f5fafc]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewWebsitePanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] text-[#F5F0E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(201,165,92,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.2))]" />
      <div className="absolute -left-[5%] top-[-8%] h-[40%] w-[26%] rotate-[-33deg] border border-[#C9A55C]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.22))]" />
      <div className="absolute -right-[4%] bottom-[-8%] h-[42%] w-[20%] rotate-[30deg] border border-[#C9A55C]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.22))]" />

      <div className="relative flex h-14 items-center justify-between border-b border-white/10 bg-black/45 px-5 text-[10px] uppercase tracking-[0.24em] text-white/58 backdrop-blur">
        <div className="font-light tracking-[0.28em] text-[#F5F0E8]">
          CAELUS CORE
        </div>
        <div className="hidden gap-5 md:flex">
          <span>Who We Are</span>
          <span>What We Do</span>
          <span>Careers</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="relative h-[calc(100%-3.5rem)] px-8 py-8">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex border border-[#C9A55C]/30 bg-[#C9A55C]/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#C9A55C]">
            Execution Support & Compliance Services
          </div>

          <h3 className="text-[clamp(2rem,4vw,4.4rem)] font-light leading-[0.94] tracking-[-0.06em]">
            Two service lines. One accountable partner.
          </h3>

          <p className="mt-5 max-w-lg text-sm leading-7 text-white/68">
            Workforce support to keep operations moving, plus structured audit
            services built around compliance, efficiency, and reporting.
          </p>

          <div className="mt-7 flex gap-3">
            <div className="bg-[#C9A55C] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-black">
              Contact us
            </div>
            <div className="border border-white/15 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              View services
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border border-[#C9A55C]/18 bg-black/30 p-5">
            <div className="text-[10px] uppercase tracking-[0.28em] text-[#C9A55C]">
              Service Line 01
            </div>
            <div className="mt-3 text-2xl font-light tracking-[-0.03em]">
              Workforce Supply
            </div>
            <p className="mt-3 text-sm leading-7 text-white/60">
              General labour, forklift operators, warehouse associates, ramp
              and lifting roles, and other ready-to-deploy support personnel.
            </p>
          </div>

          <div className="border border-[#C9A55C]/18 bg-black/30 p-5">
            <div className="text-[10px] uppercase tracking-[0.28em] text-[#C9A55C]">
              Service Line 02
            </div>
            <div className="mt-3 text-2xl font-light tracking-[-0.03em]">
              Audits & Inspections
            </div>
            <p className="mt-3 text-sm leading-7 text-white/60">
              ISO 9001 quality audits, ASHRAE Level 1–3 energy audits, and
              carbon audits structured around compliance and reporting clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OldBusinessCardPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#e8ebef]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(0,0,0,0.06))]" />

      <div className="relative flex h-full items-center justify-center px-8 py-8">
        <div className="grid w-full max-w-[960px] gap-5 md:grid-cols-2">
          <div className="rotate-[-8deg] rounded bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
            <div className="rounded border-2 border-dashed border-[#2d84a6]/35 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={CAELUS_OLD_LOGO_1}
                  alt="Old CaelusCore logo"
                  className="h-14 w-14 object-contain"
                />

                <div>
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-[#2d84a6]">
                    CAELUSCORE
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase text-[#6b8da0]">
                    Engineering / Staffing / Consulting
                  </div>
                </div>
              </div>

              <div className="mt-7 text-2xl font-black text-[#1e4f66]">
                ALEX MORGAN
              </div>

              <div className="mt-1 text-[11px] font-bold uppercase text-[#5e8192]">
                Founder / Consultant / Operations / Staffing
              </div>

              <div className="mt-5 space-y-2 text-sm font-semibold text-[#436779]">
                <div>+1 206 555 0198</div>
                <div>alex.morgan@caeluscore.com</div>
                <div>www.caeluscore.com</div>
                <div>Seattle, WA, United States</div>
              </div>
            </div>
          </div>

          <div className="rotate-[7deg] rounded bg-[#cfe1eb] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <div className="rounded border-2 border-[#80a3b7] bg-white p-5">
              <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#2d84a6]">
                Caeluscore
              </div>

              <div className="mt-5 grid h-32 place-items-center rounded border border-[#c1d4df] bg-[#f6fbfd]">
                <img
                  src={CAELUS_OLD_LOGO_1}
                  alt="Old CaelusCore logo"
                  className="max-h-24 max-w-[70%] object-contain"
                />
              </div>

              <div className="mt-5 text-xs font-semibold leading-6 text-[#4e7588]">
                Engineering | Staffing | Support | Consulting | Operations |
                Audits | Solutions
              </div>

              <div className="mt-4 h-3 w-28 rounded bg-[#2d84a6]/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewBusinessCardPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,165,92,0.16),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.24))]" />
      <div className="absolute -left-[5%] top-[-8%] h-[42%] w-[20%] rotate-[-33deg] border border-[#C9A55C]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.22))]" />
      <div className="absolute -right-[3%] bottom-[-8%] h-[40%] w-[16%] rotate-[28deg] border border-[#C9A55C]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.22))]" />

      <div className="relative flex h-full items-center justify-center px-8 py-8">
        <div className="w-full max-w-[900px] overflow-hidden rounded border border-[#C9A55C]/16 bg-black/30 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
          <img
            src={CAELUS_NEW_CARD}
            alt="New CaelusCore business card"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function OldLogoPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#eceef1]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(0,0,0,0.05))]" />

      <div className="relative flex h-full items-center justify-center px-8 py-8">
        <div className="w-full max-w-[760px] rounded bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <div className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-[#6b7a88]">
            Old Logo Concept
          </div>

          <div className="grid min-h-[360px] place-items-center rounded border border-[#d6dde3] bg-[#f9fbfc] p-8">
            <img
              src={CAELUS_OLD_LOGO_1}
              alt="Old CaelusCore logo concept"
              className="max-h-[280px] max-w-[85%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NewLogoPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(201,165,92,0.15),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.2))]" />
      <div className="absolute -left-[4%] top-[-8%] h-[44%] w-[22%] rotate-[-34deg] border border-[#C9A55C]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.22))]" />
      <div className="absolute -right-[4%] bottom-[-8%] h-[42%] w-[18%] rotate-[31deg] border border-[#C9A55C]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.22))]" />

      <div className="relative flex h-full items-center justify-center px-8 py-8">
        <div className="grid w-full max-w-[960px] gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="grid min-h-[320px] place-items-center rounded border border-[#C9A55C]/16 bg-black/35 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <img
              src={CAELUS_NEW_LOGO}
              alt="New CaelusCore logo"
              className="max-h-[260px] max-w-[80%] object-contain"
            />
          </div>

          <div className="flex items-center">
            <div className="w-full rounded border border-[#C9A55C]/16 bg-black/28 p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55C]">
                Updated identity
              </div>

              <div className="mt-4 text-3xl font-light tracking-[-0.03em] text-[#F5F0E8]">
                Cleaner. Stronger. More premium.
              </div>

              <div className="mt-4 space-y-3 text-sm leading-7 text-white/65">
                <p>• Better visual consistency across print and web.</p>
                <p>• More distinctive mark for stronger recall.</p>
                <p>• A sharper overall feel that supports trust.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseSlider({
  before,
  after,
  beforeNotes,
  afterNotes,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeNotes: NoteItem[];
  afterNotes: NoteItem[];
}) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  function updatePosition(clientX: number) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition(
      Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    );
  }

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updatePosition(event.clientX);
  }

  return (
    <div className="overflow-hidden border border-[#C9A55C]/15 bg-[#0A0A0A] shadow-[0_0_70px_rgba(0,0,0,0.45)]">
      <div
        ref={wrapRef}
        onPointerDown={pointerDown}
        onPointerMove={(event) => dragging && updatePosition(event.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="relative aspect-[16/11] cursor-ew-resize touch-none select-none overflow-hidden md:aspect-[16/8]"
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="absolute inset-0">
            {before}
            <OverlayNotes notes={beforeNotes} tone="before" />
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <div className="absolute inset-0">
            {after}
            <OverlayNotes notes={afterNotes} tone="after" />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-40"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="relative h-full w-px bg-white/90">
            <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#C9A55C] bg-black text-[#C9A55C] shadow-[0_0_35px_rgba(201,165,92,0.35)]">
              ↔
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-4 top-4 z-40 rounded-full border border-black/10 bg-white/82 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-black backdrop-blur"
          style={{
            opacity: position > 8 ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        >
          Before
        </div>

        <div
          className="pointer-events-none absolute right-4 top-4 z-40 rounded-full border border-[#C9A55C]/40 bg-black/72 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A55C] backdrop-blur"
          style={{
            opacity: position < 92 ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        >
          After
        </div>
      </div>
    </div>
  );
}

function ShowcaseTabs({
  active,
  setActive,
}: {
  active: ExampleId;
  setActive: (id: ExampleId) => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {showcaseItems.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`border px-4 py-3 text-[11px] uppercase tracking-[0.24em] transition duration-300 ${
              isActive
                ? "border-[#C9A55C] bg-[#C9A55C] text-black"
                : "border-white/10 bg-white/[0.03] text-white/65 hover:border-[#C9A55C]/45 hover:text-[#F5F0E8]"
            }`}
          >
            {item.tab}
          </button>
        );
      })}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
    "w-full border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-[#F5F0E8] outline-none transition placeholder:text-white/35 focus:border-[#C9A55C]/70";
  const labelClass =
    "mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/40";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#C9A55C]/15 bg-[#0B0B0B] p-5 sm:p-6 md:p-7"
    >
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input
            name="name"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Business</label>
          <input
            name="company"
            placeholder="Business name"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone / Link</label>
          <input
            name="phone"
            placeholder="Phone, website, or Instagram"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass}>Service</label>
        <select
          name="service"
          className="w-full border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-[#B9B3AA] outline-none transition focus:border-[#C9A55C]/70"
        >
          <option>Presence Review</option>
          <option>Online Cleanup</option>
          <option>Full Setup</option>
          <option>Monthly Ads / Reporting</option>
        </select>
      </div>

      <div className="mt-4">
        <label className={labelClass}>Message</label>
        <textarea
          name="message"
          required
          placeholder="Tell us what you want reviewed, cleaned up, or built."
          className={`${inputClass} min-h-32 resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex w-full items-center justify-center gap-3 border border-[#C9A55C] bg-[#C9A55C] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition duration-500 hover:bg-[#F3D486] hover:shadow-[0_0_40px_rgba(201,165,92,0.22)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {status === "loading" ? "Sending..." : "Request Review"}
        <Icon name="arrow" size={16} />
      </button>

      {status === "success" && (
        <p className="mt-4 text-sm text-[#C9A55C]">
          Inquiry sent. AURIC will follow up shortly.
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm text-red-300">{error}</p>
      )}
    </form>
  );
}

function NavAccent({
  label,
  target,
}: {
  label: string;
  target: string;
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(target)}
      className="group relative px-1 py-2 text-[11px] uppercase tracking-[0.28em] text-white/58 transition duration-300 hover:text-[#F5F0E8]"
    >
      <span className="absolute left-0 top-1/2 h-px w-0 -translate-y-1/2 bg-[#C9A55C] transition-all duration-300 group-hover:w-4" />
      <span className="relative pl-0 transition-all duration-300 group-hover:pl-6">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-center scale-x-0 bg-[#C9A55C]/70 transition-transform duration-300 group-hover:scale-x-100" />
    </button>
  );
}

function FooterIconLink({
  href,
  icon,
  external = false,
}: {
  href: string;
  icon: IconName;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition duration-300 hover:border-[#C9A55C]/60 hover:bg-[#C9A55C]/10 hover:text-[#C9A55C]"
    >
      <Icon name={icon} size={18} className="transition group-hover:scale-105" />
    </a>
  );
}

export default function Home() {
  const [activeExample, setActiveExample] = useState<ExampleId>("website");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
    };

    resetScroll();
    const timer = window.setTimeout(resetScroll, 0);
    window.addEventListener("beforeunload", resetScroll);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeunload", resetScroll);
    };
  }, []);

  const activeShowcase = useMemo(
    () => showcaseItems.find((item) => item.id === activeExample)!,
    [activeExample]
  );

  const showcasePanels = useMemo(() => {
    switch (activeExample) {
      case "website":
        return {
          before: <OldWebsitePanel />,
          after: <NewWebsitePanel />,
        };
      case "cards":
        return {
          before: <OldBusinessCardPanel />,
          after: <NewBusinessCardPanel />,
        };
      case "logos":
        return {
          before: <OldLogoPanel />,
          after: <NewLogoPanel />,
        };
      default:
        return {
          before: <OldWebsitePanel />,
          after: <NewWebsitePanel />,
        };
    }
  }, [activeExample]);

  return (
    <main
      id="top"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-[#F5F0E8]"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(201,165,92,0.11),transparent_30%),linear-gradient(180deg,#040404,#050505)]" />
        <div className="absolute -left-[10%] top-[-8%] h-[28rem] w-[18rem] rotate-[-38deg] border border-[#C9A55C]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.22))]" />
        <div className="absolute -right-[8%] bottom-[-8%] h-[32rem] w-[18rem] rotate-[34deg] border border-[#C9A55C]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.25))]" />
        <div className="absolute left-[-6rem] top-[12rem] h-[24rem] w-[24rem] rounded-full bg-[#C9A55C]/[0.05] blur-[120px]" />
        <div className="absolute right-[-8rem] top-[35%] h-[20rem] w-[20rem] rounded-full bg-[#C9A55C]/[0.06] blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-[6%] top-[14%] h-px w-[20%] rotate-[-38deg] bg-gradient-to-r from-transparent via-[#C9A55C]/80 to-transparent" />
        <div className="absolute right-[6%] bottom-[18%] h-px w-[20%] rotate-[34deg] bg-gradient-to-r from-transparent via-[#C9A55C]/80 to-transparent" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 md:px-8">
          <button
            type="button"
            onClick={() => scrollToId("#top")}
            className="group flex items-center"
          >
            <Logo className="h-16 w-auto max-w-[215px] transition duration-500 group-hover:drop-shadow-[0_0_18px_rgba(201,165,92,0.45)]" />
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <NavAccent label="Packages" target="#packages" />
            <NavAccent label="Showcase" target="#showcase" />
            <NavAccent label="Contact" target="#contact" />
          </nav>

          <button
            type="button"
            onClick={() => scrollToId("#contact")}
            className="hidden border border-[#C9A55C]/35 bg-[#C9A55C]/[0.04] px-4 py-2.5 text-[10px] uppercase tracking-[0.24em] text-[#C9A55C] transition duration-300 hover:bg-[#C9A55C] hover:text-black md:inline-flex"
          >
            Request Review
          </button>
        </div>
      </header>

      <section className="relative z-10 flex min-h-screen items-center px-4 pt-24 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative overflow-hidden border border-[#C9A55C]/12 bg-black/45 px-5 py-14 shadow-[0_0_80px_rgba(0,0,0,0.35)] sm:px-8 md:px-10 lg:px-14 lg:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_24%,rgba(201,165,92,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.2))]" />
            <div className="absolute -left-[4%] top-[-6%] h-[48%] w-[22%] rotate-[-36deg] border border-[#C9A55C]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.2))]" />
            <div className="absolute -right-[4%] bottom-[-8%] h-[52%] w-[18%] rotate-[32deg] border border-[#C9A55C]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(0,0,0,0.22))]" />
            <div className="absolute right-[13%] top-[8%] h-px w-[18%] bg-gradient-to-r from-transparent via-[#C9A55C] to-transparent" />

            <div className="relative">
              <h1 className="max-w-5xl text-[clamp(2.75rem,6vw,6.4rem)] font-light leading-[0.94] tracking-[-0.07em] text-[#F5F0E8]">
                Your business should look as good online as it does in real
                life.
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#CFC7BA] md:text-base md:leading-8">
                Website. Social profiles. QR codes. Forms. Ads. Dashboards.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToId("#packages")}
                  className="group inline-flex items-center justify-center gap-3 border border-[#C9A55C] bg-[#C9A55C] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition duration-500 hover:bg-[#F3D486] hover:shadow-[0_0_35px_rgba(201,165,92,0.25)]"
                >
                  Our Services
                  <Icon
                    name="arrow"
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToId("#showcase")}
                  className="inline-flex items-center justify-center border border-white/15 bg-white/[0.03] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F0E8] transition duration-500 hover:border-[#C9A55C]/60 hover:text-[#C9A55C]"
                >
                  See Examples
                </button>
              </div>

              <div className="mt-10 border-t border-[#C9A55C]/20 pt-6">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#C9A55C]">
                  Clean presence. Clear flow. Better inquiries.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="relative z-10 border-y border-white/10 bg-[#060606] px-4 py-16 sm:px-6 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Service Packages</SectionLabel>

          <h2 className="max-w-4xl text-[clamp(2rem,4.6vw,4.4rem)] font-light leading-[0.96] tracking-[-0.06em]">
            Start clean. Look professional from day one.
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <PackageCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="showcase"
        className="relative z-10 px-4 py-16 sm:px-6 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Sample Showcase</SectionLabel>

          <h2 className="max-w-4xl text-[clamp(2rem,4.6vw,4.4rem)] font-light leading-[0.96] tracking-[-0.06em]">
            Three examples. Three transformations.
          </h2>

          <div className="mt-4 text-[11px] uppercase tracking-[0.26em] text-[#C9A55C]">
            {activeShowcase.title}
          </div>

          <div className="mt-8">
            <ShowcaseTabs
              active={activeExample}
              setActive={setActiveExample}
            />
          </div>

          <ShowcaseSlider
            before={showcasePanels.before}
            after={showcasePanels.after}
            beforeNotes={activeShowcase.beforeNotes}
            afterNotes={activeShowcase.afterNotes}
          />
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 border-t border-white/10 bg-[#060606] px-4 py-16 sm:px-6 md:px-8 md:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Contact</SectionLabel>

            <h2 className="text-[clamp(2rem,4.6vw,4.4rem)] font-light leading-[0.96] tracking-[-0.06em]">
              Request a presence review.
            </h2>

            <div className="mt-7 space-y-4 text-sm text-[#D7D0C5]">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 transition hover:text-[#C9A55C]"
              >
                <span className="grid h-10 w-10 place-items-center border border-white/10 bg-black/30 text-[#C9A55C]">
                  <Icon name="mail" />
                </span>
                {EMAIL}
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-[#C9A55C]"
              >
                <span className="grid h-10 w-10 place-items-center border border-white/10 bg-black/30 text-[#C9A55C]">
                  <Icon name="instagram" />
                </span>
                @auricstudio.co
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-[#C9A55C]"
              >
                <span className="grid h-10 w-10 place-items-center border border-white/10 bg-black/30 text-[#C9A55C]">
                  <Icon name="linkedin" />
                </span>
                LinkedIn
              </a>

              <a
                href={WEBSITE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-[#C9A55C]"
              >
                <span className="grid h-10 w-10 place-items-center border border-white/10 bg-black/30 text-[#C9A55C]">
                  <Icon name="globe" />
                </span>
                theauricstudios.com
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black px-4 py-8 sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">
            © AURIC Studio
          </div>

          <div className="flex items-center gap-3">
            <FooterIconLink href={`mailto:${EMAIL}`} icon="mail" />
            <FooterIconLink
              href={INSTAGRAM_URL}
              icon="instagram"
              external
            />
            <FooterIconLink
              href={LINKEDIN_URL}
              icon="linkedin"
              external
            />
            <FooterIconLink href={WEBSITE_URL} icon="globe" external />
          </div>
        </div>
      </footer>
    </main>
  );
}
