import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceList } from "@/components/sections/ServiceList";
import { CrossNav } from "@/components/sections/CrossNav";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Дигитален маркетинг — TFM",
  description:
    "Платена реклама за предприятия във всеки канал: Meta, Google Ads, TikTok, Reddit, Discord и X (Twitter). Планиране, изпълнение и измерим резултат.",
};

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const page = dict.marketingPage;

  const crossLinks = dict.services.items
    .filter((s) => s.id !== "marketing")
    .map((s) => ({ title: s.title, desc: s.desc, href: s.href }));

  return (
    <>
      <ServiceHero
        label={page.label}
        title={page.title}
        intro={page.intro}
        ctaLabel={page.cta}
        ctaHref={`/${typed}/contact`}
        image="/img/marketing-hero.png"
      />
      <ServiceList items={page.items} />
      <CrossNav
        heading={dict.servicePages.crossHeading}
        cta={dict.servicePages.crossCta}
        links={crossLinks}
        locale={typed}
      />
      <CTA dict={dict} locale={typed} />
    </>
  );
}
