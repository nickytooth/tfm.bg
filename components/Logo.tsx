import Link from "next/link";
import type { Locale } from "@/i18n/config";

/**
 * TFM typographic wordmark. The F crossbar extends as a "signal" line
 * that terminates in a accent transmission dot.
 */
export function Logo({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="TFM начало"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span
        className="font-[family-name:var(--font-display)] text-[1.35rem] font-extrabold tracking-[-0.06em] leading-none text-ink"
        style={{ fontFeatureSettings: '"ss01"' }}
      >
        TFM
      </span>
      <span className="relative flex items-center" aria-hidden>
        <span className="block h-px w-6 bg-line-strong transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-9 group-hover:bg-accent" />
        <span className="ml-1 block size-1.5 rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
