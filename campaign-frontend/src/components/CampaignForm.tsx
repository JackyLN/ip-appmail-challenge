import { useState } from "react";
import { Campaign } from "../types/campaign";
import { format } from "date-fns";

interface Props {
  setCampaigns: (campaigns: Campaign[]) => void;
  campaigns: Campaign[];
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

export default function CampaignForm({ setCampaigns, campaigns, month }: Props) {
  const [url, setUrl] = useState("");
  const formattedMonth = format(month, "MMMM");
  const valid = isValidUrl(url);
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = !valid || isLoading || campaigns.length > 0;

  const handleSubmit = async () => {
    if (!isValidUrl(url) || isLoading) return;

    const monthName = format(month, "MMMM");
    const yearNumber = month.getFullYear();
    const cacheKey = `campaigns_${url}_${monthName}_${yearNumber}`;

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setCampaigns(JSON.parse(cached));
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/campaigns/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, month: monthName, year: yearNumber }),
      });

      if (!res.ok) throw new Error("API error");

      const json = await res.json();
      const campaigns = json.data.campaigns;

      localStorage.setItem(cacheKey, JSON.stringify(campaigns));
      setCampaigns(campaigns);
    } catch (err) {
      console.error(err);
      alert("Failed to generate campaigns. Please try again.");
    } finally {
      setIsLoading(false);
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
      <button
        className={`btn-primary flex items-center gap-2 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        {isLoading && (
          <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {isLoading ? "Generating..." : `Create Strategies for ${formattedMonth}`}
      </button>
    </div>
  );
}
