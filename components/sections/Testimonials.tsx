"use client";

import { useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Dictionary } from "@/i18n/bg";
import { Reveal } from "../Reveal";

type Item = Dictionary["testimonials"]["items"][number];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function Testimonials({ dict }: { dict: Dictionary }) {
  const { testimonials } = dict;
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.86, behavior: "smooth" });
  };

  const doubled = [...testimonials.items, ...testimonials.items];

  return (
    <section className="overflow-hidden border-t border-line py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            {testimonials.heading}
          </h2>
        </Reveal>
      </div>

      {/* Desktop: slow auto-scrolling marquee */}
      <div className="marquee-mask marquee-pause mt-14 hidden overflow-hidden md:block">
        <div className="marquee-track-slow flex w-max gap-5">
          {doubled.map((t, i) => (
            <Card key={`${t.name}-${i}`} item={t} className="w-[400px]" />
          ))}
        </div>
      </div>

      {/* Mobile: swipe / arrow slider */}
      <div className="mt-12 md:hidden">
        <div
          ref={scroller}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-5"
        >
          {testimonials.items.map((t) => (
            <Card
              key={t.name}
              item={t}
              className="w-[86%] shrink-0 snap-center"
            />
          ))}
        </div>
        <div className="shell mt-6 flex gap-2">
          <SliderButton dir={-1} onClick={() => scrollBy(-1)} label="Назад" />
          <SliderButton dir={1} onClick={() => scrollBy(1)} label="Напред" />
        </div>
      </div>
    </section>
  );
}

function Card({ item, className = "" }: { item: Item; className?: string }) {
  return (
    <figure
      className={`flex flex-col justify-between gap-10 rounded-2xl border border-line bg-surface/40 p-8 md:p-9 ${className}`}
    >
      <blockquote className="text-lg leading-relaxed text-ink">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong font-[family-name:var(--font-mono)] text-xs text-accent">
          {initials(item.name)}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-medium text-ink">{item.name}</span>
          <span className="text-xs text-faint">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function SliderButton({
  dir,
  onClick,
  label,
}: {
  dir: 1 | -1;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-300 hover:border-ink active:scale-95"
    >
      {dir === -1 ? (
        <CaretLeft size={18} weight="bold" />
      ) : (
        <CaretRight size={18} weight="bold" />
      )}
    </button>
  );
}
