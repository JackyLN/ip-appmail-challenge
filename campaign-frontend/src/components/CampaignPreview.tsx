import { Campaign } from "../types/campaign";
import sparkleIcon from "../assets/sparkle-icon.svg";

interface Props {
  campaign: Campaign | null;
}

export default function CampaignPreview({ campaign }: Props) {
  if (!campaign) return null;

  return (
    <div className="preview-panel">
      <div className="relative">
        <p className="preview-subtitle">{campaign.suggested_send_date}</p>
        <img src={sparkleIcon} alt="icon" className="absolute top-0 right-0 w-12 h-12" />
      </div>

      <h3 className="preview-title">{campaign.campaign_idea}</h3>

      <div className="preview-group">
        <div>
          <p className="preview-label">Goal</p>
          <p className="preview-value">{campaign.campaign_goal}</p>
        </div>
        <div>
          <p className="preview-label">Audience</p>
          <p className="preview-value">{campaign.target_audience}</p>
        </div>
      </div>

      <div>
        <p className="preview-section-label mt-2">Strategy</p>
        <p className="preview-section-text">{campaign.rationale_and_strategy}</p>
      </div>

      <div>
        <p className="preview-section-label mt-2">Campaign Idea</p>
        <p className="preview-section-text">{campaign.theme_title}</p>
      </div>

      <button className="btn-preview">Create Campaign</button>
    </div>
  );
}
