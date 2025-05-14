const mongoose = require("mongoose");

const CampaignSetSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    year: { type: Number, required: true },
    url: { type: String, required: true },

    campaigns: [
      {
        campaign_idea: String,
        theme_title: String,
        target_audience: String,
        suggested_send_date: String,
        rationale_and_strategy: String,
        campaign_goal: String,
        email_type: String,
        products_to_feature: [String],
        products_descriptions: [String],
      },
    ],
  },
  { timestamps: true }
);

// One unique campaign set per (month, year, url)
CampaignSetSchema.index({ month: 1, year: 1, url: 1 }, { unique: true });

module.exports = mongoose.model("CampaignSet", CampaignSetSchema);
