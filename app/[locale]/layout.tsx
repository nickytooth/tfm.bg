import type { Metadata } from "next";
import { Unbounded, Onest, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Grain } from "@/components/Grain";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});
const sans = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TFM: Дигитализираме предприятия с AI, код и реклама",
  description:
    "TFM е дигитална агенция за предприятия: AI и автоматизация, уеб разработка и SEO, дигитален маркетинг. Екип от 20 специалисти, 130+ проекта.",
  metadataBase: new URL("https://tfm.bg"),
  openGraph: {
    title: "TFM: Дигитализация на предприятия",
    description:
      "AI и автоматизация, уеб разработка и SEO, дигитален маркетинг в една система.",
    type: "website",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const dict = getDictionary(typed);

  return (
    <html
      lang={typed}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll />
        <Grain />
        <Nav dict={dict} locale={typed} />
        <main>{children}</main>
        <Footer dict={dict} locale={typed} />
      </body>
    </html>
  );
}

export const dynamicParams = false;
