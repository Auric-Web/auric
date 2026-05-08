"use client";

import React, {
  FormEvent,
  PointerEvent,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";

const LOGO_SRC = "/logo.png";
const BEFORE_LOGO_SRC = "/before-logo.png";

const EMAIL = "hello@theauricstudios.com";
const INSTAGRAM_URL = "https://www.instagram.com/auricstudio.co/";
const LINKEDIN_URL = "https://www.linkedin.com/company/auricstudios";
const WEBSITE_URL = "https://theauricstudios.com";

type IconName =
  | "arrow"
  | "check"
  | "instagram"
  | "mail"
  | "spark"
  | "linkedin"
  | "globe";

type PackageItem = {
  title: string;
  label: string;
  description: string;
  items: string[];
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
    spark: (
      <>
        <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3z" />
        <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />
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
    <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-[#C9A55C]">
      {children}
    </div>
  );
}

function PackageCard({ item }: { item: PackageItem }) {
  return (
    <article className="group relative overflow-hidden border border-white/10 bg-[#0B0B0B] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#C9A55C]/60 hover:bg-[#11100B] md:p-7">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#C9A55C]/10 blur-3xl transition group-hover:bg-[#C9A55C]/20" />

      <div className="relative text-[10px] uppercase tracking-[0.3em] text-[#C9A55C]">
        {item.label}
      </div>

      <h3 className="relative mt-5 text-3xl font-light tracking-[-0.04em] text-[#F5F0E8]">
        {item.title}
      </h3>

      <p className="relative mt-5 text-sm leading-7 text-[#A7A7A7]">
        {item.description}
      </p>

      <div className="relative my-7 h-px bg-white/10" />

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

function BeforePanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f0f0f0] text-[#17405a]">
      <div className="flex h-16 items-center justify-between bg-[#145274] px-6 text-xs font-bold uppercase tracking-wide text-white">
        <img
          src={BEFORE_LOGO_SRC}
          alt="Before logo"
          className="h-10 w-10 object-contain"
        />

        <div className="hidden gap-6 md:flex">
          <span>Home</span>
          <span>Services</span>
          <span>Contact</span>
        </div>

        <div className="rounded bg-white px-4 py-2 text-[#145274]">
          Click Here
        </div>
      </div>

      <div className="grid h-[calc(100%-4rem)] place-items-center px-8 text-center">
        <div>
          <div className="mx-auto mb-6 w-fit border-4 border-dashed border-[#145274]/35 px-5 py-3 text-xs font-black uppercase">
            Unclear First Impression
          </div>

          <h3 className="text-[clamp(2rem,7vw,5.6rem)] font-black leading-none tracking-[-0.05em]">
            WELCOME TO OUR WEBSITE
          </h3>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold text-[#2b637e]">
            Generic headline. Weak trust. No clear contact path. No reason to
            inquire.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <div className="border-2 border-[#145274] px-5 py-3 text-xs font-black uppercase">
              Learn More
            </div>

            <div className="bg-[#145274] px-5 py-3 text-xs font-black uppercase text-white">
              Contact Us
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AfterPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] text-[#F5F0E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(201,165,92,0.22),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(201,165,92,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(0,0,0,0.96))]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative flex h-16 items-center justify-between border-b border-white/10 bg-black/55 px-6 backdrop-blur">
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
            Modernized Presence
          </div>

          <h3 className="text-[clamp(2.3rem,7vw,6.5rem)] font-light leading-[0.92] tracking-[-0.07em]">
            Sharper trust. Cleaner contact. Better first impression.
          </h3>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/68">
            A focused landing page, stronger profile structure, clear inquiry
            path, and better presentation across every touchpoint.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="bg-[#C9A55C] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black">
              View Services
            </div>

            <div className="border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
              See Examples
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

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <AfterPanel />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-20"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
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
    "w-full border border-white/10 bg-black/40 px-4 py-4 text-sm text-[#F5F0E8] outline-none transition placeholder:text-white/35 focus:border-[#C9A55C]/70";
  const labelClass =
    "mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/40";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-white/10 bg-[#0B0B0B] p-5 sm:p-7 md:p-8"
    >
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
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

      <div className="mt-5 grid gap-5 md:grid-cols-2">
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

      <div className="mt-5">
        <label className={labelClass}>Service</label>
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

export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <main
      id="top"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-[#F5F0E8]"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-22rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#C9A55C]/10 blur-[150px]" />
        <div className="absolute bottom-[12%] right-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[#8F7138]/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:68px_68px]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">
          <a href="#top" className="group flex items-center">
            <Logo className="h-14 w-auto max-w-[185px] transition duration-500 group-hover:drop-shadow-[0_0_18px_rgba(201,165,92,0.45)]" />
          </a>

          <nav className="hidden items-center gap-9 text-[13px] uppercase tracking-[0.26em] text-white/60 md:flex">
            <a href="#packages" className="transition hover:text-[#C9A55C]">
              Packages
            </a>

            <a href="#showcase" className="transition hover:text-[#C9A55C]">
              Showcase
            </a>

            <a href="#contact" className="transition hover:text-[#C9A55C]">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="hidden border border-[#C9A55C]/40 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-[#C9A55C] transition hover:bg-[#C9A55C] hover:text-black md:inline-flex"
          >
            Request Review
          </a>
        </div>
      </header>

      <section className="relative z-10 flex min-h-screen items-center px-4 pt-24 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative overflow-hidden border border-white/10 bg-[#070707]/70 px-5 py-16 shadow-[0_0_80px_rgba(0,0,0,0.35)] sm:px-8 md:px-12 lg:px-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,165,92,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(0,0,0,0.96))]" />
            <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border border-[#C9A55C]/20" />
            <div className="absolute -bottom-36 right-20 h-96 w-96 rounded-full bg-[#C9A55C]/5 blur-3xl" />

            <div className="relative">
              <div className="mb-8 inline-flex items-center gap-3 border border-[#C9A55C]/25 bg-[#C9A55C]/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#C9A55C]">
                <Icon name="spark" size={14} />
                Online Presence Setup & Cleanup
              </div>

              <h1 className="max-w-6xl text-[clamp(3.3rem,8.8vw,8.5rem)] font-light leading-[0.9] tracking-[-0.075em] text-[#F5F0E8]">
                Make the first impression match the business.
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-8 text-[#B9B3AA] md:text-lg">
                AURIC Studio helps local businesses clean up their website,
                Instagram, Google profile, QR links, and contact flow so they
                look more legitimate and easier to reach.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#packages"
                  className="group inline-flex items-center justify-center gap-3 border border-[#C9A55C] bg-[#C9A55C] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition duration-500 hover:bg-[#F3D486] hover:shadow-[0_0_35px_rgba(201,165,92,0.25)]"
                >
                  Our Services
                  <Icon
                    name="arrow"
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#showcase"
                  className="inline-flex items-center justify-center border border-white/15 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#F5F0E8] transition duration-500 hover:border-[#C9A55C]/60 hover:text-[#C9A55C]"
                >
                  See Examples
                </a>
              </div>

              <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
                {[
                  [
                    "Website",
                    "Cleaner structure, stronger trust, clearer calls to action.",
                  ],
                  [
                    "Profiles",
                    "Instagram and Google pages that look active, clear, and credible.",
                  ],
                  [
                    "Contact Flow",
                    "QR links, forms, email paths, and review systems that reduce friction.",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="border border-white/10 bg-black/25 p-5"
                  >
                    <h3 className="text-lg font-light tracking-[-0.02em] text-[#F5F0E8]">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/50">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="relative z-10 border-y border-white/10 bg-[#070707] px-4 py-20 sm:px-6 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionLabel>Service Packages</SectionLabel>

              <h2 className="text-[clamp(2.3rem,5.4vw,5.2rem)] font-light leading-[0.94] tracking-[-0.06em]">
                Start with the review. Then fix what matters.
              </h2>
            </div>

            <p className="max-w-3xl text-base leading-8 text-[#A7A7A7]">
              A clean path for businesses that need a stronger online presence
              without overcomplicated agency retainers or vague marketing
              promises.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <PackageCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="showcase"
        className="relative z-10 px-4 py-20 sm:px-6 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionLabel>Sample Showcase</SectionLabel>

              <h2 className="text-[clamp(2.3rem,5.4vw,5.2rem)] font-light leading-[0.94] tracking-[-0.06em]">
                From unclear to premium.
              </h2>
            </div>

            <p className="max-w-3xl text-base leading-8 text-[#A7A7A7]">
              A visual comparison of how a weak online presence can be reshaped
              into a cleaner, sharper, and easier-to-contact customer
              experience.
            </p>
          </div>

          <div className="mt-12">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 border-t border-white/10 bg-[#070707] px-4 py-20 sm:px-6 md:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Contact</SectionLabel>

            <h2 className="text-[clamp(2.3rem,5.4vw,5.2rem)] font-light leading-[0.94] tracking-[-0.06em]">
              Request a presence review.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#A7A7A7]">
              Send the business name, website, Instagram, or Google profile.
              AURIC will review the current setup and recommend what should be
              cleaned up first.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[#D7D0C5]">
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
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black px-4 py-14 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <Logo className="h-auto w-36" />

              <p className="mt-6 max-w-md text-sm leading-7 text-[#A7A7A7]">
                AURIC Studio helps local businesses improve how they appear
                online through cleaner websites, stronger profiles, QR contact
                systems, review flows, and simple reporting touchpoints.
              </p>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#C9A55C]">
                Services
              </div>

              <div className="mt-5 space-y-3 text-sm text-white/55">
                <a href="#packages" className="block transition hover:text-[#C9A55C]">
                  Presence Reviews
                </a>
                <a href="#packages" className="block transition hover:text-[#C9A55C]">
                  Website Cleanup
                </a>
                <a href="#packages" className="block transition hover:text-[#C9A55C]">
                  Profile Setup
                </a>
                <a href="#packages" className="block transition hover:text-[#C9A55C]">
                  QR Contact Systems
                </a>
                <a href="#packages" className="block transition hover:text-[#C9A55C]">
                  Review Flow Setup
                </a>
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#C9A55C]">
                For
              </div>

              <div className="mt-5 space-y-3 text-sm text-white/55">
                <p>Barbershops</p>
                <p>Salons & Spas</p>
                <p>Auto Shops</p>
                <p>Clinics</p>
                <p>Local Services</p>
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#C9A55C]">
                Contact
              </div>

              <div className="mt-5 space-y-4 text-sm text-white/55">
                <a
                  href={`mailto:${EMAIL}`}
                  className="block transition hover:text-[#C9A55C]"
                >
                  {EMAIL}
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block transition hover:text-[#C9A55C]"
                >
                  Instagram
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block transition hover:text-[#C9A55C]"
                >
                  LinkedIn
                </a>

                <a
                  href={WEBSITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block transition hover:text-[#C9A55C]"
                >
                  Website
                </a>

                <a
                  href="#contact"
                  className="mt-2 inline-flex border border-[#C9A55C]/40 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-[#C9A55C] transition hover:bg-[#C9A55C] hover:text-black"
                >
                  Request Review
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 h-px bg-white/10" />

          <div className="mt-6 flex flex-col gap-3 text-[11px] uppercase tracking-[0.24em] text-white/30 md:flex-row md:items-center md:justify-between">
            <span>© AURIC Studio</span>
            <span>theauricstudios.com</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
