"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/i18n/bg";
import { Reveal } from "../Reveal";

gsap.registerPlugin(ScrollTrigger);

type Step = Dictionary["process"]["steps"][number];

/* Light "interlude" theme — a deliberate color-block beat in the dark page. */
const LIGHT_BG = "bg-[oklch(0.965_0.002_95)]"; // #f4f4f2
const LIGHT_INK = "text-[oklch(0.2_0_0)]";
const LIGHT_MUTED = "text-[oklch(0.44_0_0)]";
const LIGHT_FAINT = "text-[oklch(0.55_0_0)]";
const LIGHT_LINE = "bg-[oklch(0.2_0_0/0.14)]";
const LIGHT_BORDER = "border-[oklch(0.2_0_0/0.12)]";

export function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );
    setHorizontal(mq.matches);
    const onChange = () => setHorizontal(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!horizontal || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [horizontal]);

  // Vertical fallback (mobile / reduced-motion)
  if (!horizontal) {
    return (
      <section id="process" className={`scroll-mt-24 py-24 ${LIGHT_BG}`}>
        <div className="shell">
          <ProcessHeader process={process} />
          <div className={`mt-12 border-t ${LIGHT_BORDER}`}>
            {process.steps.map((s, i) => (
              <Reveal as="div" key={s.no} delay={i * 0.05}>
                <StepCard step={s} vertical />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="process"
      ref={wrap}
      className={`relative overflow-hidden ${LIGHT_BG}`}
      aria-label={process.heading}
    >
      <div ref={track} className="flex h-[100dvh] w-max items-center">
        {/* Intro panel */}
        <div className="flex h-full w-[42vw] min-w-[42vw] flex-col justify-center pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] pr-16">
          <ProcessHeader process={process} />
        </div>

        {/* Step panels */}
        {process.steps.map((s, i) => (
          <div
            key={s.no}
            className={`flex h-full w-[34vw] min-w-[34vw] items-center border-l ${LIGHT_BORDER}`}
          >
            <StepCard step={s} last={i === process.steps.length - 1} />
          </div>
        ))}
        <div className="w-[6vw] min-w-[6vw]" />
      </div>
    </section>
  );
}

function ProcessHeader({ process }: { process: Dictionary["process"] }) {
  return (
    <div className="max-w-md">
      <span
        className={`font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] ${LIGHT_FAINT}`}
      >
        {process.kicker}
      </span>
      <h2
        className={`mt-5 text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.035em] ${LIGHT_INK}`}
      >
        {process.heading}
      </h2>
    </div>
  );
}

function StepCard({
  step,
  last = false,
  vertical = false,
}: {
  step: Step;
  last?: boolean;
  vertical?: boolean;
}) {
  return (
    <div
      className={
        vertical ? `border-b ${LIGHT_BORDER} py-10` : "px-10 lg:px-14"
      }
    >
      <div className="flex items-baseline gap-4">
        <span className="rounded-[5px] bg-accent px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-xs font-semibold text-[oklch(0.18_0_0)]">
          {step.no}
        </span>
        <span className={`h-px flex-1 ${LIGHT_LINE}`} />
        {!vertical && !last && (
          <span
            className={`font-[family-name:var(--font-mono)] text-xs ${LIGHT_FAINT}`}
          >
            →
          </span>
        )}
      </div>
      <h3
        className={`mt-7 text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em] ${LIGHT_INK}`}
      >
        {step.title}
      </h3>
      <p className={`mt-4 max-w-sm text-base leading-relaxed ${LIGHT_MUTED}`}>
        {step.desc}
      </p>
    </div>
  );
}
