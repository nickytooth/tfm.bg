import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/bg";
import { Logo } from "./Logo";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const year = 2026;
  return (
    <footer className="border-t border-line bg-bg">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo locale={locale} />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>
          </div>

          <FooterCol title={dict.footer.columns.services}>
            {dict.services.items.map((s) => (
              <FooterLink key={s.id} href={`/${locale}${s.href}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={dict.footer.columns.company}>
            {dict.footer.company.map((c) => (
              <FooterLink key={c.href} href={`/${locale}${c.href}`}>
                {c.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={dict.footer.columns.contact}>
            <li>
              <a
                href={`mailto:${dict.footer.email}`}
                className="group inline-flex items-center gap-1 text-sm text-ink transition-colors hover:text-accent"
              >
                {dict.footer.email}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </li>
            <li>
              <a
                href={`tel:${dict.footer.phoneHref}`}
                className="text-sm text-ink transition-colors hover:text-accent"
              >
                {dict.footer.phone}
              </a>
            </li>
            <li>
              <span className="text-sm leading-relaxed text-muted">
                {dict.footer.address}
              </span>
            </li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <span className="font-[family-name:var(--font-mono)] uppercase tracking-widest">
            © {year} TFM
          </span>
          <span>{dict.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-faint">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted transition-colors duration-300 hover:text-ink"
      >
        {children}
      </Link>
    </li>
  );
}
