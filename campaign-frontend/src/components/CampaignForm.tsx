import { useState } from "react";
import { Campaign } from "../types/campaign";
import { format } from "date-fns";

interface Props {
  setCampaigns: (campaigns: Campaign[]) => void;
  month: Date;
}

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export default function CampaignForm({ setCampaigns, month }: Props) {
  const [url, setUrl] = useState("");
  const formattedMonth = format(month, "MMMM");
  const valid = isValidUrl(url);

  const handleSubmit = () => {
    if (!valid) return;

    const dummyData: Campaign[] = [
      {
        id: 1,
        campaign_idea: "Celebrate Mom in Style",
        theme_title: "Promoting the elegant Ryo Chair as a luxurious gift for Mother's Day.",
        target_audience: "All Customers",
        suggested_send_date: "2025-05-01",
        rationale_and_strategy:
          "This campaign aligns with Mother’s Day, targeting thoughtful buyers looking for premium, stylish gifts. Emphasize emotion and elegance.",
        campaign_goal: "Drive Sales",
        email_type: "Product-Focused",
        products_to_feature: ["Ryo Chair", "Aiko Lounge Set"],
        products_descriptions: [
          "Ryo Chair: A modern, minimalist chair perfect for luxurious homes.",
          "Aiko Lounge Set: Sleek and comfortable furniture for family spaces.",
        ],
      },
      {
        id: 2,
        campaign_idea: "Flash Sale: 48-Hour Spring Essentials",
        theme_title: "Create urgency with limited-time discounts on spring picks.",
        target_audience: "Subscribers who opened last 2 emails",
        suggested_send_date: "2025-05-10",
        rationale_and_strategy:
          "Flash sales create urgency and reward engaged users. Encourage impulse purchases with a tight timeframe.",
        campaign_goal: "Increase Short-Term Conversions",
        email_type: "Sales and Promotional",
        products_to_feature: ["Lightweight Jackets", "Floral Scarves"],
        products_descriptions: [
          "Lightweight Jackets: Perfect for breezy days and spring layering.",
          "Floral Scarves: Seasonal patterns for versatile outfits.",
        ],
      },
      {
        id: 3,
        campaign_idea: "The Brand Story: Sustainable & Stylish",
        theme_title: "Tell the brand story and highlight eco-friendly materials.",
        target_audience: "First-Time Visitors",
        suggested_send_date: "2025-05-15",
        rationale_and_strategy: "Introduce new customers to our mission and values, establishing trust and emotional connection.",
        campaign_goal: "Build Brand Loyalty",
        email_type: "Brand Awareness",
        products_to_feature: ["Eco Knit Sweater", "Recycled Canvas Tote"],
        products_descriptions: [
          "Eco Knit Sweater: Made from 100% recycled fibers, stylish and cozy.",
          "Recycled Canvas Tote: Durable, eco-conscious, and great for daily use.",
        ],
      },
    ];

    setCampaigns(dummyData);
  };

  return (
    <div className="form-container">
      <input
        className="input-field"
        placeholder="Enter your business website"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="btn-primary" onClick={handleSubmit} disabled={!valid}>
        Create Strategies for {formattedMonth}
      </button>
    </div>
  );
}
