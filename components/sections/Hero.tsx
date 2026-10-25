"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import type { Dictionary } from "@/i18n/bg";
import type { Locale } from "@/i18n/config";
import { MagneticButton } from "../MagneticButton";
import heroImg from "@/public/img/hero.png";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const wordUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

function Line({ words, accent = false }: { words: string[]; accent?: boolean }) {
  return (
    <span className="flex flex-wrap gap-x-[0.26em]">
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="block shrink-0 overflow-hidden pb-[0.12em]"
        >
          <motion.span
            variants={wordUp}
            className={`inline-block ${accent ? "text-accent" : "text-ink"}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { hero } = dict;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const accentLine = [
    hero.accents[0] + ",",
    hero.accents[1],
    locale === "bg" ? "и" : "&",
    hero.accents[2],
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-[68px]"
    >
      {/* Hero visual */}
      <motion.div
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-y-0 right-0 z-0 h-full w-full md:w-[68%]"
      >
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 68vw"
          className="object-cover object-right"
        />
        {/* Mask the image into the dark canvas */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_8%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-bg)_2%,transparent_30%)]" />
        <div className="absolute inset-0 bg-bg/20 md:hidden" />
      </motion.div>

      {/* Copy */}
      <motion.div
        style={reduce ? undefined : { y: textY, opacity: fade }}
        className="shell relative z-10"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={reduce ? undefined : container}
          className="max-w-4xl"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-7 flex items-center gap-2.5"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="kicker">{hero.status}</span>
          </motion.div>

          <h1 className="text-[clamp(1.85rem,5.4vw,3.6rem)] font-extrabold leading-[1.0] tracking-[-0.035em]">
            <Line words={[hero.line1]} />
            <Line words={hero.line2.split(" ")} />
            <Line words={accentLine} accent />
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href={`/${locale}/contact`} variant="accent">
              {hero.ctaPrimary}
              <ArrowRight size={18} weight="bold" />
            </MagneticButton>
            <MagneticButton href={`/${locale}#services`} variant="ghost">
              {hero.ctaSecondary}
              <ArrowDown size={18} weight="bold" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
