import { useState } from "react";
import { Campaign } from "../types/campaign";

interface Props {
  setCampaigns: (campaigns: Campaign[]) => void;
}

export default function CampaignForm({ setCampaigns }: Props) {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    const dummyData: Campaign[] = Array(5).fill({
      title: "Celebrate Mom in Style",
      dateRange: "May 1 – May 12, 2025",
      strategy: "Promoting the elegant Ryo Chair as a luxurious gift for Mother’s Day.",
      goal: "Drive Sales",
      audience: "All customers",
      idea: "Luxury Mother’s Day Sale",
    });
    setCampaigns(dummyData);
  };

  return (
    <>
      <input className="input-field" placeholder="https://www.example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button className="btn-primary" onClick={handleSubmit}>
        Create Strategies for May
      </button>
    </>
  );
}
