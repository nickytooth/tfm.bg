import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CTA } from "@/components/sections/CTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const dict = getDictionary(typed);

  return (
    <>
      <Hero dict={dict} locale={typed} />
      <Partners dict={dict} />
      <Services dict={dict} locale={typed} />
      <About dict={dict} locale={typed} />
      <Process dict={dict} />
      <Testimonials dict={dict} />
      <ClientLogos />
      <CTA dict={dict} locale={typed} />
    </>
  );
}
