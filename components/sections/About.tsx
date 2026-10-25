import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Dictionary } from "@/i18n/bg";
import type { Locale } from "@/i18n/config";
import { Reveal } from "../Reveal";
import { CountUp } from "../CountUp";

export function About({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { about } = dict;
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line bg-surface/30 py-24 md:py-36"
    >
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Statement */}
        <div>
          <Reveal>
            <span className="kicker">{about.kicker}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
              {about.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              {about.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href={`/${locale}/contact`}
              className="btn-accent mt-9 group"
            >
              {about.cta}
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 border-l border-t border-line">
          {about.metrics.map((m, i) => (
            <Reveal
              as="div"
              key={m.label}
              delay={0.1 + i * 0.08}
              className="border-b border-r border-line p-6 md:p-9"
            >
              <div className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,4.2rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
                <CountUp to={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-3 text-sm leading-snug text-muted">
                {m.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
