import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceList } from "@/components/sections/ServiceList";
import { CrossNav } from "@/components/sections/CrossNav";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "AI и автоматизация — TFM",
  description:
    "AI услуги за предприятия: автоматизация на процеси, AI агенти, AI Call center, чат ботове, обучение, визуален контент и разработка на AI приложения.",
};

export default async function AiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const page = dict.servicePages.ai;

  const crossLinks = dict.services.items
    .filter((s) => s.id !== "ai")
    .map((s) => ({ title: s.title, desc: s.desc, href: s.href }));

  return (
    <>
      <ServiceHero
        label={page.label}
        title={page.title}
        intro={page.intro}
        ctaLabel={page.cta}
        ctaHref={`/${typed}/contact`}
        image="/img/ai-hero.png"
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
