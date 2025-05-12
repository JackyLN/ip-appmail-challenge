import { Campaign } from "../types/campaign";

interface Props {
  campaigns: Campaign[];
  setSelected: (c: Campaign) => void;
  selected: Campaign | null;
}

export default function CampaignList({ campaigns, setSelected, selected }: Props) {
  return (
    <div className="campaign-list">
      {campaigns.map((c) => {
        const isSelected = selected?.id === c.id;

        return (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className={`card-base ${isSelected ? "card-selected" : "card-default card-hover"}`}
          >
            <p className="card-subtitle">{c.suggested_send_date}</p>
            <h3 className="card-title">{c.campaign_idea}</h3>
            <p className="card-body">{c.theme_title}</p>
          </div>
        );
      })}
    </div>
  );
}
