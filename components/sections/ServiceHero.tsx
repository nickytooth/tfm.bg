"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { MagneticButton } from "../MagneticButton";

export function ServiceHero({
  label,
  title,
  intro,
  ctaLabel,
  ctaHref,
  image,
}: {
  label: string;
  title: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[78vh] items-end overflow-hidden pt-[120px] pb-16 md:min-h-[88vh] md:pb-24"
    >
      <motion.div
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-y-0 right-0 z-0 h-full w-full md:w-[64%]"
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 64vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_10%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-bg)_4%,transparent_38%)]" />
        <div className="absolute inset-0 bg-bg/25 md:hidden" />
      </motion.div>

      <div className="shell relative z-10">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="kicker"
        >
          {label}
        </motion.span>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-3xl text-[clamp(2.2rem,6.4vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          {intro}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9"
        >
          <MagneticButton href={ctaHref} variant="accent">
            {ctaLabel}
            <ArrowRight size={18} weight="bold" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
