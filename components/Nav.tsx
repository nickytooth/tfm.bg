"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/bg";
import { Logo } from "./Logo";

export function Nav({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const other: Locale = locale === "bg" ? "en" : "bg";
  const rest = pathname.replace(/^\/(bg|en)/, "") || "";
  const otherHref = `/${other}${rest}`;

  return (
    <header
      className="fixed inset-x-0 top-0 transition-all duration-500 ease-[var(--ease-out-expo)]"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <div
        className={`transition-all duration-500 ease-[var(--ease-out-expo)] ${
          scrolled
            ? "border-b border-line bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between">
          <Logo locale={locale} />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {dict.nav.items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={otherHref}
              aria-label={`Switch language to ${other.toUpperCase()}`}
              className="hidden font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-faint transition-colors duration-300 hover:text-accent sm:block"
            >
              {locale} <span className="text-line-strong">/</span>{" "}
              <span className="text-muted">{other}</span>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="btn-accent hidden !px-5 !py-2.5 !text-sm lg:inline-flex"
            >
              {dict.nav.cta}
            </Link>
            <button
              type="button"
              aria-label="Меню"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-line-strong text-ink lg:hidden"
            >
              {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-[68px] border-b border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="shell flex flex-col gap-1 py-6">
              {dict.nav.items.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    className="block py-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 flex items-center justify-between border-t border-line pt-5">
                <Link
                  href={otherHref}
                  className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-muted"
                >
                  {locale} / {other}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="btn-accent !py-2.5 !text-sm"
                >
                  {dict.nav.cta}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
