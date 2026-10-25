import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceList } from "@/components/sections/ServiceList";
import { CrossNav } from "@/components/sections/CrossNav";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Уеб разработка и SEO — TFM",
  description:
    "Корпоративни сайтове, онлайн магазини и SEO оптимизация за предприятия. Бързи, измерими сайтове, които се намират в Google и продават.",
};

export default async function WebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const page = dict.webPage;

  const crossLinks = dict.services.items
    .filter((s) => s.id !== "web")
    .map((s) => ({ title: s.title, desc: s.desc, href: s.href }));

  return (
    <>
      <ServiceHero
        label={page.label}
        title={page.title}
        intro={page.intro}
        ctaLabel={page.cta}
        ctaHref={`/${typed}/contact`}
        image="/img/web-hero.png"
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
