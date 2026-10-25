import fs from "fs";
import path from "path";
import { Reveal } from "../Reveal";

/**
 * Client logo wall — full-colour logos on a clean white surface. Reads every
 * image in /public/img/clients at build/request time, so dropping logo files
 * in that folder makes them appear. Renders nothing if the folder is empty.
 */
const LIGHT_BORDER = "border-[oklch(0.2_0_0/0.08)]";

// Wide/thin logos that read small at the default height — render larger.
const BIG = new Set([
  "gastrovarna-logo.png",
  "gutexpert-logo.png",
  "totl-logo.png",
]);

// Compact/square logos that read large at the default height — render smaller.
const SMALL = new Set(["spatz3-logo.png", "huge-logo.png"]);

export function ClientLogos() {
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(path.join(process.cwd(), "public/img/clients"))
      .filter((f) => /\.(svg|png|webp|jpe?g)$/i.test(f))
      .sort();
  } catch {
    files = [];
  }

  if (files.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="shell">
        <Reveal>
          <div
            className={`grid grid-cols-2 border-l border-t sm:grid-cols-3 lg:grid-cols-4 ${LIGHT_BORDER}`}
          >
            {files.map((f) => {
              const big = BIG.has(f);
              const small = SMALL.has(f);
              const imgSize = big
                ? "h-28 max-w-[340px] md:h-32"
                : small
                  ? "h-16 max-w-[200px] md:h-20"
                  : "h-20 max-w-[260px] md:h-24";
              return (
                <div
                  key={f}
                  className={`flex min-h-[210px] items-center justify-center border-b border-r ${
                    big ? "px-5 py-8" : "p-9"
                  } ${LIGHT_BORDER}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/img/clients/${f}`}
                    alt=""
                    className={`w-auto object-contain transition-transform duration-300 ease-[var(--ease-out-expo)] hover:scale-105 ${imgSize}`}
                  />
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
