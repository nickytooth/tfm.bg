import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/i18n/bg";
import type { Locale } from "@/i18n/config";
import { Reveal } from "../Reveal";
import { MagneticButton } from "../MagneticButton";

export function CTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { finalCta } = dict;
  return (
    <section className="relative overflow-hidden border-t border-line py-28 md:py-40">
      {/* Volt glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.9 0.19 124 / 0.1), transparent 70%)",
        }}
      />
      <div className="shell relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-[clamp(2.2rem,6vw,4.6rem)] font-extrabold leading-[1.0] tracking-[-0.04em]">
            {finalCta.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {finalCta.sub}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <MagneticButton href={`/${locale}/contact`} variant="accent">
              {finalCta.cta}
              <ArrowRight size={18} weight="bold" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
