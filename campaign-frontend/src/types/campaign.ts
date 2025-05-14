export interface Campaign {
  _id: string;
  campaign_idea: string;
  theme_title: string;
  target_audience: string;
  suggested_send_date: string;
  rationale_and_strategy: string;
  campaign_goal: string;
  email_type: string;
  products_to_feature: string[];
  products_descriptions: string[];
}
