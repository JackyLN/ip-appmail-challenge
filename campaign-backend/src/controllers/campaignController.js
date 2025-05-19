const CampaignSet = require("../models/Campaign");
const { generateCampaignPrompt } = require("../services/openaiService");
const { scrapeSiteContent } = require("../services/scraper");

async function generateCampaigns(req, res) {
  const { month, year, url } = req.body;

  try {
    const existing = await CampaignSet.findOne({ month, year, url });
    if (existing) {
      return res.status(200).json({
        message: `Campaign set for ${month} ${year} and URL '${url}' already exists.`,
        data: existing,
      });
    }

    const monthYear = `${month} ${year}`;
    const { text: scrapedCatalog } = await scrapeSiteContent(url);
    const campaigns = await generateCampaignPrompt(monthYear, "", scrapedCatalog);

    const campaignSet = new CampaignSet({
      month,
      year,
      url,
      campaigns,
    });

    const saved = await campaignSet.save();

    res.status(201).json({
      message: "Campaign set generated and saved",
      data: saved,
    });
  } catch (error) {
    if (error.code === 11000) {
      const existing = await CampaignSet.findOne({ month, year, url });
      return res.status(200).json({
        message: `Campaign set for ${month} ${year} and URL '${url}' already exists.`,
        data: existing,
      });
    }

    console.error("Campaign generation failed:", error);
    res.status(500).json({ message: "Failed to generate campaigns", error: error.message });
  }
}

module.exports = { generateCampaigns };
