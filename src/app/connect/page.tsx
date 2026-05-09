"use client";

import React, { SVGProps, useEffect } from "react";

const LOGO_SRC = "/logo.png";

const EMAIL_HREF =
  "mailto:hello@theauricstudios.com?subject=AURIC%20Studio%20Inquiry";
const WEBSITE_URL = "https://theauricstudios.com";
const INSTAGRAM_URL = "https://www.instagram.com/auricstudio.co/";
const LINKEDIN_URL = "https://www.linkedin.com/company/auricstudios";

type IconName = "arrow" | "instagram" | "mail" | "website" | "linkedin";

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
    website: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8" />
        <path d="M3.6 15h16.8" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v2" />
        <rect x="2" y="9" width="4" height="11" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function LinkButton({
  href,
  label,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: IconName;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center justify-between gap-5 border border-[#C9A55C]/15 bg-white/[0.03] px-5 py-5 text-left transition duration-500 hover:-translate-y-1 hover:border-[#C9A55C]/60 hover:bg-[#C9A55C]/[0.06] hover:shadow-[0_0_45px_rgba(201,165,92,0.12)]"
    >
      <span className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center border border-[#C9A55C]/35 bg-black/40 text-[#C9A55C]">
          <Icon name={icon} size={20} />
        </span>

        <span className="text-base font-medium uppercase tracking-[0.18em] text-[#F5F0E8]">
          {label}
        </span>
      </span>

      <Icon
        name="arrow"
        size={18}
        className="shrink-0 text-[#C9A55C] transition group-hover:translate-x-1"
      />
    </a>
  );
}

export default function ConnectPage() {
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-8 text-[#F5F0E8] sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(201,165,92,0.12),transparent_30%),linear-gradient(180deg,#040404,#050505)]" />
        <div className="absolute -left-[10%] top-[-8%] h-[28rem] w-[18rem] rotate-[-38deg] border border-[#C9A55C]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.22))]" />
        <div className="absolute -right-[8%] bottom-[-8%] h-[32rem] w-[18rem] rotate-[34deg] border border-[#C9A55C]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.25))]" />
        <div className="absolute left-[-6rem] top-[12rem] h-[24rem] w-[24rem] rounded-full bg-[#C9A55C]/[0.05] blur-[120px]" />
        <div className="absolute right-[-8rem] top-[35%] h-[20rem] w-[20rem] rounded-full bg-[#C9A55C]/[0.06] blur-[110px]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl flex-col justify-center">
        <div className="border border-[#C9A55C]/15 bg-black/40 p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur sm:p-8">
          <div className="flex justify-center">
            <img
              src={LOGO_SRC}
              alt="AURIC Studio"
              className="h-auto w-36 object-contain"
            />
          </div>

          <div className="mt-8 text-center">
            <div className="mx-auto mb-5 w-fit border border-[#C9A55C]/30 bg-[#C9A55C]/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#C9A55C]">
              Connect With AURIC
            </div>

            <h1 className="text-[clamp(2rem,8vw,4rem)] font-light leading-[0.92] tracking-[-0.07em]">
              Choose where to go.
            </h1>
          </div>

          <div className="mt-8 grid gap-4">
            <LinkButton
              href={WEBSITE_URL}
              icon="website"
              label="Website"
              external
            />

            <LinkButton href={EMAIL_HREF} icon="mail" label="Email" />

            <LinkButton
              href={INSTAGRAM_URL}
              icon="instagram"
              label="Instagram"
              external
            />

            <LinkButton
              href={LINKEDIN_URL}
              icon="linkedin"
              label="LinkedIn"
              external
            />
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-center text-[10px] uppercase tracking-[0.24em] text-white/30">
            AURIC Studio
          </div>
        </div>
      </section>
    </main>
  );
}
