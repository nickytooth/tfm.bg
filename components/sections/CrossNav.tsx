"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { Reveal } from "../Reveal";

export type CrossLink = {
  title: string;
  desc: string;
  href: string;
};

/* Light "interlude" theme — the systematic white beat on service pages. */
const LIGHT_BG = "bg-[oklch(0.965_0.002_95)]"; // #f4f4f2
const LIGHT_INK = "text-[oklch(0.2_0_0)]";
const LIGHT_MUTED = "text-[oklch(0.44_0_0)]";
const LIGHT_FAINT = "text-[oklch(0.52_0_0)]";
const LIGHT_BORDER = "border-[oklch(0.2_0_0/0.12)]";

export function CrossNav({
  heading,
  cta,
  links,
  locale,
}: {
  heading: string;
  cta: string;
  links: readonly CrossLink[];
  locale: Locale;
}) {
  return (
    <section className={`py-20 md:py-28 ${LIGHT_BG}`}>
      <div className="shell">
        <Reveal>
          <h2
            className={`max-w-2xl text-[clamp(1.7rem,4vw,2.8rem)] font-extrabold leading-[1.04] tracking-[-0.035em] ${LIGHT_INK}`}
          >
            {heading}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
          {links.map((link, i) => (
            <Reveal as="div" key={link.href} delay={i * 0.08}>
              <CrossCard link={link} cta={cta} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CrossCard({
  link,
  cta,
  locale,
}: {
  link: CrossLink;
  cta: string;
  locale: Locale;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={`/${locale}${link.href}`}
      onMouseMove={onMove}
      className={`group relative flex flex-col justify-between gap-12 overflow-hidden rounded-2xl border bg-white p-8 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-10 ${LIGHT_BORDER}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx) var(--my), oklch(0.9 0.19 124 / 0.16), transparent 70%)",
        }}
      />
      <div className="relative flex items-start justify-between gap-6">
        <div>
          <h3
            className={`text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.08] tracking-[-0.03em] ${LIGHT_INK}`}
          >
            {link.title}
          </h3>
          <p className={`mt-3 max-w-sm text-sm leading-relaxed ${LIGHT_MUTED}`}>
            {link.desc}
          </p>
        </div>
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-transparent group-hover:bg-accent ${LIGHT_BORDER} ${LIGHT_INK}`}
        >
          <ArrowUpRight
            size={18}
            weight="bold"
            className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
      <span
        className={`relative font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest ${LIGHT_FAINT}`}
      >
        {cta}
      </span>
    </Link>
  );
}
