export const CAMPAIGN_TYPE = {
  PERSONALIZED: "personalized",
  REGULAR: "regular",
} as const;

export type CampaignType = typeof CAMPAIGN_TYPE[keyof typeof CAMPAIGN_TYPE];
