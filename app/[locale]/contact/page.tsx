import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Контакти — TFM",
  description:
    "Свържи се с TFM за дигитализация на бизнеса ти: AI, уеб разработка и SEO, дигитален маркетинг. Отговаряме до 24 часа.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const c = dict.contact;

  return (
    <section className="min-h-[100dvh] pt-[120px] pb-24 md:pt-[160px]">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Info */}
        <div className="lg:pt-4">
          <span className="kicker">{c.label}</span>
          <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,3.8rem)] font-extrabold leading-[1.0] tracking-[-0.04em]">
            {c.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
            {c.intro}
          </p>

          <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8">
            <div>
              <p className="kicker mb-2">{c.directLabel}</p>
              <a
                href={`mailto:${dict.footer.email}`}
                className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-xl font-bold text-accent md:text-2xl"
              >
                {dict.footer.email}
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <a
                href={`tel:${dict.footer.phoneHref}`}
                className="text-lg font-medium text-ink transition-colors hover:text-accent"
              >
                {dict.footer.phone}
              </a>
              <span className="text-sm leading-relaxed text-muted">
                {dict.footer.address}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm text-muted">{c.responseLabel}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <ContactForm dict={c} />
      </div>
    </section>
  );
}
