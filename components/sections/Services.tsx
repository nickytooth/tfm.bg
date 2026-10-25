"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import type { Dictionary } from "@/i18n/bg";
import type { Locale } from "@/i18n/config";
import { Reveal } from "../Reveal";

type Service = Dictionary["services"]["items"][number];

export function Services({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { services } = dict;
  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              {services.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {services.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line md:mt-20">
          {services.items.map((s, i) => (
            <ServiceRow
              key={s.id}
              service={s}
              explore={services.explore}
              locale={locale}
              delay={i * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  explore,
  locale,
  delay,
}: {
  service: Service;
  explore: string;
  locale: Locale;
  delay: number;
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
    <Reveal as="div" delay={delay} className="border-b border-line">
      <Link
        ref={ref}
        href={`/${locale}${service.href}`}
        onMouseMove={onMove}
        className="group relative grid grid-cols-1 gap-y-8 overflow-hidden px-2 py-10 transition-colors duration-500 md:grid-cols-[auto_1.1fr_1fr] md:items-start md:gap-x-10 md:py-14"
      >
        {/* Pointer spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(480px circle at var(--mx) var(--my), oklch(0.9 0.19 124 / 0.16), transparent 72%)",
          }}
        />

        {/* Index */}
        <span className="font-[family-name:var(--font-mono)] text-sm text-faint transition-colors duration-500 group-hover:text-accent md:pt-3">
          {service.index}
        </span>

        {/* Title + desc */}
        <div>
          <h3 className="flex items-start gap-3 text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
            <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
              {service.title}
            </span>
            <ArrowUpRight
              size={26}
              weight="bold"
              className="mt-1 shrink-0 text-faint transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
            />
          </h3>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
            {service.desc}
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-faint transition-colors duration-500 group-hover:text-ink">
            {explore}
          </span>
        </div>

        {/* Points */}
        <ul className="flex flex-col gap-2.5 md:pt-2">
          {service.points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2.5 text-sm text-muted transition-colors duration-500 group-hover:text-ink"
            >
              <Check
                size={14}
                weight="bold"
                className="shrink-0 text-accent/70"
              />
              {p}
            </li>
          ))}
        </ul>
      </Link>
    </Reveal>
  );
}
