import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/bg";

export function SoonPage({
  dict,
  locale,
  heading,
}: {
  dict: Dictionary;
  locale: Locale;
  heading: string;
}) {
  const { soon } = dict.servicePages;
  return (
    <section className="flex min-h-[100dvh] items-center pt-[68px]">
      <div className="shell">
        <span className="kicker">{soon.tag}</span>
        <h1 className="mt-5 text-[clamp(2.2rem,6vw,4rem)] font-extrabold tracking-[-0.04em]">
          {heading}
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          {soon.body}
        </p>
        <a
          href={`mailto:${dict.footer.email}`}
          className="mt-4 inline-block font-[family-name:var(--font-display)] text-2xl font-bold text-accent"
        >
          {dict.footer.email}
        </a>
        <div className="mt-12">
          <Link href={`/${locale}`} className="btn-ghost group !py-2.5 !text-sm">
            <ArrowLeft
              size={16}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {soon.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
