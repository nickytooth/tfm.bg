import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/bg/contact", { waitUntil: "networkidle2" });

// 1) submit empty -> validation errors
await page.click('button[type="submit"]');
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: "shot-form-errors.png" });
console.log("saved shot-form-errors.png");

// 2) fill valid -> submit (no API key => generic error path)
await page.type('input[name="name"]', "Иван Тестов");
await page.type('input[name="email"]', "ivan@firma.bg");
await page.type('textarea[name="message"]', "Искаме да автоматизираме поръчките и да пуснем реклами.");
await page.click('input[name="consent"]');
await page.click('button[type="submit"]');
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: "shot-form-submitted.png" });
console.log("saved shot-form-submitted.png");

await browser.close();
