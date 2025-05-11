const Campaign = require('../models/Campaign');
const { generateCampaignPrompt } = require('../services/openaiService');

async function generateCampaigns(req, res) {
  const { month, year, keyMarketingDates, productCatalog } = req.body;

  try {
    const monthYear = `${month} ${year}`;
    const campaigns = await generateCampaignPrompt(monthYear, keyMarketingDates, productCatalog);

    const withMetadata = campaigns.map(c => ({ ...c, month, year }));
    const saved = await Campaign.insertMany(withMetadata);
    res.json(saved);
  } catch (error) {
    console.error('Campaign generation failed:', error);
    res.status(500).json({ message: 'Failed to generate campaigns' });
  }
}

module.exports = { generateCampaigns };
