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

function getCampaignCacheKey(url: string, month: number, year: number) {
  return `campaigns_${url}_${year}_${month}`;
}

export default function CampaignForm({ setCampaigns, month }: Props) {
  const [url, setUrl] = useState("");
  const formattedMonth = format(month, "MMMM");
  const valid = isValidUrl(url);

  const handleSubmit = async () => {
    const valid = isValidUrl(url);
    if (!valid) return;

    const monthNumber = month.getMonth(); // 0-based
    const yearNumber = month.getFullYear();
    const cacheKey = getCampaignCacheKey(url, monthNumber, yearNumber);

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      setCampaigns(parsed);
      return;
    }

    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          month: monthNumber + 1, // send 1-based
          year: yearNumber,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      setCampaigns(data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate campaigns. Please try again.");
    }
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
