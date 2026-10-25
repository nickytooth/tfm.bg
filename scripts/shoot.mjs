import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const url = process.argv[2] || "http://localhost:3000/bg";
const out = process.argv[3] || "shot-full.png";
const fullPage = process.argv[4] !== "viewport";

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"],
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

// Drive a slow scroll to trigger whileInView / ScrollTrigger reveals
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      const h = document.body.scrollHeight;
      y += 600;
      window.scrollTo(0, y);
      if (y < h + 1200) setTimeout(step, 120);
      else resolve();
    };
    step();
  });
});
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 1500));

await page.screenshot({ path: out, fullPage });
await browser.close();
console.log("saved", out);
