import type { Dictionary } from "@/i18n/bg";

type Brand = { name: string; slug?: string; src?: string };

// slug -> Simple Icons CDN. src -> local file (for logos not on Simple Icons).
const BRANDS: Brand[] = [
  { name: "OpenAI", src: "/img/platforms/openai.svg" },
  { name: "Claude", slug: "claude" },
  { name: "Gemini", slug: "googlegemini" },
  { name: "Qwen", slug: "qwen" },
  { name: "Higgsfield", src: "/img/platforms/higgsfield.svg" },
  { name: "Perplexity", slug: "perplexity" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "Mistral", slug: "mistralai" },
  { name: "IBM", src: "/img/platforms/ibm.svg" },
  { name: "n8n", slug: "n8n" },
  { name: "Meta", slug: "meta" },
  { name: "Google", slug: "google" },
  { name: "TikTok", slug: "tiktok" },
];

function logoSrc(b: Brand) {
  return b.src ?? `https://cdn.simpleicons.org/${b.slug}/f4f4f2`;
}

export function Partners({ dict }: { dict: Dictionary }) {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="border-y border-line py-12 md:py-16">
      <p className="shell mb-9 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-faint">
        {dict.partners.label}
      </p>
      <div className="marquee-mask marquee-pause overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-16 pr-16">
          {row.map((b, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${b.name}-${i}`}
              src={logoSrc(b)}
              alt={b.name}
              height={28}
              loading="lazy"
              className="h-7 w-auto shrink-0 opacity-45 transition-opacity duration-300 hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
