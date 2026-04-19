import type { BrandId } from "@repo/constants";
import type { Market } from "@repo/types";

export type MockCampaignBanner = {
  badge: string;
  ctaHref: string;
  ctaLabel: string;
  message: string;
  status: "preview" | "coming-soon";
  subtitle: string;
  title: string;
};

const MARKET_SUBTITLE: Record<Market, string> = {
  ca: "Canadian market campaign preview",
  en: "English market campaign preview",
};

const MOCK_CAMPAIGN_BANNERS: Record<
  BrandId,
  Omit<MockCampaignBanner, "ctaHref" | "subtitle">
> = {
  "project-a": {
    badge: "Preview drop",
    ctaLabel: "Join preview access",
    message:
      "Simulated campaign data for an unreleased Studio Drop accessories release.",
    status: "coming-soon",
    title: "Studio Drop capsule",
  },
  "project-b": {
    badge: "Early access",
    ctaLabel: "Unlock early access",
    message:
      "Simulated merchandising data for the upcoming Field Kit release campaign.",
    status: "preview",
    title: "Field Kit release",
  },
};

const PREVIEW_QUERY_BY_BRAND: Record<BrandId, string> = {
  "project-a": "studio-drop",
  "project-b": "field-kit",
};

export const getMockCampaignBanner = (
  brand: BrandId,
  market: Market,
): MockCampaignBanner => {
  const banner = MOCK_CAMPAIGN_BANNERS[brand];

  return {
    ...banner,
    ctaHref: `/${market}/login?preview=${PREVIEW_QUERY_BY_BRAND[brand]}`,
    subtitle: MARKET_SUBTITLE[market],
  };
};
