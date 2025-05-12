import { useState } from "react";
import CampaignForm from "../components/CampaignForm";
import CampaignList from "../components/CampaignList";
import CampaignPreview from "../components/CampaignPreview";
import MonthNavigator from "../components/MonthNavigator";
import { Campaign } from "../types/campaign";

export default function CampaignPlanner() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [month, setMonth] = useState<Date>(new Date());

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="frame-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="sidebar-heading">Get a Full Month of Campaign Ideas — For Your Emails and Socials</h2>
          <p className="sidebar-text">Let’s start by entering your business website.</p>
        </aside>

        {/* Main */}
        <main className="main-content">
          <MonthNavigator month={month} setMonth={setMonth} />
          <div className="input-group mb-6">
            <CampaignForm setCampaigns={setCampaigns} month={month} />
          </div>
          <div className="flex gap-6 flex-1 overflow-hidden">
            <CampaignList campaigns={campaigns} setSelected={setSelected} selected={selected} />
            <CampaignPreview campaign={selected} />
          </div>
        </main>
      </div>
    </div>
  );
}
