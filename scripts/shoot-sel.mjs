import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const url = process.argv[2];
const out = process.argv[3];
const selector = process.argv[4];
const extraScroll = parseInt(process.argv[5] || "0", 10);

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

// warm up reveals with a pass
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const t = setInterval(() => {
      y += 700;
      window.scrollTo(0, y);
      if (y > document.body.scrollHeight) {
        clearInterval(t);
        res();
      }
    }, 90);
  });
});

if (selector && selector !== "-") {
  await page.evaluate((sel) => {
    document.querySelector(sel)?.scrollIntoView({ block: "start" });
  }, selector);
}
if (extraScroll) {
  await page.evaluate((d) => window.scrollBy(0, d), extraScroll);
}
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: out });
await browser.close();
console.log("saved", out);
