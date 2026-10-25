import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"],
  defaultViewport: { width: 390, height: 800, isMobile: true },
});
const page = await browser.newPage();
await page.goto(process.argv[2], { waitUntil: "networkidle2" });
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const t = setInterval(() => {
      y += 500;
      window.scrollTo(0, y);
      if (y > document.body.scrollHeight) { clearInterval(t); res(); }
    }, 80);
  });
});
await page.evaluate(() => {
  const h = [...document.querySelectorAll("h2")].find((e) =>
    e.textContent.includes("работят с нас")
  );
  h?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: process.argv[3] });
console.log("saved", process.argv[3]);
await browser.close();
