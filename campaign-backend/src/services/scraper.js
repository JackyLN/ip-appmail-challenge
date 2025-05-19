const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");
const isDocker = process.env.PUPPETEER_EXECUTABLE_PATH;

/**
 * Attempts to extract product-like text blocks from HTML.
 * Includes WooCommerce-specific fallback.
 */
function extractTextBlocks(html) {
  const $ = cheerio.load(html);
  const blocks = [];

  $("div, section, article").each((_, el) => {
    const text = $(el).text().trim();
    const lowerText = text.toLowerCase();

    const hasPrice = /\$\d/.test(text);
    const hasKeywords =
      lowerText.includes("add to cart") ||
      lowerText.includes("buy now") ||
      lowerText.includes("shop now") ||
      lowerText.includes("free shipping");

    const isUsable = text.length > 50;

    if ((hasPrice || hasKeywords) && isUsable) {
      blocks.push(text);
    }
  });

  // WooCommerce single-product fallback
  if (blocks.length === 0) {
    const title = $(".product_title").text().trim();
    const price = $(".price").first().text().trim();
    const desc = $(".woocommerce-product-details__short-description").text().trim();

    const wooBlock = [title, price, desc].filter(Boolean).join("\n\n");

    if (wooBlock.length > 50) {
      blocks.push(wooBlock);
      console.log("[scraper] Used WooCommerce fallback selector");
    }
  }

  return blocks;
}

/**
 * Truncates blocks and formats with labels.
 */
function reduceBlocks(blocks, maxChars = 3000) {
  const labeled = blocks.map((b, i) => `Product ${i + 1}:\n${b.trim()}`);
  let result = "";

  for (const block of labeled) {
    if (result.length + block.length > maxChars) break;
    result += block + "\n\n";
  }

  return result.trim();
}

/**
 * Main scraping function with Cheerio first, Puppeteer fallback.
 */
async function scrapeSiteContent(url) {
  let html = "";
  let source = "cheerio";

  try {
    const { data } = await axios.get(url, { timeout: 10000 });
    html = data;
  } catch (err) {
    console.warn("[scraper] axios failed, skipping Cheerio fallback");
  }

  let blocks = extractTextBlocks(html);
  console.log(`[scraper] Extracted ${blocks.length} blocks using cheerio.`);

  let cleanedText = reduceBlocks(blocks);
  if (!cleanedText || cleanedText.length < 100) {
    console.log("[scraper] Cheerio result too small — falling back to Puppeteer...");

    try {
      const browser = await puppeteer.launch({
        headless: "new",
        executablePath: isDocker || undefined, // use custom path in Docker only
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

      try {
        await page.waitForSelector(".product_title", { timeout: 5000 });
      } catch {
        console.warn("[scraper] .product_title not found — continuing anyway");
      }

      const wooContent = await page.evaluate(() => {
        const title = document.querySelector('[class*="product_title"]')?.innerText?.trim();
        const price = document.querySelector('[class*="price"]')?.innerText?.trim();
        const desc = document.querySelector('[class*="short-description"]')?.innerText?.trim();

        return [title, price, desc].filter(Boolean).join("\n\n");
      });

      if (wooContent.length > 50) {
        blocks = [wooContent];
        cleanedText = reduceBlocks(blocks);
        console.log("[scraper] WooCommerce fallback extracted via page.evaluate");
      } else {
        const htmlContent = await page.content();
        fs.writeFileSync("debug-output.html", htmlContent);
        blocks = extractTextBlocks(htmlContent);
        cleanedText = reduceBlocks(blocks);
      }

      source = "puppeteer";
      await browser.close();
    } catch (err) {
      console.error("[scraper] Puppeteer failed:", err.message);
      throw new Error("Failed to scrape dynamic content");
    }
  }

  if (!cleanedText || cleanedText.trim().length < 30) {
    console.warn("[scraper] Final cleaned text is too short to use");
    throw new Error("No product-like content found");
  }

  console.log("[scraper] Final cleaned text preview:\n", cleanedText.slice(0, 300));

  return { text: cleanedText, source };
}

module.exports = { scrapeSiteContent };
