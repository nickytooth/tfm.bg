import puppeteer from "puppeteer-core";
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/bg", { waitUntil: "networkidle2" });
await page.evaluate(() =>
  document.querySelector("#services")?.scrollIntoView({ block: "start" })
);
await new Promise((r) => setTimeout(r, 1200));
// hover first service row and move within it to set the spotlight position
const link = await page.$("#services a[href]");
const box = await link.boundingBox();
await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.5);
await page.mouse.move(box.x + box.width * 0.42, box.y + box.height * 0.5);
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: "shot-hover.png" });
console.log("saved shot-hover.png");
await browser.close();
