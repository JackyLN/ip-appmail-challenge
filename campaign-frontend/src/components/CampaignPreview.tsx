import { Campaign } from "../types/campaign";

interface Props {
  campaign: Campaign | null;
}

export default function CampaignPreview({ campaign }: Props) {
  if (!campaign) return null;

  return (
    <div className="preview-panel">
      <p className="card-subtitle">{campaign.dateRange}</p>
      <h3 className="preview-title">{campaign.title}</h3>

      <div className="text-sm text-gray-700">
        <p className="preview-label">Goal</p>
        <p className="preview-text">{campaign.goal}</p>

        <p className="preview-label">Audience</p>
        <p className="preview-text">{campaign.audience}</p>

        <p className="preview-label">Strategy</p>
        <p className="preview-text">{campaign.strategy}</p>

        <p className="preview-label">Campaign Idea</p>
        <p className="preview-text">{campaign.idea}</p>
      </div>

      <button className="btn-secondary">Create Campaign</button>
    </div>
  );
}
