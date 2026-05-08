"use client";

import React, { SVGProps } from "react";

const LOGO_SRC = "/logo.png";

type IconName = "arrow" | "instagram" | "mail" | "website";

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
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function LinkCard({
  href,
  label,
  description,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  description: string;
  icon: IconName;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center justify-between gap-5 border border-white/10 bg-white/[0.035] p-5 text-left transition duration-500 hover:-translate-y-1 hover:border-[#C9A55C]/60 hover:bg-[#C9A55C]/[0.06] hover:shadow-[0_0_45px_rgba(201,165,92,0.12)]"
    >
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center border border-[#C9A55C]/35 bg-black/40 text-[#C9A55C]">
          <Icon name={icon} size={20} />
        </span>

        <span>
          <span className="block text-base font-medium tracking-[-0.01em] text-[#F5F0E8]">
            {label}
          </span>

          <span className="mt-1 block text-sm leading-6 text-white/50">
            {description}
          </span>
        </span>
      </div>

      <Icon
        name="arrow"
        size={18}
        className="shrink-0 text-[#C9A55C] transition group-hover:translate-x-1"
      />
    </a>
  );
}

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-8 text-[#F5F0E8] sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-16rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#C9A55C]/12 blur-[130px]" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-[#C9A55C]/10 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl flex-col justify-center">
        <div className="border border-white/10 bg-black/35 p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur sm:p-8">
          <div className="flex justify-center">
            <img
              src={LOGO_SRC}
              alt="AURIC Studio"
              className="h-auto w-32 object-contain"
            />
          </div>

          <div className="mt-8 text-center">
            <div className="mx-auto mb-5 w-fit border border-[#C9A55C]/30 bg-[#C9A55C]/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#C9A55C]">
              Connect With AURIC
            </div>

            <h1 className="text-[clamp(2.2rem,9vw,4.6rem)] font-light leading-[0.9] tracking-[-0.07em]">
              Choose where you want to go.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/55">
              View our website, send us an email, or visit our Instagram.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            <LinkCard
              href="/"
              icon="website"
              label="Visit Website"
              description="See AURIC services, packages, showcase, and contact form."
            />

            <LinkCard
              href="mailto:hello@auricstudio.co"
              icon="mail"
              label="Email Us"
              description="Send your business name, website, Instagram, or question."
            />

            <LinkCard
              href="https://instagram.com/auricstudio.co"
              icon="instagram"
              label="Instagram"
              description="View posts, examples, updates, and message us directly."
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
