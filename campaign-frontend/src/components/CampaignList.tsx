import { Campaign } from "../types/campaign";

interface Props {
  campaigns: Campaign[];
  setSelected: (c: Campaign) => void;
}

export default function CampaignList({ campaigns, setSelected }: Props) {
  return (
    <div className="campaign-list">
      {campaigns.map((c, i) => (
        <div key={i} className="card" onClick={() => setSelected(c)}>
          <p className="card-subtitle">{c.dateRange}</p>
          <h3 className="card-title">{c.title}</h3>
          <p className="text-sm text-gray-700">{c.strategy}</p>
        </div>
      ))}
    </div>
  );
}
