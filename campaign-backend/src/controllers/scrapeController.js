const { scrapeSiteContent } = require('../services/scraper');

async function testScrape(req, res) {
  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const { text, source } = await scrapeSiteContent(url);

    res.status(200).json({
      message: `Scraped using ${source}`,
      cleanedText: text,
      preview: text.slice(0, 500),
    });
  } catch (err) {
    console.error('Scraping failed:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { testScrape };
