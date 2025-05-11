const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },

  campaign_idea: String,
  theme_title: String,
  target_audience: String,
  suggested_send_date: String,
  rationale_and_strategy: String,
  campaign_goal: String,
  email_type: String,
  products_to_feature: [String],
  products_descriptions: [String]
}, { timestamps: true });

// Optional: enforce uniqueness on (month, year)
CampaignSchema.index({ month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
