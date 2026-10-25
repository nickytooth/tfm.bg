"use client";

import {
  ArrowsClockwise,
  Robot,
  PhoneCall,
  ChatCircleDots,
  GraduationCap,
  Images,
  AppWindow,
  Browsers,
  Storefront,
  MagnifyingGlass,
  Check,
  type Icon,
} from "@phosphor-icons/react";
import { Reveal } from "../Reveal";

const ICONS: Record<string, Icon> = {
  automation: ArrowsClockwise,
  agent: Robot,
  call: PhoneCall,
  chat: ChatCircleDots,
  training: GraduationCap,
  visual: Images,
  apps: AppWindow,
  sites: Browsers,
  shop: Storefront,
  seo: MagnifyingGlass,
};

export type ServiceItem = {
  icon: string;
  title: string;
  desc: string;
  benefits: readonly string[];
};

export function ServiceList({ items }: { items: readonly ServiceItem[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell border-t border-line">
        {items.map((item, i) => {
          const isBrand = item.icon.startsWith("brand:");
          const brandSlug = isBrand ? item.icon.slice(6) : "";
          const IconCmp = ICONS[item.icon] ?? Robot;
          const n = String(i + 1).padStart(2, "0");
          return (
            <Reveal as="div" key={item.title} delay={(i % 3) * 0.05}>
              <article className="grid grid-cols-1 gap-x-10 gap-y-6 border-b border-line py-12 md:grid-cols-[auto_1fr_1.1fr] md:py-16">
                {/* Index + icon */}
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-6">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-faint">
                    {n}
                  </span>
                  <span className="grid size-12 place-items-center rounded-xl border border-line-strong text-accent">
                    {isBrand ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://cdn.simpleicons.org/${brandSlug}/f4f4f2`}
                        alt=""
                        width={22}
                        height={22}
                        className="h-[22px] w-[22px]"
                      />
                    ) : (
                      <IconCmp size={24} weight="duotone" />
                    )}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
                  {item.title}
                </h2>

                {/* Detail */}
                <div>
                  <p className="max-w-xl text-[0.98rem] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {item.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2.5 text-sm text-ink"
                      >
                        <Check
                          size={15}
                          weight="bold"
                          className="shrink-0 text-accent"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
